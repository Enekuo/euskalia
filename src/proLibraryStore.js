import { useSyncExternalStore } from "react";
import { auth } from "@/lib/firebase";

// Clave de localStorage
const STORAGE_KEY = "euskalia_pro_library";

// ===== Estado interno (fuera de React) =====
let docs = loadInitialDocs();
const listeners = new Set();

function loadInitialDocs() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch {
    // ignorar errores de almacenamiento
  }
}

function emit() {
  persist();
  for (const l of listeners) l();
}

// ===== Helpers =====
function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return String(Date.now() + Math.random());
}

function formatDateLabel(dateIso) {
  try {
    return new Date(dateIso)
      .toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(".", "");
  } catch {
    return "";
  }
}

function clipTitle(raw, maxLen = 35) {
  const base = String(raw || "").trim();
  if (!base) return "";
  if (base.length <= maxLen) return base;
  return base.slice(0, maxLen).trimEnd() + "…";
}

function cleanAiTitle(raw) {
  let t = String(raw || "").trim();
  if (!t) return "";
  t = t.replace(/^["'“”‘’]+|["'“”‘’]+$/g, "").trim();
  t = t.replace(/\s+/g, " ").trim();
  t = t.replace(/\s*[.。]+$/g, "").trim();
  if (t.length > 60) t = t.slice(0, 60).trim();
  return t;
}

function fallbackTitleByKind(kind) {
  if (kind === "translation") return "Itzulpena";
  if (kind === "summary") return "Laburpena";
  if (kind === "corrector") return "Zuzentua";
  if (kind === "paraphraser") return "Parafrasea";
  if (kind === "ai-detector") return "IA analisia";
  if (kind === "humanizer") return "Gizatiartua";
  return "Dokumentua";
}

async function generateTitleWithAI({ content, kind }) {
  const user = auth?.currentUser || null;
  const token = user ? await user.getIdToken() : null;
  if (!token) return "";

  const text = String(content || "").trim();
  if (!text) return "";

  const toolHint =
    kind === "translation"
      ? "This is a translation."
      : kind === "summary"
      ? "This is a summary."
      : kind === "corrector"
      ? "This is a corrected text."
      : kind === "paraphraser"
      ? "This is a paraphrased text."
      : kind === "ai-detector"
      ? "This is an AI detector analysis."
      : kind === "humanizer"
      ? "This is a humanized rewrite."
      : "This is a document.";

  const system =
    "You are a professional title generator. Return ONLY the title. No quotes, no colon, no explanations.";

  const userPrompt = `Create a short, clear title (max 6 words) that describes the content.
Write the title in the SAME LANGUAGE as the content.
Do not start with words like "Text", "Translation" or "Summary".
It must sound natural as a real title.

Context:
${toolHint}

Content:
"""${text.slice(0, 4000)}"""`;

  try {
    const r = await fetch("/api/pro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 60,
        system,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    const data = await r.json().catch(() => null);
    if (!r.ok) return "";

    const out = cleanAiTitle(data?.content || "");
    return out;
  } catch {
    return "";
  }
}

// ===== API de escritura =====
export function addLibraryDoc({ kind, title, content }) {
  const id = makeId();
  const createdAt = new Date().toISOString();
  const createdAtLabel = formatDateLabel(createdAt);

  // Ahora aceptamos también: paraphraser / ai-detector / humanizer
  const safeKind =
    kind === "translation"
      ? "translation"
      : kind === "corrector"
      ? "corrector"
      : kind === "paraphraser"
      ? "paraphraser"
      : kind === "ai-detector"
      ? "ai-detector"
      : kind === "humanizer"
      ? "humanizer"
      : "summary";

  // ✅ Guardado inmediato con título temporal (siempre)
  const initialTitle = fallbackTitleByKind(safeKind);

  const doc = {
    id,
    kind: safeKind, // "translation" | "summary" | "corrector" | "paraphraser" | "ai-detector" | "humanizer"
    title: clipTitle(initialTitle, 35),
    content: String(content || ""),
    createdAt,
    createdAtLabel,
  };

  docs = [doc, ...docs];
  emit();

  // ✅ SIEMPRE mejorar título con IA (sin bloquear el guardado)
  ;(async () => {
    const aiTitle = await generateTitleWithAI({
      content: doc.content,
      kind: safeKind,
    });
    if (!aiTitle) return;

    const finalTitle = clipTitle(aiTitle, 35);
    if (!finalTitle) return;

    renameDoc(id, finalTitle);
  })();

  return id;
}

export function renameDoc(id, newTitle) {
  const title = clipTitle(newTitle, 35);
  if (!title) return;

  docs = docs.map((d) =>
    d.id === id
      ? {
          ...d,
          title,
        }
      : d
  );
  emit();
}

export function deleteDoc(id) {
  docs = docs.filter((d) => d.id !== id);
  emit();
}

// ===== Hook React para leer el store =====
export function useLibraryDocs() {
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => docs;

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    docs: snapshot,
    renameDoc,
    deleteDoc,
  };
}
