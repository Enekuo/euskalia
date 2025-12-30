import React, { useState, useMemo } from "react";
import {
  Home as HomeIcon,
  Wrench,
  Folder,
  Settings,
  Gem,
  User,
  Globe,
  ChevronDown,
  MessageSquare,
  Lightbulb,
  LifeBuoy,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useTranslation } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";

export default function LayoutPro({ children }) {
  const { t, language, setLanguage } = useTranslation();
  const tr = (key, fallback) => t(key) || fallback;

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [collapsed, setCollapsed] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(
    pathname === "/cuenta-pro/traductor" ||
      pathname === "/cuenta-pro/resumen" ||
      pathname === "/cuenta-pro/corrector" ||
      pathname === "/cuenta-pro/parafraseador" ||
      pathname === "/cuenta-pro/humanizador" ||
      pathname === "/cuenta-pro/detector-ia"
  );

  const languages = [
    { code: "EUS", name: "Euskara" },
    { code: "ES",  name: "Español" },
    { code: "EN",  name: "English" },
    { code: "FR",  name: "Français"},
  ];

  const showText = !collapsed;

  const isActive = (target) => pathname === target;
  const isToolsSection =
    pathname === "/cuenta-pro/traductor" ||
    pathname === "/cuenta-pro/resumen" ||
    pathname === "/cuenta-pro/corrector" ||
    pathname === "/cuenta-pro/parafraseador" ||
    pathname === "/cuenta-pro/humanizador" ||
    pathname === "/cuenta-pro/detector-ia";

  // ===== TÍTULO DINÁMICO EN HEADER (SOLO 6 HERRAMIENTAS, SIN SUBTÍTULO) =====
  const headerTitle = useMemo(() => {
    if (pathname === "/cuenta-pro/traductor") {
      return tr("proHeader_translator", "Traductor");
    }
    if (pathname === "/cuenta-pro/resumen") {
      return tr("proHeader_summary", "Resumen");
    }
    if (pathname === "/cuenta-pro/corrector") {
      return tr("proHeader_corrector", "Corrector");
    }
    if (pathname === "/cuenta-pro/parafraseador") {
      return tr("proHeader_paraphraser", "Parafraseador");
    }
    if (pathname === "/cuenta-pro/detector-ia") {
      return tr("proHeader_aiDetector", "Detector de IA");
    }
    if (pathname === "/cuenta-pro/humanizador") {
      return tr("proHeader_humanizer", "Humanizador");
    }
    return null;
  }, [pathname, tr]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex">
      {/* ========== SIDEBAR FIJO ========== */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          bg-white flex flex-col pt-3 pb-2
          transition-[width] duration-200
          ${collapsed ? "w-16 px-2" : "w-48 px-4"}
        `}
      >
        {/* Marca – misma posición siempre */}
        <div className="mb-6 flex items-center">
          <span
            className={`font-bold tracking-tight text-2xl ${
              collapsed ? "ml-6" : "ml-4"
            }`}
          >
            Euskalia
          </span>
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col">
          {/* Home */}
          <nav className="space-y-1 text-sm">
            <button
              onClick={() => navigate("/cuenta-pro")}
              className={`
                w-full flex items-center gap-2 px-3 h-11 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-pro")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <HomeIcon size={18} />
              {showText && <span>Home</span>}
            </button>

            {/* Herramientas */}
            <div className="space-y-1">
              <button
                onClick={() => setToolsOpen((v) => !v)}
                className={`
                  w-full flex items-center gap-2 px-3 h-11 rounded-lg
                  ${collapsed ? "justify-center" : "justify-between"}
                  ${
                    isToolsSection
                      ? "bg-slate-900 text-white"
                      : "hover:bg-slate-100 text-slate-700"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Wrench size={18} />
                  {showText && (
                    <span>{tr("proSidebar_tools", "Herramientas")}</span>
                  )}
                </div>

                {showText && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      toolsOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                )}
              </button>

              {toolsOpen && !collapsed && (
                <div className="ml-2 mt-1 space-y-1">
                  <button
                    onClick={() => navigate("/cuenta-pro/traductor")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-pro/traductor")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("proSidebar_translator", "Traductor")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-pro/resumen")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-pro/resumen")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("proSidebar_summary", "Resumen")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-pro/corrector")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-pro/corrector")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("proSidebar_corrector", "Corrector")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-pro/parafraseador")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-pro/parafraseador")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("proSidebar_paraphraser", "Parafraseador")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-pro/detector-ia")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-pro/detector-ia")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("proSidebar_aiDetector", "Detector de IA")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-pro/humanizador")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-pro/humanizador")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">└</span>
                    <span>{tr("proSidebar_humanizer", "Humanizador")}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Biblioteca */}
            <button
              onClick={() => navigate("/cuenta-pro/biblioteca")}
              className={`
                w-full flex items-center gap-2 px-3 h-11 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-pro/biblioteca")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <Folder size={18} />
              {showText && (
                <span>{tr("proSidebar_library", "Biblioteca")}</span>
              )}
            </button>

            {/* Chat IA */}
            <button
              onClick={() => navigate("/cuenta-pro/chat-ia")}
              className={`
                w-full flex items-center gap-2 px-3 h-11 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-pro/chat-ia")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <MessageSquare size={18} />
              {showText && (
                <span>{tr("proSidebar_chat", "Chat con IA")}</span>
              )}
            </button>
          </nav>

          {/* SEPARADOR FLEX PARA EMPUJAR ABAJO */}
          <div className="flex-1" />

          {/* BLOQUE FINAL */}
          <div className="space-y-1 text-sm mb-2">
            <button
              onClick={() => navigate("/cuenta-pro/sugerencias")}
              className={`
                w-full flex items-center gap-2 px-3 h-10 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-pro/sugerencias")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <Lightbulb size={18} />
              {showText && (
                <span>{tr("proSidebar_suggestions", "Sugerencias")}</span>
              )}
            </button>

            {/* ✅ ÚNICO CAMBIO: antes era /cuenta-pro/ayuda */}
            <button
              onClick={() => navigate("/cuenta-pro/ayuda")}
              className={`
                w-full flex items-center gap-2 px-3 h-10 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-pro/ayuda")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <LifeBuoy size={18} />
              {showText && <span>{tr("proSidebar_help", "Ayuda")}</span>}
            </button>

            <button
              onClick={() => navigate("/cuenta-pro/ajustes")}
              className={`
                w-full flex items-center gap-2 px-3 h-10 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-pro/ajustes")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <Settings size={18} />
              {showText && (
                <span>{tr("proSidebar_settings", "Ajustes")}</span>
              )}
            </button>
          </div>

          {/* Contraer */}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className={`
              w-full flex items-center
              ${collapsed ? "justify-center" : "justify-start"}
              gap-2 h-9 text-sm text-slate-500 hover:text-slate-700
            `}
          >
            {collapsed ? (
              <ChevronsRight size={18} />
            ) : (
              <>
                <ChevronsLeft size={18} />
                <span>{tr("proSidebar_collapse", "Contraer")}</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ========== COLUMNA DERECHA ========== */}
      <div
        className={`flex-1 flex flex-col transition-all ${
          collapsed ? "ml-16" : "ml-48"
        }`}
      >
        {/* ✅ HEADER FIJO (estático) */}
        <header
          className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-200 fixed top-0 right-0 z-40"
          style={{ left: collapsed ? 64 : 192 }}
        >
          {/* IZQUIERDA (fijo para no mover el centro) */}
          <div className="w-[180px]" />

          {/* CENTRO: título SOLO si es herramienta */}
          <div className="flex-1 min-w-0 flex items-center justify-center px-4">
            {headerTitle && (
              <div className="min-w-0 text-center">
                <div className="text-[20px] font-semibold tracking-tight text-slate-900 truncate">
                  {headerTitle}
                </div>
              </div>
            )}
          </div>

          {/* DERECHA */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full border border-slate-200 bg-white flex items-center justify-center">
              <Gem size={18} className="text-slate-700" />
            </div>

            <button
              className="
                h-9 px-4 rounded-full border border-slate-200
                bg-white text-sm font-medium text-slate-800
                hover:bg-slate-50
              "
            >
              Plan Pro
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                    h-9 px-3 rounded-full border border-slate-200 bg-white
                    flex items-center gap-1.5 text-sm font-medium text-slate-700
                    hover:bg-slate-50
                  "
                >
                  <Globe size={16} />
                  <span>{language}</span>
                  <ChevronDown size={14} className="opacity-70" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-40 bg-white rounded-lg shadow-lg border border-slate-200 mt-2"
              >
                <DropdownMenuArrow
                  className="fill-white stroke-slate-200"
                  width={14}
                  height={7}
                />

                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onSelect={() => setLanguage(lang.code)}
                    className="px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 cursor-pointer"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-9 w-9 rounded-full border border-slate-200 bg-white flex items-center justify-center">
              <User size={18} className="text-slate-700" />
            </div>
          </div>
        </header>

        {/* ✅ Empujamos el contenido para que no quede debajo del header fijo */}
        <main className="flex-1 mt-16 px-8 py-8 border-l border-slate-200">
          {children}
        </main>
      </div>
    </div>
  );
}
