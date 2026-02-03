// /api/lemon-webhook.js
import crypto from "node:crypto";
import admin from "firebase-admin";

function initFirebaseAdmin() {
  if (admin.apps?.length) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin env vars");
  }

  privateKey = privateKey.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
}

// Lee RAW body (necesario para validar la firma)
async function readRawBody(req) {
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function verifySignature({ rawBody, signature, secret }) {
  // Lemon: HMAC-SHA256(rawBody, secret) -> hex, enviado en header X-Signature :contentReference[oaicite:2]{index=2}
  const digestHex = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const sigHex = String(signature || "").trim();

  // Comparación segura por bytes (hex)
  const digest = Buffer.from(digestHex, "hex");
  const sig = Buffer.from(sigHex, "hex");
  if (digest.length !== sig.length) return false;
  return crypto.timingSafeEqual(digest, sig);
}

function pickEmail(payload) {
  return String(
    payload?.data?.attributes?.user_email ||
      payload?.data?.attributes?.customer_email ||
      payload?.data?.attributes?.order_email ||
      payload?.data?.attributes?.email ||
      ""
  )
    .trim()
    .toLowerCase();
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "method_not_allowed" });
    }

    const secret = process.env.LEMON_WEBHOOK_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "missing_lemon_webhook_secret" });
    }

    // Header real: X-Signature :contentReference[oaicite:3]{index=3}
    const signature = req.headers["x-signature"];
    const rawBody = await readRawBody(req);

    const ok = verifySignature({ rawBody, signature, secret });
    if (!ok) {
      return res.status(401).json({ error: "invalid_signature" });
    }

    const payload = JSON.parse(rawBody || "{}");

    const email = pickEmail(payload);
    if (!email) {
      return res.status(400).json({ error: "missing_email_in_payload" });
    }

    const eventName = String(payload?.meta?.event_name || "").trim(); // ej: subscription_cancelled :contentReference[oaicite:4]{index=4}
    const now = admin.firestore.FieldValue.serverTimestamp();

    initFirebaseAdmin();
    const db = admin.firestore();

    // Status por evento (simple y realista para empezar test mode)
    let status = "paid";
    if (eventName === "subscription_cancelled") status = "cancelled";
    if (eventName === "subscription_expired") status = "expired";
    // OJO: en Lemon, "cancelled" puede estar en gracia hasta que expire. :contentReference[oaicite:5]{index=5}

    // Guarda también IDs útiles para debug / futuro
    const attrs = payload?.data?.attributes || {};
    const lemon = {
      eventName: eventName || null,
      testMode: !!payload?.meta?.test_mode,
      createdAt: payload?.meta?.created_at || null,
      id: payload?.data?.id || null,
      subscriptionId: attrs?.subscription_id || null,
      orderId: attrs?.order_id || null,
      customerId: attrs?.customer_id || null,
      variantId: attrs?.variant_id || null,
      productId: attrs?.product_id || null,
    };

    await db
      .collection("paidEmails")
      .doc(email)
      .set(
        {
          status,
          email,
          updatedAt: now,
          lemon,
        }, 
        { merge: true }
      );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("LEMON WEBHOOK ERROR:", err);
    return res.status(500).json({ error: "server_error" });
  }
}
