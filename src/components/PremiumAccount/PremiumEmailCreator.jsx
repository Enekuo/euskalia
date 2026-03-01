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

export default function PremiumEmailCreator() {
  const { t } = useTranslation();

  // ✅ evita que se muestre la clave literal si falta traducción
  const tr = (key, fallback) => {
    const val = t(key);
    return !val || val === key ? fallback : val;
  };

  // ===== Estado =====
  const [sourceMode, setSourceMode] = useState(null); // null | "text"
  const [textValue, setTextValue] = useState("");

  // ✅ Prompt input inferior
  const [chatInput, setChatInput] = useState("");

  // ✅ Modo: plantilla vs creativo
  const [emailMode, setEmailMode] = useState("template"); // "template" | "creative"
  const [creativeInfo, setCreativeInfo] = useState("");

  // Resultado / carga / error
  const [result, setResult] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
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

  // Longitud del email
  const [emailLength, setEmailLength] = useState("breve"); // "breve" | "medio" | "detallado"

  // Idioma de salida (EUS/ES/EN/FR)
  const [outputLang, setOutputLang] = useState("EUS");

  // Track “email desactualizado”
  const [lastEmailSig, setLastEmailSig] = useState(null);
  const [isOutdated, setIsOutdated] = useState(false);

  // URLs (se mantiene por atajos Escape)
  const [urlInputOpen, setUrlInputOpen] = useState(false);

  // Copia: flash de tic azul
  const [copiedFlash, setCopiedFlash] = useState(false);

  // Estado y timer para mensaje "Guardado en biblioteca"
  const [savedToLibrary, setSavedToLibrary] = useState(false);
  const savedTimerRef = useRef(null);

  // ✅ inputs del creador (plantilla)
  const [emailSaludo, setEmailSaludo] = useState("");
  const [emailIntro, setEmailIntro] = useState("");
  const [emailParagraphs, setEmailParagraphs] = useState([""]); // mínimo 1
  const [emailFinalPhrase, setEmailFinalPhrase] = useState(""); // ✅ (4) Frase final (opcional usuario, SIEMPRE la crea la IA)
  const [emailSaludo2, setEmailSaludo2] = useState(""); // ✅ (5) Saludo / cierre
  const [emailNombre, setEmailNombre] = useState(""); // ✅ (6) Nombre

  // ===== Estilos / constantes =====
  const BLUE = "#2563eb";
  const GRAY_TEXT = "#64748b";
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
    "Hautatu iturri bat eta sakatu “Emaila sortu”."
  );
  const labelGenerateWithPrompt = tr(
    "premiumEmailCreator.generate_with_prompt",
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

  // ✅ Labels del creador (RENÚMEROS: frase final=4, saludo=5, nombre=6)
  const labelSmall1 = tr("premiumEmailCreator.small_1", "1- Saludo");
  const labelSmall2 = tr("premiumEmailCreator.small_2", "2- Introducción");
  const labelBig3 = tr("premiumEmailCreator.big_3", "3- Párrafo");
  const labelFinal = tr("premiumEmailCreator.final_phrase", "4- Frase final"); // ✅ ahora es 4
  const labelSmall4 = tr("premiumEmailCreator.small_4", "5- Saludo"); // ✅ ahora es 5
  const labelSmall5 = tr("premiumEmailCreator.small_5", "6- Nombre"); // ✅ ahora es 6

  const placeholderSaludo = tr("premiumEmailCreator.saludo_ph", "Escribe el saludo...");
  const placeholderIntro = tr("premiumEmailCreator.intro_ph", "Escribe la introducción...");
  const placeholderParagraph = tr("premiumEmailCreator.paragraph_ph", "Escribe el párrafo");
  const placeholderFinal = tr(
    "premiumEmailCreator.final_phrase_ph",
    "Escribe la frase final..."
  );
  const placeholderSaludo2 = tr("premiumEmailCreator.saludo2_ph", "Escribe el saludo...");
  const placeholderNombre = tr("premiumEmailCreator.nombre_ph", "Escribe el nombre...");
  const labelAddParagraph = tr("premiumEmailCreator.add_paragraph", "+ Párrafo");
  const labelRemoveParagraph = tr(
    "premiumEmailCreator.remove_paragraph",
    "Eliminar párrafo"
  );

  // ✅ Botones modo
  const labelModeTemplate = tr("premiumEmailCreator.mode_template", "Plantilla");
  const labelModeCreative = tr("premiumEmailCreator.mode_creative", "Creativo");
  const placeholderCreative = tr(
    "premiumEmailCreator.creative_ph",
    "Escribe aquí toda la información: a quién va dirigido, objetivo, contexto, puntos clave, tono, si quieres CTA, etc..."
  );

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
      defaultFinalPhrase: isInformal
        ? "Zure erantzunaren zain geratzen naiz."
        : "Zure erantzunaren zain geratzen naiz.",
    };
  };

  const languageLooksWrong = (text, lang) => {
    const s = canonicalize(text);
    if (!s) return false;

    const esHits = /\b(el|la|los|las|de|que|y|para|por|estoy|me|mi|tu|gracias|atentamente)\b/.test(
      s
    );
    const eusHits = /\b(eta|da|dut|dudala|zure|mesedez|eskerrik|agur|adeitasunez|naiz|nahi)\b/.test(
      s
    );
    const enHits = /\b(the|and|to|for|i|you|please|regards|sincerely)\b/.test(s);
    const frHits = /\b(le|la|les|de|que|et|pour|je|vous|cordialement)\b/.test(s);

    if (lang === "EUS") return esHits || enHits || frHits ? !eusHits : false;
    if (lang === "ES") return eusHits || enHits || frHits ? !esHits : false;
    if (lang === "EN") return esHits || eusHits || frHits ? !enHits : false;
    if (lang === "FR") return esHits || eusHits || enHits ? !frHits : false;
    return false;
  };

  // ===== construir textValue desde inputs (solo plantilla) =====
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

  // ===== Limpieza del panel derecho =====
  const clearRight = () => {
    setResult("");
    setEmailSubject("");
    setErrorMsg("");
    clearLimit();
    setIsOutdated(false);
    setLoading(false);
    setSavedToLibrary(false);
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
  }, [loading, result, urlInputOpen]);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  // ===== Validación =====
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
      return !!(creativeInfo || "").trim();
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

  // ===== Acciones =====
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

    const safeSubject = (emailSubject || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeBody = (result || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    win.document.write(`
      <html>
        <head>
          <title>${tr("premiumEmailCreator.pdf_title", "Email")}</title>
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

  const handleSaveEmail = () => {
    if (!result) return;

    const titleBase = normalizeSubject(emailSubject);
    const raw = result.trim();
    const firstLine = raw.split("\n")[0];
    const maxTitleLength = 90;

    let title =
      titleBase || firstLine || tr("premiumEmailCreator.library_default_title", "Email");
    if (title.length > maxTitleLength) {
      title = title.slice(0, maxTitleLength).trimEnd() + "…";
    }

    addLibraryDoc({
      kind: "email",
      title,
      content: `Asunto: ${emailSubject}\n\n${result}`,
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
    const user = auth.currentUser;
    if (!user) {
      throw new Error(
        tr("premiumEmailCreator.error_auth_required", "Necesitas iniciar sesión para usar Premium.")
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
      if (res.status === 413) return { kind: "limit", type: "chars" };
      if (res.status === 429) return { kind: "limit", type: "daily" };
      if (res.status === 401 || res.status === 403) {
        throw new Error(
          tr("premiumEmailCreator.error_auth_required", "Necesitas iniciar sesión para usar Premium.")
        );
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

    return { kind: "ok", rawText };
  };

  // ===== Generar =====
  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg("");
    clearLimit();
    setSavedToLibrary(false);

    if ((textValue || "").length > MAX_CHARS && emailMode === "template") {
      setCharsLimit();
      setLoading(false);
      return;
    }

    if (emailMode === "creative" && (creativeInfo || "").length > MAX_CHARS) {
      setCharsLimit();
      setLoading(false);
      return;
    }

    if (!hasAnyInput) {
      setErrorMsg(
        tr("premiumEmailCreator.error_need_input", "Añade algo de información antes de generar el email.")
      );
      setLoading(false);
      return;
    }

    if (!paragraphMinOk) {
      setErrorMsg(
        tr(
          "premiumEmailCreator.error_paragraph_min_words",
          "Cada párrafo debe tener al menos 5 palabras (los demás campos pueden ser cortos)."
        )
      );
      setLoading(false);
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
      "- intro: un párrafo.\n" +
      "- paragraphs: array de párrafos (uno por cada idea del usuario).\n" +
      "- finalPhrase: una frase final (SIEMPRE debes crearla aunque el usuario no la escriba).\n" +
      "- closing: SOLO cierre (ej: '" +
      defaultClosing +
      "') (sin nombre).\n" +
      "- name: SOLO el nombre (ej: '" +
      finalName +
      "').\n" +
      "REGLA: si el usuario escribe en otro idioma, tú lo REESCRIBES al idioma de salida.\n" +
      "REGLA: no copies literal, interpreta y mejora las frases.";

    const basePrompt =
      emailMode === "creative"
        ? [
            "El usuario escribe rápido y suelto. Interpreta y crea un email perfecto, con frases buenas y coherentes.",
            "",
            "MODO: CREATIVO",
            "El usuario solo aporta información general. Tú debes inferir todas las partes del email (saludo, intro, párrafos, frase final, cierre y nombre si falta).",
            "",
            "INFORMACIÓN DEL USUARIO (puede estar en cualquier idioma):",
            `${(creativeInfo || "").trim()}`,
            "",
            `REGLAS:\n${schemaRules}`,
            `${toneRule}`,
            `${lengthRule}`,
            `${langInstruction}`,
            "",
            "IMPORTANTE: TODO debe salir en el idioma del selector, sin mezcla.",
          ].join("\n")
        : [
            "El usuario escribe rápido y suelto. Interpreta y crea un email perfecto, con frases buenas y coherentes.",
            "",
            "DATOS DEL USUARIO (pueden estar en cualquier idioma):",
            `- (1) Saludo: ${(emailSaludo || "").trim() || "(vacío -> crea uno)"}`,
            `- (2) Intro: ${(emailIntro || "").trim() || "(vacío -> crea una)"}`,
            `- (3) Párrafos/Notas:\n${
              paragraphsBlock ? paragraphsBlock : "(vacío -> crea contenido mínimo coherente)"
            }`,
            `- (4) Frase final: ${(emailFinalPhrase || "").trim() || "(vacío -> crea una)"}`,
            `- (5) Cierre: ${(emailSaludo2 || "").trim() || "(vacío -> usa uno adecuado)"}`,
            `- (6) Nombre: ${(emailNombre || "").trim() || `(vacío -> usa "${finalName}")`}`,
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
    const cacheKey = await sha256Hex(cacheBase);

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
            "premiumEmailCreator.error_no_text",
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

      const finalClosing =
        (emailSaludo2 || "").trim() || parts1.closing || defaultClosing;

      // ✅ Frase final: opcional usuario, pero SIEMPRE la IA la crea
      const finalFinalPhrase =
        (emailFinalPhrase || "").trim() || parts1.finalPhrase || defaultFinalPhrase;

      const safeParts = {
        saludo: parts1.saludo,
        intro: parts1.intro,
        paragraphs: (parts1.paragraphs || [])
          .map((p) => String(p || "").trim())
          .filter(Boolean),
        finalPhrase: finalFinalPhrase,
        closing: finalClosing,
        name: parts1.name || finalName,
      };

      let builtBody1 = buildBodyFromParts(safeParts);

      const combined1 = `${subject1}\n${builtBody1}`;
      if (languageLooksWrong(combined1, outputLang)) {
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
            (emailFinalPhrase || "").trim() || parts2.finalPhrase || defaultFinalPhrase;

          const safeParts2 = {
            saludo: parts2.saludo,
            intro: parts2.intro,
            paragraphs: (parts2.paragraphs || [])
              .map((p) => String(p || "").trim())
              .filter(Boolean),
            finalPhrase: finalFinalPhrase2,
            closing: finalClosing2,
            name: parts2.name || finalName,
          };

          const builtBody2 = buildBodyFromParts(safeParts2);

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

      setEmailSubject(subject1 || (outputLang === "EUS" ? "Kontsulta" : "Consulta"));
      setResult(builtBody1);
      setLastEmailSig(canonicalize(textValue));
      setIsOutdated(false);
    } catch (err) {
      setErrorMsg(
        err.message || tr("premiumEmailCreator.error_generic", "Error generando el email.")
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

                {/* ✅ Botones: Creativo / Plantilla */}
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
                        {tr("premiumEmailCreator.creative_label", "Información")}
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
                        onClick={handleGenerate}
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
                    {/* 1 */}
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

                    {/* 2 */}
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

                    {/* 3 */}
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

                    {/* ✅ 4 - Frase final */}
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

                    {/* ✅ 5 - Saludo */}
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

                    {/* ✅ 6 - Nombre */}
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

            {/* ===== Panel Derecho ===== */}
            <section className="relative h-[600px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
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
                        aria-label={tr("premiumEmailCreator.output_language_aria", "Idioma de salida")}
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
                      result ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
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
                      canClearLeft ? "text-slate-600 hover:text-slate-800" : "text-slate-300 cursor-not-allowed"
                    }`}
                    aria-label={tr("premiumEmailCreator.clear_input", "Eliminar")}
                    disabled={!canClearLeft}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {limitType && (
                <div className="px-6 pt-4">
                  <ProLimitBanner visible={!!limitType} message={limitMsg} />
                </div>
              )}

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
                              style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
                            >
                              Asunto:&nbsp;
                            </span>
                            <span
                              className={`text-[14px] ${emailSubject ? "text-slate-800" : "text-slate-400"}`}
                              style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
                            >
                              {emailSubject ? emailSubject : ""}
                            </span>
                          </div>
                        </div>

                        <div className="w-full">
                          <div
                         className="w-full rounded-xl border border-slate-200 bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] overflow-y-auto"
                         style={{ height: 320, padding: "18px 18px" }}
                        >
                       
                            <div
                              className="text-[15px] leading-6 text-slate-800 whitespace-pre-wrap"
                              style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
                            >
                              {result}
                            </div>
                          </div>
                        </div>

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
                            onClick={handleSaveEmail}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="inline-flex items-center justify-center rounded-full px-6 h-9 text-sm font-semibold text-white hover:brightness-95 active:scale-[0.98] transition-all"
                            style={{ backgroundColor: "#22c55e" }}
                          >
                            {labelSaveEmail}
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