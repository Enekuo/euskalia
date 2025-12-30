import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/translations";

const MAX_CHARS = 1000;

export default function Suggestions() {
  const { t } = useTranslation();
  const tr = (key, fallback = "") => t(key) || fallback;

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!message.trim()) {
      setError(tr("suggestions.error_required", ""));
      return;
    }

    if (message.trim().length < 20) {
      setError(tr("suggestions.error_min_length", ""));
      return;
    }

    // En el futuro: enviar a backend / API real
    console.log({
      message,
      email,
      source: "free",
    });

    setSubmitted(true);
    setMessage("");
  };

  return (
    <section className="w-full h-full bg-gradient-to-b from-[#F4F8FF] via-white to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10 space-y-6">
        {/* CABECERA */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-[11px] font-medium text-blue-700 shadow-sm mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{tr("suggestions.zone_badge", "")}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-[30px] font-extrabold tracking-tight text-slate-900">
              {tr("suggestions.title", "")}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
              {tr(
                "suggestions.form_description",
                "Euskalia: nuevas herramientas, cambios en el diseño, límites, ideas para estudiar mejor, cosas que te molestan… cualquier comentario es bienvenido."
              )}
            </p>
          </div>

          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-sky-400 mx-auto" />
        </div>

        {/* TARJETA PRINCIPAL */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-3xl border border-blue-100 bg-gradient-to-b from-white/95 to-[#F4F8FF]/85 shadow-[0_18px_45px_rgba(15,23,42,0.06)] px-4 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 space-y-6 overflow-hidden"
        >
          {/* halos suaves */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />

          <div className="relative grid gap-5">
            {/* SUGERENCIA */}
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-slate-800">
                {tr("suggestions.textarea_label", "")}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
                rows={8}
                placeholder={tr("suggestions.textarea_placeholder", "")}
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/60 px-3.5 py-3 text-sm text-slate-900 outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 resize-none transition"
              />
              <div className="flex justify-end">
                <span className="text-[11px] text-slate-500">
                  {message.length}/{MAX_CHARS}{" "}
                  {tr("suggestions.characters_suffix", "")}
                </span>
              </div>
            </div>

            {/* EMAIL OPCIONAL */}
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-slate-800">
                {tr("suggestions.email_label", "")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tr("suggestions.email_placeholder", "")}
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/60 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          {/* MENSAJES DE ESTADO */}
          {error && (
            <p className="relative text-xs text-red-600 bg-red-50/90 border border-red-100 rounded-2xl px-3.5 py-2">
              {error}
            </p>
          )}

          {submitted && !error && (
            <div className="relative flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50/90 border border-emerald-100 rounded-2xl px-3.5 py-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{tr("suggestions.success_message", "")}</span>
            </div>
          )}

          {/* BOTÓN ENVIAR */}
          <div className="relative flex justify-end mt-1">
            <div className="pointer-events-none absolute inset-y-0 right-4 w-32 rounded-full bg-blue-400/30 blur-2xl" />
            <button
              type="submit"
              className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_30px_rgba(56,132,255,0.35)] hover:shadow-[0_12px_40px_rgba(56,132,255,0.45)] hover:brightness-105 active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
              {tr("suggestions.button_label", "")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
