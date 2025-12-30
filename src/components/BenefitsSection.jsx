import React from "react";
import { useTranslation } from "@/lib/translations";
import { motion, useAnimation } from "framer-motion";
import {
  FileText,
  Clock,
  HeartHandshake,
  Languages,
  FolderOpen,
  ArrowRight,
} from "lucide-react";

export default function BenefitsSection() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  const title = tr("homeBenefits.title", "");

  const benefits = [
    {
      id: 1,
      titleKey: "homeBenefits.benefit1_title",
      descKey: "homeBenefits.benefit1_desc",
      Icon: FileText,
    },
    {
      id: 2,
      titleKey: "homeBenefits.benefit2_title",
      descKey: "homeBenefits.benefit2_desc",
      Icon: Clock,
    },
    {
      id: 3,
      titleKey: "homeBenefits.benefit3_title",
      descKey: "homeBenefits.benefit3_desc",
      Icon: HeartHandshake,
    },
    {
      id: 4,
      titleKey: "homeBenefits.benefit4_title",
      descKey: "homeBenefits.benefit4_desc",
      Icon: Languages,
    },
    {
      id: 5,
      titleKey: "homeBenefits.benefit5_title",
      descKey: "homeBenefits.benefit5_desc",
      Icon: FolderOpen,
    },
    {
      id: 6,
      titleKey: "homeBenefits.benefit6_title",
      descKey: "homeBenefits.benefit6_desc",
      Icon: ArrowRight,
    },
  ];

  const controls = useAnimation();

  return (
    <motion.section
      className="w-full bg-white pt-20 pb-24 md:pt-24 md:pb-28"
      initial={{ opacity: 0 }}
      animate={controls}
      viewport={{ amount: 0.3 }}
      onViewportEnter={() => {
        controls.start({
          opacity: 1,
          transition: {
            duration: 0.8, // aparece un poco más lento
            ease: "easeOut",
            delay: 0.2,    // tarda un poco en empezar
          },
        });
      }}
      onViewportLeave={() => {
        // cuando sale de pantalla, lo dejamos otra vez oculto
        controls.set({ opacity: 0 });
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Título */}
        <h2 className="text-[28px] md:text-[40px] font-extrabold text-slate-900 text-center mb-12 md:mb-16">
          {title}
        </h2>

        {/* Grid de 6 cajas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map(({ id, titleKey, descKey, Icon }) => (
            <div
              key={id}
              className="
                rounded-3xl border border-slate-200 bg-[#F4F8FF]
                shadow-sm h-full
              "
            >
              <div
                className="
                  h-full min-h-[220px] md:min-h-[240px]
                  px-7 py-8 md:px-8 md:py-9
                  flex flex-col justify-between
                "
              >
                <div>
                  {/* Icono + título en fila */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E0EBFF]">
                      <Icon className="w-5 h-5 text-[#2563eb]" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">
                      {tr(titleKey, "")}
                    </h3>
                  </div>

                  <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
                    {tr(descKey, "")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
