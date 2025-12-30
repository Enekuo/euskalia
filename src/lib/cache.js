import { kv } from "@vercel/kv";
import crypto from "crypto";

export const CACHE_TTL_SECONDS =
  Number(process.env.CACHE_TTL_SECONDS || 60 * 60 * 24 * 14); // 14 días

export function canonicalize(s) {
  return (s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/^[\s,.!?;:|]+|[\s,.!?;:|]+$/g, "")
    .trim();
}

export function makeCacheKey({ task, model, system, messages, src, dst, lang, length }) {
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

export async function cacheGet(key) {
  try { return await kv.get(key); } catch { return null; }
}
export async function cacheSet(key, value, ttl = CACHE_TTL_SECONDS) {
  try { await kv.set(key, value, { ex: ttl }); } catch {}
}
export async function refreshTTL(key, ttl = CACHE_TTL_SECONDS) {
  try { await kv.expire(key, ttl); } catch {}
}
