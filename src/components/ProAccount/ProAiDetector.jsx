import React, { useRef, useState } from "react";
import { Clipboard, UploadCloud, Trash2 } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { useNavigate } from "react-router-dom";

export default function ProAiDetector() {
  const { t } = useTranslation();
  const tr = (key, fallback) => t(key) || fallback;

  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [text, setText] = useState("");

  const [result, setResult] = useState(null); // { ai: number, human: number, note?: string }
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePasteFromClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clip = await navigator.clipboard.readText();
        if (clip) {
          setText(clip.slice(0, 5000));
          setResult(null);
          setErrorMsg("");
        }
      }
    } catch (e) {
      console.error("Error al leer del portapapeles", e);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        setText(content.slice(0, 5000));
        setResult(null);
        setErrorMsg("");
      }
    };
    reader.readAsText(file);
  };

  const runDetection = async () => {
    const payload = text.trim();
    if (!payload) return;

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const r = await fetch("/api/ai-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: payload }),
      });

      const data = await r.json().catch(() => ({}));

      if (!r.ok) {
        setErrorMsg(
          data?.message ||
            data?.error ||
            tr("aiDetector_error_generic", "No se pudo analizar el texto.")
        );
        setLoading(false);
        return;
      }

      setResult({
        ai: data.ai,
        human: data.human,
        note: data.note,
      });
    } catch (e) {
      console.error(e);
      setErrorMsg(tr("aiDetector_error_network", "Error de red. Intenta de nuevo."));
    } finally {
      setLoading(false);
    }
  };

  const aiValue = result?.ai;
  const humanValue = result?.human;

  const canClear = text.trim().length > 0 && !loading;

  const handleGoHumanize = () => {
    if (!result) return;
    const payload = (text || "").trim();
    if (!payload) return;

    navigate("/cuenta-pro/humanizador", {
      state: { text: payload },
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* ✅ ELIMINADO: título + subtítulo */}

      {/* ✅ AQUÍ el cambio: bajarlo desde arriba */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mt-6">
        {/* IZQUIERDA */}
        <div className="relative bg-white rounded-2xl border border-slate-200 px-7 py-7 min-h-[500px]">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value.slice(0, 5000));
              setResult(null);
              setErrorMsg("");
            }}
            disabled={loading}
            className="w-full h-52 resize-none border-none outline-none bg-transparent px-1 text-sm text-slate-700 placeholder:text-slate-500 focus:ring-0 overflow-y-auto mb-24 disabled:opacity-60"
            placeholder={tr(
              "aiDetector_placeholder",
              "Escribe o pega aquí el texto que quieres analizar..."
            )}
          />

          {text.length === 0 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center gap-8">
              <button
                type="button"
                onClick={handlePasteFromClipboard}
                className="flex flex-col items-center justify-center w-44 h-28 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 shadow-sm"
              >
                <Clipboard size={22} className="mb-2 text-slate-500" />
                <span>{tr("aiDetector_paste_button", "Pegar texto")}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-44 h-28 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 shadow-sm"
              >
                <UploadCloud size={22} className="mb-2 text-slate-500" />
                <span>{tr("aiDetector_upload_button", "Subir archivo")}</span>
              </button>

              <input
                type="file"
                accept=".txt"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}

          <div className="absolute left-6 bottom-5 flex items-center gap-8">
            <span className="text-xs text-slate-400">
              {text.length} / {tr("aiDetector_max_chars", "5000")}
            </span>

            <button
              type="button"
              disabled={!canClear}
              onClick={() => {
                setText("");
                setResult(null);
                setErrorMsg("");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              title={tr("aiDetector_clear_title", "Borrar")}
              aria-label={tr("aiDetector_clear_title", "Borrar")}
              className={
                "h-9 w-9 rounded-xl border flex items-center justify-center transition " +
                (canClear
                  ? "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  : "border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed")
              }
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="absolute right-6 bottom-4">
            <button
              type="button"
              onClick={runDetection}
              disabled={loading || text.trim().length === 0}
              className="h-11 px-7 rounded-full text-white font-semibold text-sm shadow-md
                         bg-gradient-to-r from-blue-600 to-cyan-500
                         hover:from-blue-700 hover:to-cyan-600 transition
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:hover:from-blue-600 disabled:hover:to-cyan-500"
            >
              {loading
                ? tr("aiDetector_button_analyzing", "Analizando...")
                : result
                ? tr("aiDetector_button_reanalyze", "Volver a analizar")
                : tr("aiDetector_button_analyze", "Revisar si hay contenido de IA")}
            </button>
          </div>
        </div>

        {/* DERECHA */}
        <div className="bg-white rounded-2xl border border-slate-200 px-7 py-7 min-h-[500px] flex flex-col">
          <div className="mt-2 text-center">
            {loading ? (
              <>
                <div className="text-2xl font-medium text-slate-500">
                  {tr("aiDetector_right_loading_title", "Analizando el texto…")}
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  {tr("aiDetector_right_loading_subtitle", "Esto puede tardar unos segundos")}
                </div>
              </>
            ) : (
              <>
                <div className="text-6xl font-semibold tracking-tight text-slate-900">
                  {result ? `${aiValue}%` : "--%"}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  {tr("aiDetector_right_percent_subtitle", "del texto podría estar generado por IA")}
                </div>

                {!!result?.note && <div className="mt-3 text-xs text-slate-500">{result.note}</div>}
                {!!errorMsg && <div className="mt-3 text-xs text-red-600">{errorMsg}</div>}
              </>
            )}
          </div>

          <div className="mt-6">
            <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: result ? `${aiValue}%` : "0%" }}
              />
            </div>
          </div>

          <div className="mt-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm text-slate-700">
                  {tr("aiDetector_label_ai", "AI-generated")}
                </span>
              </div>
              <span className="text-sm text-slate-700">{result ? `${aiValue}%` : "--%"}</span>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-sm text-slate-700">
                  {tr("aiDetector_label_human", "Human-written")}
                </span>
              </div>
              <span className="text-sm text-slate-700">{result ? `${humanValue}%` : "--%"}</span>
            </div>

            <div className="h-px bg-slate-200" />
          </div>

          <div className="mt-auto pt-6">
            {!!result && (
              <div className="mb-3 text-[11px] leading-4 text-slate-400 text-center">
                {tr("aiDetector_disclaimer", "Estimación orientativa. Puede no ser 100% precisa.")}
              </div>
            )}

            <button
              type="button"
              className="w-full h-12 rounded-full border border-emerald-500 text-emerald-600 font-semibold text-sm hover:bg-emerald-50 transition disabled:opacity-50 disabled:hover:bg-transparent"
              disabled={!result}
              onClick={handleGoHumanize}
            >
              ✨ {tr("aiDetector_humanize_button", "Humanizar texto IA")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
