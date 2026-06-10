// /api/public.js
import { kv } from "@vercel/kv";
import crypto from "crypto";

// ====== Configuración de caché ======
const CACHE_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS || 60 * 60 * 24 * 14);

// ====== LÍMITES SEPARADOS (TRADUCTOR vs RESUMIDOR vs CORRECTOR) ======
// Traductor
const FREE_TRANSLATOR_MAX_CHARS    = Number(process.env.FREE_TRANSLATOR_MAX_CHARS || 5000);
const FREE_TRANSLATOR_DAILY_TOKENS = Number(process.env.FREE_TRANSLATOR_DAILY_TOKENS || 50000);
const FREE_TRANSLATOR_RPM          = Number(process.env.FREE_TRANSLATOR_RPM || 6);

// Resumidor
const FREE_SUMMARY_MAX_CHARS       = Number(process.env.FREE_SUMMARY_MAX_CHARS || 50000);
const FREE_SUMMARY_DAILY_TOKENS    = Number(process.env.FREE_SUMMARY_DAILY_TOKENS || 100000);
const FREE_SUMMARY_RPM             = Number(process.env.FREE_SUMMARY_RPM || 6);

// ✅ Corrector
const FREE_CORRECTOR_MAX_CHARS       = Number(process.env.FREE_CORRECTOR_MAX_CHARS || 12000);
const FREE_CORRECTOR_DAILY_TOKENS    = Number(process.env.FREE_CORRECTOR_DAILY_TOKENS || 50000);
const FREE_CORRECTOR_RPM             = Number(process.env.FREE_CORRECTOR_RPM || 6);

// Parafraseador
const FREE_PARAPHRASER_MAX_CHARS       = Number(process.env.FREE_PARAPHRASER_MAX_CHARS || 8000);
const FREE_PARAPHRASER_DAILY_TOKENS    = Number(process.env.FREE_PARAPHRASER_DAILY_TOKENS || 50000);
const FREE_PARAPHRASER_RPM             = Number(process.env.FREE_PARAPHRASER_RPM || 6);

// Creador de texto
const FREE_TEXT_CREATOR_MAX_CHARS       = Number(process.env.FREE_TEXT_CREATOR_MAX_CHARS || 12000);
const FREE_TEXT_CREATOR_DAILY_TOKENS    = Number(process.env.FREE_TEXT_CREATOR_DAILY_TOKENS || 80000);
const FREE_TEXT_CREATOR_RPM             = Number(process.env.FREE_TEXT_CREATOR_RPM || 6);

// Creador de email
const FREE_EMAIL_CREATOR_MAX_CHARS       = Number(process.env.FREE_EMAIL_CREATOR_MAX_CHARS || 12000);
const FREE_EMAIL_CREATOR_DAILY_TOKENS    = Number(process.env.FREE_EMAIL_CREATOR_DAILY_TOKENS || 80000);
const FREE_EMAIL_CREATOR_RPM             = Number(process.env.FREE_EMAIL_CREATOR_RPM || 6);

// ✅ límite de traducciones por día (solo traductor)
const FREE_TRANSLATOR_DAILY_REQUESTS = Number(process.env.FREE_TRANSLATOR_DAILY_REQUESTS || 50);
// ✅ límite de resúmenes por día (solo resumidor)
const FREE_SUMMARY_DAILY_REQUESTS  = Number(process.env.FREE_SUMMARY_DAILY_REQUESTS || 10);
// ✅ límite de correcciones por día (solo corrector)
const FREE_CORRECTOR_DAILY_REQUESTS = Number(process.env.FREE_CORRECTOR_DAILY_REQUESTS || 20);
// ✅ límite de parafraseos por día (solo parafraseador)
const FREE_PARAPHRASER_DAILY_REQUESTS = Number(process.env.FREE_PARAPHRASER_DAILY_REQUESTS || 20);
// ✅ límite de creaciones de texto por día (solo creador de texto)
const FREE_TEXT_CREATOR_DAILY_REQUESTS = Number(process.env.FREE_TEXT_CREATOR_DAILY_REQUESTS || 10);
// ✅ límite de creaciones de email por día (solo creador de email)
const FREE_EMAIL_CREATOR_DAILY_REQUESTS = Number(process.env.FREE_EMAIL_CREATOR_DAILY_REQUESTS || 10);

// ✅ Modelos
const FREE_TRANSLATOR_MODEL = String(process.env.FREE_TRANSLATOR_MODEL || "").trim();
const FREE_SUMMARY_MODEL    = String(process.env.FREE_SUMMARY_MODEL || "").trim();
const FREE_CORRECTOR_MODEL  = String(process.env.FREE_CORRECTOR_MODEL || "").trim();
const FREE_PARAPHRASER_MODEL = String(process.env.FREE_PARAPHRASER_MODEL || "").trim();
const FREE_TEXT_CREATOR_MODEL = String(process.env.FREE_TEXT_CREATOR_MODEL || "").trim();
const FREE_EMAIL_CREATOR_MODEL = String(process.env.FREE_EMAIL_CREATOR_MODEL || "").trim();

// Conversión aproximada chars→tokens (prudente)
const TOKENS_PER_CHAR = 0.25;

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
    v: "v3",
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

async function detectLanguageForBannerWithAI({ text = "", uiLanguage = "ES", model = "gpt-4o-mini" }) {
  const cleanText = String(text || "").trim();

  if (!cleanText || cleanText.length < 2) return null;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        max_tokens: 120,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You detect the main language of the user's text. Return ONLY valid JSON. Do not correct, translate, summarize, or rewrite the text."
          },
          {
            role: "user",
            content:
              `Detect the main language of this text.\n\n` +
              `UI language for label/button: ${uiLanguage}\n\n` +
              `Return JSON exactly like this:\n` +
              `{"code":"zh","label":"chino","buttonText":"Usar chino"}\n\n` +
              `Rules:\n` +
              `- code: short language code. Use "eus" for Basque, "es" for Spanish, "en" for English, "fr" for French. For other languages use common short codes like "zh", "ja", "ar", "de", "it", "pt", "ru", "ko", "nl", "sv", "ro", "uk".\n` +
`- label: language name translated to the UI language.\n` +
`- NEVER return the native language name.\n` +
`- Example:\n` +
`  - German + ES UI -> "alemán"\n` +
`  - German + EUS UI -> "alemana"\n` +
`  - German + EN UI -> "German"\n` +
`  - German + FR UI -> "allemand"\n` +
`- NEVER return "Deutsch", "Español", "Français", etc. unless that is the UI language itself.\n` +
`- buttonText: short button text written in the UI language, meaning "Use [language]".\n` +
`- If unsure, return {"code":"","label":"","buttonText":""}.\n\n` +
              `TEXT:\n${cleanText.slice(0, 3000)}`
          }
        ],
      }),
    });

    const detailText = await r.text().catch(() => "");
    let data = {};

    try {
      data = detailText ? JSON.parse(detailText) : {};
    } catch {
      data = {};
    }

    if (!r.ok) return null;

    const raw = data?.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(raw);

const code = String(parsed?.code || "").trim().toLowerCase();

if (!code) return null;

return { code };

  } catch {
    return null;
  }
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

// ✅ “guardrail” para EUS
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

function langNameTarget(code) {
  if (code === "eus") return "euskera";
  if (code === "es") return "español";
  if (code === "en") return "inglés";
  if (code === "fr") return "francés";
  if (code === "de") return "alemán";
  if (code === "it") return "italiano";
  if (code === "pt") return "portugués";
  if (code === "nl") return "neerlandés";
  if (code === "zh") return "chino";
  if (code === "ar") return "árabe";
  if (code === "ru") return "ruso";
  if (code === "ja") return "japonés";
  if (code === "sv") return "sueco";
  if (code === "ro") return "rumano";
  if (code === "uk") return "ucraniano";
  return "idioma de destino";
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

      const parts = [];
      for (const url of urls) {
        try {
          const r = await fetch(url, { method: "GET" });
          const html = await r.text();
          const text = htmlToText(html);

          if (!text || text.trim().length < 80) {
            return res.status(422).json({
              ok: false,
              error: "URL_EXTRACT_FAILED",
              message: "No se ha podido extraer texto de esta URL. Prueba con el texto o documento."
            });
          }

          parts.push(`URL: ${url}\n\n${text.slice(0, 9000)}`);
        } catch (e) {
          return res.status(422).json({
            ok: false,
            error: "URL_EXTRACT_FAILED",
            message: "No se ha podido extraer texto de esta URL. Prueba con el texto o documento."
          });
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

    // ✅ soportar documentos
    if (Array.isArray(body?.documentsText) && body.documentsText.length > 0) {
      const docsInline =
        "\nDOCUMENTOS (texto extraído):\n" +
        body.documentsText
          .map((d) => `--- ${d?.name || "documento"} ---\n${String(d?.text || "")}`)
          .join("\n\n");

      const firstUserIdx = messages.findIndex((m) => m?.role === "user");
      if (firstUserIdx >= 0) {
        const prev = String(messages[firstUserIdx]?.content || "");
        messages[firstUserIdx] = {
          ...messages[firstUserIdx],
          content: `${prev}${docsInline}`
        };
      } else {
        messages = [{ role: "user", content: docsInline }, ...messages];
      }
    }

    // ====== Identificar herramienta ======
    const rawTask = String(body?.task || "").toLowerCase();
    const rawMode = String(body?.mode || "").toLowerCase();

    const isSummary =
      rawTask.includes("summary") || rawTask.includes("summar") || rawTask.includes("resum") ||
      rawMode.includes("summary") || rawMode.includes("summar") || rawMode.includes("resum");

      const isTranslationAlternatives =
       rawTask.includes("translation_alternatives") ||
       rawMode.includes("translation_alternatives");

const isTranslator =
  !isTranslationAlternatives &&
  (
    hasTranslate || body?.mode === "translate_urls" ||
    rawTask.includes("translate") || rawMode.includes("translate") ||
    rawTask.includes("traduc") || rawMode.includes("traduc") ||
    rawMode.includes("translate_text") || rawMode.includes("translate_urls")
  );

    const isCorrector =
      rawTask.includes("correct") || rawMode.includes("correct") ||
      rawTask.includes("grammar") || rawMode.includes("grammar") ||
      rawTask.includes("corrector") || rawMode.includes("corrector") ||
      rawTask.includes("ortograf") || rawMode.includes("ortograf") ||
      rawTask.includes("gramat") || rawMode.includes("gramat");

    const isParaphraser =
      rawTask.includes("paraphrase") || rawMode.includes("paraphrase") ||
      rawTask.includes("parafrase") || rawMode.includes("parafrase") ||
      rawTask.includes("rewrite") || rawMode.includes("rewrite") ||
      rawTask.includes("reescrit") || rawMode.includes("reescrit");

    const isTextCreator =
      rawTask.includes("text_creator") || rawMode.includes("text_creator") ||
      rawTask.includes("textcreator") || rawMode.includes("textcreator") ||
      rawTask.includes("create_text") || rawMode.includes("create_text") ||
      rawTask.includes("generate_text") || rawMode.includes("generate_text") ||
      rawTask.includes("crear_texto") || rawMode.includes("crear_texto") ||
      rawTask.includes("creador_texto") || rawMode.includes("creador_texto");

    const isEmailCreator =
      rawTask.includes("email_creator") || rawMode.includes("email_creator") ||
      rawTask.includes("emailcreator") || rawMode.includes("emailcreator") ||
      rawTask.includes("create_email") || rawMode.includes("create_email") ||
      rawTask.includes("generate_email") || rawMode.includes("generate_email") ||
      rawTask.includes("crear_email") || rawMode.includes("crear_email") ||
      rawTask.includes("creador_email") || rawMode.includes("creador_email") ||
      rawTask.includes("crear_correo") || rawMode.includes("crear_correo") ||
      rawTask.includes("creador_correo") || rawMode.includes("creador_correo");

    let tool =
      isSummary ? "summary" :
      isTranslator ? "translator" :
      isCorrector ? "corrector" :
      isParaphraser ? "paraphraser" :
      isEmailCreator ? "email_creator" :
      isTextCreator ? "text_creator" :
      "other";

    if (tool === "other") {
      const sys = canonicalize(system || "");
      const user0 = canonicalize((messages || []).map(m => (m?.role === "user" ? m?.content : "")).join(" ").slice(0, 1500));
      const hint = `${sys} ${user0}`.slice(0, 2500);

      const looksSummary =
        hint.includes("resumen") || hint.includes("resumir") || hint.includes("resume") || hint.includes("summarize") || hint.includes("summary");

      const looksTranslate =
        hint.includes("traduc") || hint.includes("traduce") || hint.includes("translate") || hint.includes("itzul") || hint.includes("translation");

      const looksCorrector =
        hint.includes("corrector") || hint.includes("corrige") || hint.includes("corregir") ||
        hint.includes("gramatica") || hint.includes("ortografia") ||
        hint.includes("puntuacion") || hint.includes("estilo");

      const looksParaphraser =
        hint.includes("parafrase") || hint.includes("paraphrase") ||
        hint.includes("reescribe") || hint.includes("reescritura") ||
        hint.includes("rewrite") || hint.includes("rephrase");

      const looksTextCreator =
        hint.includes("creador de texto") || hint.includes("crear texto") ||
        hint.includes("genera un texto") || hint.includes("generar texto") ||
        hint.includes("redacta un texto") || hint.includes("redactar texto") ||
        hint.includes("text creator") || hint.includes("generate text") ||
        hint.includes("create text");

      const looksEmailCreator =
        hint.includes("creador de email") || hint.includes("crear email") ||
        hint.includes("creador de correo") || hint.includes("crear correo") ||
        hint.includes("redacta un email") || hint.includes("redactar email") ||
        hint.includes("redacta un correo") || hint.includes("redactar correo") ||
        hint.includes("email creator") || hint.includes("generate email") ||
        hint.includes("create email");

      if (looksSummary && !looksTranslate && !looksCorrector && !looksParaphraser && !looksTextCreator && !looksEmailCreator) tool = "summary";
      else if (looksTranslate && !looksSummary && !looksCorrector && !looksParaphraser && !looksTextCreator && !looksEmailCreator) tool = "translator";
      else if (looksCorrector && !looksSummary && !looksTranslate && !looksParaphraser && !looksTextCreator && !looksEmailCreator) tool = "corrector";
      else if (looksParaphraser && !looksSummary && !looksTranslate && !looksCorrector && !looksTextCreator && !looksEmailCreator) tool = "paraphraser";
      else if (looksEmailCreator && !looksSummary && !looksTranslate && !looksCorrector && !looksParaphraser && !looksTextCreator) tool = "email_creator";
      else if (looksTextCreator && !looksSummary && !looksTranslate && !looksCorrector && !looksParaphraser && !looksEmailCreator) tool = "text_creator";
    }

    // ✅ FORZAR MODELO POR HERRAMIENTA
    if (tool === "translator" && FREE_TRANSLATOR_MODEL) model = FREE_TRANSLATOR_MODEL;
    if (tool === "summary" && FREE_SUMMARY_MODEL) model = FREE_SUMMARY_MODEL;
    if (tool === "corrector" && FREE_CORRECTOR_MODEL) model = FREE_CORRECTOR_MODEL;
    if (tool === "paraphraser" && FREE_PARAPHRASER_MODEL) model = FREE_PARAPHRASER_MODEL;
    if (tool === "text_creator" && FREE_TEXT_CREATOR_MODEL) model = FREE_TEXT_CREATOR_MODEL;
    if (tool === "email_creator" && FREE_EMAIL_CREATOR_MODEL) model = FREE_EMAIL_CREATOR_MODEL;

    // ✅ Guardrail traductor
    const dst = hasTranslate ? body.to : (body?.dst || null);
    const dstCode = String(dst || "").toLowerCase();

if (tool === "translator" && dstCode) {
  system = `${String(system || "").trim()}

REGLA CRÍTICA DE DESTINO:
- Traduce SIEMPRE al idioma destino: ${langNameTarget(dstCode)}.
- La respuesta final debe estar completamente en ${langNameTarget(dstCode)}.
- No copies el texto original.
- No hagas traducción parcial.
- No mezcles idiomas.
- Si el destino es ruso, la respuesta debe estar en ruso usando alfabeto cirílico.
- Si el destino es árabe, la respuesta debe estar en árabe.
- Si el destino es chino, la respuesta debe estar en chino.
- Si el destino es japonés, la respuesta debe estar en japonés.
- Solo puedes mantener nombres propios, marcas, URLs, emails o códigos.
- No expliques nada. Devuelve solo la traducción final.`.trim();
}

    if (tool === "translator" && dstCode === "eus") {
      system = `${String(system || "").trim()}\n\n${eusGuardrail()}`.trim();
    }

    let finalMessages = [
      ...(system ? [{ role: "system", content: system }] : []),
      ...messages,
    ];

    // Límites según herramienta
    const MAX_CHARS =
      tool === "summary" ? FREE_SUMMARY_MAX_CHARS :
      tool === "corrector" ? FREE_CORRECTOR_MAX_CHARS :
      tool === "paraphraser" ? FREE_PARAPHRASER_MAX_CHARS :
      tool === "text_creator" ? FREE_TEXT_CREATOR_MAX_CHARS :
      tool === "email_creator" ? FREE_EMAIL_CREATOR_MAX_CHARS :
      tool === "translator" ? FREE_TRANSLATOR_MAX_CHARS :
      FREE_TRANSLATOR_MAX_CHARS;

    const DAILY_TOKENS =
      tool === "summary" ? FREE_SUMMARY_DAILY_TOKENS :
      tool === "corrector" ? FREE_CORRECTOR_DAILY_TOKENS :
      tool === "paraphraser" ? FREE_PARAPHRASER_DAILY_TOKENS :
      tool === "text_creator" ? FREE_TEXT_CREATOR_DAILY_TOKENS :
      tool === "email_creator" ? FREE_EMAIL_CREATOR_DAILY_TOKENS :
      tool === "translator" ? FREE_TRANSLATOR_DAILY_TOKENS :
      FREE_TRANSLATOR_DAILY_TOKENS;

    const RPM =
      tool === "summary" ? FREE_SUMMARY_RPM :
      tool === "corrector" ? FREE_CORRECTOR_RPM :
      tool === "paraphraser" ? FREE_PARAPHRASER_RPM :
      tool === "text_creator" ? FREE_TEXT_CREATOR_RPM :
      tool === "email_creator" ? FREE_EMAIL_CREATOR_RPM :
      tool === "translator" ? FREE_TRANSLATOR_RPM :
      FREE_TRANSLATOR_RPM;

    // ====== LÍMITES ======
    const ip  = getClientIp(req);
    const day = todayKey();

    console.log("[DAILY_DEBUG]", {
      tool, ip, day,
      FREE_SUMMARY_DAILY_REQUESTS,
      FREE_TRANSLATOR_DAILY_REQUESTS,
      FREE_CORRECTOR_DAILY_REQUESTS,
      FREE_PARAPHRASER_DAILY_REQUESTS,
      FREE_TEXT_CREATOR_DAILY_REQUESTS,
      FREE_EMAIL_CREATOR_DAILY_REQUESTS
    });

    // 1) Máx. caracteres por request
    const totalChars =
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
    } catch (e) {
      console.log("[KV RPM ERROR]", e?.message || e);
    }

    // 3) Límite de resúmenes por día
    if (tool === "summary") {
      try {
        const dailySummaryKey = `quota:summary:reqs:${day}:${ip}`;
        const usedReqs = await kv.incr(dailySummaryKey);
        if (usedReqs === 1) await kv.expire(dailySummaryKey, 60 * 60 * 26);
        if (usedReqs > FREE_SUMMARY_DAILY_REQUESTS) {
          return res.status(429).json({
            ok: false,
            error: "Daily summary requests exceeded",
            limit: { daily_summary_requests: FREE_SUMMARY_DAILY_REQUESTS, used: usedReqs },
            message:
              `Has alcanzado el límite diario del resumidor (${FREE_SUMMARY_DAILY_REQUESTS} resúmenes/día). ` +
              `Vuelve mañana o mejora de plan.`
          });
        }
      } catch (e) {
        console.log("[KV DAILY SUMMARY ERROR]", e?.message || e);
      }
    }

    // 3b) Límite de traducciones por día
    if (tool === "translator") {
      try {
        const dailyTranslatorKey = `quota:translator:reqs:${day}:${ip}`;
        const usedReqs = await kv.incr(dailyTranslatorKey);
        if (usedReqs === 1) await kv.expire(dailyTranslatorKey, 60 * 60 * 26);
        if (usedReqs > FREE_TRANSLATOR_DAILY_REQUESTS) {
          return res.status(429).json({
            ok: false,
            error: "Daily translator requests exceeded",
            limit: { daily_translator_requests: FREE_TRANSLATOR_DAILY_REQUESTS, used: usedReqs },
            message:
              `Has alcanzado el límite diario del traductor (${FREE_TRANSLATOR_DAILY_REQUESTS} traducciones/día). ` +
              `Vuelve mañana o mejora de plan.`
          });
        }
      } catch (e) {
        console.log("[KV DAILY TRANSLATOR ERROR]", e?.message || e);
      }
    }

    // 3c) Límite de correcciones por día
    if (tool === "corrector") {
      try {
        const dailyCorrectorKey = `quota:corrector:reqs:${day}:${ip}`;
        const usedReqs = await kv.incr(dailyCorrectorKey);
        if (usedReqs === 1) await kv.expire(dailyCorrectorKey, 60 * 60 * 26);
        if (usedReqs > FREE_CORRECTOR_DAILY_REQUESTS) {
          return res.status(429).json({
            ok: false,
            error: "Daily corrector requests exceeded",
            limit: { daily_corrector_requests: FREE_CORRECTOR_DAILY_REQUESTS, used: usedReqs },
            message:
              `Has alcanzado el límite diario del corrector (${FREE_CORRECTOR_DAILY_REQUESTS} correcciones/día). ` +
              `Vuelve mañana o mejora de plan.`
          });
        }
      } catch (e) {
        console.log("[KV DAILY CORRECTOR ERROR]", e?.message || e);
      }
    }

    if (tool === "paraphraser") {
      try {
        const dailyParaphraserKey = `quota:paraphraser:reqs:${day}:${ip}`;
        const usedReqs = await kv.incr(dailyParaphraserKey);
        if (usedReqs === 1) await kv.expire(dailyParaphraserKey, 60 * 60 * 26);
        if (usedReqs > FREE_PARAPHRASER_DAILY_REQUESTS) {
          return res.status(429).json({
            ok: false,
            error: "Daily paraphraser requests exceeded",
            limit: { daily_requests: FREE_PARAPHRASER_DAILY_REQUESTS, used: usedReqs },
            message:
              `Has alcanzado el límite diario del parafraseador (${FREE_PARAPHRASER_DAILY_REQUESTS} usos/día). ` +
              `Vuelve mañana.`
          });
        }
      } catch (e) {
        console.log("[KV DAILY PARAPHRASER ERROR]", e?.message || e);
      }
    }

    // 3d) Límite de creaciones de texto
    if (tool === "text_creator") {
      try {
        const dailyTextCreatorKey = `quota:text_creator:reqs:${day}:${ip}`;
        const usedReqs = await kv.incr(dailyTextCreatorKey);
        if (usedReqs === 1) await kv.expire(dailyTextCreatorKey, 60 * 60 * 26);
        if (usedReqs > FREE_TEXT_CREATOR_DAILY_REQUESTS) {
          return res.status(429).json({
            ok: false,
            error: "Daily text creator requests exceeded",
            limit: { daily_text_creator_requests: FREE_TEXT_CREATOR_DAILY_REQUESTS, used: usedReqs },
            message:
              `Has alcanzado el límite diario del creador de texto (${FREE_TEXT_CREATOR_DAILY_REQUESTS} usos/día). ` +
              `Vuelve mañana.`
          });
        }
      } catch (e) {
        console.log("[KV DAILY TEXT CREATOR ERROR]", e?.message || e);
      }
    }

    // 3e) Límite de creaciones de email
    if (tool === "email_creator") {
      try {
        const dailyEmailCreatorKey = `quota:email_creator:reqs:${day}:${ip}`;
        const usedReqs = await kv.incr(dailyEmailCreatorKey);
        if (usedReqs === 1) await kv.expire(dailyEmailCreatorKey, 60 * 60 * 26);
        if (usedReqs > FREE_EMAIL_CREATOR_DAILY_REQUESTS) {
          return res.status(429).json({
            ok: false,
            error: "Daily email creator requests exceeded",
            limit: { daily_email_creator_requests: FREE_EMAIL_CREATOR_DAILY_REQUESTS, used: usedReqs },
            message:
              `Has alcanzado el límite diario del creador de email (${FREE_EMAIL_CREATOR_DAILY_REQUESTS} usos/día). ` +
              `Vuelve mañana.`
          });
        }
      } catch (e) {
        console.log("[KV DAILY EMAIL CREATOR ERROR]", e?.message || e);
      }
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
    } catch (e) {
      console.log("[KV DAILY TOKENS ERROR]", e?.message || e);
    }

    // ====== KV CACHE ======
    const task = hasTranslate ? "translate" : (body?.task || body?.mode || "chat");
    const src  = hasTranslate ? body.from : (body?.src || null);
    const lang = body?.lang || null;
    const length = body?.length || null;

    const cacheKey = makeCacheKey({
      task, model, system, messages: finalMessages, src, dst, lang, length
    });

    const bannerDetectionText = String(
      body?.bannerDetectionText ||
      body?.text ||
      (messages || [])
        .filter((m) => m?.role === "user")
        .map((m) => m?.content || "")
        .join("\n")
    ).trim();

    const detectedLanguage =
  tool === "translator" && String(src || "").toLowerCase() === "auto"
    ? await detectLanguageForBannerWithAI({
        text: bannerDetectionText,
        uiLanguage: body?.uiLanguage || "ES",
        model: "gpt-4o-mini",
      })
    : null;

if (
  tool === "translator" &&
  String(src || "").toLowerCase() === "auto" &&
  detectedLanguage?.code &&
  dstCode
) {
  const sourceName = langNameTarget(detectedLanguage.code);
  const targetName = langNameTarget(dstCode);

  finalMessages = [
    {
      role: "system",
      content: `
Eres Euskalia, un traductor profesional.

El idioma origen detectado es: ${sourceName}.
El idioma destino es: ${targetName}.

Traduce TODO el texto del usuario desde ${sourceName} a ${targetName}.
No detectes otra vez el idioma.
No escribas DETECTED_LANGUAGE.
No copies el texto original.
No hagas traducción parcial.
No mezcles idiomas.
Devuelve únicamente la traducción final en ${targetName}.
`.trim(),
    },
    {
      role: "user",
      content: bannerDetectionText,
    },
  ];
}

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

console.log("TRANSLATOR DEBUG");
console.log("SRC:", src);
console.log("DST:", dst);
console.log("CONTENT:", content);

    const usage   = data?.usage ?? null;


    // ====== Actualizar cuota diaria real (tokens) ======
    try {
      const dailyKey = `quota:${tool}:${day}:${ip}`;
      const used = (await kv.get(dailyKey)) || 0;

      const realTokens =
        (usage?.prompt_tokens || 0) + (usage?.completion_tokens || 0) ||
        Math.max(estTokens, 1);

      const newUsed = used + realTokens;
      await kv.set(dailyKey, newUsed, { ex: 60 * 60 * 26 });
    } catch (e) {
      console.log("[KV DAILY TOKENS UPDATE ERROR]", e?.message || e);
    }

    return res.status(200).json({
      ok: true,
      provider: "openai",
      content,
      detectedLanguage,
      usage,
      cached: false
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || "Server error" });
  }
}