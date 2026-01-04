import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import { getCookieConsent, setCookieConsent } from "@/lib/cookiesConsent";
import { loadGoogleAnalytics } from "@/lib/ga";

export default function CookieBanner() {
  const { t } = useTranslation();
  const tr = (k, f = "") => t(k) || f;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const c = getCookieConsent();
    if (!c) setVisible(true);
    if (c === "accepted") {
      loadGoogleAnalytics(import.meta.env.VITE_GA_ID);
    }
  }, []);

  const accept = () => {
    setCookieConsent("accepted");
    loadGoogleAnalytics(import.meta.env.VITE_GA_ID);
    setVisible(false);
  };

  const reject = () => {
    setCookieConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] p-4">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900">
                {tr("cookies.title", "Este sitio utiliza cookies")}
              </h3>

              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                {tr(
                  "cookies.desc",
                  "Usamos cookies técnicas necesarias para el funcionamiento del sitio y cookies de análisis (Google Analytics) para mejorar Euskalia. Puedes aceptar o rechazar."
                )}
              </p>

              <div className="mt-2">
                <Link
                  to="/politica-de-cookies"
                  className="text-sm font-medium text-sky-700 hover:text-sky-800 underline underline-offset-2"
                >
                  {tr("cookies.more", "Más información")}
                </Link>
              </div>
            </div>

            <div className="flex shrink-0 flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={reject}
                className="h-10 px-4 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {tr("cookies.reject", "Rechazar")}
              </button>

              <button
                onClick={accept}
                className="h-10 px-5 rounded-full bg-sky-600 text-sm font-semibold text-white hover:bg-sky-700"
              >
                {tr("cookies.accept", "Aceptar")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
