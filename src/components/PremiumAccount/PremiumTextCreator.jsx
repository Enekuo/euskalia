import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { FileDown, X, Copy, Trash, Check } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import ProLimitBanner from "@/components/ProAccount/ProLimitBanner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import { addLibraryDoc } from "@/proLibraryStore";
import { auth } from "@/lib/firebase";

export default function PremiumTextCreator() {
  const { t } = useTranslation();

  // ✅ evita que se muestre la clave literal si falta traducción
  const tr = (key, fallback) => {
    const val = t(key);
    return !val || val === key ? fallback : val;
  };

  // ===== Estado (Creador de texto real) =====
  const [titleValue, setTitleValue] = useState("");
  const [paragraphs, setParagraphs] = useState([""]); // mínimo 1

  // Resultado / carga / error
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Límite Premium (banner + mensaje rojo)
  const [limitType, setLimitType] = useState(""); // "" | "chars" | "daily"
  const setCharsLimit = () => setLimitType("chars");
  const setDailyLimit = () => setLimitType("daily");
  const clearLimit = () => setLimitType("");

  const limitMsg =
    limitType === "chars"
      ? tr(
          "premium_limit_chars",
          "Has superado el límite máximo de caracteres para tu plan Premium."
        )
      : limitType === "daily"
      ? tr(
          "premium_limit_daily",
          "Has alcanzado tu límite diario del plan Premium. Vuelve mañana."
        )
      : "";

  // ✅ Longitud por caracteres (SLIDER)
  const [targetChars, setTargetChars] = useState(1200);

  // Idioma de salida (EUS/ES/EN/FR)
  const [outputLang, setOutputLang] = useState("EUS");

  // Copia: flash de tic azul
  const [copiedFlash, setCopiedFlash] = useState(false);

  // Estado y timer para mensaje "Guardado en biblioteca"
  const [savedToLibrary, setSavedToLibrary] = useState(false);
  const savedTimerRef = useRef(null);

  // ===== Estilos / constantes =====
  const BLUE = "#2563eb";
  const GRAY_TEXT = "#64748b";
  const MAX_CHARS = 18000;

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  // ===== i18n (premiumTextCreator.*) =====
  const labelSources = tr("premiumTextCreator.sources_title", "Fuentes");

  const labelTitulo = tr("premiumTextCreator.title_label", "Título");
  const labelParrafo = tr("premiumTextCreator.paragraph_label", "Párrafo");
  const labelTitleOptional = tr(
    "premiumTextCreator.title_optional",
    "Escribe el título (opcional)"
  );
  const labelAddParagraph = tr("premiumTextCreator.add_paragraph", "+ Párrafo");
  const labelParagraphPh = tr("premiumTextCreator.paragraph_ph", "Escribe el párrafo");
  const labelRemoveParagraph = tr(
    "premiumTextCreator.remove_paragraph",
    "Borrar párrafo"
  );

  const labelLength = tr("premiumTextCreator.length_label", "Longitud");
  const labelLengthAria = tr("premiumTextCreator.length_aria", "Longitud en caracteres");
  const labelChars = tr("premiumTextCreator.length_chars", "caracteres");

  const labelGenerate = tr("premiumTextCreator.generate_from_sources", "Generar");
  const labelHelpRight = tr(
    "premiumTextCreator.create_help_right",
    'Rellena el título y/o los párrafos y pulsa "Generar".'
  );

  const LBL_EUS = tr("premiumTextCreator.output_language_eus", "Euskara");
  const LBL_ES = tr("premiumTextCreator.output_language_es", "Gaztelania");
  const LBL_EN = tr("premiumTextCreator.output_language_en", "Ingelesa");
  const LBL_FR = tr("premiumTextCreator.output_language_fr", "Français");

  const labelSaveText = tr("premiumTextCreator.save_button_label", "Gorde");
  const librarySavedMessage = tr(
    "premiumTextCreator.library_saved_toast",
    "Liburutegian gordeta"
  );

  const tooltipCopy = tr("premiumTextCreator.copy", "Copiar");
  const tooltipCopied = tr("premiumTextCreator.copied", "Copiado");
  const tooltipPdf = tr("premiumTextCreator.pdf", "PDF");

  // ===== Utils =====
  const clipToChars = (text, maxChars) => {
    const t2 = String(text || "")
      .replace(/\r/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim();

    if (!maxChars || maxChars <= 0) return t2;
    if (t2.length <= maxChars) return t2;

    let cut = t2.slice(0, maxChars);
    const lastSpace = cut.lastIndexOf(" ");
    if (lastSpace > 40) cut = cut.slice(0, lastSpace);
    return cut.replace(/[.,;:–—-]*$/, "") + "…";
  };

  const buildBrief = () => {
    const tTitle = (titleValue || "").trim();
    const ps = (paragraphs || [])
      .map((p) => (p || "").trim())
      .filter(Boolean);

    // brief textual, no listas visibles (solo para la IA)
    const parts = [];
    if (tTitle) parts.push(`TÍTULO: ${tTitle}`);
    if (ps.length) {
      parts.push(
        `IDEAS / PÁRRAFOS (inputs del usuario):\n${ps.map((p, i) => `${i + 1}) ${p}`).join("\n")}`
      );
    }
    return parts.join("\n\n").trim();
  };

  const hasValidInput = useMemo(() => {
    const tTitle = (titleValue || "").trim();
    const ps = (paragraphs || []).some((p) => (p || "").trim().length > 0);
    return !!tTitle || ps;
  }, [titleValue, paragraphs]);

  const clearRight = () => {
    setResult("");
    setErrorMsg("");
    clearLimit();
    setLoading(false);
    setSavedToLibrary(false);
  };

  const addParagraph = () => {
    setParagraphs((prev) => [...prev, ""]);
    clearRight();
  };

  const updateParagraph = (idx, value) => {
    setParagraphs((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const removeParagraph = (idx) => {
    setParagraphs((prev) => {
      if (prev.length <= 1) return [""];
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [""];
    });
    clearRight();
  };

  const handleCopy = async (flash = false) => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      if (flash) {
        setCopiedFlash(true);
        setTimeout(() => setCopiedFlash(false), 1200);
      }
    } catch {}
  };

  const handleDownloadPdf = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;

    const safe = (result || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const pdfTitle = (titleValue || "").trim() || tr("premiumTextCreator.pdf_title", "Texto");

    win.document.write(`
      <html>
        <head>
          <title>${pdfTitle}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; line-height: 1.55; }
            .box { max-width: 900px; margin: 0 auto; white-space: pre-wrap; }
            h1 { font-size: 20px; margin: 0 0 16px 0; }
          </style>
        </head>
        <body>
          <div class="box">
            ${titleValue ? `<h1>${(titleValue || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</h1>` : ""}
            ${safe.replace(/\n/g, "<br/>")}
          </div>
          <script>
            window.focus();
            setTimeout(() => window.print(), 200);
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const handleClearLeft = () => {
    setTitleValue("");
    setParagraphs([""]);
    clearRight();
  };

  const handleSaveText = () => {
    if (!result) return;

    const niceTitle =
      (titleValue || "").trim() ||
      result.trim().split("\n")[0].slice(0, 80).trim() ||
      tr("premiumTextCreator.library_default_title", "Texto generado");

    addLibraryDoc({
      kind: "text",
      title: niceTitle,
      content: result,
    });

    setSavedToLibrary(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSavedToLibrary(false), 2000);
  };

  const sha256Hex = async (input) => {
    try {
      const enc = new TextEncoder().encode(input);
      const digest = await crypto.subtle.digest("SHA-256", enc);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } catch {
      return null;
    }
  };

  // Atajos de teclado
  useEffect(() => {
    const onKey = (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "enter") {
        e.preventDefault();
        if (!loading) handleGenerate();
      } else if (meta && e.key.toLowerCase() === "c") {
        if (result) {
          e.preventDefault();
          handleCopy(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, result]);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  // ===== Generar (CREADOR DE TEXTO REAL) =====
  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg("");
    clearLimit();
    setSavedToLibrary(false);

    const brief = buildBrief();

    if (!hasValidInput) {
      setErrorMsg(
        tr(
          "premiumTextCreator.error_need_input",
          "Escribe un título o al menos un párrafo antes de generar."
        )
      );
      setLoading(false);
      return;
    }

    if (brief.length > MAX_CHARS) {
      setCharsLimit();
      setLoading(false);
      return;
    }

    const langInstruction =
      outputLang === "ES"
        ? "Idioma de salida: español (ISO: es). Redacta toda la respuesta en español."
        : outputLang === "EN"
        ? "Output language: English (ISO: en). Write the entire response in English."
        : outputLang === "FR"
        ? "Langue de sortie : français (ISO : fr). Rédige toute la réponse en français."
        : "Irteerako hizkuntza: euskara (ISO: eu). Idatzi erantzun osoa euskaraz.";

    const lengthRuleChars = `Longitud objetivo: aproximadamente ${targetChars} caracteres (tolerancia ±15%).`;

    const systemBase =
      "Eres un asistente que escribe textos originales y coherentes a partir de un briefing. " +
      "No resumas: crea contenido nuevo. " +
      "Respeta el sentido del briefing, mantén un tono natural y profesional. " +
      "Evita listas y viñetas salvo que el usuario las pida explícitamente. " +
      "Entrega el resultado en párrafos. No inventes datos concretos si no aparecen o no se deducen del briefing.";

    const userContent = [
      "Quiero que redactes un texto completo basándote en este briefing.",
      brief ? `\nBRIEFING:\n${brief}` : "",
      `\nREQUISITO DE LONGITUD: ${lengthRuleChars}`,
      `\n${langInstruction}`,
    ].join("");

    const messages = [
      { role: "system", content: systemBase },
      { role: "user", content: userContent },
    ];

    const cacheBase = JSON.stringify({
      titleValue,
      paragraphs,
      outputLang,
      targetChars,
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error(
          tr(
            "premiumTextCreator.error_auth_required",
            "Necesitas iniciar sesión para usar Premium."
          )
        );
      }

      const idToken = await user.getIdToken();

      const res = await fetch("/api/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          messages,
          length: "text_creator", // etiqueta interna (no rompe tu backend si lo ignora)
          cacheKey,
          targetChars,
        }),
      });

      if (!res.ok) {
        if (res.status === 413) {
          setCharsLimit();
          setLoading(false);
          return;
        }

        if (res.status === 401 || res.status === 403) {
          setLoading(false);
          throw new Error(
            tr(
              "premiumTextCreator.error_auth_required",
              "Necesitas iniciar sesión para usar Premium."
            )
          );
        }

        if (res.status === 429) {
          let data = null;
          try {
            data = await res.json();
          } catch {
            data = null;
          }

          const limit = data?.limit || {};
          const isChars = typeof limit?.max_chars === "number";
          const isDaily = typeof limit?.daily_requests === "number";

          if (isChars) setCharsLimit();
          else if (isDaily) setDailyLimit();
          else setDailyLimit();

          setLoading(false);
          return;
        }

        const txt = await res.text().catch(() => "");
        setLoading(false);
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();

      const rawText =
        data?.text ??
        data?.content ??
        data?.choices?.[0]?.message?.content ??
        data?.message?.content ??
        "";

      if (!rawText) {
        throw new Error(
          tr("premiumTextCreator.error_no_text", "No se recibió texto de la API.")
        );
      }

      const cleaned = String(rawText || "")
        .replace(/\r/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/[ \t]{2,}/g, " ")
        .trim();

      const clipped = clipToChars(cleaned, targetChars);

      setResult(clipped);
    } catch (err) {
      setErrorMsg(
        err.message ||
          tr("premiumTextCreator.error_generic", "Error generando el texto.")
      );
    } finally {
      setLoading(false);
    }
  };

  const canClearLeft =
    (titleValue || "").trim().length > 0 ||
    (paragraphs || []).some((p) => (p || "").trim().length > 0);

  return (
    <>
      <section className="w-full bg-[#F4F8FF] pt-4 pb-16">
        <div className="max-w-7xl mx-auto w-full px-6">
          <motion.section
            className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-6"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            {/* ===== Panel Izquierdo ===== */}
            <aside className="h-[600px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
                <div className="text-sm font-medium text-slate-700">{labelSources}</div>
              </div>

              <div className="p-4 flex flex-col gap-4">
                {/* Titulo */}
                <div className="flex flex-col gap-2">
                  <div className="text-[14px] font-medium text-slate-800">{labelTitulo}</div>
                  <input
                    value={titleValue}
                    onChange={(e) => {
                      setTitleValue(e.target.value);
                      clearRight();
                    }}
                    placeholder={labelTitleOptional}
                    className="w-full h-[44px] rounded-xl border border-slate-300 bg-white px-4 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-400/40"
                  />
                </div>

                {/* Parrafo + botón + Párrafo */}
                <div className="flex items-center justify-between">
                  <div className="text-[14px] font-medium text-slate-800">{labelParrafo}</div>
                  <button
                    type="button"
                    onClick={addParagraph}
                    className="text-[14px] font-medium text-slate-700 hover:text-slate-900"
                  >
                    {labelAddParagraph}
                  </button>
                </div>

                {/* Párrafos con borrar */}
                <div className="flex flex-col gap-3">
                  {paragraphs.map((p, idx) => (
                    <div key={idx} className="relative">
                      <textarea
                        value={p}
                        onChange={(e) => {
                          updateParagraph(idx, e.target.value);
                          clearRight();
                        }}
                        placeholder={labelParagraphPh}
                        className="w-full h-[88px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-400/40"
                      />
                      <button
                        type="button"
                        onClick={() => removeParagraph(idx)}
                        aria-label={labelRemoveParagraph}
                        title={labelRemoveParagraph}
                        className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabla vacía (se queda igual) */}
              <div className="flex-1 min-h-0 overflow-hidden" />
            </aside>

            {/* ===== Panel Derecho ===== */}
            <section className="relative h-[600px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
              <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
                {/* Slider */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                    {labelLength}
                  </span>

                  <input
                    type="range"
                    min={300}
                    max={20000}
                    step={100}
                    value={targetChars}
                    onChange={(e) => {
                      setTargetChars(Number(e.target.value));
                      clearRight();
                    }}
                    className="w-[220px]"
                    aria-label={labelLengthAria}
                  />

                  <span className="text-sm text-slate-700 tabular-nums w-[125px] text-right">
                    {targetChars.toLocaleString("es-ES")} {labelChars}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Idioma */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                        aria-label={tr(
                          "premiumTextCreator.output_language_aria",
                          "Idioma de salida"
                        )}
                      >
                        <span className="truncate">
                          {outputLang === "ES"
                            ? LBL_ES
                            : outputLang === "EN"
                            ? LBL_EN
                            : outputLang === "FR"
                            ? LBL_FR
                            : LBL_EUS}
                        </span>
                        <svg
                          className="w-4 h-4 text-slate-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                        </svg>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="rounded-xl border border-slate-200 shadow-lg bg-white p-1 w-[200px]"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          if (outputLang !== "EUS") {
                            setOutputLang("EUS");
                            clearRight();
                          }
                        }}
                        className="cursor-pointer rounded-lg text-[14px] px-3 py-2"
                      >
                        {LBL_EUS}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          if (outputLang !== "ES") {
                            setOutputLang("ES");
                            clearRight();
                          }
                        }}
                        className="cursor-pointer rounded-lg text-[14px] px-3 py-2"
                      >
                        {LBL_ES}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          if (outputLang !== "EN") {
                            setOutputLang("EN");
                            clearRight();
                          }
                        }}
                        className="cursor-pointer rounded-lg text-[14px] px-3 py-2"
                      >
                        {LBL_EN}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          if (outputLang !== "FR") {
                            setOutputLang("FR");
                            clearRight();
                          }
                        }}
                        className="cursor-pointer rounded-lg text-[14px] px-3 py-2"
                      >
                        {LBL_FR}
                      </DropdownMenuItem>
                      <DropdownMenuArrow className="fill-white" />
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Copy arriba */}
                  <button
                    type="button"
                    onClick={() => handleCopy(true)}
                    title={copiedFlash ? tooltipCopied : tooltipCopy}
                    className={`h-9 w-9 flex items-center justify-center ${
                      result
                        ? "text-slate-600 hover:text-slate-800"
                        : "text-slate-300 cursor-not-allowed"
                    }`}
                    aria-label={copiedFlash ? tooltipCopied : tooltipCopy}
                    disabled={!result}
                  >
                    {copiedFlash ? (
                      <Check className="w-4 h-4" style={{ color: BLUE }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Clear izquierda */}
                  <button
                    type="button"
                    onClick={handleClearLeft}
                    title={tr("premiumTextCreator.clear_input", "Eliminar")}
                    className={`h-9 w-9 flex items-center justify-center ${
                      canClearLeft
                        ? "text-slate-600 hover:text-slate-800"
                        : "text-slate-300 cursor-not-allowed"
                    }`}
                    aria-label={tr("premiumTextCreator.clear_input", "Eliminar")}
                    disabled={!canClearLeft}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Banner Premium */}
              {limitType && (
                <div className="px-6 pt-4">
                  <ProLimitBanner visible={!!limitType} message={limitMsg} />
                </div>
              )}

              {/* Estado inicial */}
              {!loading && !result && !errorMsg && !limitType && (
                <>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 z-10"
                    style={{ top: "30%" }}
                  >
                    <Button
                      type="button"
                      onClick={handleGenerate}
                      disabled={loading || !hasValidInput}
                      className="h-10 md:h-11 w-[220px] md:w-[240px] rounded-full text-[14px] md:text-[15px] font-medium shadow-sm flex items-center justify-center hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
                    >
                      {labelGenerate}
                    </Button>
                  </div>

                  <div
                    className="absolute left-1/2 -translate-x-1/2 text-center px-6"
                    style={{ top: "40%" }}
                  >
                    <p className="text-sm leading-6 text-slate-600 max-w-xl">
                      {labelHelpRight}
                    </p>
                  </div>
                </>
              )}

              {/* Resultado / errores / loader */}
              <div className="w-full">
                {(result || errorMsg || loading) && (
                  <div className="px-6 pt-12 pb-[110px] max-w-3xl mx-auto">
                    {errorMsg && (
                      <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                        {errorMsg}
                      </div>
                    )}

                    {result && (
                      <>
                         <div className="mt-8 max-h-[360px] overflow-y-auto pr-2">
                         <article className="prose prose-slate max-w-none">
                         <p className="whitespace-pre-wrap">{result}</p>
                         </article>
                        </div>

                        {/* Toast + controles abajo derecha */}
                        {savedToLibrary && (
                          <p className="absolute bottom-[84px] right-6 text-xs text-emerald-600">
                            {librarySavedMessage}
                          </p>
                        )}

                        <div className="absolute bottom-4 right-6 flex items-center gap-4">
                          <div className="flex items-center gap-4 mr-[20px] translate-y-1">
                            <button
                              type="button"
                              onClick={() => handleCopy(true)}
                              aria-label={copiedFlash ? tooltipCopied : tooltipCopy}
                              className="group relative inline-flex items-center justify-center text-slate-500 hover:text-slate-700 p-2 rounded-md hover:bg-slate-100"
                            >
                              {copiedFlash ? (
                                <Check className="w-5 h-5" style={{ color: BLUE }} />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                              <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                                {copiedFlash ? tooltipCopied : tooltipCopy}
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={handleDownloadPdf}
                              aria-label={tooltipPdf}
                              className="group relative inline-flex items-center justify-center text-slate-500 hover:text-slate-700 p-2 rounded-md hover:bg-slate-100"
                            >
                              <FileDown className="w-5 h-5" />
                              <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                                {tooltipPdf}
                              </span>
                            </button>
                          </div>

                          <motion.button
                            type="button"
                            onClick={handleSaveText}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="inline-flex items-center justify-center rounded-full px-6 h-9 text-sm font-semibold text-white hover:brightness-95 active:scale-[0.98] transition-all"
                            style={{ backgroundColor: "#22c55e" }}
                          >
                            {labelSaveText}
                          </motion.button>
                        </div>
                      </>
                    )}

                    {loading && !result && (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-slate-200 rounded" />
                        <div className="h-4 bg-slate-200 rounded w-11/12" />
                        <div className="h-4 bg-slate-200 rounded w-10/12" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </motion.section>
        </div>
      </section>
    </>
  );
}