import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Linkedin, Mail, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

/* ==== Banderas en SVG (24×18) ==== */
function FlagEUS() {
  return (
    <svg viewBox="0 0 16 12" width="24" height="18" aria-hidden="true">
      <rect width="16" height="12" fill="#D52B1E" rx="2" />
      <path d="M0 0 L16 12 M16 0 L0 12" stroke="#007A3D" strokeWidth="3" />
      <rect x="6.5" y="0" width="3" height="12" fill="#fff" />
      <rect x="0" y="4.5" width="16" height="3" fill="#fff" />
    </svg>
  );
}
function FlagES() {
  return (
    <svg viewBox="0 0 16 12" width="24" height="18" aria-hidden="true">
      <rect width="16" height="12" fill="#AA151B" rx="2" />
      <rect x="0" y="3" width="16" height="6" fill="#F1BF00" />
    </svg>
  );
}
function FlagUS() {
  return (
    <svg viewBox="0 0 16 12" width="24" height="18" aria-hidden="true">
      <rect width="16" height="12" fill="#B22234" rx="2" />
      {[1, 3, 5, 7, 9, 11].map((y) => (
        <rect key={y} x="0" y={y} width="16" height="1" fill="#fff" />
      ))}
      <rect x="0" y="0" width="7" height="7" fill="#3C3B6E" rx="1" />
    </svg>
  );
}
function FlagFR() {
  return (
    <svg viewBox="0 0 16 12" width="24" height="18" aria-hidden="true">
      <rect width="16" height="12" fill="#ED2939" rx="2" />
      <rect x="0" y="0" width="10.66" height="12" fill="#fff" rx="2" />
      <rect x="0" y="0" width="5.33" height="12" fill="#002395" rx="2" />
    </svg>
  );
}

export default function Footer() {
  const { t, language, setLanguage } = useTranslation();
  const { toast } = useToast();
  const tr = (key, fallback) => t(key) || fallback;

  // === Selector de idioma ===
  const [openLang, setOpenLang] = useState(false);
  const langBtnRef = useRef(null);
  const CurrentFlag = () => {
    if (language === "ES") return <FlagES />;
    if (language === "EN") return <FlagUS />;
    if (language === "FR") return <FlagFR />;
    return <FlagEUS />; // EUS por defecto
  };
  const chooseLang = (code) => {
    setLanguage(code);
    setOpenLang(false);
  };
  const handleBlur = () => setTimeout(() => setOpenLang(false), 120);
  const LangItem = ({ active, onClick, children }) => (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      role="menuitem"
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px]
                  hover:bg-slate-50 dark:hover:bg-slate-800
                  ${active ? "bg-slate-50 dark:bg-slate-800" : ""}`}
    >
      {children}
    </button>
  );

  const aboutItems = [
    { id: "what-is", titleKey: "eusFooterAboutTitle1", contentKey: "eusFooterAboutContent1" },
    { id: "how-works", titleKey: "eusFooterAboutTitle2", contentKey: "eusFooterAboutContent2" },
    { id: "tools", titleKey: "eusFooterAboutTitle3", contentKey: "eusFooterAboutContent3" },
    { id: "plans", titleKey: "eusFooterAboutTitle5", contentKey: "eusFooterAboutContent5" },
    { id: "languages", titleKey: "eusFooterAboutTitle6", contentKey: "eusFooterAboutContent6" },
  ];

  const legalItems = [
    { titleKey: "eusFooterLegalTitle1", path: "/aviso-legal" },
    { titleKey: "eusFooterLegalTitle2", path: "/politica-de-privacidad" },
    { titleKey: "eusFooterLegalTitle3", path: "/terminos-condiciones" },
    { titleKey: "eusFooterLegalTitle4", path: "/uso-de-ia" },
    { titleKey: "eusFooterLegalTitle5", path: "/cookies" },
  ];

  const handleClick = () => {
    toast({
      title: tr("eusToastFeatureNotImplementedTitle", "🚧 Funcionalidad no implementada"),
      description: tr(
        "eusToastFeatureNotImplementedDescription",
        "Esta función aún no está implementada. ¡Pídela en tu próximo mensaje! 🚀"
      ),
      variant: "default",
    });
  };

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto w-full px-6 pt-16 md:pt-20 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Columna 1: Sobre Euskalia — lista plana */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
              {tr("eusFooterColumnAboutTitle", "Sobre Euskalia")}
            </h3>

            <div className="border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
              {aboutItems.map((item, idx) => (
                <details key={item.id} className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between py-3 md:py-3.5 text-slate-700 dark:text-slate-300">
                    <span className="text-sm md:text-[15px]">{tr(item.titleKey, "")}</span>
                    <span className="ml-3 text-slate-400 dark:text-slate-500 text-xl leading-none select-none">
                      <span className="group-open:hidden">＋</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>

                  <div className="pt-1 pb-4 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                    {tr(item.contentKey, "")
                      .split("\n")
                      .map((line, i) => {
                        const trimmed = (line || "").trim();

                        // ✅ SOLO si empieza con "n-" (1-, 2-, 3-...)
                        const isNumbered = /^[0-9]+\s*-\s*/.test(trimmed);

                        if (!isNumbered) {
                          return (
                            <div key={`${idx}-${i}`} className="mb-1">
                              {line}
                            </div>
                          );
                        }

                        // Para líneas numeradas: negrita solo "1- Xxxx:" (lo previo a :)
                        const colonIndex = trimmed.indexOf(":");
                        if (colonIndex === -1) {
                          // Si no hay ":", no aplicamos negrita especial
                          return (
                            <div key={`${idx}-${i}`} className="mb-1">
                              {line}
                            </div>
                          );
                        }

                        const left = trimmed.slice(0, colonIndex); // "1- Itzultzailea"
                        const right = trimmed.slice(colonIndex + 1); // " ..."

                        return (
                          <div key={`${idx}-${i}`} className="mb-1">
                            <strong className="font-semibold text-slate-800 dark:text-slate-200">
                              {left}:
                            </strong>{" "}
                            <span>{right}</span>
                          </div>
                        );
                      })}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Columna 2: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
              {tr("eusFooterColumnLegalTitle", "Legal")}
            </h3>
            <ul className="space-y-2">
              {legalItems.map((item) => (
                <li key={item.titleKey}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {tr(item.titleKey, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto + Selector Idioma + Planak */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
              {tr("eusFooterColumnContactTitle", "Contacto y Comunidad")}
            </h3>

            <div className="space-y-3 mb-6">
              <a
                href={`mailto:${tr("eusFooterContactEmailValue", "contacto@euskalia.ai")}`}
                className="flex items-center text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Mail size={16} className="mr-2" />
                {tr("eusFooterContactEmailValue", "contacto@euskalia.ai")}
              </a>
              <div className="flex space-x-3">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                  aria-label="Instagram"
                  className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                  aria-label="Twitter"
                  className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                  aria-label="LinkedIn"
                  className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Etiqueta Idioma */}
            <div className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-200">
              {tr("eusFooterLanguageLabel", "Idioma")}
            </div>

            {/* Botón con bandera activa + desplegable */}
            <div className="relative mb-6">
              <button
                ref={langBtnRef}
                onClick={() => setOpenLang((v) => !v)}
                onBlur={handleBlur}
                type="button"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg
                           border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900
                           shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                aria-haspopup="menu"
                aria-expanded={openLang}
                aria-label={tr("eusFooterLanguageLabel", "Idioma")}
                title={tr("eusFooterLanguageLabel", "Idioma")}
              >
                <CurrentFlag />
              </button>

              {openLang && (
                <div
                  role="menu"
                  className="absolute z-50 mt-2 w-40 rounded-2xl border border-slate-200 bg-white
                             shadow-xl ring-1 ring-black/5 p-2
                             dark:bg-slate-900 dark:border-slate-700"
                >
                  <LangItem active={language === "EUS"} onClick={() => chooseLang("EUS")}>
                    <FlagEUS /> <span className="ml-2 text-[13px]">EUS</span>
                  </LangItem>
                  <LangItem active={language === "ES"} onClick={() => chooseLang("ES")}>
                    <FlagES /> <span className="ml-2 text-[13px]">ES</span>
                  </LangItem>
                  <LangItem active={language === "EN"} onClick={() => chooseLang("EN")}>
                    <FlagUS /> <span className="ml-2 text-[13px]">EN</span>
                  </LangItem>
                  <LangItem active={language === "FR"} onClick={() => chooseLang("FR")}>
                    <FlagFR /> <span className="ml-2 text-[13px]">FR</span>
                  </LangItem>
                </div>
              )}
            </div>

            {/* Botón Planak (azul) */}
            <Button asChild className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Link to="/pricing">
                <Sparkles size={16} className="mr-2" />
                {tr("eusFooterPlansButton", "Planak")}
              </Link>
            </Button>
          </div>
        </div>

        {/* Franja inferior: copyright centrado + enlaces a la derecha */}
        <div className="mt-8 py-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            <div className="hidden md:block" />
            <div className="text-center">
              © {new Date().getFullYear()} Euskalia — {tr("eusFooterRights", "Eskubide guztiak erreserbatuta")}
            </div>
            <div className="flex justify-end gap-4">
              <Link to="/cookies" className="hover:text-primary dark:hover:text-primary">
                {tr("eusFooterCookies", "Cookieak")}
              </Link>
              <Link to="/aviso-legal" className="hover:text-primary dark:hover:text-primary">
                {tr("eusFooterLegalTitle1", "Lege-oharra")}
              </Link>
              <Link to="/politica-de-privacidad" className="hover:text-primary dark:hover:text-primary">
                {tr("eusFooterLegalTitle2", "Pribatutasun politika")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
