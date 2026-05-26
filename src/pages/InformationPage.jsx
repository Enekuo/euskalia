import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import { Globe, FileText, SearchCheck, PenLine, Type, Mail, File, Link2, ArrowLeftRight, Trash2, Mic, Volume2, Copy, Share2 } from "lucide-react";

export default function InformationPage() {
  const { t } = useTranslation();
  const location = useLocation();

  const tr = (key, fallback) => {
    const val = t(key);
    return !val || val === key ? fallback : val;
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location]);

  return (

<main className="w-full bg-[#F7F9FC] text-slate-900 overflow-hidden">
  <section className="max-w-[1450px] mx-auto px-4 sm:px-6 pt-4 pb-16">

    {/* HERO */}

    <section className="relative overflow-hidden rounded-[34px] border border-[#E7ECF5] bg-gradient-to-br from-[#F8FAFF] via-[#F5F7FC] to-[#E9F1FF] min-h-[560px] flex items-center px-6 sm:px-10 py-10 mb-5">

      <div className="absolute top-[-140px] right-[-100px] w-[520px] h-[520px] rounded-full bg-[#DBE8FF] opacity-70" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full relative z-10">

        {/* IZQUIERDA */}

        <div className="max-w-[520px] pl-1 lg:pl-4 -mt-8">

          <h1 className="text-[58px] leading-[0.98] tracking-[-2px] font-bold text-[#071437] mb-7">
            {tr("information_title", "Información sobre Euskalia")}
          </h1>

          <div className="w-[56px] h-[6px] rounded-full bg-[#3B82F6] mb-7" />

          <p className="text-[24px] leading-[1.65] text-[#334155] max-w-[620px] font-[450]">
            {tr(
              "information_subtitle",
              "Conoce mejor Euskalia y descubre para qué sirve cada una de sus herramientas y aprende a utilizarlas para sacarles el máximo partido de forma sencilla y práctica."
            )}
          </p>

        </div>

        {/* MOCKUP */}

        <div className="relative flex items-center justify-center min-h-[430px]">

          <div className="relative w-[760px] h-[420px] rounded-[34px] bg-white border border-[#E1E8F5] shadow-[0_28px_80px_rgba(37,99,235,0.16)] overflow-hidden rotate-[-2deg]">

            {/* TOPBAR */}

            <div className="h-[50px] bg-[#F8FAFF] border-b border-[#E8EEF7] flex items-center px-6">

              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-[#D9E2F2]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#D9E2F2]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#D9E2F2]" />
              </div>

              <div className="ml-6 h-2.5 rounded-full bg-[#E5ECF8] w-[240px]" />

            </div>

            {/* SELECTORES */}

            <div className="h-[44px] border-b border-[#EEF2F7] flex items-center justify-between px-6 text-[12px]">

              <div className="flex items-center gap-4">

                <div className="flex items-center gap-1.5 text-[#2563EB] font-semibold">
                  <File className="w-3.5 h-3.5" />
                  <span>Testua</span>
                </div>

                <div className="w-px h-4 bg-[#E5EAF3]" />

                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Dokumentua</span>
                </div>

                <div className="w-px h-4 bg-[#E5EAF3]" />

                <div className="flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>URL</span>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <span>Hizkuntza detektatu</span>

                <div className="w-[30px] h-[30px] rounded-[10px] bg-[#F3F6FB] flex items-center justify-center">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-[#64748B]" />
                </div>

                <span>Euskara</span>

                <Trash2 className="w-3.5 h-3.5 text-[#94A3B8]" />

              </div>

            </div>

            {/* CONTENIDO */}

            <div className="flex h-[326px]">

              {/* SIDEBAR */}

              <div className="w-[82px] border-r border-[#EEF2F7] bg-[#FBFCFF] flex flex-col items-center pt-4 gap-3">

                {[
                  { icon: Globe, active: true },
                  { icon: FileText },
                  { icon: SearchCheck },
                  { icon: PenLine },
                  { icon: Type },
                  { icon: Mail },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className={`w-[38px] h-[38px] rounded-[12px] border flex items-center justify-center ${
                        item.active
                          ? "bg-[#EEF4FF] border-[#BFD5FF]"
                          : "bg-white border-[#E5EAF3]"
                      }`}
                    >
                      <Icon
                        className={`w-[16px] h-[16px] ${
                          item.active
                            ? "text-[#2563EB]"
                            : "text-[#334155]"
                        }`}
                      />
                    </div>
                  );
                })}

              </div>

              {/* PANEL IZQUIERDO */}

              <div className="flex-1 border-r border-[#EEF2F7] relative px-7 py-7">

                <p className="text-[16px] text-[#64748B]">
                  Idatzi edo itsatsi testua hemen.
                </p>

                <div className="absolute bottom-6 left-6 w-[36px] h-[36px] rounded-[12px] border border-[#E5EAF3] bg-white flex items-center justify-center">
                  <Mic className="w-[16px] h-[16px] text-[#64748B]" />
                </div>

                <div className="absolute bottom-6 right-6 text-[12px] text-[#94A3B8]">
                  0 / 3000
                </div>

              </div>

              {/* PANEL DERECHO */}

              <div className="flex-1 relative px-7 py-7">

                <p className="text-[16px] text-[#64748B]">
                  Hemen agertuko da itzulpena.
                </p>

                <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 rounded-full bg-[#8FAEF8] text-white font-semibold text-[13px] shadow-md">
                  Itzuli
                </button>

                <div className="absolute bottom-6 right-6 flex items-center gap-4 text-[#A0AEC0]">

                  <Volume2 className="w-[16px] h-[16px]" />
                  <Copy className="w-[16px] h-[16px]" />
                  <Share2 className="w-[16px] h-[16px]" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

    {/* ======================= */}
    {/* QUÉ ES EUSKALIA */}
    {/* ======================= */}

    <section
      id="que-es-euskalia"
      className="rounded-[26px] border border-[#E7ECF5] bg-white px-5 sm:px-7 py-8 scroll-mt-28"
    >

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-center">

        {/* ILUSTRACIÓN */}

        <div className="relative flex items-center justify-center min-h-[260px]">

          <div className="absolute w-[220px] h-[220px] rounded-full bg-gradient-to-br from-[#E8F0FF] to-[#F4F7FF]" />

          <div className="absolute w-[280px] h-[280px] rounded-full border border-[#D9E6FF]" />

          {/* Logo central */}
          <div className="relative z-20 w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-[0_18px_40px_rgba(37,99,235,0.28)]">

            <span className="text-white text-[56px] font-bold">
              E
            </span>

          </div>

          {/* Cards flotantes */}
          {[
            {
              top: "12px",
              left: "18px",
              color: "from-[#3B82F6] to-[#2563EB]",
            },
            {
              top: "24px",
              right: "12px",
              color: "from-[#4ADE80] to-[#22C55E]",
            },
            {
              bottom: "24px",
              left: "4px",
              color: "from-[#FB923C] to-[#F97316]",
            },
            {
              bottom: "10px",
              right: "20px",
              color: "from-[#A855F7] to-[#7C3AED]",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`absolute w-[42px] h-[42px] rounded-[14px] bg-gradient-to-br ${item.color} shadow-lg`}
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
              }}
            />
          ))}

        </div>

        {/* TEXTO */}

        <div className="max-w-[760px]">

          <h2 className="text-[34px] leading-[1] tracking-[-1px] font-bold text-[#071437] mb-4">
            {tr("information_about_title", "¿Qué es Euskalia?")}
          </h2>

          <div className="w-[42px] h-[5px] rounded-full bg-[#3B82F6] mb-5" />

          <div className="space-y-4 text-[#334155] leading-[1.8] text-[16px]">

            <p>
              {tr(
                "information_about_paragraph_1",
                "Euskalia es una plataforma de inteligencia artificial especializada en euskera y textos multilingües. Su objetivo es ofrecer herramientas rápidas, claras y útiles para traducir, resumir, corregir, parafrasear y generar contenido de forma sencilla."
              )}
            </p>

            <p>
              {tr(
                "information_about_paragraph_2",
                "A diferencia de muchas herramientas generales, Euskalia está pensada para ofrecer una experiencia especialmente cuidada en euskera, manteniendo resultados naturales, comprensibles y adaptados al uso real del idioma."
              )}
            </p>

            <p>
              {tr(
                "information_about_paragraph_3",
                "El mundo digital y la inteligencia artificial están cambiando la forma en la que las personas estudian, trabajan y se comunican. Euskalia nace con la idea de que el euskera también forme parte de esa nueva etapa tecnológica."
              )}
            </p>

          </div>

        </div>

      </div>

    </section>

        {/* TRADUCTOR */}
        {/* ======================= */}

        <section
          id="traductor"
          className="min-h-screen flex items-center py-24 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
            
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-5 py-2 text-[#2563EB] font-medium text-sm mb-8">
                Euskalia · Traductor
              </div>

              <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
                {tr("information_translator_title", "Traductor")}
              </h2>

              <p className="text-[22px] leading-[1.9] text-slate-600">
                {tr(
                  "information_translator_text",
                  "El traductor de Euskalia permite traducir textos entre euskera, castellano, inglés, francés y otros idiomas. Está pensado para ofrecer traducciones claras, naturales y útiles, especialmente cuando el euskera forma parte del proceso."
                )}
              </p>
            </div>

            <div className="relative h-[620px] flex items-center justify-center">
              
              <div className="absolute w-[520px] h-[520px] rounded-[60px] bg-blue-50 rotate-12" />

              <div className="relative w-[420px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
                <div className="space-y-6">
                  
                  <div className="bg-[#2563EB] text-white rounded-3xl px-6 py-5 max-w-[280px]">
                    <p className="text-[22px] leading-relaxed font-medium">
                      Kaixo, zer moduz?
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-slate-100 rounded-3xl px-6 py-5 max-w-[280px]">
                      <p className="text-[20px] leading-relaxed text-slate-700">
                        Hola, ¿qué tal?
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Traducción completada
                      </span>

                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ======================= */}
        {/* RESUMIDOR */}
        {/* ======================= */}

        <section
          id="resumidor"
          className="min-h-screen flex items-center py-24 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">

            <div className="relative h-[620px] flex items-center justify-center order-2 lg:order-1">

              <div className="absolute w-[520px] h-[520px] rounded-[60px] bg-[#EEF8F1]" />

              <div className="relative w-[430px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
                
                <div className="space-y-4">
                  <div className="h-4 rounded-full bg-slate-200 w-full" />
                  <div className="h-4 rounded-full bg-slate-200 w-[90%]" />
                  <div className="h-4 rounded-full bg-slate-200 w-[95%]" />
                  <div className="h-4 rounded-full bg-slate-200 w-[85%]" />
                  <div className="h-4 rounded-full bg-green-200 w-[60%] mt-8" />
                  <div className="h-4 rounded-full bg-green-200 w-[70%]" />
                </div>

              </div>
            </div>

            <div className="max-w-2xl order-1 lg:order-2">
              <div className="inline-flex items-center rounded-full bg-green-50 px-5 py-2 text-green-700 font-medium text-sm mb-8">
                Euskalia · Resumidor
              </div>

              <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
                {tr("information_summary_title", "Resumidor")}
              </h2>

              <p className="text-[22px] leading-[1.9] text-slate-600">
                {tr(
                  "information_summary_text",
                  "El resumidor ayuda a convertir textos largos, documentos o contenido web en versiones más breves y fáciles de entender. Es útil para estudiar, revisar información o ahorrar tiempo al leer."
                )}
              </p>
            </div>

          </div>
        </section>

        {/* ======================= */}
        {/* CORRECTOR */}
        {/* ======================= */}

        <section
          id="corrector"
          className="min-h-screen flex items-center py-24 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">

            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full bg-purple-50 px-5 py-2 text-purple-700 font-medium text-sm mb-8">
                Euskalia · Corrector
              </div>

              <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
                {tr("information_corrector_title", "Corrector")}
              </h2>

              <p className="text-[22px] leading-[1.9] text-slate-600">
                {tr(
                  "information_corrector_text",
                  "El corrector revisa errores ortográficos, gramaticales y de estilo sin cambiar el sentido original del texto. Está diseñado para mejorar la claridad y la calidad del contenido escrito."
                )}
              </p>
            </div>

            <div className="relative h-[620px] flex items-center justify-center">

              <div className="absolute w-[520px] h-[520px] rounded-[60px] bg-purple-50 rotate-6" />

              <div className="relative w-[430px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
                
                <div className="space-y-6">

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <p className="text-slate-700 line-through">
                      Texto con errore gramatical
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <p className="text-slate-900 font-medium">
                      Texto con errores gramaticales
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ======================= */}
        {/* PARAFRASEADOR */}
        {/* ======================= */}

        <section
          id="parafraseador"
          className="min-h-screen flex items-center py-24 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">

            <div className="relative h-[620px] flex items-center justify-center order-2 lg:order-1">

              <div className="absolute w-[520px] h-[520px] rounded-[60px] bg-orange-50 -rotate-6" />

              <div className="relative w-[430px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
                <div className="space-y-6">

                  <div className="rounded-3xl bg-slate-100 px-6 py-5">
                    <p className="text-[20px] text-slate-600 leading-relaxed">
                      Texto original
                    </p>
                  </div>

                  <div className="flex justify-center text-[32px] text-orange-500 font-bold">
                    ↓
                  </div>

                  <div className="rounded-3xl bg-orange-50 px-6 py-5 border border-orange-100">
                    <p className="text-[20px] text-slate-800 leading-relaxed font-medium">
                      Texto reformulado
                    </p>
                  </div>

                </div>
              </div>

            </div>

            <div className="max-w-2xl order-1 lg:order-2">
              <div className="inline-flex items-center rounded-full bg-orange-50 px-5 py-2 text-orange-700 font-medium text-sm mb-8">
                Euskalia · Parafraseador
              </div>

              <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
                {tr("information_paraphraser_title", "Parafraseador")}
              </h2>

              <p className="text-[22px] leading-[1.9] text-slate-600">
                {tr(
                  "information_paraphraser_text",
                  "El parafraseador permite reformular textos manteniendo la idea principal. Sirve para expresar una frase de otra manera, mejorar la redacción o adaptar el tono del contenido."
                )}
              </p>
            </div>

          </div>
        </section>

        {/* ======================= */}
        {/* CREADOR DE TEXTO */}
        {/* ======================= */}

        <section
          id="creador-texto"
          className="min-h-screen flex items-center py-24 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">

            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full bg-sky-50 px-5 py-2 text-sky-700 font-medium text-sm mb-8">
                Euskalia · Creador de texto
              </div>

              <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
                {tr("information_text_creator_title", "Creador de texto")}
              </h2>

              <p className="text-[22px] leading-[1.9] text-slate-600">
                {tr(
                  "information_text_creator_text",
                  "El creador de texto ayuda a generar contenidos a partir de una idea, una instrucción o información base. Puede servir para redactar explicaciones, textos informativos, borradores o contenido estructurado."
                )}
              </p>
            </div>

            <div className="relative h-[620px] flex items-center justify-center">

              <div className="absolute w-[520px] h-[520px] rounded-[60px] bg-sky-50 rotate-6" />

              <div className="relative w-[430px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
                
                <div className="space-y-5">
                  <div className="h-5 rounded-full bg-sky-200 w-[60%]" />
                  <div className="h-4 rounded-full bg-slate-200 w-full" />
                  <div className="h-4 rounded-full bg-slate-200 w-[92%]" />
                  <div className="h-4 rounded-full bg-slate-200 w-[88%]" />
                  <div className="h-4 rounded-full bg-slate-200 w-[95%]" />
                  <div className="h-4 rounded-full bg-slate-200 w-[70%]" />

                  <div className="mt-10 rounded-3xl bg-sky-50 border border-sky-100 px-6 py-5">
                    <p className="text-[18px] text-sky-700 font-semibold">
                      Idea convertida en texto
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ======================= */}
        {/* CREADOR DE EMAIL */}
        {/* ======================= */}

        <section
          id="creador-email"
          className="min-h-screen flex items-center py-24 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">

            <div className="relative h-[620px] flex items-center justify-center order-2 lg:order-1">

              <div className="absolute w-[520px] h-[520px] rounded-[60px] bg-indigo-50 -rotate-6" />

              <div className="relative w-[430px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
                
                <div className="space-y-5">

                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <span className="text-sm text-slate-500">Para:</span>
                    <div className="h-3 rounded-full bg-slate-200 w-[170px]" />
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                    <span className="text-sm text-slate-500">Asunto:</span>
                    <div className="h-3 rounded-full bg-slate-200 w-[150px]" />
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="h-4 rounded-full bg-slate-200 w-full" />
                    <div className="h-4 rounded-full bg-slate-200 w-[90%]" />
                    <div className="h-4 rounded-full bg-slate-200 w-[95%]" />
                    <div className="h-4 rounded-full bg-slate-200 w-[75%]" />
                  </div>

                  <div className="mt-10 rounded-3xl bg-indigo-50 border border-indigo-100 px-6 py-5">
                    <p className="text-[18px] text-indigo-700 font-semibold">
                      Email generado
                    </p>
                  </div>

                </div>
              </div>

            </div>

            <div className="max-w-2xl order-1 lg:order-2">
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-5 py-2 text-indigo-700 font-medium text-sm mb-8">
                Euskalia · Creador de email
              </div>

              <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
                {tr("information_email_creator_title", "Creador de email")}
              </h2>

              <p className="text-[22px] leading-[1.9] text-slate-600">
                {tr(
                  "information_email_creator_text",
                  "El creador de email permite redactar correos de forma rápida y clara según el contexto indicado. Es útil para mensajes profesionales, solicitudes, respuestas o comunicaciones formales."
                )}
              </p>
            </div>

          </div>
        </section>
      </section>
    </main>
  );
}