// /api/translation-alternatives.js

function langName(code) {
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

    const originalText = String(body.originalText || "").trim();
    const translatedText = String(body.translatedText || "").trim();
    const src = String(body.src || "").trim().toLowerCase();
    const dst = String(body.dst || "").trim().toLowerCase();

    if (!originalText || !translatedText) {
      return res.status(400).json({
        ok: false,
        error: "Missing originalText or translatedText",
      });
    }

    if (translatedText.length > 350) {
      return res.status(200).json({
        ok: true,
        alternatives: [],
      });
    }

    const targetLanguage = langName(dst);

    const system = `
Eres Euskalia, un asistente profesional de traducción.

Tu tarea es generar alternativas naturales para una traducción ya hecha.

REGLAS OBLIGATORIAS:
- NO traduzcas desde cero.
- NO detectes idioma.
- NO expliques nada.
- NO repitas exactamente la traducción principal.
- Devuelve solo alternativas útiles si realmente mejoran o varían la expresión.
- Máximo 4 alternativas.
- Todas las alternativas deben conservar exactamente el mismo significado.
- Todas las alternativas deben estar en ${targetLanguage}.
- No inventes información.
- No añadas contexto.
- Si no hay alternativas útiles, responde exactamente: NO_ALTERNATIVES.
- Devuelve cada alternativa en una línea diferente.
`.trim();

    const user = `
Idioma origen: ${src}
Idioma destino: ${dst}

Texto original:
${originalText}

Traducción principal:
${translatedText}
`.trim();

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 300,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
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

    if (!r.ok) {
      return res.status(r.status).json({
        ok: false,
        error: "OpenAI error",
      });
    }

    const rawContent = String(data?.choices?.[0]?.message?.content || "").trim();

    if (!rawContent || rawContent === "NO_ALTERNATIVES") {
      return res.status(200).json({
        ok: true,
        alternatives: [],
      });
    }

    const alternatives = rawContent
      .split(/\r?\n/)
      .map((x) => x.replace(/^[-•\d.)\s]+/, "").trim())
      .filter(Boolean)
      .filter((x) => x.toLowerCase() !== translatedText.toLowerCase())
      .slice(0, 4);

    return res.status(200).json({
      ok: true,
      alternatives,
    });
  } catch (e) {
    console.error("translation alternatives error:", e);
    return res.status(500).json({
      ok: false,
      error: "Internal Server Error",
    });
  }
}