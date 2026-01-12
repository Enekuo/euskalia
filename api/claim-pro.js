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
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

function getBearerToken(req) {
  const auth = req.headers.authorization || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "method_not_allowed" });
    }

    initFirebaseAdmin();

    const token = getBearerToken(req);
    if (!token) return res.status(401).json({ error: "missing_token" });

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    let email = (decoded.email || "").trim().toLowerCase();
    if (!email) {
      const user = await admin.auth().getUser(uid);
      email = (user.email || "").trim().toLowerCase();
    }
    if (!email) return res.status(400).json({ error: "missing_email" });

    const db = admin.firestore();

    const paidSnap = await db.collection("paidEmails").doc(email).get();
    if (!paidSnap.exists) {
      return res.status(403).json({
        error: "email_not_paid",
        message: "Entra con el mismo email con el que realizaste el pago.",
      });
    }

    const status = String((paidSnap.data() || {}).status || "").toLowerCase();
    if (status && status !== "paid" && status !== "active") {
      return res.status(403).json({
        error: "payment_not_active",
        message: "Tu pago no está activo.",
      });
    }

    return res.status(200).json({ ok: true, uid, email });
  } catch (err) {
    console.error("CLAIM PRO ERROR:", err);
    return res.status(500).json({ error: "server_error" });
  }
}
