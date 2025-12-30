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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import { addLibraryDoc } from "@/proLibraryStore";
import { useTranslation } from "@/lib/translations";

export default function ProParaphraser() {
  const { t } = useTranslation();
  const tr = (key, fallback) => t(key) || fallback;

  // ===== Estado =====
  const [sourceMode, setSourceMode] = useState(null); // null | "text" | "document" | "url"
  const [textValue, setTextValue] = useState("");

  // Resultado / carga / error
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Modos (7)
  const [mode, setMode] = useState("neutral"); // neutral | informal | professional | academic | fluent | simplified | creative

  // Idioma de salida
  const [outputLang, setOutputLang] = useState("eus");

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

  // Guardado en biblioteca (mensaje)
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

  // ===== Labels (con claves) =====
  const labelSources = tr("proParaphraser_sources_title", "Fuentes");
  const labelTabText = tr("proParaphraser_tab_text", "Texto");
  const labelTabDocument = tr("proParaphraser_tab_document", "Documento");
  const labelTabUrl = tr("proParaphraser_tab_url", "URL");
  const labelEnterText = tr("proParaphraser_enter_text_placeholder", "Escribe o pega tu texto aquí…");

  const labelChooseFileTitle = tr("proParaphraser_pick_file_title", "Elige tu archivo o carpeta");
  const labelAcceptedFormats = tr(
    "proParaphraser_accepted_formats",
    "Puedes añadir archivos PDF, texto copiado, enlaces web…"
  );
  const labelFolderHint = tr("proParaphraser_folder_hint", "Aquí aparecerán tus textos o documentos subidos.");

  const labelPasteUrls = tr("proParaphraser_paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("proParaphraser_add_urls_button", "Añadir URLs");
  const labelSaveUrls = tr("proParaphraser_save_urls_button", "Guardar");
  const labelCancel = tr("proParaphraser_cancel_button", "Cancelar");
  const labelUrlsNoteVisible = tr(
    "proParaphraser_urls_note_visible",
    "Solo se importará el texto visible del sitio web."
  );
  const labelUrlsNotePaywalled = tr("proParaphraser_urls_note_paywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("proParaphraser_remove_button", "Quitar");

  const LBL_EUS = tr("summary.output_language_eus", "Euskara");
  const LBL_ES = tr("summary.output_language_es", "Gaztelania");
  const LBL_EN = tr("summary.output_language_en", "Ingelesa");
  const LBL_FR = tr("summary.output_language_fr", "Français");

  const labelGenerateFromSources = tr("proParaphraser_generate_button", "Crear parafraseo");
  const labelHelpRight = tr(
    "proParaphraser_help_right",
    'Selecciona una fuente (texto, documentos o URLs) y pulsa "Crear parafraseo".'
  );

  const labelSaveButton = tr("proParaphraser_save_to_library_button", "Guardar");
  const librarySavedMessage = tr("proParaphraser_saved_to_library", "Guardado en biblioteca");

  const ariaCopyResult = tr("proParaphraser_copy_result_aria", "Copiar resultado");
  const ariaDeleteInput = tr("proParaphraser_delete_input_aria", "Eliminar texto de entrada y resultado");
  const titleCopyResult = tr("proParaphraser_copy_result_title", "Copiar resultado");
  const titleDeleteInput = tr("proParaphraser_delete_input_title", "Eliminar texto de entrada y resultado");
  const titleClearLeft = tr("proParaphraser_clear_text_title", "Borrar texto");
  const ariaClearLeft = tr("proParaphraser_clear_text_aria", "Borrar texto");

  const labelUrlTextareaPlaceholder = tr(
    "proParaphraser_urls_textarea_placeholder",
    "Introduce aquí una o más URLs (separadas por línea)"
  );

  const labelDownload = tr("proParaphraser_download", "Descargar");
  const labelCopy = tr("proParaphraser_copy", "Copiar");
  const labelCopied = tr("proParaphraser_copied", "Copiado");

  // Ayuda izquierda
  const leftTitle = tr("proParaphraser_left_title", "Aquí aparecerán tus textos o documentos subidos.");
  const leftBody = tr("proParaphraser_left_body", "Puedes añadir archivos PDF, texto copiado, enlaces web…");

  // ===== Tabs Fuentes (izquierda) =====
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
        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{ width: 1, height: 22, backgroundColor: DIVIDER }}
        />
      )}
    </div>
  );

  // ===== Tabs Modos (derecha) =====
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
          <span
            className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full"
            style={{ backgroundColor: BLUE }}
          />
        )}
      </button>
      {showDivider && (
        <span aria-hidden className="self-center" style={{ width: 1, height: 18, backgroundColor: DIVIDER }} />
      )}
    </div>
  );

  const modeLabels = {
    neutral: tr("proParaphraser_mode_neutral", "Neutral"),
    informal: tr("proParaphraser_mode_informal", "Informal"),
    professional: tr("proParaphraser_mode_professional", "Profesional"),
    academic: tr("proParaphraser_mode_academic", "Académico"),
    fluent: tr("proParaphraser_mode_fluent", "Fluido"),
    simplified: tr("proParaphraser_mode_simplified", "Simplificado"),
    creative: tr("proParaphraser_mode_creative", "Creativo"),
  };

  // ===== Utils =====
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
    setErrorMsg("");
    setLoading(false);
    setCopiedFlash(false);
    setSavedToLibrary(false);
  };

  // ===== Atajos teclado =====
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

  // URLs / docs / modo / idioma cambian => limpia derecha
  useEffect(() => {
    clearRight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlItems.length, documents.length, mode, outputLang]);

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

  // ===== Validación =====
  const textIsValid = useMemo(() => {
    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    return trimmed.length >= 20 && words.length >= 5;
  }, [textValue]);

  const hasValidInput = textIsValid || urlItems.length > 0 || documents.length > 0;

  // ===== Acciones derecha =====
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
      a.download = "euskalia-parafraseo.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {}
  };

  const handleSaveToLibrary = () => {
    if (!result) return;

    const now = new Date();
    const createdAt = now.toISOString();
    const createdAtLabel = now
      .toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
      .replace(".", "");

    const titleFromText = (textValue || "").trim().slice(0, 80);

    addLibraryDoc({
      kind: "paraphraser",
      title: titleFromText || tr("proParaphraser_default_title", "Parafraseo"),
      content: result,
      createdAt,
      createdAtLabel,
    });

    setSavedToLibrary(true);
    setTimeout(() => setSavedToLibrary(false), 2000);
  };

  useEffect(() => {
    setSavedToLibrary(false);
  }, [result]);

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

  // ===== Generar =====
  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg("");
    setResult("");
    setSavedToLibrary(false);

    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const textOk = trimmed.length >= 20 && words.length >= 5;
    const validNow = textOk || urlItems.length > 0 || documentsText.length > 0;

    if ((textValue || "").length > MAX_CHARS) {
      setErrorMsg(tr("proParaphraser_error_max_chars", "Has superado el límite de caracteres permitido."));
      setLoading(false);
      return;
    }

    if (!validNow) {
      setErrorMsg(
        tr(
          "proParaphraser_error_need_input",
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
      outputLang === "es"
        ? "Idioma de salida: español (ISO: es). Escribe todo en español."
        : outputLang === "en"
        ? "Output language: English (ISO: en). Write everything in English."
        : outputLang === "fr"
        ? "Langue de sortie : français (ISO : fr). Rédige tout en français."
        : "Irteerako hizkuntza: euskara (ISO: eu). Idatzi guztia euskaraz.";

    const modeRule =
      mode === "neutral"
        ? `
MODO NEUTRAL (base):
- Reescribe de forma natural y correcta.
- Mantén el tono y el nivel del original.
- Cambia palabras y orden lo justo.
- NO simplifiques, NO embellezcas, NO hagas más formal ni más informal.
`.trim()
        : mode === "informal"
        ? `
MODO INFORMAL (se tiene que notar):
- Tono cercano y conversacional, como hablado entre personas.
- Frases MÁS cortas.
- Vocabulario cotidiano (sin sonar infantil).
- Evita estructuras formales o académicas.
- Puedes usar expresiones naturales tipo: "la verdad", "a veces", "me pasa que…", sin exagerar.
- PROHIBIDO: "me resulta difícil", "de manera continua", "preservando", "por esta razón".
`.trim()
        : mode === "professional"
        ? `
MODO PROFESIONAL:
- Tono formal y profesional, claro y práctico.
- Directo, sin adornos emocionales.
- Léxico neutro de trabajo (email, informe, negocio).
- Estructura ordenada y precisa.
- PROHIBIDO: coloquialismos, muletillas, humor, exageraciones.
`.trim()
        : mode === "academic"
        ? `
MODO ACADÉMICO:
- Tono riguroso y formal, con vocabulario más técnico.
- Frases más largas y elaboradas (sin perder claridad).
- Usa conectores formales: "por consiguiente", "en este contexto", "asimismo".
- Apto para contexto educativo / académico.
`.trim()
        : mode === "fluent"
        ? `
MODO FLUIDO (ritmo, no "más formal"):
- Prioriza que el texto se lea de forma continua y agradable.
- Une frases cuando tenga sentido.
- Reordena para mejorar el flujo (sin cambiar el significado).
- Elimina repeticiones y comienzos repetidos ("A veces...", "A veces...").
- Añade transiciones suaves: "además", "por otro lado", "en resumen" (sin pasarte).
`.trim()
        : mode === "simplified"
        ? `
MODO SIMPLIFICADO (tiene que parecer otro texto):
- Frases CORTAS y muy claras (idealmente 10–16 palabras).
- Vocabulario sencillo (sin tecnicismos).
- Evita subordinadas, metáforas y frases largas.
- Divide ideas: una idea principal por frase.
- Piensa en fatiga lectora / TDAH: que se entienda a la primera.
- PROHIBIDO: frases largas, conectores densos, palabras tipo "preservando", "contexto", "consecuentemente".
`.trim()
        : `
MODO CREATIVO:
- Mayor libertad estilística manteniendo el significado.
- Varía la estructura: cambia el orden de ideas y el ritmo.
- Haz el texto más expresivo y con más personalidad (sin inventar hechos).
- Puedes usar algún giro ligero o una metáfora suave si encaja.
- NO lo conviertas en académico ni en profesional.
`.trim();

    const formattingRules =
      "Devuelve el texto parafraseado en formato normal (sin listas obligatorias), claro y natural. " +
      "No inventes datos. Mantén el mismo idioma que se pide.";

    const userContent = [
      "Parafrasea el contenido manteniendo el significado original.",
      textValue ? `\nTEXTO:\n${textValue}` : "",
      urlsList ? `\nURLs (si no puedes extraer texto, ignóralas):\n${urlsList}` : "",
      docsInline,
      `\n${modeRule}`,
      `\n${formattingRules}`,
      `\n${langInstruction}`,
    ].join("");

    const systemBase =
      "Eres un asistente experto en reescritura/parafraseo. " +
      "Mantén el significado, no inventes hechos, y produce un texto natural.";

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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          mode: "paraphrase",
          paraphraseMode: mode,
          outputLang,
          cacheKey,
          documentsText,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(
            tr("proParaphraser_error_rate_limit", "Has alcanzado el límite de peticiones. Inténtalo más tarde.")
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

      if (!rawText) throw new Error(tr("proParaphraser_error_no_text", "No se recibió texto de la API."));

      const cleaned = String(rawText || "")
        .replace(/\r/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      setResult(cleaned);
    } catch (err) {
      setErrorMsg(err.message || tr("proParaphraser_error_generic", "Error creando el parafraseo."));
    } finally {
      setLoading(false);
    }
  };

  // ===== Contador =====
  const charCount = (textValue || "").length;

  return (
    <section className="w-full bg-[#F4F8FF] pt-4 pb-16">
      <div className="max-w-7xl mx-auto w-full px-6">
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
        >
          {/* ===== Panel Fuentes (izquierda) — ALTURA FIJA ===== */}
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

            {/* Contenido (con overflow) */}
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
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder={labelEnterText}
                    className="w-full flex-1 resize-none outline-none text-[15px] leading-6 bg-transparent placeholder:text-slate-400 text-slate-800"
                    aria-label={labelTabText}
                  />

                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                    </div>

                    <button
                      type="button"
                      onClick={handleClearLeft}
                      className={`h-10 w-10 rounded-xl border flex items-center justify-center transition ${
                        textValue
                          ? "border-slate-300 text-slate-700 hover:bg-slate-50"
                          : "border-slate-200 text-slate-300 cursor-not-allowed"
                      }`}
                      aria-label={ariaClearLeft}
                      title={titleClearLeft}
                      disabled={!textValue}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
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
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.csv,.json,.xml,.epub,.txt,.vtt,.srt,.md,.rtf,.html,.htm,.jpg,.jpeg,.png"
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

                  {/* ✅ SCROLL INTERNO PARA VER TODOS LOS DOCUMENTOS */}
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

          {/* ===== Panel Derecho — ALTURA FIJA + barra inferior ===== */}
          <section className="relative h-[540px] pb-[100px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
            {/* Barra superior con MODOS + selector + acciones */}
            <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
              {/* 7 MODOS */}
              <div className="flex items-center gap-0 -ml-2">
                <ModeTab active={mode === "neutral"} label={modeLabels.neutral} onClick={() => setMode("neutral")} showDivider />
                <ModeTab active={mode === "informal"} label={modeLabels.informal} onClick={() => setMode("informal")} showDivider />
                <ModeTab
                  active={mode === "professional"}
                  label={modeLabels.professional}
                  onClick={() => setMode("professional")}
                  showDivider
                />
                <ModeTab
                  active={mode === "academic"}
                  label={modeLabels.academic}
                  onClick={() => setMode("academic")}
                  showDivider
                />
                <ModeTab active={mode === "fluent"} label={modeLabels.fluent} onClick={() => setMode("fluent")} showDivider />
                <ModeTab
                  active={mode === "simplified"}
                  label={modeLabels.simplified}
                  onClick={() => setMode("simplified")}
                  showDivider
                />
                <ModeTab active={mode === "creative"} label={modeLabels.creative} onClick={() => setMode("creative")} />
              </div>

              <div className="flex items-center gap-1">
                {/* Selector de idioma */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                      aria-label={tr("proParaphraser_output_language_aria", "Idioma de salida")}
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
                    <DropdownMenuItem
                      onClick={() => {
                        if (outputLang !== "es") {
                          setOutputLang("es");
                          clearRight();
                        }
                      }}
                      className="cursor-pointer rounded-lg text-[14px] px-3 py-2"
                    >
                      {LBL_ES}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (outputLang !== "eus") {
                          setOutputLang("eus");
                          clearRight();
                        }
                      }}
                      className="cursor-pointer rounded-lg text-[14px] px-3 py-2"
                    >
                      {LBL_EUS}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (outputLang !== "en") {
                          setOutputLang("en");
                          clearRight();
                        }
                      }}
                      className="cursor-pointer rounded-lg text-[14px] px-3 py-2"
                    >
                      {LBL_EN}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (outputLang !== "fr") {
                          setOutputLang("fr");
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

                {/* Copiar resultado */}
                <button
                  type="button"
                  onClick={() => handleCopy(true)}
                  title={titleCopyResult}
                  className={`h-9 w-9 flex items-center justify-center ${
                    result ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                  }`}
                  aria-label={ariaCopyResult}
                  disabled={!result}
                >
                  {copiedFlash ? <Check className="w-4 h-4" style={{ color: BLUE }} /> : <Copy className="w-4 h-4" />}
                </button>

                {/* Eliminar texto izquierda */}
                <button
                  type="button"
                  onClick={handleClearLeft}
                  title={titleDeleteInput}
                  className={`h-9 w-9 flex items-center justify-center ${
                    sourceMode === "text" && textValue ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                  }`}
                  aria-label={ariaDeleteInput}
                  disabled={!(sourceMode === "text" && textValue)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Estado inicial */}
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

            {/* Resultado / errores / loader */}
            <div className="w-full">
              {(result || errorMsg || loading) && (
                <div className="px-6 pt-20 pb-20 max-w-3xl mx-auto">
                  {errorMsg && (
                    <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                      {errorMsg}
                    </div>
                  )}

                  {result && (
                    <div className="flex flex-col gap-4">
                      <article className="prose prose-slate max-w-none">
                        <p className="whitespace-pre-wrap">{result}</p>
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
              )}
            </div>

            {/* Barra inferior: copiar, descargar, guardar */}
            {result && (
              <div className="absolute bottom-4 right-6 flex flex-col items-end gap-1 text-slate-500">
                {savedToLibrary && <p className="text-xs text-emerald-600 mb-1">{librarySavedMessage}</p>}

                <div className="flex items-center gap-4">
                  {/* Copiar */}
                  <button
                    type="button"
                    onClick={() => handleCopy(true)}
                    aria-label={labelCopy}
                    className="group relative p-2 rounded-md hover:bg-slate-100"
                  >
                    {copiedFlash ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      {copiedFlash ? labelCopied : labelCopy}
                    </span>
                  </button>

                  {/* Descargar */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    aria-label={labelDownload}
                    className="group relative p-2 rounded-md hover:bg-slate-100"
                  >
                    <FileDown className="w-5 h-5" />
                    <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      {labelDownload}
                    </span>
                  </button>

                  {/* Botón verde Guardar */}
                  <button
                    type="button"
                    onClick={handleSaveToLibrary}
                    className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:brightness-95 active:scale-[0.98] transition-all"
                    style={{ backgroundColor: "#22c55e" }}
                  >
                    {labelSaveButton}
                  </button>
                </div>
              </div>
            )}
          </section>
        </motion.section>
      </div>
    </section>
  );
}
