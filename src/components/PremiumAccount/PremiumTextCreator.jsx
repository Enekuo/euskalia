import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  File as FileIcon,
  Link2 as UrlIcon,
  Plus,
  X,
  Copy,
  Trash,
  Check,
} from "lucide-react";
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

  // ===== Estado =====
  const [sourceMode, setSourceMode] = useState(null); // null | "text" | "document" | "url"
  const [textValue, setTextValue] = useState("");

  // Resultado / carga / error
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Límite Premium (banner) -> guardar TIPO, no el texto
  const [limitType, setLimitType] = useState(""); // "" | "chars" | "daily"

  const setCharsLimit = () => setLimitType("chars");
  const setDailyLimit = () => setLimitType("daily");
  const clearLimit = () => setLimitType("");

  const limitMsg =
    limitType === "chars"
      ? tr("premium_limit_chars", "Has superado el límite máximo de caracteres para tu plan Premium.")
      : limitType === "daily"
      ? tr("premium_limit_daily", "Has alcanzado tu límite diario del plan Premium. Vuelve mañana.")
      : "";

  // Idioma de salida (EUS/ES/EN/FR) — por defecto Euskera
  const [outputLang, setOutputLang] = useState("EUS");

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

  // Estado y timer para mensaje "Guardado en biblioteca"
  const [savedToLibrary, setSavedToLibrary] = useState(false);
  const savedTimerRef = useRef(null);

  // ===== Estilos / constantes =====
  const BLUE = "#2563eb";
  const GRAY_TEXT = "#64748b";
  const GRAY_ICON = "#94a3b8";
  const DIVIDER = "#e5e7eb";
  const MAX_CHARS = 18000;

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  // ===== i18n (Premium Text Creator) =====
  const labelSources = tr("premiumTextCreator.sources_title", "Fuentes");
  const labelTabText = tr("premiumTextCreator.sources_tab_text", "Texto");
  const labelTabDocument = tr("premiumTextCreator.sources_tab_document", "Documento");
  const labelTabUrl = tr("premiumTextCreator.sources_tab_url", "URL");

  const labelEnterText = tr("premiumTextCreator.enter_text_here_full", "Escribe o pega tu texto aquí…");
  const labelChooseFileTitle = tr("premiumTextCreator.choose_file_title", "Elige tu archivo o carpeta");
  const labelAcceptedFormats = tr("premiumTextCreator.accepted_formats", "Puedes añadir archivos PDF, texto copiado, enlaces web…");
  const labelFolderHint = tr("premiumTextCreator.folder_hint", "Aquí aparecerán tus textos o documentos subidos.");

  const labelPasteUrls = tr("premiumTextCreator.paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("premiumTextCreator.add_url", "Añadir URLs");
  const labelSaveUrls = tr("premiumTextCreator.save_urls", "Guardar");
  const labelCancel = tr("premiumTextCreator.cancel", "Cancelar");
  const labelUrlsNoteVisible = tr("premiumTextCreator.urls_note_visible", "Solo se importará el texto visible del sitio web.");
  const labelUrlsNotePaywalled = tr("premiumTextCreator.urls_note_paywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("premiumTextCreator.remove", "Quitar");

  const labelGenerateFromSources = tr("premiumTextCreator.generate_from_sources", "Crear texto");
  const labelHelpRight = tr(
    "premiumTextCreator.create_help_right",
    "Hautatu iturri bat (testua, dokumentuak edo URLak) eta sakatu “Crear texto”."
  );

  // Etiquetas de idioma (reutilizo las de summary para no inventar)
  const LBL_EUS = tr("summary.output_language_eus", "Euskara");
  const LBL_ES = tr("summary.output_language_es", "Gaztelania");
  const LBL_EN = tr("summary.output_language_en", "Ingelesa");
  const LBL_FR = tr("summary.output_language_fr", "Français");

  // ✅ Guardar + toast
  const labelSaveText = tr("premiumTextCreator.save_button_label", "Gorde");
  const librarySavedMessage = tr("premiumTextCreator.library_saved_toast", "Liburutegian gordeta");

  // ✅ Tooltips existentes del translator (NO nuevas keys)
  const tooltipCopy = t("translator.copy") || "Copiar";
  const tooltipCopied = t("translator.copied") || "Copiado";

  // Ayuda izquierda
  const leftRaw = tr(
    "premiumTextCreator.create_help_left",
    "Hemen agertuko dira igo dituzun testuak edo dokumentuak. Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak…"
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
          <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: BLUE }} />
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

  const canonicalize = (s) =>
    (s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  // ===== Limpieza del panel derecho =====
  const clearRight = () => {
    setResult("");
    setErrorMsg("");
    clearLimit();
    setLoading(false);
    setSavedToLibrary(false);
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
      } else if (e.key === "Escape") {
        if (urlInputOpen) setUrlInputOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, result, urlInputOpen, textValue, urlItems, documents, outputLang]);

  // URLs → reset resultado
  useEffect(() => {
    clearRight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlItems.length]);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

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
    return trimmed.length >= 1 && words.length >= 1;
  }, [textValue]);

  const hasValidInput = textIsValid || urlItems.length > 0 || documents.length > 0;

  // ===== Acciones =====
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

  const handleSaveText = () => {
    if (!result) return;

    const raw = result.trim();
    const firstLine = raw.split("\n")[0];
    const maxTitleLength = 80;
    let title = firstLine;
    if (title.length > maxTitleLength) title = title.slice(0, maxTitleLength).trimEnd() + "…";

    addLibraryDoc({
      kind: "text_creator",
      title,
      content: result,
    });

    setSavedToLibrary(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSavedToLibrary(false), 2000);
  };

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

  // ===== Generar texto =====
  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg("");
    clearLimit();
    setSavedToLibrary(false);

    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const textOk = trimmed.length >= 1 && words.length >= 1;
    const validNow = textOk || urlItems.length > 0 || documents.length > 0;

    if ((textValue || "").length > MAX_CHARS) {
      setCharsLimit();
      setLoading(false);
      return;
    }

    if (!validNow) {
      setErrorMsg(tr("premiumTextCreator.error_need_input", "Añade texto, documentos o URLs antes de crear el texto."));
      setLoading(false);
      return;
    }

    const urlsList = urlItems.map((u) => u.url).join("\n");
    const docNames = documents
      .map((d) => d.file?.name)
      .filter(Boolean)
      .join(", ");

    const langInstruction =
      outputLang === "ES"
        ? "Idioma de salida: español (España)."
        : outputLang === "EN"
        ? "Output language: English."
        : outputLang === "FR"
        ? "Langue de sortie : français."
        : "Irteerako hizkuntza: euskara.";

    const docsInline = documentsText?.length
      ? "\nDOCUMENTOS (testu erauzia / texto extraído):\n" +
        documentsText
          .map((d) => `--- ${d.name} ---\n${(d.text || "").slice(0, 18000)}`)
          .join("\n\n")
      : "";

    const userContent = [
      "Quiero que generes un texto completo a partir de la información proporcionada.",
      "No digas que eres una IA. No expliques el proceso. Entrega directamente el texto final.",
      langInstruction,
      "\nBASE / CONTENIDO:",
      textValue ? `\n${textValue}` : "",
      urlsList ? `\nURLs (extrae solo lo visible; si no puedes, ignóralas):\n${urlsList}` : "",
      docsInline,
    ].join("");

    const systemBase =
      "Eres Euskalia Premium. Redactas textos claros y bien estructurados. " +
      "Devuelves SOLO el texto final, sin comentarios ni títulos extra.";

    const messages = [
      { role: "system", content: systemBase },
      { role: "user", content: userContent },
    ];

    const cacheBase = JSON.stringify({
      textValue,
      urls: urlItems.map((u) => u.url),
      docNames,
      outputLang,
      tool: "premium_text_creator",
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error(tr("premiumTextCreator.error_auth_required", "Necesitas iniciar sesión para usar Premium."));
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
          cacheKey,
          documentsText,
        }),
      });

      // ✅ 429 = límite (daily o chars)
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

      if (!res.ok) {
        if (res.status === 413) {
          setCharsLimit();
          setLoading(false);
          return;
        }
        if (res.status === 401 || res.status === 403) {
          throw new Error(tr("premiumTextCreator.error_auth_required", "Necesitas iniciar sesión para usar Premium."));
        }
        const txt = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();

      const rawText =
        data?.text ??
        data?.content ??
        data?.choices?.[0]?.message?.content ??
        data?.message?.content ??
        "";

      if (!rawText) throw new Error(tr("premiumTextCreator.error_no_text", "No se recibió texto de la API."));

      const cleaned = rawText.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();
      setResult(cleaned);
    } catch (err) {
      setErrorMsg(err?.message || tr("premiumTextCreator.error_generic", "Error creando el texto."));
    } finally {
      setLoading(false);
    }
  };

  // ===== Contador / barra =====
  const charCount = (textValue || "").length;
  const pct = Math.min(100, Math.round((charCount / MAX_CHARS) * 100));
  const nearLimit = charCount > MAX_CHARS * 0.9 && charCount < MAX_CHARS;
  const overLimit = charCount >= MAX_CHARS;

  const barClass = overLimit ? "bg-red-500" : nearLimit ? "bg-amber-500" : "bg-sky-500";

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
          <aside className="h-[600px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden flex flex-col">
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
                onClick={() => {
                  setSourceMode("text");
                  clearRight();
                }}
                showDivider
              />
              <TabBtn
                active={sourceMode === "document"}
                icon={FileIcon}
                label={labelTabDocument}
                onClick={() => {
                  setSourceMode("document");
                  clearRight();
                }}
                showDivider
              />
              <TabBtn
                active={sourceMode === "url"}
                icon={UrlIcon}
                label={labelTabUrl}
                onClick={() => {
                  setSourceMode("url");
                  clearRight();
                }}
                showDivider={false}
              />
            </div>

            {/* Contenido */}
            <div className="flex-1 min-h-0 overflow-hidden p-3">
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
                <div className="flex flex-col h-full min-h-0">
                  <textarea
                    value={textValue}
                    onChange={(e) => {
                      setTextValue(e.target.value);
                      if (errorMsg) setErrorMsg("");
                      if (limitType) clearLimit();
                    }}
                    placeholder={labelEnterText}
                    className="flex-1 min-h-0 w-full resize-none outline-none text-[15px] leading-6 bg-transparent placeholder:text-slate-400 text-slate-800"
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

                  {documents.length > 0 && (
                    <div className="mt-4 flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
                      <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200">
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
                <div className="h-full w-full flex flex-col min-h-0">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                      <UrlIcon className="w-4 h-4" />
                      {labelPasteUrls}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUrlInputOpen(true);
                        clearLimit();
                      }}
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
                        placeholder={tr("premiumTextCreator.paste_urls_placeholder", "Introduce aquí una o más URLs (separadas por línea)")}
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
                    <ul className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden divide-y divide-slate-200 rounded-xl border border-slate-200">
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

          {/* ===== Panel Derecho (SIN tabs de arriba + SIN input inferior) ===== */}
          <section className="relative h-[600px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
            {/* Barra superior SOLO: selector idioma + acciones */}
            <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
              <div className="flex items-center" />
              <div className="flex items-center gap-1">
                {/* Selector de idioma */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                      aria-label={tr("premiumTextCreator.output_language_aria", "Idioma de salida")}
                    >
                      <span className="truncate">
                        {outputLang === "ES" ? LBL_ES : outputLang === "EN" ? LBL_EN : outputLang === "FR" ? LBL_FR : LBL_EUS}
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

                {/* Copiar resultado (arriba) */}
                <button
                  type="button"
                  onClick={() => handleCopy(true)}
                  title={copiedFlash ? tooltipCopied : tooltipCopy}
                  className={`h-9 w-9 flex items-center justify-center ${
                    result ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                  }`}
                  aria-label={copiedFlash ? tooltipCopied : tooltipCopy}
                  disabled={!result}
                >
                  {copiedFlash ? <Check className="w-4 h-4" style={{ color: BLUE }} /> : <Copy className="w-4 h-4" />}
                </button>

                {/* Eliminar texto */}
                <button
                  type="button"
                  onClick={handleClearLeft}
                  title={tr("premiumTextCreator.clear_input", "Eliminar")}
                  className={`h-9 w-9 flex items-center justify-center ${
                    sourceMode === "text" && textValue ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                  }`}
                  aria-label={tr("premiumTextCreator.clear_input", "Eliminar")}
                  disabled={!(sourceMode === "text" && textValue)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ✅ Banner Premium */}
            {limitType && (
              <div className="px-6 pt-4">
                <ProLimitBanner visible={!!limitType} message={limitMsg} />
              </div>
            )}

            {/* Estado inicial */}
            {!loading && !result && !errorMsg && !limitType && (
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

                <div className="absolute left-1/2 -translate-x-1/2 text-center px-6" style={{ top: "40%" }}>
                  <p className="text-sm leading-6 text-slate-600 max-w-xl">{labelHelpRight}</p>
                </div>
              </>
            )}

            {/* Resultado / errores / loader */}
            <div className="w-full">
              {(result || errorMsg || loading) && (
                <div className="px-6 pt-24 pb-[110px] max-w-3xl mx-auto">
                  {errorMsg && (
                    <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                      {errorMsg}
                    </div>
                  )}

                  {result && (
                    <>
                      <article className="prose prose-slate max-w-none">
                        <p className="whitespace-pre-wrap">{result}</p>
                      </article>

                      {(() => {
                        const hasResult = !!result && result.trim().length > 0;
                        if (!hasResult) return null;

                        return (
                          <>
                            {/* Toast verde encima */}
                            {savedToLibrary && (
                              <p className="absolute bottom-[84px] right-6 text-xs text-emerald-600">
                                {librarySavedMessage}
                              </p>
                            )}

                            {/* Controles abajo derecha (MISMA POSICIÓN QUE RESUMIDOR) */}
                            <div className="absolute bottom-4 right-6 flex items-center gap-4">
                              {/* SOLO ICONOS */}
                              <div className="flex items-center gap-4 mr-[20px] translate-y-1">
                                {/* Copiar con tooltip ARRIBA */}
                                <button
                                  type="button"
                                  onClick={() => handleCopy(true)}
                                  aria-label={copiedFlash ? tooltipCopied : tooltipCopy}
                                  className="group relative inline-flex items-center justify-center text-slate-500 hover:text-slate-700 p-2 rounded-md hover:bg-slate-100"
                                >
                                  {copiedFlash ? <Check className="w-5 h-5" style={{ color: BLUE }} /> : <Copy className="w-5 h-5" />}
                                  <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                                    {copiedFlash ? tooltipCopied : tooltipCopy}
                                  </span>
                                </button>
                              </div>

                              {/* BOTÓN VERDE (NO SE MUEVE) */}
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
                        );
                      })()}
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
  );
}