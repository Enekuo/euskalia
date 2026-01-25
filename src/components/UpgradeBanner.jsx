import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";

export default function UpgradeBanner({
  to = "/pricing",
  className = "",
  titleKey = "upgradeBanner_title",
  subtitleKey = "upgradeBanner_subtitle",
  ctaKey = "upgradeBanner_cta",
}) {
  const { t } = useTranslation();

  const tr = (k, fallback = "") => {
    const val = typeof t === "function" ? t(k) : null;
    if (!val || val === k) return fallback;
    return val;
  };

  return (
    <div
      className={
        "w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden " +
        className
      }
    >
      <div className="relative px-5 py-4 sm:px-6 sm:py-5">
        {/* decoraciones suaves (sin texto) */}
        <div className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full bg-sky-100 blur-[0px]" />
        <div className="pointer-events-none absolute -right-8 top-6 h-20 w-20 rounded-full bg-indigo-100 blur-[0px]" />
        <div className="pointer-events-none absolute left-10 top-6 h-2 w-2 rounded-full bg-sky-300" />
        <div className="pointer-events-none absolute left-14 top-10 h-2 w-2 rounded-full bg-amber-300" />
        <div className="pointer-events-none absolute right-16 top-10 h-2 w-2 rounded-full bg-sky-300" />
        <div className="pointer-events-none absolute right-12 top-14 h-2 w-2 rounded-full bg-amber-300" />

        <div className="relative flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[16px] sm:text-[18px] font-semibold text-slate-900">
              {tr(titleKey, "¡Desbloquea Euskalia PRO!")}
            </div>
            <div className="mt-1 text-[13px] sm:text-[14px] text-slate-600">
              {tr(subtitleKey, "Más capacidad y sin límites diarios.")}
            </div>
          </div>

          <Link
            to={to}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#1e78ff] px-4 py-2 text-white font-semibold text-[14px] shadow-sm hover:opacity-95 active:opacity-90"
          >
            <span aria-hidden="true">🔒</span>
            {tr(ctaKey, "Mejorar ahora")}
          </Link>
        </div>
      </div>
    </div>
  );
}
