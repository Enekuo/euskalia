import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

export default function CtaSection() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  const prefersReduced = useReducedMotion();
  const controls = useAnimation();

  // Contenedor: más separación entre entradas
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.40,
        delayChildren: 0.30,
      },
    },
  };

  // Elementos: mucho más lento y más abajo
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 140 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 3.0,                 // MUCHO más lento
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      className="
        relative w-full bg-no-repeat bg-cover bg-center
        bg-[#1e73ff]
        min-h-[60vh] md:min-h-[64vh] lg:min-h-[70vh] py-24 md:py-28
        overflow-hidden
      "
      style={{ backgroundImage: "url('/cta-background.png')" }}
      aria-labelledby="cta-title"
    >
      <div className="relative z-10 w-full">
        <motion.div
          className="
            flex flex-col items-start text-left gap-6
            pl-4 sm:pl-8 md:pl-16 lg:pl-24 xl:pl-28
            max-w-[980px]
          "
          variants={container}
          initial="hidden"
          animate={controls}
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          onViewportLeave={() => controls.set("hidden")}
        >
          <motion.h2
            id="cta-title"
            className="
              text-white font-extrabold leading-tight
              text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px]
            "
            variants={item}
          >
            {tr("cta.title", "Lleva tu experiencia Euskalia al siguiente nivel")}
          </motion.h2>

          <motion.p
            className="text-white/90 text-base sm:text-lg md:text-xl"
            variants={item}
          >
            {tr(
              "cta.subtitle",
              "Guarda tus textos, elimina los anuncios y disfruta sin límites."
            )}
          </motion.p>

          <motion.div className="pt-4" variants={item}>
            <Link
              to="/pricing"
              className="
                group inline-flex items-center gap-2
                bg-white hover:bg-white/90
                text-blue-700 font-medium
                text-base md:text-[17px]
                px-6 md:px-7 py-2 md:py-2.5
                rounded-[12px]
                shadow-[0_3px_8px_rgba(0,0,0,0.08)]
                hover:shadow-[0_5px_12px_rgba(0,0,0,0.12)]
                transition-all duration-200
                focus:outline-none focus:ring-4 focus:ring-white/40
              "
              aria-label={tr("cta.button", "Hasi doain")}
            >
              {/* cohete eliminado */}
              <span>{tr("cta.button", "Hasi doain")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
