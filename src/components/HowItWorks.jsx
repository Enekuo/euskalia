import React from "react";
import { useTranslation } from "@/lib/translations";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/motion-primitives";

export default function HowItWorks() {
  const { t } = useTranslation();
  const tr = (key, fallback) => t(key) || fallback;

  return (
    <section className="w-full bg-[#F4F8FF] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* TARJETA CONTENEDORA ANIMADA */}
        <RevealGroup
          className="
            bg-white rounded-3xl border border-slate-100 shadow-lg
            px-5 md:px-8 py-8 md:py-10
            flex flex-col lg:flex-row items-center gap-8
          ">
          {/* BLOQUE DE TEXTO */}
          <RevealItem
            className="w-full lg:basis-7/12 text-left"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
              {tr("homeHowItWorks.title", "")}
            </h2>

            <p className="text-slate-600 text-[15px] md:text-[16px] leading-relaxed mb-6">
              {tr("homeHowItWorks.intro", "")}
            </p>

            <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
              {tr("homeHowItWorks.offers_title", "")}
            </h3>

            {/* LISTA CON TICK VERDE */}
            <ul className="space-y-2 text-slate-600 text-[14px] md:text-[15px] leading-relaxed">
              <li className="flex items-start gap-2">
                <svg
                  className="mt-[5px] w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#16A34A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{tr("homeHowItWorks.offers_item1", "")}</span>
              </li>

              <li className="flex items-start gap-2">
                <svg
                  className="mt-[5px] w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#16A34A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{tr("homeHowItWorks.offers_item2", "")}</span>
              </li>

              <li className="flex items-start gap-2">
                <svg
                  className="mt-[5px] w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#16A34A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{tr("homeHowItWorks.offers_item3", "")}</span>
              </li>

              <li className="flex items-start gap-2">
                <svg
                  className="mt-[5px] w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#16A34A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{tr("homeHowItWorks.offers_item4", "")}</span>
              </li>

              <li className="flex items-start gap-2">
                <svg
                  className="mt-[5px] w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#16A34A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{tr("homeHowItWorks.offers_item5", "")}</span>
              </li>

              <li className="flex items-start gap-2">
                <svg
                  className="mt-[5px] w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#16A34A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{tr("homeHowItWorks.offers_item6", "")}</span>
              </li>
            </ul>
          </RevealItem>

          {/* BLOQUE DE IMAGEN */}
          <RevealItem
            className="w-full lg:basis-5/12 flex justify-center lg:justify-end"
          >
            <img
              src="/how-it-works.webp"
              alt=""
              loading="lazy"
              className="w-full max-w-[520px]"
            />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
} 
 