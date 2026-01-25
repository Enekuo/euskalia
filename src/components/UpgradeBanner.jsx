import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";

function ButtonSparklesIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="btn_g1" x1="6" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD27A" />
          <stop offset="0.55" stopColor="#FFB24D" />
          <stop offset="1" stopColor="#FF7A2F" />
        </linearGradient>
        <linearGradient id="btn_g2" x1="3" y1="7" x2="10" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD27A" />
          <stop offset="1" stopColor="#FF7A2F" />
        </linearGradient>
      </defs>

      {/* sparkle grande */}
      <path
        d="M15.3 3.2c.2-.7 1.2-.7 1.4 0l.8 3.1c.2.7.7 1.2 1.4 1.4l3.1.8c.7.2.7 1.2 0 1.4l-3.1.8c-.7.2-1.2.7-1.4 1.4l-.8 3.1c-.2.7-1.2.7-1.4 0l-.8-3.1c-.2-.7-.7-1.2-1.4-1.4l-3.1-.8c-.7-.2-.7-1.2 0-1.4l3.1-.8c.7-.2 1.2-.7 1.4-1.4l.8-3.1Z"
        fill="url(#btn_g1)"
      />

      {/* sparkle pequeño */}
      <path
        d="M6.5 9.2c.14-.5.86-.5 1 0l.45 1.7c.13.5.52.88 1.02 1.02l1.7.45c.5.14.5.86 0 1l-1.7.45c-.5.13-.88.52-1.02 1.02l-.45 1.7c-.14.5-.86.5-1 0l-.45-1.7c-.13-.5-.52-.88-1.02-1.02l-1.7-.45c-.5-.14-.5-.86 0-1l1.7-.45c.5-.13.88-.52 1.02-1.02l.45-1.7Z"
        fill="url(#btn_g2)"
        opacity="0.95"
      />
    </svg>
  );
}

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
        {/* ❌ Quitadas las estrellitas del fondo */}

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
            {/* ✅ Icono más grande */}
            <ButtonSparklesIcon className="w-[22px] h-[22px]" />
            {tr(ctaKey, "Mejorar ahora")}
          </Link>
        </div>
      </div>
    </div>
  );
}
