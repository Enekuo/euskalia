import React from "react";
import { useTranslation } from "@/lib/translations";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const { t } = useTranslation();
  const tr = (key, fallback) => t(key) || fallback;

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2.2, // más lento
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="w-full bg-[#F4F8FF] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        {/* BLOQUE TITULAR + PÁRRAFO + IMAGEN */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14"
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          {/* TEXTO */}
          <div className="w-full lg:basis-6/12 text-left">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold text-slate-900 leading-tight mb-5">
              {tr("features.title", "")}
            </h2>

            <p className="text-slate-600 text-[15px] md:text-[16px] leading-relaxed max-w-2xl">
              {tr("features.paragraph", "")}
            </p>
          </div>

          {/* IMAGEN */}
          <div className="w-full lg:basis-6/12 flex justify-center lg:justify-center lg:-ml-6">
            <div
              className="
                bg-white rounded-3xl border border-slate-100
                shadow-[0_18px_60px_rgba(15,23,42,0.08)]
                px-4 py-4 md:px-5 md:py-5
                flex items-center justify-center
                w-full max-w-[520px]
              "
            >
              <img
                src="/Caracteristicas.png"
                alt="Euskalia"
                className="w-full max-w-[490px]"
              />
            </div>
          </div>
        </motion.div>

        {/* TARJETA DE CARACTERÍSTICAS (IZQUIERDA + DERECHA) */}
        <motion.div
          className="
            bg-white rounded-3xl border border-slate-100
            shadow-[0_18px_60px_rgba(15,23,42,0.08)]
            px-4 sm:px-6 md:px-8 lg:px-10
            py-6 sm:py-7 md:py-8
          "
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
            {/* Columna izquierda: 6 filas pequeñas (más ancha) */}
            <div className="w-full lg:w-7/12 space-y-4 md:space-y-5">
              {/* 1. Eduki sortzailea – documento con líneas */}
              <FeatureRow
                icon={
                  <CircleIcon>
                    <rect x="5" y="4" width="12" height="16" rx="2" />
                    <path d="M8 8h6M8 11h4M8 14h5" />
                    <path d="M15.5 6.5 17 5" />
                  </CircleIcon>
                }
                title={tr("features.item1_title", "")}
                description={tr("features.item1_desc", "")}
              />

              {/* 2. Iturri mota desberdinak – varias fuentes */}
              <FeatureRow
                icon={
                  <CircleIcon>
                    <rect x="4" y="6" width="7" height="11" rx="1.5" />
                    <rect x="11" y="4" width="7" height="11" rx="1.5" />
                    <path d="M11 9.5h2" />
                  </CircleIcon>
                }
                title={tr("features.item2_title", "")}
                description={tr("features.item2_desc", "")}
              />

              {/* 3. Itzulpen adimendu neuroindartua – cerebro */}
              <FeatureRow
                icon={
                  <CircleIcon>
                    <path d="M9 4a2 2 0 0 0-2 2v1.5A2.5 2.5 0 0 0 5 10v2a2.5 2.5 0 0 0 2 2.45V17a2 2 0 0 0 2 2" />
                    <path d="M15 4a2 2 0 0 1 2 2v1.5A2.5 2.5 0 0 1 19 10v2a2.5 2.5 0 0 1-2 2.45V17a2 2 0 0 1-2 2" />
                    <path d="M12 4v14" />
                    <path d="M9 8h1.5M9 12h1.5M9 16h1.5" />
                    <path d="M13.5 10H15M13.5 14H15" />
                  </CircleIcon>
                }
                title={tr("features.item3_title", "")}
                description={tr("features.item3_desc", "")}
              />

              {/* 4. Testuaren luzeraren kontrola – sliders */}
              <FeatureRow
                icon={
                  <CircleIcon>
                    <path d="M6 7h12M6 17h12" />
                    <circle cx="10" cy="7" r="2" />
                    <circle cx="14" cy="17" r="2" />
                  </CircleIcon>
                }
                title={tr("features.item4_title", "")}
                description={tr("features.item4_desc", "")}
              />

              {/* 5. Abiadura optimizatua – rayo */}
              <FeatureRow
                icon={
                  <CircleIcon>
                    <path d="M11 3 6 13h4l-1 8 5-10h-4z" />
                  </CircleIcon>
                }
                title={tr("features.item5_title", "")}
                description={tr("features.item5_desc", "")}
              />

              {/* 6. Pribatutasuna – candado */}
              <FeatureRow
                icon={
                  <CircleIcon>
                    <rect x="7" y="11" width="10" height="8" rx="2" />
                    <path d="M10 11V9a2 2 0 0 1 4 0v2" />
                    <circle cx="12" cy="14.5" r="1" />
                  </CircleIcon>
                }
                title={tr("features.item6_title", "")}
                description={tr("features.item6_desc", "")}
              />
            </div>

            {/* Columna derecha: 3 bloques grandes (más estrecha y más vertical) */}
            <div className="w-full lg:w-5/12 max-w-xl ml-auto space-y-6 md:space-y-7">
              {/* Edukien prozesamendu adimenduna – engranaje */}
              <FeatureHighlight
                icon={
                  <CircleIcon>
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 3v2.5M12 18.5V21M5.2 5.2l1.8 1.8M17 17l1.8 1.8M3 12h2.5M18.5 12H21M5.2 18.8 7 17M17 7l1.8-1.8" />
                  </CircleIcon>
                }
                title={tr("features.highlight1_title", "")}
                description={tr("features.highlight1_desc", "")}
              />

              {/* Emaitza argi eta naturalak – estrella */}
              <FeatureHighlight
                icon={
                  <CircleIcon>
                    <path d="M12 5.5 13.6 9l3.9.3-3 2.5.9 3.8L12 14.5 8.6 18l.9-3.8-3-2.5 3.9-.3z" />
                  </CircleIcon>
                }
                title={tr("features.highlight2_title", "")}
                description={tr("features.highlight2_desc", "")}
              />

              {/* Segurtasuna bermatuta – candado */}
              <FeatureHighlight
                icon={
                  <CircleIcon>
                    <rect x="7" y="11" width="10" height="8" rx="2" />
                    <path d="M10 11V9a2 2 0 0 1 4 0v2" />
                    <circle cx="12" cy="14.5" r="1" />
                  </CircleIcon>
                }
                title={tr("features.highlight3_title", "")}
                description={tr("features.highlight3_desc", "")}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ==== Subcomponentes internos ==== */

function CircleIcon({ children }) {
  return (
    <svg
      className="w-8 h-8 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function FeatureRow({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-slate-100 px-4 py-4">
      <div className="mt-[2px] shrink-0">{icon}</div>
      <div>
        <h4 className="text-sm md:text-[15px] font-semibold text-slate-900 mb-0.5">
          {title}
        </h4>
        <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function FeatureHighlight({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-[2px] shrink-0">{icon}</div>
      <div>
        <h3 className="text-[17px] md:text-[19px] font-semibold text-slate-900 mb-1.5">
          {title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
