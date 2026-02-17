import React, { useMemo, useState } from "react";
import {
  Sparkles,
  FileText,
  Pencil,
  ChevronDown,
  Plus,
  ArrowUp,
} from "lucide-react";
import { useTranslation } from "@/lib/translations";

export default function PremiumAiAssistant() {
  const { t } = useTranslation();

  const tr = (key, fallback = "") => {
    const val = typeof t === "function" ? t(key) : null;
    return !val || val === key ? fallback : val;
  };

  const [tab, setTab] = useState("chat"); // "chat" | "history"
  const [input, setInput] = useState("");

  const placeholderTitle = useMemo(
    () => tr("assistant.title", "Euskalia AI"),
    [t]
  );

  return (
    <div className="w-full h-[calc(100vh-64px)] min-h-[640px] relative">
      {/* BACKDROP (como el ejemplo) */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 backdrop-blur-sm" />

      {/* PANEL CENTRAL */}
      <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-6">
        <div
          className="
            w-full max-w-[760px]
            bg-white
            rounded-[18px]
            shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            overflow-hidden
          "
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-6 pt-5">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTab("chat")}
                className={`
                  h-9 px-4 rounded-full text-sm font-semibold
                  border
                  ${
                    tab === "chat"
                      ? "bg-white border-slate-200 text-slate-900 shadow-sm"
                      : "bg-slate-50 border-transparent text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                {tr("assistant.tab_chat", "Chat")}
              </button>

              <button
                type="button"
                onClick={() => setTab("history")}
                className={`
                  h-9 px-4 rounded-full text-sm font-semibold
                  border
                  ${
                    tab === "history"
                      ? "bg-white border-slate-200 text-slate-900 shadow-sm"
                      : "bg-slate-50 border-transparent text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                {tr("assistant.tab_history", "History")}
              </button>
            </div>

            {/* Actions */}
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
          <div className="px-6 pt-6 pb-0">
            {/* Cabecera del asistente (mismo estilo visual que el ejemplo) */}
            <div className="flex items-start gap-3">
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

            {/* ZONA CHAT (VACÍA: dejas el espacio) */}
            <div
              className="
                mt-5
                h-[280px] sm:h-[320px]
                rounded-2xl
                bg-white
                overflow-hidden
                flex flex-col
              "
            >
              {/* espacio para mensajes */}
              <div className="flex-1 overflow-auto px-2 sm:px-4 py-3">
                {/* Dejado vacío a propósito (como pediste) */}
              </div>

              {/* INPUT BOX (exacto estilo: borde grueso, rounded grande, + y botón enviar) */}
              <div className="px-2 sm:px-4 pb-4">
                <div
                  className="
                    rounded-[18px]
                    border-2 border-slate-900/90
                    bg-white
                    px-4
                    py-3
                    flex items-end gap-3
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
                    "
                    aria-label="Add"
                    title="Add"
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={2}
                    placeholder={tr("assistant.input_placeholder", "Ask anything…")}
                    className="
                      flex-1
                      resize-none
                      outline-none
                      text-[14px]
                      leading-6
                      text-slate-900
                      placeholder:text-slate-400
                      min-h-[44px]
                      max-h-[120px]
                    "
                  />

                  <button
                    type="button"
                    disabled={!input.trim()}
                    className={`
                      h-10 w-10 rounded-full
                      inline-flex items-center justify-center
                      transition
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

          {/* padding inferior igual que el ejemplo */}
          <div className="h-5" />
        </div>
      </div>
    </div>
  );
}
