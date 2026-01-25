import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";

function ButtonSparklesIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="g1" x1="6" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD27A" />
          <stop offset="0.55" stopColor="#FFB24D" />
          <stop offset="1" stopColor="#FF7A2F" />
        </linearGradient>
        <linearGradient id="g2" x1="3" y1="7" x2="10" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD27A" />
          <stop offset="1" stopColor="#FF7A2F" />
        </linearGradient>
      </defs>

      {/* sparkle grande */}
      <path
        d="M15.3 3.2c.2-.7 1.2-.7 1.4 0l.8 3.1c.2.7.7 1.2 1.4 1.4l3.1.8c.7.2.7 1.2 0 1.4l-3.1.8c-.7.2-1.2.7-1.4 1.4l-.8 3.1c-.2.7-1.2.7-1.4 0l-.8-3.1c-.2-.7-.7-1.2-1.4-1.4l-3.1-.8c-.7-.2-.7-1.2 0-1.4l3.1-.8c.7-.2 1.2-.7 1.4-1.4l.8-3.1Z"
        fill="url(#g1)"
      />

      {/* sparkle pequeño */}
      <path
        d="M6.5 9.2c.14-.5.86-.5 1 0l.45 1.7c.13.5.52.88 1.02 1.02l1.7.45c.5.14.5.86 0 1l-1.7.45c-.5.13-.88.52-1.02 1.02l-.45 1.7c-.14.5-.86.5-1 0l-.45-1.7c-.13-.5-.52-.88-1.02-1.02l-1.7-.45c-.5-.14-.5-.86 0-1l1.7-.45c.5-.13.88-.52 1.02-1.02l.45-1.7Z"
        fill="url(#g2)"
        opacity="0.95"
      />
    </svg>
  );
}

function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* sparkle grande (izq arriba) */}
      <svg className="absolute -top-2 left-5 w-7 h-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l1.3 5.2L18 8.5l-4.7 1.3L12 15l-1.3-5.2L6 8.5l4.7-1.3L12 2z"
          fill="#93C5FD"
          opacity="0.9"
        />
      </svg>

      {/* sparkle mediano (der arriba) */}
      <svg className="absolute top-3 right-6 w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l1 4.2L17 8.2l-4 1L12 13l-1-3.8-4-1 4-1L12 3z"
          fill="#FCD34D"
          opacity="0.9"
        />
      </svg>

      {/* sparkle pequeño (der medio) */}
      <svg className="absolute top-10 right-12 w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5l.7 2.8L15 8.5l-2.3.7L12 12l-.7-2.8L9 8.5l2.3-.7L12 5z"
          fill="#93C5FD"
          opacity="0.85"
        />
      </svg>

      {/* sparkle pequeño (izq abajo) */}
      <svg className="absolute bottom-5 left-8 w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5l.7 2.8L15 8.5l-2.3.7L12 12l-.7-2.8L9 8.5l2.3-.7L12 5z"
          fill="#FCD34D"
          opacity="0.85"
        />
      </svg>
    </div>
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
        <Sparkles />

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
            <ButtonSparklesIcon className="w-[18px] h-[18px]" />
            {tr(ctaKey, "Mejorar ahora")}
          </Link>
        </div>
      </div>
    </div>
  );
}
