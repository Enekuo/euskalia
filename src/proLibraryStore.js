import { useSyncExternalStore } from "react";

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

  const doc = {
    id,
    kind: safeKind, // "translation" | "summary" | "corrector" | "paraphraser" | "ai-detector" | "humanizer"
    title: clipTitle(title, 35),
    content: String(content || ""),
    createdAt,
    createdAtLabel,
  };

  docs = [doc, ...docs];
  emit();
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
