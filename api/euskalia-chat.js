import { kv } from "@vercel/kv";
import crypto from "crypto";

// ===== Límites chat público =====
const FREE_ASSISTANT_MAX_CHARS = Number(process.env.FREE_ASSISTANT_MAX_CHARS || 1500);
const FREE_ASSISTANT_DAILY_REQUESTS = Number(process.env.FREE_ASSISTANT_DAILY_REQUESTS || 30);
const FREE_ASSISTANT_RPM = Number(process.env.FREE_ASSISTANT_RPM || 5);
const FREE_ASSISTANT_DAILY_TOKENS = Number(process.env.FREE_ASSISTANT_DAILY_TOKENS || 20000);

// 🔥 NUEVO: modelo configurable desde Vercel
const MODEL = process.env.FREE_ASSISTANT_MODEL || "gpt-4o";

// Seguridad extra para no aceptar historiales absurdamente grandes
const INTERNAL_MAX_TOTAL_CHARS = Number(process.env.INTERNAL_MAX_TOTAL_CHARS || 20000);

function fixBasqueEuskaliaDefinition(text) {
  if (!text) return text;

  const re = /^Euskalia\s+plataforma\s+bat\s+da\s*[,\.]?\s*/i;

  if (re.test(text)) {
    return text.replace(
      re,
      "Euskalia testuen prozesamendurako oinarritutako adimen artifizialaren bidez ibiltzen den plataforma bat da. "
    );
  }

  return text;
}

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getMinuteKey() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const h = String(now.getUTCHours()).padStart(2, "0");
  const min = String(now.getUTCMinutes()).padStart(2, "0");
  return `${y}-${m}-${d}:${h}:${min}`;
}

function getLastUserMessageContent(messages) {
  if (!Array.isArray(messages)) return "";
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m?.role === "user" && typeof m?.content === "string") {
      return m.content.trim();
    }
  }
  return "";
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ ok: false, error: "Missing OPENAI_API_KEY" });
    }

    const raw = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (c) => (data += c));
      req.on("end", () => resolve(data));
      req.on("error", reject);
    });

    let body = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid JSON body" });
    }

    const { messages = [] } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "Invalid body. Send {messages:[{role,content}...]}.",
      });
    }

    const lastUserText = getLastUserMessageContent(messages);

    if (!lastUserText) {
      return res.status(400).json({
        ok: false,
        error: "EMPTY_MESSAGE",
        message: "No se ha enviado ningún mensaje válido.",
      });
    }

    if (lastUserText.length > FREE_ASSISTANT_MAX_CHARS) {
      return res.status(413).json({
        ok: false,
        error: "CHAR_LIMIT_EXCEEDED",
        message: `Has superado el límite de ${FREE_ASSISTANT_MAX_CHARS} caracteres.`,
      });
    }

    const finalMessages = messages;

    const totalChars = finalMessages.reduce(
      (n, m) => n + (typeof m?.content === "string" ? m.content.length : 0),
      0
    );

    if (totalChars > INTERNAL_MAX_TOTAL_CHARS) {
      return res.status(413).json({
        ok: false,
        error: "INPUT_TOO_LONG",
        message: "Testua luzeegia da.",
      });
    }

    const ip = getClientIp(req);
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex");
    const today = getTodayKey();
    const minuteKey = getMinuteKey();

    const dailyRequestsKey = `chat:${ipHash}:req:${today}`;
    const usedRequests = Number((await kv.get(dailyRequestsKey)) || 0);

    if (usedRequests >= FREE_ASSISTANT_DAILY_REQUESTS) {
      return res.status(429).json({ ok: false, error: "DAILY_REQUEST_LIMIT" });
    }

    const rpmKey = `chat:${ipHash}:rpm:${minuteKey}`;
    const usedThisMinute = Number((await kv.get(rpmKey)) || 0);

    if (usedThisMinute >= FREE_ASSISTANT_RPM) {
      return res.status(429).json({ ok: false, error: "RATE_LIMIT" });
    }

    await kv.incr(rpmKey);
    await kv.expire(rpmKey, 90);

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL, // 🔥 usa variable de entorno
        temperature: 0.8,
        messages: finalMessages,
      }),
    });

    const data = await r.json();
    let content = data?.choices?.[0]?.message?.content || "";

    content = fixBasqueEuskaliaDefinition(content);

    await kv.incr(dailyRequestsKey);
    await kv.expire(dailyRequestsKey, 60 * 60 * 24);

    return res.status(200).json({
      ok: true,
      content,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err?.message || "Server error",
    });
  }
}