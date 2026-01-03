import admin from "firebase-admin";

function getFeedbackApp() {
  const appName = "feedback";

  // Si ya existe, úsala
  try {
    return admin.app(appName);
  } catch (_) {
    // no existe -> la creamos
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing FIREBASE_* env vars for Firebase Admin");
  }

  // ✅ Normalización robusta (Vercel/Windows)
  privateKey = String(privateKey).trim();

  // Si viene con comillas al principio/fin, las quitamos
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1);
  }

  // Soporta ambos formatos: \\n o saltos reales + \r\n
  if (privateKey.includes("\\n")) privateKey = privateKey.replace(/\\n/g, "\n");
  privateKey = privateKey.replace(/\r\n/g, "\n");

  return admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    },
    appName
  );
}

const safeStr = (v, max = 6000) => {
  const s = (typeof v === "string" ? v : "").trim();
  return s.length > max ? s.slice(0, max) : s;
};

const getIp = (req) => {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
    }

    const body = req.body || {};
    if (body.website) return res.status(200).json({ ok: true }); // honeypot

    const type = safeStr(body.type, 20); // "support" | "suggestion"
    const name = safeStr(body.name, 120);
    const email = safeStr(body.email, 180);
    const subject = safeStr(body.subject, 180);
    const message = safeStr(body.message, 6000);
    const lang = safeStr(body.lang, 10);
    const page = safeStr(body.page, 300);
    const userId = safeStr(body.userId, 200);

    if (type !== "support" && type !== "suggestion") {
      return res.status(400).json({ ok: false, error: "INVALID_TYPE" });
    }
    if (!message || message.length < 5) {
      return res.status(400).json({ ok: false, error: "MESSAGE_REQUIRED" });
    }

    const app = getFeedbackApp();
    const db = app.firestore();

    await db.collection("feedback").add({
      type,
      name: name || null,
      email: email || null,
      subject: subject || null,
      message,
      lang: lang || null,
      page: page || null,
      userId: userId || null,
      status: "new",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      meta: {
        ip: getIp(req),
        ua: safeStr(req.headers["user-agent"] || "", 400),
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("feedback api error:", err);
    return res.status(500).json({
      ok: false,
      error: "SERVER_ERROR",
      message: String(err?.message || err),
      code: err?.code || null,
    });
  }
}
