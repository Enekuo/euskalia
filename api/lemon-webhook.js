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
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const sig = Buffer.from(signature || "", "utf8");
  if (digest.length !== sig.length) return false;
  return crypto.timingSafeEqual(digest, sig);
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

    // Lemon suele incluir data.attributes.user_email en algunos eventos,
    // y en otros puede venir en customer_email / order_email según tipo.
    const email =
      String(
        payload?.data?.attributes?.user_email ||
          payload?.data?.attributes?.customer_email ||
          payload?.data?.attributes?.order_email ||
          ""
      )
        .trim()
        .toLowerCase();

    if (!email) {
      return res.status(400).json({ error: "missing_email_in_payload" });
    }

    // Tipo de evento (depende del webhook)
    const eventName = String(payload?.meta?.event_name || "").trim();

    initFirebaseAdmin();
    const db = admin.firestore();

    // Estado por defecto: paid (tú luego eliges reglas por evento)
    let status = "paid";

    // Ejemplos típicos (ajustaremos según lo que actives):
    if (eventName.includes("cancel") || eventName.includes("expired")) {
      status = "canceled";
    }

    await db
      .collection("paidEmails")
      .doc(email)
      .set(
        {
          status,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          lemonEvent: eventName || null,
        },
        { merge: true }
      );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("LEMON WEBHOOK ERROR:", err);
    return res.status(500).json({ error: "server_error" });
  }
}
