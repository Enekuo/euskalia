// /api/ai-detector.js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body || {};

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text" });
    }

    const trimmed = text.trim();
    if (trimmed.length < 40) {
      return res.status(400).json({
        error: "Text too short",
        message: "Necesito un texto un poco más largo para analizar (mínimo ~40 caracteres).",
      });
    }

    const MODEL = process.env.AI_DETECTOR_MODEL || "gpt-4.1-mini";

    const response = await client.responses.create({
      model: MODEL,
      input: [
        {
          role: "system",
          content:
            "Eres un detector de probabilidad de texto generado por IA. Devuelve SOLO JSON válido sin texto adicional.",
        },
        {
          role: "user",
          content: `Analiza este texto y estima probabilidad de que sea generado por IA.
Devuelve un JSON con esta forma EXACTA:
{"ai": number(0-100), "human": number(0-100), "note": string}

Reglas:
- ai + human debe sumar 100.
- Si no estás seguro, usa valores intermedios.
- note: una frase muy corta (máx 120 caracteres) en español.
Texto:
"""${trimmed.slice(0, 5000)}"""`,
        },
      ],
      // Forzamos que sea JSON (si el modelo lo soporta, ayuda mucho)
      text: { format: { type: "json_object" } },
    });

    let raw = response.output_text || "";
    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      // fallback: si viniera con texto extra, intentamos extraer el primer {...}
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      if (start >= 0 && end > start) {
        data = JSON.parse(raw.slice(start, end + 1));
      } else {
        return res.status(500).json({ error: "Bad model output", raw });
      }
    }

    let ai = Number(data?.ai);
    if (!Number.isFinite(ai)) ai = 50;
    ai = Math.max(0, Math.min(100, Math.round(ai)));
    const human = 100 - ai;

    const note =
      typeof data?.note === "string" && data.note.trim()
        ? data.note.trim().slice(0, 140)
        : "Estimación orientativa basada en patrones del texto.";

    return res.status(200).json({ ai, human, note });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
