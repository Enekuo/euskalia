// /api/premium.js
import { kv } from "@vercel/kv";
import crypto from "crypto";
import admin from "firebase-admin";

// ====== Configuración de límites (via ENV con defaults sensatos) ======
const CACHE_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS || 60 * 60 * 24 * 14);

// ✅ NUEVO: LÍMITE GLOBAL MENSUAL PREMIUM (por UID)                   //4000000//
const PREMIUM_MONTHLY_CHARS = Number(process.env.PREMIUM_MONTHLY_CHARS || 4000000);

// TTL para el contador mensual (lo dejamos ~62 días para cubrir cambios de mes y evitar expiraciones raras)
const PREMIUM_MONTHLY_TTL_SECONDS = Number(process.env.PREMIUM_MONTHLY_TTL_SECONDS || 60 * 60 * 24 * 62);

// LÍMITES LEGACY (se mantienen para no romper nada, pero ya NO gobiernan el bloqueo principal)
const PREMIUM_MAX_CHARS    = Number(process.env.PREMIUM_MAX_CHARS || 18000);      // legacy fallback
const PREMIUM_DAILY_TOKENS = Number(process.env.PREMIUM_DAILY_TOKENS || 300000);  // legacy
const PREMIUM_RPM          = Number(process.env.PREMIUM_RPM || 60);               // rate limit: peticiones/min por UID

// ✅✅✅ LÍMITES PREMIUM POR HERRAMIENTA (legacy; se mantienen pero NO se usan para bloquear el uso global)
const PREMIUM_TRANSLATOR_MAX_CHARS       = Number(process.env.PREMIUM_TRANSLATOR_MAX_CHARS || 16000);
const PREMIUM_TRANSLATOR_DAILY_REQUESTS  = Number(process.env.PREMIUM_TRANSLATOR_DAILY_REQUESTS || 30);

const PREMIUM_SUMMARY_MAX_CHARS          = Number(process.env.PREMIUM_SUMMARY_MAX_CHARS || 50000);
const PREMIUM_SUMMARY_DAILY_REQUESTS     = Number(process.env.PREMIUM_SUMMARY_DAILY_REQUESTS || 10);

const PREMIUM_CORRECTOR_MAX_CHARS        = Number(process.env.PREMIUM_CORRECTOR_MAX_CHARS || 30000);
const PREMIUM_CORRECTOR_DAILY_REQUESTS   = Number(process.env.PREMIUM_CORRECTOR_DAILY_REQUESTS || 12);

const PREMIUM_PARAPHRASER_MAX_CHARS      = Number(process.env.PREMIUM_PARAPHRASER_MAX_CHARS || 30000);
const PREMIUM_PARAPHRASER_DAILY_REQUESTS = Number(process.env.PREMIUM_PARAPHRASER_DAILY_REQUESTS || 12);

const PREMIUM_AI_DETECTOR_MAX_CHARS      = Number(process.env.PREMIUM_AI_DETECTOR_MAX_CHARS || 30000);
const PREMIUM_AI_DETECTOR_DAILY_REQUESTS = Number(process.env.PREMIUM_AI_DETECTOR_DAILY_REQUESTS || 12);

const PREMIUM_HUMANIZER_MAX_CHARS        = Number(process.env.PREMIUM_HUMANIZER_MAX_CHARS || 30000);
const PREMIUM_HUMANIZER_DAILY_REQUESTS   = Number(process.env.PREMIUM_HUMANIZER_DAILY_REQUESTS || 12);

function getPremiumLimits(tool) {
  if (tool === "translator") {
    return { maxChars: PREMIUM_TRANSLATOR_MAX_CHARS, dailyReqs: PREMIUM_TRANSLATOR_DAILY_REQUESTS };
  }
  if (tool === "summary") {
    return { maxChars: PREMIUM_SUMMARY_MAX_CHARS, dailyReqs: PREMIUM_SUMMARY_DAILY_REQUESTS };
  }
  if (tool === "corrector") {
    return { maxChars: PREMIUM_CORRECTOR_MAX_CHARS, dailyReqs: PREMIUM_CORRECTOR_DAILY_REQUESTS };
  }
  if (tool === "paraphraser") {
    return { maxChars: PREMIUM_PARAPHRASER_MAX_CHARS, dailyReqs: PREMIUM_PARAPHRASER_DAILY_REQUESTS };
  }
  if (tool === "humanizer") {
    return { maxChars: PREMIUM_HUMANIZER_MAX_CHARS, dailyReqs: PREMIUM_HUMANIZER_DAILY_REQUESTS };
  }
  if (tool === "ai_detector") {
    return { maxChars: PREMIUM_AI_DETECTOR_MAX_CHARS, dailyReqs: PREMIUM_AI_DETECTOR_DAILY_REQUESTS };
  }
  // fallback legacy
  return { maxChars: PREMIUM_MAX_CHARS, dailyReqs: PREMIUM_TRANSLATOR_DAILY_REQUESTS };
}

// Conversión aproximada chars→tokens (legacy)
const TOKENS_PER_CHAR = 0.25; // ~4 chars ≈ 1 token

// ====== Firebase Admin (verificación de token) ======
function initFirebaseAdmin() {
  if (admin.apps?.length) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing FIREBASE_* env vars for Firebase Admin");
  }

  // Vercel suele guardar la private key con \n escapados
  privateKey = (privateKey || "")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

function getBearerToken(req) {
  const h = req.headers?.authorization || req.headers?.Authorization;
  if (!h || typeof h !== "string") return null;
  const parts = h.split(" ");
  if (parts.length !== 2) return null;
  if (parts[0].toLowerCase() !== "bearer") return null;
  return parts[1].trim();
}

async function getUidFromRequest(req) {
  initFirebaseAdmin();
  const token = getBearerToken(req);
  if (!token) return null;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded?.uid || null;
  } catch {
    return null;
  }
}

// ====== Helpers ======
function canonicalize(s) {
  return (s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/\s+/g, " ")
    .replace(/^[\s,.!?;:|]+|[\s,.!?;:|]+$/g, "")
    .trim();
}

function makeCacheKey({ task, model, system, messages, src, dst, lang, length }) {
  const userText = canonicalize((messages || []).map((m) => m?.content || "").join(" "));
  const payload = JSON.stringify({
    v: "v1",
    task,
    model,
    pair: lang || `${src || ""}-${dst || ""}` || "na",
    length: length || null,
    system: system ? canonicalize(system) : "",
    text: userText,
  });
  const sha = crypto.createHash("sha256").update(payload).digest("hex");
  const pair = lang || `${src || ""}-${dst || ""}` || "na";
  return `cache:${task}:${pair}:${sha}`;
}

function todayKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ✅ NUEVO: clave del periodo mensual (UTC)
function monthKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function premiumMonthlyUsageKey(uid, month = monthKey()) {
  return `usage:premium:chars:${month}:${uid}`;
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

// ✅ detectar herramienta en PREMIUM (legacy; ya no aplica límites por tool)
function detectPremiumTool(body, system, messages, hasTranslate) {
  const rawTask = String(body?.task || "").toLowerCase();
  const rawMode = String(body?.mode || "").toLowerCase();

  if (rawMode === "ai_detector" || rawTask === "ai_detector") return "ai_detector";

  const isTranslator =
    hasTranslate ||
    rawMode === "translate_urls" ||
    rawTask.includes("translate") ||
    rawMode.includes("translate") ||
    rawTask.includes("traduc") ||
    rawMode.includes("traduc") ||
    rawMode.includes("translate_text") ||
    rawMode.includes("translate_urls");

  const isSummary =
    rawTask.includes("summary") ||
    rawTask.includes("summar") ||
    rawTask.includes("resum") ||
    rawMode.includes("summary") ||
    rawMode.includes("summar") ||
    rawMode.includes("resum");

  const isCorrector =
    rawTask.includes("correct") ||
    rawMode.includes("correct") ||
    rawTask.includes("correg") ||
    rawMode.includes("correg") ||
    rawTask.includes("grammar") ||
    rawMode.includes("grammar") ||
    rawTask.includes("ortograf") ||
    rawMode.includes("ortograf");

  const isParaphraser =
    rawTask.includes("paraphr") ||
    rawMode.includes("paraphr") ||
    rawTask.includes("rephrase") ||
    rawMode.includes("rephrase") ||
    rawTask.includes("reformular") ||
    rawMode.includes("reformular");

  const isHumanizer =
    rawTask.includes("humaniz") ||
    rawMode.includes("humaniz") ||
    rawTask.includes("humanizer") ||
    rawMode.includes("humanizer");

  let tool =
    isTranslator ? "translator" :
    isSummary ? "summary" :
    isCorrector ? "corrector" :
    isParaphraser ? "paraphraser" :
    isHumanizer ? "humanizer" :
    "other";

  if (tool === "other") {
    const sys = canonicalize(system || "");
    const user0 = canonicalize(
      (messages || [])
        .map((m) => (m?.role === "user" ? (m?.content || "") : ""))
        .join(" ")
        .slice(0, 2000)
    );
    const hint = `${sys} ${user0}`;

    const looksSummary =
      hint.includes("resumen") || hint.includes("resumir") || hint.includes("resume") || hint.includes("summarize") || hint.includes("summary");

    const looksTranslate =
      hint.includes("traduc") || hint.includes("traduce") || hint.includes("translate") || hint.includes("itzul") || hint.includes("translation");

    const looksCorrect =
      hint.includes("corrige") || hint.includes("correg") || hint.includes("grammar") || hint.includes("ortograf");

    const looksParaphrase =
      hint.includes("paraf") || hint.includes("reformula") || hint.includes("rephrase") || hint.includes("paraphrase");

    const looksHumanize =
      hint.includes("humaniza") || hint.includes("humanize") || hint.includes("humanizer");

    if (looksTranslate && !looksSummary && !looksCorrect && !looksParaphrase && !looksHumanize) tool = "translator";
    else if (looksSummary && !looksTranslate && !looksCorrect && !looksParaphrase && !looksHumanize) tool = "summary";
    else if (looksCorrect && !looksTranslate && !looksSummary && !looksParaphrase && !looksHumanize) tool = "corrector";
    else if (looksParaphrase && !looksTranslate && !looksSummary && !looksCorrect && !looksHumanize) tool = "paraphraser";
    else if (looksHumanize && !looksTranslate && !looksSummary && !looksCorrect && !looksParaphrase) tool = "humanizer";
  }

  return tool;
}

// ====== Handler ======
export default async function handler(req, res) {
  // CORS / Preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
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

// ✅ PREMIUM: exigir token válido y obtener UID
const uid = await getUidFromRequest(req);

if (!uid) {
  return res.status(401).json({
    ok: false,
    error: "Unauthorized",
    message: "Necesitas iniciar sesión para usar el plan Premium."
  });
}

// 🔎 comprobar si el usuario es PREMIUM
const db = admin.firestore();

const premiumUser = await db.collection("paidEmailsPremium").doc(uid).get();

if (!premiumUser.exists) {
  return res.status(403).json({
    ok: false,
    error: "PREMIUM_REQUIRED",
    message: "Esta herramienta requiere plan Premium."
  });
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

    // ====== ✅ AI DETECTOR (PREMIUM) ======
    if (body?.mode === "ai_detector") {
      const { text } = body || {};

      if (!text || typeof text !== "string") {
        return res.status(400).json({ ok: false, error: "Missing text" });
      }

      const trimmed = text.trim();
      if (trimmed.length < 40) {
        return res.status(400).json({
          ok: false,
          error: "TEXT_TOO_SHORT"
        });
      }

      const detectorSystem =
        "Eres un detector de probabilidad de texto generado por IA. Devuelve SOLO JSON válido sin texto adicional.";

      const detectorUser = `Analiza este texto y estima probabilidad de que sea generado por IA.
Devuelve un JSON con esta forma EXACTA:
{"ai": number(0-100), "human": number(0-100), "note": string}

Reglas:
- ai + human debe sumar 100.
- Si no estás seguro, usa valores intermedios.
- note: una frase muy corta (máx 120 caracteres) en español.
Texto:
"""${trimmed.slice(0, 5000)}"""`;

      const detectorMessagesForLimits = [
        { role: "system", content: detectorSystem },
        { role: "user", content: detectorUser },
      ];

      const totalChars =
        detectorMessagesForLimits.reduce((n, m) => n + ((m?.content?.length) || 0), 0);

      // (se mantiene un límite razonable por request para no romper el modelo)
      const detectorToolLimits = getPremiumLimits("ai_detector");
      const detectorMax = Number(detectorToolLimits.maxChars || PREMIUM_MAX_CHARS);

      if (totalChars > detectorMax) {
        return res.status(413).json({
          ok: false,
          error: "Input too long",
          limit: { max_chars: detectorMax, tool: "ai_detector" },
          message:
            `El texto es demasiado largo para el plan Premium. Máximo ${detectorMax.toLocaleString()} caracteres por petición. ` +
            `Divide el texto y vuelve a intentarlo.`
        });
      }

      // Rate-limit RPM por UID (esto sí lo mantenemos)
      try {
        const rpmKey = `rl:premium:rpm:${uid}`;
        const count = await kv.incr(rpmKey);
        if (count === 1) {
          await kv.expire(rpmKey, 60);
        }
        if (count > PREMIUM_RPM) {
          return res.status(429).json({
            ok: false,
            error: "Too Many Requests",
            limit: { rpm: PREMIUM_RPM },
            message: `Demasiadas peticiones. Límite ${PREMIUM_RPM}/min. Espera unos segundos.`
          });
        }
      } catch {}

      // ✅✅✅ NUEVO: LÍMITE GLOBAL MENSUAL (input+output) para detector también
      const month = monthKey();
      const usageKey = premiumMonthlyUsageKey(uid, month);
      const usedChars0 = Number((await kv.get(usageKey)) || 0);
      const inputChars = totalChars;

      // Cache key detector
      const MODEL = process.env.AI_DETECTOR_MODEL || "gpt-4.1-mini";
      const detectorCacheKey = makeCacheKey({
        task: "ai_detector",
        model: MODEL,
        system: detectorSystem,
        messages: [{ role: "user", content: trimmed.slice(0, 5000) }],
        src: null,
        dst: null,
        lang: "na",
        length: null
      });

      // Si hay cache, igual cuenta (para evitar “gratis infinito” repitiendo)
      try {
        const cached = await kv.get(detectorCacheKey);
        if (cached?.ai !== undefined && cached?.human !== undefined) {
          const cachedNote = cached.note || "Estimación orientativa basada en patrones del texto.";
          const outputJson = JSON.stringify({ ai: cached.ai, human: cached.human, note: cachedNote });
          const outputChars = outputJson.length;
          const spentChars = inputChars + outputChars;

          if (usedChars0 + spentChars > PREMIUM_MONTHLY_CHARS) {
            return res.status(429).json({
              ok: false,
              error: "PREMIUM_MONTHLY_LIMIT_REACHED",
              usedChars: usedChars0,
              limitChars: PREMIUM_MONTHLY_CHARS,
              message: "Has alcanzado el límite mensual del plan Premium."
            });
          }

          const newUsed = usedChars0 + spentChars;
          await kv.set(usageKey, newUsed, { ex: PREMIUM_MONTHLY_TTL_SECONDS });
          await kv.expire(detectorCacheKey, CACHE_TTL_SECONDS);

          return res.status(200).json({
            ok: true,
            ai: cached.ai,
            human: cached.human,
            note: cachedNote,
            cached: true,
            usedChars: newUsed,
            limitChars: PREMIUM_MONTHLY_CHARS
          });
        }
      } catch {}

      // Pre-check (solo input) para evitar llamadas si ya está reventado
      if (usedChars0 + inputChars > PREMIUM_MONTHLY_CHARS) {
        return res.status(429).json({
          ok: false,
          error: "PREMIUM_MONTHLY_LIMIT_REACHED",
          usedChars: usedChars0,
          limitChars: PREMIUM_MONTHLY_CHARS,
          message: "Has alcanzado el límite mensual del plan Premium."
        });
      }

      // OpenAI (Responses API)
      const rr = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          input: [
            { role: "system", content: detectorSystem },
            { role: "user", content: detectorUser },
          ],
          text: { format: { type: "json_object" } },
        }),
      });

      const detailText = await rr.text().catch(() => "");
      let data;
      try {
        data = detailText ? JSON.parse(detailText) : {};
      } catch {
        data = {};
      }

      if (!rr.ok) {
        return res.status(rr.status).json({
          ok: false,
          error: "OpenAI error",
          detail: typeof data === "object" ? data : detailText,
        });
      }

      // extraer output json
      let rawOut = data?.output_text || "";
      if (!rawOut && Array.isArray(data?.output)) {
        for (const item of data.output) {
          const contentArr = item?.content;
          if (Array.isArray(contentArr)) {
            const t = contentArr.find((c) => c?.type === "output_text" && typeof c?.text === "string")?.text;
            if (t) { rawOut = t; break; }
          }
        }
      }
      rawOut = String(rawOut || "").trim();

      let parsed;
      try {
        parsed = JSON.parse(rawOut);
      } catch {
        const start = rawOut.indexOf("{");
        const end = rawOut.lastIndexOf("}");
        if (start >= 0 && end > start) {
          parsed = JSON.parse(rawOut.slice(start, end + 1));
        } else {
          return res.status(500).json({ ok: false, error: "Bad model output", raw: rawOut });
        }
      }

      let ai = Number(parsed?.ai);
      if (!Number.isFinite(ai)) ai = 50;
      ai = Math.max(0, Math.min(100, Math.round(ai)));
      const human = 100 - ai;

      const note =
        typeof parsed?.note === "string" && parsed.note.trim()
          ? parsed.note.trim().slice(0, 140)
          : "Estimación orientativa basada en patrones del texto.";

      // Guardar cache
      try {
        await kv.set(detectorCacheKey, { ai, human, note }, { ex: CACHE_TTL_SECONDS });
      } catch {}

      // ✅✅✅ NUEVO: sumar GLOBAL mensual (input + output)
      const outJson = JSON.stringify({ ai, human, note });
      const outputChars = outJson.length;
      const spentChars = inputChars + outputChars;

      // Recheck estricto (por si cambió entre medias)
      const usedChars1 = Number((await kv.get(usageKey)) || 0);
      if (usedChars1 + spentChars > PREMIUM_MONTHLY_CHARS) {
        return res.status(429).json({
          ok: false,
          error: "PREMIUM_MONTHLY_LIMIT_REACHED",
          usedChars: usedChars1,
          limitChars: PREMIUM_MONTHLY_CHARS,
          message: "Has alcanzado el límite mensual del plan Premium."
        });
      }
      const newUsed = usedChars1 + spentChars;
      try {
        await kv.set(usageKey, newUsed, { ex: PREMIUM_MONTHLY_TTL_SECONDS });
      } catch {}

      return res.status(200).json({
        ok: true,
        ai,
        human,
        note,
        cached: false,
        usedChars: newUsed,
        limitChars: PREMIUM_MONTHLY_CHARS
      });
    }

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

    const finalMessages = [
      ...(system ? [{ role: "system", content: system }] : []),
      ...messages,
    ];

    // ====== Detectar herramienta (solo informativo)
    const tool = detectPremiumTool(body, system, messages, hasTranslate);

    // ====== 1) Máx. caracteres por request (mantenemos para estabilidad) ======
    const totalChars =
      (system?.length || 0) +
      finalMessages.reduce((n, m) => n + ((m?.content?.length) || 0), 0);

    // límite por request: usa tool max si existe, si no cae a PREMIUM_MAX_CHARS
    const toolLimits = getPremiumLimits(tool);
    const effectiveMaxChars = Number(toolLimits?.maxChars || PREMIUM_MAX_CHARS);

    if (totalChars > effectiveMaxChars) {
      return res.status(413).json({
        ok: false,
        error: "Input too long",
        limit: { max_chars: effectiveMaxChars, tool },
        message:
          `El texto es demasiado largo para tu plan Premium. Máximo ${effectiveMaxChars.toLocaleString()} caracteres por petición. ` +
          `Divide el texto y vuelve a intentarlo.`
      });
    }

    // ====== 2) Rate-limit RPM por UID (sí lo mantenemos) ======
    try {
      const rpmKey = `rl:premium:rpm:${uid}`;
      const count = await kv.incr(rpmKey);
      if (count === 1) {
        await kv.expire(rpmKey, 60);
      }
      if (count > PREMIUM_RPM) {
        return res.status(429).json({
          ok: false,
          error: "Too Many Requests",
          limit: { rpm: PREMIUM_RPM },
          message: `Demasiadas peticiones. Límite ${PREMIUM_RPM}/min. Espera unos segundos.`
        });
      }
    } catch {}

    // ====== ✅✅✅ NUEVO: LÍMITE GLOBAL MENSUAL (input + output) ======
    const month = monthKey();
    const usageKey = premiumMonthlyUsageKey(uid, month);

    // inputChars = totalChars (lo que mandamos al modelo)
    const inputChars = totalChars;

    // Precheck (solo input) para evitar gastar API si ya no hay margen ni para procesar
    const usedChars0 = Number((await kv.get(usageKey)) || 0);
    if (usedChars0 + inputChars > PREMIUM_MONTHLY_CHARS) {
      return res.status(429).json({
        ok: false,
        error: "PREMIUM_MONTHLY_LIMIT_REACHED",
        usedChars: usedChars0,
        limitChars: PREMIUM_MONTHLY_CHARS,
        message: "Has alcanzado el límite mensual del plan Premium."
      });
    }

    // ====== KV CACHE ======
    const task = hasTranslate ? "translate" : (body?.task || body?.mode || "chat");
    const src  = hasTranslate ? body.from : (body?.src || null);
    const dst  = hasTranslate ? body.to   : (body?.dst || null);
    const lang = body?.lang || null;
    const length = body?.length || null;

    const cacheKey = makeCacheKey({
      task, model, system, messages: finalMessages, src, dst, lang, length
    });

    // Si hay cache, también cuenta como gasto (para evitar abuso)
    try {
      const cached = await kv.get(cacheKey);
      if (cached?.content) {
        const outputChars = String(cached.content || "").length;
        const spentChars = inputChars + outputChars;

        const usedNow = Number((await kv.get(usageKey)) || 0);
        if (usedNow + spentChars > PREMIUM_MONTHLY_CHARS) {
          return res.status(429).json({
            ok: false,
            error: "PREMIUM_MONTHLY_LIMIT_REACHED",
            usedChars: usedNow,
            limitChars: PREMIUM_MONTHLY_CHARS,
            message: "Has alcanzado el límite mensual del plan Premium."
          });
        }

        const newUsed = usedNow + spentChars;
        await kv.set(usageKey, newUsed, { ex: PREMIUM_MONTHLY_TTL_SECONDS });

        await kv.expire(cacheKey, CACHE_TTL_SECONDS);
        return res.status(200).json({
          ok: true,
          provider: "openai",
          content: cached.content,
          usage: cached.usage || null,
          cached: true,
          usedChars: newUsed,
          limitChars: PREMIUM_MONTHLY_CHARS
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

    // ====== ✅✅✅ NUEVO: sumar GLOBAL mensual (input + output) ======
    const outputChars = String(content || "").length;
    const spentChars = inputChars + outputChars;

    // Recheck estricto (por si cambió entre medias)
    const usedChars1 = Number((await kv.get(usageKey)) || 0);
    if (usedChars1 + spentChars > PREMIUM_MONTHLY_CHARS) {
      return res.status(429).json({
        ok: false,
        error: "PREMIUM_MONTHLY_LIMIT_REACHED",
        usedChars: usedChars1,
        limitChars: PREMIUM_MONTHLY_CHARS,
        message: "Has alcanzado el límite mensual del plan Premium."
      });
    }

    const newUsed = usedChars1 + spentChars;
    try {
      await kv.set(usageKey, newUsed, { ex: PREMIUM_MONTHLY_TTL_SECONDS });
    } catch {}

    return res.status(200).json({
      ok: true,
      provider: "openai",
      content,
      usage,
      cached: false,
      usedChars: newUsed,
      limitChars: PREMIUM_MONTHLY_CHARS
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || "Server error" });
  }
}