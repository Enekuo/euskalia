import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  FileText,
  LifeBuoy,
  SearchCheck,
  PenLine,
  Mail,
  Type,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme, toggleTheme, isThemeExcluded } from "@/lib/theme";
import { IconMotionButton, SwapIcon, SlidingMenuGroup, SlidingMenuItem, SlideIndicator } from "@/components/ui/motion-primitives";
import { iconButton, iconHover, textHover } from "@/lib/motion";

// Mismo efecto que el botón claro/oscuro para TODOS los botones de la cabecera:
// fondo redondeado al pasar el ratón, el icono sube/crece/gira con muelle
// (iconHover) y todo se hunde al pulsar. En los que solo tienen texto, el texto
// hace lo mismo pero sin girar (textHover).
const MotionLink = motion(Link);
const HOVER_BG = "rounded-full hover:bg-slate-100 transition-colors duration-fast ease-state";
const HoverIcon = ({ children }) => (
  <motion.span variants={iconHover} className="inline-flex">
    {children}
  </motion.span>
);
const HoverText = ({ children }) => (
  <motion.span variants={textHover} className="inline-block">
    {children}
  </motion.span>
);
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "EUS", name: "Euskara" },
  { code: "ES", name: "Español" },
  { code: "EN", name: "English" },
  { code: "FR", name: "Français" },
];

// Botón claro/oscuro: el icono se transforma (sol ↔ luna) con el mismo muelle
// que el resto de iconos. No se muestra en las páginas de información, que
// siempre van en claro.
function ThemeToggle({ t }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  if (isThemeExcluded(pathname)) return null;
  const isDark = theme === "dark";
  const label = isDark ? t("header.theme_to_light") : t("header.theme_to_dark");
  return (
    <IconMotionButton
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      className="h-9 w-9 flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors duration-fast ease-state"
      icon={
        <SwapIcon swapKey={isDark ? "moon" : "sun"}>
          {isDark ? <Moon size={18} /> : <Sun size={18} />}
        </SwapIcon>
      }
    />
  );
}

// Lista de los desplegables "Tresnak" y "Baliabideak": mismo comportamiento que
// los selectores del Traductor. Una píldora azul (SlideIndicator) sigue al
// ratón/foco por la lista y descansa en la página actual, que se marca en azul.
// Al pulsar cualquier opción se llama a onNavigate (cierra el desplegable).
// `compact`: filas más bajas, icono sin círculo (Recursos).
function PillMenuList({ items, pathname, pillId, onNavigate, inMobileMenu, compact = false }) {
  const [hovered, setHovered] = useState(null);
  const activePath = items.some((it) => it.path === pathname) ? pathname : null;
  const pillAt = hovered ?? activePath;
  const width = inMobileMenu ? "w-full" : compact ? "w-48" : "w-56";

  return (
    <div className={`p-1 ${width}`} onMouseLeave={() => setHovered(null)}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.path === activePath;
        const iconColor = active ? "text-blue-600" : "text-slate-500";
        return (
          <Link
            key={item.path}
            to={item.path}
            aria-current={active ? "page" : undefined}
            className={`relative w-full text-left flex items-center p-2 font-medium rounded-lg ${
              compact ? "text-sm text-slate-700" : "text-[14px] text-slate-800"
            }`}
            onClick={onNavigate}
            onMouseEnter={() => setHovered(item.path)}
            onFocus={() => setHovered(item.path)}
          >
            {pillAt === item.path && (
              <SlideIndicator
                layoutId={`${pillId}${inMobileMenu ? "-mobile" : ""}`}
                className="absolute inset-0 rounded-lg bg-blue-50 ring-1 ring-blue-100"
              />
            )}
            {compact ? (
              <Icon
                size={item.iconSize || 16}
                className={`relative mr-2 transition-colors duration-fast ease-state ${item.iconClass || ""} ${iconColor}`}
              />
            ) : (
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 shrink-0 mr-3">
                <Icon size={16} className={`transition-colors duration-fast ease-state ${iconColor}`} />
              </span>
            )}
            <div className="relative flex flex-col">
              <span
                className={`transition-colors duration-fast ease-state ${
                  compact ? "" : "font-semibold text-[15px] leading-5"
                } ${active ? "text-blue-700" : ""}`}
              >
                {item.name}
              </span>
              {!compact && item.subtitle && <span className="text-xs text-slate-500 leading-4">{item.subtitle}</span>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function HelpBulbIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.134 2 5 5.134 5 9c0 2.27 1.05 3.85 2.2 4.98.67.66 1.3 1.5 1.3 2.52V17c0 .552.448 1 1 1h5c.552 0 1-.448 1-1v-.5c0-1.02.63-1.86 1.3-2.52C17.95 12.85 19 11.27 19 9c0-3.866-3.134-7-7-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 21h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);

  const { toast } = useToast();
  const { language, setLanguage, t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && !sessionStorage.getItem("lang-init")) {
        setLanguage("EUS");
      }
    } catch {}
  }, [setLanguage]);

  const handleFeatureClick = () => {
    toast({
      title: t("not_implemented_title"),
      description: t("not_implemented_subtitle"),
    });
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const pathname = location?.pathname || "/";
  const headerToolTitle =
    pathname === "/" || pathname.startsWith("/traductor")
      ? t("toolsMenu.translatorTitle")
      : pathname.startsWith("/resumen")
      ? t("toolsMenu.summaryTitle")
      : pathname.startsWith("/corrector")
      ? t("toolsMenu.correctorTitle")
      : pathname.startsWith("/parafraseador")
      ? t("toolsMenu.paraphraserTitle")
      : pathname.startsWith("/creador-texto")
      ? t("toolsMenu.textCreatorTitle")
      : pathname.startsWith("/creador-email")
      ? t("toolsMenu.emailCreatorTitle")
      : "";

  const tools = [
    {
      name: t("toolsMenu.translatorTitle"),
      subtitle: t("toolsMenu.translatorSubtitle"),
      icon: Globe,
      path: "/",
    },
    {
      name: t("toolsMenu.summaryTitle"),
      subtitle: t("toolsMenu.summarySubtitle"),
      icon: FileText,
      path: "/resumen",
    },
    {
      name: t("toolsMenu.correctorTitle"),
      subtitle: t("toolsMenu.correctorSubtitle"),
      icon: SearchCheck,
      path: "/corrector",
    },
    {
      name: t("toolsMenu.paraphraserTitle"),
      subtitle: t("toolsMenu.paraphraserSubtitle"),
      icon: PenLine,
      path: "/parafraseador",
    },
    {
      name: t("toolsMenu.textCreatorTitle"),
      subtitle: t("toolsMenu.textCreatorSubtitle"),
      icon: Type,
      path: "/creador-texto",
    },
    {
      name: t("toolsMenu.emailCreatorTitle"),
      subtitle: t("toolsMenu.emailCreatorSubtitle"),
      icon: Mail,
      path: "/creador-email",
    },
  ];

  // Al pulsar cualquier opción de un desplegable, se cierran los dos
  // desplegables y el menú móvil (antes se quedaban abiertos al navegar).
  const closeMenus = () => {
    setIsToolsMenuOpen(false);
    setIsResourcesMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const ToolsDropdownContent = ({ inMobileMenu = false }) => (
    <PillMenuList
      items={tools}
      pathname={location.pathname}
      pillId="header-tools-pill"
      inMobileMenu={inMobileMenu}
      onNavigate={closeMenus}
    />
  );

  const resources = [
    {
      name: t("resourcesMenu.support"),
      icon: LifeBuoy,
      isLink: true,
      path: "/soporte",
    },
    {
      name: t("resourcesMenu.suggestions"),
      icon: HelpBulbIcon,
      iconSize: 20,
      iconClass: "-ml-1",
      isLink: true,
      path: "/sugerencias",
    },
  ];

  const ResourcesDropdownContent = ({ inMobileMenu = false }) => (
    <PillMenuList
      items={resources}
      pathname={location.pathname}
      pillId="header-resources-pill"
      inMobileMenu={inMobileMenu}
      onNavigate={closeMenus}
      compact
    />
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-sm" : "border-b border-slate-200/80"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="mr-8 flex items-center">
            <img
              src="/Imagen favicon.webp"
              alt="Euskalia"
              className="h-11 mr-2"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Euskalia
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <DropdownMenu open={isToolsMenuOpen} onOpenChange={setIsToolsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  {...iconButton}
                  className={`flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 h-10 px-3 ${HOVER_BG} focus:outline-none focus-visible:outline-none focus-visible:ring-0`}
                >
                  {t("header.tools")}
                  <HoverIcon>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isToolsMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </HoverIcon>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white rounded-xl shadow-lg border border-slate-200 mt-2"
                align="start"
                sideOffset={8}
              >
                <DropdownMenuArrow
                  className="fill-white stroke-slate-200"
                  width={16}
                  height={8}
                />
                <ToolsDropdownContent />
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu
              open={isResourcesMenuOpen}
              onOpenChange={setIsResourcesMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <motion.button
                  {...iconButton}
                  className={`flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 h-10 px-3 ${HOVER_BG} focus:outline-none focus-visible:outline-none focus-visible:ring-0`}
                >
                  {t("header.resources")}
                  <HoverIcon>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isResourcesMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </HoverIcon>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white rounded-xl shadow-lg border border-slate-200 mt-2"
                align="start"
                sideOffset={8}
              >
                <DropdownMenuArrow
                  className="fill-white stroke-slate-200"
                  width={16}
                  height={8}
                />
                <ResourcesDropdownContent />
              </DropdownMenuContent>
            </DropdownMenu>

            <MotionLink
              to="/chat-ia"
              {...iconButton}
              className={`flex items-center text-sm font-medium text-slate-700 hover:text-slate-900 h-10 px-3 ${HOVER_BG}`}
            >
              <HoverText>{t("header.assistant")}</HoverText>
            </MotionLink>
          </nav>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center">
          {headerToolTitle ? (
            <div className="text-sm font-semibold text-slate-500">
              {headerToolTitle}
            </div>
          ) : null}
        </div>

        {/* Claro/oscuro, idioma, contacto y más información: separación uniforme
            (~28px entre textos: px-3 + gap-1 + px-3) y el grupo desplazado un
            poco a la derecha (-mr-6). */}
        <div className="hidden lg:flex items-center gap-1 ml-6 -mr-6">
          <ThemeToggle t={t} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                {...iconButton}
                className={`flex items-center gap-1.5 h-9 px-3 text-sm font-medium text-slate-700 hover:text-slate-900 ${HOVER_BG}`}
              >
                <HoverIcon>
                  <Globe size={16} />
                </HoverIcon>
                {language}
                <ChevronDown size={16} className="opacity-70" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 bg-white rounded-lg shadow-lg border border-slate-200 mt-2"
            >
              <SlidingMenuGroup id="header-lang-desktop" selected={language}>
                {languages.map((lang) => (
                  <SlidingMenuItem
                    key={lang.code}
                    value={lang.code}
                    onSelect={() => setLanguage(lang.code)}
                  >
                    {lang.name}
                  </SlidingMenuItem>
                ))}
              </SlidingMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <MotionLink
            to="/soporte"
            {...iconButton}
            className={`flex items-center h-9 px-3 text-sm font-medium text-slate-700 hover:text-slate-900 ${HOVER_BG}`}
          >
            <HoverText>{t("header.contact")}</HoverText>
          </MotionLink>

          <MotionLink
            to="/informacion"
            {...iconButton}
            className={`flex items-center h-9 px-3 text-sm font-medium text-slate-700 hover:text-slate-900 ${HOVER_BG}`}
          >
            <HoverText>{t("header.more_information")}</HoverText>
          </MotionLink>

        </div>
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle t={t} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                {...iconButton}
                className="h-9 px-3 rounded-full border border-transparent bg-white
                           flex items-center gap-1.5 text-sm font-medium text-slate-700
                           hover:bg-slate-100 transition-colors duration-fast ease-state"
                aria-label="Language"
                title="Language"
              >
                <HoverIcon>
                  <Globe size={16} />
                </HoverIcon>
                <span>{language}</span>
                <ChevronDown size={14} className="opacity-70" />
              </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-44 bg-white rounded-lg shadow-lg border border-slate-200 mt-2"
            >
              <SlidingMenuGroup id="header-lang-mobile" selected={language}>
                {languages.map((lang) => (
                  <SlidingMenuItem
                    key={lang.code}
                    value={lang.code}
                    onSelect={() => setLanguage(lang.code)}
                  >
                    {lang.name}
                  </SlidingMenuItem>
                ))}
              </SlidingMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <IconMotionButton
            onClick={() => setIsMobileMenuOpen(true)}
            className={`text-slate-800 p-1.5 ${HOVER_BG}`}
            aria-label="Menu"
            icon={<Menu size={24} />}
          />
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-white lg:hidden"
          >
            <div className="flex justify-between items-center h-16 px-4 border-b border-slate-200">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-slate-900"
              >
                Euskalia
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close">
                <X size={24} className="text-slate-800" />
              </button>
            </div>

            <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
              <div className="flex flex-col gap-1">
                <p className="px-2 text-sm font-semibold text-slate-500 mt-2 mb-1">
                  {t("header.tools")}
                </p>
                <div className="px-2">
                  <ToolsDropdownContent inMobileMenu />
                </div>

                <div className="px-2 my-2">
                  <DropdownMenuSeparator />
                </div>

                <p className="px-2 text-sm font-semibold text-slate-500 mt-2 mb-1">
                  {t("header.resources")}
                </p>
                <div className="px-2">
                  <ResourcesDropdownContent inMobileMenu />
                </div>

                <Link
                  to="/chat-ia"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left text-base font-medium h-12 px-2 rounded-md hover:bg-slate-100 mt-2 flex items-center"
                >
                  {t("header.assistant")}
                </Link>
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center gap-2 text-base h-12 w-full font-medium rounded-md hover:bg-slate-100">
                      <Globe size={18} />
                      <span>{languages.find((l) => l.code === language)?.name || language}</span>
                      <ChevronDown size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56 bg-white">
                    <SlidingMenuGroup id="header-lang-menu" selected={language}>
                {languages.map((lang) => (
                  <SlidingMenuItem
                    key={lang.code}
                    value={lang.code}
                    onSelect={() => setLanguage(lang.code)}
                  >
                    {lang.name}
                  </SlidingMenuItem>
                ))}
              </SlidingMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

<Link
  to="/soporte"
  onClick={() => setIsMobileMenuOpen(false)}
  className="h-12 w-full text-base font-medium rounded-md hover:bg-slate-100 flex items-center justify-center"
>
  {t("header.contact")}
</Link>

<Link
  to="/informacion"
  onClick={() => setIsMobileMenuOpen(false)}
  className="h-12 w-full text-base font-medium rounded-md hover:bg-slate-100 flex items-center justify-center"
>
  {t("header.more_information")}
</Link>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}