import { kv } from "@vercel/kv";
import crypto from "crypto";

// ===== Límites chat público =====
const FREE_ASSISTANT_MAX_CHARS = Number(process.env.FREE_ASSISTANT_MAX_CHARS || 1000);
const FREE_ASSISTANT_DAILY_REQUESTS = Number(process.env.FREE_ASSISTANT_DAILY_REQUESTS || 15);
const FREE_ASSISTANT_RPM = Number(process.env.FREE_ASSISTANT_RPM || 5);
const FREE_ASSISTANT_DAILY_TOKENS = Number(process.env.FREE_ASSISTANT_DAILY_TOKENS || 12000);

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
  // CORS / preflight
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

    // Leer body crudo
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

    // ===== Límite de caracteres por petición =====
    if (lastUserText.length > FREE_ASSISTANT_MAX_CHARS) {
      return res.status(413).json({
        ok: false,
        error: "CHAR_LIMIT_EXCEEDED",
        message: `Has superado el límite de ${FREE_ASSISTANT_MAX_CHARS} caracteres por mensaje en el chat público.`,
      });
    }

    // ✅ CAMBIO IMPORTANTE:
    // Ya NO se añade el manual interno desde el backend.
    // El asistente solo hará caso al prompt que venga desde el frontend.
    const finalMessages = messages;

    const totalChars = finalMessages.reduce(
      (n, m) => n + (typeof m?.content === "string" ? m.content.length : 0),
      0
    );

    if (totalChars > INTERNAL_MAX_TOTAL_CHARS) {
      return res.status(413).json({
        ok: false,
        error: "INPUT_TOO_LONG",
        message: "Testua luzeegia da txat honetarako.",
      });
    }

    // ===== Identidad del cliente =====
    const ip = getClientIp(req);
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex");
    const today = getTodayKey();
    const minuteKey = getMinuteKey();

    // ===== Límite diario de mensajes =====
    const dailyRequestsKey = `euskalia-chat:${ipHash}:requests:${today}`;
    const usedRequests = Number((await kv.get(dailyRequestsKey)) || 0);

    if (usedRequests >= FREE_ASSISTANT_DAILY_REQUESTS) {
      return res.status(429).json({
        ok: false,
        error: "DAILY_REQUEST_LIMIT",
        message: "Has alcanzado el límite diario de mensajes para el chat público.",
      });
    }

    // ===== RPM =====
    const rpmKey = `euskalia-chat:${ipHash}:rpm:${minuteKey}`;
    const usedThisMinute = Number((await kv.get(rpmKey)) || 0);

    if (usedThisMinute >= FREE_ASSISTANT_RPM) {
      return res.status(429).json({
        ok: false,
        error: "RATE_LIMIT",
        message: "Has enviado demasiados mensajes en muy poco tiempo. Inténtalo de nuevo en un minuto.",
      });
    }

    await kv.incr(rpmKey);
    await kv.expire(rpmKey, 90);

    // ===== Límite diario de tokens =====
    const dailyTokensKey = `euskalia-chat:${ipHash}:tokens:${today}`;
    const usedTokens = Number((await kv.get(dailyTokensKey)) || 0);

    if (usedTokens >= FREE_ASSISTANT_DAILY_TOKENS) {
      return res.status(429).json({
        ok: false,
        error: "DAILY_TOKEN_LIMIT",
        message: "Has alcanzado el límite diario de uso del chat público.",
      });
    }

    // ===== Llamada a OpenAI =====
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.8,
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0.1,
        messages: finalMessages,
      }),
    });

    const detailText = await r.text().catch(() => "");
    let data;
    try {
      data = detailText ? JSON.parse(detailText) : {};
    } catch {
      data = {};
    }

    if (!r.ok) {
      return res.status(r.status).json({
        ok: false,
        error: "OpenAI error",
        detail: typeof data === "object" ? data : detailText,
      });
    }

    let content = data?.choices?.[0]?.message?.content ?? "";
    content = fixBasqueEuskaliaDefinition(content);

    const usage = data?.usage ?? null;
    const totalTokensUsed = Number(usage?.total_tokens || 0);

    // ===== Guardar consumo =====
    await kv.incr(dailyRequestsKey);
    await kv.expire(dailyRequestsKey, 60 * 60 * 24);

    if (totalTokensUsed > 0) {
      await kv.incrby(dailyTokensKey, totalTokensUsed);
      await kv.expire(dailyTokensKey, 60 * 60 * 24);
    }

    return res.status(200).json({
      ok: true,
      provider: "openai",
      content,
      usage,
      cached: false,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err?.message || "Server error",
    });
  }
}