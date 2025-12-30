import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { useLibraryDocs } from "@/proLibraryStore";
import ProLayout from "./ProLayout";

export default function ProLibraryDetail() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  const navigate = useNavigate();
  const { id } = useParams();

  const { docs } = useLibraryDocs();
  const doc = docs.find((d) => d.id === id);

  // Si no hay documento, mostramos un mensaje sencillo
  if (!doc) {
    return (
      <ProLayout>
        <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] via-[#F9FBFF] to-[#ECF3FF]">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-sky-700 hover:text-sky-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{tr("library_back", "Atzera")}</span>
            </button>

            <div className="mx-auto max-w-5xl bg-gradient-to-br from-white via-white to-[#F3F7FF] rounded-[24px] shadow-[0_20px_70px_rgba(15,23,42,0.16)] border border-slate-200/80 px-6 md:px-10 py-8">
              <p className="text-base md:text-[17px] leading-relaxed text-slate-700">
                {tr(
                  "library_not_found",
                  "No se ha encontrado este documento en tu biblioteca."
                )}
              </p>
            </div>
          </div>
        </div>
      </ProLayout>
    );
  }

  const isTranslation = doc.kind === "translation";

  const typeLabel = isTranslation
    ? tr("library_prefix_translation", "Traducción:")
    : tr("library_prefix_summary", "Resumen:");

  const dateLabel = (() => {
    if (doc.createdAtLabel) return doc.createdAtLabel;
    if (!doc.createdAt) return "";
    try {
      return new Date(doc.createdAt)
        .toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(".", "");
    } catch {
      return "";
    }
  })();

  const titleText = doc.title || tr("library_untitled", "Sin título");

  return (
    <ProLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#F4F8FF] via-[#F9FBFF] to-[#ECF3FF]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-10">
          {/* Botón volver */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-sky-700 hover:text-sky-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tr("library_back", "Atzera")}</span>
          </button>

          {/* Tarjeta grande */}
          <div className="mx-auto max-w-6xl bg-gradient-to-br from-white via-white to-[#F3F7FF] rounded-[24px] shadow-[0_20px_70px_rgba(15,23,42,0.16)] border border-slate-200/80 px-6 md:px-10 py-8 md:py-9">
            {/* Título */}
            <p className="text-[19px] md:text-[22px] leading-[30px] tracking-tight">
              <span className="font-semibold text-slate-900">{typeLabel}</span>
              <span className="text-slate-700 font-medium"> {titleText}</span>
            </p>

            {/* Contenido */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-[#F5F8FF] px-4 md:px-6 py-4 md:py-5 min-h-[220px]">
              <p className="text-[15px] leading-7 text-slate-800 whitespace-pre-wrap">
                {doc.content}
              </p>
            </div>

            {/* Fecha abajo a la izquierda */}
            {dateLabel && (
              <p className="mt-4 text-sm text-slate-500">{dateLabel}</p>
            )}
          </div>
        </div>
      </div>
    </ProLayout>
  );
}
