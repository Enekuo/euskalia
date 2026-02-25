import React, { useMemo, useState } from "react";
import { Sparkles, FileText, Pencil, ChevronDown, Plus, ArrowUp } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export default function PremiumAiAssistant() {
  const { t } = useTranslation();

  const tr = (key, fallback = "") => {
    const val = typeof t === "function" ? t(key) : null;
    return !val || val === key ? fallback : val;
  };

  const [input, setInput] = useState("");

  const placeholderTitle = useMemo(() => tr("assistant.title", "Euskalia AI"), [t]);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-[980px]">
        {/* ✅ TITULO GRANDE + SUBTITULO (solo lo redondeado) */}
        <div className="text-center">
          <div className="text-[34px] sm:text-[44px] font-extrabold tracking-tight text-slate-900">
            {tr("assistant.big_title", "¿Cómo puedo ayudar?")}
          </div>
          <div className="mt-2 text-[16px] sm:text-[18px] text-slate-600">
            {tr("assistant.big_subtitle", "Usa el chat IA para generar nuevas ideas")}
          </div>
        </div>

        {/* PANEL CENTRAL */}
        <div
          className="
            mt-10
            w-full
            bg-white
            rounded-[18px]
            shadow-[0_20px_80px_rgba(0,0,0,0.12)]
            overflow-hidden
            border border-slate-100
          "
        >
          {/* TOP BAR (solo acciones, sin tabs) */}
          <div className="flex items-center justify-end px-6 pt-5">
            <div className="flex items-center gap-3 text-slate-400">
              <button
                type="button"
                className="h-9 w-9 rounded-full hover:bg-slate-50 inline-flex items-center justify-center"
                aria-label="Actions"
                title="Actions"
              >
                <Sparkles className="w-4.5 h-4.5" />
              </button>
              <button
                type="button"
                className="h-9 w-9 rounded-full hover:bg-slate-50 inline-flex items-center justify-center"
                aria-label="Document"
                title="Document"
              >
                <FileText className="w-4.5 h-4.5" />
              </button>
              <button
                type="button"
                className="h-9 w-9 rounded-full hover:bg-slate-50 inline-flex items-center justify-center"
                aria-label="Edit"
                title="Edit"
              >
                <Pencil className="w-4.5 h-4.5" />
              </button>
              <button
                type="button"
                className="h-9 w-9 rounded-full hover:bg-slate-50 inline-flex items-center justify-center"
                aria-label="More"
                title="More"
              >
                <ChevronDown className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-6 pt-3 pb-0">
            {/* ✅ CHAT PILL POR ENCIMA (y sin History) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="
                  h-9 px-4 rounded-full text-sm font-semibold
                  border bg-white border-slate-200 text-slate-900 shadow-sm
                "
              >
                {tr("assistant.tab_chat", "Chat")}
              </button>
            </div>

            {/* Cabecera del asistente */}
            <div className="mt-5 flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="min-w-0">
                <div className="text-[18px] font-extrabold text-slate-900">
                  {placeholderTitle}
                </div>

                <div className="mt-1 text-[14px] leading-6 text-slate-600">
                  {tr(
                    "assistant.subtitle",
                    "Tu asistente de IA dentro de Euskalia. (Sin conectar a la API por ahora)"
                  )}
                </div>
              </div>
            </div>

            {/* ZONA CHAT */}
            <div
              className="
                mt-5
                h-[360px] sm:h-[440px]
                rounded-2xl
                bg-white
                overflow-hidden
                flex flex-col
              "
            >
              <div className="flex-1 overflow-auto px-2 sm:px-4 py-3">
                <div />
              </div>

              {/* INPUT BOX */}
              <div className="px-2 sm:px-4 pb-4">
                <div
                  className="
                    rounded-[18px]
                    border-2 border-slate-900/90
                    bg-white
                    px-4
                    py-2
                    flex items-center gap-3
                  "
                >
                  <button
                    type="button"
                    className="
                      h-9 w-9
                      rounded-full
                      border border-slate-200
                      bg-white
                      hover:bg-slate-50
                      inline-flex items-center justify-center
                      text-slate-700
                      shrink-0
                    "
                    aria-label="Add"
                    title="Add"
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={1}
                    placeholder={tr("assistant.input_placeholder", "Ask anything…")}
                    className="
                      flex-1
                      resize-none
                      outline-none
                      text-[14px]
                      leading-6
                      text-slate-900
                      placeholder:text-slate-400
                      h-9
                      min-h-[36px]
                      max-h-[72px]
                      pt-[6px]
                    "
                  />

                  <button
                    type="button"
                    disabled={!input.trim()}
                    className={`
                      h-10 w-10 rounded-full
                      inline-flex items-center justify-center
                      transition
                      shrink-0
                      ${
                        input.trim()
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          : "bg-slate-100 text-slate-300 cursor-not-allowed"
                      }
                    `}
                    aria-label="Send"
                    title="Send"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>

                {/* Disclaimer inferior */}
                <div className="pt-3 text-center text-[12px] text-slate-500">
                  {tr(
                    "assistant.disclaimer",
                    "Euskalia AI can make mistakes. Double-check replies."
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="h-5" />
        </div>

        {/* ✅ TEXTO LEGAL ABAJO (solo lo redondeado) */}
        <div className="mt-10 text-center text-[12px] text-slate-500">
          <span>
            {tr(
              "assistant.legal_prefix",
              "Al usar el chat IA, confirmas que estás de acuerdo con nuestras "
            )}
          </span>
          <span className="text-blue-600 underline underline-offset-2 cursor-pointer">
            {tr("assistant.legal_terms", "Condiciones del servicio")}
          </span>
          <span>{tr("assistant.legal_middle", " y que has leído la ")}</span>
          <span className="text-blue-600 underline underline-offset-2 cursor-pointer">
            {tr("assistant.legal_privacy", "Política de privacidad")}
          </span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
}