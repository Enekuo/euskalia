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
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/lib/translations";

export default function ProHumanizer() {
  const location = useLocation();

  const { t } = useTranslation?.() || { t: () => null };

  // ✅ FIX: si t devuelve la propia clave (cuando falta traducción), usamos fallback
  const tr = (k, f) => {
    const v = typeof t === "function" ? t(k) : null;
    if (!v) return f;
    if (typeof v === "string" && v.trim() === k) return f;
    return v;
  };

  // ===== Estado =====
  const [sourceMode, setSourceMode] = useState(null); // null | "text" | "document" | "url"
  const [textValue, setTextValue] = useState("");

  // Resultado / carga / error
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Niveles (3)
  const [mode, setMode] = useState("standard"); // basic | standard | advanced

  // Idioma de salida
  const [outputLang, setOutputLang] = useState("eus");

  // Documentos
  const [documents, setDocuments] = useState([]); // [{id,file}]
  const [documentsText, setDocumentsText] = useState([]); // [{id,name,text}]
  const [documentsFiles, setDocumentsFiles] = useState([]); // [{id,name,mime,size,base64,tooLarge?}]
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

  useEffect(() => {
    const incoming = location?.state?.text;
    if (incoming && typeof incoming === "string") {
      const cleaned = incoming.slice(0, 12000);
      setSourceMode("text");
      setTextValue(cleaned);
      setResult("");
      setErrorMsg("");
      setLoading(false);
      setCopiedFlash(false);
      setSavedToLibrary(false);
    }
  }, [location?.state?.text]);

  // ===== Estilos / constantes =====
  const BLUE = "#2563eb";
  const GRAY_TEXT = "#64748b";
  const GRAY_ICON = "#94a3b8";
  const DIVIDER = "#e5e7eb";
  const MAX_CHARS = 12000;
  const MAX_FILE_MB = 12;

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  // ===== Helpers =====
  const hasAnyText = (s) => {
    return String(s || "").trim().length > 0;
  };

  const isRefusal = (s) => {
    const x = String(s || "").trim().toLowerCase();
    if (!x) return false;
    return (
      x.includes("ezin dut") ||
      x.includes("eskaera hori bete") ||
      x.includes("barkatu, baina ezin") ||
      x.includes("lo siento") ||
      x.includes("no puedo ayudar") ||
      x.includes("no puedo cumplir") ||
      (x.includes("sorry") && x.includes("can't"))
    );
  };

  // ✅ Resultado real = texto no vacío
  const hasRealResult = useMemo(() => hasAnyText(result), [result]);

  // ===== Textos (CON claves) =====
  const labelSources = tr("proHumanizer_sources", "Fuentes");
  const labelTabText = tr("proHumanizer_tabText", "Texto");
  const labelTabDocument = tr("proHumanizer_tabDocument", "Documento");
  const labelTabUrl = tr("proHumanizer_tabUrl", "URL");
  const labelEnterText = tr("proHumanizer_enterText", "Escribe o pega tu texto aquí…");

  const labelChooseFileTitle = tr("proHumanizer_chooseFileTitle", "Elige tu archivo o carpeta");
  const labelAcceptedFormats = tr("proHumanizer_acceptedFormats", "Puedes añadir archivos PDF, texto copiado, enlaces web…");
  const labelFolderHint = tr("proHumanizer_folderHint", "Aquí aparecerán tus textos o documentos subidos.");

  const labelPasteUrls = tr("proHumanizer_pasteUrls", "Pegar URLs*");
  const labelAddUrl = tr("proHumanizer_addUrls", "Añadir URLs");
  const labelSaveUrls = tr("proHumanizer_save", "Guardar");
  const labelCancel = tr("proHumanizer_cancel", "Cancelar");
  const labelUrlsNoteVisible = tr("proHumanizer_urlsNoteVisible", "Solo se importará el texto visible del sitio web.");
  const labelUrlsNotePaywalled = tr("proHumanizer_urlsNotePaywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("proHumanizer_remove", "Quitar");

  // ✅ Idiomas (CLAVES COMUNES para TODAS las herramientas)
  const LBL_EUS = tr("summary.output_language_eus", "Euskara");
  const LBL_ES = tr("summary.output_language_es", "Gaztelania");
  const LBL_EN = tr("summary.output_language_en", "Ingelesa");
  const LBL_FR = tr("summary.output_language_fr", "Français");

  const labelGenerateFromSources = tr("proHumanizer_generate", "Humanizar texto");
  const labelHelpRight = tr(
    "proHumanizer_helpRight",
    'Selecciona una fuente (texto, documentos o URLs) y pulsa "Humanizar texto".'
  );

  const labelSaveButton = tr("proHumanizer_saveButton", "Guardar");
  const librarySavedMessage = tr("proHumanizer_savedToLibrary", "Guardado en biblioteca");

  const ariaCopyResult = tr("proHumanizer_copyResultAria", "Copiar resultado");
  const ariaDeleteInput = tr("proHumanizer_deleteInputAria", "Eliminar texto de entrada y resultado");
  const titleCopyResult = tr("proHumanizer_copyResultTitle", "Copiar resultado");
  const titleDeleteInput = tr("proHumanizer_deleteInputTitle", "Eliminar texto de entrada y resultado");
  const titleClearLeft = tr("proHumanizer_clearLeftTitle", "Borrar texto");
  const ariaClearLeft = tr("proHumanizer_clearLeftAria", "Borrar texto");

  const labelUrlTextareaPlaceholder = tr(
    "proHumanizer_urlTextareaPlaceholder",
    "Introduce aquí una o más URLs (separadas por línea)"
  );

  const labelDownload = tr("proHumanizer_download", "Descargar");
  const labelCopy = tr("proHumanizer_copy", "Copiar");
  const labelCopied = tr("proHumanizer_copied", "Copiado");

  // Ayuda izquierda
  const leftTitle = tr("proHumanizer_leftTitle", "Aquí aparecerán tus textos o documentos subidos.");
  const leftBody = tr("proHumanizer_leftBody", "Puedes añadir archivos PDF, texto copiado, enlaces web…");

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

  // ===== Tabs Niveles (derecha) — MISMA LETRA SIEMPRE =====
  const ModeTab = ({ active, label, onClick, showDivider }) => (
    <div className="relative flex items-stretch">
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex items-center h-[44px] px-6 text-[14px] font-medium"
        style={{ color: active ? BLUE : GRAY_TEXT }}
        aria-pressed={active}
        aria-label={label}
      >
        <span>{label}</span>

        {active && (
          <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: BLUE }} />
        )}
      </button>

      {showDivider && <span aria-hidden className="self-center" style={{ width: 1, height: 22, backgroundColor: DIVIDER }} />}
    </div>
  );

  const modeLabels = {
    basic: tr("proHumanizer_modeBasic", "Básico"),
    standard: tr("proHumanizer_modeStandard", "Estándar"),
    advanced: tr("proHumanizer_modeAdvanced", "Avanzado"),
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
        if (hasRealResult) {
          e.preventDefault();
          handleCopy(true);
        }
      } else if (e.key === "Escape") {
        if (urlInputOpen) setUrlInputOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, hasRealResult, urlInputOpen]);

  // URLs / docs / nivel / idioma cambian => limpia derecha
  useEffect(() => {
    clearRight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlItems.length, documents.length, documentsText.length, documentsFiles.length, mode, outputLang]);

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

  const readBase64FromFiles = async (items) => {
    const results = await Promise.all(
      items.map(
        ({ id, file }) =>
          new Promise((resolve) => {
            const name = file?.name || "";
            const mime = file?.type || "application/octet-stream";
            const size = file?.size || 0;

            const mb = size / 1024 / 1024;
            if (mb > MAX_FILE_MB) {
              return resolve({ id, name, mime, size, base64: null, tooLarge: true });
            }

            const fr = new FileReader();
            fr.onload = () => {
              const dataUrl = String(fr.result || "");
              const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : null;
              resolve({ id, name, mime, size, base64, tooLarge: false });
            };
            fr.onerror = () => resolve({ id, name, mime, size, base64: null, tooLarge: false });
            fr.readAsDataURL(file);
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

    const nonText = withIds.filter(({ file }) => {
      const name = (file?.name || "").toLowerCase();
      return !(name.endsWith(".txt") || name.endsWith(".md"));
    });

    if (nonText.length) {
      const base64Items = await readBase64FromFiles(nonText);
      if (base64Items.length) setDocumentsFiles((prev) => [...prev, ...base64Items]);
    }

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
    setDocumentsFiles((prev) => prev.filter((d) => d.id !== id));
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

  // ✅ para documentos: basta con que haya algo de texto (muchos docs son cortos)
  const docsTextHasAny = useMemo(() => {
    return (documentsText || []).some((d) => hasAnyText(d?.text));
  }, [documentsText]);

  const docsFilesIsValid = useMemo(() => {
    return (documentsFiles || []).some((d) => !!d?.base64 && !d?.tooLarge);
  }, [documentsFiles]);

  const hasValidInput = textIsValid || urlItems.length > 0 || docsTextHasAny || docsFilesIsValid;

  // ===== Acciones derecha =====
  const handleCopy = async (flash = false) => {
    if (!hasRealResult) return;
    try {
      await navigator.clipboard.writeText((result || "").trim());
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
    if (!hasRealResult) return;
    try {
      const blob = new Blob([(result || "").trim()], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "euskalia-humanizado.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {}
  };

  const handleSaveToLibrary = () => {
    if (!hasRealResult) return;

    const now = new Date();
    const createdAt = now.toISOString();
    const createdAtLabel = now
      .toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
      .replace(".", "");

    const titleFromText = (textValue || "").trim().slice(0, 80);

    addLibraryDoc({
      kind: "humanizer",
      title: titleFromText || "Humanizado",
      content: (result || "").trim(),
      createdAt,
      createdAtLabel,
    });

    setSavedToLibrary(true);
    setTimeout(() => setSavedToLibrary(false), 2000);
  };

  useEffect(() => {
    setSavedToLibrary(false);
  }, [hasRealResult]);

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

    if ((textValue || "").length > MAX_CHARS) {
      setErrorMsg(tr("proHumanizer_errorMaxChars", "Has superado el límite de caracteres permitido."));
      setLoading(false);
      return;
    }

    const tooLargeCount = (documentsFiles || []).filter((d) => d?.tooLarge).length;
    if (tooLargeCount > 0) {
      setErrorMsg(
        tr(
          "proHumanizer_errorFileTooLarge",
          "Uno o más archivos son demasiado grandes para procesarlos aquí. Prueba con un archivo más pequeño."
        )
      );
      setLoading(false);
      return;
    }

    // ✅ Caso clave: has subido documento pero NO hay texto extraído ni base64 válido
    const userHasDocs = documents.length > 0;
    const canReadDocs = docsTextHasAny || docsFilesIsValid;

    if (userHasDocs && !canReadDocs && !textOk && urlItems.length === 0) {
      setErrorMsg(
        tr(
          "proHumanizer_errorDocUnreadable",
          "No se ha podido leer el documento. Prueba con otro archivo o pega el texto directamente."
        )
      );
      setLoading(false);
      return;
    }

    const validNow = textOk || urlItems.length > 0 || docsTextHasAny || docsFilesIsValid;

    if (!validNow) {
      setErrorMsg(tr("proHumanizer_errorNeedInput", "Añade texto suficiente, URLs o documentos antes de humanizar."));
      setLoading(false);
      return;
    }

    const urlsList = urlItems.map((u) => u.url).join("\n");

    const docsInline = (documentsText || []).length
      ? "\nDOCUMENTOS (texto extraído):\n" +
        documentsText
          .map((d) => `--- ${d.name} ---\n${(d.text || "").slice(0, 12000)}`)
          .join("\n\n")
      : "";

    const docsBinaryHint = (documentsFiles || []).length
      ? `\nDOCUMENTOS ADJUNTOS (para extracción):\n` +
        documentsFiles.map((d) => `--- ${d.name} (${Math.round((d.size || 0) / 1024)} KB) ---`).join("\n")
      : "";

    // ✅ + FR
    const langInstruction =
      outputLang === "es"
        ? "Idioma de salida: español (ISO: es). Escribe todo en español."
        : outputLang === "en"
        ? "Output language: English (ISO: en). Write everything in English."
        : outputLang === "fr"
        ? "Langue de sortie : français (ISO : fr). Rédige tout en français."
        : "Irteerako hizkuntza: euskara (ISO: eu). Idatzi guztia euskaraz.";

    const levelRule =
      mode === "basic"
        ? `
NIVEL BÁSICO (retoque mínimo):
- Objetivo: quitar el "sonido IA" SIN reescribir mucho.
- Mantén casi la misma estructura y longitud (±10%).
- Cambia solo lo necesario: conectores, algún sinónimo, orden leve de 1-2 frases.
- No añadas ejemplos, no metas explicaciones, no amplíes.
- PROHIBIDO:
  - Frases típicas de IA: "en conclusión", "es importante destacar", "cabe señalar", "por ende".
  - Sonar demasiado perfecto o demasiado formal.
- Resultado: debe parecer escrito por una persona, pero casi igual al original.
`.trim()
        : mode === "advanced"
        ? `
NIVEL AVANZADO (humanización fuerte, se nota):
- Objetivo: que parezca 100% humano y nada robótico.
- Puedes reestructurar párrafos, unir/dividir frases y cambiar el orden de ideas SIEMPRE manteniendo significado.
- Cambia vocabulario y ritmo con libertad (sin inventar datos).
- Reduce patrones repetitivos (mismos inicios de frase, mismos conectores).
- Añade naturalidad (pausas, ritmo, transiciones suaves) sin exagerar.
- PROHIBIDO:
  - Inventar hechos, cifras o información nueva.
  - Cambiar intención, tono o mensaje.
  - Meter listas si el original no las tenía (a no ser que sea imprescindible).
- Resultado: debe sonar claramente distinto y humano, manteniendo lo mismo que dice.
`.trim()
        : `
NIVEL ESTÁNDAR (equilibrado, el mejor por defecto):
- Objetivo: humanizar de forma clara sin pasarse.
- Reescribe lo suficiente para que se note, pero sin cambiar demasiado el contenido.
- Ajusta ritmo, conectores y orden de frases para que fluya mejor.
- Mantén longitud parecida (±20%).
- Evita expresiones robóticas y frases demasiado "perfectas".
- PROHIBIDO:
  - Inventar datos o añadir ideas nuevas.
  - Volverte académico o demasiado formal.
- Resultado: natural, humano y creíble.
`.trim();

    const formattingRules =
      "Devuelve SOLO el texto final humanizado (sin introducciones tipo 'Aquí tienes...'). " +
      "No inventes datos. Mantén el idioma solicitado.";

    const userContent = [
      "Humaniza el contenido para que suene escrito por una persona real, sin perder el significado.",
      textValue ? `\nTEXTO:\n${textValue}` : "",
      urlsList ? `\nURLs (si no puedes extraer texto, ignóralas):\n${urlsList}` : "",
      docsInline,
      docsBinaryHint,
      `\n${levelRule}`,
      `\n${formattingRules}`,
      `\n${langInstruction}`,
    ].join("");

    const systemBase =
      "Eres un asistente experto en humanizar textos. " +
      "Tu objetivo es que suenen naturales y humanos, sin inventar hechos ni añadir información.";

    const messages = [
      { role: "system", content: systemBase },
      { role: "user", content: userContent },
    ];

    const cacheBase = JSON.stringify({
      textValue,
      urls: urlItems.map((u) => u.url),
      docNames: documents.map((d) => d.file?.name).filter(Boolean).join(", "),
      level: mode,
      outputLang,
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          mode: "humanize",
          humanizeLevel: mode,
          outputLang,
          cacheKey,
          documentsText,
          documentsFiles,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(tr("proHumanizer_errorRateLimit", "Has alcanzado el límite de peticiones. Inténtalo más tarde."));
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

      if (!rawText) throw new Error(tr("proHumanizer_errorNoApiText", "No se recibió texto de la API."));

      const cleaned = String(rawText || "")
        .replace(/\r/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      // ✅ Si el modelo rechaza, lo tratamos como error y NO como resultado
      if (isRefusal(cleaned)) {
        setResult("");
        setErrorMsg(
          tr(
            "proHumanizer_errorRefusal",
            "No se pudo procesar el contenido. Prueba con otro archivo o pega el texto directamente."
          )
        );
      } else {
        setResult(cleaned);
      }
    } catch (err) {
      setErrorMsg(err.message || tr("proHumanizer_errorGeneric", "Error humanizando el texto."));
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

                  {/* ✅ LISTA CON SCROLL INTERNO */}
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
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-sky-300 bg-sky-50 text-sky-700 hover:bg-slate-100 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40 shadow-sm transition-colors"
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
            {/* Barra superior */}
            <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
              <div className="flex items-center gap-0 -ml-2">
                <ModeTab active={mode === "basic"} label={modeLabels.basic} onClick={() => setMode("basic")} showDivider />
                <ModeTab
                  active={mode === "standard"}
                  label={modeLabels.standard}
                  onClick={() => setMode("standard")}
                  showDivider
                />
                <ModeTab active={mode === "advanced"} label={modeLabels.advanced} onClick={() => setMode("advanced")} />
              </div>

              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                      aria-label={tr("proHumanizer_outputLanguageAria", "Idioma de salida")}
                    >
                      <span className="truncate">
                        {outputLang === "es"
                          ? LBL_ES
                          : outputLang === "en"
                          ? LBL_EN
                          : outputLang === "fr"
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

                    {/* ✅ FR */}
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

                <button
                  type="button"
                  onClick={() => handleCopy(true)}
                  title={titleCopyResult}
                  className={`h-9 w-9 flex items-center justify-center ${
                    hasRealResult ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                  }`}
                  aria-label={ariaCopyResult}
                  disabled={!hasRealResult}
                >
                  {copiedFlash ? <Check className="w-4 h-4" style={{ color: BLUE }} /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={handleClearLeft}
                  title={titleDeleteInput}
                  className={`h-9 w-9 flex items-center justify-center ${
                    sourceMode === "text" && textValue
                      ? "text-slate-600 hover:text-slate-800"
                      : "text-slate-300 cursor-not-allowed"
                  }`}
                  aria-label={ariaDeleteInput}
                  disabled={!(sourceMode === "text" && textValue)}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ===== CONTENIDO SCROLLEABLE (cuando sea necesario) ===== */}
            <div className="absolute inset-x-0 top-11 bottom-0 overflow-y-auto">
              {!loading && !hasRealResult && !errorMsg && (
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

              {(hasRealResult || errorMsg || loading) && (
                <div className="px-6 pt-20 pb-28 max-w-3xl mx-auto">
                  {errorMsg && (
                    <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                      {errorMsg}
                    </div>
                  )}

                  {hasRealResult && (
                    <div className="flex flex-col gap-4">
                      <article className="prose prose-slate max-w-none">
                        <p className="whitespace-pre-wrap">{(result || "").trim()}</p>
                      </article>
                    </div>
                  )}

                  {loading && !hasRealResult && (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-4 bg-slate-200 rounded" />
                      <div className="h-4 bg-slate-200 rounded w-11/12" />
                      <div className="h-4 bg-slate-200 rounded w-10/12" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Barra inferior: copiar, descargar, guardar — SOLO si hay resultado REAL */}
            {hasRealResult && (
              <div className="absolute bottom-4 right-6 flex flex-col items-end gap-1 text-slate-500">
                {savedToLibrary && <p className="text-xs text-emerald-600 mb-1">{librarySavedMessage}</p>}

                <div className="flex items-center gap-4">
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
