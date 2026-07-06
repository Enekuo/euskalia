import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, FileText, SearchCheck, PenLine, Type, Mail, Menu } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const TOOLS = [
  { path: "/", icon: Globe, labelKey: "toolsMenu.translatorTitle", fallback: "Itzultzailea" },
  { path: "/resumen", icon: FileText, labelKey: "toolsMenu.summaryTitle", fallback: "Laburtzailea" },
  { path: "/corrector", icon: SearchCheck, labelKey: "toolsMenu.correctorTitle", fallback: "Corrector" },
  { path: "/parafraseador", icon: PenLine, labelKey: "toolsMenu.paraphraserTitle", fallback: "Parafraseatzailea" },
  { path: "/creador-texto", icon: Type, labelKey: "toolsMenu.textCreatorTitle", fallback: "Testu-sortzailea" },
  { path: "/creador-email", icon: Mail, labelKey: "toolsMenu.emailCreatorTitle", fallback: "Email-sortzailea" },
];

export default function ToolsSidebar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const tr = (key, fallback) => (typeof t === "function" ? t(key) : null) || fallback;

  const activeTool = TOOLS.find((tool) => tool.path === pathname) || null;
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
      <div className="hidden md:flex flex-col items-center gap-2 pt-2 w-14 shrink-0 min-[1424px]:absolute min-[1424px]:-left-24 min-[1424px]:-top-3">
        {TOOLS.map(({ path, icon: Icon, labelKey, fallback }, index) => {
          const label = tr(labelKey, fallback);
          const isActive = path === pathname;
          return (
            <React.Fragment key={path}>
              <Link
                to={path}
                aria-current={isActive ? "page" : undefined}
                title={label}
                className={
                  "w-11 h-11 rounded-xl border flex items-center justify-center shadow-sm transition " +
                  (index === 0 ? "min-[1424px]:mt-5" : "min-[1424px]:mt-2") +
                  " " +
                  (isActive
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200 bg-white hover:bg-slate-50")
                }
              >
                <Icon className={"w-5 h-5 " + (isActive ? "text-blue-600" : "text-slate-700")} />
              </Link>
              <div className="text-[11px] font-medium text-slate-700 text-center leading-4">
                {label}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* < md: menú desplegable con icono + nombre de cada herramienta */}
      <div className="md:hidden shrink-0 absolute -left-24 top-0 md:static md:left-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
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
