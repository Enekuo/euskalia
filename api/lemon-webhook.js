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

async function readRawBody(req) {
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function verifySignature({ rawBody, signature, secret }) {
  const digestHex = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  const sigHex = String(signature || "").trim();

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

function pickVariantId(payload) {
  const attrs = payload?.data?.attributes || {};

  return String(
    attrs?.variant_id ||
      payload?.data?.relationships?.variant?.data?.id ||
      ""
  ).trim();
}

function resolvePlanFromVariant(variantId) {
  const proVariantId = String(process.env.LEMON_VARIANT_ID || "").trim();
  const premiumVariantId = String(process.env.LEMON_PREMIUM_VARIANT_ID || "").trim();

  if (variantId && variantId === proVariantId) return "pro";
  if (variantId && variantId === premiumVariantId) return "premium";
  return null;
}

function getCollectionName(plan) {
  if (plan === "premium") return "paidEmailsPremium";
  return "paidEmails";
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

    const variantId = pickVariantId(payload);
    const plan = resolvePlanFromVariant(variantId);

    if (!plan) {
      console.warn("LEMON WEBHOOK: unknown variant id", variantId);
      return res.status(200).json({
        ok: true,
        ignored: true,
        reason: "unknown_variant",
      });
    }

    const eventName = String(payload?.meta?.event_name || "").trim();

    initFirebaseAdmin();
    const db = admin.firestore();
    const now = admin.firestore.FieldValue.serverTimestamp();

    let status = "paid";
    if (eventName === "subscription_cancelled") status = "cancelled";
    if (eventName === "subscription_expired") status = "expired";

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

    const targetCollection = getCollectionName(plan);
    const otherCollection =
      targetCollection === "paidEmails" ? "paidEmailsPremium" : "paidEmails";

    await db
      .collection(targetCollection)
      .doc(email)
      .set(
        {
          status,
          plan,
          email,
          updatedAt: now,
          lemon,
        },
        { merge: true }
      );

    // Limpieza por si el usuario cambia de plan
    await db.collection(otherCollection).doc(email).delete().catch(() => {});

    return res.status(200).json({
      ok: true,
      plan,
      status,
      collection: targetCollection,
    });
  } catch (err) {
    console.error("LEMON WEBHOOK ERROR:", err);
    return res.status(500).json({ error: "server_error" });
  }
}