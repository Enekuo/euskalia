import React, { useRef, useState } from "react";
import { Clipboard, UploadCloud, Trash2 } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import PremiumLimitBanner from "@/components/PremiumAccount/PremiumLimitBanner";

export default function PremiumAiDetector() {
  const { t, language } = useTranslation();

  // ✅ idioma UI -> key interna (ES/EUS/EN/FR)
  const uiLangKey = () => {
    const x = String(language || "").toUpperCase();
    if (x === "ES" || x === "EUS" || x === "EN" || x === "FR") return x;

    const low = String(language || "").toLowerCase();
    if (low === "es") return "ES";
    if (low === "en") return "EN";
    if (low === "fr") return "FR";
    return "EUS";
  };

  // ✅ tr compatible con translations plano {ES,EUS,EN,FR}
  const tr = (key, fallback = "") => {
    const v = typeof t === "function" ? t(key) : null;

    if (v && typeof v === "object") {
      const k = uiLangKey();
      return v[k] || v.EUS || v.ES || v.EN || v.FR || fallback;
    }

    if (!v || v === key) return fallback;
    return v;
  };

  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [text, setText] = useState("");

  const [result, setResult] = useState(null); // { ai: number, human: number, note?: string }
  const [loading, setLoading] = useState(false);

  // ✅✅✅ LIMITS (solo tipo, SIN guardar textos traducidos)
  const [limitType, setLimitType] = useState(""); // "" | "daily" | "chars"
  const [limitRaw, setLimitRaw] = useState(""); // SOLO backend/raw (si viene)

  // ✅ errores por clave + raw
  const [errorRaw, setErrorRaw] = useState(""); // SOLO backend/raw (si viene)
  const [errorKey, setErrorKey] = useState(""); // clave translations
  const [errorFallback, setErrorFallback] = useState(""); // fallback

  const setDailyLimit = () => setLimitType("daily");
  const setCharsLimit = () => setLimitType("chars");
  const clearLimit = () => {
    setLimitType("");
    setLimitRaw("");
  };

  const clearErrors = () => {
    setErrorRaw("");
    setErrorKey("");
    setErrorFallback("");
  };

  // ✅ mensaje límite DERIVADO (NO en state)
  const limitMsg =
    limitRaw ||
    (limitType === "chars"
      ? tr(
          "premium_limit_chars",
          "Has superado el límite máximo de caracteres para tu plan Premium."
        )
      : limitType === "daily"
      ? tr(
          "premium_limit_daily",
          "Has alcanzado tu límite diario del plan Premium. Vuelve mañana."
        )
      : "");

  // ✅ error final DERIVADO (NO en state)
  const errorMsg = errorRaw || (errorKey ? tr(errorKey, errorFallback) : "");

  const handlePasteFromClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clip = await navigator.clipboard.readText();
        if (clip) {
          setText(clip.slice(0, 5000));
          setResult(null);
          clearErrors();
          clearLimit();
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
        clearErrors();
        clearLimit();
      }
    };
    reader.readAsText(file);
  };

  const runDetection = async () => {
    const payload = text.trim();
    if (!payload) return;

    setLoading(true);
    setResult(null);
    clearErrors();
    clearLimit();

    try {
      const user = auth?.currentUser;
      const token = user ? await user.getIdToken() : null;

      if (!token) {
        setErrorKey("premiumAiDetector.error_not_logged");
        setErrorFallback("Necesitas iniciar sesión para usar el Detector de IA.");
        setLoading(false);
        return;
      }

      const r = await fetch("/api/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mode: "ai_detector", text: payload }),
      });

      // ✅ intentamos JSON una sola vez (si no, {})
      const data = await r.json().catch(() => ({}));

      if (!r.ok) {
        // ✅ 413 => límite de caracteres
        if (r.status === 413) {
          setCharsLimit();
          setLimitRaw(String(data?.message || ""));
          setLoading(false);
          return;
        }

        // ✅ 429 => límite (chars o daily) según backend.limit
        if (r.status === 429) {
          const limit = data?.limit || {};
          const isChars = typeof limit?.max_chars === "number";
          const isDaily = typeof limit?.daily_requests === "number";

          if (isChars) setCharsLimit();
          else if (isDaily) setDailyLimit();
          else setDailyLimit();

          setLimitRaw(String(data?.message || ""));
          setLoading(false);
          return;
        }

        // ✅ 400 => validación (texto corto, etc.)
        if (r.status === 400) {
          const errCode = String(data?.error || "");
          if (errCode === "TEXT_TOO_SHORT") {
            setErrorKey("premiumAiDetector.text_too_short");
            setErrorFallback("El texto es demasiado corto para analizar (min. ~40 caracteres).");
            setLoading(false);
            return;
          }

          const msg = String(data?.message || "");
          const low = msg.toLowerCase();

          const looksTooShort =
            low.includes("too short") ||
            low.includes("demasiado corto") ||
            low.includes("trop court") ||
            low.includes("laburregia") ||
            (low.includes("min") && (low.includes("40") || low.includes("~40")));

          if (looksTooShort) {
            setErrorKey("premiumAiDetector.text_too_short");
            setErrorFallback("El texto es demasiado corto para analizar (min. ~40 caracteres).");
            setLoading(false);
            return;
          }

          if (msg) {
            setErrorRaw(msg);
          } else {
            setErrorKey("premiumAiDetector.error_generic");
            setErrorFallback("No se pudo analizar el texto.");
          }

          setLoading(false);
          return;
        }

        if (r.status === 401 || r.status === 403) {
          setErrorKey("premiumAiDetector.error_unauthorized");
          setErrorFallback("Necesitas iniciar sesión para usar esta herramienta.");
          setLoading(false);
          return;
        }

        const msg = String(data?.message || "");
        if (msg) setErrorRaw(msg);
        else {
          setErrorKey("premiumAiDetector.error_generic");
          setErrorFallback("No se pudo analizar el texto.");
        }

        setLoading(false);
        return;
      }

      // ✅✅✅ FIX: actualizar contador del header (igual que Corrector/Parafraseador/Humanizador)
      if (data?.ok && typeof data.usedChars === "number" && typeof data.limitChars === "number") {
        window.dispatchEvent(
          new CustomEvent("premium-usage-update", {
            detail: { usedChars: data.usedChars, limitChars: data.limitChars },
          })
        );
      }

      setResult({
        ai: data.ai,
        human: data.human,
        note: data.note,
      });
    } catch (e) {
      console.error(e);
      setErrorKey("premiumAiDetector.error_network");
      setErrorFallback("Error de red. Intenta de nuevo.");
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

    navigate("/cuenta-premium/humanizador", {
      state: { text: payload },
    });
  };

  // ✅ contador / barra
  const MAX_CHARS = 5000;
  const charCount = (text || "").length;
  const pct = Math.min(100, Math.round((charCount / MAX_CHARS) * 100));
  const nearLimit = charCount >= MAX_CHARS * 0.9 && charCount < MAX_CHARS;
  const overLimit = charCount >= MAX_CHARS;
  const barClass = overLimit ? "bg-red-500" : nearLimit ? "bg-amber-500" : "bg-sky-500";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mt-6">
        {/* IZQUIERDA */}
        <div className="relative bg-white rounded-2xl border border-slate-200 px-7 py-7 min-h-[500px]">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value.slice(0, 5000));
              setResult(null);
              clearErrors();
              clearLimit();
            }}
            disabled={loading}
            className="w-full h-80 resize-none border-none outline-none bg-transparent px-1 text-sm text-slate-700 placeholder:text-slate-500 focus:ring-0 overflow-y-auto mb-24 disabled:opacity-60"
            placeholder={tr("premiumAiDetector.placeholder", "Escribe o pega aquí el texto que quieres analizar...")}
          />

          {/* ✅✅✅ BANNER (izquierda) - SIN EMPUJAR CONTENIDO */}
          <div className="absolute left-7 right-7 top-[52%] -translate-y-1/2">
            <PremiumLimitBanner visible={!!limitType} message={""} />
          </div>

          {text.length === 0 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center gap-8">
              <button
                type="button"
                onClick={handlePasteFromClipboard}
                className="flex flex-col items-center justify-center w-44 h-28 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 shadow-sm"
              >
                <Clipboard size={22} className="mb-2 text-slate-500" />
                <span>{tr("premiumAiDetector.paste_button", "Pegar texto")}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-44 h-28 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 shadow-sm"
              >
                <UploadCloud size={22} className="mb-2 text-slate-500" />
                <span>{tr("premiumAiDetector.upload_button", "Subir archivo")}</span>
              </button>

              <input type="file" accept=".txt" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            </div>
          )}

          {/* ✅✅✅ BARRA + CONTADOR + BOTÓN BORRAR */}
          <div className="absolute left-6 bottom-5 w-[calc(100%-350px)]">
            <div className="flex items-end justify-between gap-6">
              <div className="flex-1">
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-1 ${barClass}`} style={{ width: `${pct}%` }} />
                </div>

                <div className="mt-1 text-right text-xs">
                  <span className={overLimit ? "text-red-600" : nearLimit ? "text-amber-600" : "text-slate-500"}>
                    {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={!canClear}
                onClick={() => {
                  setText("");
                  setResult(null);
                  clearErrors();
                  clearLimit();
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                title={tr("premiumAiDetector.clear_title", "Borrar")}
                aria-label={tr("premiumAiDetector.clear_title", "Borrar")}
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
                ? tr("premiumAiDetector.button_analyzing", "Analizando...")
                : result
                ? tr("premiumAiDetector.button_reanalyze", "Volver a analizar")
                : tr("premiumAiDetector.button_analyze", "Revisar si hay contenido de IA")}
            </button>
          </div>
        </div>

        {/* DERECHA */}
        <div className="bg-white rounded-2xl border border-slate-200 px-7 py-7 min-h-[500px] flex flex-col">
          <div className="mt-2 text-center">
            {loading ? (
              <>
                <div className="text-2xl font-medium text-slate-500">
                  {tr("premiumAiDetector.right_loading_title", "Analizando el texto…")}
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  {tr("premiumAiDetector.right_loading_subtitle", "Esto puede tardar unos segundos")}
                </div>
              </>
            ) : (
              <>
                <div className="text-6xl font-semibold tracking-tight text-slate-900">
                  {result ? `${aiValue}%` : "--%"}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  {tr("premiumAiDetector.right_percent_subtitle", "del texto podría estar generado por IA")}
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
                <span className="text-sm text-slate-700">{tr("premiumAiDetector.label_ai", "AI-generated")}</span>
              </div>
              <span className="text-sm text-slate-700">{result ? `${aiValue}%` : "--%"}</span>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-sm text-slate-700">{tr("premiumAiDetector.label_human", "Human-written")}</span>
              </div>
              <span className="text-sm text-slate-700">{result ? `${humanValue}%` : "--%"}</span>
            </div>

            <div className="h-px bg-slate-200" />
          </div>

          <div className="mt-auto pt-6">
            {!!result && (
              <div className="mb-3 text-[11px] leading-4 text-slate-400 text-center">
                {tr("premiumAiDetector.disclaimer", "Estimación orientativa. Puede no ser 100% precisa.")}
              </div>
            )}

            <button
              type="button"
              className="w-full h-12 rounded-full border border-emerald-500 text-emerald-600 font-semibold text-sm hover:bg-emerald-50 transition disabled:opacity-50 disabled:hover:bg-transparent"
              disabled={!result}
              onClick={handleGoHumanize}
            >
              ✨ {tr("premiumAiDetector.humanize_button", "Humanizar texto IA")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}