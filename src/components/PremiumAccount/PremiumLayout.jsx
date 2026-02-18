import React, { useState, useMemo, useEffect } from "react";
import {
  Home as HomeIcon,
  Wrench,
  Folder,
  Settings,
  Gem,
  Globe,
  ChevronDown,
  Bot,
  Lightbulb,
  LifeBuoy,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
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

// ✅ Firebase user (Google profile: displayName, photoURL, email)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function PremiumLayout({ children }) {
  const { t, language, setLanguage } = useTranslation();
  const tr = (key, fallback) => t(key) || fallback;

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [collapsed, setCollapsed] = useState(false);

  const [toolsOpen, setToolsOpen] = useState(
    pathname === "/cuenta-premium/traductor" ||
      pathname === "/cuenta-premium/resumen" ||
      pathname === "/cuenta-premium/corrector" ||
      pathname === "/cuenta-premium/parafraseador" ||
      pathname === "/cuenta-premium/humanizador" ||
      pathname === "/cuenta-premium/detector-ia"
  );

  const [creatorOpen, setCreatorOpen] = useState(
    pathname === "/cuenta-premium/creador/texto" ||
      pathname === "/cuenta-premium/creador/email" ||
      pathname === "/cuenta-premium/creador/audio"
  );

  const languages = [
    { code: "EUS", name: "Euskara" },
    { code: "ES", name: "Español" },
    { code: "EN", name: "English" },
    { code: "FR", name: "Français" },
  ];

  const showText = !collapsed;

  const isActive = (target) => pathname === target;

  const isToolsSection =
    pathname === "/cuenta-premium/traductor" ||
    pathname === "/cuenta-premium/resumen" ||
    pathname === "/cuenta-premium/corrector" ||
    pathname === "/cuenta-premium/parafraseador" ||
    pathname === "/cuenta-premium/humanizador" ||
    pathname === "/cuenta-premium/detector-ia";

  const isCreatorSection =
    pathname === "/cuenta-premium/creador/texto" ||
    pathname === "/cuenta-premium/creador/email" ||
    pathname === "/cuenta-premium/creador/audio";

  // ===== TÍTULO DINÁMICO EN HEADER (SOLO 6 HERRAMIENTAS, SIN SUBTÍTULO) =====
  const headerTitle = useMemo(() => {
    if (pathname === "/cuenta-premium/traductor") {
      return tr("premiumHeader_translator", "Traductor");
    }
    if (pathname === "/cuenta-premium/resumen") {
      return tr("premiumHeader_summary", "Resumen");
    }
    if (pathname === "/cuenta-premium/corrector") {
      return tr("premiumHeader_corrector", "Corrector");
    }
    if (pathname === "/cuenta-premium/parafraseador") {
      return tr("premiumHeader_paraphraser", "Parafraseador");
    }
    if (pathname === "/cuenta-premium/detector-ia") {
      return tr("premiumHeader_aiDetector", "Detector de IA");
    }
    if (pathname === "/cuenta-premium/humanizador") {
      return tr("premiumHeader_humanizer", "Humanizador");
    }
    return null;
  }, [pathname, tr]);

  // ===== USER (avatar Google) =====
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  const firstInitial = (u) => {
    const name = (u?.displayName || "").trim();
    if (name) return name[0].toUpperCase();

    const email = (u?.email || "").trim();
    if (email) return email[0].toUpperCase();

    return "?";
  };

  const stableAvatarStyle = (seed) => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    const hue = h % 360;
    return {
      backgroundColor: `hsl(${hue} 70% 45%)`,
      color: "white",
    };
  };

  const avatarSeed = user?.email || user?.uid || "guest";
  const avatarStyle = useMemo(() => stableAvatarStyle(avatarSeed), [avatarSeed]);
  const avatarInitial = useMemo(() => firstInitial(user), [user]);
  const avatarPhoto = user?.photoURL || "";

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex">
      {/* ✅ LOGO FIJO */}
      <div
        className="fixed top-0 left-0 h-16 bg-white flex items-center z-[60]"
        style={{ width: collapsed ? 64 : 192 }}
      >
        <div className="flex items-center gap-3 whitespace-nowrap px-4 pl-16">
          <img
            src="/Imagen favicon.png"
            alt="Euskalia"
            className="w-11 h-11 rounded-full"
            draggable={false}
          />
          <span className="font-bold tracking-tight text-2xl">Euskalia</span>
        </div>
      </div>

      {/* ========== SIDEBAR FIJO ========== */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          bg-white flex flex-col pt-16 pb-2
          transition-[width] duration-200
          overflow-visible
          ${collapsed ? "w-16 px-2" : "w-48 px-4"}
        `}
      >
        <div className="flex-1 flex flex-col">
          <nav className="space-y-1 text-sm mt-4">
            <button
              onClick={() => navigate("/cuenta-premium")}
              className={`
                w-full flex items-center gap-2 px-3 h-11 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-premium")
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
                    <span>{tr("premiumSidebar_tools", "Herramientas")}</span>
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
                    onClick={() => navigate("/cuenta-premium/traductor")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/traductor")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("premiumSidebar_translator", "Traductor")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-premium/resumen")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/resumen")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("premiumSidebar_summary", "Resumen")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-premium/corrector")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/corrector")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("premiumSidebar_corrector", "Corrector")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-premium/parafraseador")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/parafraseador")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("premiumSidebar_paraphraser", "Parafraseador")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-premium/detector-ia")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/detector-ia")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>{tr("premiumSidebar_aiDetector", "Detector de IA")}</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-premium/humanizador")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/humanizador")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">└</span>
                    <span>{tr("premiumSidebar_humanizer", "Humanizador")}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Biblioteca */}
            <button
              onClick={() => navigate("/cuenta-premium/biblioteca")}
              className={`
                w-full flex items-center gap-2 px-3 h-11 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-premium/biblioteca")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <Folder size={18} />
              {showText && (
                <span>{tr("premiumSidebar_library", "Biblioteca")}</span>
              )}
            </button>

            {/* Assistente de IA */}
            <button
              onClick={() => navigate("/cuenta-premium/assistant")}
              className={`
                w-full flex items-center gap-2 px-3 h-11 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-premium/assistant")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <Bot size={20} />
              {showText && (
                <span>{tr("premiumSidebar_chat", "Asistente de IA")}</span>
              )}
            </button>

            {/* Creador (NUEVO) */}
            <div className="space-y-1">
              <button
                onClick={() => setCreatorOpen((v) => !v)}
                className={`
                  w-full flex items-center gap-2 px-3 h-11 rounded-lg
                  ${collapsed ? "justify-center" : "justify-between"}
                  bg-gradient-to-r from-blue-600 to-cyan-500
                  hover:from-blue-700 hover:to-cyan-600
                  text-white
                `}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={18} />
                  {showText && <span>Creador</span>}
                </div>

                {showText && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      creatorOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                )}
              </button>

              {creatorOpen && !collapsed && (
                <div className="ml-2 mt-1 space-y-1">
                  <button
                    onClick={() => navigate("/cuenta-premium/creador/texto")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/creador/texto")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>Creador de texto</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-premium/creador/email")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/creador/email")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">│</span>
                    <span>Creador de email</span>
                  </button>

                  <button
                    onClick={() => navigate("/cuenta-premium/creador/audio")}
                    className={`
                      w-full flex items-center
                      pl-4 pr-2 h-9
                      text-sm
                      ${
                        isActive("/cuenta-premium/creador/audio")
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="mr-2 text-slate-200">└</span>
                    <span>Convertidor de audio</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="flex-1" />

          {/* BLOQUE FINAL */}
          <div className="space-y-1 text-sm mb-2">
            <button
              onClick={() => navigate("/cuenta-premium/sugerencias")}
              className={`
                w-full flex items-center gap-2 px-3 h-10 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-premium/sugerencias")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <Lightbulb size={18} />
              {showText && (
                <span>{tr("premiumSidebar_suggestions", "Sugerencias")}</span>
              )}
            </button>

            <button
              onClick={() => navigate("/cuenta-premium/soporte")}
              className={`
                w-full flex items-center gap-2 px-3 h-10 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-premium/soporte")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <LifeBuoy size={18} />
              {showText && <span>{tr("premiumSidebar_help", "Ayuda")}</span>}
            </button>

            <button
              onClick={() => navigate("/cuenta-premium/ajustes")}
              className={`
                w-full flex items-center gap-2 px-3 h-10 rounded-lg
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive("/cuenta-premium/ajustes")
                    ? "bg-slate-900 text-white font-medium"
                    : "hover:bg-slate-100 text-slate-700"
                }
              `}
            >
              <Settings size={18} />
              {showText && (
                <span>{tr("premiumSidebar_settings", "Ajustes")}</span>
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
                <span>{tr("premiumSidebar_collapse", "Contraer")}</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ========== COLUMNA DERECHA ========== */}
      <div className={`flex-1 flex flex-col transition-all ${collapsed ? "ml-16" : "ml-48"}`}>
        <header
          className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-200 fixed top-0 right-0 z-40"
          style={{ left: collapsed ? 64 : 192 }}
        >
          <div className="w-[180px]" />

          <div className="flex-1 min-w-0 flex items-center justify-center px-4">
            {headerTitle && (
              <div className="min-w-0 text-center">
                <div className="text-[20px] font-semibold tracking-tight text-slate-900 truncate">
                  {headerTitle}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* ✅ SOLO EL DIAMANTE con degradado */}
            <div className="h-9 w-9 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500">
              <Gem size={18} className="text-white" />
            </div>

            {/* ✅ SOLO EL BOTÓN PREMIUM con degradado */}
            <button
              className="
                h-9 px-4 rounded-full
                text-white text-sm font-medium
                bg-gradient-to-r from-blue-600 to-cyan-500
                hover:from-blue-700 hover:to-cyan-600
              "
            >
              {tr("premiumHeader_planPremium", "Plan Premium")}
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
                <DropdownMenuArrow className="fill-white stroke-slate-200" width={14} height={7} />

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

            <button
              type="button"
              onClick={() => navigate("/cuenta-premium/ajustes")}
              className="h-9 w-9 rounded-full border border-slate-200 bg-white overflow-hidden flex items-center justify-center hover:bg-slate-50"
              aria-label="Cuenta"
              title={user?.displayName || user?.email || "Cuenta"}
            >
              {avatarPhoto ? (
                <img
                  src={avatarPhoto}
                  alt="avatar"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="h-full w-full flex items-center justify-center font-semibold text-sm"
                  style={avatarStyle}
                >
                  {avatarInitial}
                </div>
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 mt-16 px-8 py-8 border-l border-slate-200">
          {children}
        </main>
      </div>
    </div>
  );
}
