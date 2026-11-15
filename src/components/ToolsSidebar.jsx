import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ENTRANCE, ENTRANCE_DELAY_MS, entranceDelay, DURATION, EASE } from "@/lib/motion";
import { SlideIndicator } from "@/components/ui/motion-primitives";
import { Globe, FileText, SearchCheck, PenLine, Type, Mail, Menu } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Hover "señal azul" (solo transform/opacity):
// - el botón sube 2px (solo si el sistema no pide reducir movimiento),
// - un pseudo-elemento ::before que YA lleva el halo azul pasa de opacidad 0 a 1
//   (nunca se anima box-shadow directamente).
const SIDEBAR_INTERACTIVE = [
  "group relative",
  "transition-[transform,background-color,border-color] duration-fast ease-enter",
  "motion-safe:hover:-translate-y-0.5",
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl",
  "before:shadow-[0_0_0_4px_rgba(59,130,246,0.14),0_8px_22px_-6px_rgba(37,99,235,0.55)]",
  "before:opacity-0 before:transition-opacity before:duration-fast before:ease-state",
  "hover:before:opacity-100 focus-visible:before:opacity-100",
].join(" ");

const TOOLS = [
  { path: "/", icon: Globe, labelKey: "toolsMenu.translatorTitle", fallback: "Itzultzailea" },
  { path: "/resumen", icon: FileText, labelKey: "toolsMenu.summaryTitle", fallback: "Laburtzailea" },
  { path: "/corrector", icon: SearchCheck, labelKey: "toolsMenu.correctorTitle", fallback: "Corrector" },
  { path: "/parafraseador", icon: PenLine, labelKey: "toolsMenu.paraphraserTitle", fallback: "Parafraseatzailea" },
  { path: "/creador-texto", icon: Type, labelKey: "toolsMenu.textCreatorTitle", fallback: "Testu-sortzailea" },
  { path: "/creador-email", icon: Mail, labelKey: "toolsMenu.emailCreatorTitle", fallback: "Email-sortzailea" },
];

const COLUMN_CLASS =
  "hidden md:flex flex-col items-center gap-2 pt-2 w-14 shrink-0 min-[1424px]:absolute min-[1424px]:-left-24 min-[1424px]:-top-3";

// La cascada lateral de los iconos solo se hace en la PRIMERA carga de la web.
// Al saltar entre herramientas el menú se vuelve a montar, pero queda quieto:
// solo el indicador viaja y los iconos hacen un pequeño "pop" en su sitio.
// (Variable de módulo: sobrevive al desmontaje del menú entre rutas.)
let sidebarHasEntered = false;

// Pop en el sitio: escala 1 → 1.12 → 1, sin desplazamiento. Solo transform.
// Con reducir movimiento framer no anima la escala: el icono aparece directo.
const iconPop = (index) => ({
  initial: { scale: 1 },
  animate: { scale: [1, 1.12, 1] },
  transition: {
    duration: DURATION.slow,
    ease: EASE.state,
    delay: ENTRANCE_DELAY_MS.sidebarItem(index) / 1000,
  },
});

// Cada icono + etiqueta. En modo interactive se envuelven juntos para la
// entrada en cascada desde la izquierda (ENTRANCE.sidebarItem, CSS), solo en
// la primera carga. Se anima el envoltorio, no el enlace, para no pisar el
// hover de translate-y. Mismo espaciado: gap-2 dentro = gap-2 de la columna.
function SidebarItem({ interactive, index, cascade, children }) {
  if (!interactive) return <React.Fragment>{children}</React.Fragment>;
  return (
    <div
      className={`flex flex-col items-center gap-2 ${cascade ? ENTRANCE.sidebarItem : ""}`}
      style={cascade ? entranceDelay(ENTRANCE_DELAY_MS.sidebarItem(index)) : undefined}
    >
      {children}
    </div>
  );
}

// `interactive`: activa las micro-interacciones del sistema de movimiento
// (Fase 1, piloto en el Traductor). Sin la prop, el menú se ve exactamente
// como antes en el resto de herramientas.
export default function ToolsSidebar({ interactive = false } = {}) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const tr = (key, fallback) => (typeof t === "function" ? t(key) : null) || fallback;

  const activeTool = TOOLS.find((tool) => tool.path === pathname) || null;

  // true solo en el primer montaje de toda la sesión (useState conserva el
  // valor en el doble montaje de StrictMode).
  const [firstLoad] = React.useState(() => !sidebarHasEntered);
  React.useEffect(() => {
    sidebarHasEntered = true;
  }, []);
  const ActiveIcon = activeTool ? activeTool.icon : Menu;

  return (
    <>
      {/*
        >= md: columna de iconos en flujo normal (flex), para que reserve su
        propio espacio y no dependa de margen exterior.
        >= 1424px: el margen fuera de max-w-7xl ya es suficiente para que el
        diseño original (position: absolute, flotando a la izquierda del
        contenido) se vea bien, así que ahí reproducimos exactamente esas
        clases para que el resultado sea idéntico al original en pantallas
        grandes.
      */}
      <div className={COLUMN_CLASS}>
        {TOOLS.map(({ path, icon: Icon, labelKey, fallback }, index) => {
          const label = tr(labelKey, fallback);
          const isActive = path === pathname;
          return (
            <SidebarItem key={path} interactive={interactive} index={index} cascade={firstLoad}>
              <Link
                to={path}
                aria-current={isActive ? "page" : undefined}
                title={label}
                className={
                  "w-11 h-11 rounded-xl border flex items-center justify-center shadow-sm " +
                  (interactive ? SIDEBAR_INTERACTIVE + " " : "transition ") +
                  (index === 0 ? "min-[1424px]:mt-5" : "min-[1424px]:mt-2") +
                  " " +
                  (interactive
                    ? isActive
                      ? "border-transparent bg-white"
                      : "border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-200"
                    : isActive
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 bg-white hover:bg-slate-50")
                }
              >
                {/* Indicador viajero: el mismo layoutId en todas las herramientas hace
                    que se deslice del icono anterior al nuevo al cambiar de ruta.
                    Con reducir movimiento aparece directamente en el nuevo icono. */}
                {interactive && isActive && (
                  <SlideIndicator
                    layoutId="tools-sidebar-indicator"
                    className="absolute -inset-px rounded-xl bg-blue-50 ring-2 ring-blue-300"
                  />
                )}
                {interactive ? (
                  <motion.span className="relative inline-flex" {...(firstLoad ? {} : iconPop(index))}>
                    <Icon
                      className={
                        "w-5 h-5 transition-colors duration-fast ease-state " +
                        (isActive ? "text-blue-600" : "text-slate-700 group-hover:text-blue-600")
                      }
                    />
                  </motion.span>
                ) : (
                  <Icon className={"w-5 h-5 " + (isActive ? "text-blue-600" : "text-slate-700")} />
                )}
              </Link>
              <div className="text-[11px] font-medium text-slate-700 text-center leading-4">
                {label}
              </div>
            </SidebarItem>
          );
        })}
      </div>

      {/* < md: menú desplegable con icono + nombre de cada herramienta */}
      <div className="md:hidden shrink-0 absolute -left-24 top-0 md:static md:left-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={
                "w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm hover:bg-slate-50 " +
                (interactive ? "transition-colors duration-fast ease-state" : "transition")
              }
              aria-label="Herramientas"
            >
              <ActiveIcon className={"w-5 h-5 " + (activeTool ? "text-blue-600" : "text-slate-700")} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="rounded-xl border border-slate-200 shadow-lg bg-white p-1 w-[220px]">
            {TOOLS.map(({ path, icon: Icon, labelKey, fallback }) => {
              const label = tr(labelKey, fallback);
              const isActive = path === pathname;
              return (
                <DropdownMenuItem key={path} asChild className="cursor-pointer rounded-lg text-[14px] px-3 py-2">
                  <Link
                    to={path}
                    aria-current={isActive ? "page" : undefined}
                    className={"flex items-center gap-2 " + (isActive ? "text-blue-600 font-medium" : "text-slate-700")}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
