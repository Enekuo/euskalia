import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Globe, SearchCheck, PenLine, FileText, Mail, Type, Share2, X, Copy, Trash, Check } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UpgradeBanner from "@/components/UpgradeBanner";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";

export default function EmailCreator() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tr = (key, fallback) => {
    const val = t(key);
    return !val || val === key ? fallback : val;
  };

  const labelToolTranslator = tr("toolsMenu.translatorTitle", "Itzultzailea");
  const labelToolSummarizer = tr("toolsMenu.summaryTitle", "Laburtzailea");
  const labelToolCorrector = tr("toolsMenu.correctorTitle", "Zuzentzailea");
  const labelToolParaphraser = tr("toolsMenu.paraphraserTitle", "Parafraseatzailea");
  const labelToolTextCreator = tr("toolsMenu.textCreatorTitle", "Testu-sortzailea");
  const labelToolEmailCreator = tr("toolsMenu.emailCreatorTitle", "Email-sortzailea");


  const [titleValue, setTitleValue] = useState("");
  const [paragraphs, setParagraphs] = useState([""]);
  const [writeMode, setWriteMode] = useState("normal");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [limitType, setLimitType] = useState("");
  const setCharsLimit = () => setLimitType("chars");
  const setDailyLimit = () => setLimitType("daily");
  const clearLimit = () => setLimitType("");

  const limitMsg =
    limitType === "chars"
      ? tr(
          "textCreator.limit_chars",
          "Has superado el límite máximo de caracteres permitido."
        )
      : limitType === "daily"
      ? tr(
          "textCreator.limit_daily",
          "Has alcanzado el límite diario. Vuelve mañana."
        )
      : "";

  const [targetChars, setTargetChars] = useState(1200);
  const [outputLang, setOutputLang] = useState("EUS");
  const [copiedFlash, setCopiedFlash] = useState(false);
  const [showMissingInfoConfirm, setShowMissingInfoConfirm] = useState(false);

  const normalWrapRef = useRef(null);
  const normalTaRef = useRef(null);

  const BLUE = "#2563eb";
  const MAX_CHARS = 18000;

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -12 },
  };

  const labelSources = tr("textCreator.sources_title", "Fuentes");

  const labelTitulo = tr("textCreator.title_label", "Título");
  const labelParrafo = tr("textCreator.paragraph_label", "Párrafo");
  const labelTitleOptional = tr(
    "textCreator.title_optional",
    "Escribe el título (opcional)"
  );
  const labelAddParagraph = tr("textCreator.add_paragraph", "+ Párrafo");
  const labelParagraphPh = tr("textCreator.paragraph_ph", "Escribe el párrafo");
  const labelRemoveParagraph = tr(
    "textCreator.remove_paragraph",
    "Borrar párrafo"
  );

  const labelTexto = tr("textCreator.text_label", "Texto");
  const labelTextoPh = tr("textCreator.text_ph", "Escribe el texto");

  const labelModeNormal = tr("textCreator.mode_normal", "Normal");
  const labelModeParagraphs = tr("textCreator.mode_paragraphs", "Por párrafos");

  const labelLength = tr("textCreator.length_label", "Longitud");
  const labelLengthAria = tr("textCreator.length_aria", "Longitud en caracteres");
  const labelChars = tr("textCreator.length_chars", "caracteres");

  const labelGenerate = tr("textCreator.generate_from_sources", "Generar");
  const labelHelpRight = tr(
    "textCreator.create_help_right",
    'Rellena el título y/o los párrafos y pulsa "Generar".'
  );

  const LBL_EUS = tr("textCreator.output_language_eus", "Euskara");
  const LBL_ES = tr("textCreator.output_language_es", "Gaztelania");
  const LBL_EN = tr("textCreator.output_language_en", "Ingelesa");
  const LBL_FR = tr("textCreator.output_language_fr", "Français");

  const tooltipCopy = tr("textCreator.copy", "Copiar");
  const tooltipCopied = tr("textCreator.copied", "Copiado");
  const tooltipPdf = tr("textCreator.pdf", "PDF");

  const normalizeText = (text) =>
    String(text || "")
      .replace(/\r/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim();

  const buildBrief = () => {
    const tTitle = (titleValue || "").trim();
    const ps = (paragraphs || [])
      .map((p) => (p || "").trim())
      .filter(Boolean);

    const parts = [];
    if (tTitle) parts.push(`TÍTULO (opcional): ${tTitle}`);

    if (ps.length) {
      if (writeMode === "paragraphs") {
        parts.push(
          `PÁRRAFOS DEL USUARIO (1 bloque por párrafo; NO mezclar):\n${ps
            .map((p, i) => `${i + 1}) ${p}`)
            .join("\n")}`
        );
      } else {
        parts.push(`CONTENIDO / IDEAS DEL USUARIO:\n${ps.join("\n")}`);
      }
    }

    return parts.join("\n\n").trim();
  };

  const hasValidInput = useMemo(() => {
    const tTitle = (titleValue || "").trim();
    const ps = (paragraphs || []).some((p) => (p || "").trim().length > 0);
    return !!tTitle || ps;
  }, [titleValue, paragraphs]);

  const mainTextForCheck = useMemo(() => {
    const tTitle = (titleValue || "").trim();

    const ps = (paragraphs || [])
      .map((p) => (p || "").trim())
      .filter(Boolean); 

    return [tTitle, ...ps]
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }, [titleValue, paragraphs]);

  const evaluateEnoughInformation = async (text) => {
    if (!text || !text.trim()) return false;

    try {
      const res = await fetch("/api/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: "text_creator_check",
          mode: "text_creator_check",
          dst: outputLang === "EUS" ? "eus" : outputLang.toLowerCase(),
          lang: outputLang,
          messages: [
            {
              role: "system",
              content:
              "Debes decidir si el usuario ha dado suficiente información concreta y útil para crear un texto coherente sin tener que inventar el tema principal ni completar excesivamente el contexto por tu cuenta. Si la información es demasiado vaga, insuficiente o ambigua, responde NO. Responde únicamente YES o NO.",
            },
            {
              role: "user",
              content: `
Texto del usuario:
"${text}"

¿Hay suficiente información para crear un texto coherente y útil?
Responde SOLO YES o NO.
`,
            },
          ],
          length: "short_check",
        }),
      });

      if (!res.ok) return true;

      const data = await res.json();

      const raw =
        data?.text ??
        data?.content ??
        data?.choices?.[0]?.message?.content ??
        "";

      const cleaned = String(raw || "")
        .trim()
        .toUpperCase();

      return cleaned === "YES";
    } catch {
      return true;
    }
  };

  const closeMissingInfoConfirm = () => {
    setShowMissingInfoConfirm(false);
  };

  const clearRight = () => {
    setResult("");
    setErrorMsg("");
    clearLimit();
    setLoading(false);
  };

  const addParagraph = () => {
    setParagraphs((prev) => [...prev, ""]);
    clearRight();
  };

  const updateParagraph = (idx, value) => {
    setParagraphs((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const removeParagraph = (idx) => {
    setParagraphs((prev) => {
      if (prev.length <= 1) return [""];
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [""];
    });
    clearRight();
  };

  const autoGrowNormal = () => {
    const wrap = normalWrapRef.current;
    const ta = normalTaRef.current;
    if (!wrap || !ta) return;

    const maxH = wrap.clientHeight;

    ta.style.height = "auto";

    const nextH = Math.min(ta.scrollHeight, maxH);
    ta.style.height = `${nextH}px`;

    ta.style.overflowY = ta.scrollHeight > maxH ? "auto" : "hidden";
  };

  useEffect(() => {
    if (writeMode === "normal") {
      setTimeout(() => autoGrowNormal(), 0);
    }
  }, [writeMode]);

  useEffect(() => {
    if (writeMode !== "normal") return;
    setTimeout(() => autoGrowNormal(), 0);
  }, [paragraphs, titleValue, writeMode]);

  const titleUpper = useMemo(
    () => (titleValue || "").trim().toUpperCase(),
    [titleValue]
  );

  const fullExportText = useMemo(() => {
    const body = (result || "").trim();
    if (!body) return "";
    if (titleUpper) return `${titleUpper}\n\n${body}`;
    return body;
  }, [result, titleUpper]);

  const handleCopy = async (flash = false) => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(fullExportText || result);
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

  const handleDownloadPdf = () => {
    if (!result) return;
    const win = window.open("", "_blank");
    if (!win) return;

    const safeBody = (result || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const pdfTitle = (titleValue || "").trim() || tr("textCreator.pdf_title", "Texto");

    win.document.write(`
      <html>
        <head>
          <title>${pdfTitle}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; line-height: 1.55; }
            .box { max-width: 900px; margin: 0 auto; white-space: pre-wrap; }
            h1 { font-size: 20px; margin: 0 0 16px 0; font-weight: 700; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <div class="box">
            ${
              titleUpper
                ? `<h1>${titleUpper
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}</h1>`
                : ""
            }
            ${safeBody.replace(/\n/g, "<br/>")}
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
    setTitleValue("");
    setParagraphs([""]);
    clearRight();
    if (writeMode === "normal") {
      setTimeout(() => autoGrowNormal(), 0);
    }
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
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, result, fullExportText]);

  const handleGenerate = async (forceContinue = false) => {
    setErrorMsg("");
    clearLimit();

    const brief = buildBrief();

    if (!hasValidInput) {
      setErrorMsg(
        tr(
          "textCreator.error_need_input",
          "Escribe un título o al menos un párrafo antes de generar."
        )
      );
      setLoading(false);
      return;
    }

    if (!forceContinue) {
      const enoughInfo = await evaluateEnoughInformation(mainTextForCheck);

      if (!enoughInfo) {
        setLoading(false);
        setShowMissingInfoConfirm(true);
        return;
      }
    }

    if (brief.length > MAX_CHARS) {
      setCharsLimit();
      setLoading(false);
      return;
    }
    setLoading(true);

    const langInstruction =
      outputLang === "ES"
        ? "Idioma de salida: español (ISO: es). Redacta toda la respuesta en español."
        : outputLang === "EN"
        ? "Output language: English (ISO: en). Write the entire response in English."
        : outputLang === "FR"
        ? "Langue de sortie : français (ISO : fr). Rédige toute la réponse en français."
        : "Irteerako hizkuntza: euskara (ISO: eu). Idatzi erantzun osoa euskaraz.";

    const expectedParagraphsCount =
      writeMode === "paragraphs"
        ? (paragraphs || []).filter((p) => (p || "").trim().length > 0).length || 1
        : 0;

    const systemBase =
      "Eres un asistente que escribe textos originales y coherentes a partir de un briefing. " +
      "No resumas: crea contenido nuevo. " +
      "Respeta el sentido del briefing, mantén un tono natural y profesional. " +
      "Evita listas y viñetas salvo que el usuario las pida explícitamente. " +
      "Entrega el resultado en párrafos. No inventes datos concretos si no aparecen o no se deducen del briefing.";

    const lengthInstruction =
      `La longitud objetivo del texto completo es de aproximadamente ${targetChars} caracteres. ` +
      `Debes ADAPTAR la redacción desde el inicio a esa longitud. ` +
      `No escribas de más para que luego haya que cortar. ` +
      `No devuelvas un texto excesivamente más largo que la longitud solicitada. ` +
      `Margen permitido: ±10%.`;

    const paragraphModeRule =
      writeMode === "paragraphs"
        ? `MODO POR PÁRRAFOS (OBLIGATORIO):
- Devuelve EXACTAMENTE ${expectedParagraphsCount} párrafos en la salida, separados por una línea en blanco.
- Cada párrafo de salida corresponde 1:1 con cada párrafo del usuario (mismo orden). No mezcles contenido entre párrafos.
- La longitud objetivo (${targetChars} caracteres) es TOTAL para todo el texto.
- Reparte la longitud de forma equilibrada entre los ${expectedParagraphsCount} párrafos, con pequeñas variaciones naturales.
- No dejes un primer párrafo muy largo y los demás demasiado cortos.
- No cortes frases ni cierres en falso.`
        : `MODO NORMAL:
- Puedes estructurar el texto libremente en varios párrafos coherentes.
- La longitud objetivo (${targetChars} caracteres) es TOTAL para todo el texto.
- Ajusta la extensión del contenido desde el principio para acercarte a esa longitud sin necesidad de recortes posteriores.`;

    const userContent = [
      "Quiero que redactes un texto completo basándote en este briefing.",
      brief ? `\nBRIEFING:\n${brief}` : "",
      `\nREGLA DE ESTRUCTURA:\n${paragraphModeRule}`,
      `\nREGLA DE LONGITUD:\n${lengthInstruction}`,
      `\n${langInstruction}`,
    ].join("");

    const messages = [
      { role: "system", content: systemBase },
      { role: "user", content: userContent },
    ];

    const cacheBase = JSON.stringify({
      titleValue,
      paragraphs,
      writeMode,
      outputLang,
      targetChars,
    });
    const cacheKey = await sha256Hex(cacheBase);

    try {
      const res = await fetch("/api/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: "text_creator",
          mode: "text_creator",
          dst: outputLang === "EUS" ? "eus" : outputLang.toLowerCase(),
          lang: outputLang,
          messages,
          length: "text_creator",
          cacheKey,
          targetChars,
          writeMode,
        }),
      });

      if (!res.ok) {
        if (res.status === 413) {
          setCharsLimit();
          setLoading(false);
          return;
        }

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

      if (!rawText) {
        throw new Error(
          tr("textCreator.error_no_text", "No se recibió texto de la API.")
        );
      }

      const cleaned = normalizeText(rawText);
      setResult(cleaned);
    } catch (err) {
      setErrorMsg(
        err.message || tr("textCreator.error_generic", "Error generando el texto.")
      );
    } finally {
      setLoading(false);
    }
  };

  const canClearLeft =
    (titleValue || "").trim().length > 0 ||
    (paragraphs || []).some((p) => (p || "").trim().length > 0);

return (
  <>

<h1 className="sr-only">
  Generador de textos con IA en euskera
</h1>

    <section className="w-full bg-[#F4F8FF] pt-10 pb-24">
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="relative">
          <Link
  to="/informacion?tool=creador-texto"
  className="absolute -right-24 top-0 w-12 h-12 rounded-2xl border border-slate-200 bg-white flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
>
  <Menu className="w-5 h-5 text-slate-600" />
</Link>
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
    onClick={() => navigate("/resumen")}
    title={labelToolSummarizer}
    className="w-11 h-11 mt-2 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition shadow-sm"
  >
    <FileText className="w-5 h-5 text-slate-700" />
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
    aria-current="page"
    title={labelToolTextCreator}
    className="w-11 h-11 mt-2 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-center shadow-sm"
  >
    <Type className="w-5 h-5 text-blue-600" />
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
            </div>
      

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
                      if (writeMode !== "normal") {
                        setWriteMode("normal");
                        setParagraphs((prev) => [prev?.[0] ?? ""]);
                        clearRight();
                        setTimeout(() => autoGrowNormal(), 0);
                      }
                    }}
                    className="h-9 px-4 rounded-full text-[13px] font-semibold border transition"
                    style={{
                      borderColor: writeMode === "normal" ? BLUE : "#e2e8f0",
                      backgroundColor: writeMode === "normal" ? "#eff6ff" : "#ffffff",
                      color: writeMode === "normal" ? BLUE : "#334155",
                    }}
                    aria-pressed={writeMode === "normal"}
                  >
                    {labelModeNormal}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (writeMode !== "paragraphs") {
                        setWriteMode("paragraphs");
                        clearRight();
                      }
                    }}
                    className="h-9 px-4 rounded-full text-[13px] font-semibold border transition"
                    style={{
                      borderColor: writeMode === "paragraphs" ? BLUE : "#e2e8f0",
                      backgroundColor: writeMode === "paragraphs" ? "#eff6ff" : "#ffffff",
                      color: writeMode === "paragraphs" ? BLUE : "#334155",
                    }}
                    aria-pressed={writeMode === "paragraphs"}
                  >
                    {labelModeParagraphs}
                  </button>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-4 flex-1 min-h-0">
                <div className="flex flex-col gap-2">
                  <div className="text-[14px] font-medium text-slate-800">{labelTitulo}</div>
                  <input
                    value={titleValue}
                    onChange={(e) => {
                      setTitleValue(e.target.value);
                      clearRight();
                    }}
                    placeholder={labelTitleOptional}
                    className="w-full h-[44px] rounded-xl border border-slate-300 bg-white px-4 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-400/40"
                  />
                </div>

                {writeMode === "normal" && (
                  <div ref={normalWrapRef} className="flex flex-col gap-2 flex-1 min-h-0">
                    <div className="text-[14px] font-medium text-slate-800">{labelTexto}</div>
                    <textarea
                      ref={normalTaRef}
                      value={paragraphs?.[0] ?? ""}
                      onChange={(e) => {
                        updateParagraph(0, e.target.value);
                        clearRight();
                      }}
                      onInput={() => autoGrowNormal()}
                      placeholder={labelTextoPh}
                      className="w-full flex-1 min-h-0 resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-400/40"
                      style={{ minHeight: "24px", overflowY: "hidden" }}
                    />
                  </div>
                )}

                {writeMode === "paragraphs" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-[14px] font-medium text-slate-800">{labelParrafo}</div>
                      <button
                        type="button"
                        onClick={addParagraph}
                        className="text-[14px] font-medium text-slate-700 hover:text-slate-900"
                      >
                        {labelAddParagraph}
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {paragraphs.map((p, idx) => (
                        <div key={idx} className="relative">
                          <textarea
                            value={p}
                            onChange={(e) => {
                              updateParagraph(idx, e.target.value);
                              clearRight();
                            }}
                            placeholder={labelParagraphPh}
                            className="w-full h-[88px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-400/40"
                          />
                          <button
                            type="button"
                            onClick={() => removeParagraph(idx)}
                            aria-label={labelRemoveParagraph}
                            title={labelRemoveParagraph}
                            className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {writeMode === "paragraphs" ? (
                <div className="flex-1 min-h-0 overflow-hidden" />
              ) : (
                <div className="h-0 overflow-hidden" />
              )}
            </aside>

            <section className="relative h-[550px] pb-[100px] rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden -ml-px">
             <div className="min-h-[44px] sm:h-11 flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between px-3 sm:px-4 py-2 sm:py-0 gap-3 border-b border-slate-200 bg-slate-50/60">
                <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-0 w-full sm:w-auto overflow-x-auto sm:overflow-visible">
                  <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                    {labelLength}
                  </span>

                  <input
                    type="range"
                    min={300}
                    max={18000}
                    step={100}
                    value={targetChars}
                    onChange={(e) => {
                      setTargetChars(Number(e.target.value));
                      clearRight();
                    }}
                    className="w-[90px] sm:w-[220px]"
                    aria-label={labelLengthAria}
                  />

                 <span className="text-[13px] sm:text-sm text-slate-700 tabular-nums w-[72px] sm:w-[125px] text-right leading-4">
                    {targetChars.toLocaleString("es-ES")} {labelChars}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1 w-full sm:w-auto mr-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="h-9 min-w-[150px] px-3 border border-slate-300 rounded-xl bg-white text-sm text-slate-800 flex items-center justify-between hover:border-slate-400 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] translate-x-[-10px]"
                        aria-label={tr(
                          "textCreator.output_language_aria",
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
                      <DropdownMenuItem onClick={() => setOutputLang("EUS")}>
                        {LBL_EUS}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setOutputLang("ES")}>
                        {LBL_ES}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setOutputLang("EN")}>
                        {LBL_EN}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setOutputLang("FR")}>
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
      ? tr("textCreator.copied", "Copiado")
      : tr("textCreator.copy", "Copiar")
  }
  className={`h-8 w-8 flex items-center justify-center translate-x-[10px] ${
    result
      ? "text-slate-600 hover:text-slate-800"
      : "text-slate-300 cursor-not-allowed"
  }`}
  aria-label={
    copiedFlash
      ? tr("textCreator.copied", "Copiado")
      : tr("textCreator.copy", "Copiar")
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
                    title={tr("textCreator.clear_input", "Eliminar")}
                    className={`h-8 w-8 flex items-center justify-center translate-x-[15px] ${
                      canClearLeft
                        ? "text-slate-600 hover:text-slate-800"
                        : "text-slate-300 cursor-not-allowed"
                    }`}
                    aria-label={tr("textCreator.clear_input", "Eliminar")}
                    disabled={!canClearLeft}
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
                          {labelGenerate}
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
                      <div className="px-6 pt-10 pb-[110px] max-w-3xl mx-auto">
                        {errorMsg && (
                          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                            {errorMsg}
                          </div>
                        )}

                        {result && (
                          <>
                            <div className="max-h-[420px] overflow-y-auto pr-2">
                              {titleUpper ? (
                                <div className="text-[16px] font-bold text-slate-900 mb-4 text-center w-full">
                                  {titleUpper}
                                </div>
                              ) : null}

                              <article className="prose prose-slate max-w-none">
                                <p className="whitespace-pre-wrap">{result}</p>
                              </article>
                            </div>

                            <div className="absolute bottom-4 right-6 flex items-center gap-4">
                              <div className="flex items-center gap-4 mr-[20px] translate-y-1">
                                                                <button
                                  type="button"
                                  onClick={() => handleCopy(true)}
                                  aria-label={
                                    copiedFlash
                                      ? t("translator.copied")
                                      : t("translator.copy")
                                  }
                                  className="group relative inline-flex items-center justify-center text-slate-500 hover:text-slate-700 p-2 rounded-md hover:bg-slate-100"
                                >
                                  {copiedFlash ? (
                                    <Check className="w-5 h-5" style={{ color: BLUE }} />
                                  ) : (
                                    <Copy className="w-5 h-5" />
                                  )}

                                  <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                                    {copiedFlash
                                      ? t("translator.copied")
                                      : t("translator.copy")}
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={handleShare}
                                  aria-label={t("translator.share")}
                                  className="group relative inline-flex items-center justify-center text-slate-500 hover:text-slate-700 p-2 rounded-md hover:bg-slate-100"
                                >
                                  <Share2 className="w-5 h-5" />

                                  <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                                    {t("translator.share")}
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
                </>
              )}
            </section>
          </motion.section>
        </div>
      </section>

      {showMissingInfoConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-[18px] font-semibold text-slate-900 mb-3">
              {tr("textCreator.missing_info_title", "No hay información suficiente")}
            </h3>

            <p className="text-[14px] leading-6 text-slate-600 mb-6">
              {tr(
                "textCreator.missing_info_text",
                "No hay información suficiente. ¿Deseas continuar? La IA interpretará la idea y completará el contenido de forma coherente."
              )}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeMissingInfoConfirm}
                className="h-10 px-5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                {tr("textCreator.missing_info_no", "Atrás")}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowMissingInfoConfirm(false);
                  handleGenerate(true);
                }}
                className="h-10 px-5 rounded-full text-white hover:brightness-95"
                style={{ backgroundColor: "#2563eb" }}
              >
                {tr("textCreator.missing_info_yes", "Crear")}
              </button>
            </div>
          </div>
        </div>
      )}
        
          <BenefitsSection />
          <HowItWorks />
          <FaqSection />
          <Footer />
        </>
  );
}