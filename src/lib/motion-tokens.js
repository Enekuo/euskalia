// =============================================================================
// Euskalia — TOKENS DE MOVIMIENTO (fuente única)
// -----------------------------------------------------------------------------
// Este archivo lo leen DOS sitios:
//   1) src/lib/motion.js        → variantes de framer-motion (en segundos)
//   2) tailwind.config.js       → clases duration-*, ease-*, animate-* (en ms)
// Si cambias un valor aquí, cambia en ambos. No dupliques estos números en
// componentes: importa de "@/lib/motion" o usa las clases de Tailwind.
//
// Mantener este archivo como JS plano (sin imports, sin JSX) para que
// Tailwind pueda cargarlo desde su config.
// =============================================================================

/** Duraciones en milisegundos. */
export const DURATION_MS = {
  instant: 120, // press / feedback al pulsar
  fast: 180,    // hover, cambios de color
  base: 320,    // aparición de elementos, pestañas
  slow: 520,    // transición de ruta, llegada de resultado
  hero: 900,    // solo páginas de marca / información grande (rango 800–1000)
};

/** Curvas de aceleración como arrays cubic-bezier (formato framer-motion). */
export const EASE = {
  // Entrada: arranca enérgico y aterriza suave (out-expo).
  enter: [0.16, 1, 0.3, 1],
  // Cambio entre dos estados (in-out).
  state: [0.65, 0, 0.35, 1],
};

/** Mismas curvas como string CSS. */
export const EASE_CSS = {
  enter: `cubic-bezier(${EASE.enter.join(", ")})`,
  state: `cubic-bezier(${EASE.state.join(", ")})`,
};

/** Muelle para indicadores y press: un pequeño rebote, nunca gelatina. */
export const SPRING = { type: "spring", stiffness: 420, damping: 32 };

/** Muelle elástico para "pop" de bloques grandes en páginas de marca/información. */
export const SPRING_POP = { type: "spring", stiffness: 170, damping: 15, mass: 0.9 };

/** Distancias de desplazamiento en px. */
export const DISTANCE = {
  micro: 4,
  element: 16,
  section: 32,
  large: 64,
};

/** Escalonado entre hijos, en milisegundos. */
export const STAGGER_MS = {
  tool: 50,  // herramientas
  brand: 90, // páginas de marca / información
  showcase: 200, // página de información: cascada lenta y muy visible
};

/** Bucles (sheen, orb): duraciones de un ciclo, en ms. */
export const LOOP_MS = {
  sheen: 1600,
  orb: 2400,
};
