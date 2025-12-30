import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FileDown,
  File as FileIcon,
  Link2 as UrlIcon,
  Plus,
  X,
  Copy,
  Trash,
  Check,
} from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import { addLibraryDoc } from "@/proLibraryStore";
import { diff_match_patch } from "diff-match-patch";

export default function ProGrammarCorrector() {
  const { t } = useTranslation();
  const tr = (key, fallback) => t(key) || fallback;

  // ===== Estado =====
  const [sourceMode, setSourceMode] = useState(null); // null | "text" | "document" | "url"
  const [textValue, setTextValue] = useState("");

  // Resultado / carga / error
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorKind, setErrorKind] = useState(null); // null | "limit"

  // Modo de corrección fijo (ya no hay pestañas)
  const CORRECTION_MODE = "standard"; // "light" | "standard" | "deep"

  // Idioma de referencia para la corrección (ES/EUS/EN/FR) — por defecto Euskera
  const [outputLang, setOutputLang] = useState("EUS");

  // Track “texto desactualizado”
  const [lastSig, setLastSig] = useState(null);
  const [isOutdated, setIsOutdated] = useState(false);

  // Mostrar / ocultar resaltado de cambios
  const [showDiff, setShowDiff] = useState(false);

  // Documentos
  const [documents, setDocuments] = useState([]); // [{id,file}]
  const [documentsText, setDocumentsText] = useState([]); // [{id,name,text}]
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // URLs
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [urlsTextarea, setUrlsTextarea] = useState("");
  const [urlItems, setUrlItems] = useState([]); // [{id,url,host}]

  // Copia: flash de tic azul
  const [copiedFlash, setCopiedFlash] = useState(false);

  // Guardado en biblioteca (solo mensaje)
  const [savedToLibrary, setSavedToLibrary] = useState(false);

  // ===== Estilos / constantes =====
  const BLUE = "#2563eb";
  const GRAY_TEXT = "#64748b";
  const GRAY_ICON = "#94a3b8";
  const DIVIDER = "#e5e7eb";
  const MAX_CHARS = 12000;

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  // ===== i18n =====
  const labelSources = tr("grammar.sources_title", "Fuentes");
  const labelTabText = tr("grammar.sources_tab_text", "Texto");
  const labelTabDocument = tr("grammar.sources_tab_document", "Documento");
  const labelTabUrl = tr("grammar.sources_tab_url", "URL");
  const labelEnterText = tr(
    "grammar.enter_text_here_full",
    "Escribe o pega aquí el texto que quieres corregir…"
  );
  const labelChooseFileTitle = tr("grammar.choose_file_title", "Elige tu archivo o carpeta");
  const labelAcceptedFormats = tr(
    "grammar.accepted_formats",
    "Puedes añadir archivos de texto (.txt, .md) o documentos para corregir su contenido."
  );
  const labelFolderHint = tr("grammar.folder_hint", "Aquí aparecerán tus textos o documentos subidos.");
  const labelPasteUrls = tr("grammar.paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("grammar.add_url", "Añadir URLs");
  const labelSaveUrls = tr("grammar.save_urls", "Guardar");
  const labelCancel = tr("grammar.cancel", "Cancelar");
  const labelUrlsNoteVisible = tr("grammar.urls_note_visible", "Solo se importará el texto visible del sitio web.");
  const labelUrlsNotePaywalled = tr("grammar.urls_note_paywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("grammar.remove", "Quitar");
  const labelGenerateFromSources = tr("grammar.correct_button", "Corregir texto");
  const labelHelpRight = tr(
    "grammar.create_help_right",
    "Elige la fuente del texto (escribir, subir documento o URLs) y pulsa «Corregir texto»."
  );

  const labelViewChanges = tr("grammar.view_changes", "Ver cambios");
  const labelHideChanges = tr("grammar.hide_changes", "Ocultar cambios");

  // Idiomas (para selector)
  const LBL_EUS = tr("summary.output_language_eus", "Euskara");
  const LBL_ES = tr("summary.output_language_es", "Gaztelania");
  const LBL_EN = tr("summary.output_language_en", "Ingelesa");
  const LBL_FR = tr("summary.output_language_fr", "Français");
  // Guardar (mismo sistema que Translator)
  const labelSaveTranslation = tr("save_button_label", "Guardar");
  const librarySavedMessage = tr("library_saved_toast", "Guardado en biblioteca");

  // ✅ Tooltips existentes del translator (NO nuevas keys)
  const tooltipCopy = t("translator.copy") || "Copiar";
  const tooltipCopied = t("translator.copied") || "Copiado";
  const tooltipPdf = t("translator.pdf") || "PDF";

  // Ayuda izquierda
  const leftRaw = tr(
    "grammar.create_help_left",
    "Aquí aparecerán los textos o documentos que quieras corregir. Puedes pegar texto, subir archivos de texto o añadir URLs."
  );
  const [leftTitle, leftBody] = useMemo(() => {
    const parts = (leftRaw || "").split(".");
    const first = (parts.shift() || leftRaw || "").trim();
    const rest = parts.join(".").trim();
    return [first.endsWith(".") ? first : `${first}.`, rest];
  }, [leftRaw]);

  // ===== Tabs =====
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
          <span
            className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full"
            style={{ backgroundColor: BLUE }}
          />
        )}
      </button>
      {showDivider && (
        <span aria-hidden className="self-center" style={{ width: 1, height: 22, backgroundColor: DIVIDER }} />
      )}
    </div>
  );

  // ===== Utils =====
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

  // ✅ Diff REAL (solo verde lo que la API “ha cambiado/añadido” en el resultado)
  const diffSegments = (original, corrected) => {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(original || "", corrected || "");
    dmp.diff_cleanupSemantic(diffs);

    return diffs.map(([op, text]) => ({
      text,
      changed: op === 1, // ✅ SOLO lo que se añade en el resultado
    }));
  };

  const hasDiff = useMemo(() => {
    if (!textValue || !result) return false;
    return canonicalize(textValue) !== canonicalize(result);
  }, [textValue, result]);

  // ✅ Detectar listas pegadas (numeradas o con viñetas)
  const parseList = (text) => {
    if (!text) return null;

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    // 1) Lista numerada: "1.", "2)", "3-" ...
    const numbered = lines
      .map((l) => {
        const m = l.match(/^(\d+)([.\)\-])\s+(.+)$/);
        return m ? m[3].trim() : null;
      })
      .filter(Boolean);

    if (numbered.length >= 2) {
      return { type: "ol", items: numbered };
    }

    // 2) Lista con bullets: "- ", "• ", "* "
    const bulleted = lines
      .map((l) => {
        const m = l.match(/^[-•*]\s+(.+)$/);
        return m ? m[1].trim() : null;
      })
      .filter(Boolean);

    if (bulleted.length >= 2) {
      return { type: "ul", items: bulleted };
    }

    return null;
  };

  const renderResult = () => {
    if (!result) return null;

    // Si no se ha activado la vista de cambios o no hay diff, mostrar normal (pero si es lista, renderizar lista)
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

      return <p className="whitespace-pre-wrap">{result}</p>;
    }

    const segments = diffSegments(textValue, result);

    return (
      <p className="whitespace-pre-wrap">
        {segments.map((seg, index) => (
          <span
            key={index}
            className={seg.changed ? "bg-emerald-100 text-emerald-900 rounded px-[2px]" : undefined}
          >
            {seg.text}
          </span>
        ))}
      </p>
    );
  };

  // ===== Limpieza del panel derecho =====
  const clearRight = () => {
    setResult("");
    setErrorMsg("");
    setErrorKind(null);
    setIsOutdated(false);
    setLoading(false);
    setShowDiff(false);
    setSavedToLibrary(false);
  };

  // ===== Reglas UX =====
  useEffect(() => {
    const sig = canonicalize(textValue);
    if (sig.length === 0) {
      setIsOutdated(false);
      return;
    }
    if (lastSig && sig !== lastSig) {
      setIsOutdated(true);
    } else {
      setIsOutdated(false);
    }
  }, [textValue, lastSig]);

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
      } else if (e.key === "Escape") {
        if (urlInputOpen) setUrlInputOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, result, urlInputOpen, textValue, urlItems, documents, outputLang]);

  // ===== Documentos =====
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

  // ===== URLs =====
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlItems.length]);

  // ===== Validación =====
  const textIsValid = useMemo(() => {
    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    return trimmed.length >= 1 && words.length >= 1;
  }, [textValue]);

  const hasValidInput = textIsValid || urlItems.length > 0 || documents.length > 0;

  // ===== Acciones barra derecha =====
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

  const handleSaveToLibrary = () => {
    if (!result) return;
    if (!hasDiff) return; // ✅ SOLO guardar si hay corrección real

    const now = new Date();
    const createdAt = now.toISOString();
    const createdAtLabel = now
      .toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
      .replace(".", "");

    const titleFromText = (textValue || "").trim().slice(0, 80);

    addLibraryDoc({
      kind: "corrector",
      title: titleFromText || "Zuzenketa",
      content: result,
      createdAt,
      createdAtLabel,
    });

    setSavedToLibrary(true);
    setTimeout(() => setSavedToLibrary(false), 2000);
  };

  useEffect(() => {
    // Cada vez que cambia el resultado, reseteamos el estado de “guardado”
    setSavedToLibrary(false);
  }, [result]);

  // ===== Tarjetas =====
  const LimitCard = () => (
    <div className="rounded-xl border border-sky-200 bg-sky-50 px-6 py-5 text-sky-900 text-center">
      <div className="text-sm font-semibold">
        {tr("grammar.limit_title", "Has alcanzado el límite del plan Gratis")}
      </div>
      <p className="text-xs text-slate-600 mt-1">
        {tr("grammar.limit_note", "Límite actual: 12.000 caracteres por petición.")}
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <a
          href="/pricing"
          className="inline-flex items-center justify-center rounded-full px-5 h-9 text-white text-sm font-medium shadow-sm hover:brightness-95"
          style={{ backgroundColor: "#2563eb" }}
        >
          {tr("grammar.limit_cta", "Probar plan Premium")}
        </a>
        <button
          onClick={() => setErrorKind(null)}
          className="h-9 px-4 rounded-full border border-slate-300 bg-white text-sm hover:bg-white"
        >
          {tr("grammar.limit_dismiss", "Seguir con plan Gratis")}
        </button>
      </div>
    </div>
  );

  // ===== Helper: cache key (sha-256) =====
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

  // ===== Generar (corrección gramatical) =====
  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg("");
    setErrorKind(null);
    setShowDiff(false);
    setSavedToLibrary(false);

    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const textOk = trimmed.length >= 1 && words.length >= 1;
    const validNow = textOk || urlItems.length > 0 || documents.length > 0;

    if ((textValue || "").length > MAX_CHARS) {
      setErrorKind("limit");
      setLoading(false);
      return;
    }
    if (!validNow) {
      setErrorMsg(
        tr("grammar.error_need_input", "Añade algo de texto, documentos o URLs antes de pedir la corrección.")
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
      outputLang === "ES"
        ? "Usa ortografía y gramática del español estándar (España). NO traduzcas el texto a otro idioma. Devuelve siempre el texto completo corregido."
        : outputLang === "EN"
        ? "Use standard English grammar and spelling. Do NOT translate the text into another language. Always return the full corrected text."
        : outputLang === "FR"
        ? "Utilise la grammaire et l’orthographe du français standard. Ne traduis pas le texte dans une autre langue. Rends toujours le texte complet corrigé."
        : "Erabili euskara batuaren ortografia eta gramatika. EZ itzuli testua beste hizkuntza batera. Itzuli beti testu osoa zuzenduta.";

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
      "Eres Euskalia Pro, un corrector gramatical y de estilo. " +
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
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          mode: CORRECTION_MODE,
          cacheKey,
          documentsText,
        }),
      });

      if (!res.ok) {
        if (res.status === 413) {
          setErrorKind("limit");
          setLoading(false);
          return;
        }
        if (res.status === 429) {
          throw new Error(
            tr(
              "grammar.error_rate_limit",
              "Has alcanzado el límite de peticiones. Inténtalo más tarde o prueba el plan Premium."
            )
          );
        }
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();

      const rawText =
        data?.text ??
        data?.content ??
        data?.choices?.[0]?.message?.content ??
        data?.message?.content ??
        "";

      if (!rawText) throw new Error(tr("grammar.error_no_text", "No se recibió texto de la API."));

      // ✅ NO borrar números/viñetas: así una lista pegada se puede mostrar como lista
      const cleaned = rawText.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();

      setResult(cleaned);
      setLastSig(canonicalize(textValue));
      setIsOutdated(false);
      setShowDiff(false);
    } catch (err) {
      setErrorMsg(err.message || tr("grammar.error_generic", "Error realizando la corrección."));
    } finally {
      setLoading(false);
    }
  };

  // ===== Contador / barra =====
  const charCount = (textValue || "").length;
  const pct = Math.min(100, Math.round((charCount / MAX_CHARS) * 100));
  const nearLimit = charCount >= MAX_CHARS * 0.9 && charCount < MAX_CHARS;
  const overLimit = charCount > MAX_CHARS;

  const barClass = overLimit ? "bg-red-500" : nearLimit ? "bg-amber-500" : "bg-sky-500";

  // ===== Render =====
  return (
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
          {/* ===== Panel Fuentes (izquierda) ===== */}
          {/* ✅ ALTURA FIJA para que NO crezca al añadir documentos */}
          <aside className="h-[540px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Título */}
            <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
              <div className="text-sm font-medium text-slate-700">{labelSources}</div>
            </div>

            {/* Tabs */}
            <div className="flex items-center px-2 border-b" style={{ borderColor: DIVIDER }}>
              <TabBtn
                active={sourceMode === "text"}
                icon={FileText}
                label={labelTabText}
                onClick={() => setSourceMode("text")}
                showDivider
              />
              <TabBtn
                active={sourceMode === "document"}
                icon={FileIcon}
                label={labelTabDocument}
                onClick={() => setSourceMode("document")}
                showDivider
              />
              <TabBtn
                active={sourceMode === "url"}
                icon={UrlIcon}
                label={labelTabUrl}
                onClick={() => setSourceMode("url")}
                showDivider={false}
              />
            </div>

            {/* Contenido */}
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
                      setShowDiff(false);
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
                      <span
                        className={overLimit ? "text-red-600" : nearLimit ? "text-amber-600" : "text-slate-500"}
                      >
                        {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {sourceMode === "document" && (
                <div
                  className={`h-full w-full flex flex-col relative ${
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
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.csv,.json,.xml,.epub,.txt,.vtt,.srt,.md,.rtf,.html,.htm,.jpg,.jpeg,.png"
                    onChange={onFiles}
                  />

                  {/* ✅ El botón no encoge */}
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

                  {/* ✅ Lista con SCROLL para que la tabla NO crezca */}
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
                        placeholder={tr(
                          "grammar.paste_urls_placeholder",
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

          {/* ===== Panel Derecho ===== */}
          <section className="relative min-h-[540px] pb-[100px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
            {/* Barra superior con selector idioma + acciones (sin modos) */}
            <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
              {/* Botón lupa a la izquierda */}
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
                {/* Selector de idioma de referencia */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                      aria-label="Idioma principal del texto"
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

                {/* Copiar resultado rápido en la barra superior */}
                <button
                  type="button"
                  onClick={() => handleCopy(true)}
                  title={copiedFlash ? tooltipCopied : tooltipCopy}
                  className={`h-8 w-8 flex items-center justify-center ${
                    result ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                  }`}
                  aria-label={copiedFlash ? tooltipCopied : tooltipCopy}
                  disabled={!result}
                >
                  {copiedFlash ? <Check className="w-4 h-4" style={{ color: BLUE }} /> : <Copy className="w-4 h-4" />}
                </button>

                {/* Eliminar texto de la izquierda */}
                <button
                  type="button"
                  onClick={handleClearLeft}
                  title={tr("grammar.clear_input", "Eliminar")}
                  className={`h-8 w-8 flex items-center justify-center ${
                    sourceMode === "text" && textValue ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                  }`}
                  aria-label={tr("grammar.clear_input", "Eliminar")}
                  disabled={!(sourceMode === "text" && textValue)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Estado inicial */}
            {!loading && !result && !errorKind && (
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

            {/* Resultado / errores / loader / límite */}
            <div className="w-full">
              {(result || errorMsg || loading || errorKind) && (
                <div className="px-6 pt-24 pb-32 max-w-3xl mx-auto">
                  {errorKind === "limit" && <LimitCard />}

                  {errorMsg && !errorKind && (
                    <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                      {errorMsg}
                    </div>
                  )}

                  {result && (
                    <>
                      {/* Caso sin diferencias → solo tic + frase */}
                      {!hasDiff ? (
                        <div className="mt-6 flex flex-col items-center text-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <span className="text-lg">✅</span>
                          </div>
                          <p className="text-sm font-medium text-emerald-800">
                            {tr("grammar.no_errors_message", "¡Muy bien! No hemos detectado errores.")}
                          </p>
                        </div>
                      ) : (
                        <article className="prose prose-slate max-w-none">{renderResult()}</article>
                      )}
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

            {/* ✅ Barra inferior: SOLO si hay corrección (hasDiff) */}
            {result && hasDiff && (
              <div className="absolute bottom-4 right-6 flex flex-col items-end gap-1 text-slate-500">
                {savedToLibrary && <p className="text-xs text-emerald-600 mb-1">{librarySavedMessage}</p>}

                <div className="flex items-center gap-4">
                  {/* Copiar */} 
                  <button
                    type="button"
                    onClick={() => handleCopy(true)}
                    aria-label={copiedFlash ? tooltipCopied : tooltipCopy}
                    className="group relative p-2 rounded-md hover:bg-slate-100"
                  >
                    {copiedFlash ? <Check className="w-5 h-5" style={{ color: BLUE }} /> : <Copy className="w-5 h-5" />}
                    <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      {copiedFlash ? tooltipCopied : tooltipCopy}
                    </span>
                  </button>

                  {/* Descargar */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    aria-label={tooltipPdf}
                    className="group relative p-2 rounded-md hover:bg-slate-100"
                  >
                    <FileDown className="w-5 h-5" />
                    <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      {tooltipPdf}
                    </span>
                  </button>

                  {/* Botón verde Guardar */}
                  <motion.button
                    type="button"
                    onClick={handleSaveToLibrary}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:brightness-95 active:scale-[0.98] transition-all"
                    style={{ backgroundColor: "#22c55e" }}
                  >
                    {labelSaveTranslation}
                  </motion.button>
                </div>
              </div>
            )}
          </section>
        </motion.section>
      </div>
    </section>
  );
}
