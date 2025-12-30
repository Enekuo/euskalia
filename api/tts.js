// /api/tts.js — Vercel Edge Runtime
export const config = { runtime: "edge" };

import OpenAI from "openai";

// ===== Helpers =====
function jsonHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  };
}

function audioHeaders(ct) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": ct,
    "Cache-Control": "no-store",
  };
}

// ===== Handler =====
export default async function handler(req) {
  // Preflight
  if (req.method === "OPTIONS") {
    return new Response("", { status: 200, headers: jsonHeaders() });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ ok: false, error: "Method Not Allowed" }),
      { status: 405, headers: jsonHeaders() }
    );
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing OPENAI_API_KEY" }),
        { status: 500, headers: jsonHeaders() }
      );
    }

    // Body seguro
    const body = await req.json().catch(() => ({}));
    let text = (body && body.text) || "";
    const voice  = body.voice  || "alloy";               // voces: alloy, verse, coral, etc.
    const format = (body.format || "mp3").toLowerCase(); // "mp3" | "wav" | "pcm"
    const speed  = Number(body.speed || 1.0);            // 0.25–4.0
    const model  = body.model || "gpt-4o-mini-tts";      // "tts-1" o "gpt-4o-mini-tts"

    text = String(text).trim().replace(/\s+/g, " ");
    if (!text) {
      return new Response(
        JSON.stringify({ ok: false, error: "No text provided" }),
        { status: 400, headers: jsonHeaders() }
      );
    }

    // (opcional) límite prudente para evitar latencias largas
    const MAX_CHARS = 5000;
    if (text.length > MAX_CHARS) {
      text = text.slice(0, MAX_CHARS);
    }

    const openai = new OpenAI({ apiKey });

    // Generar audio
    const res = await openai.audio.speech.create({
      model,         // "gpt-4o-mini-tts" (rápido) o "tts-1"
      voice,         // p.ej. "alloy"
      input: text,
      format,        // "mp3" | "wav" | "pcm"
      speed,         // 1.0 por defecto
    });

    const buf = await res.arrayBuffer();
    const ct =
      format === "wav" ? "audio/wav" :
      format === "pcm" ? "audio/wave; codecs=1" : // PCM 16-bit
      "audio/mpeg";                               // mp3 por defecto

    return new Response(buf, { status: 200, headers: audioHeaders(ct) });
  } catch (err) {
    // Intenta exponer un mensaje útil si viene de la API
    let detail = (err && err.message) || "TTS failed";
    try {
      if (err && err.response) {
        const txt = await err.response.text();
        if (txt) detail = txt;
      }
    } catch {}

    return new Response(
      JSON.stringify({ ok: false, error: "TTS failed", detail }),
      { status: 500, headers: jsonHeaders() }
    );
  }
}
