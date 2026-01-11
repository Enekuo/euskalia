// /api/public.js
import { kv } from "@vercel/kv";
import crypto from "crypto";

// ====== Configuración de caché ======
const CACHE_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS || 60 * 60 * 24 * 14);

// ====== LÍMITES SEPARADOS (TRADUCTOR vs RESUMIDOR) ======
// Traductor
const FREE_TRANSLATOR_MAX_CHARS    = Number(process.env.FREE_TRANSLATOR_MAX_CHARS || 5000);
const FREE_TRANSLATOR_DAILY_TOKENS = Number(process.env.FREE_TRANSLATOR_DAILY_TOKENS || 20000);
const FREE_TRANSLATOR_RPM          = Number(process.env.FREE_TRANSLATOR_RPM || 6);

// Resumidor
const FREE_SUMMARY_MAX_CHARS       = Number(process.env.FREE_SUMMARY_MAX_CHARS || 12000);
const FREE_SUMMARY_DAILY_TOKENS    = Number(process.env.FREE_SUMMARY_DAILY_TOKENS || 20000);
const FREE_SUMMARY_RPM             = Number(process.env.FREE_SUMMARY_RPM || 6);

// ✅ límite de resúmenes por día (solo resumidor)
const FREE_SUMMARY_DAILY_REQUESTS  = Number(process.env.FREE_SUMMARY_DAILY_REQUESTS || 6);

// ✅ Modelos (para que PUBLIC pueda ser EXACTAMENTE igual que PRO)
const FREE_TRANSLATOR_MODEL = String(process.env.FREE_TRANSLATOR_MODEL || "").trim(); // ej: "gpt-4.1-mini"
const FREE_SUMMARY_MODEL    = String(process.env.FREE_SUMMARY_MODEL || "").trim();    // opcional

// Conversión aproximada chars→tokens (prudente)
const TOKENS_PER_CHAR = 0.25; // ~4 chars ≈ 1 token

// ====== Helpers ======
function canonicalize(s) {
  return (s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/\s+/g, " ")
    .replace(/^[\s,.!?;:|]+|[\s,.!?;:|]+$/g, "")
    .trim();
}

function makeCacheKey({ task, model, system, messages, src, dst, lang, length }) {
  const userText = canonicalize((messages || []).map(m => m?.content || "").join(" "));
  const payload = JSON.stringify({
    // ✅ bump cache version para NO reutilizar resultados antiguos malos
    v: "v2",
    task,
    model,
    pair: lang || `${src || ""}-${dst || ""}` || "na",
    length: length || null,
    system: system ? canonicalize(system) : "",
    text: userText
  });
  const sha = crypto.createHash("sha256").update(payload).digest("hex");
  const pair = lang || `${src || ""}-${dst || ""}` || "na";
  return `cache:${task}:${pair}:${sha}`;
}

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string") return xf.split(",")[0].trim();
  if (Array.isArray(xf) && xf.length) return xf[0].split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function todayKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Very simple HTML → texto
function htmlToText(html) {
  if (!html) return "";
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
  text = text.replace(
    /<\/(p|div|li|h[1-6]|br|section|article|header|footer|main)>/gi,
    "$&\n"
  );
  text = text.replace(/<[^>]+>/g, " ");
  return text.replace(/\s+/g, " ").trim();
}

// ✅ “guardrail” para EUS (evita frases raras tipo “Nahi izan nuen…” y mantiene números)
function eusGuardrail() {
  return `
EUSKERA-ARAUAK (oso garrantzitsua):
- Eman itzulpena EUSKARA NATURALEAN, eta EZ erantsi esaldi arrarorik (adib.: "Nahi izan nuen..." debekatuta).
- Itzuli "Nací en el año X en un pueblo llamado Y" moduko egiturak honela, orden naturalarekin:
  "X. urtean Y izeneko herri batean jaio nintzen."
- Zenbakiak (1969, 123, 1.000, 2,5...) mantendu berdin (EZ idatzi hitzez), eta EZ aldatu kokapena modu artifizialean.
- Ez nahastu hizkuntzak: emaitza %100 euskaraz, salbu eta izen propioak.
- Erantzun BAKARRIK itzulpenarekin (formatua mantenduz).
`.trim();
}

// ====== Handler ======
export default async function handler(req, res) {
  // CORS / Preflight
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

    // Leer body seguro
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

    let {
      system,
      temperature = 0.2,
      model = "gpt-4o-mini",
      max_tokens
    } = body;

    // ====== Soporte especial: traducir desde URLs ======
    if (body?.mode === "translate_urls") {
      const urls = Array.isArray(body.urls)
        ? body.urls.map((u) => String(u || "").trim()).filter(Boolean)
        : [];

      if (!urls.length) {
        return res.status(400).json({
          ok: false,
          error: "Missing urls",
          message: "Debes enviar al menos una URL válida en el campo 'urls'."
        });
      }

      const src = body.src || null;
      const dst = body.dst || null;

      // Descargar contenido de cada URL
      const parts = [];
      for (const url of urls) {
        try {
          const r = await fetch(url, { method: "GET" });
          const html = await r.text();
          const text = htmlToText(html);
          if (text) {
            parts.push(`URL: ${url}\n\n${text.slice(0, 9000)}`);
          } else {
            parts.push(`URL: ${url}\n\n[No se ha podido extraer texto útil de esta página.]`);
          }
        } catch (e) {
          parts.push(`URL: ${url}\n\n[No se ha podido descargar el contenido de esta página.]`);
        }
      }

      const combined = parts.join("\n\n-----------------------------\n\n");

      // System por defecto según par de idiomas
      if (!system) {
        if (src === "eus" && dst === "es") {
          system = `
Eres Euskalia, un traductor profesional.
Tu tarea es traducir el contenido de varias páginas web del euskera al español.
Responde SOLO con la traducción en español, manteniendo en lo posible la estructura (títulos, párrafos, listas).
No añadas explicaciones externas, solo la traducción.
          `.trim();
        } else if (src === "es" && dst === "eus") {
          system = `
Euskalia zara, itzulpen profesionaleko tresna bat.
Zure lana hainbat webguneren edukia gaztelaniatik euskarara itzultzea da.
Erantzun BETI euskaraz, eta saiatu egitura mantentzen (izenburuak, paragrafoak, zerrendak).
Ez gehitu azalpen gehigarririk, soilik itzulpena.
          `.trim();
        } else {
          system = `
Eres Euskalia, un traductor profesional.
Tu tarea es traducir el contenido de varias páginas web al idioma de destino indicado.
Responde SOLO con la traducción final en el idioma de destino y mantén en lo posible la estructura (títulos, párrafos, listas).
          `.trim();
        }
      }

      body.system = system;
      body.messages = [{ role: "user", content: combined }];
      delete body.text;
      delete body.from;
      delete body.to;
    }

    // Admite dos contratos:
    // A) { messages:[{role,content}, ...], system?, model?, temperature?, max_tokens? }
    // B) { text, from, to } -> traducir simple
    const hasMessages  = Array.isArray(body?.messages) && body.messages.length > 0;
    const hasTranslate = typeof body?.text === "string" && body?.from && body?.to;

    let messages = [];

    if (hasMessages) {
      messages = body.messages;
      system = system ?? body.system;
      temperature = body.temperature ?? temperature;
      model = body.model ?? model;
      max_tokens = body.max_tokens ?? max_tokens;
    } else if (hasTranslate) {
      const { text, from, to } = body;
      system = system ?? "You are a precise translation engine.";
      messages = [
        {
          role: "user",
          content: `Translate the following text from ${from} to ${to}. Respond with only the translation, no explanations:\n\n${text}`
        }
      ];
    } else {
      return res.status(400).json({
        ok: false,
        error: "Invalid body. Send {messages:[{role,content}...]} or {text, from, to}."
      });
    }

    // ====== Identificar herramienta (Traductor vs Resumidor) ======
    const rawTask = String(body?.task || "").toLowerCase();
    const rawMode = String(body?.mode || "").toLowerCase();

    const isSummary =
      rawTask.includes("summary") || rawTask.includes("summar") || rawTask.includes("resum") ||
      rawMode.includes("summary") || rawMode.includes("summar") || rawMode.includes("resum");

    const isTranslator =
      hasTranslate || body?.mode === "translate_urls" ||
      rawTask.includes("translate") || rawMode.includes("translate") ||
      rawTask.includes("traduc") || rawMode.includes("traduc") ||
      rawMode.includes("translate_text") || rawMode.includes("translate_urls");

    const tool = isSummary ? "summary" : (isTranslator ? "translator" : "other");

    // ✅ FORZAR MODELO POR HERRAMIENTA (esto hace PUBLIC = PRO si pones la env var igual)
    if (tool === "translator" && FREE_TRANSLATOR_MODEL) model = FREE_TRANSLATOR_MODEL;
    if (tool === "summary" && FREE_SUMMARY_MODEL) model = FREE_SUMMARY_MODEL;

    // ✅ Guardrail EUS (solo traductor y cuando destino sea eus)
    const dst = hasTranslate ? body.to : (body?.dst || null);
    if (tool === "translator" && String(dst || "").toLowerCase() === "eus") {
      system = `${String(system || "").trim()}\n\n${eusGuardrail()}`.trim();
    }

    const finalMessages = [
      ...(system ? [{ role: "system", content: system }] : []),
      ...messages,
    ];

    // Límites según herramienta
    const MAX_CHARS =
      tool === "summary" ? FREE_SUMMARY_MAX_CHARS :
      tool === "translator" ? FREE_TRANSLATOR_MAX_CHARS :
      FREE_TRANSLATOR_MAX_CHARS;

    const DAILY_TOKENS =
      tool === "summary" ? FREE_SUMMARY_DAILY_TOKENS :
      tool === "translator" ? FREE_TRANSLATOR_DAILY_TOKENS :
      FREE_TRANSLATOR_DAILY_TOKENS;

    const RPM =
      tool === "summary" ? FREE_SUMMARY_RPM :
      tool === "translator" ? FREE_TRANSLATOR_RPM :
      FREE_TRANSLATOR_RPM;

    // ====== LÍMITES ======
    const ip  = getClientIp(req);
    const day = todayKey();

    // 1) Máx. caracteres por request
    const totalChars =
      (system?.length || 0) +
      finalMessages.reduce((n, m) => n + ((m?.content?.length) || 0), 0);

    if (totalChars > MAX_CHARS) {
      return res.status(413).json({
        ok: false,
        error: "Input too long",
        limit: { max_chars: MAX_CHARS, tool },
        message:
          `El texto es demasiado largo. Máximo ${MAX_CHARS.toLocaleString()} caracteres por petición. ` +
          `Divide el texto y vuelve a intentarlo.`
      });
    }

    // 2) Rate-limit RPM por IP
    try {
      const rpmKey = `rl:rpm:${tool}:${ip}`;
      const count = await kv.incr(rpmKey);
      if (count === 1) {
        await kv.expire(rpmKey, 60);
      }
      if (count > RPM) {
        return res.status(429).json({
          ok: false,
          error: "Too Many Requests",
          limit: { rpm: RPM, tool },
          message: `Demasiadas peticiones. Límite ${RPM}/min. Espera unos segundos.`
        });
      }
    } catch {}

    // 3) Límite de resúmenes por día (solo resumidor)
    if (tool === "summary") {
      try {
        const dailySummaryKey = `quota:summary:reqs:${day}:${ip}`;
        const usedReqs = (await kv.get(dailySummaryKey)) || 0;

        if (Number(usedReqs) >= FREE_SUMMARY_DAILY_REQUESTS) {
          return res.status(429).json({
            ok: false,
            error: "Daily summary requests exceeded",
            limit: { daily_summary_requests: FREE_SUMMARY_DAILY_REQUESTS, used: usedReqs },
            message:
              `Has alcanzado el límite diario del resumidor (${FREE_SUMMARY_DAILY_REQUESTS} resúmenes/día). ` +
              `Vuelve mañana o mejora de plan.`
          });
        }

        const newUsed = Number(usedReqs) + 1;
        await kv.set(dailySummaryKey, newUsed, { ex: 60 * 60 * 26 });
      } catch {}
    }

    // 4) Cuota diaria de tokens por IP
    const estTokens = Math.ceil(totalChars * TOKENS_PER_CHAR);
    try {
      const dailyKey = `quota:${tool}:${day}:${ip}`;
      const used = (await kv.get(dailyKey)) || 0;
      if (used + estTokens > DAILY_TOKENS) {
        return res.status(429).json({
          ok: false,
          error: "Daily quota exceeded",
          limit: { daily_tokens: DAILY_TOKENS, used_tokens: used, tool },
          message:
            `Has alcanzado la cuota diaria del plan gratis. ` +
            `Disponible: ${DAILY_TOKENS.toLocaleString()} tokens/día. ` +
            `Vuelve mañana o mejora de plan.`
        });
      }
    } catch {}

    // ====== KV CACHE ======
    const task = hasTranslate ? "translate" : (body?.task || body?.mode || "chat");
    const src  = hasTranslate ? body.from : (body?.src || null);
    const lang = body?.lang || null;
    const length = body?.length || null;

    const cacheKey = makeCacheKey({
      task, model, system, messages: finalMessages, src, dst, lang, length
    });

    try {
      const cached = await kv.get(cacheKey);
      if (cached?.content) {
        await kv.expire(cacheKey, CACHE_TTL_SECONDS);
        return res.status(200).json({
          ok: true,
          provider: "openai",
          content: cached.content,
          usage: cached.usage || null,
          cached: true
        });
      }
    } catch {}

    // ====== Llamada a OpenAI ======
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature,
        messages: finalMessages,
        ...(max_tokens ? { max_tokens } : {}),
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

    const content = data?.choices?.[0]?.message?.content ?? "";
    const usage   = data?.usage ?? null;

    // ====== Guardar en KV (caché resultado) ======
    try {
      await kv.set(cacheKey, { content, usage }, { ex: CACHE_TTL_SECONDS });
    } catch {}

    // ====== Actualizar cuota diaria real (tokens) ======
    try {
      const dailyKey = `quota:${tool}:${day}:${ip}`;
      const used = (await kv.get(dailyKey)) || 0;

      const realTokens =
        (usage?.prompt_tokens || 0) + (usage?.completion_tokens || 0) ||
        Math.max(estTokens, 1);

      const newUsed = used + realTokens;
      await kv.set(dailyKey, newUsed, { ex: 60 * 60 * 26 });
    } catch {}

    return res.status(200).json({
      ok: true,
      provider: "openai",
      content,
      usage,
      cached: false
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || "Server error" });
  }
}
