import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { FileText, Share2, File as FileIcon, Link2 as UrlIcon, Plus, X, Copy, Trash, Check, Type } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import UpgradeBanner from "@/components/UpgradeBanner";
import DetectedLanguageBanner from "@/components/DetectedLanguageBanner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import { diff_match_patch } from "diff-match-patch";

// ✅ Landing (igual que Resumen)
import BenefitsSection from "@/components/BenefitsSection";
import ToolsSection from "@/components/ToolsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import ToolsSidebar from "@/components/ToolsSidebar";

export default function CorrectorGramatical() {
  const { t } = useTranslation();

  const tr = (key, fallback = "") => {
    const val = typeof t === "function" ? t(key) : null;
    return !val || val === key ? fallback : val;
  };



  const [sourceMode, setSourceMode] = useState("text");
  const [textValue, setTextValue] = useState("");

  const [result, setResult] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [errorKind, setErrorKind] = useState(null);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);

  const CORRECTION_MODE = "standard";

  const [outputLang, setOutputLang] = useState("EUS");

  const [lastSig, setLastSig] = useState(null);
  const [isOutdated, setIsOutdated] = useState(false);

  const [showDiff, setShowDiff] = useState(false);

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
  const MAX_CHARS = 3000;

  const hasRealResult = !!(result && result.trim().length > 0);

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  const labelSources = tr("grammarcorrector.sources_title", "Fuentes");
  const labelTabText = tr("grammarcorrector.sources_tab_text", "Texto");
  const labelTabDocument = tr("grammarcorrector.sources_tab_document", "Documento");
  const labelTabUrl = tr("grammarcorrector.sources_tab_url", "URL");
  const labelEnterText = tr(
    "grammarcorrector.enter_text_here_full",
    "Escribe o pega aquí el texto que quieres corregir…"
  );
  const labelChooseFileTitle = tr("grammarcorrector.choose_file_title", "Elige tu archivo o carpeta");
  const labelAcceptedFormats = tr(
    "grammarcorrector.accepted_formats",
    "Puedes añadir archivos de texto (.txt, .md) o documentos para corregir su contenido."
  );
  const labelFolderHint = tr("grammarcorrector.folder_hint", "Aquí aparecerán tus textos o documentos subidos.");
  const labelPasteUrls = tr("grammarcorrector.paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("grammarcorrector.add_url", "Añadir URLs");
  const labelSaveUrls = tr("grammarcorrector.save_urls", "Guardar");
  const labelCancel = tr("grammarcorrector.cancel", "Cancelar");
  const labelUrlsNoteVisible = tr("grammarcorrector.urls_note_visible", "Solo se importará el texto visible del sitio web.");
  const labelUrlsNotePaywalled = tr("grammarcorrector.urls_note_paywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("grammarcorrector.remove", "Quitar");
  const labelGenerateFromSources = tr("grammarcorrector.correct_button", "Corregir texto");
  const labelHelpRight = tr(
    "grammarcorrector.create_help_right",
    "Elige la fuente del texto (escribir, subir documento o URLs) y pulsa «Corregir texto»."
  );

  const labelViewChanges = tr("grammarcorrector.view_changes", "Ver cambios");
  const labelHideChanges = tr("grammarcorrector.hide_changes", "Ocultar cambios");

  const LBL_EUS = tr("summary.output_language_eus", "Euskara");
  const LBL_ES = tr("summary.output_language_es", "Gaztelania");
  const LBL_EN = tr("summary.output_language_en", "Ingelesa");
  const LBL_FR = tr("summary.output_language_fr", "Français");

  const tooltipCopy = t("translator.copy") || "Copiar";
  const tooltipCopied = t("translator.copied") || "Copiado";
  const tooltipPdf = t("grammarcorrector.pdf") || "PDF";

  const leftRaw = tr(
    "grammarcorrector.create_help_left",
    "Aquí aparecerán los textos o documentos que quieras corregir. Puedes pegar texto, subir archivos de texto o añadir URLs."
  );

  const [leftTitle, leftBody] = useMemo(() => {
    const parts = (leftRaw || "").split(".");
    const first = (parts.shift() || leftRaw || "").trim();
    const rest = parts.join(".").trim();
    return [first.endsWith(".") ? first : `${first}.`, rest];
  }, [leftRaw]);

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

  const parseUrlsFromText = (text) => {
    const raw = text
      .split(/[\s\n]+/g)
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

  const canonicalize = (s) =>
    (s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const normalizeForDiff = (s) =>
    String(s || "")
      .replace(/\r/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

  const diffSegments = (original, corrected) => {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(original || "", corrected || "");
    dmp.diff_cleanupSemantic(diffs);
    return diffs.map(([op, text]) => ({ op, text }));
  };

  const hasDiff = useMemo(() => {
    if (!textValue || !result) return false;
    return normalizeForDiff(textValue) !== normalizeForDiff(result);
  }, [textValue, result]);

  const parseList = (text) => {
    if (!text) return null;

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const numbered = lines
      .map((l) => {
        const m = l.match(/^(\d+)([.\)\-])\s+(.+)$/);
        return m ? m[3].trim() : null;
      })
      .filter(Boolean);

    if (numbered.length >= 2) return { type: "ol", items: numbered };

    const bulleted = lines
      .map((l) => {
        const m = l.match(/^[-•*]\s+(.+)$/);
        return m ? m[1].trim() : null;
      })
      .filter(Boolean);

    if (bulleted.length >= 2) return { type: "ul", items: bulleted };

    return null;
  };

  const renderResult = () => {
    if (!result) return null;

    if (!showDiff || !textValue || !hasDiff) {
      const parsed = parseList(result);

      if (parsed) {
        if (parsed.type === "ol") {
          return (
            <ol className="list-decimal pl-6 space-y-2">
              {parsed.items.map((item, idx) => (
                <li key={idx} className="whitespace-pre-wrap">
                  {item}
                </li>
              ))}
            </ol>
          );
        }
        return (
          <ul className="list-disc pl-6 space-y-2">
            {parsed.items.map((item, idx) => (
              <li key={idx} className="whitespace-pre-wrap">
                {item}
              </li>
            ))}
          </ul>
        );
      }

      return <p translate="no" className="whitespace-pre-wrap">{result}</p>;
    }

    const segments = diffSegments(textValue, result);

    return (
      <p translate="no" className="whitespace-pre-wrap">
        {segments.map((seg, index) => {
          if (seg.op === -1) {
            return (
              <span
                key={index}
                className="bg-red-100 text-red-900 rounded px-[2px] line-through decoration-red-400"
              >
                {seg.text}
              </span>
            );
          }

          if (seg.op === 1) {
            return (
              <span key={index} className="bg-emerald-100 text-emerald-900 rounded px-[2px]">
                {seg.text}
              </span>
            );
          }

          return <span key={index}>{seg.text}</span>;
        })}
      </p>
    );
  };

  const clearRight = () => {
    setResult("");
    setDetectedLanguage(null);
    setErrorMsg("");
    setErrorKind(null);
    setDailyLimitReached(false);
    setIsOutdated(false);
    setLoading(false);
    setShowDiff(false);
  };

  useEffect(() => {
    const sig = canonicalize(textValue);
    if (sig.length === 0) {
      setIsOutdated(false);
      return;
    }
    if (lastSig && sig !== lastSig) setIsOutdated(true);
    else setIsOutdated(false);
  }, [textValue, lastSig]);

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

  useEffect(() => {
    clearRight();
  }, [urlItems.length]);

  const textIsValid = useMemo(() => {
    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    return trimmed.length >= 1 && words.length >= 1;
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
      a.download = "euskalia-correccion.txt";
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
setErrorKind(null);
setDailyLimitReached(false);
setDetectedLanguage(null);
setResult("");
setIsOutdated(false);
setShowDiff(false);


    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const textOk = trimmed.length >= 1 && words.length >= 1;
    const validNow = textOk || urlItems.length > 0 || documents.length > 0;

    if ((textValue || "").length > MAX_CHARS) {
      setErrorKind("limit");
      setDailyLimitReached(false);
      setLoading(false);
      return;
    }

    if (!validNow) {
      setErrorMsg(
        tr("grammarcorrector.error_need_input", "Añade algo de texto, documentos o URLs antes de pedir la corrección.")
      );
      setLoading(false);
      return;
    }

    const urlsList = urlItems.map((u) => u.url).join("\n");
    const docNames = documents
      .map((d) => d.file?.name)
      .filter(Boolean)
      .join(", ");

    const modeInstruction =
      "Haz una corrección ESTÁNDAR: corrige ortografía, gramática, puntuación y mejora un poco la fluidez, manteniendo el mismo tono y estructura general.";

    const langInstruction =
      "Detecta automáticamente el idioma principal del texto de entrada y corrige SIEMPRE en ese mismo idioma. " +
      "No traduzcas el texto a otro idioma distinto al de la fuente. " +
      "Si el texto está en español, corrige en español. " +
      "Si está en euskera, corrige en euskera batua natural. " +
      "Si está en inglés, corrige en inglés. " +
      "Si está en francés, corrige en francés. " +
      "Devuelve siempre el texto completo corregido.";

    const docsInline = documentsText?.length
      ? "\nDOCUMENTOS (testu erauzia / texto extraído):\n" +
        documentsText
          .map((d) => `--- ${d.name} ---\n${(d.text || "").slice(0, 12000)}`)
          .join("\n\n")
      : "";

    const userContent = [
      "Quiero que actúes como un corrector gramatical y de estilo.",
      "\nTarea principal: devuelve el mismo texto, pero corregido y mejorado.",
      "\nNo resumas, no acortes y no añadas información nueva.",
      modeInstruction,
      "\nTEXTO PRINCIPAL PARA CORREGIR:",
      textValue ? `\n${textValue}` : "",
      urlsList
        ? `\nURLs (extrae solo lo visible y corrige ese contenido; si no puedes extraerlo, ignóralo):\n${urlsList}`
        : "",
      docsInline,
    ].join("");

    const systemBase =
      "Eres Euskalia, un corrector gramatical y de estilo. " +
      "Devuelve SIEMPRE el texto completo corregido. " +
      "Si el texto original contiene una lista (numerada o con viñetas), conserva el mismo formato de lista (números/viñetas y saltos de línea). " +
      "Si NO es una lista, devuélvelo como texto normal. " +
      "Respeta el significado original y no añadas explicaciones ni comentarios, solo el texto corregido.\n\n" +
      langInstruction;

    const messages = [
      { role: "system", content: systemBase },
      { role: "user", content: userContent },
    ];

    const cacheBase = JSON.stringify({
      textValue,
      urls: urlItems.map((u) => u.url),
      docNames,
      mode: CORRECTION_MODE,
      outputLang,
      plan: "public",
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const res = await fetch("/api/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           messages,
  mode: CORRECTION_MODE,
  cacheKey,
  documentsText,
  bannerDetectionText: textValue,
  uiLanguage: "ES",
          
        }),
      });

      if (!res.ok) {
        if (res.status === 413) {
          setErrorKind("limit");
          setDailyLimitReached(false);
          setLoading(false);
          return;
        }
        if (res.status === 429) {
          setErrorKind("limit");
          setDailyLimitReached(true);
          setLoading(false);
          return;
        }
        const txt = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();

      console.log("DATA API:", data);

      console.log("DATA API:", data);

const apiDetectedLanguage =
  data?.detectedLanguage && typeof data.detectedLanguage === "object"
    ? data.detectedLanguage
    : null;

setDetectedLanguage(apiDetectedLanguage);

      const rawText =
        data?.result ??
        data?.reply ??
        data?.text ??
        data?.content ??
        data?.choices?.[0]?.message?.content ??
        data?.message?.content ??
        "";

      if (!rawText) throw new Error(tr("grammarcorrector.error_no_text", "No se recibió texto de la API."));

      const cleaned = rawText.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();

      setResult(cleaned);
      setLastSig(canonicalize(textValue));
      setIsOutdated(false);
      setShowDiff(true);
    } catch (err) {
      setErrorMsg(err?.message || tr("grammarcorrector.error_generic", "Error realizando la corrección."));
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
  Corrector ortográfico y gramatical en euskera
</h1>

    <section className="w-full bg-[#F4F8FF] pt-10 pb-24">
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="relative flex items-start gap-3 md:gap-4">
          <ToolsSidebar />
          <div className="flex-1 min-w-0">

            <motion.section
              className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-6"
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

  setResult("");
  setDetectedLanguage(null);
  setShowDiff(false);
  setIsOutdated(false);
  setLastSig(null);

  if (errorMsg) setErrorMsg("");
  if (errorKind) {
    setErrorKind(null);
    setDailyLimitReached(false);
                          }
                        }}
                        placeholder={labelEnterText}
                        className="w-full flex-1 min-h-[280px] resize-none outline-none text-[15px] leading-6 bg-transparent placeholder:text-slate-400 text-slate-800"
                        aria-label={labelTabText}
                        spellCheck={false}
                      />
                      <div className="mt-2">
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-1 ${barClass}`} style={{ width: `${pct}%` }} />
                        </div>
                        <div className="mt-1 text-right text-xs">
                          <span className={overLimit ? "text-red-600" : nearLimit ? "text-amber-600" : "text-slate-500"}>
                            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {sourceMode === "document" && (
                    <div
                      className={`h-full w-full flex flex-col relative ${dragActive ? "ring-2 ring-sky-400 rounded-2xl" : ""}`}
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
                        accept=".pdf,.ppt,.pptx,.doc,.docx,.csv,.json,.xml,.epub,.txt,.vtt,.srt,.md,.rtf,.html,.htm,.jpg,.jpeg,.png"
                        onChange={onFiles}
                      />

                      <button
                        type="button"
                        onClick={triggerPick}
                        className="shrink-0 w-full rounded-2xl border border-dashed border-slate-300 bg-white/40 hover:bg-slate-50 transition px-6 py-10 text-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
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
                        <div className="mt-4 flex-1 overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200">
                          <ul className="divide-y divide-slate-200">
                            {documents.map(({ id, file }) => (
                              <li key={id} className="flex items-center justify-between gap-3 px-3 py-2 bg-white">
                                <div className="min-w-0 flex items-center gap-3 flex-1">
                                  <div className="shrink-0 w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center">
                                    <FileIcon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-sm font-medium block truncate">{file.name}</span>
                                    <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
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
                            placeholder={tr(
                              "grammarcorrector.paste_urls_placeholder",
                              "Introduce aquí una o más URLs (separadas por línea)"
                            )}
                            className="w-full min-h-[140px] rounded-md border border-slate-200 bg-transparent p-2 outline-none text-[15px] leading-6 placeholder:text-slate-400"
                            aria-label={labelPasteUrls}
                            spellCheck={false}
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

              <section className="relative h-[550px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px flex flex-col">
                <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
                  <div className="flex items-center">
                    {hasDiff && (
                      <button
                        type="button"
                        onClick={() => setShowDiff((v) => !v)}
                        className={`inline-flex items-center gap-1 px-3 h-8 rounded-full text-xs font-medium border shadow-sm transition ${
                          showDiff
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-800"
                        }`}
                        title={showDiff ? labelHideChanges : labelViewChanges}
                      >
                        <span className="text-sm leading-none">🔍</span>
                        <span className="truncate">{showDiff ? labelHideChanges : labelViewChanges}</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] translate-x-[-25px]"
                          aria-label={tr("grammarcorrector.output_language_aria", "Idioma principal del texto")}
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
                          <svg className="w-4 h-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                          </svg>
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="rounded-xl border border-slate-200 shadow-lg bg-white p-1 w-[200px]">
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

<button
  type="button"
  onClick={() => handleCopy(true)}
  title={
    copiedFlash
      ? tr("grammarcorrector.copied", "Copiado")
      : tr("grammarcorrector.copy", "Copiar")
  }
  className={`h-8 w-8 flex items-center justify-center translate-x-[-10px] ${
    result
      ? "text-slate-600 hover:text-slate-800"
      : "text-slate-300 cursor-not-allowed"
  }`}
  aria-label={
    copiedFlash
      ? tr("grammarcorrector.copied", "Copiado")
      : tr("grammarcorrector.copy", "Copiar")
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
                      title={tr("grammarcorrector.clear_input", "Eliminar")}
                      className={`h-8 w-8 flex items-center justify-center ${
                        sourceMode === "text" && textValue ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                      }`}
                      aria-label={tr("grammarcorrector.clear_input", "Eliminar")}
                      disabled={!(sourceMode === "text" && textValue)}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {errorKind === "limit" ? (
                  <div className="h-full w-full relative flex items-center justify-center px-6">
                    <div className="w-full max-w-3xl space-y-3">
                      <UpgradeBanner />
                    </div>

                    <div className="absolute left-6 right-6 bottom-20 z-10">
                      <div className="text-sm text-red-600 text-center max-w-xl mx-auto">
                        {dailyLimitReached
                          ? tr(
                              "grammarcorrector_daily_limit_reached",
                              "Has superado el límite diario. 5 solicitudes al día."
                            )
                          : tr(
                              "grammarcorrector_limit_reached",
                              `Límite máximo: ${MAX_CHARS.toLocaleString()} caracteres.`
                            ).replace("{{count}}", MAX_CHARS.toLocaleString())}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {!loading && !hasRealResult && !errorMsg && (
                      <>
                        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: "30%" }}>
                          <Button
                            type="button"
                            onClick={handleGenerate}
                            disabled={loading || !hasValidInput}
                            className="h-10 md:h-11 w-[220px] md:w-[240px] rounded-full text-[14px] md:text-[15px] font-medium shadow-sm flex items-center justify-center hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
                          >
                            {labelGenerateFromSources}
                          </Button>
                        </div>

                        <div className="absolute left-1/2 -translate-x-1/2 text-center px-6" style={{ top: "43%" }}>
                          <p className="text-sm leading-6 text-slate-600 max-w-xl">{labelHelpRight}</p>
                        </div>
                      </>
                    )}

                    <div className="h-[440px] overflow-y-auto w-full">
                      {(hasRealResult || loading || errorMsg) && (
                        <>


                          {/* ✅ Banner flotante FUERA del contenido */}
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
    es: "ES",
    eus: "EUS",
    eu: "EUS",
    en: "EN",
    fr: "FR",
  };

  const nextLang = map[detectedCode];

  if (nextLang) {
    setOutputLang(nextLang);
  }

  setDetectedLanguage(null);
}}
                                />
                              </div>
                            </div>
                          )}

                          {/* ✅ Contenido normal SIN que el banner lo mueva */}
                          <div className="px-6 pt-8 pb-8 max-w-3xl mx-auto">
                            {errorMsg && (
                              <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                                {errorMsg}
                              </div>
                            )}

                            {hasRealResult && (
                              <>
                                {!hasDiff ? (
                                  <div className="mt-6 flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                      <span className="text-lg">✅</span>
                                    </div>

                                    <p className="text-sm font-medium text-emerald-800">
                                      {tr(
                                        "grammarcorrector.no_errors_message",
                                        "¡Muy bien! No hemos detectado errores."
                                      )}
                                    </p>
                                  </div>
                                ) : (
                                  <article className="prose prose-slate max-w-none mt-14">
                                    {renderResult()}
                                  </article>
                                )}
                              </>
                            )}

                            {loading && !hasRealResult && (
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

                    {hasRealResult && (
                      <div className="absolute bottom-4 right-6 flex items-center gap-4 text-slate-500">

                        <button
                          type="button"
                          onClick={() => handleCopy(true)}
                          aria-label={copiedFlash ? tooltipCopied : tooltipCopy}
                          className="group relative p-2 rounded-md hover:bg-slate-100"
                        >
                          {copiedFlash ? (
                            <Check
                              className="w-5 h-5"
                              style={{ color: BLUE }}
                            />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}

                          <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                            {copiedFlash ? tooltipCopied : tooltipCopy}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={handleShare}
                          aria-label={t("translator.share")}
                          disabled={!hasRealResult}
                          className={`group relative p-2 rounded-md hover:bg-slate-100 ${
                            hasRealResult ? "" : "opacity-40 cursor-not-allowed"
                          }`}
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
            to="/informacion?tool=corrector"
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