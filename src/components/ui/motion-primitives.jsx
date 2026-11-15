// =============================================================================
// Euskalia — PIEZAS DE INTERACCIÓN COMPARTIDAS (sistema de movimiento)
// -----------------------------------------------------------------------------
// Componentes pequeños que aplican las variantes de "@/lib/motion" siempre de
// la misma forma en todas las herramientas. Solo capa visual: reciben los
// mismos props que el elemento original.
//
// IMPORTANTE (aprendido en el Traductor): framer conecta las variantes
// padre → hijo al MONTAR. Muchos botones montan deshabilitados y se habilitan
// después, así que `initial`/`animate` van SIEMPRE y solo `whileHover` /
// `whileTap` dependen de si el botón está habilitado.
// =============================================================================
import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  press,
  sheen,
  slideIndicator,
  iconHover,
  iconButton,
  iconSwap,
  rise,
  riseTransformOnly,
  stagger,
  DISTANCE,
  TRANSITION,
  brandReveal,
  resultLine,
  resultCascade,
  orbFade,
} from "@/lib/motion";
import EuskaliaOrb from "@/components/ui/EuskaliaOrb";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

/**
 * Botón de icono: el `icon` reacciona (sube / crece / gira, se hunde al pulsar);
 * `children` (p. ej. el tooltip) queda quieto. Deshabilitado no reacciona.
 * No anima el propio botón, así que respeta sus clases translate-* de Tailwind.
 */
export const IconMotionButton = ({ disabled, icon, children, ...rest }) => (
  <motion.button
    disabled={disabled}
    initial={iconButton.initial}
    animate={iconButton.animate}
    whileHover={disabled ? undefined : iconButton.whileHover}
    whileTap={disabled ? undefined : iconButton.whileTap}
    {...rest}
  >
    <motion.span variants={iconHover} className="inline-flex">
      {icon}
    </motion.span>
    {children}
  </motion.button>
);

/**
 * Props de framer para un botón principal (barrido de luz al hover + press).
 * El botón necesita además PRIMARY_BUTTON_CLASS y un <SheenLayer /> dentro,
 * con el texto en <span className="relative">.
 */
export const primaryButtonMotion = (enabled) => ({
  initial: "hidden",
  animate: "hidden",
  transition: press.transition,
  whileHover: enabled ? "visible" : undefined,
  whileTap: enabled ? press.whileTap : undefined,
});

export const PRIMARY_BUTTON_CLASS = "relative isolate overflow-hidden";

/** Barrido de luz azul → azul cielo (solo transform). Hijo del botón principal. */
export const SheenLayer = () => (
  <motion.span
    aria-hidden="true"
    variants={sheen}
    className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(100deg,transparent_22%,rgba(125,211,252,0.55)_42%,rgba(255,255,255,0.45)_50%,rgba(125,211,252,0.55)_58%,transparent_78%)]"
  />
);

/**
 * Un icono que se transforma en otro con muelle (copiar → ✓).
 * Ambos se apilan en la misma celda para que el cambio sea inmediato.
 * Uso: <SwapIcon swapKey={copied ? "check" : "copy"}>{copied ? <Check/> : <Copy/>}</SwapIcon>
 */
export const SwapIcon = ({ swapKey, children }) => (
  <span className="grid">
    <AnimatePresence initial={false}>
      <motion.span
        key={swapKey}
        variants={iconSwap}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="[grid-area:1/1] inline-flex"
      >
        {children}
      </motion.span>
    </AnimatePresence>
  </span>
);

/**
 * Indicador activo que se DESLIZA entre opciones (píldora o subrayado).
 * Se renderiza solo en la opción activa; el `layoutId` (único por grupo)
 * hace que viaje de una a otra. Con "reducir movimiento" aparece sin viajar.
 */
export const SlideIndicator = ({ layoutId, className, style }) => (
  <motion.span layoutId={layoutId} {...slideIndicator} className={className} style={style} />
);

// -----------------------------------------------------------------------------
// Desplegable con píldora deslizante (mismo comportamiento que el selector de
// idiomas del Traductor): la píldora sigue al ratón/teclado por la lista y
// descansa en la opción activa. Envuelve los DropdownMenuItem de Radix, así que
// se conserva su accesibilidad (teclado, cierre, foco).
//
// Uso:
//   <SlidingMenuGroup id="resumen-lang" selected={outputLang}>
//     <SlidingMenuItem value="eus" onClick={…}>{LBL_EUS}</SlidingMenuItem>
//     …
//   </SlidingMenuGroup>
// -----------------------------------------------------------------------------
const SlidingMenuContext = React.createContext(null);

export function SlidingMenuGroup({ id, selected, children }) {
  const [hovered, setHovered] = React.useState(null);
  const value = React.useMemo(
    () => ({ pillId: `${id}-pill`, pillAt: hovered ?? selected, selected, setHovered }),
    [id, hovered, selected]
  );
  return (
    <SlidingMenuContext.Provider value={value}>
      <div onMouseLeave={() => setHovered(null)}>{children}</div>
    </SlidingMenuContext.Provider>
  );
}

export const SlidingMenuItem = ({ value, children, onFocus, ...rest }) => {
  const ctx = React.useContext(SlidingMenuContext);
  const active = ctx?.selected === value;
  return (
    <DropdownMenuItem
      {...rest}
      onFocus={(e) => {
        ctx?.setHovered(value);
        onFocus?.(e);
      }}
      className={`relative w-full cursor-pointer px-3 py-2.5 text-left text-[14px] rounded-md transition-colors duration-fast ease-state focus:bg-transparent ${
        active ? "text-blue-700 font-medium focus:text-blue-700" : "text-slate-800 focus:text-slate-800"
      }`}
    >
      {ctx?.pillAt === value && (
        <SlideIndicator layoutId={ctx.pillId} className="absolute inset-0 rounded-md bg-blue-50 ring-1 ring-blue-100" />
      )}
      <span className="relative">{children}</span>
    </DropdownMenuItem>
  );
};

// -----------------------------------------------------------------------------
// APARICIÓN AL HACER SCROLL (páginas y secciones de información)
// -----------------------------------------------------------------------------
// `whileInView` de framer usa IntersectionObserver por debajo. Se dispara UNA
// sola vez. Con "reducir movimiento" (MotionConfig reducedMotion="user") no hay
// desplazamiento: solo fundido.
//
//   <Reveal as="section" className="…">…</Reveal>          bloque suelto
//   <RevealGroup as="section">                              escalonado "brand" (90 ms)
//     <RevealItem as="h2">…</RevealItem>
//     <RevealItem>…</RevealItem>
//   </RevealGroup>
//   <Reveal transformOnly>  → para bloques con el h1/LCP: solo se desplaza,
//                             nunca empieza invisible.
// -----------------------------------------------------------------------------
const REVEAL_VIEWPORT = { once: true, amount: 0.2 };
const revealVariants = rise({ distance: DISTANCE.section, transition: TRANSITION.enterSlow });
const revealTransformOnly = riseTransformOnly({ distance: DISTANCE.section, transition: TRANSITION.enterSlow });
const revealGroupVariants = stagger("brand");

export const Reveal = ({ as = "div", transformOnly = false, children, ...rest }) => {
  const C = motion[as];
  return (
    <C
      variants={transformOnly ? revealTransformOnly : revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      {...rest}
    >
      {children}
    </C>
  );
};

/**
 * Grupo que escalona a sus RevealItem. `kind`: "brand" (90 ms) | "showcase" (200 ms).
 * `delay`: segundos antes del primer hijo. `amount`: fracción visible para disparar.
 */
export const RevealGroup = ({ as = "div", kind = "brand", delay = 0, amount = REVEAL_VIEWPORT.amount, children, ...rest }) => {
  const C = motion[as];
  const variants = delay || kind !== "brand" ? stagger(kind, delay) : revealGroupVariants;
  return (
    <C variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true, amount }} {...rest}>
      {children}
    </C>
  );
};

/**
 * Hijo de un RevealGroup. `variant` elige una aparición intensa de
 * brandReveal (rise | lift | fromLeft | fromRight | pop | grow | bloom);
 * sin `variant`, usa el rise normal (32 px).
 */
export const RevealItem = ({ as = "div", variant, children, ...rest }) => {
  const C = motion[as];
  return (
    <C variants={variant ? brandReveal[variant] : revealVariants} {...rest}>
      {children}
    </C>
  );
};

// -----------------------------------------------------------------------------
// CARGA Y LLEGADA DEL RESULTADO
// -----------------------------------------------------------------------------
/**
 * Orbe de carga que aparece/desaparece con un fundido. Debe estar SIEMPRE
 * montado y recibir `show` (así puede desvanecerse al llegar el resultado).
 * `className` posiciona el envoltorio (p. ej. centrado absoluto o en flujo).
 */
export const LoadingOrb = ({ show, label, size, className = "" }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="loading-orb"
        variants={orbFade}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
      >
        <EuskaliaOrb label={label} size={size} />
      </motion.div>
    )}
  </AnimatePresence>
);

/**
 * Contenedor de cascada: sus hijos <CascadeItem> entran uno tras otro
 * (resultCascade). Con reducir movimiento NO hay cascada: aparece directo.
 */
export const Cascade = React.forwardRef(({ as = "div", count, children, ...rest }, ref) => {
  const reduce = useReducedMotion();
  const C = motion[as];
  if (reduce) {
    return (
      <C ref={ref} {...rest}>
        {children}
      </C>
    );
  }
  return (
    <C ref={ref} variants={resultCascade(count)} initial="hidden" animate="visible" {...rest}>
      {children}
    </C>
  );
});
Cascade.displayName = "Cascade";

export const CascadeItem = ({ as = "span", className = "block", children, ...rest }) => {
  const C = motion[as];
  return (
    <C variants={resultLine} className={className} {...rest}>
      {children}
    </C>
  );
};

/**
 * Texto que llega en cascada por líneas. Conserva el elemento y las clases
 * originales (p. ej. <p className="whitespace-pre-wrap">); cada línea es un
 * <span class="block"> (válido dentro de <p>). Las líneas vacías mantienen
 * su altura con <br />.
 */
export const CascadeText = React.forwardRef(({ text, as = "div", ...rest }, ref) => {
  const lines = String(text ?? "").split("\n");
  return (
    <Cascade ref={ref} as={as} count={lines.length} {...rest}>
      {lines.map((line, i) => (
        <CascadeItem key={i}>{line === "" ? <br /> : line}</CascadeItem>
      ))}
    </Cascade>
  );
});
CascadeText.displayName = "CascadeText";
