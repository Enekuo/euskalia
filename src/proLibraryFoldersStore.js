import { useSyncExternalStore } from "react";

const STORAGE_KEY = "euskalia_pro_folders";

// ===== Estado interno (fuera de React) =====
let folders = loadInitialFolders();
const listeners = new Set();

function loadInitialFolders() {
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(folders));
  } catch {
    // ignorar errores de almacenamiento
  }
}

function emit() {
  persist();
  for (const l of listeners) l();
}

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return String(Date.now() + Math.random());
}

// ===== API de escritura =====
export function addFolder({ name, docIds }) {
  const id = makeId();
  const createdAt = new Date().toISOString();

  const folder = {
    id,
    name: String(name || "").trim(),
    docIds: Array.isArray(docIds) ? docIds : [],
    createdAt,
  };

  folders = [folder, ...folders];
  emit();
  return id;
}

export function updateFolderDocs(id, docIds) {
  folders = folders.map((f) =>
    f.id === id
      ? {
          ...f,
          docIds: Array.isArray(docIds) ? docIds : [],
        }
      : f
  );
  emit();
}

export function deleteFolder(id) {
  folders = folders.filter((f) => f.id !== id);
  emit();
}

// ===== Hook React para leer el store =====
export function useLibraryFolders() {
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => folders;

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    folders: snapshot,
    deleteFolder,
    updateFolderDocs,
  };
}
