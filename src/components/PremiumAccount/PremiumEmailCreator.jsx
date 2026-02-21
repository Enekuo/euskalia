import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  File as FileIcon,
  FileDown,
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

export default function PremiumEmailCreator() {
  const { t } = useTranslation();

  // ✅ evita que se muestre la clave literal si falta traducción
  const tr = (key, fallback) => {
    const val = t(key);
    return !val || val === key ? fallback : val;
  };

  // ===== Estado =====
  const [sourceMode, setSourceMode] = useState(null); // null | "text" | "document" | "url"
  const [textValue, setTextValue] = useState("");

  // ✅ Prompt input inferior (como en public)
  const [chatInput, setChatInput] = useState("");

  // Resultado / carga / error
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Límite Premium (banner + mensaje rojo) -> FIX: guardar TIPO, no el texto
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

  // Longitud del email
  const [emailLength, setEmailLength] = useState("breve"); // "breve" | "medio" | "detallado"

  // Idioma de salida (EUS/ES/EN/FR) — por defecto Euskera
  const [outputLang, setOutputLang] = useState("EUS");

  // Track “email desactualizado”
  const [lastEmailSig, setLastEmailSig] = useState(null);
  const [isOutdated, setIsOutdated] = useState(false);

  // Resultado es el mensaje "texto demasiado breve"
  const [isTooShortResult, setIsTooShortResult] = useState(false);

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

  // ✅ inputs del creador (pequeños + párrafos grandes)
  const [emailSaludo, setEmailSaludo] = useState("");
  const [emailIntro, setEmailIntro] = useState("");
  const [emailSaludo2, setEmailSaludo2] = useState("");
  const [emailNombre, setEmailNombre] = useState("");
  const [emailParagraphs, setEmailParagraphs] = useState([""]); // mínimo 1

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

  // ===== i18n =====
  const labelSources = tr("premiumEmailCreator.sources_title", "Iturriak");

  const labelGenerateFromSources = tr(
    "premiumEmailCreator.generate_from_sources",
    "Emaila sortu"
  );
  const labelHelpRight = tr(
    "premiumEmailCreator.create_help_right",
    "Hautatu iturri bat (testua, dokumentuak edo URLak) eta sakatu “Emaila sortu”."
  );

  // ✅ Prompt inferior
  const labelBottomInputPh = tr(
    "emailCreator.bottom_input_ph",
    "Idatzi hemen argibideak (aukerakoa): hartzailea, tonua, helburua, call-to-action…"
  );
  const labelGenerateWithPrompt = tr(
    "emailCreator.generate_with_prompt",
    "Argibideekin sortu"
  );

  // Texto formal o informal
  const [emailTone, setEmailTone] = useState("formal");
  const LBL_FORMAL = tr("premiumEmailCreator.tone_formal", "Formal");
  const LBL_INFORMAL = tr("premiumEmailCreator.tone_informal", "Informal");
  
// Etiquetas de idioma
  const LBL_EUS = tr("premiumEmailCreator.output_language_eus", "Euskara");
  const LBL_ES = tr("premiumEmailCreator.output_language_es", "Gaztelania");
  const LBL_EN = tr("premiumEmailCreator.output_language_en", "Ingelesa");
  const LBL_FR = tr("premiumEmailCreator.output_language_fr", "Français");

  // ✅ Botón guardar + toast (verde)
  const labelSaveEmail = tr("premiumEmailCreator.save_button_label", "Gorde");
  const librarySavedMessage = tr(
    "premiumEmailCreator.library_saved_toast",
    "Liburutegian gordeta"
  );

  // ✅ Tooltips
  const tooltipCopy = tr("premiumEmailCreator.copy", "Copiar");
  const tooltipCopied = tr("premiumEmailCreator.copied", "Copiado");
  const tooltipPdf = tr("premiumEmailCreator.pdf", "PDF");

  // ✅ Labels del creador
  const labelSmall1 = tr("premiumEmailCreator.small_1", "1- Saludo");
  const labelSmall2 = tr("premiumEmailCreator.small_2", "2- Introducción");
  const labelBig3 = tr("premiumEmailCreator.big_3", "3- Párrafo");
  const labelSmall4 = tr("premiumEmailCreator.small_4", "4- pequeño. Saludo");
  const labelSmall5 = tr("premiumEmailCreator.small_5", "5- pequeño. Nombre");

  const placeholderSaludo = tr(
    "premiumEmailCreator.saludo_ph",
    "Escribe el saludo..."
  );
  const placeholderIntro = tr(
    "premiumEmailCreator.intro_ph",
    "Escribe la introducción..."
  );
  const placeholderParagraph = tr(
    "premiumEmailCreator.paragraph_ph",
    "Escribe el párrafo"
  );
  const placeholderSaludo2 = tr(
    "premiumEmailCreator.saludo2_ph",
    "Escribe el saludo..."
  );
  const placeholderNombre = tr(
    "premiumEmailCreator.nombre_ph",
    "Escribe el nombre..."
  );
  const labelAddParagraph = tr("premiumEmailCreator.add_paragraph", "+ Párrafo");

  // ===== Tabs =====
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
          <span
            className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full"
            style={{ backgroundColor: BLUE }}
          />
        )}
      </button>
      {showDivider && (
        <span
          aria-hidden
          className="self-center"
          style={{ width: 1, height: 22, backgroundColor: DIVIDER }}
        />
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
    return valid.filter((v) =>
      seen.has(v.href) ? false : (seen.add(v.href), true)
    );
  };

  const enforceLength = (text, mode) => {
    const config = {
      breve: { maxWords: 120, maxSentences: 5 },
      medio: { maxWords: 220, maxSentences: 9 },
      detallado: { maxWords: 340, maxSentences: 14 },
    };
    const { maxWords, maxSentences } = config[mode] || config.breve;

    let t2 = (text || "")
      .replace(/\r/g, "")
      .replace(/\n+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();

    const sentences = t2.split(/(?<=[.!?…])\s+/).filter(Boolean);
    let clipped = sentences.slice(0, maxSentences).join(" ");

    const words = clipped.split(/\s+/);
    if (words.length > maxWords) {
      clipped =
        words
          .slice(0, maxWords)
          .join(" ")
          .replace(/[.,;:–—-]*$/, "") + "…";
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

  // ✅ construir textValue desde inputs
  useEffect(() => {
    const parts = [
      (emailSaludo || "").trim(),
      (emailIntro || "").trim(),
      ...(emailParagraphs || [])
        .map((p) => (p || "").trim())
        .filter(Boolean),
      (emailSaludo2 || "").trim(),
      (emailNombre || "").trim(),
    ].filter(Boolean);

    const joined = parts.join("\n\n").trim();
    setTextValue(joined);
    setSourceMode("text");
  }, [emailSaludo, emailIntro, emailParagraphs, emailSaludo2, emailNombre]);

  // ===== Limpieza del panel derecho =====
  const clearRight = () => {
    setResult("");
    setErrorMsg("");
    clearLimit();
    setIsOutdated(false);
    setIsTooShortResult(false);
    setLoading(false);
    setSavedToLibrary(false);
  };

  const handleLengthChange = (mode) => {
    if (mode === emailLength) return;
    setEmailLength(mode);
    clearRight();
  };

  // ===== Reglas UX =====
  useEffect(() => {
    const sig = canonicalize(textValue);
    if (sig.length === 0) {
      setIsOutdated(false);
      return;
    }
    if (lastEmailSig && sig !== lastEmailSig) {
      setIsOutdated(true);
    } else {
      setIsOutdated(false);
    }
  }, [textValue, lastEmailSig]);

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
  }, [
    loading,
    result,
    urlInputOpen,
    textValue,
    urlItems,
    documents,
    emailLength,
    outputLang,
    chatInput,
  ]);

  // URLs → reset resultado
  useEffect(() => {
    setResult("");
    setErrorMsg("");
    clearLimit();
    setIsOutdated(false);
    setIsTooShortResult(false);
    setSavedToLibrary(false);
  }, [urlItems]);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  // ===== Validación =====
  const textIsValid = useMemo(() => {
    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    return trimmed.length >= 20 && words.length >= 5;
  }, [textValue]);

  const hasValidInput =
    textIsValid || urlItems.length > 0 || documents.length > 0;

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
    setEmailSaludo("");
    setEmailIntro("");
    setEmailSaludo2("");
    setEmailNombre("");
    setEmailParagraphs([""]);
    clearRight();
  };

  // ✅ sumar / eliminar párrafos
  const addParagraph = () => {
    setEmailParagraphs((prev) => [...prev, ""]);
    clearRight();
  };

  const removeParagraph = (idx) => {
    setEmailParagraphs((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [""];
    });
    clearRight();
  };

  const updateParagraph = (idx, val) => {
    setEmailParagraphs((prev) => prev.map((p, i) => (i === idx ? val : p)));
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
    clearLimit();
    setIsTooShortResult(false);
    setSavedToLibrary(false);

    const trimmed = (textValue || "").trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const textOk = trimmed.length >= 20 && words.length >= 5;
    const validNow = textOk || urlItems.length > 0 || documents.length > 0;

    if ((textValue || "").length > MAX_CHARS) {
      setCharsLimit();
      setLoading(false);
      return;
    }
    if (!validNow) {
      setErrorMsg(
        tr(
          "premiumEmailCreator.error_need_input",
          "Añade texto suficiente, URLs o documentos antes de generar el email."
        )
      );
      setLoading(false);
      return;
    }

    const formattingRules =
      "Devuelve un email profesional en un único bloque de texto (sin listas ni viñetas). " +
      'Empieza con "Asunto: ..." y a continuación redacta el cuerpo con un saludo y un cierre. ' +
      "No uses numeraciones ni guiones al inicio de línea. No inventes datos.";

    const tooShortMsg =
      outputLang === "ES"
        ? "El texto es demasiado breve para redactar un email con fidelidad."
        : outputLang === "EN"
        ? "The text is too short to draft a reliable email."
        : outputLang === "FR"
        ? "Le texte est trop court pour rédiger un email fiable."
        : "Testua laburregia da fideltasunez email bat idazteko.";

    const langInstruction =
      outputLang === "ES"
        ? "Idioma de salida: español (ISO: es). Redacta toda la respuesta en español."
        : outputLang === "EN"
        ? "Output language: English (ISO: en). Write the entire response in English."
        : outputLang === "FR"
        ? "Langue de sortie : français (ISO : fr). Rédige toute la réponse en français."
        : "Irteerako hizkuntza: euskara (ISO: eu). Idatzi erantzun osoa euskaraz.";

    const lengthRule =
      emailLength === "breve"
        ? "Extensión: email corto, ~90–140 palabras."
        : emailLength === "medio"
        ? "Extensión: email medio, ~160–240 palabras."
        : "Extensión: email detallado, ~260–360 palabras.";

    const promptRule = chatInput.trim()
      ? `\nINSTRUCCIONES DEL USUARIO (prioridad alta):\n${chatInput.trim()}`
      : "";

    const userContent = [
      "Quiero que redactes un email profesional basado en el siguiente contenido.",
      textValue ? `\nTEXTO:\n${textValue}` : "",
      promptRule,
      `\nREQUISITO DE FORMATO: ${formattingRules}`,
      `\nREQUISITO DE LONGITUD (${emailLength.toUpperCase()}): ${lengthRule}`,
      `\n${langInstruction}`,
    ].join("");

    const systemBase =
      "Eres un asistente que redacta emails profesionales. " +
      "No uses listas, viñetas, guiones ni numeraciones. " +
      'Empieza con "Asunto:" y redacta el cuerpo con saludo y cierre. ' +
      "Sé claro, natural y coherente. No inventes datos.";

    const messages = [
      { role: "system", content: systemBase },
      { role: "user", content: userContent },
    ];

    const cacheBase = JSON.stringify({
      textValue,
      emailLength,
      outputLang,
      chatInput,
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error(
          tr(
            "premiumEmailCreator.error_auth_required",
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
          length: emailLength,
          cacheKey,
        }),
      });

      if (!res.ok) {
        if (res.status === 413) {
          setCharsLimit();
          setLoading(false);
          return;
        }
        if (res.status === 429) {
          setDailyLimit();
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

      const cleaned = (rawText || "")
        .replace(/^\s*[-–—•]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        .replace(/\r/g, "")
        .replace(/\n+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();

      const clipped = enforceLength(cleaned, emailLength);

      setResult(clipped);
      setIsTooShortResult(false);
      setLastEmailSig(canonicalize(textValue));
      setIsOutdated(false);
    } catch (err) {
      setErrorMsg(
        err.message ||
          tr("premiumEmailCreator.error_generic", "Error generando el email.")
      );
    } finally {
      setLoading(false);
    }
  };

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
            {/* ===== Panel Fuentes (izquierda) ===== */}
            <aside className="h-[600px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden flex flex-col">
              {/* Título */}
              <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
                <div className="text-sm font-medium text-slate-700">
                  {labelSources}
                </div>
              </div>

              {/* ✅ layout inputs (ORDEN: 1,2,3,4,5) */}
              <div className="flex-1 min-h-0 overflow-auto px-4 py-4">
                {/* 1 - Pequeño Saludo */}
                <div className="mb-5">
                  <div className="text-sm font-semibold text-slate-800 mb-2">
                    {labelSmall1}
                  </div>
                  <textarea
                    value={emailSaludo}
                    onChange={(e) => {
                      setEmailSaludo(e.target.value);
                      clearRight();
                    }}
                    placeholder={placeholderSaludo}
                    className="w-full h-11 overflow-hidden resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                    rows={2}
                  />
                </div>

                {/* 2 - Pequeño Introducción */}
                <div className="mb-5">
                  <div className="text-sm font-semibold text-slate-800 mb-2">
                    {labelSmall2}
                  </div>
                  <textarea
                    value={emailIntro}
                    onChange={(e) => {
                      setEmailIntro(e.target.value);
                      clearRight();
                    }}
                    placeholder={placeholderIntro}
                    className="w-full h-11 overflow-hidden resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                    rows={2}
                  />
                </div>

                {/* 3 - Grande Párrafo + botón +Párrafo */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-800">
                    {labelBig3}
                  </div>

                  <button
                    type="button"
                    onClick={addParagraph}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                    aria-label={labelAddParagraph}
                    title={labelAddParagraph}
                  >
                    <span className="whitespace-nowrap">{labelAddParagraph}</span>
                  </button>
                </div>

                {/* Párrafos grandes (cada uno con X) */}
                <div className="space-y-4 mb-6">
                  {emailParagraphs.map((p, idx) => (
                    <div key={idx} className="relative">
                      <textarea
                        value={p}
                        onChange={(e) => {
                          updateParagraph(idx, e.target.value);
                          clearRight();
                        }}
                        placeholder={placeholderParagraph}
                        className="w-full h-24 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                      />

                      <button
                        type="button"
                        onClick={() => removeParagraph(idx)}
                        className="absolute top-3 right-3 h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                        aria-label={tr(
                          "premiumEmailCreator.remove_paragraph",
                          "Eliminar párrafo"
                        )}
                        title={tr(
                          "premiumEmailCreator.remove_paragraph",
                          "Eliminar párrafo"
                        )}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* 4 - Pequeño Saludo */}
                <div className="mb-5">
                  <div className="text-sm font-semibold text-slate-800 mb-2">
                    {labelSmall4}
                  </div>
                  <textarea
                    value={emailSaludo2}
                    onChange={(e) => {
                      setEmailSaludo2(e.target.value);
                      clearRight();
                    }}
                    placeholder={placeholderSaludo2}
                    className="w-full h-11 overflow-hidden resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                    rows={2}
                  />
                </div>

                {/* 5 - Pequeño Nombre */}
                <div className="mb-1">
                  <div className="text-sm font-semibold text-slate-800 mb-2">
                    {labelSmall5}
                  </div>
                  <textarea
                    value={emailNombre}
                    onChange={(e) => {
                      setEmailNombre(e.target.value);
                      clearRight();
                    }}
                    placeholder={placeholderNombre}
                    className="w-full h-11 overflow-hidden resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                    rows={2}
                  />
                </div>
              </div>
            </aside>

            {/* ===== Panel Derecho ===== */}
            <section className="relative h-[600px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
             
             {/* Barra superior */}
<div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/60">
  <div className="flex items-center gap-2">
    <LengthTab
      active={emailTone === "formal"}
      label={LBL_FORMAL}
      onClick={() => {
        if (emailTone !== "formal") {
          setEmailTone("formal");
          clearRight();
        }
      }}
      showDivider
    />
    <LengthTab
      active={emailTone === "informal"}
      label={LBL_INFORMAL}
      onClick={() => {
        if (emailTone !== "informal") {
          setEmailTone("informal");
          clearRight();
        }
      }}
    />
  </div>

                <div className="flex items-center gap-1">
                  {/* Selector de idioma */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                        aria-label={tr(
                          "premiumEmailCreator.output_language_aria",
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

                  <button
                    type="button"
                    onClick={handleClearLeft}
                    title={tr("premiumEmailCreator.clear_input", "Eliminar")}
                    className={`h-9 w-9 flex items-center justify-center ${
                      (emailSaludo ||
                        emailIntro ||
                        emailSaludo2 ||
                        emailNombre ||
                        (emailParagraphs || []).some((p) => (p || "").trim()))
                        ? "text-slate-600 hover:text-slate-800"
                        : "text-slate-300 cursor-not-allowed"
                    }`}
                    aria-label={tr("premiumEmailCreator.clear_input", "Eliminar")}
                    disabled={
                      !(
                        emailSaludo ||
                        emailIntro ||
                        emailSaludo2 ||
                        emailNombre ||
                        (emailParagraphs || []).some((p) => (p || "").trim())
                      )
                    }
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

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
                      {labelGenerateFromSources}
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

              <div className="w-full">
                {(result || errorMsg || loading) && (
                  <div className="px-6 pt-24 pb-[110px] max-w-3xl mx-auto">
                    {errorMsg && (
                      <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                        {errorMsg}
                      </div>
                    )}

                    {result && (
                      <article className="prose prose-slate max-w-none">
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
              </div>
            </section>
          </motion.section>
        </div>
      </section>
    </>
  );
}