import React from "react";
import { useTranslation } from "@/lib/translations";
import { FileText, CheckCircle2, Sparkles, Search, Globe, Brain } from "lucide-react";

export default function ToolsSection() {
  const { t } = useTranslation();
  const tr = (key, fallback) => {
    const v = t(key);
    return !v || v === key ? fallback : v;
  };

  const cards = [
    {
      title: tr("toolsSection_cardTranslator_title", "Traductor"),
      desc: tr(
        "toolsSection_cardTranslator_desc",
        "Traduce entre euskera, español, inglés y francés con calidad profesional."
      ),
      logoBg: "bg-[#FEF3C7]",
      logo: <Globe className="h-7 w-7 text-yellow-600" />,
    },
    {
      title: tr("toolsSection_cardSummary_title", "Resumidor"),
      desc: tr(
        "toolsSection_cardSummary_desc",
        "Sintetiza textos largos en segundos manteniendo claridad y fidelidad."
      ),
      logoBg: "bg-[#E0EAFF]",
      logo: <FileText className="h-6 w-6 text-blue-500" />,
    },
    {
      title: tr("toolsSection_cardCorrector_title", "Corrector gramatical"),
      desc: tr(
        "toolsSection_cardCorrector_desc",
        "Mejora tu texto corrigiendo gramática, claridad y fluidez."
      ),
      logoBg: "bg-[#ECFDF3]",
      logo: <CheckCircle2 className="h-6 w-6 text-green-600" />,
    },
    {
      title: tr("toolsSection_cardParaphraser_title", "Parafraseador"),
      desc: tr(
        "toolsSection_cardParaphraser_desc",
        "Reescribe tu texto con distintos estilos manteniendo el significado."
      ),
      logoBg: "bg-[#FED7AA]",
      logo: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-orange-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10M17 7l-3-3M17 7l-3 3" />
          <path d="M17 17H7M7 17l3 3M7 17l3-3" />
        </svg>
      ),
    },
    {
      title: tr("toolsSection_cardHumanizer_title", "Humanizador"),
      desc: tr(
        "toolsSection_cardHumanizer_desc",
        "Haz que tu texto suene más natural, claro y fluido."
      ),
      logoBg: "bg-[#DCFCE7]",
      logo: <Brain className="h-7 w-7 text-emerald-600" />,
    },
    {
      title: tr("toolsSection_cardAiDetector_title", "Detector IA"),
      desc: tr(
        "toolsSection_cardAiDetector_desc",
        "Analiza el texto y estima la probabilidad de que haya sido generado por IA."
      ),
      logoBg: "bg-[#C7D2FE]",
      logo: <Search className="h-6 w-6 text-blue-700 -rotate-6" />,
    },
  ];

  return (
    <section className="w-full bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-slate-900">
          {tr("toolsSection_title", "Herramientas de Euskalia")}
        </h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* IZQUIERDA: VIDEO + PALOS (sin tocar nada) */}
          <div className="relative w-full">
            <div className="relative overflow-visible">
              <div className="relative bg-slate-50 rounded-[22px] border border-slate-200 overflow-hidden aspect-[16/10]">
                <video
                  src="/demo-euskalia.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="absolute left-[-10px] top-[40px] bottom-[30px] w-[14px] rounded-full bg-blue-600" />
              <div className="absolute right-[-7px] top-[40px] bottom-[30px] w-[14px] rounded-full bg-blue-600" />
              <div className="absolute left-[-10px] right-[-5px] top-[39px] h-[14px] rounded-full bg-blue-600" />
              <div className="absolute left-[-10px] right-[-7px] bottom-[26px] h-[14px] rounded-full bg-blue-600" />
              <div className="absolute left-[0px] right-[0px] top-[0px] h-[39px] rounded-none bg-slate-50" />
              <div className="absolute left-[0px] right-[0px] bottom-[-4px] h-[30px] rounded-none bg-slate-50" />
            </div>
          </div>

          {/* DERECHA: tarjetas (exactamente como antes) */}
          <div className="w-full mt-[45px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cards.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4"
                >
                  <div className="flex items-start gap-4">
                    {/* SOLO LOGO como en Home */}
                    <div className={`h-12 w-12 rounded-2xl ${c.logoBg} flex items-center justify-center flex-shrink-0`}>
                      {c.logo}
                    </div>

                    <div className="min-w-0">
                      <div className="text-[18px] font-extrabold text-slate-900 leading-tight">
                        {c.title}
                      </div>
                      <p className="mt-1 text-[13px] text-slate-600 truncate">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
