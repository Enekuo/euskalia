// =============================================================================
// Euskalia — TEMA CLARO / OSCURO
// -----------------------------------------------------------------------------
// - La preferencia se guarda en localStorage ("euskalia_theme": "light" | "dark").
//   Es una comodidad por navegador: si no se puede leer/escribir, se usa claro.
// - El modo oscuro se aplica poniendo la clase `dark` en <html>. Los colores
//   oscuros están en src/styles/dark.css (capa que traduce los colores claros).
// - Las PÁGINAS DE INFORMACIÓN (/informacion) se quedan SIEMPRE en claro.
// - index.html aplica la clase antes del primer pintado (sin destello blanco);
//   este módulo la mantiene sincronizada al cambiar de tema o de ruta.
// =============================================================================
import { useSyncExternalStore } from "react";

const KEY = "euskalia_theme";
const listeners = new Set();

function readStored() {
  try {
    return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

let current = typeof window !== "undefined" ? readStored() : "light";

/** Rutas que nunca usan modo oscuro (páginas de información). */
export function isThemeExcluded(pathname = "") {
  return pathname === "/informacion" || pathname.startsWith("/informacion/");
}

/** Pone o quita la clase `dark` en <html> según el tema y la ruta. */
export function applyTheme(theme, pathname) {
  if (typeof document === "undefined") return;
  const dark = theme === "dark" && !isThemeExcluded(pathname);
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

export function getTheme() {
  return current;
}

export function setTheme(theme) {
  current = theme === "dark" ? "dark" : "light";
  try {
    localStorage.setItem(KEY, current);
  } catch {
    /* sin almacenamiento: el tema dura solo esta visita */
  }
  listeners.forEach((fn) => fn());
}

export function toggleTheme() {
  setTheme(current === "dark" ? "light" : "dark");
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Tema actual ("light" | "dark"), reactivo. */
export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => "light");
}
