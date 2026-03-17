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

    const premiumSnap = await db.collection("paidEmailsPremium").doc(email).get();
    const proSnap = await db.collection("paidEmails").doc(email).get();

    let paidSnap = null;
    let plan = null;

    if (premiumSnap.exists) {
      paidSnap = premiumSnap;
      plan = "premium";
    } else if (proSnap.exists) {
      paidSnap = proSnap;
      plan = "pro";
    } else {
      return res.status(403).json({
        error: "email_not_paid",
        message: "Entra con el mismo email con el que realizaste el pago.",
      });
    }

    const data = paidSnap.data() || {};
    const status = String(data.status || "").toLowerCase();

    if (status && status !== "paid" && status !== "active") {
      return res.status(403).json({
        error: "payment_not_active",
        message: "Tu pago no está activo.",
      });
    }

    await admin.auth().setCustomUserClaims(uid, {
      pro: plan === "pro",
      premium: plan === "premium",
      plan,
      paidEmail: email,
    });

    return res.status(200).json({
      ok: true,
      uid,
      email,
      plan,
      pro: plan === "pro",
      premium: plan === "premium",
    });
  } catch (err) {
    console.error("CLAIM PRO ERROR:", err);
    return res.status(500).json({ error: "server_error" });
  }
}