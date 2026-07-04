// /api/google-translate.js
import { kv } from "@vercel/kv";

// ✅ Mismos topes que el "traductor" en /api/public (texto y URL comparten cuota)
const MAX_CHARS = Number(process.env.FREE_TRANSLATOR_MAX_CHARS || 3000);
const RPM = Number(process.env.FREE_TRANSLATOR_RPM || 6);
const DAILY_REQUESTS = Number(process.env.FREE_TRANSLATOR_DAILY_REQUESTS || 100);

const GOOGLE_TRANSLATE_URL = "https://translation.googleapis.com/language/translate/v2";

// eus (interno) <-> eu (código ISO que usa Google)
const TO_GOOGLE_CODE = { eus: "eu" };
const FROM_GOOGLE_CODE = { eu: "eus" };

function toGoogleCode(code) {
  const c = String(code || "").trim().toLowerCase();
  return TO_GOOGLE_CODE[c] || c;
}

function fromGoogleCode(code) {
  const c = String(code || "").trim().toLowerCase();
  return FROM_GOOGLE_CODE[c] || c;
}

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  let ip = "unknown";
  if (typeof xf === "string") ip = xf.split(",")[0].trim();
  else if (Array.isArray(xf) && xf.length) ip = xf[0].split(",")[0].trim();
  else ip = req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";

  ip = String(ip || "unknown");
  if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");
  return ip;
}

function todayKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
    return res.status(500).json({ ok: false, error: "Missing GOOGLE_TRANSLATE_API_KEY" });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const text = String(body.text || "");
  const src = String(body.src || "auto").trim().toLowerCase();
  const dst = String(body.dst || "").trim().toLowerCase();

  if (!text.trim()) {
    return res.status(400).json({ ok: false, error: "Missing text" });
  }
  if (!dst) {
    return res.status(400).json({ ok: false, error: "Missing dst" });
  }

  // 1) Máx. caracteres por request (mismo tope que valida el frontend)
  if (text.length > MAX_CHARS) {
    return res.status(413).json({
      ok: false,
      error: "Input too long",
      limit: { max_chars: MAX_CHARS, tool: "translator" },
      message:
        `El texto es demasiado largo. Máximo ${MAX_CHARS.toLocaleString()} caracteres por petición. ` +
        `Divide el texto y vuelve a intentarlo.`,
    });
  }

  const ip = getClientIp(req);
  const day = todayKey();

  // 2) Rate-limit RPM por IP (mismo cubo "translator" que /api/public)
  try {
    const rpmKey = `rl:rpm:translator:${ip}`;
    const count = await kv.incr(rpmKey);
    if (count === 1) await kv.expire(rpmKey, 60);
    if (count > RPM) {
      return res.status(429).json({
        ok: false,
        error: "Too Many Requests",
        limit: { rpm: RPM, tool: "translator" },
        message: `Demasiadas peticiones. Límite ${RPM}/min. Espera unos segundos.`,
      });
    }
  } catch (e) {
    console.log("[KV RPM ERROR]", e?.message || e);
  }

  // 3) Cuota diaria de traducciones (misma clave que /api/public: texto y URL
  // comparten el mismo tope de 100 peticiones/día, no se duplica cuota)
  try {
    const dailyTranslatorKey = `quota:translator:reqs:${day}:${ip}`;
    const usedReqs = await kv.incr(dailyTranslatorKey);
    if (usedReqs === 1) await kv.expire(dailyTranslatorKey, 60 * 60 * 26);
    if (usedReqs > DAILY_REQUESTS) {
      return res.status(429).json({
        ok: false,
        error: "Daily translator requests exceeded",
        limit: { daily_translator_requests: DAILY_REQUESTS, used: usedReqs },
        message:
          `Has alcanzado el límite diario del traductor (${DAILY_REQUESTS} traducciones/día). ` +
          `Vuelve mañana o mejora de plan.`,
      });
    }
  } catch (e) {
    console.log("[KV DAILY TRANSLATOR ERROR]", e?.message || e);
  }

  // 4) Llamada a Google Cloud Translation v2
  const googleTarget = toGoogleCode(dst);
  const googleSource = src === "auto" ? null : toGoogleCode(src);

  const payload = { q: text, target: googleTarget, format: "text" };
  if (googleSource) payload.source = googleSource;

  try {
    const url = `${GOOGLE_TRANSLATE_URL}?key=${encodeURIComponent(process.env.GOOGLE_TRANSLATE_API_KEY)}`;

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const raw = await r.text().catch(() => "");
    let data;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = {};
    }

    if (!r.ok) {
      console.error("Google Translate API error:", r.status, raw);
      const status = r.status === 429 ? 429 : 502;
      return res.status(status).json({
        ok: false,
        error: "Google Translate error",
        detail: data?.error?.message || raw || "Unknown error",
      });
    }

    const translation = data?.data?.translations?.[0];
    if (!translation) {
      console.error("Google Translate: respuesta sin traducción", raw);
      return res.status(502).json({ ok: false, error: "Empty response from Google Translate" });
    }

    const translatedText = translation.translatedText || "";
    const detectedGoogleCode = translation.detectedSourceLanguage || null;
    const detectedLanguageCode =
      src === "auto" && detectedGoogleCode ? fromGoogleCode(detectedGoogleCode) : null;

    return res.status(200).json({
      ok: true,
      provider: "google",
      translation: translatedText,
      detectedLanguageCode,
    });
  } catch (e) {
    console.error("Google Translate request failed:", e);
    return res.status(502).json({ ok: false, error: "Network error contacting Google Translate" });
  }
}
