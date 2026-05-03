import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { FileDown, X, Copy, Trash, Check } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";

export default function EmailCreator() {
  const { t } = useTranslation();

  const tr = (key, fallback) => {
    const val = t(key);
    return !val || val === key ? fallback : val;
  };

  const [sourceMode, setSourceMode] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [emailMode, setEmailMode] = useState("template");
  const [creativeInfo, setCreativeInfo] = useState("");

  const [result, setResult] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [limitType, setLimitType] = useState("");
  const setCharsLimit = () => setLimitType("chars");
  const setDailyLimit = () => setLimitType("daily");
  const clearLimit = () => setLimitType("");

  const limitMsg =
    limitType === "chars"
      ? tr("emailCreator.limit_chars", "Has superado el límite máximo de caracteres permitido.")
      : limitType === "daily"
      ? tr("emailCreator.limit_daily", "Has alcanzado el límite diario. Vuelve mañana.")
      : "";

  const [emailLength, setEmailLength] = useState("breve");
  const [outputLang, setOutputLang] = useState("EUS");
  const [lastEmailSig, setLastEmailSig] = useState(null);
  const [isOutdated, setIsOutdated] = useState(false);
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [copiedFlash, setCopiedFlash] = useState(false);

  const [emailSaludo, setEmailSaludo] = useState("");
  const [emailIntro, setEmailIntro] = useState("");
  const [emailParagraphs, setEmailParagraphs] = useState([""]);
  const [emailFinalPhrase, setEmailFinalPhrase] = useState("");
  const [emailSaludo2, setEmailSaludo2] = useState("");
  const [emailNombre, setEmailNombre] = useState("");

  const [spent, setSpent] = useState(0);

  const [showMissingInfoConfirm, setShowMissingInfoConfirm] = useState(false);
  const [pendingGenerateMode, setPendingGenerateMode] = useState(null);

  const BLUE = "#2563eb";
  const GRAY_TEXT = "#64748b";
  const DIVIDER = "#e5e7eb";
  const MAX_CHARS = 18000;

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  const labelSources = tr("emailCreator.sources_title", "Iturriak");

  const labelGenerateFromSources = tr(
    "emailCreator.generate_from_sources",
    "Emaila sortu"
  );
  const labelHelpRight = tr(
    "emailCreator.create_help_right",
    "Hautatu iturri bat eta sakatu “Emaila sortu”."
  );

  const [emailTone, setEmailTone] = useState("formal");
  const LBL_FORMAL = tr("emailCreator.tone_formal", "Formal");
  const LBL_INFORMAL = tr("emailCreator.tone_informal", "Informal");

  const LBL_EUS = tr("emailCreator.output_language_eus", "Euskara");
  const LBL_ES = tr("emailCreator.output_language_es", "Gaztelania");
  const LBL_EN = tr("emailCreator.output_language_en", "Ingelesa");
  const LBL_FR = tr("emailCreator.output_language_fr", "Français");

  const tooltipCopy = tr("emailCreator.copy", "Copiar");
  const tooltipCopied = tr("emailCreator.copied", "Copiado");
  const tooltipPdf = tr("emailCreator.pdf", "PDF");

  const labelSmall1 = tr("emailCreator.small_1", "1- Saludo");
  const labelSmall2 = tr("emailCreator.small_2", "2- Introducción");
  const labelBig3 = tr("emailCreator.big_3", "3- Párrafo");
  const labelFinal = tr("emailCreator.final_phrase", "4- Frase final");
  const labelSmall4 = tr("emailCreator.small_4", "5- Saludo");
  const labelSmall5 = tr("emailCreator.small_5", "6- Nombre");

  const placeholderSaludo = tr("emailCreator.saludo_ph", "Escribe el saludo...");
  const placeholderIntro = tr("emailCreator.intro_ph", "Escribe la introducción...");
  const placeholderParagraph = tr("emailCreator.paragraph_ph", "Escribe el párrafo");
  const placeholderFinal = tr("emailCreator.final_phrase_ph", "Escribe la frase final...");
  const placeholderSaludo2 = tr("emailCreator.saludo2_ph", "Escribe el saludo...");
  const placeholderNombre = tr("emailCreator.nombre_ph", "Escribe el nombre...");
  const labelAddParagraph = tr("emailCreator.add_paragraph", "+ Párrafo");
  const labelRemoveParagraph = tr("emailCreator.remove_paragraph", "Eliminar párrafo");

  const labelModeTemplate = tr("emailCreator.mode_template", "Plantilla");
  const labelModeCreative = tr("emailCreator.mode_creative", "Creativo");
  const placeholderCreative = tr(
    "emailCreator.creative_ph",
    "Escribe aquí toda la información: a quién va dirigido, objetivo, contexto, puntos clave, tono, si quieres CTA, etc..."
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

  const canonicalize = (s) =>
    (s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const sanitizeJsonText = (s) => {
    const t0 = String(s || "").trim();
    if (!t0) return "";
    if (t0.startsWith("```")) {
      const t1 = t0.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "");
      return t1.trim();
    }
    return t0;
  };

  const normalizeSubject = (s) => {
    let t0 = String(s || "").replace(/\r/g, "").replace(/\n+/g, " ").trim();
    if (!t0) return "";
    t0 = t0.replace(/^(asunto|subject|objet|gaia)\s*[:\-]\s*/i, "").trim();
    if (t0.length > 70) t0 = t0.slice(0, 70).trimEnd() + "…";
    return t0;
  };

  const ensureParagraphBreaks = (s) => {
    let t0 = String(s || "").replace(/\r/g, "").trim();
    if (!t0) return "";
    t0 = t0.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
    return t0.trim();
  };

  const getDefaultsByLang = (lang, tone) => {
    const isInformal = tone === "informal";

    if (lang === "ES") {
      return {
        defaultName: "Tu nombre",
        defaultClosing: isInformal ? "Un saludo," : "Atentamente,",
        defaultFinalPhrase: isInformal
          ? "Quedo atento a tu respuesta."
          : "Quedo a la espera de tu respuesta.",
      };
    }
    if (lang === "EN") {
      return {
        defaultName: "Your name",
        defaultClosing: isInformal ? "Best," : "Sincerely,",
        defaultFinalPhrase: isInformal
          ? "Looking forward to your reply."
          : "I look forward to your response.",
      };
    }
    if (lang === "FR") {
      return {
        defaultName: "Votre nom",
        defaultClosing: isInformal ? "Bien à vous," : "Cordialement,",
        defaultFinalPhrase: isInformal
          ? "Dans l’attente de votre retour."
          : "Dans l’attente de votre réponse.",
      };
    }
    return {
      defaultName: "Zure izena",
      defaultClosing: isInformal ? "Agur," : "Adeitasunez,",
      defaultFinalPhrase: "Zure erantzunaren zain geratzen naiz.",
    };
  };

  const defaultGreetingByLang = (lang, tone) => {
    const informal = tone === "informal";
    if (lang === "ES") return informal ? "Hola," : "Estimado/a,";
    if (lang === "EN") return informal ? "Hi," : "Dear,";
    if (lang === "FR") return informal ? "Salut," : "Madame, Monsieur,";
    return informal ? "Kaixo," : "Agurgarria,";
  };

  const languageLooksWrong = (text, lang) => {
    const s = canonicalize(text);
    if (!s) return false;

    const esHits =
      /\b(el|la|los|las|de|que|y|para|por|estoy|me|mi|tu|gracias|atentamente|estimado|estimada|estimados|estimadas)\b/.test(
        s
      );
    const eusHits =
      /\b(eta|da|dut|dudala|zure|mesedez|eskerrik|agur|adeitasunez|naiz|nahi)\b/.test(
        s
      );
    const enHits =
      /\b(the|and|to|for|i|you|please|regards|sincerely|dear)\b/.test(s);
    const frHits =
      /\b(le|la|les|de|que|et|pour|je|vous|cordialement|bonjour)\b/.test(s);

    if (lang === "EUS") return esHits || enHits || frHits ? !eusHits : false;
    if (lang === "ES") return eusHits || enHits || frHits ? !esHits : false;
    if (lang === "EN") return esHits || eusHits || frHits ? !enHits : false;
    if (lang === "FR") return esHits || eusHits || enHits ? !frHits : false;
    return false;
  };

  const ensureSaludoHasAddressee = (generatedSaludo, userSaludo, lang, tone) => {
    const gen0 = String(generatedSaludo || "").trim();
    const usr0 = String(userSaludo || "").trim();

    const stripPunct = (x) =>
      String(x || "")
        .replace(/\r/g, "")
        .replace(/\n+/g, " ")
        .replace(/[,:;.!?]+$/g, "")
        .trim();

    const extractNameLike = (x) => {
      const s0 = stripPunct(x);
      if (!s0) return "";

      const cleaned = s0
        .replace(
          /^(estimado\/a|estimado|estimada|estimados|estimadas|hola|buenos dias|buenas tardes|buenas|dear|hi|hello|madame|monsieur|madame,\s*monsieur|bonjour|salut|agurgarria|jaun\/andre agurgarria|kaixo)\b\s*/i,
          ""
        )
        .replace(/^[:\-–—]\s*/g, "")
        .trim();

      if (!cleaned) return "";
      if (cleaned.length <= 1) return "";
      return cleaned;
    };

    const base = defaultGreetingByLang(lang, tone);
    const baseNoPunct = stripPunct(base);
    const addFromUser = extractNameLike(usr0);
    const addFromGen = extractNameLike(gen0);
    const addressee = addFromUser || addFromGen;
    const genOk = gen0 && !languageLooksWrong(gen0, lang);

    if (genOk) {
      const normalized = stripPunct(gen0);
      if (!normalized) return base;
      return normalized.endsWith(",") ? normalized : normalized + ",";
    }

    if (lang === "FR" && tone === "formal") {
      return "Madame, Monsieur,";
    }

    if (addressee) {
      if (lang === "EUS") {
        const head = tone === "informal" ? "Kaixo" : "Agurgarri";
        return `${head} ${addressee},`;
      }
      if (lang === "ES") {
        const head = tone === "informal" ? "Hola" : "Estimado/a";
        return `${head} ${addressee},`;
      }
      if (lang === "EN") {
        const head = tone === "informal" ? "Hi" : "Dear";
        return `${head} ${addressee},`;
      }
      if (lang === "FR") {
        const head = tone === "informal" ? "Salut" : "Bonjour";
        return `${head} ${addressee},`;
      }
    }

    return baseNoPunct ? baseNoPunct + "," : base;
  };

  useEffect(() => {
    if (emailMode !== "template") return;

    const parts = [
      (emailSaludo || "").trim(),
      (emailIntro || "").trim(),
      ...(emailParagraphs || []).map((p) => (p || "").trim()).filter(Boolean),
      (emailFinalPhrase || "").trim(),
      (emailSaludo2 || "").trim(),
      (emailNombre || "").trim(),
    ].filter(Boolean);

    const joined = parts.join("\n\n").trim();
    setTextValue(joined);
    setSourceMode("text");
  }, [
    emailMode,
    emailSaludo,
    emailIntro,
    emailParagraphs,
    emailFinalPhrase,
    emailSaludo2,
    emailNombre,
  ]);

  const inputCount = useMemo(() => {
    const safeChat = chatInput || "";
    if (emailMode === "creative") {
      return (creativeInfo || "").length + safeChat.length;
    }

    const pLen = (emailParagraphs || []).reduce(
      (acc, p) => acc + String(p || "").length,
      0
    );

    return (
      (emailSaludo || "").length +
      (emailIntro || "").length +
      pLen +
      (emailFinalPhrase || "").length +
      (emailSaludo2 || "").length +
      (emailNombre || "").length +
      safeChat.length
    );
  }, [
    emailMode,
    creativeInfo,
    chatInput,
    emailSaludo,
    emailIntro,
    emailParagraphs,
    emailFinalPhrase,
    emailSaludo2,
    emailNombre,
  ]);

  const clearRight = () => {
    setResult("");
    setEmailSubject("");
    setErrorMsg("");
    clearLimit();
    setIsOutdated(false);
    setLoading(false);
  };

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

  const paragraphMinOk = useMemo(() => {
    if (emailMode !== "template") return true;
    const paras = emailParagraphs || [];
    for (const p of paras) {
      const trimmed = (p || "").trim();
      if (!trimmed) continue;
      const words = trimmed.split(/\s+/).filter(Boolean);
      if (words.length < 5) return false;
    }
    return true;
  }, [emailMode, emailParagraphs]);

  const hasAnyInput = useMemo(() => {
    if (emailMode === "creative") {
      return !!(creativeInfo || "").trim() || !!(chatInput || "").trim();
    }

    const anyParagraph = (emailParagraphs || []).some((p) => (p || "").trim());
    return (
      !!(emailSaludo || "").trim() ||
      !!(emailIntro || "").trim() ||
      anyParagraph ||
      !!(emailFinalPhrase || "").trim() ||
      !!(emailSaludo2 || "").trim() ||
      !!(emailNombre || "").trim() ||
      !!(chatInput || "").trim()
    );
  }, [
    emailMode,
    creativeInfo,
    emailSaludo,
    emailIntro,
    emailParagraphs,
    emailFinalPhrase,
    emailSaludo2,
    emailNombre,
    chatInput,
  ]);

  const hasValidInput = hasAnyInput && paragraphMinOk;

  const templateFilledCount = useMemo(() => {
    return [
      (emailSaludo || "").trim(),
      (emailIntro || "").trim(),
      ...(emailParagraphs || []).map((p) => (p || "").trim()).filter(Boolean),
      (emailFinalPhrase || "").trim(),
      (emailSaludo2 || "").trim(),
      (emailNombre || "").trim(),
      (chatInput || "").trim(),
    ].filter(Boolean).length;
  }, [
    emailSaludo,
    emailIntro,
    emailParagraphs,
    emailFinalPhrase,
    emailSaludo2,
    emailNombre,
    chatInput,
  ]);

  const creativeMainText = useMemo(() => {
    return `${(creativeInfo || "").trim()} ${(chatInput || "").trim()}`.trim();
  }, [creativeInfo, chatInput]);

  const creativeHasEnoughMeaningfulInfo = useMemo(() => {
    const text = creativeMainText;
    if (!text) return false;

    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length < 12) return false;

    const words = clean.split(" ").filter(Boolean);
    if (words.length < 3) return false;

    return true;
  }, [creativeMainText]);

  const hasEnoughInfoWithoutConfirm = useMemo(() => {
    if (emailMode === "creative") {
      return creativeHasEnoughMeaningfulInfo;
    }
    return templateFilledCount >= 2;
  }, [emailMode, creativeHasEnoughMeaningfulInfo, templateFilledCount]);

  const closeMissingInfoConfirm = () => {
    setShowMissingInfoConfirm(false);
    setPendingGenerateMode(null);
  };

  const handleCopy = async (flash = false) => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        (emailSubject ? `Asunto: ${emailSubject}\n\n` : "") + result
      );
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

    const safeSubject = (emailSubject || "")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const safeBody = (result || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    win.document.write(`
      <html>
        <head>
          <title>${tr("emailCreator.pdf_title", "Email")}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; line-height: 1.55; }
            .box { max-width: 900px; margin: 0 auto; white-space: pre-wrap; }
            .subj { font-weight: 700; margin-bottom: 14px; }
          </style>
        </head>
        <body>
          <div class="box">
            <div class="subj">Asunto: ${safeSubject}</div>
            <div>${safeBody}</div>
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
    setEmailSaludo("");
    setEmailIntro("");
    setEmailFinalPhrase("");
    setEmailSaludo2("");
    setEmailNombre("");
    setEmailParagraphs([""]);
    setChatInput("");
    setCreativeInfo("");
    setSpent(0);
    clearRight();
  };

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

  const buildBodyFromParts = ({
    saludo,
    intro,
    paragraphs,
    finalPhrase,
    closing,
    name,
  }) => {
    const safeSaludo = (saludo || "").trim();
    const safeIntro = (intro || "").trim();
    const safeParas = Array.isArray(paragraphs) ? paragraphs : [];
    const safeFinal = (finalPhrase || "").trim();
    const safeClosing = (closing || "").trim();
    const safeName = (name || "").trim();

    const blocks = [
      safeSaludo,
      safeIntro,
      ...safeParas.map((p) => String(p || "").trim()).filter(Boolean),
      safeFinal,
      safeClosing,
    ].filter(Boolean);

    const out = [];
    for (let i = 0; i < blocks.length - 1; i++) out.push(blocks[i]);
    const last = blocks.length ? blocks[blocks.length - 1] : "";
    if (last) out.push(last);

    let body = out.join("\n\n").trim();
    body = ensureParagraphBreaks(body);
    body = (body ? body + "\n" : "") + safeName;

    return ensureParagraphBreaks(body);
  };

  const fetchEmailOnce = async (messages, emailLength, cacheKey) => {
    const res = await fetch("/api/public", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        length: emailLength,
        cacheKey,
      }),
    });

    if (!res.ok) {
      if (res.status === 413) return { kind: "limit", type: "chars" };
      if (res.status === 429) return { kind: "limit", type: "daily" };

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

    const usageTotal =
      typeof data?.usage?.total_tokens === "number"
        ? data.usage.total_tokens
        : typeof data?.usage?.totalTokens === "number"
        ? data.usage.totalTokens
        : typeof data?.usage?.total === "number"
        ? data.usage.total
        : null;

    return { kind: "ok", rawText, usageTotal };
  };

  const handleGenerate = async (forceContinue = false) => {
    setLoading(true);
    setErrorMsg("");
    clearLimit();

    if (inputCount > MAX_CHARS) {
      setCharsLimit();
      setLoading(false);
      return;
    }

    if (!hasAnyInput) {
      setErrorMsg(
        tr(
          "emailCreator.error_need_input",
          "Añade algo de información antes de generar el email."
        )
      );
      setLoading(false);
      return;
    }

    if (!paragraphMinOk) {
      setErrorMsg(
        tr(
          "emailCreator.error_paragraph_min_words",
          "Cada párrafo debe tener al menos 5 palabras (los demás campos pueden ser cortos)."
        )
      );
      setLoading(false);
      return;
    }

    if (!forceContinue && !hasEnoughInfoWithoutConfirm) {
      setLoading(false);
      setPendingGenerateMode(emailMode);
      setShowMissingInfoConfirm(true);
      return;
    }

    const { defaultName, defaultClosing, defaultFinalPhrase } = getDefaultsByLang(
      outputLang,
      emailTone
    );

    const finalNameFromUser = (emailNombre || "").trim();
    const finalName = finalNameFromUser ? finalNameFromUser : defaultName;

    const toneRule =
      emailTone === "informal"
        ? "Tono: informal, cercano y natural."
        : "Tono: formal, claro y profesional.";

    const lengthRule =
      emailLength === "breve"
        ? "Extensión: email corto."
        : emailLength === "medio"
        ? "Extensión: email medio."
        : "Extensión: email detallado.";

    const langInstruction =
      outputLang === "ES"
        ? "IDIOMA OBLIGATORIO: español (es). TODO (subject + todas las partes) debe estar 100% en español. PROHIBIDO mezclar idiomas."
        : outputLang === "EN"
        ? "OUTPUT LANGUAGE (MANDATORY): English (en). Everything (subject + all parts) must be 100% English. Do NOT mix languages."
        : outputLang === "FR"
        ? "LANGUE OBLIGATOIRE : français (fr). Tout (subject + toutes les parties) doit être 100% en français. Interdit de mélanger."
        : "HIZKUNTZA DERRIGORREZ: euskara (eu). DENA (subject + atal guztiak) %100 euskaraz. DEBEKATUTA hizkuntzak nahastea.";

    const paragraphsBlock = (emailParagraphs || [])
      .map((p, i) => {
        const v = (p || "").trim();
        return v ? `  ${i + 1}. ${v}` : null;
      })
      .filter(Boolean)
      .join("\n");

    const userInstructions = chatInput.trim()
      ? `ERABILTZAILEAREN ARGIBIDEAK (lehentasun handia):\n${chatInput.trim()}`
      : "";

    const schemaRules =
      "DEVUELVE UN JSON VÁLIDO (sin texto extra) con EXACTAMENTE estas claves:\n" +
      `{"subject":"...","saludo":"...","intro":"...","paragraphs":["..."],"finalPhrase":"...","closing":"...","name":"..."}\n` +
      "- subject: una frase corta.\n" +
      "- saludo: una línea de saludo.\n" +
      "- EJEMPLOS de saludo según idioma:\n" +
      '  - EUS formal: "Agurgarria," o "Jaun/Andre agurgarria,"\n' +
      '  - EUS informal: "Kaixo,"\n' +
      '  - ES formal: "Estimado/a,"\n' +
      '  - EN formal: "Dear ...,"\n' +
      '  - FR formal: "Madame, Monsieur,"\n' +
      "- intro: un párrafo.\n" +
      "- paragraphs: array de párrafos.\n" +
      "- finalPhrase: una frase final.\n" +
      "- closing: SOLO cierre (sin nombre).\n" +
      "- name: SOLO el nombre.\n" +
      "REGLA: si el usuario escribe en otro idioma, tú lo REESCRIBES al idioma de salida.\n" +
      "REGLA: no copies literal, interpreta y mejora SOLO cuando el modo lo permita.";

    const basePrompt =
      emailMode === "creative"
        ? [
            "El usuario escribe rápido y suelto. Interpreta y crea un email perfecto, con frases buenas y coherentes.",
            "",
            "MODO: CREATIVO",
            "Si faltan datos, puedes completar los huecos de forma natural y coherente.",
            "Puedes inferir las partes que falten del email (saludo, intro, párrafos, frase final, cierre y nombre si falta).",
            "",
            "INFORMACIÓN DEL USUARIO (puede estar en cualquier idioma):",
            `${(creativeInfo || "").trim()}`,
            "",
            userInstructions ? userInstructions : "",
            "",
            `REGLAS:\n${schemaRules}`,
            `${toneRule}`,
            `${lengthRule}`,
            `${langInstruction}`,
            "",
            "IMPORTANTE: TODO debe salir en el idioma del selector, sin mezcla.",
          ].join("\n")
        : [
            "Eres un redactor experto de emails.",
            "",
            "MODO: PLANTILLA",
            "Debes construir el email SOLO con la información escrita por el usuario.",
            "NO inventes datos.",
            "NO completes huecos con contenido nuevo.",
            "NO añadas contexto, motivos, detalles o explicaciones que el usuario no haya dado.",
            "Si un campo está vacío, déjalo resuelto de la forma más neutra posible y mínima, SIN inventar contexto adicional.",
            "No reutilices contenido anterior ni supongas información no escrita en esta solicitud.",
            "",
            "DATOS DEL USUARIO (pueden estar en cualquier idioma):",
            `- (1) Saludo: ${(emailSaludo || "").trim() || "(vacío)"}`,
            `- (2) Intro: ${(emailIntro || "").trim() || "(vacío)"}`,
            `- (3) Párrafos/Notas:\n${paragraphsBlock ? paragraphsBlock : "(vacío)"}`,
            `- (4) Frase final: ${(emailFinalPhrase || "").trim() || "(vacío)"}`,
            `- (5) Cierre: ${(emailSaludo2 || "").trim() || "(vacío)"}`,
            `- (6) Nombre: ${(emailNombre || "").trim() || "(vacío)"}`,
            "",
            userInstructions ? userInstructions : "",
            "",
            `REGLAS:\n${schemaRules}`,
            `${toneRule}`,
            `${lengthRule}`,
            `${langInstruction}`,
            "",
            "IMPORTANTE: TODO debe salir en el idioma del selector, sin mezcla.",
          ].join("\n");

    const systemBase =
      "Eres un redactor experto de emails. Interpretas notas sueltas y las conviertes en un email impecable. " +
      "Regla crítica: salida 100% en el idioma solicitado. Devuelves SOLO JSON válido con las claves indicadas.";

    const messages1 = [
      { role: "system", content: systemBase },
      { role: "user", content: basePrompt },
    ];

    const shouldUseCache =
      emailMode === "creative"
        ? creativeHasEnoughMeaningfulInfo
        : templateFilledCount >= 2;

    const cacheBase = JSON.stringify({
      mode: emailMode,
      creativeInfo,
      emailLength,
      outputLang,
      chatInput,
      tone: emailTone,
      emailSaludo,
      emailIntro,
      emailParagraphs,
      emailFinalPhrase,
      emailSaludo2,
      emailNombre,
    });

    const cacheKey = shouldUseCache ? await sha256Hex(cacheBase) : null;

    try {
      let r1 = await fetchEmailOnce(messages1, emailLength, cacheKey);
      if (r1.kind === "limit") {
        if (r1.type === "chars") setCharsLimit();
        else setDailyLimit();
        setLoading(false);
        return;
      }

      const raw1 = r1.rawText || "";
      const clean1 = sanitizeJsonText(raw1);

      let parsed1 = null;
      try {
        parsed1 = JSON.parse(clean1);
      } catch {
        parsed1 = null;
      }

      if (!parsed1 || typeof parsed1 !== "object") {
        throw new Error(
          tr(
            "emailCreator.error_no_text",
            "La API no devolvió el formato correcto (JSON)."
          )
        );
      }

      const subject1 = normalizeSubject(parsed1.subject || "");
      const parts1 = {
        saludo: String(parsed1.saludo || "").trim(),
        intro: String(parsed1.intro || "").trim(),
        paragraphs: Array.isArray(parsed1.paragraphs) ? parsed1.paragraphs : [],
        finalPhrase: String(parsed1.finalPhrase || "").trim(),
        closing: String(parsed1.closing || "").trim(),
        name: String(parsed1.name || "").trim(),
      };

      const forceLangOnSaludoIfNeeded = (saludoRaw) => {
        const s0 = String(saludoRaw || "").trim();
        if (!s0) return s0;
        if (languageLooksWrong(s0, outputLang)) return "";
        return s0;
      };

      parts1.saludo = forceLangOnSaludoIfNeeded(parts1.saludo);

      const finalClosing =
        (emailSaludo2 || "").trim() || parts1.closing || defaultClosing;

      const finalFinalPhrase =
        (emailFinalPhrase || "").trim() ||
        parts1.finalPhrase ||
        defaultFinalPhrase;

      const finalSaludo1 = ensureSaludoHasAddressee(
        parts1.saludo,
        emailSaludo,
        outputLang,
        emailTone
      );

      const safeParts = {
        saludo: finalSaludo1,
        intro: parts1.intro,
        paragraphs: (parts1.paragraphs || [])
          .map((p) => String(p || "").trim())
          .filter(Boolean),
        finalPhrase: finalFinalPhrase,
        closing: finalClosing,
        name: parts1.name || finalName,
      };

      let builtBody1 = buildBodyFromParts(safeParts);

      const partsToCheck = [
        subject1,
        finalSaludo1,
        parts1.intro,
        ...(parts1.paragraphs || []),
        parts1.finalPhrase,
        parts1.closing,
        parts1.name,
      ]
        .map((x) => String(x || "").trim())
        .filter(Boolean);

      const anyPartWrong = partsToCheck.some((p) =>
        languageLooksWrong(p, outputLang)
      );

      const combined1 = `${subject1}\n${builtBody1}`;
      if (anyPartWrong || languageLooksWrong(combined1, outputLang)) {
        const hardLangRule =
          outputLang === "EUS"
            ? "REGLA ABSOLUTA: ESCRIBE TODO EN EUSKERA (eu). PROHIBIDO castellano/inglés/francés. Reescribe cualquier input al euskera."
            : outputLang === "ES"
            ? "REGLA ABSOLUTA: ESCRIBE TODO EN ESPAÑOL (es). PROHIBIDO euskera/inglés/francés. Reescribe cualquier input al español."
            : outputLang === "EN"
            ? "ABSOLUTE RULE: WRITE EVERYTHING IN ENGLISH (en). Do NOT include Spanish/Basque/French. Rewrite any input into English."
            : "RÈGLE ABSOLUE : TOUT EN FRANÇAIS (fr). Interdit espagnol/basque/anglais. Réécris tout en français.";

        const messages2 = [
          {
            role: "system",
            content:
              systemBase +
              " " +
              "IMPORTANTÍSIMO: si detectas mezcla de idiomas, vuelves a escribir TODO.",
          },
          { role: "user", content: basePrompt + "\n\n" + hardLangRule },
        ];

        let r2 = await fetchEmailOnce(
          messages2,
          emailLength,
          cacheKey ? cacheKey + "-retry" : null
        );

        if (r2.kind === "limit") {
          if (r2.type === "chars") setCharsLimit();
          else setDailyLimit();
          setLoading(false);
          return;
        }

        const raw2 = r2.rawText || "";
        const clean2 = sanitizeJsonText(raw2);

        let parsed2 = null;
        try {
          parsed2 = JSON.parse(clean2);
        } catch {
          parsed2 = null;
        }

        if (parsed2 && typeof parsed2 === "object") {
          const subject2 = normalizeSubject(parsed2.subject || "");
          const parts2 = {
            saludo: String(parsed2.saludo || "").trim(),
            intro: String(parsed2.intro || "").trim(),
            paragraphs: Array.isArray(parsed2.paragraphs) ? parsed2.paragraphs : [],
            finalPhrase: String(parsed2.finalPhrase || "").trim(),
            closing: String(parsed2.closing || "").trim(),
            name: String(parsed2.name || "").trim(),
          };

          const finalClosing2 =
            (emailSaludo2 || "").trim() || parts2.closing || defaultClosing;

          const finalFinalPhrase2 =
            (emailFinalPhrase || "").trim() ||
            parts2.finalPhrase ||
            defaultFinalPhrase;

          const finalSaludo2 = ensureSaludoHasAddressee(
            parts2.saludo,
            emailSaludo,
            outputLang,
            emailTone
          );

          const safeParts2 = {
            saludo: finalSaludo2,
            intro: parts2.intro,
            paragraphs: (parts2.paragraphs || [])
              .map((p) => String(p || "").trim())
              .filter(Boolean),
            finalPhrase: finalFinalPhrase2,
            closing: finalClosing2,
            name: parts2.name || finalName,
          };

          const builtBody2 = buildBodyFromParts(safeParts2);

          const spentNow2 =
            typeof r2.usageTotal === "number"
              ? r2.usageTotal
              : basePrompt.length + raw2.length;
          setSpent((p) => p + (spentNow2 || 0));

          setEmailSubject(
            subject2 || subject1 || (outputLang === "EUS" ? "Kontsulta" : "Consulta")
          );
          setResult(builtBody2);
          setLastEmailSig(canonicalize(textValue));
          setIsOutdated(false);
          setLoading(false);
          return;
        }
      }

      const spentNow1 =
        typeof r1.usageTotal === "number"
          ? r1.usageTotal
          : basePrompt.length + raw1.length;
      setSpent((p) => p + (spentNow1 || 0));

      setEmailSubject(subject1 || (outputLang === "EUS" ? "Kontsulta" : "Consulta"));
      setResult(builtBody1);
      setLastEmailSig(canonicalize(textValue));
      setIsOutdated(false);
    } catch (err) {
      setErrorMsg(
        err.message || tr("emailCreator.error_generic", "Error generando el email.")
      );
    } finally {
      setLoading(false);
    }
  };

  const canClearLeft =
    !!emailSaludo ||
    !!emailIntro ||
    !!emailFinalPhrase ||
    !!emailSaludo2 ||
    !!emailNombre ||
    (emailParagraphs || []).some((p) => (p || "").trim()) ||
    !!chatInput ||
    !!creativeInfo;

  return (
    <>
      <section className="w-full bg-[#F4F8FF] pt-10 pb-24">
        <div className="max-w-7xl mx-auto w-full px-6">
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

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (emailMode !== "creative") {
                        setEmailMode("creative");
                        clearRight();
                      }
                    }}
                    className="h-9 px-4 rounded-full text-[13px] font-semibold border transition"
                    style={{
                      borderColor: emailMode === "creative" ? BLUE : "#e2e8f0",
                      backgroundColor: emailMode === "creative" ? "#eff6ff" : "#ffffff",
                      color: emailMode === "creative" ? BLUE : "#334155",
                    }}
                    aria-pressed={emailMode === "creative"}
                  >
                    {labelModeCreative}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (emailMode !== "template") {
                        setEmailMode("template");
                        clearRight();
                      }
                    }}
                    className="h-9 px-4 rounded-full text-[13px] font-semibold border transition"
                    style={{
                      borderColor: emailMode === "template" ? BLUE : "#e2e8f0",
                      backgroundColor: emailMode === "template" ? "#eff6ff" : "#ffffff",
                      color: emailMode === "template" ? BLUE : "#334155",
                    }}
                    aria-pressed={emailMode === "template"}
                  >
                    {labelModeTemplate}
                  </button>
                </div>
              </div>

              <div className="flex-1 min-h-0 overflow-auto px-4 py-4">
                {emailMode === "creative" ? (
                  <>
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-slate-800 mb-2">
                        {tr("emailCreator.creative_label", "Información")}
                      </div>
                      <textarea
                        value={creativeInfo}
                        onChange={(e) => {
                          setCreativeInfo(e.target.value);
                          clearRight();
                        }}
                        placeholder={placeholderCreative}
                        className="w-full h-[260px] resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                      />
                    </div>

                    <div className="mt-2">
                      <Button
                        type="button"
                        onClick={() => handleGenerate()}
                        disabled={loading || !hasValidInput}
                        className="h-10 w-full rounded-full text-[14px] font-medium shadow-sm hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
                      >
                        {labelGenerateFromSources}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
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

                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-800">{labelBig3}</div>
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
                            aria-label={labelRemoveParagraph}
                            title={labelRemoveParagraph}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mb-5">
                      <div className="text-sm font-semibold text-slate-800 mb-2">
                        {labelFinal}
                      </div>
                      <textarea
                        value={emailFinalPhrase}
                        onChange={(e) => {
                          setEmailFinalPhrase(e.target.value);
                          clearRight();
                        }}
                        placeholder={placeholderFinal}
                        className="w-full h-11 overflow-hidden resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
                        rows={2}
                      />
                    </div>

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

                    <div className="mb-4">
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
                  </>
                )}
              </div>
            </aside>

            <section className="relative h-[550px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                        aria-label={tr("emailCreator.output_language_aria", "Idioma de salida")}
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
                    title={tr("emailCreator.clear_input", "Eliminar")}
                    className={`h-9 w-9 flex items-center justify-center ${
                      canClearLeft
                        ? "text-slate-600 hover:text-slate-800"
                        : "text-slate-300 cursor-not-allowed"
                    }`}
                    aria-label={tr("emailCreator.clear_input", "Eliminar")}
                    disabled={!canClearLeft}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {limitType && (
                <div className="px-6 pt-4">
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                    {limitMsg}
                  </div>
                </div>
              )}

              {!loading && !result && !errorMsg && !limitType && (
                <>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 z-10"
                    style={{ top: "30%" }}
                  >
                    <Button
                      type="button"
                      onClick={() => handleGenerate()}
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
                  <div className="px-6 pt-6 pb-[110px] max-w-3xl mx-auto">
                    {errorMsg && (
                      <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                        {errorMsg}
                      </div>
                    )}

                    {result && (
                      <>
                        <div className="w-full mb-4">
                          <div
                            className="w-full bg-white"
                            style={{
                              height: 48,
                              display: "flex",
                              alignItems: "center",
                              padding: "0 14px",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            <span
                              className="text-[14px] text-slate-500"
                              style={{
                                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                              }}
                            >
                              Asunto:&nbsp;
                            </span>
                            <span
                              className={`text-[14px] ${
                                emailSubject ? "text-slate-800" : "text-slate-400"
                              }`}
                              style={{
                                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                              }}
                            >
                              {emailSubject ? emailSubject : ""}
                            </span>
                          </div>
                        </div>

                        <div className="w-full">
                          <div
                            className="w-full rounded-xl border border-slate-200 bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] overflow-y-auto"
                            style={{ height: 380, padding: "18px 18px 44px 18px" }}
                          >
                            <div
                              className="text-[15px] leading-6 text-slate-800 whitespace-pre-wrap"
                              style={{
                                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                              }}
                            >
                              {result}
                            </div>
                          </div>
                        </div>

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

      {showMissingInfoConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-[18px] font-semibold text-slate-900 mb-3">
              {tr("emailCreator.missing_info_title", "No hay información suficiente")}
            </h3>

            <p className="text-[14px] leading-6 text-slate-600 mb-6">
              {pendingGenerateMode === "creative"
                ? tr(
                    "emailCreator.missing_info_creative_text",
                    "No hay información suficiente. ¿Deseas continuar? En modo Creativo se completarán los huecos inventando lo necesario de forma coherente."
                  )
                : tr(
                    "emailCreator.missing_info_template_text",
                    "No hay información suficiente. ¿Deseas continuar? En modo Plantilla solo se creará el email con la información disponible, sin inventar nada."
                  )}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeMissingInfoConfirm}
                className="h-10 px-5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                {tr("emailCreator.missing_info_no", "No")}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMissingInfoConfirm(false);
                  setPendingGenerateMode(null);
                  handleGenerate(true);
                }}
                className="h-10 px-5 rounded-full text-white hover:brightness-95"
                style={{ backgroundColor: "#2563eb" }}
              >
                {tr("emailCreator.missing_info_yes", "Sí")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}