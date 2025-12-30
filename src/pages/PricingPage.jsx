import React from "react";
import { useTranslation } from "@/lib/translations";
import { Gem, CheckCircle } from "lucide-react";

export default function PricingPage() {
  const { t } = useTranslation();
  const tr = (k, fallback = "") => t(k) || fallback;

  const plans = [
    // PLAN PRO (actual)
    {
      id: "pro",
      titleKey: "pricing.pro_name",
      priceText: "4,99€",
      priceSuffixKey: "pricing.perMonth",
      featuresKeys: [
        "pricing.features.pro1",
        "pricing.features.pro2",
        "pricing.features.pro3",
        "pricing.features.pro4",
        "pricing.features.pro5",
        "pricing.features.pro6",
      ],
      buttonKey: "pricing.pro_cta",
      icon: <Gem className="h-8 w-8 text-blue-500 mb-4" />,
      borderColor: "border-blue-500",
      priceColor: "text-blue-600",
      checkColor: "text-blue-600",
      buttonGradient:
        "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
      glow: false,
      tint: "",
      badgeKey: "pricing.badge_popular",
      disabled: false,
    },

    // PLAN PREMIUM+ (PRÓXIMAMENTE)
    {
      id: "premium",
      titleKey: "pricing.premium_name",
      priceText: "14,99€",
      priceSuffixKey: "pricing.perMonth",
      featuresKeys: [
        "pricing.features.premium1",
        "pricing.features.premium2",
        "pricing.features.premium3",
        "pricing.features.premium4",
        "pricing.features.premium5",
        "pricing.features.premium6",
      ],
      buttonKey: "pricing.premium_cta_soon",
      icon: <Gem className="h-8 w-8 mb-4" style={{ color: "#2563eb" }} />,
      borderColor: "border-[#2563eb]",
      priceColor: "text-[#2563eb]",
      checkColor: "text-[#2563eb]",
      tint: "bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe]",
      glow: true,
      buttonGradient: "",
      badgeKey: "pricing.badge_soon",
      disabled: true,
    },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center relative bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 p-6 pt-12 md:pt-20">
      {/* Título / subtítulo */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-3">
          {tr("pricing.title")}
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          {tr("pricing.subtitle")}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl lg:max-w-5xl">
        {plans.map((p) => (
          <div
            key={p.id}
            className={[
              "group relative bg-white rounded-2xl border-2",
              p.borderColor,
              "shadow-[0_10px_30px_rgba(2,6,23,0.08)] hover:shadow-2xl",
              "p-8 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]",
              p.tint,
            ].join(" ")}
          >
            {p.glow && (
              <div className="pointer-events-none absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#60a5fa] to-[#2563eb] blur opacity-30 group-hover:opacity-50 transition" />
            )}

            {p.badgeKey && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center rounded-full bg-blue-600 text-white text-xs font-semibold px-3 py-1 shadow-md ring-1 ring-blue-300">
                  {tr(p.badgeKey)}
                </span>
              </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-center mb-3">{p.icon}</div>

              <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-2">
                {tr(p.titleKey)}
              </h2>

              <div className="text-center mb-6">
                <p className="text-5xl font-extrabold leading-tight">
                  <span className={p.priceColor}>{p.priceText}</span>
                  {p.priceSuffixKey && (
                    <span className="align-baseline text-base font-medium text-slate-500 ml-2">
                      {tr(p.priceSuffixKey)}
                    </span>
                  )}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {p.featuresKeys.map((k) => (
                  <li key={k} className="flex items-start">
                    <CheckCircle
                      className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${p.checkColor}`}
                    />
                    <span className="text-slate-700 text-[15px] leading-snug">
                      {tr(k)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {p.disabled ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-3 text-base font-semibold rounded-lg shadow-lg bg-slate-300 text-slate-600 cursor-not-allowed hover:shadow-lg transition-transform duration-300"
                >
                  {tr(p.buttonKey)}
                </button>
              ) : (
                <button
                  type="button"
                  className={`w-full py-3 text-base font-semibold ${p.buttonGradient} text-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-[1.02]`}
                >
                  {tr(p.buttonKey)}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 
