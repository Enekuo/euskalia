import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { FileText, Share2, File as FileIcon, Link2 as UrlIcon, Plus, X, Copy, Trash, Check, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpgradeBanner from "@/components/UpgradeBanner";
import DetectedLanguageBanner from "@/components/DetectedLanguageBanner";
import ToolsSidebar from "@/components/ToolsSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/lib/translations";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Parafraseador() {
  const { t } = useTranslation();
  const tr = (key, fallback = "") => t(key) || fallback;

  const MAX_CHARS = 8000;

const [limitType, setLimitType] = useState("");

const setCharsLimit = () => {
  setLimitType("chars");
};

const setDailyLimit = () => {
  setLimitType("daily");
};

const clearLimit = () => {
  setLimitType("");
};

const limitMsg =
  limitType === "chars"
    ? tr(
        "paraphraser_limit_reached",
        `Límite máximo: ${MAX_CHARS.toLocaleString()} caracteres.`
      ).replace("{{count}}", MAX_CHARS.toLocaleString())
    : limitType === "daily"
    ? tr(
        "paraphraser_daily_limit_reached",
        "Has superado el límite diario de solicitudes del parafraseador."
      )
    : "";

  const [sourceMode, setSourceMode] = useState("text");
  const [textValue, setTextValue] = useState("");

const [result, setResult] = useState("");
const [detectedLanguage, setDetectedLanguage] = useState(null);
const [loading, setLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState("");
const [errorKind, setErrorKind] = useState(null);
const [dailyLimitReached, setDailyLimitReached] = useState(false);

  const [mode, setMode] = useState("neutral");
  const [outputLang, setOutputLang] = useState("eus");

  const [documents, setDocuments] = useState([]);
  const [documentsText, setDocumentsText] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [urlsTextarea, setUrlsTextarea] = useState("");
  const [urlItems, setUrlItems] = useState([]);

  const [copiedFlash, setCopiedFlash] = useState(false);

  const BLUE = "#2563eb";
  const GRAY_TEXT = "#64748b";
  const GRAY_ICON = "#94a3b8";
  const DIVIDER = "#e5e7eb";
  

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  const labelSources = tr("paraphraser_sources_title", "Fuentes");
  const labelTabText = tr("paraphraser_tab_text", "Texto");
  const labelTabDocument = tr("paraphraser_tab_document", "Documento");
  const labelTabUrl = tr("paraphraser_tab_url", "URL");
  const labelEnterText = tr("paraphraser_enter_text_placeholder", "Escribe o pega tu texto aquí…");

  const labelChooseFileTitle = tr("paraphraser_pick_file_title", "Elige tu archivo o carpeta");
  const labelAcceptedFormats = tr(
    "paraphraser_accepted_formats",
    "Puedes añadir archivos PDF, texto copiado, enlaces web…"
  );
  const labelFolderHint = tr("paraphraser_folder_hint", "Aquí aparecerán tus textos o documentos subidos.");

  const labelPasteUrls = tr("paraphraser_paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("paraphraser_add_urls_button", "Añadir URLs");
  const labelSaveUrls = tr("paraphraser_save_urls_button", "Guardar");
  const labelCancel = tr("paraphraser_cancel_button", "Cancelar");
  const labelUrlsNoteVisible = tr(
    "paraphraser_urls_note_visible",
    "Solo se importará el texto visible del sitio web."
  );
  const labelUrlsNotePaywalled = tr("paraphraser_urls_note_paywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("paraphraser_remove_button", "Quitar");

  const LBL_EUS = tr("summary.output_language_eus", "Euskara");
  const LBL_ES = tr("summary.output_language_es", "Gaztelania");
  const LBL_EN = tr("summary.output_language_en", "Ingelesa");
  const LBL_FR = tr("summary.output_language_fr", "Français");

  const labelGenerateFromSources = tr("paraphraser_generate_button", "Crear parafraseo");
  const labelHelpRight = tr(
    "paraphraser_help_right",
    'Selecciona una fuente (texto, documentos o URLs) y pulsa "Crear parafraseo".'
  );

  const ariaCopyResult = tr("paraphraser_copy_result_aria", "Copiar resultado");
  const ariaDeleteInput = tr("paraphraser_delete_input_aria", "Eliminar texto de entrada y resultado");
  const titleCopyResult = tr("paraphraser_copy_result_title", "Copiar resultado");
  const titleDeleteInput = tr("paraphraser_delete_input_title", "Eliminar texto de entrada y resultado");

  const labelUrlTextareaPlaceholder = tr(
    "paraphraser_urls_textarea_placeholder",
    "Introduce aquí una o más URLs (separadas por línea)"
  );

  const labelDownload = tr("paraphraser_download", "Descargar");
  const labelCopy = tr("paraphraser_copy", "Copiar");
  const labelCopied = tr("paraphraser_copied", "Copiado");

  const leftTitle = tr("paraphraser_left_title", "Aquí aparecerán tus textos o documentos subidos.");
  const leftBody = tr("paraphraser_left_body", "Puedes añadir archivos PDF, texto copiado, enlaces web…");

  const TabBtn = ({ active, icon: Icon, label, onClick, showDivider }) => (
    <div className="relative flex-1 min-w-0 flex items-stretch">
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex w-full items-center gap-2 h-[44px] px-3 text-[14px] font-medium justify-start"
        style={{ color: active ? BLUE : GRAY_TEXT }}
        aria-pressed={active}
        aria-label={label}
      >
        <Icon className="w-[18px] h-[18px] shrink-0" style={{ color: active ? BLUE : GRAY_ICON }} />
        <span className="truncate">{label}</span>
        {active && (
          <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: BLUE }} />
        )}
      </button>

      {showDivider && (
        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{ width: 1, height: 22, backgroundColor: DIVIDER }}
        />
      )}
    </div>
  );

  const ModeTab = ({ active, label, onClick, showDivider }) => (
    <div className="relative flex items-stretch">
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex items-center h-[36px] px-2 text-[13px] font-medium"
        style={{ color: active ? BLUE : GRAY_TEXT }}
        aria-pressed={active}
        aria-label={label}
      >
        <span className="truncate">{label}</span>
        {active && (
          <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: BLUE }} />
        )}
      </button>
      {showDivider && <span aria-hidden className="self-center" style={{ width: 1, height: 18, backgroundColor: DIVIDER }} />}
    </div>
  );

  const modeLabels = {
    neutral: tr("paraphraser_mode_neutral", "Neutral"),
    formal: tr("paraphraser_mode_formal", "Formal"),
    informal: tr("paraphraser_mode_informal", "Informal"),
    professional: tr("paraphraser_mode_professional", "Profesional"),
    academic: tr("paraphraser_mode_academic", "Académico"),
    fluent: tr("paraphraser_mode_fluent", "Fluido"),
    creative: tr("paraphraser_mode_creative", "Creativo"),
  };

  const parseUrlsFromText = (text) => {
    const raw = text
      .split(/[\s\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const valid = [];
    for (const u of raw) {
      try {
        const url = new URL(u);
        valid.push({ href: url.href, host: url.host });
      } catch {}
    }
    const seen = new Set();
    return valid.filter((v) => (seen.has(v.href) ? false : (seen.add(v.href), true)));
  };

  const clearRight = () => {
    setResult("");
  setDetectedLanguage(null);
  setErrorMsg("");
  setErrorKind(null);
  setDailyLimitReached(false);
  setLoading(false);
  setCopiedFlash(false);
  };

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
      } else if (e.key === "Escape") {
        if (urlInputOpen) setUrlInputOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, result, urlInputOpen]);
 

  const readTextFromFiles = async (items) => {
    const results = await Promise.all(
      items.map(
        ({ id, file }) =>
          new Promise((resolve) => {
            const name = file?.name || "";
            const lower = name.toLowerCase();
            const isTxt = lower.endsWith(".txt");
            const isMd = lower.endsWith(".md");
            if (!isTxt && !isMd) return resolve(null);

            const fr = new FileReader();
            fr.onload = () => resolve({ id, name, text: String(fr.result || "") });
            fr.onerror = () => resolve(null);
            fr.readAsText(file, "utf-8");
          })
      )
    );
    return results.filter(Boolean);
  };

  const triggerPick = () => fileInputRef.current?.click();

  const addFiles = async (list) => {
    if (!list?.length) return;

    const arr = Array.from(list);
    const withIds = arr.map((file) => ({ id: crypto.randomUUID(), file }));

    setDocuments((prev) => [...prev, ...withIds]);

    const texts = await readTextFromFiles(withIds);
    if (texts.length) setDocumentsText((prev) => [...prev, ...texts]);

    clearRight();
  };

  const onFiles = async (e) => {
    await addFiles(e.target.files);
    e.target.value = "";
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dt = e.dataTransfer;
    if (dt?.files?.length) await addFiles(dt.files);
  };

  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setDocumentsText((prev) => prev.filter((d) => d.id !== id));
    clearRight();
  };

  const addUrlsFromTextarea = () => {
    const parsed = parseUrlsFromText(urlsTextarea);
    if (!parsed.length) return;
    const newItems = parsed.map((p) => ({
      id: crypto.randomUUID(),
      url: p.href,
      host: p.host,
    }));
    setUrlItems((prev) => [...prev, ...newItems]);
    setUrlsTextarea("");
    setUrlInputOpen(false);
    clearRight();
  };

  const removeUrl = (id) => {
    setUrlItems((prev) => prev.filter((u) => u.id !== id));
    clearRight();
  };

  const textIsValid = useMemo(() => {
    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    return trimmed.length >= 20 && words.length >= 5;
  }, [textValue]);

  const hasValidInput = textIsValid || urlItems.length > 0 || documents.length > 0;

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

    const handleShare = async () => {
  if (!result) return;

  try {
    await navigator.share({
      text: result,
    });
  } catch (err) {
    console.error(err);
  }
};

  const handleClearLeft = () => {
    if (!(sourceMode === "text" && textValue)) return;
    setTextValue("");
    clearRight();
  };

  const handleDownload = () => {
    if (!result) return;
    try {
      const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "euskalia-parafraseo.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {}
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

  const handleGenerate = async () => {
setLoading(true);
setErrorMsg("");
setResult("");
setDetectedLanguage(null);
setErrorKind(null);
setDailyLimitReached(false);
setCopiedFlash(false);

    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const textOk = trimmed.length >= 20 && words.length >= 5;
    const validNow = textOk || urlItems.length > 0 || documentsText.length > 0;

    if ((textValue || "").length > MAX_CHARS) {
      setCharsLimit();
      setLoading(false);
      return;
    }

    if (!validNow) {
      setErrorMsg(
        tr(
          "paraphraser_error_need_input",
          "Añade texto suficiente, URLs o documentos antes de crear el parafraseo."
        )
      );
      setLoading(false);
      return;
    }

    const urlsList = urlItems.map((u) => u.url).join("\n");

    const docsInline = documentsText?.length
      ? "\nDOCUMENTOS (texto extraído):\n" +
        documentsText
          .map((d) => `--- ${d.name} ---\n${(d.text || "").slice(0, 12000)}`)
          .join("\n\n")
      : "";

const langInstruction =
  "Detecta automáticamente el idioma principal del contenido de entrada y responde SIEMPRE en ese mismo idioma. No traduzcas el contenido a otro idioma distinto al de la fuente.";

    const modeRule =
      mode === "neutral"
        ? `
MODO NEUTRAL:
- Reescribe de forma natural y correcta.
- Mantén el tono y el nivel del original.
- Cambia palabras y orden lo justo.
- No simplifiques, no embellezcas, no hagas más formal ni más informal.
`.trim()
        : mode === "formal"
        ? `
MODO FORMAL:
- Usa un tono formal y elegante.
- Mantén claridad y naturalidad.
- Utiliza vocabulario más refinado y estructurado.
- Evita expresiones coloquiales.
`.trim()
        : mode === "informal"
        ? `
MODO INFORMAL:
- Tono cercano y conversacional.
- Frases más cortas.
- Vocabulario cotidiano, sin sonar infantil.
- Evita estructuras formales o académicas.
`.trim()
        : mode === "professional"
        ? `
MODO PROFESIONAL:
- Tono formal y profesional, claro y práctico.
- Directo, sin adornos emocionales.
- Léxico neutro de trabajo.
- Estructura ordenada y precisa.
`.trim()
        : mode === "academic"
        ? `
MODO ACADÉMICO:
- Tono riguroso y formal.
- Vocabulario más técnico.
- Frases más elaboradas sin perder claridad.
- Apto para contexto educativo o académico.
`.trim()
        : mode === "fluent"
        ? `
MODO FLUIDO:
- Prioriza que el texto se lea de forma continua y agradable.
- Reordena para mejorar el flujo sin cambiar el significado.
- Elimina repeticiones.
- Añade transiciones suaves si encajan.
`.trim()
        : `
MODO CREATIVO:
- Mayor libertad estilística manteniendo el significado.
- Varía estructura, ritmo y forma.
- Haz el texto más expresivo sin inventar hechos.
`.trim();

    const userContent = [
      "Parafrasea el contenido manteniendo el significado original.",
      textValue ? `\nTEXTO:\n${textValue}` : "",
      urlsList ? `\nURLs:\n${urlsList}` : "",
      docsInline,
      `\n${modeRule}`,
      "\nNo inventes datos. No expliques el proceso. Devuelve solo el texto final.",
      `\n${langInstruction}`,
    ].join("");

const systemBase =
  "Eres Euskalia, un asistente experto en reescritura y parafraseo. " +
  "Tu prioridad es producir textos naturales, claros y correctos. " +
  "Detecta automáticamente el idioma principal del contenido de entrada y responde SIEMPRE en ese mismo idioma. " +
  "No traduzcas el contenido a otro idioma distinto al de la fuente. " +
  "Si el idioma detectado es euskera, escribe en euskera natural, evitando calcos del castellano y estructuras artificiales.";

    const messages = [
      { role: "system", content: systemBase },
      { role: "user", content: userContent },
    ];

    const cacheBase = JSON.stringify({
      textValue,
      urls: urlItems.map((u) => u.url),
      docNames: documents.map((d) => d.file?.name).filter(Boolean).join(", "),
      mode,
      outputLang,
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const res = await fetch("/api/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: "paraphrase",
          mode: "paraphrase",
          paraphraseMode: mode,
          outputLang,
          cacheKey,
          documentsText,
          messages,
          model: "gpt-5.1",
          temperature: 0.35,
          bannerDetectionText: textValue,
          uiLanguage: "ES",
        }),
      });

      if (res.status === 429) {
        let data = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        const limit = data?.limit || {};
        const isChars = typeof limit?.max_chars === "number";
        const isDaily =
          typeof limit?.daily_requests === "number" ||
          String(data?.error || "").toLowerCase().includes("daily");

        if (isChars) setCharsLimit();
        else if (isDaily) setDailyLimit();
        else setDailyLimit();


        setLoading(false);
        return;
      }

      if (!res.ok) {
        if (res.status === 413) {
          setCharsLimit();
          setLoading(false);
          return;
        }
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();

      const apiDetectedLanguage =
  data?.detectedLanguage && typeof data.detectedLanguage === "object"
    ? data.detectedLanguage
    : null;

setDetectedLanguage(apiDetectedLanguage);


      const rawText =
        data?.text ??
        data?.content ??
        data?.choices?.[0]?.message?.content ??
        data?.message?.content ??
        "";

      if (!rawText) throw new Error(tr("paraphraser_error_no_text", "No se recibió texto de la API."));

      const cleaned = String(rawText || "")
        .replace(/\r/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
 
      setResult(cleaned);
    } catch (err) {
      setErrorMsg(err.message || tr("paraphraser_error_generic", "Error creando el parafraseo."));
    } finally {
      setLoading(false);
    }
  };

  const charCount = (textValue || "").length;
  const pct = Math.min(100, Math.round((charCount / MAX_CHARS) * 100));
  const nearLimit = charCount >= MAX_CHARS * 0.9 && charCount < MAX_CHARS;
  const overLimit = charCount > MAX_CHARS;

  const barClass = overLimit ? "bg-red-500" : nearLimit ? "bg-amber-500" : "bg-sky-500";

    const normalizeLangCode = (code) => {
  const c = String(code || "").toLowerCase();

  if (c === "eu" || c === "eus" || c === "basque") return "EUS";
  if (c === "es" || c === "spa" || c === "spanish") return "ES";
  if (c === "en" || c === "eng" || c === "english") return "EN";
  if (c === "fr" || c === "fra" || c === "fre" || c === "french") return "FR";

  return c.toUpperCase();
};

const detectedCodeNormalized = normalizeLangCode(detectedLanguage?.code);
const selectedCodeNormalized = normalizeLangCode(outputLang);

const shouldShowBanner =
  detectedCodeNormalized &&
  selectedCodeNormalized &&
  detectedCodeNormalized !== selectedCodeNormalized;


return (
  <>

<h1 className="sr-only">
  Parafraseador de textos en euskera con IA
</h1>

    <section className="w-full bg-[#F4F8FF] pt-10 pb-24">
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="relative flex items-start gap-3 md:gap-4">
          <ToolsSidebar />
          <div className="flex-1 min-w-0">

          <motion.section
            className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <aside className="h-[550px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
                <div className="text-sm font-medium text-slate-700">{labelSources}</div>
              </div>

              <div className="flex items-center px-2 border-b" style={{ borderColor: DIVIDER }}>
                <TabBtn
                  active={sourceMode === "text"}
                  icon={FileText}
                  label={labelTabText}
                  onClick={() => {
                    setSourceMode("text");
                    clearRight();
                  }}
                  showDivider
                />
              </div>

              <div className="flex-1 overflow-hidden p-3">
                {!sourceMode && (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center px-2">
                      <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-slate-200/70 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-slate-500" />
                      </div>
                      <p className="text-[15px] font-semibold text-slate-600">{leftTitle}</p>
                      {leftBody && <p className="mt-1 text-[13px] leading-6 text-slate-500">{leftBody}</p>}
                    </div>
                  </div>
                )}

                {sourceMode === "text" && (
                  <div className="flex flex-col h-full">
                    <textarea
                      value={textValue}
                      onChange={(e) => {
                        setTextValue(e.target.value);
                        if (errorMsg) setErrorMsg("");
                        if (limitType) clearLimit();
                      }}
                      placeholder={labelEnterText}
                      className="w-full flex-1 resize-none outline-none text-[15px] leading-6 bg-transparent placeholder:text-slate-400 text-slate-800"
                      aria-label={labelTabText}
                    />

                    <div className="mt-2">
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-1 ${barClass}`} style={{ width: `${pct}%` }} />
                      </div>

                      <div className="mt-1 flex items-center justify-between">
                        <div className="text-xs" />

                        <span className={`text-xs ${overLimit ? "text-red-600" : nearLimit ? "text-amber-600" : "text-slate-500"}`}>
                          {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {sourceMode === "document" && (
                  <div
                    className={`h-full w-full flex flex-col relative min-h-0 ${
                      dragActive ? "ring-2 ring-sky-400 rounded-2xl" : ""
                    }`}
                    onDragEnter={onDragEnter}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      multiple
                      accept=".txt,.md"
                      onChange={onFiles}
                    />

                    <button
                      type="button"
                      onClick={triggerPick}
                      className="w-full rounded-2xl border border-dashed border-slate-300 bg-white/40 hover:bg-slate-50 transition px-6 py-10 text-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                      aria-label={labelChooseFileTitle}
                      title={labelChooseFileTitle}
                    >
                      <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                        <Plus className="w-10 h-10 text-sky-600" />
                      </div>
                      <div className="text-xl font-semibold text-slate-800">{labelChooseFileTitle}</div>
                      <div className="mt-4 text-sm text-slate-500">{labelAcceptedFormats}</div>
                      <div className="mt-1 text-xs text-slate-400">{labelFolderHint}</div>
                    </button>

                    {documents.length > 0 && (
                      <div className="mt-4 flex-1 min-h-0 overflow-y-auto pr-1">
                        <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 overflow-hidden bg-white">
                          {documents.map(({ id, file }) => (
                            <li key={id} className="flex items-center justify-between gap-3 px-3 py-2 bg-white">
                              <div className="min-w-0 flex items-center gap-3 flex-1">
                                <div className="shrink-0 w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center">
                                  <FileIcon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-sm font-medium block truncate">{file.name}</span>
                                  <span className="text-xs text-slate-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => removeDocument(id)}
                                className="shrink-0 p-1.5 rounded-md hover:bg-slate-100"
                                title={labelRemove}
                                aria-label={labelRemove}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {sourceMode === "url" && (
                  <div className="h-full w-full flex flex-col">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                        <UrlIcon className="w-4 h-4" />
                        {labelPasteUrls}
                      </div>
                      <button
                        type="button"
                        onClick={() => setUrlInputOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40 shadow-sm transition-colors"
                        aria-label={labelAddUrl}
                        title={labelAddUrl}
                      >
                        <Plus className="w-4 h-4 text-sky-500" />
                        {labelAddUrl}
                      </button>
                    </div>

                    {urlInputOpen && (
                      <div className="mb-4 rounded-xl border border-slate-300 p-3 bg-white">
                        <textarea
                          value={urlsTextarea}
                          onChange={(e) => setUrlsTextarea(e.target.value)}
                          placeholder={labelUrlTextareaPlaceholder}
                          className="w-full min-h-[140px] rounded-md border border-slate-200 bg-transparent p-2 outline-none text-[15px] leading-6 placeholder:text-slate-400"
                          aria-label={labelPasteUrls}
                        />
                        <div className="mt-2 flex items-center gap-2">
                          <Button type="button" onClick={addUrlsFromTextarea} className="h-9">
                            {labelSaveUrls}
                          </Button>
                          <button
                            type="button"
                            onClick={() => {
                              setUrlsTextarea("");
                              setUrlInputOpen(false);
                            }}
                            className="h-9 px-3 rounded-md border border-slate-300 hover:bg-slate-50 text-sm"
                          >
                            {labelCancel}
                          </button>
                        </div>
                        <div className="mt-6 text-xs text-slate-500">
                          • {labelUrlsNoteVisible}
                          <br />• {labelUrlsNotePaywalled}
                        </div>
                      </div>
                    )}

                    {urlItems.length > 0 && (
                      <ul className="flex-1 overflow-y-auto overflow-x-hidden divide-y divide-slate-200 rounded-xl border border-slate-200">
                        {urlItems.map(({ id, url, host }) => (
                          <li key={id} className="flex items-center justify-between gap-3 px-3 py-2">
                            <div className="min-w-0 flex items-center gap-3 flex-1">
                              <div className="shrink-0 w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center">
                                <UrlIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm font-medium block truncate text-sky-600 hover:underline"
                                  title={url}
                                >
                                  {host} — {url}
                                </a>
                              </div>
                            </div>
                            <button
                              onClick={() => removeUrl(id)}
                              className="shrink-0 p-1.5 rounded-md hover:bg-slate-100"
                              title={labelRemove}
                              aria-label={labelRemove}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </aside>

            <section className="relative h-[550px] pb-[100px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
              <div className="min-h-[44px] sm:h-11 flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-3 sm:px-4 py-2 sm:py-0 gap-3 border-b border-slate-200 bg-slate-50/60">
                <div className="flex items-center gap-0 w-full md:w-auto max-w-full overflow-x-auto md:overflow-visible overflow-y-hidden whitespace-nowrap pb-1 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <ModeTab active={mode === "neutral"} label={modeLabels.neutral} onClick={() => setMode("neutral")} showDivider />
                  <ModeTab active={mode === "formal"} label={modeLabels.formal} onClick={() => setMode("formal")} showDivider />
                  <ModeTab active={mode === "informal"} label={modeLabels.informal} onClick={() => setMode("informal")} showDivider />
                  <ModeTab active={mode === "professional"} label={modeLabels.professional} onClick={() => setMode("professional")} showDivider />
                  <ModeTab active={mode === "academic"} label={modeLabels.academic} onClick={() => setMode("academic")} showDivider />
                  <ModeTab active={mode === "fluent"} label={modeLabels.fluent} onClick={() => setMode("fluent")} showDivider />
                  <ModeTab active={mode === "creative"} label={modeLabels.creative} onClick={() => setMode("creative")} />
                </div>

                <div className="flex items-center justify-center gap-1 w-full sm:w-auto shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                        aria-label={tr("paraphraser_output_language_aria", "Idioma de salida")}
                      >
                        <span className="truncate">
                          {outputLang === "es" ? LBL_ES : outputLang === "en" ? LBL_EN : outputLang === "fr" ? LBL_FR : LBL_EUS}
                        </span>
                        <svg className="w-4 h-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                        </svg>
                      </button>
                    </DropdownMenuTrigger>


                  <DropdownMenuContent align="end" className="rounded-xl border border-slate-200 shadow-lg bg-white p-1 w-[200px]">
  <DropdownMenuItem onClick={() => setOutputLang("eus")} className="cursor-pointer rounded-lg text-[14px] px-3 py-2">
    {LBL_EUS}
  </DropdownMenuItem>

  <DropdownMenuItem onClick={() => setOutputLang("es")} className="cursor-pointer rounded-lg text-[14px] px-3 py-2">
    {LBL_ES}
  </DropdownMenuItem>

  <DropdownMenuItem onClick={() => setOutputLang("en")} className="cursor-pointer rounded-lg text-[14px] px-3 py-2">
    {LBL_EN}
  </DropdownMenuItem>

  <DropdownMenuItem onClick={() => setOutputLang("fr")} className="cursor-pointer rounded-lg text-[14px] px-3 py-2">
    {LBL_FR}
  </DropdownMenuItem>

  <DropdownMenuArrow className="fill-white" />
</DropdownMenuContent>
                  </DropdownMenu>

<button
  type="button"
  onClick={() => handleCopy(true)}
  title={
    copiedFlash
      ? tr("paraphraser_copied", "Copiado")
      : tr("paraphraser_copy", "Copiar")
  }
  className={`ml-4 h-9 w-9 flex items-center justify-center ${
    result
      ? "text-slate-600 hover:text-slate-800"
      : "text-slate-300 cursor-not-allowed"
  }`}
  aria-label={
    copiedFlash
      ? tr("paraphraser_copied", "Copiado")
      : tr("paraphraser_copy", "Copiar")
  }
  disabled={!result}
>
  {copiedFlash ? (
    <Check className="w-5 h-5" style={{ color: BLUE }} />
  ) : (
    <Copy className="w-5 h-5" />
  )}
</button>

<button
  type="button"
  onClick={handleClearLeft}
  title={tr("paraphraser_clear_input", "Eliminar")}
  className={`h-9 w-9 flex items-center justify-center ${
    sourceMode === "text" && textValue
      ? "text-slate-600 hover:text-slate-800"
      : "text-slate-300 cursor-not-allowed"
  }`}
  aria-label={tr("paraphraser_clear_input", "Eliminar")}
  disabled={!(sourceMode === "text" && textValue)}
>
  <Trash className="w-5 h-5" />
</button>

                </div>
              </div>

              {!!limitType && !loading && !result && !errorMsg ? (
                <div className="h-full w-full relative flex items-center justify-center px-6">
                  <div className="w-full max-w-3xl space-y-3">
                    <UpgradeBanner to="/soporte" />
                  </div>

<div className="absolute left-6 right-6 bottom-20 z-10">
  <div className="text-sm text-red-600 text-center max-w-xl mx-auto">
    {limitMsg}
  </div>
</div>
</div>
) : (
  <>
    {!loading && !result && !errorMsg && (
      <>
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: "30%" }}>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !hasValidInput}
            className="h-10 md:h-11 w-[220px] md:w-[240px] rounded-full text-[14px] md:text-[15px] font-medium shadow-sm flex items-center justify-center hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: BLUE, color: "#ffffff" }}
          >
            {labelGenerateFromSources}
          </Button>
        </div>
                      <div className="absolute left-1/2 -translate-x-1/2 text-center px-6" style={{ top: "40%" }}>
                        <p className="text-sm leading-6 text-slate-600 max-w-xl">{labelHelpRight}</p>
                      </div>
                    </>
                  )}

<div className="h-[440px] overflow-y-auto w-full">
  {(result || errorMsg || loading) && (
    <>
      {shouldShowBanner && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <DetectedLanguageBanner
              language={detectedLanguage}
              selectedLanguage={outputLang}
              onAccept={() => {
                const detectedCode = String(
                  detectedLanguage?.code || ""
                ).toLowerCase();

                const map = {
                  es: "es",
                  eus: "eus",
                  eu: "eus",
                  en: "en",
                  fr: "fr",
                };

                const nextLang = map[detectedCode];
               if (nextLang) {
  setOutputLang(nextLang);
}

setDetectedLanguage(null);

              }}
              onClose={() => setDetectedLanguage(null)}
            />
          </div>
        </div>
      )}

      <div className="px-6 pt-20 pb-20 max-w-3xl mx-auto">
        {errorMsg && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {errorMsg}
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-4">
            <article className="prose prose-slate max-w-none">
              <p translate="no" className="whitespace-pre-wrap">{result}</p>
            </article>
          </div>
        )}

        {loading && !result && (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-slate-200 rounded" />
            <div className="h-4 bg-slate-200 rounded w-11/12" />
            <div className="h-4 bg-slate-200 rounded w-10/12" />
          </div>
        )}
      </div>
    </>
  )}
</div>

{result && (
  <div className="absolute bottom-2 right-6 flex items-center gap-4 text-slate-500">

    <button
      type="button"
      onClick={() => handleCopy(true)}
      aria-label={labelCopy}
      className="group relative p-2 rounded-md hover:bg-slate-100"
    >
      {copiedFlash ? (
        <Check className="w-5 h-5" />
      ) : (
        <Copy className="w-5 h-5" />
      )}

      <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
        {copiedFlash ? labelCopied : labelCopy}
      </span>
    </button>

    <button
      type="button"
      onClick={handleShare}
      aria-label={t("translator.share")}
      className="group relative p-2 rounded-md hover:bg-slate-100"
    >
      <Share2 className="w-5 h-5" />

      <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
        {t("translator.share")}
      </span>
    </button>
  </div>
)}
</>
)}

              </section>
            </motion.section>
          </div>

          <Link
            to="/informacion?tool=parafraseador"
            className="absolute -right-24 top-0 shrink-0 w-12 h-12 rounded-2xl border border-slate-200 bg-white flex items-center justify-center shadow-sm hover:bg-slate-50 transition md:static md:right-auto md:top-auto min-[1424px]:absolute min-[1424px]:-right-24 min-[1424px]:top-0"
            aria-label="Más información"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </Link>
        </div>
      </div>
      </section>

      <BenefitsSection />
      <HowItWorks />
      <FaqSection />
      <Footer />
    </>
  );
}