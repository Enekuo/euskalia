import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import { Lightbulb } from "lucide-react";
import { Globe, FileText, SearchCheck, PenLine, Type, Mail, File, Link2, ArrowLeftRight, Trash2, Mic, Volume2, Copy, Share2 } from "lucide-react";

export default function InformationPage() {
  const { t } = useTranslation();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const tool = params.get("tool");

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

{!tool && (
<>

    {/* HERO */}

    <section className="relative overflow-hidden rounded-[34px] border border-[#E7ECF5] bg-gradient-to-br from-[#F8FAFF] via-[#F5F7FC] to-[#E9F1FF] min-h-screen flex items-center px-6 sm:px-10 py-10 mb-5">
      <div className="absolute top-[-140px] right-[-100px] w-[520px] h-[520px] rounded-full bg-[#DBE8FF] opacity-70" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full relative z-10">
        <div className="max-w-[520px] pl-1 lg:pl-4 -mt-8">
          <h1 className="text-[58px] leading-[0.98] tracking-[-2px] font-bold text-[#071437] mb-7">
            {tr("information_title", "Información sobre Euskalia")}
          </h1>

          <div className="w-[56px] h-[6px] rounded-full bg-[#3B82F6] mb-7" />

          <p className="text-[20px] leading-[1.65] text-[#334155] max-w-[620px] font-[450]">
            {tr(
              "information_subtitle",
              "Euskalia reúne diferentes herramientas diseñadas para trabajar con textos en euskera y otros idiomas. En esta página encontrarás información sobre cada una de ellas, cómo funcionan, en qué situaciones pueden resultar útiles y cómo sacar el máximo partido a cada herramienta."
            )}
          </p>
        </div>

        <div className="relative flex items-center justify-center min-h-[430px]">
          <div className="relative w-[760px] h-[420px] rounded-[34px] bg-white border border-[#E1E8F5] shadow-[0_28px_80px_rgba(37,99,235,0.16)] overflow-hidden rotate-[-2deg]">
            <div className="h-[50px] bg-[#F8FAFF] border-b border-[#E8EEF7] flex items-center px-6">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-[#D9E2F2]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#D9E2F2]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#D9E2F2]" />
              </div>

              <div className="ml-6 h-2.5 rounded-full bg-[#E5ECF8] w-[240px]" />
            </div>

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

            <div className="flex h-[326px]">
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
  className="relative overflow-hidden rounded-[26px] border border-[#E7ECF5] bg-gradient-to-br from-[#F8FBFF] via-[#FDFEFF] to-[#F3F7FF] px-8 sm:px-12 py-16 scroll-mt-28 min-h-screen flex items-center"
>
  <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#DCE9FF] opacity-50" />
  <div className="absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full bg-[#DCE9FF] opacity-40" />

  <div className="absolute top-16 right-16 grid grid-cols-6 gap-3 opacity-30">
    {Array.from({ length: 36 }).map((_, i) => (
      <div key={i} className="w-[4px] h-[4px] rounded-full bg-[#3B82F6]" />
    ))}
  </div>

  <div className="absolute bottom-16 left-16 grid grid-cols-6 gap-3 opacity-30">
    {Array.from({ length: 36 }).map((_, i) => (
      <div key={i} className="w-[4px] h-[4px] rounded-full bg-[#3B82F6]" />
    ))}
  </div>

  <div className="relative z-10 max-w-[1000px] mx-auto text-center">
    <h2 className="text-[46px] leading-[1.05] tracking-[-1px] font-bold text-[#071437] mb-5">
      {tr("information_about_title", "¿Qué es Euskalia?")}
    </h2>

    <div className="w-[56px] h-[6px] rounded-full bg-[#3B82F6] mb-10 mx-auto" />

    <div className="space-y-8 text-[#334155] leading-[1.9] text-[18px] text-left">
      <p>
        {tr(
          "information_about_paragraph_1",
          "Euskalia es una plataforma digital creada con un objetivo claro: contribuir al crecimiento y la presencia del euskera en el entorno tecnológico actual. Nace con la idea de acercar la innovación y la inteligencia artificial a todas las personas que utilizan el euskera, facilitando que puedan trabajar, aprender y comunicarse en su propio idioma dentro del entorno digital."
        )}
      </p>

      <p>
        {tr(
          "information_about_paragraph_2",
          "Euskalia nace con la voluntad de construir un ecosistema digital centrado en el euskera, adaptado a las necesidades reales de la comunidad vasca y preparado para evolucionar junto a los avances tecnológicos. Más allá de ofrecer servicios digitales, el proyecto busca reforzar la presencia del euskera en Internet y contribuir a que siga teniendo un papel relevante en la sociedad digital del futuro."
        )}
      </p>

      <p>
        {tr(
          "information_about_paragraph_3",
          "Nuestra visión es construir un proyecto de referencia para la comunidad vasca, impulsando la innovación lingüística y demostrando que el euskera también puede formar parte activa de los avances tecnológicos del presente y del futuro. Euskalia no busca únicamente ofrecer soluciones digitales, sino contribuir a que el idioma siga creciendo, evolucionando y ocupando el lugar que merece en la era digital."
        )}
      </p>

      <p className="font-semibold text-[#071437] text-center pt-4 text-[22px]">
        {tr(
          "information_about_tools",
          "Estas son las herramientas que ofrece Euskalia."
        )}
      </p>
    </div>
  </div>
</section>

</>
)}

{/* ======================= */}
{/* TRADUCTOR */}
{/* ======================= */}

{(!tool || tool === "traductor") && (
<section
  id="traductor"
  className="min-h-screen flex items-center py-24 scroll-mt-28"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
    <div className="max-w-2xl">
      <div className="inline-flex items-center rounded-full bg-blue-50 px-5 py-2 text-[#2563EB] font-medium text-sm mb-8">
        {tr("information_translator_badge", "Euskalia · Traductor")}
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
              {tr("information_translator_mockup_basque_text", "Kaixo, zer moduz?")}
            </p>
          </div>

          <div className="flex justify-end">
            <div className="bg-slate-100 rounded-3xl px-6 py-5 max-w-[280px]">
              <p className="text-[20px] leading-relaxed text-slate-700">
                {tr("information_translator_mockup_spanish_text", "Hola, ¿qué tal?")}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {tr("information_translator_mockup_completed", "Traducción completada")}
              </span>

              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
)}

{/* ======================= */}
{/* RESUMIDOR */}
{/* ======================= */}

{(!tool || tool === "resumidor") && (
<section
  id="resumidor"
  className="min-h-screen flex items-center py-24 scroll-mt-28"
>
  <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-16 items-center w-full">
    <div className="relative h-[620px] flex items-center justify-center order-2 lg:order-1">
      <div className="absolute w-[470px] h-[470px] rounded-[60px] bg-[#EEF8F1]" />

      <div className="relative w-[400px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
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

    <div className="max-w-[780px] order-1 lg:order-2">
      <div className="inline-flex items-center rounded-full bg-green-50 px-5 py-2 text-green-700 font-medium text-sm mb-8">
        {tr("information_summary_badge")}
      </div>

      <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
        {tr("information_summary_title")}
      </h2>

      <div className="space-y-10 text-[20px] leading-[1.9] text-slate-600">
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-green-500 mt-[14px] flex-shrink-0" />
          <p>
            {tr(
              "information_summary_point_1",
              "El resumidor de Euskalia permite convertir textos largos, documentos y contenido web en versiones más breves y fáciles de consultar. Su función es identificar las ideas principales de un contenido y presentarlas de forma más clara y condensada, manteniendo la información más relevante."
            )}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-green-500 mt-[14px] flex-shrink-0" />
          <p>
            {tr("information_summary_point_2_part_1")}
            <span className="underline text-green-600 font-semibold">
              {tr("information_summary_point_2_highlight")}
            </span>
            {tr("information_summary_point_2_part_2")}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-green-500 mt-[14px] flex-shrink-0" />
          <p>
            {tr("information_summary_point_3_part_1")}
            <span className="underline text-green-600 font-semibold">
              {tr("information_summary_point_3_highlight_1")}
            </span>
            {tr("information_summary_point_3_part_2")}
            <span className="underline text-green-600 font-semibold">
              {tr("information_summary_point_3_highlight_2")}
            </span>
            {tr("information_summary_point_3_part_3")}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
)}

{/* ======================= */}
{/* CORRECTOR */}
{/* ======================= */}

{(!tool || tool === "corrector") && (
<section
  id="corrector"
  className="min-h-screen flex items-center py-24 scroll-mt-28"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
    <div className="max-w-2xl">
      <div className="inline-flex items-center rounded-full bg-purple-50 px-5 py-2 text-purple-700 font-medium text-sm mb-8">
        {tr("information_corrector_badge")}
      </div>

      <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
        {tr("information_corrector_title")}
      </h2>

      <div className="space-y-10 text-[18px] leading-[2] text-slate-600">
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-purple-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr("information_corrector_point_1_part_1", "El corrector revisa ")}
            <span className="underline text-purple-600 font-semibold">
              {tr("information_corrector_point_1_highlight_1", "errores ortográficos, gramaticales y de escritura")}
            </span>
            {tr("information_corrector_point_1_part_2", " sin modificar el significado original del texto. Su función es ")}
            <span className="underline text-purple-600 font-semibold">
              {tr("information_corrector_point_1_highlight_2", "detectar y corregir errores")}
            </span>
            {tr("information_corrector_point_1_part_3", ", manteniendo el contenido y la intención del autor.")}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-purple-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr("information_corrector_point_2_part_1", "El ")}
            <span className="underline text-purple-600 font-semibold">
              {tr("information_corrector_point_2_highlight_1", "idioma")}
            </span>
            {tr("information_corrector_point_2_part_2", " del texto añadido debe coincidir con el ")}
            <span className="underline text-purple-600 font-semibold">
              {tr("information_corrector_point_2_highlight_2", "idioma seleccionado")}
            </span>
            {tr("information_corrector_point_2_part_3", " en el selector. Si se detecta que el contenido está escrito en otro idioma, se mostrará un aviso ofreciendo cambiar el selector al idioma detectado antes de realizar la corrección.")}
          </p>
        </div>
      </div>
    </div>

    <div className="relative h-[620px] flex items-center justify-center">
      <div className="absolute w-[430px] h-[430px] rounded-[60px] bg-purple-50 rotate-6" />

      <div className="relative w-[470px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-10">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0" />
            <p className="text-slate-700 line-through text-[22px]">
              {tr(
                "information_corrector_mockup_wrong",
                "Texto con errores ortográficos y gramaticales"
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0" />
            <p className="text-slate-900 font-medium text-[22px]">
              {tr(
                "information_corrector_mockup_right",
                "Texto corregido sin errores"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
)}

{/* ======================= */}
{/* PARAFRASEADOR */}
{/* ======================= */}

{(!tool || tool === "parafraseador") && (
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
              {tr("information_paraphraser_mockup_original", "Texto original")}
            </p>
          </div>

          <div className="flex justify-center text-[32px] text-orange-500 font-bold">
            ↓
          </div>

          <div className="rounded-3xl bg-orange-50 px-6 py-5 border border-orange-100">
            <p className="text-[20px] text-slate-800 leading-relaxed font-medium">
              {tr("information_paraphraser_mockup_rewritten", "Texto reformulado")}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-2xl order-1 lg:order-2">
      <div className="inline-flex items-center rounded-full bg-orange-50 px-5 py-2 text-orange-700 font-medium text-sm mb-8">
        {tr("information_paraphraser_badge", "Euskalia · Parafraseador")}
      </div>

      <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900 mb-8">
        {tr("information_paraphraser_title", "Parafraseador")}
      </h2>

      <div className="space-y-10 text-[18px] leading-[2] text-slate-600">
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-orange-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr("information_paraphraser_point_1_part_1", "El parafraseador permite ")}
            <span className="underline text-orange-600 font-semibold">
              {tr("information_paraphraser_point_1_highlight_1", "reformular un texto")}
            </span>
            {tr("information_paraphraser_point_1_part_2", " manteniendo su significado original. Su función es expresar las mismas ideas utilizando palabras o estructuras diferentes. Euskalia ofrece distintos estilos de parafraseo: Neutral, Formal, Informal, Profesional, Académico, Fluido y Creativo, permitiendo adaptar el resultado a diferentes contextos y necesidades.")}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-orange-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr("information_paraphraser_point_2_part_1", "El ")}
            <span className="underline text-orange-600 font-semibold">
              {tr("information_paraphraser_point_2_highlight_1", "idioma")}
            </span>
            {tr("information_paraphraser_point_2_part_2", " del resultado siempre será el mismo que el del texto añadido en la fuente. El parafraseador ")}
            <span className="underline text-orange-600 font-semibold">
              {tr("information_paraphraser_point_2_highlight_2", "reformula el contenido")}
            </span>
            {tr("information_paraphraser_point_2_part_3", ", pero ")}
            <span className="underline text-orange-600 font-semibold">
              {tr("information_paraphraser_point_2_highlight_3", "no realiza traducciones")}
            </span>
            {tr("information_paraphraser_point_2_part_4", " ni cambia el ")}
            <span className="underline text-orange-600 font-semibold">
              {tr("information_paraphraser_point_2_highlight_4", "idioma original del texto")}
            </span>
            {tr("information_paraphraser_point_2_part_5", ". El idioma seleccionado en el selector debe coincidir con el idioma del contenido añadido. Si se detecta que el texto está escrito en otro idioma, se mostrará un aviso ofreciendo cambiar el selector al idioma detectado antes de realizar el parafraseo.")}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
)}

{/* ======================= */}
{/* CREADOR DE TEXTO */}
{/* ======================= */}

{(!tool || tool === "creador-texto") && (
<section
  id="creador-texto"
  className="min-h-screen flex items-center py-24 scroll-mt-28"
>
  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center w-full">
    <div className="max-w-[900px] -mt-10">
      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900">
          {tr("information_text_creator_title", "Creador de Texto")}
        </h2>

        <div className="inline-flex items-center rounded-full bg-sky-50 px-5 py-2 text-sky-700 font-medium text-sm">
          {tr("information_text_creator_badge", "Euskalia · Creador de Texto")}
        </div>
      </div>

      <div className="space-y-10 text-[16px] leading-[2] text-slate-600">
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-sky-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr(
              "information_text_creator_point_1",
              "El creador de texto permite generar contenido nuevo a partir de la información proporcionada por el usuario. Puede utilizarse para redactar artículos, descripciones, publicaciones, textos informativos y otros tipos de contenido. Si la información añadida no es suficiente, la inteligencia artificial mostrará un mensaje indicando que se necesita más contexto antes de continuar."
            )}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-sky-500 mt-[12px] flex-shrink-0" />
          <p>
            <span className="underline text-sky-600 font-semibold">
              {tr("information_text_creator_point_2_highlight_1", "La longitud")}
            </span>
            {tr("information_text_creator_point_2_part_1", " del resultado puede ajustarse mediante el control disponible en la herramienta. En la fuente se puede introducir información en cualquier ")}
            <span className="underline text-sky-600 font-semibold">
              {tr("information_text_creator_point_2_highlight_2", "idioma")}
            </span>
            {tr("information_text_creator_point_2_part_2", ", mientras que el texto generado se mostrará en el idioma seleccionado en el selector.")}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-sky-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr("information_text_creator_point_3_part_1", "La herramienta dispone de dos modos de creación. En el modo ")}
            <span className="underline text-sky-600 font-semibold">
              {tr("information_text_creator_point_3_highlight_1", "Normal")}
            </span>
            {tr("information_text_creator_point_3_part_2", ", el usuario proporciona la información y la inteligencia artificial decide cómo estructurar y desarrollar el texto. En el modo ")}
            <span className="underline text-sky-600 font-semibold">
              {tr("information_text_creator_point_3_highlight_2", "Por párrafos")}
            </span>
            {tr("information_text_creator_point_3_part_3", ", el usuario tiene un mayor control sobre el resultado, pudiendo indicar cuántos párrafos desea generar y qué contenido o función debe tener cada uno de ellos.")}
          </p>
        </div>
      </div>
    </div>

    <div className="relative h-[620px] flex items-start justify-center pt-28">
      <div className="absolute w-[520px] h-[460px] rounded-[60px] bg-sky-50 rotate-6" />

      <div className="relative w-[520px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
        <div className="space-y-5">
          <div className="h-5 rounded-full bg-sky-200 w-[60%]" />
          <div className="h-4 rounded-full bg-slate-200 w-full" />
          <div className="h-4 rounded-full bg-slate-200 w-[92%]" />
          <div className="h-4 rounded-full bg-slate-200 w-[88%]" />
          <div className="h-4 rounded-full bg-slate-200 w-[95%]" />
          <div className="h-4 rounded-full bg-slate-200 w-[70%]" />

          <div className="mt-8 rounded-[28px] bg-sky-50 border border-sky-200 px-6 py-5 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src="/Bombilla.png"
                  alt="Bombilla"
                  className="w-full h-full object-contain"
                  style={{ transform: "scale(2.2)", transformOrigin: "center center" }}
                />
              </div>

              <p className="flex-1 text-[15px] leading-[1.65] text-sky-700 font-bold">
                {tr(
                  "information_text_creator_tip",
                  "Es importante que el usuario entienda que cuanto más información, detalles y contexto proporcione, más preciso y completo podrá ser el resultado generado."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
)}

{/* ======================= */}
{/* CREADOR DE EMAIL */}
{/* ======================= */}

{(!tool || tool === "creador-email") && (
<section
  id="creador-email"
  className="min-h-screen flex items-center py-24 scroll-mt-28"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
    <div className="relative h-[620px] flex items-center justify-center order-2 lg:order-1 -ml-40">
      <div className="absolute w-[400px] h-[400px] rounded-[60px] bg-indigo-50 -rotate-6" />

      <div className="relative w-[460px] rounded-[40px] border border-slate-200 bg-white shadow-2xl p-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <span className="text-sm text-slate-500">
              {tr("information_email_creator_mockup_to", "Nori:")}
            </span>

            <div className="h-3 rounded-full bg-slate-200 w-[170px]" />
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <span className="text-sm text-slate-500">
              {tr("information_email_creator_mockup_subject", "Gaia:")}
            </span>

            <div className="h-3 rounded-full bg-slate-200 w-[150px]" />
          </div>

          <div className="space-y-4 pt-4">
            <div className="h-4 rounded-full bg-slate-200 w-full" />
            <div className="h-4 rounded-full bg-slate-200 w-[90%]" />
            <div className="h-4 rounded-full bg-slate-200 w-[95%]" />
            <div className="h-4 rounded-full bg-slate-200 w-[75%]" />
          </div>

          <div className="mt-8 rounded-[28px] bg-indigo-50 border border-indigo-200 px-6 py-5 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src="/Bombilla morada.png"
                  alt="Bombilla"
                  className="w-full h-full object-contain"
                  style={{ transform: "scale(2)", transformOrigin: "center center" }}
                />
              </div>

              <p className="flex-1 text-[14px] leading-[1.55] text-indigo-700 font-bold">
                {tr(
                  "information_email_creator_tip",
                  "Antes de enviar cualquier correo, se recomienda revisar el resultado generado para comprobar que la información sea la correcta."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-2xl order-1 lg:order-2 -ml-28">
      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-[58px] leading-[1.02] tracking-tight font-bold text-slate-900">
          {tr("information_email_creator_title", "Creador de Email")}
        </h2>

        <div className="inline-flex items-center rounded-full bg-indigo-50 px-5 py-2 text-indigo-700 font-medium text-sm">
          {tr("information_email_creator_badge", "Euskalia · Creador de Email")}
        </div>
      </div>

      <div className="space-y-10 text-[16px] leading-[2] text-slate-600 -ml-16">
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr("information_email_creator_point_1_part_1", "El creador de email permite generar correos electrónicos a partir de la información proporcionada por el usuario, independientemente del ")}
            <span className="underline text-indigo-600 font-semibold">
              {tr("information_email_creator_point_1_highlight_1", "idioma")}
            </span>
            {tr("information_email_creator_point_1_part_2", " en que esté escrita. El resultado se mostrará en el idioma seleccionado en el selector. Dispone de dos estilos de redacción: ")}
            <span className="underline text-indigo-600 font-semibold">
              {tr("information_email_creator_point_1_highlight_2", "Formal")}
            </span>
            {tr("information_email_creator_point_1_part_3", ", para comunicaciones profesionales, e ")}
            <span className="underline text-indigo-600 font-semibold">
              {tr("information_email_creator_point_1_highlight_3", "Informal")}
            </span>
            {tr("information_email_creator_point_1_part_4", ", para mensajes más cercanos y naturales.")}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr("information_email_creator_point_2_part_1", "En modo ")}
            <span className="underline text-indigo-600 font-semibold">
              {tr("information_email_creator_point_2_highlight_1", "Creativo")}
            </span>
            {tr("information_email_creator_point_2_part_2", ", la inteligencia artificial desarrolla el correo de forma más libre y creativa, pudiendo ser una muy buena opción para usuarios que tienen bloqueos sobre cómo empezar o qué escribir. En modo ")}
            <span className="underline text-indigo-600 font-semibold">
              {tr("information_email_creator_point_2_highlight_2", "Plantilla")}
            </span>
            {tr("information_email_creator_point_2_part_3", ", el resultado es más literal y el usuario tiene un mayor control sobre el contenido, pudiendo definir la información de cada párrafo.")}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mt-[12px] flex-shrink-0" />
          <p>
            {tr("information_email_creator_point_3_part_1", "Cuanto más contexto, información y detalles proporcione el usuario, ")}
            <span className="underline text-indigo-600 font-semibold">
              {tr("information_email_creator_point_3_highlight_1", "más preciso y completo")}
            </span>
            {tr("information_email_creator_point_3_part_2", " será el resultado generado.")}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
)}

      </section>
    </main>
  );
}