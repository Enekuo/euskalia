// /api/premium.js
import crypto from "crypto";

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
    v: "v1",
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

    // Leer body seguro (igual que pro.js)
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

    // ====== ✅ AI DETECTOR (PREMIUM, sin límites) ======
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

      const MODEL = process.env.AI_DETECTOR_MODEL || "gpt-4.1-mini";

      // (mantenemos el makeCacheKey por si luego quieres cache; ahora no se usa)
      makeCacheKey({
        task: "ai_detector",
        model: MODEL,
        system: detectorSystem,
        messages: [{ role: "user", content: trimmed.slice(0, 5000) }],
        src: null,
        dst: null,
        lang: "na",
        length: null
      });

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

      // extraer texto JSON del response (robusto)
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

      return res.status(200).json({ ok: true, ai, human, note, cached: false });
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

    const finalMessages = [
      ...(system ? [{ role: "system", content: system }] : []),
      ...messages,
    ];

    // (mantenemos por si luego quieres cache; ahora no se usa)
    const task = hasTranslate ? "translate" : (body?.task || body?.mode || "chat");
    const src  = hasTranslate ? body.from : (body?.src || null);
    const dst  = hasTranslate ? body.to   : (body?.dst || null);
    const lang = body?.lang || null;
    const length = body?.length || null;

    makeCacheKey({
      task, model, system, messages: finalMessages, src, dst, lang, length
    });

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
