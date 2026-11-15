// =============================================================================
// Euskalia — SISTEMA DE MOVIMIENTO (framer-motion)
// -----------------------------------------------------------------------------
// Paleta CERRADA de animaciones. Las fases siguientes solo usan lo que hay
// aquí: si algo no encaja, se añade aquí (con los tokens), nunca un valor
// suelto en un componente.
//
//   rise            subir + aparecer
//   scaleIn         aparecer desde 0.96
//   slideIndicator  indicador activo que viaja entre opciones (layoutId)
//   sheen           barrido de luz azul
//   orb             pulso / respiración (presencia de la IA)
//   press           escala 0.96 al pulsar (muelle)
//   iconHover       reacción de un icono dentro de un botón (+ iconButton)
//   iconSwap        un icono se transforma en otro (copiar → ✓)
//
// REGLA DE RENDIMIENTO (obligatoria):
//   - Solo se animan `transform` (x, y, scale, rotate) y `opacity`.
//   - NUNCA se animan: box-shadow, filter / blur, backdrop-filter,
//     width / height, top / left / right / bottom, margin / padding.
//   - Sombras "vivas": el elemento lleva un pseudo-elemento (::after) que YA
//     tiene la sombra final, y lo que se anima es la opacidad de ese
//     pseudo-elemento.
//   - Brillos/halos: degradado radial estático; se anima su opacidad o su
//     transform, nunca un blur.
//
// ACCESIBILIDAD:
//   - La app está envuelta en <MotionConfig reducedMotion="user"> (main.jsx):
//     con "reducir movimiento" activo, framer desactiva transform/layout y
//     deja solo los fundidos de opacidad.
//   - Las animaciones CSS en bucle deben usar las clases animate-sheen /
//     animate-orb o la clase .motion-loop, que index.css anula con
//     prefers-reduced-motion.
//
// SEO / LCP:
//   - Chrome no cuenta como pintado un elemento con opacity 0. El h1 y el
//     contenedor principal de cada página deben animarse solo con transform
//     (usa `riseTransformOnly`), no partir de opacidad 0.
// =============================================================================

import {
  DURATION_MS,
  EASE,
  SPRING,
  DISTANCE,
  STAGGER_MS,
  LOOP_MS,
  SPRING_POP,
} from "./motion-tokens.js";

export { DURATION_MS, EASE, EASE_CSS, SPRING, SPRING_POP, DISTANCE, STAGGER_MS, LOOP_MS } from "./motion-tokens.js";

const s = (ms) => ms / 1000;

/** Duraciones en segundos (formato framer-motion). */
export const DURATION = {
  instant: s(DURATION_MS.instant),
  fast: s(DURATION_MS.fast),
  base: s(DURATION_MS.base),
  slow: s(DURATION_MS.slow),
  hero: s(DURATION_MS.hero),
};

/** Escalonados en segundos. */
export const STAGGER = {
  tool: s(STAGGER_MS.tool),
  brand: s(STAGGER_MS.brand),
  showcase: s(STAGGER_MS.showcase),
};

/** Transiciones base listas para usar. */
export const TRANSITION = {
  enter: { duration: DURATION.base, ease: EASE.enter },
  enterSlow: { duration: DURATION.slow, ease: EASE.enter },
  enterHero: { duration: DURATION.hero, ease: EASE.enter },
  state: { duration: DURATION.base, ease: EASE.state },
  hover: { duration: DURATION.fast, ease: EASE.state },
  press: { duration: DURATION.instant, ease: EASE.state },
  spring: SPRING,
};

// -----------------------------------------------------------------------------
// Estados con nombre: todas las variantes usan "hidden" / "visible" / "exit".
// -----------------------------------------------------------------------------

/**
 * rise — subir y aparecer.
 * @param {object} [opts]
 * @param {number} [opts.distance=DISTANCE.element] px que sube.
 *   Negativo = cae desde arriba (o entra desde la izquierda con axis "x").
 * @param {object} [opts.transition=TRANSITION.enter]
 * @param {"y"|"x"} [opts.axis="y"] eje del desplazamiento.
 */
export function rise({ distance = DISTANCE.element, transition = TRANSITION.enter, axis = "y" } = {}) {
  return {
    hidden: { opacity: 0, [axis]: distance },
    visible: { opacity: 1, [axis]: 0, transition },
    exit: {
      opacity: 0,
      [axis]: -Math.round(distance / 2),
      transition: { duration: DURATION.fast, ease: EASE.state },
    },
  };
}

/**
 * rise sin opacidad: para el h1 / contenedor principal (elemento LCP),
 * que debe estar pintado desde el primer frame.
 */
export function riseTransformOnly({ distance = DISTANCE.element, transition = TRANSITION.enter } = {}) {
  return {
    hidden: { y: distance },
    visible: { y: 0, transition },
    exit: { y: 0 },
  };
}

/** Variantes rise preconfiguradas por tamaño. */
export const riseMicro = rise({ distance: DISTANCE.micro });
export const riseElement = rise({ distance: DISTANCE.element });
export const riseSection = rise({ distance: DISTANCE.section, transition: TRANSITION.enterSlow });
export const riseLarge = rise({ distance: DISTANCE.large, transition: TRANSITION.enterHero });

/** scale-in — aparecer desde 0.96. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: TRANSITION.enter },
  exit: { opacity: 0, scale: 0.96, transition: { duration: DURATION.fast, ease: EASE.state } },
};

/**
 * Contenedor que escalona a sus hijos (los hijos usan rise/scaleIn con los
 * mismos nombres de estado y heredan "hidden"/"visible" del padre).
 * @param {"tool"|"brand"} [kind="tool"]
 * @param {number} [delayChildren=0] segundos antes del primer hijo.
 */
export function stagger(kind = "tool", delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: STAGGER[kind] ?? STAGGER.tool, delayChildren },
    },
    exit: {},
  };
}

/**
 * slide-indicator — el indicador activo (píldora) que viaja entre opciones.
 * Uso:
 *   {isActive && (
 *     <motion.span layoutId="tools-sidebar-indicator" {...slideIndicator} />
 *   )}
 * El layoutId debe ser único por grupo de opciones.
 */
export const slideIndicator = {
  layout: true,
  transition: SPRING,
  initial: false,
};

/**
 * press — feedback al pulsar. Se esparce en un motion.* :
 *   <motion.button {...press}>…</motion.button>
 */
export const press = {
  whileTap: { scale: 0.96 },
  transition: SPRING,
};

/**
 * icon-hover — reacción del icono dentro de un botón de icono.
 * El BOTÓN lleva {...iconButton} (gestiona los estados) y el ICONO va
 * envuelto en <motion.span variants={iconHover}> (hereda los estados).
 * Combina rise micro + press: el icono sube, crece y gira un poco al pasar
 * el ratón, y se hunde al pulsar.
 */
export const iconHover = {
  rest: { scale: 1, rotate: 0, y: 0, transition: SPRING },
  hover: { scale: 1.12, rotate: -8, y: -DISTANCE.micro / 2, transition: SPRING },
  tap: { scale: 0.88, rotate: 0, y: 0, transition: TRANSITION.press },
};

/** Props para el botón que contiene un icono con `iconHover`. */
export const iconButton = {
  initial: "rest",
  animate: "rest",
  whileHover: "hover",
  whileTap: "tap",
};

/**
 * icon-swap — un icono se transforma en otro (p. ej. copiar → ✓).
 * Usar dentro de <AnimatePresence initial={false}> con un `key` por icono,
 * y apilar ambos iconos en la misma celda para que el cambio sea inmediato.
 */
export const iconSwap = {
  hidden: { opacity: 0, scale: 0.4, rotate: -90 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: SPRING },
  exit: {
    opacity: 0,
    scale: 0.4,
    rotate: 90,
    transition: { duration: DURATION.fast, ease: EASE.state },
  },
};

/**
 * sheen — barrido de luz. Se aplica a un elemento hijo absoluto, con
 * overflow-hidden en el padre y un degradado transparente → blanco/azul →
 * transparente. Solo anima transform.
 *
 * Para bucles infinitos preferir la clase CSS `animate-sheen` (Tailwind),
 * que se apaga sola con prefers-reduced-motion.
 */
export const sheen = {
  // Vuelve al inicio de golpe (fuera del botón, invisible) en vez de
  // recorrer el camino de vuelta al quitar el ratón.
  hidden: { x: "-100%", transition: { duration: 0 } },
  visible: {
    x: "100%",
    transition: { duration: s(LOOP_MS.sheen) / 2, ease: EASE.state },
  },
  loop: {
    x: ["-100%", "100%"],
    transition: { duration: s(LOOP_MS.sheen), ease: EASE.state, repeat: Infinity },
  },
};

/**
 * orb — pulso / respiración. Solo scale + opacity.
 * Con reducedMotion="user", framer anula la escala y queda solo la opacidad.
 * Alternativa CSS: clase `animate-orb`.
 */
export const orb = {
  idle: { scale: 1, opacity: 1 },
  breathe: {
    scale: [0.95, 1.05, 0.95],
    opacity: [0.85, 1, 0.85],
    transition: { duration: s(LOOP_MS.orb), ease: EASE.state, repeat: Infinity },
  },
};

// -----------------------------------------------------------------------------
// COREOGRAFÍA DE ENTRADA DE UNA HERRAMIENTA  (CSS, no framer)
// -----------------------------------------------------------------------------
// Por qué CSS: en la carga, AdSense, Analytics y la fuente bloquean el hilo
// principal varias veces en el primer segundo. Una animación de framer (JS)
// se congela o salta durante esos bloqueos; las animaciones CSS de
// transform/opacity corren en el hilo del compositor y siguen fluidas.
// Regla: entradas de página → CSS (ENTRANCE). Interacciones → framer.
//
// Se reproduce en cada montaje (carga, recarga, navegación a la herramienta):
// una animación CSS arranca cuando el elemento entra en el DOM.
//
// Línea de tiempo (ms desde el primer pintado):
//   0      tarjeta principal sube 16px          520 ms  SIN opacidad (LCP)
//   40+    iconos del menú desde la izquierda   320 ms  cada 50 ms
//   50     barra de pestañas/idiomas cae 8px    320 ms  + fundido
//   100    panel de entrada sube 16px           320 ms  SIN opacidad (bloque principal)
//   180    panel de resultado sube 16px         320 ms  SIN opacidad (80 ms después)
//          → su texto "Aquí aparecerá la traducción" es el elemento LCP real
//            (medido): si se funde desde 0, el LCP empeora ~300 ms.
//   ~620   todo quieto (con 6 iconos de menú)
// Nada bloquea la interacción: se puede escribir desde el primer frame.
//
// Reducir movimiento: `motion-safe:` lleva el desplazamiento; con
// `motion-reduce:` los secundarios solo se funden y los principales
// aparecen directamente.
//
// Uso:
//   <section className={`… ${ENTRANCE.card}`} style={entranceDelay(ENTRANCE_DELAY_MS.card)}>
// -----------------------------------------------------------------------------
export const ENTRANCE = {
  card: "motion-safe:animate-enter-lift-slow",
  toolbar: "motion-safe:animate-enter-drop motion-reduce:animate-enter-fade",
  input: "motion-safe:animate-enter-lift",
  output: "motion-safe:animate-enter-lift",
  sidebarItem: "motion-safe:animate-enter-slide motion-reduce:animate-enter-fade",
  // Hero de páginas de marca/información: el bloque entero sube 64px desde
  // escala 0.96 y aparece (900 ms). Con reducir movimiento: solo fundido.
  heroBlock: "motion-safe:animate-enter-block motion-reduce:animate-enter-fade-slow",
  // Dentro del hero: cada columna entra desde su lado con el mismo estilo
  // (64px + escala 0.96 + fundido, 900 ms), un poco después que el bloque.
  heroFromLeft: "motion-safe:animate-enter-block-left motion-reduce:animate-enter-fade-slow",
  heroFromRight: "motion-safe:animate-enter-block-right motion-reduce:animate-enter-fade-slow",
};

export const ENTRANCE_DELAY_MS = {
  card: 0,
  toolbar: STAGGER_MS.tool,                          // 50
  input: STAGGER_MS.tool * 2,                        // 100
  output: STAGGER_MS.tool * 2 + STAGGER_MS.tool * 1.6, // 180 (80 ms tras el de entrada)
  sidebarItem: (i) => STAGGER_MS.tool * 0.8 + i * STAGGER_MS.tool, // 40, 90, 140…
  heroSides: STAGGER_MS.brand * 2, // 180: las columnas del hero tras el bloque
};

/** Estilo inline con el retraso de una entrada. */
export const entranceDelay = (ms) => (ms ? { animationDelay: `${ms}ms` } : undefined);

// -----------------------------------------------------------------------------
// APARICIÓN INTENSA (páginas de marca / información)
// -----------------------------------------------------------------------------
// Más recorrido (DISTANCE.large), más duración (hero) y "pop" con muelle
// elástico. Solo transform/opacity. Con reducir movimiento: solo fundido (las
// que no tienen opacidad simplemente aparecen ya colocadas).
//   rise       sube 64px y aparece
//   lift       sube 64px SIN opacidad (h1 / bloque LCP)
//   fromLeft   entra 64px desde la izquierda
//   fromRight  entra 64px desde la derecha
//   pop        ilustración: escala 0.85 + giro -4° + sube, con rebote
//   grow       barra de acento que se dibuja (scaleX 0 → 1)
//   bloom      forma de fondo que se expande (solo escala; respeta su opacidad)
export const brandReveal = {
  rise: rise({ distance: DISTANCE.large, transition: TRANSITION.enterHero }),
  lift: riseTransformOnly({ distance: DISTANCE.large, transition: TRANSITION.enterHero }),
  fromLeft: rise({ axis: "x", distance: -DISTANCE.large, transition: TRANSITION.enterHero }),
  fromRight: rise({ axis: "x", distance: DISTANCE.large, transition: TRANSITION.enterHero }),
  pop: {
    hidden: { opacity: 0, scale: 0.85, y: DISTANCE.large, rotate: -4 },
    visible: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: { ...SPRING_POP, opacity: TRANSITION.enter } },
  },
  grow: {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: TRANSITION.enterHero },
  },
  bloom: {
    hidden: { scale: 0.4 },
    visible: { scale: 1, transition: { duration: DURATION.hero * 1.6, ease: EASE.enter } },
  },
};
