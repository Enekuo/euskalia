import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Globe, SearchCheck, PenLine, FileText, FileDown, File as FileIcon, Link2 as UrlIcon, Plus, X, Copy, Trash, Check, Type, Mail } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import BenefitsSection from "@/components/BenefitsSection";
import ToolsSection from "@/components/ToolsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import UpgradeBanner from "@/components/UpgradeBanner";
import * as mammoth from "mammoth/mammoth.browser";

export default function Resumen() {
  const { t } = useTranslation?.() || { t: () => null };

  // ✅ FIX: si t devuelve la propia clave (cuando falta traducción), usamos fallback
const tr = (k, f) => {
  const v = typeof t === "function" ? t(k) : null;

  if (!v) return f;

  if (typeof v === "string") {
    if (v.trim() === k) return f;
    return v;
  }

  if (typeof v === "object") {
    return v.ES || v.EUS || v.EN || v.FR || f;
  }

  return f;
};


  const navigate = useNavigate();

  const labelToolTranslator = tr("toolsMenu.translatorTitle", "Itzultzailea");
  const labelToolSummarizer = tr("toolsMenu.summaryTitle", "Laburtzailea");
  const labelToolCorrector = tr("toolsMenu.correctorTitle", "Corrector");
  const labelToolParaphraser = tr("toolsMenu.paraphraserTitle", "Parafraseatzailea");
  const labelToolTextCreator = tr("toolsMenu.textCreatorTitle", "Testu-sortzailea");
  const labelToolEmailCreator = tr("toolsMenu.emailCreatorTitle", "Email-sortzailea");


  // ===== Estado =====
  const [sourceMode, setSourceMode] = useState(null); // null | "text" | "document" | "url"
  const [textValue, setTextValue] = useState("");

  // Resultado / carga / error
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorKind, setErrorKind] = useState(null); // null | "limit"
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  

  // Longitud del resumen
  const [summaryLength, setSummaryLength] = useState("breve"); // "breve" | "medio" | "detallado"

  // Idioma de salida (ES/EUS/EN/FR) — por defecto Euskera
  const [outputLang, setOutputLang] = useState("eus");

  // Track “resumen desactualizado”
  const [lastSummarySig, setLastSummarySig] = useState(null);
  const [isOutdated, setIsOutdated] = useState(false);

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

  // ===== Estilos / constantes =====
  const BLUE = "#2563eb";
  const GRAY_TEXT = "#64748b";
  const GRAY_ICON = "#94a3b8";
  const DIVIDER = "#e5e7eb";
  const MAX_CHARS = 50000;

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  // ===== i18n =====
  const labelSources = tr("summary.sources_title", "Fuentes");
  const labelTabText = tr("summary.sources_tab_text", "Texto");
  const labelTabDocument = tr("summary.sources_tab_document", "Documento");
  const labelTabUrl = tr("summary.sources_tab_url", "URL");
  const labelEnterText = tr("summary.enter_text_here_full", "Escribe o pega tu texto aquí…");
  const labelChooseFileTitle = tr("summary.choose_file_title", "Elige tu archivo o carpeta");
  const labelAcceptedFormats = tr("summary.accepted_formats", "Puedes añadir archivos PDF, texto copiado, enlaces web…");
  const labelFolderHint = tr("summary.folder_hint", "Aquí aparecerán tus textos o documentos subidos.");
  const labelPasteUrls = tr("summary.paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("summary.add_url", "Añadir URLs");
  const labelSaveUrls = tr("summary.save_urls", "Guardar");
  const labelCancel = tr("summary.cancel", "Cancelar");
  const labelUrlsNoteVisible = tr("summary.urls_note_visible", "Solo se importará el texto visible del sitio web.");
  const labelUrlsNotePaywalled = tr("summary.urls_note_paywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("summary.remove", "Quitar");
  const labelGenerateFromSources = tr("summary.generate_from_sources", "Laburpena sortu");
  const labelHelpRight = tr(
    "summary.create_help_right",
    "Hautatu iturri bat (testua, dokumentuak edo URLak) eta sakatu “Laburpena sortu”."
  );

  // ✅ SOLO 1 DOC
  const labelOnlyOneDoc = tr("summary.only_one_document", "Solo se admite un documento por resumen.");

  // ✅ DOC antiguo no soportado
  const labelDocNotSupported = tr(
    "summary.doc_not_supported",
    "El formato .doc (Word antiguo) no se puede leer. Sube un .docx o pega el texto."
  );

  // Longitud
  const LBL_SHORT = tr("summary.length_short", "Breve");
  const LBL_MED = tr("summary.length_medium", "Medio");
  const LBL_LONG = tr("summary.length_long", "Detallado");

  // Etiquetas de idioma
  const LBL_EUS = tr("summary.output_language_eus", "Euskara");
  const LBL_ES = tr("summary.output_language_es", "Gaztelania");
  const LBL_EN = tr("summary.output_language_en", "Ingelesa");
  const LBL_FR = tr("summary.output_language_fr", "Français");

  // Ayuda izquierda
  const leftRaw = tr(
    "summary.create_help_left",
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
  <span
    aria-hidden
    className="absolute right-0 top-1/2 -translate-y-1/2"
    style={{ width: 1, height: 22, backgroundColor: DIVIDER }}
  />
)}
    </div>
  );

  const LengthTab = ({ active, label, onClick, showDivider }) => (
    <div className="relative flex items-stretch">
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex items-center gap-2 h-[44px] px-3 text-[14px] font-medium"
        style={{ color: active ? BLUE : GRAY_TEXT }}
        aria-pressed={active}
        aria-label={label}
      >
        <span className="truncate">{label}</span>
        {active && (
          <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: BLUE }} />
        )}
      </button>
      {showDivider && <span aria-hidden className="self-center" style={{ width: 1, height: 22, backgroundColor: DIVIDER }} />}
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

  const enforceLength = (text, mode) => {
    const config = {
      breve: { maxWords: 90, maxSentences: 3 },
      medio: { maxWords: 180, maxSentences: 6 },
      detallado: { maxWords: 260, maxSentences: 10 },
    };
    const { maxWords, maxSentences } = config[mode] || config.breve;

    let t = (text || "")
      .replace(/\r/g, "")
      .replace(/\n+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();

    const sentences = t.split(/(?<=[.!?…])\s+/).filter(Boolean);
    let clipped = sentences.slice(0, maxSentences).join(" ");

    const words = clipped.split(/\s+/);
    if (words.length > maxWords) {
      clipped = words.slice(0, maxWords).join(" ").replace(/[.,;:–—-]*$/, "") + "…";
    }
    return clipped;
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
    setErrorKind(null);
    setDailyLimitReached(false);
    setIsOutdated(false);
    setLoading(false);
  };

  const handleLengthChange = (mode) => {
    if (mode === summaryLength) return;
    setSummaryLength(mode);
    clearRight();
  };

  // ===== Reglas UX =====
  useEffect(() => {
    const sig = canonicalize(textValue);
    if (sig.length === 0) {
      setIsOutdated(false);
      return;
    }
    if (lastSummarySig && sig !== lastSummarySig) {
      setIsOutdated(true);
    } else {
      setIsOutdated(false);
    }
  }, [textValue, lastSummarySig]);

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
  }, [loading, result, urlInputOpen, textValue, urlItems, documents, summaryLength, outputLang]);

  // ===== Documentos =====
  const readTextFromFiles = async (items) => {
    const results = await Promise.all(
      items.map(async ({ id, file }) => {
        const name = file?.name || "";
        const lower = name.toLowerCase();

        const isTxt = lower.endsWith(".txt");
        const isMd = lower.endsWith(".md");
        const isDocx = lower.endsWith(".docx");
        const isDoc = lower.endsWith(".doc");

        if (isDoc) {
          return { id, name, text: "" , __error: "DOC_NOT_SUPPORTED" };
        }

        if (isTxt || isMd) {
          return await new Promise((resolve) => {
            const fr = new FileReader();
            fr.onload = () => resolve({ id, name, text: String(fr.result || "") });
            fr.onerror = () => resolve(null);
            fr.readAsText(file, "utf-8");
          });
        }

        if (isDocx) {
          try {
            const arrayBuffer = await file.arrayBuffer();
            const { value } = await mammoth.extractRawText({ arrayBuffer });
            const clean = String(value || "")
              .replace(/\r/g, "")
              .replace(/\n{3,}/g, "\n\n")
              .trim();
            return { id, name, text: clean };
          } catch {
            return null;
          }
        }

        return null;
      })
    );

    // Si hay DOC antiguo, lo avisamos
    const hasDocError = results?.some((r) => r && r.__error === "DOC_NOT_SUPPORTED");
    if (hasDocError) {
      setErrorMsg(labelDocNotSupported);
      setErrorKind(null);
      setDailyLimitReached(false);
      setResult("");
      setIsOutdated(false);
    }

    return results.filter((r) => r && !r.__error);
  };

  const triggerPick = () => fileInputRef.current?.click();

  const addFiles = async (list) => {
    if (!list?.length) return;

    // ✅ SOLO 1 DOCUMENTO: si ya hay uno, no dejamos añadir otro
    if (documents.length >= 1) {
      setErrorMsg(labelOnlyOneDoc);
      setErrorKind(null);
      setDailyLimitReached(false);
      setResult("");
      setIsOutdated(false);
      return;
    }

    const arr = Array.from(list);

    // ✅ si intentan meter varios, cogemos SOLO el primero y avisamos
    if (arr.length > 1) {
      setErrorMsg(labelOnlyOneDoc);
      setErrorKind(null);
      setDailyLimitReached(false);
    }

    const file = arr[0];
    const withIds = [{ id: crypto.randomUUID(), file }];

    setDocuments((prev) => [...prev, ...withIds]);

    const texts = await readTextFromFiles(withIds);
    if (texts.length) setDocumentsText((prev) => [...prev, ...texts]);

    setResult("");
    setErrorKind(null);
    setDailyLimitReached(false);
    setIsOutdated(false);
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
    setResult("");
    setErrorMsg("");
    setErrorKind(null);
    setDailyLimitReached(false);
    setIsOutdated(false);
  };

  // ===== URLs =====
  const addUrlsFromTextarea = () => {
    const parsed = parseUrlsFromText(urlsTextarea);
    if (!parsed.length) return;
    const newItems = parsed.map((p) => ({ id: crypto.randomUUID(), url: p.href, host: p.host }));
    setUrlItems((prev) => [...prev, ...newItems]);
    setUrlsTextarea("");
    setUrlInputOpen(false);
  };
  const removeUrl = (id) => setUrlItems((prev) => prev.filter((u) => u.id !== id));

  useEffect(() => {
    setResult("");
    setErrorMsg("");
    setErrorKind(null);
    setDailyLimitReached(false);
    setIsOutdated(false);
  }, [urlItems]);

  // ===== Validación =====
  const textIsValid = useMemo(() => {
    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    return trimmed.length >= 20 && words.length >= 5;
  }, [textValue]);

  // ✅ CAMBIO: para documentos, con que haya documentos subidos ya es válido
  const docsTextHasAny = useMemo(() => {
    return documents.length > 0 || (documentsText || []).some((d) => String(d?.text || "").trim().length > 0);
  }, [documents, documentsText]);

  // ✅ input válido REAL
  const hasValidInput = textIsValid || urlItems.length > 0 || docsTextHasAny;

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

  // ===== Helper: cache key (sha-256) para KV =====
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
    setErrorKind(null);
    setDailyLimitReached(false);

    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const textOk = trimmed.length >= 20 && words.length >= 5;

    const validNow = textOk || urlItems.length > 0 || docsTextHasAny;

    const docsChars = (documentsText || []).reduce((acc, d) => acc + ((d?.text || "").length), 0);

    if ((textValue || "").length > MAX_CHARS) {
      setErrorKind("limit");
      setDailyLimitReached(false);
      setLoading(false);
      return;
    }

    if (docsChars > MAX_CHARS) {
      setErrorKind("limit");
      setDailyLimitReached(false);
      setLoading(false);
      return;
    }

    if (!validNow) {
      setErrorMsg(tr("summary.error_need_input", "Añade texto suficiente, URLs o documentos antes de generar el resumen."));
      setLoading(false);
      return;
    }

    const urlsList = urlItems.map((u) => u.url).join("\n");
    const docNames = documents
      .map((d) => d.file?.name)
      .filter(Boolean)
      .join(", ");

    const onlyText = textOk && urlItems.length === 0 && documents.length === 0;
    const wordCount = words.length;
    const strictExtractive = onlyText && wordCount <= 120;


const formattingRules =
  summaryLength === "breve"
    ? "Devuelve un resumen claro, compacto y profesional en un único párrafo fluido. No uses listas, viñetas, títulos ni numeraciones."
    : summaryLength === "medio"
    ? "Devuelve un resumen claro y profesional usando 2 o 3 párrafos naturales si el contenido lo necesita. No uses listas, viñetas, títulos ni numeraciones."
    : "Devuelve un resumen claro y profesional usando tantos párrafos naturales como sean necesarios para mantener buena legibilidad. No uses listas, viñetas, títulos ni numeraciones.";


const outputLanguageName =
  outputLang === "eus"
    ? "euskera"
    : outputLang === "es"
    ? "español"
    : outputLang === "en"
    ? "inglés"
    : "francés";

const langInstruction =
  `Responde SIEMPRE en ${outputLanguageName}, aunque el contenido de entrada esté en otro idioma. El idioma del resultado lo decide el selector de la herramienta, no el idioma de la fuente.`;


    const lengthRule =
      summaryLength === "breve"
        ? "Extensión: 2–3 frases, ~70–90 palabras."
        : summaryLength === "medio"
        ? "Extensión: 4–6 frases, ~120–180 palabras."
        : "Extensión: 8–10 frases, ~200–260 palabras.";

    const docsInline = documentsText?.length
      ? "\nDOCUMENTOS (testu erauzia / texto extraído):\n" +
        documentsText
          .map((d) => `--- ${d.name} ---\n${(d.text || "")}`)
          .join("\n\n")
      : "";

    const userContent = [
      strictExtractive
        ? "Resume exclusivamente con la información literal del TEXTO. Prohibido añadir conocimiento externo o inferencias. Si el TEXTO no aporta suficiente contenido, responde exactamente: 'El texto es demasiado breve para resumir con fidelidad.'"
        : "Quiero un resumen profesional del siguiente contenido.",
      textValue ? `\nTEXTO:\n${textValue}` : "",
      urlsList ? `\nURLs (extrae solo lo visible; si no puedes, ignóralas):\n${urlsList}` : "",
      docsInline,
      
      `\nREQUISITO DE FORMATO: ${formattingRules}`,
      `\nREQUISITO DE LONGITUD (${summaryLength.toUpperCase()}): ${lengthRule}`,
      `\n${langInstruction}`,
    ].join("");


const systemBase =
  "Euskalia zara. Zure lana da emandako edukia laburtzea eta emaitza beti ${outputLanguageName} hizkuntzan ematea. " +
  "Eres Euskalia. Tu trabajo es resumir el contenido proporcionado y devolver el resultado siempre en ${outputLanguageName}. " +
  "Arau zorrotzak / Reglas estrictas: " +
  "1) Detecta automáticamente el idioma del contenido solo para entenderlo correctamente. " +
  "2) Responde SIEMPRE en ${outputLanguageName}. El selector de idioma manda sobre el idioma de la fuente. " +
  
  (summaryLength === "breve"
  ? "3) Emaitza paragrafo bakar trinko eta naturalean. "
  : summaryLength === "medio"
  ? "3) Erabili 2 edo 3 paragrafo natural edukia luzea bada. "
  : "3) Erabili behar adina paragrafo natural irakurgarritasun ona mantentzeko. ") +

(summaryLength === "breve"
  ? "4) Usa un único párrafo compacto y natural. "
  : summaryLength === "medio"
  ? "4) Usa 2 o 3 párrafos naturales si el contenido lo necesita. "
  : "4) Usa tantos párrafos naturales como sean necesarios para mantener buena legibilidad. ") +
  
  "5) Ez asmatu daturik: ez gehitu data, izen edo gertaerarik agertzen ez bada. " +
  "6) No inventes datos ni añadas información externa. " +
  "7) Zenbakiak eta izen propioak BERE-BEREAN mantendu. " +
  "8) Si el idioma detectado es euskera, escribe en euskera natural, correcto y profesional, evitando calcos artificiales. " +
  "9) Ulermena hobetzeko, sarrerako testuko akats ortografiko/gramatikalak ZUZENDU ISILIK, baina ez aldatu esanahia.";

    const systemStrict =
      outputLang === "eus"
        ? (
          systemBase +
          " Murriztu irteera zorrotz-mehatz sarreran dagoen informaziora. " +
          "Ez sartu kanpoko ezagutzarik, ez inferentziarik. " +
          "Sarreran nahikoa eduki ez badago, erantzun hitzez-hitz: 'Testua laburregia da fideltasunez laburtzeko.'"
        )
        : (
          systemBase +
          " Restringe la salida estrictamente a la información presente en el texto de entrada. " +
          "No introduzcas fechas, nombres propios o hechos que no aparezcan explícitamente."
        );

    const messages = [
      { role: "system", content: strictExtractive ? systemStrict : systemBase },
      { role: "user", content: userContent },
    ];

    const cacheBase = JSON.stringify({
      textValue,
      urls: urlItems.map((u) => u.url),
      docNames,
      summaryLength,
      outputLang,
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const res = await fetch("/api/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "summary",
          messages,
          length: summaryLength,
          cacheKey,
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
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();

      const rawText =
        data?.text ?? data?.content ?? data?.choices?.[0]?.message?.content ?? data?.message?.content ?? "";

      if (!rawText) throw new Error(tr("summary.error_no_api_text", "No se recibió texto de la API."));

      const cleaned = rawText
        .replace(/^\s*[-–—•]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        .replace(/\r/g, "")
        .replace(/\n+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();

      if (/^el texto es demasiado breve para resumir con fidelidad\.?$/i.test(cleaned)) {
        setResult("El texto es demasiado breve para resumir con fidelidad.");
        setLastSummarySig(canonicalize(textValue));
        setIsOutdated(false);
        setLoading(false);
        return;
      }

      if (/^testua laburregia da fideltasunez laburtzeko\.?$/i.test(cleaned)) {
        setResult("Testua laburregia da fideltasunez laburtzeko.");
        setLastSummarySig(canonicalize(textValue));
        setIsOutdated(false);
        setLoading(false);
        return;
      }

      const clipped = enforceLength(cleaned, summaryLength);

      setResult(clipped);
      setLastSummarySig(canonicalize(textValue));
      setIsOutdated(false);
    } catch (err) {
      setErrorMsg(err.message || tr("summary.error_generic", "Error generando el resumen."));
    } finally {
      setLoading(false);
    }
  };

// ===== Contador / barra =====
const docsChars = (documentsText || []).reduce(
  (total, d) => total + String(d?.text || "").length,
  0
);

const urlsChars = (urlItems || []).reduce(
  (total, u) => total + String(u?.url || "").length,
  0
);

const charCount =
  String(textValue || "").length +
  docsChars +
  urlsChars;

const pct = Math.min(100, Math.round((charCount / MAX_CHARS) * 100));
const nearLimit = charCount >= MAX_CHARS * 0.9 && charCount < MAX_CHARS;
const overLimit = charCount > MAX_CHARS;

const barClass = overLimit
  ? "bg-red-500"
  : nearLimit
  ? "bg-amber-500"
  : "bg-sky-500";


return (
  <>
    <section className="w-full bg-[#F4F8FF] pt-10 pb-24">
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="relative">
          <div className="hidden md:flex flex-col items-center gap-2 pt-2 w-14 absolute -left-24 -top-3">

            <button
              type="button"
              onClick={() => navigate("/")}
              title={labelToolTranslator}
              className="w-11 h-11 mt-5 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition shadow-sm"
            >
              <Globe className="w-5 h-5 text-slate-700" />
            </button>

            <div className="text-[11px] font-medium text-slate-700 text-center leading-4">
              {labelToolTranslator}
            </div>

            <button
              type="button"
              aria-current="page"
              title={labelToolSummarizer}
              className="w-11 h-11 mt-2 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-center shadow-sm"
            >
              <FileText className="w-5 h-5 text-blue-600" />
            </button>

            <div className="text-[11px] font-medium text-slate-700 text-center leading-4">
              {labelToolSummarizer}
            </div>

            <button
              type="button"
              onClick={() => navigate("/corrector")}
              title={labelToolCorrector}
              className="w-11 h-11 mt-2 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition shadow-sm"
            >
              <SearchCheck className="w-5 h-5 text-slate-700" />
            </button>

            <div className="text-[11px] font-medium text-slate-700 text-center leading-4">
              {labelToolCorrector}
            </div>

            <button
              type="button"
              onClick={() => navigate("/parafraseador")}
              title={labelToolParaphraser}
              className="w-11 h-11 mt-2 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition shadow-sm"
            >
              <PenLine className="w-5 h-5 text-slate-700" />
            </button>

            <div className="text-[11px] font-medium text-slate-700 text-center leading-4">
              {labelToolParaphraser}
            </div>

            <button
              type="button"
              onClick={() => navigate("/creador-texto")}
              title={labelToolTextCreator}
              className="w-11 h-11 mt-2 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition shadow-sm"
            >
              <Type className="w-5 h-5 text-slate-700" />
            </button>

            <div className="text-[11px] font-medium text-slate-700 text-center leading-4">
              {labelToolTextCreator}
            </div>

            <button
              type="button"
              onClick={() => navigate("/creador-email")}
              title={labelToolEmailCreator}
              className="w-11 h-11 mt-2 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition shadow-sm"
            >
              <Mail className="w-5 h-5 text-slate-700" />
            </button>

            <div className="text-[11px] font-medium text-slate-700 text-center leading-4">
              {labelToolEmailCreator}
            </div>

          </div>


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
                  <TabBtn active={sourceMode === "text"} icon={FileText} label={labelTabText} onClick={() => setSourceMode("text")} showDivider />
                  <TabBtn active={sourceMode === "document"} icon={FileIcon} label={labelTabDocument} onClick={() => setSourceMode("document")} showDivider />
                  <TabBtn active={sourceMode === "url"} icon={UrlIcon} label={labelTabUrl} onClick={() => setSourceMode("url")} showDivider={false} />
                </div>

                {/* Contenido */}
                <div className="flex-1 overflow-hidden p-3 min-h-0">
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
                        className="w-full h-[360px] md:h-[520px] resize-none outline-none text-[15px] leading-6 bg-transparent placeholder:text-slate-400 text-slate-800"
                        aria-label={labelTabText}
                      />
                      {/* Contador + barra */}
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
                      className={`h-full w-full flex flex-col relative min-h-0 ${dragActive ? "ring-2 ring-sky-400 rounded-2xl" : ""}`}
                      onDragEnter={onDragEnter}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".docx,.txt,.md,.pdf,.ppt,.pptx,.doc,.csv,.json,.xml,.epub,.vtt,.srt,.rtf,.html,.htm,.jpg,.jpeg,.png"
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
                        <div className="mt-4 flex-1 min-h-0">
                          <ul className="h-full overflow-y-auto divide-y divide-slate-200 rounded-xl border border-slate-200 overflow-x-hidden">
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
                            placeholder={tr("summary.paste_urls_placeholder", "Introduce aquí una o más URLs (separadas por línea)")}
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

              {/* ===== Panel Derecho ===== */}
              <section className="h-[600px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px flex flex-col">
                {/* Barra superior con tabs + selector + acciones (✅ FIX MÓVIL) */}
                <div className="min-h-[44px] sm:h-11 flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-4 py-2 sm:py-0 gap-2 border-b border-slate-200 bg-slate-50/60">
                  <div className="flex items-center gap-2 overflow-x-auto sm:overflow-visible">
                    <LengthTab active={summaryLength === "breve"} label={LBL_SHORT} onClick={() => handleLengthChange("breve")} showDivider />
                    <LengthTab active={summaryLength === "medio"} label={LBL_MED} onClick={() => handleLengthChange("medio")} showDivider />
                    <LengthTab active={summaryLength === "detallado"} label={LBL_LONG} onClick={() => handleLengthChange("detallado")} />
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="h-9 min-w-[120px] sm:min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800
                                     flex items-center justify-between hover:border-slate-400
                                     shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                          aria-label="Idioma de salida"
                        >
                          <span className="truncate">
                            {outputLang === "eus" ? LBL_EUS : outputLang === "es" ? LBL_ES : outputLang === "en" ? LBL_EN : LBL_FR}
                          </span>
                          <svg className="w-4 h-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                          </svg>
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="rounded-xl border border-slate-200 shadow-lg bg-white p-1 w-[200px]">
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

                    <button
                      type="button"
                      onClick={() => handleCopy(true)}
                      title="Copiar resultado"
                      className={`h-9 w-9 flex items-center justify-center ${
                        result ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                      }`}
                      aria-label="Copiar resultado"
                      disabled={!result}
                    >
                      {copiedFlash ? <Check className="w-5 h-5" style={{ color: BLUE }} /> : <Copy className="w-5 h-5" />}
                    </button>

                    <button
                      type="button"
                      onClick={handleClearLeft}
                      title="Eliminar texto de la izquierda y resultado"
                      className={`h-9 w-9 flex items-center justify-center ${
                        sourceMode === "text" && textValue ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                      }`}
                      aria-label="Eliminar texto de la izquierda y resultado"
                      disabled={!(sourceMode === "text" && textValue)}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* ✅ Zona de contenido con scroll interno (barra lateral) */}
                <div className="h-[520px] overflow-y-auto">
                  {!loading && !result && !errorKind && (
                    <div className="relative h-full">
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

                      <div className="absolute left-1/2 -translate-x-1/2 text-center px-3 sm:px-6" style={{ top: "40%" }}>
                        <p className="text-sm leading-6 text-slate-600 max-w-xl">{labelHelpRight}</p>
                      </div>
                    </div>
                  )}

                  {(result || errorMsg || loading || errorKind) && (
                    <>
                      {/* ✅ LIMIT centrado */}
                      {errorKind === "limit" ? (
                        <div className="h-full w-full relative flex items-center justify-center px-3 sm:px-6">
                          <div className="w-full max-w-3xl space-y-3">
                            <UpgradeBanner />
                          </div>

                          <div className="absolute left-6 sm:left-8 right-6 sm:right-8 bottom-20 z-10">
                            <div className="text-sm text-red-600 text-center max-w-xl mx-auto">
                              {dailyLimitReached
                                ? tr(
                                    "summary_daily_limit_reached",
                                    "Has superado el límite diario. 20 solicitudes al día."
                                  )
                                : tr(
                                    "summary_limit_reached",
                                    `Límite máximo: ${MAX_CHARS.toLocaleString()} caracteres.`
                                  ).replace("{{count}}", MAX_CHARS.toLocaleString())}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="px-3 sm:px-6 pt-16 pb-6 max-w-3xl mx-auto">
                          {errorMsg && !errorKind && (
                            <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                              {errorMsg}
                            </div>
                          )}

                          {isOutdated && !loading && result && (
                            <div className="mb-3 flex items-center justify-between gap-3 text-[13px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                              <span className="truncate">
                                {tr("summary.outdated_notice", "El texto ha cambiado. Actualiza el resumen.")}
                              </span>
                              <div className="shrink-0 flex items-center gap-2">
                                <Button
                                  type="button"
                                  onClick={handleGenerate}
                                  className="h-8 px-3 rounded-full text-[13px]"
                                  style={{ backgroundColor: "#2563eb", color: "#fff" }}
                                >
                                  {tr("summary.outdated_update", "Actualizar")}
                                </Button>
                                <button
                                  type="button"
                                  onClick={() => setIsOutdated(false)}
                                  className="h-8 w-8 rounded-md hover:bg-amber-100 text-amber-700"
                                  title={tr("summary.outdated_close", "Ocultar aviso")}
                                  aria-label={tr("summary.outdated_close", "Ocultar aviso")}
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          )}

                          {result && (
                            <article className="prose prose-slate max-w-none mt-10">
                              <p className="whitespace-normal">{result}</p>
                            </article>
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
                    </>
                  )}
                </div>

            
              </section>
            </motion.section>
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