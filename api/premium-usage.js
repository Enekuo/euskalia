// /api/premium-usage.js
import { kv } from "@vercel/kv";
import admin from "firebase-admin";

const PREMIUM_MONTHLY_CHARS = Number(process.env.PREMIUM_MONTHLY_CHARS || 2000000);
const PREMIUM_MONTHLY_TTL_SECONDS = Number(process.env.PREMIUM_MONTHLY_TTL_SECONDS || 60 * 60 * 24 * 62);

// ===== Firebase Admin =====
function initFirebaseAdmin() {
  if (admin.apps?.length) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing FIREBASE_* env vars for Firebase Admin");
  }

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

function monthKey(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function premiumMonthlyUsageKey(uid, month = monthKey()) {
  return `usage:premium:chars:${month}:${uid}`;
}

export default async function handler(req, res) {
  // CORS / Preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    const uid = await getUidFromRequest(req);
    if (!uid) {
      return res.status(401).json({
        ok: false,
        error: "Unauthorized",
        message: "Necesitas iniciar sesión para usar el plan Premium."
      });
    }

    const month = monthKey();
    const usageKey = premiumMonthlyUsageKey(uid, month);

    const usedChars = Number((await kv.get(usageKey)) || 0);

    // refresca TTL (solo si existe el contador)
    try {
      if (usedChars > 0) {
        await kv.expire(usageKey, PREMIUM_MONTHLY_TTL_SECONDS);
      }
    } catch {}

    return res.status(200).json({
      ok: true,
      usedChars,
      limitChars: PREMIUM_MONTHLY_CHARS,
      month
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || "Server error" });
  }
}