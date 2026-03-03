import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/translations";
import ProLimitBanner from "@/components/ProAccount/ProLimitBanner";
import {
  Volume2,
  Copy as CopyIcon,
  FileDown,
  Trash2,
  Check,
  FileText,
  File as FileIcon,
  Link2 as UrlIcon,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { addLibraryDoc } from "@/proLibraryStore";
import { auth } from "@/lib/firebase";

const OPTIONS = ["eus", "es", "en", "fr"]; // EUS, ES, EN, FR
const OPTIONS_SRC = ["auto", ...OPTIONS];
const OPTIONS_DST = [...OPTIONS];

const MAX_CHARS = 5000;

// FIX: forzar idioma destino en el prompt
const languageNameForPrompt = (code) => {
  if (code === "eus") return "euskera (Euskara)";
  if (code === "es") return "español";
  if (code === "en") return "inglés";
  if (code === "fr") return "francés";
  return code || "idioma de destino";
};

const directionText = (src, dst) => {
  const dstName = languageNameForPrompt(dst);
  const srcName = src === "auto" ? "el idioma detectado" : languageNameForPrompt(src);

  if (src === "auto") {
    return `
Eres Euskalia, un traductor profesional.
Detecta el idioma del texto de entrada.
La PRIMERA línea de tu respuesta debe ser EXACTAMENTE:
DETECTED_LANGUAGE: <codigo_idioma>
Ejemplos de código: es, en, fr, de, pt-BR, it, nl, ru, ar, ja, zh, etc.
Después de esa primera línea, escribe ÚNICAMENTE el texto traducido, sin etiquetas.
NO escribas "Traducción:", "Translation:", "Resultado:", comillas, ni explicaciones.

Traduce SIEMPRE al idioma de destino: ${dstName}.
Responde SIEMPRE en ${dstName}.
No añadas explicaciones ni comentarios.
Devuelve solo el texto final traducido (sin prefijos).
`.trim();
  }

  // Casos especiales conservados
  if (src === "eus" && dst === "es") {
    return `
Eres Euskalia, un traductor profesional.
Traduce SIEMPRE de Euskera a Español.
Devuelve ÚNICAMENTE la traducción en Español. NO escribas "Traducción:" ni ningún prefijo.
No cambies de idioma en la traducción.
No añadas explicaciones.
`.trim();
  }
  if (src === "es" && dst === "eus") {
    return `
Eres Euskalia, itzulpen profesionaleko tresna bat.
Itzuli BETI gaztelaniatik euskarara.
Erantzun BETI euskaraz itzulpena ematean.
Ez aldatu hizkuntza itzulpenean.
Ez eman azalpenik.
Ez idatzi "Itzulpena:" edo antzeko aurrizkirik.
`.trim();
  }

  return `
Eres Euskalia, un traductor profesional.
Traduce SIEMPRE de ${srcName} a ${dstName}.
Devuelve ÚNICAMENTE la traducción en ${dstName}. NO escribas "Traducción:" ni ningún prefijo.
No añadas explicaciones ni comentarios.
`.trim();
};

export default function PremiumTranslator() {
  const { t, language } = useTranslation();

  // tr compatible (si falta clave, usa fallback)
  const tr = (k, f = "") => {
    const v = typeof t === "function" ? t(k) : "";
    if (!v) return f;
    if (v === k) return f;
    return v;
  };

  // ===== LIMITS (Premium) =====
  // ✅ NO guardar textos traducidos en state
  const [limitType, setLimitType] = useState(""); // "" | "chars" | "daily"

  const setCharsLimit = () => setLimitType("chars");
  const setDailyLimit = () => setLimitType("daily");
  const clearLimit = () => setLimitType("");

  const limitMsg =
    limitType === "daily"
      ? tr("premiumTranslator_limit_daily", "Has alcanzado tu límite diario del plan Premium. Vuelve mañana.")
      : limitType === "chars"
      ? tr("premiumTranslator_limit_chars", "Has superado el límite máximo de caracteres para tu plan Premium.")
      : "";

  // ===== ERROR (derivado, no fijo) =====
  const [errorMsg, setErrorMsg] = useState(""); // raw (si viene de backend o runtime)
  const [errorKey, setErrorKey] = useState("");
  const [errorFallback, setErrorFallback] = useState("");

  const clearError = () => {
    setErrorMsg("");
    setErrorKey("");
    setErrorFallback("");
  };

  const displayErr = errorMsg || (errorKey ? tr(errorKey, errorFallback) : "");

  // ===== Detectar idioma: labels =====
  const LBL_AUTO = tr("premiumTranslator_detect_language", "Detectar idioma");
  const LBL_DETECTED = tr("premiumTranslator_detected", "detectado");

  // Etiquetas idiomas (claves underscore)
  const LBL_EUS = tr("premiumTranslator_output_language_eus", "Euskara");
  const LBL_ES = tr("premiumTranslator_output_language_es", "Español");
  const LBL_EN = tr("premiumTranslator_output_language_en", "English");
  const LBL_FR = tr("premiumTranslator_output_language_fr", "Français");

  const langLabel = (val) => {
    if (val === "auto") return LBL_AUTO;
    if (val === "eus") return LBL_EUS;
    if (val === "es") return LBL_ES;
    if (val === "en") return LBL_EN;
    if (val === "fr") return LBL_FR;
    return val;
  };

  const normalizeDetected = (code) => {
    const c = (code || "").trim();
    if (!c) return "";
    return c.split("-")[0];
  };

  const getDisplayLanguageName = (code) => {
    const c = (code || "").trim();
    if (!c) return "";
    try {
      const ui = ((language || "es") + "").toLowerCase();
      const locale = ui === "eus" ? "eu" : ui;
      const dn = new Intl.DisplayNames([locale], { type: "language" });
      const out = dn.of(c);
      return out || c;
    } catch {
      return c;
    }
  };

  // ===== Estado principal =====
  const [src, setSrc] = useState("auto");
  const [dst, setDst] = useState("es");
  const [detectedLang, setDetectedLang] = useState("");

  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);

  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");

  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const [sourceMode, setSourceMode] = useState("text"); // "text" | "document" | "url"

  const [documents, setDocuments] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [urlsTextarea, setUrlsTextarea] = useState("");
  const [urlItems, setUrlItems] = useState([]);

  const [speaking, setSpeaking] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioElRef = useRef(null);
  const ttsAbortRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftTA = useRef(null);
  const rightTA = useRef(null);

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const micChunksRef = useRef([]);

  const [savedToLibrary, setSavedToLibrary] = useState(false);
  const savedTimerRef = useRef(null);

  const [resultStatus, setResultStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"

  // ✅ token para /api/premium
  const getPremiumToken = async () => {
    const user = auth?.currentUser;
    if (!user) throw new Error("NOT_AUTHENTICATED");
    const token = await user.getIdToken();
    if (!token) throw new Error("NO_TOKEN");
    return token;
  };

  useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    },
    []
  );

  const swap = () => {
    if (src === "auto") return;
    setSrc(dst);
    setDst(src);
  };

  useEffect(() => {
    const onDown = (e) => {
      if (leftRef.current && !leftRef.current.contains(e.target)) setOpenLeft(false);
      if (rightRef.current && !rightRef.current.contains(e.target)) setOpenRight(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  const HIDE_SCROLLBAR =
    "overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

  const FIXED_PANEL_H = "h-[400px] md:h-[420px]";

  const isNonResultMessage = (txt) => {
    const s = (txt || "").trim();
    if (!s) return true;

    const low = s.toLowerCase();

    const patterns = [
      "lo siento",
      "no puedo ayudar",
      "no puedo",
      "no estoy disponible",
      "no puedo asistirte",
      "i'm sorry",
      "i cannot",
      "i can't",
      "i am unable",
      "i can’t",
      "sorry,",
      "ezin dut",
      "barkatu",
      "ez naiz gai",
      "no se puede traducir",
      "no puedo traducir",
      "no es una palabra",
      "no es una palabra en",
      "no existe en euskera",
      "no tiene traducción",
    ];

    return patterns.some((p) => low.includes(p));
  };

  const extractDetectedLine = (txt) => {
    const s = (txt || "").toString();
    const m = s.match(/^\s*DETECTED_LANGUAGE\s*:\s*([^\r\n]+)\s*[\r\n]+/i);
    if (!m) return { code: "", cleaned: s };
    const code = (m[1] || "").trim();
    const cleaned = s.slice(m[0].length);
    return { code, cleaned };
  };

  const applyTranslationOutput = (data) => {
    let out =
      (data?.text ??
        data?.content ??
        data?.translation ??
        data?.choices?.[0]?.message?.content ??
        data?.message?.content ??
        "") + "";

    if (src === "auto") {
      const { code, cleaned } = extractDetectedLine(out);
      if (code) setDetectedLang(code);
      out = cleaned;
    } else {
      if (detectedLang) setDetectedLang("");
    }

    const flaggedRefusal =
      data?.refusal === true ||
      data?.blocked === true ||
      data?.ok === false ||
      typeof data?.error === "string";

    if (flaggedRefusal) {
      setRightText(out || "");
      setResultStatus("error");
      return false;
    }

    if (!out.trim()) {
      setRightText("");
      setResultStatus("idle");
      return false;
    }

    if (isNonResultMessage(out)) {
      setRightText(out);
      setResultStatus("error");
      return false;
    }

    // ✅ limpieza por si se cuela el prefijo
    out = out.replace(/^\s*(traducci[oó]n|translation|resultado)\s*:\s*/i, "");

    setRightText(out);
    setResultStatus("success");
    return true;
  };

  useEffect(() => {
    if (src !== "auto") return;
    if (!leftText.trim()) setDetectedLang("");
  }, [leftText, src]);

  const detectedName = getDisplayLanguageName(normalizeDetected(detectedLang));
  const autoShownLabel = !leftText.trim()
    ? LBL_AUTO
    : detectedName
    ? `${detectedName} (${LBL_DETECTED})`
    : LBL_AUTO;

  // ===== Botón traducir (manual en texto) =====
  const [translateTick, setTranslateTick] = useState(0);
  const [dirty, setDirty] = useState(false);

  const labelTranslateBtn = tr(
    "premiumTranslator_translate_button",
    (language || "").toString().toUpperCase() === "EUS" ? "Itzuli" : "Traducir"
  );

  const hasRealResult = !!(rightText && rightText.trim().length > 0);

  const handleTranslateClick = () => {
    if (sourceMode !== "text") return;
    if (!leftText.trim()) return;

    clearLimit();
    clearError();

    if (leftText.length > MAX_CHARS) {
      setCharsLimit();
      setErrorKey("premiumTranslator_errorMaxChars");
      setErrorFallback("Has superado el límite de caracteres permitido.");
      setResultStatus("error");
      return;
    }

    setResultStatus("idle");
    setTranslateTick((v) => v + 1);
    setDirty(false);
  };

  // ===== Traducción TEXT =====
  useEffect(() => {
    if (sourceMode !== "text") return;
    if (translateTick === 0) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setResultStatus("loading");
        clearError();
        clearLimit();

        const system = `${directionText(
          src,
          dst
        )}\n\nDevuelve ÚNICAMENTE el texto traducido. No añadas prefijos tipo "Traducción:". Mantén el formato.`;

        const token = await getPremiumToken();

        const res = await fetch("/api/premium", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            mode: "translate_text",
            src,
            dst,
            text: leftText,
            messages: [
              { role: "system", content: system },
              { role: "user", content: leftText },
            ],
          }),
        });

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

          setResultStatus("error");
          return;
        }

        if (!res.ok) {
          const raw = await res.text().catch(() => "");
          console.error("API /api/premium error:", res.status, raw);
          throw new Error(`API /api/premium ${res.status}`);
        }

        const data = await res.json();

        // ✅✅✅ FIX CONTADOR PREMIUM (igual que paraphraser/humanizer)
        if (data?.ok && typeof data.usedChars === "number" && typeof data.limitChars === "number") {
          window.dispatchEvent(
            new CustomEvent("premium-usage-update", {
              detail: { usedChars: data.usedChars, limitChars: data.limitChars },
            })
          );
        }

        const ok = applyTranslationOutput(data);
        if (ok) setDirty(false);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate error:", e);
          const hasPrev = !!(rightText && rightText.trim().length > 0);

          if (e?.message === "NOT_AUTHENTICATED" || e?.message === "NO_TOKEN") {
            if (!hasPrev) {
              setErrorKey("premiumTranslator_errorAuthRequired");
              setErrorFallback("Debes iniciar sesión para usar Premium.");
            }
          } else {
            if (!hasPrev) {
              setErrorKey("premiumTranslator_errorGeneric");
              setErrorFallback("Error traduciendo el texto.");
            }
          }

          setResultStatus("error");
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [translateTick, src, dst, sourceMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // ===== Traducción URL =====
  useEffect(() => {
    if (sourceMode !== "url") return;

    if (!urlItems.length) {
      setRightText("");
      clearError();
      setResultStatus("idle");
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        clearError();
        setResultStatus("loading");
        clearLimit();

        const urls = urlItems.map((u) => u.url);
        const token = await getPremiumToken();

        const res = await fetch("/api/premium", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            mode: "translate_urls",
            src,
            dst,
            urls,
          }),
        });

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

          setResultStatus("error");
          return;
        }

        if (!res.ok) {
          const raw = await res.text().catch(() => "");
          console.error("API /api/premium (urls) error:", res.status, raw);

          if (res.status === 401 || res.status === 403) {
            setErrorKey("premiumTranslator_errorAuthRequired");
            setErrorFallback("Debes iniciar sesión para usar Premium.");
          } else {
            setErrorKey("premiumTranslator_errorUrls");
            setErrorFallback("No se pudieron procesar las URLs ahora mismo.");
          }

          setResultStatus("error");
          return;
        }

        const data = await res.json();

        // ✅✅✅ FIX CONTADOR PREMIUM
        if (data?.ok && typeof data.usedChars === "number" && typeof data.limitChars === "number") {
          window.dispatchEvent(
            new CustomEvent("premium-usage-update", {
              detail: { usedChars: data.usedChars, limitChars: data.limitChars },
            })
          );
        }

        applyTranslationOutput(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate urls error:", e);

          if (e?.message === "NOT_AUTHENTICATED" || e?.message === "NO_TOKEN") {
            setErrorKey("premiumTranslator_errorAuthRequired");
            setErrorFallback("Debes iniciar sesión para usar Premium.");
          } else {
            setErrorKey("premiumTranslator_errorUrls");
            setErrorFallback("No se pudieron procesar las URLs ahora mismo.");
          }

          setResultStatus("error");
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [sourceMode, src, dst, urlItems]); // eslint-disable-line react-hooks/exhaustive-deps

  const readFileAsText = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result || "");
      reader.onerror = reject;
      reader.readAsText(file);
    });

  // ===== Traducción DOCUMENTO =====
  useEffect(() => {
    if (sourceMode !== "document") return;

    if (!documents.length) {
      setRightText("");
      clearError();
      setResultStatus("idle");
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        clearError();
        setResultStatus("loading");
        clearLimit();

        const contents = await Promise.all(documents.map(({ file }) => readFileAsText(file)));
        const combined = contents.join("\n\n---\n\n").slice(0, MAX_CHARS);

        if (!combined.trim()) {
          setErrorKey("premiumTranslator_errorDocUnreadable");
          setErrorFallback("No se ha podido leer el documento.");
          setRightText("");
          setResultStatus("error");
          return;
        }

        const system = `${directionText(
          src,
          dst
        )}\n\nDevuelve ÚNICAMENTE el texto traducido. No añadas prefijos tipo "Traducción:" .`;

        const token = await getPremiumToken();

        const res = await fetch("/api/premium", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            mode: "translate_text",
            src,
            dst,
            text: combined,
            messages: [
              { role: "system", content: system },
              { role: "user", content: combined },
            ],
          }),
        });

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

          setResultStatus("error");
          return;
        }

        if (!res.ok) {
          const raw = await res.text().catch(() => "");
          console.error("API /api/premium (documents) error:", res.status, raw);

          if (res.status === 401 || res.status === 403) {
            setErrorKey("premiumTranslator_errorAuthRequired");
            setErrorFallback("Debes iniciar sesión para usar Premium.");
          } else {
            setErrorKey("premiumTranslator_errorDocuments");
            setErrorFallback("No se han podido procesar los documentos ahora mismo.");
          }

          setResultStatus("error");
          return;
        }

        const data = await res.json();

        // ✅✅✅ FIX CONTADOR PREMIUM
        if (data?.ok && typeof data.usedChars === "number" && typeof data.limitChars === "number") {
          window.dispatchEvent(
            new CustomEvent("premium-usage-update", {
              detail: { usedChars: data.usedChars, limitChars: data.limitChars },
            })
          );
        }

        applyTranslationOutput(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate documents error:", e);

          if (e?.message === "NOT_AUTHENTICATED" || e?.message === "NO_TOKEN") {
            setErrorKey("premiumTranslator_errorAuthRequired");
            setErrorFallback("Debes iniciar sesión para usar Premium.");
          } else {
            setErrorKey("premiumTranslator_errorDocuments");
            setErrorFallback("No se han podido procesar los documentos ahora mismo.");
          }

          setResultStatus("error");
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => controller.abort();
  }, [sourceMode, src, dst, documents]); // eslint-disable-line react-hooks/exhaustive-deps

  const Item = ({ active, label, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3 py-2.5 text_left text-[14px] rounded-md transition ${
        active ? "bg-slate-100" : "hover:bg-slate-100"
      } text-slate-800`}
    >
      {label}
    </button>
  );

  const Dropdown = ({ open, selected, onSelect, align = "left", options }) => {
    if (!open) return null;
    return (
      <div className={`absolute top-full mt-2 z-50 ${align === "right" ? "right-0" : "left-0"}`}>
        <div className="relative">
          <svg width="20" height="10" viewBox="0 0 20 10" className="mx-auto block">
            <path d="M0,10 L10,0 L20,10" className="fill-white" />
            <path d="M0,10 L10,0 L20,10" className="fill-none stroke-slate-200" />
          </svg>
          <div className="w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-2">
            {(options || []).map((val) => (
              <Item key={val} label={langLabel(val)} active={selected === val} onClick={() => onSelect(val)} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ===== Textos (TODOS con underscore) =====
  const labelTabText = tr("premiumTranslator_sources_tab_text", "Texto");
  const labelTabDocument = tr("premiumTranslator_sources_tab_document", "Documento");
  const labelTabUrl = tr("premiumTranslator_sources_tab_url", "URL");

  const labelChooseFileTitle = tr("premiumTranslator_choose_file_title", "Elige tu archivo o carpeta");
  const labelAcceptedFormats = tr("premiumTranslator_accepted_formats", "Formatos admitidos");
  const labelFolderHint = tr("premiumTranslator_folder_hint", "Puedes arrastrar varios archivos.");

  const labelPasteUrls = tr("premiumTranslator_paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("premiumTranslator_add_url", "Añadir URLs");
  const labelSaveUrls = tr("premiumTranslator_save_urls", "Guardar");
  const labelCancel = tr("premiumTranslator_cancel", "Cancelar");
  const labelUrlsNoteVisible = tr("premiumTranslator_urls_note_visible", "Solo se importará el texto visible.");
  const labelUrlsNotePaywalled = tr("premiumTranslator_urls_note_paywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("premiumTranslator_remove", "Quitar");

  const labelSaveTranslation = tr("premiumTranslator_save_button_label", "Guardar");
  const librarySavedMessage = tr("premiumTranslator_library_saved_toast", "Guardado en biblioteca");

  const labelLeftPlaceholder = tr("premiumTranslator_left_placeholder", "Escribe o pega el texto aquí…");
  const labelRightPlaceholder = tr("premiumTranslator_right_placeholder", "Aquí aparecerá la traducción…");
  const labelLoading = tr("premiumTranslator_loading", "Traduciendo…");

  const labelClear = tr("premiumTranslator_clear_left", "Borrar");
  const labelSwapAria = tr("premiumTranslator_swap_languages_aria", "Intercambiar idiomas");
  const labelListen = tr("premiumTranslator_listen", "Escuchar");
  const labelStop = tr("premiumTranslator_stop", "Detener");
  const labelCopy = tr("premiumTranslator_copy", "Copiar");
  const labelCopied = tr("premiumTranslator_copied", "Copiado");
  const labelPdf = tr("premiumTranslator_pdf", "PDF");

  // ===== TTS =====
  const stopPlayback = () => {
    if (speaking && ttsAbortRef.current) {
      try {
        ttsAbortRef.current.abort();
      } catch {}
    }
    const el = audioElRef.current;
    if (el) {
      try {
        el.pause();
        el.currentTime = 0;
      } catch {}
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setSpeaking(false);
  };

  const ttsLocaleFromDst = (d) => {
    if (d === "eus") return "eu-ES";
    if (d === "es") return "es-ES";
    if (d === "en") return "en-US";
    if (d === "fr") return "fr-FR";
    return "en-US";
  };

  const ttsInstructionsFromDst = (d) => {
    if (d === "eus") return "Read this text in Basque (Euskara).";
    if (d === "es") return "Read this text in Spanish (Spain).";
    if (d === "en") return "Read this text in English (US).";
    if (d === "fr") return "Read this text in French (France).";
    return "Read this text naturally.";
  };

  // (Mantenemos la lógica original de números → euskera para TTS)
  const basqueNumberToWords = (n) => {
    const units = {
      0: "zero",
      1: "bat",
      2: "bi",
      3: "hiru",
      4: "lau",
      5: "bost",
      6: "sei",
      7: "zazpi",
      8: "zortzi",
      9: "bederatzi",
      10: "hamar",
      11: "hamaika",
      12: "hamabi",
      13: "hamahiru",
      14: "hamalau",
      15: "hamabost",
      16: "hamasei",
      17: "hamazazpi",
      18: "hamazortzi",
      19: "hemeretzi",
    };

    const hundredWords = {
      1: "ehun",
      2: "berrehun",
      3: "hirurehun",
      4: "laurehun",
      5: "bostehun",
      6: "seiehun",
      7: "zazpiehun",
      8: "zortziehun",
      9: "bederatziehun",
    };

    const toWordsUnder100 = (x) => {
      if (x < 20) return units[x];
      if (x < 40) {
        const r = x - 20;
        if (r === 0) return "hogei";
        return "hogeita " + toWordsUnder100(r);
      }
      if (x < 60) {
        const r = x - 40;
        if (r === 0) return "berrogei";
        return "berrogeita " + toWordsUnder100(r);
      }
      if (x < 80) {
        const r = x - 60;
        if (r === 0) return "hirurogei";
        return "hirurogeita " + toWordsUnder100(r);
      }
      const r = x - 80;
      if (r === 0) return "laurogei";
      return "laurogeita " + toWordsUnder100(r);
    };

    const toWordsUnder1000 = (x) => {
      if (x < 100) return toWordsUnder100(x);
      const h = Math.floor(x / 100);
      const r = x % 100;
      const head = hundredWords[h] || (units[h] ? units[h] + "ehun" : "ehun");
      if (r === 0) return head;
      return head + " eta " + toWordsUnder100(r);
    };

    const toWordsUnder1000000 = (x) => {
      if (x < 1000) return toWordsUnder1000(x);
      const th = Math.floor(x / 1000);
      const r = x % 1000;

      const thHead = th === 1 ? "mila" : toWordsUnder1000(th) + " mila";
      if (r === 0) return thHead;
      return thHead + " eta " + toWordsUnder1000(r);
    };

    if (typeof n !== "number" || !Number.isFinite(n)) return "";
    if (n < 0) return "minus " + basqueNumberToWords(Math.abs(n));
    if (n === 0) return units[0];
    if (n < 1000000) return toWordsUnder1000000(n);

    const s = Math.trunc(n).toString();
    return s.split("").map((d) => units[Number(d)] || d).join(" ");
  };

  const digitsToWords = (s) => {
    const map = {
      "0": "zero",
      "1": "bat",
      "2": "bi",
      "3": "hiru",
      "4": "lau",
      "5": "bost",
      "6": "sei",
      "7": "zazpi",
      "8": "zortzi",
      "9": "bederatzi",
    };
    return (s || "").split("").map((ch) => (map[ch] ? map[ch] : ch)).join(" ");
  };

  const parseNumberToken = (tok) => {
    const s = (tok || "").trim();
    if (!s) return { type: "none" };

    const hasDot = s.includes(".");
    const hasComma = s.includes(",");

    if (hasDot && hasComma) {
      const lastDot = s.lastIndexOf(".");
      const lastComma = s.lastIndexOf(",");
      const decPos = Math.max(lastDot, lastComma);
      const decSep = s[decPos];
      const intPartRaw = s.slice(0, decPos);
      const fracRaw = s.slice(decPos + 1);
      const intDigits = intPartRaw.replace(/[.,]/g, "");
      if (!/^\d+$/.test(intDigits) || !/^\d+$/.test(fracRaw)) return { type: "none" };
      return { type: "decimal", intDigits, fracDigits: fracRaw, sep: decSep };
    }

    if (hasDot || hasComma) {
      const sep = hasDot ? "." : ",";
      const parts = s.split(sep);
      if (parts.length !== 2) {
        const all = s.replace(/[.,]/g, "");
        if (!/^\d+$/.test(all)) return { type: "none" };
        return { type: "int", digits: all };
      }

      const [a, b] = parts;
      if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) return { type: "none" };

      if (b.length <= 2) return { type: "decimal", intDigits: a, fracDigits: b, sep };

      if (b.length === 3 && a.length >= 2) {
        const all = (a + b).replace(/[^\d]/g, "");
        if (!/^\d+$/.test(all)) return { type: "none" };
        return { type: "int", digits: all };
      }

      return { type: "decimal", intDigits: a, fracDigits: b, sep };
    }

    if (!/^\d+$/.test(s)) return { type: "none" };
    return { type: "int", digits: s };
  };

  const replaceNumbersToBasqueWords = (text) => {
    const input = (text || "").toString();
    if (!input) return input;

    const re = /\b\d[\d.,]*\d|\b\d\b/g;

    return input.replace(re, (match) => {
      const info = parseNumberToken(match);
      if (info.type === "int") {
        const n = Number(info.digits);
        if (!Number.isFinite(n)) return match;
        return basqueNumberToWords(n);
      }
      if (info.type === "decimal") {
        const n = Number(info.intDigits);
        if (!Number.isFinite(n)) return match;
        const intWords = basqueNumberToWords(n);
        const fracWords = digitsToWords(info.fracDigits);
        return `${intWords} koma ${fracWords}`;
      }
      return match;
    });
  };

  const handleSpeakToggle = async () => {
    if (speaking) {
      stopPlayback();
      return;
    }

    const raw = rightText?.trim();
    if (!raw) return;

    const text = dst === "eus" ? replaceNumbersToBasqueWords(raw) : raw;

    setSpeaking(true);

    if (!audioElRef.current) {
      audioElRef.current = new Audio();
      audioElRef.current.preload = "auto";
      audioElRef.current.onended = () => setSpeaking(false);
    }

    const ctrl = new AbortController();
    ttsAbortRef.current = ctrl;

    try {
      const locale = ttsLocaleFromDst(dst);
      const instructions = ttsInstructionsFromDst(dst);

      const resp = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({
          text,
          voice: "alloy",
          format: "wav",
          locale,
          instructions,
        }),
      });

      if (!resp.ok) {
        setSpeaking(false);
        return;
      }

      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);

      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(url);

      const el = audioElRef.current;
      el.src = url;

      const start = () => {
        el.play().catch(() => {});
      };

      if (el.readyState >= 3) start();
      else el.addEventListener("canplay", start, { once: true });

      el.onended = () => setSpeaking(false);
    } catch (e) {
      if (e.name !== "AbortError") console.error("tts error:", e);
      setSpeaking(false);
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current?.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    } catch {}
  };

  const handleToggleMic = async () => {
    if (listening) {
      setListening(false);
      stopRecording();
      return;
    }

    try {
      if (!navigator.mediaDevices?.getUserMedia) return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      micChunksRef.current = [];

      const rec = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = rec;

      rec.ondataavailable = (e) => {
        if (e.data?.size > 0) micChunksRef.current.push(e.data);
      };

      rec.onstop = async () => {
        try {
          const blob = new Blob(micChunksRef.current, { type: "audio/webm" });
          micChunksRef.current = [];

          const form = new FormData();
          form.append("file", blob, "audio.webm");
          form.append("model", "whisper-1");

          const r = await fetch("/api/transcribe", { method: "POST", body: form });
          const data = await r.json().catch(() => null);
          if (data?.ok && typeof data.text === "string") {
            const txt = data.text.trim();
            if (txt) {
              setLeftText((prev) => (prev ? prev + "\n" + txt : txt).slice(0, MAX_CHARS));
              setDirty(true);
              clearLimit();
              clearError();
            }
          }
        } catch (e) {
          console.error("transcribe error:", e);
        } finally {
          mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
          mediaStreamRef.current = null;
        }
      };

      rec.start();
      setListening(true);
    } catch (e) {
      console.error("mic error:", e);
      setListening(false);
      stopRecording();
    }
  };

  const handleClearLeft = () => {
    setLeftText("");
    setRightText("");
    setDocuments([]);
    setUrlItems([]);
    setUrlsTextarea("");
    clearError();
    setResultStatus("idle");
    setDetectedLang("");
    setDirty(false);
    setTranslateTick(0);
    clearLimit();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rightText || "");
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const handleDownloadPdf = () => {
    const text = (rightText || "").replace(/\n/g, "<br/>");
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Traducción - Euskalia</title>
          <style>
            body{ font-family: Inter, sans-serif; padding: 32px; line-height: 1.6; color:#0f172a;}
          </style>
        </head>
        <body>${text}</body>
      </html>
    `);
    w.document.close();
    w.focus();
    w.print();
  };

  const handleSaveTranslation = () => {
    if (resultStatus !== "success") return;

    const text = rightText?.trim();
    if (!text) return;

    const maxLen = 90;
    const firstLine = text.split("\n")[0].trim();
    const clean = firstLine.replace(/\s+/g, " ").trim();
    let title = clean.slice(0, maxLen);
    if (clean.length > maxLen) title += "...";

    addLibraryDoc({
      kind: "translation",
      title,
      content: text,
    });

    setSavedToLibrary(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSavedToLibrary(false), 2000);
  };

  const addFiles = async (list) => {
    if (!list?.length) return;
    const arr = Array.from(list);
    const withIds = arr.map((file) => ({
      id: window.crypto.randomUUID(),
      file,
    }));
    setDocuments((prev) => [...prev, ...withIds]);
  };

  const onFiles = async (e) => {
    await addFiles(e.target.files);
    e.target.value = "";
    clearLimit();
    clearError();
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
    clearLimit();
    clearError();
  };

  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    clearLimit();
    clearError();
  };

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

  const addUrlsFromTextarea = () => {
    const parsed = parseUrlsFromText(urlsTextarea);
    if (!parsed.length) return;
    const newItems = parsed.map((p) => ({
      id: window.crypto.randomUUID(),
      url: p.href,
      host: p.host,
    }));
    setUrlItems((prev) => [...prev, ...newItems]);
    setUrlsTextarea("");
    setUrlInputOpen(false);
    clearLimit();
    clearError();
  };

  const removeUrl = (id) => {
    setUrlItems((prev) => prev.filter((u) => u.id !== id));
    clearLimit();
    clearError();
  };

  const canSave = resultStatus === "success" && !!rightText?.trim() && !loading;

  const showTranslateButton =
    sourceMode === "text" &&
    !loading &&
    !limitType &&
    (!hasRealResult || dirty || !!displayErr);

  return (
    <>
      <section className="w-full bg-[#F4F8FF] pt-2 pb-20 md:pb-32">
        <div className="max-w-7xl mx_auto px-6">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden w-full">
            {/* barra superior */}
            <div className="relative h-12 border-b border-slate-200">
              <div className="flex items-center h-full px-6">
                <div className="flex items-center text-sm font-medium text-slate-600">
                  <button
                    type="button"
                    onClick={() => {
                      setSourceMode("text");
                      clearLimit();
                      clearError();
                    }}
                    className={`inline-flex items-center gap-2 ${
                      sourceMode === "text"
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <FileText
                      className={`w-4 h-4 ${
                        sourceMode === "text" ? "text-blue-600" : "text-slate-500"
                      }`}
                    />
                    <span>{labelTabText}</span>
                  </button>

                  <span className="mx-4 h-5 w-px bg-slate-200" />

                  <button
                    type="button"
                    onClick={() => {
                      setSourceMode("document");
                      clearLimit();
                      clearError();
                    }}
                    className={`inline-flex items-center gap-2 ${
                      sourceMode === "document"
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <FileIcon
                      className={`w-4 h-4 ${
                        sourceMode === "document" ? "text-blue-600" : "text-slate-500"
                      }`}
                    />
                    <span>{labelTabDocument}</span>
                  </button>

                  <span className="mx-4 h-5 w-px bg-slate-200" />

                  <button
                    type="button"
                    onClick={() => {
                      setSourceMode("url");
                      clearLimit();
                      clearError();
                    }}
                    className={`inline-flex items-center gap-2 ${
                      sourceMode === "url"
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <UrlIcon
                      className={`w-4 h-4 ${
                        sourceMode === "url" ? "text-blue-600" : "text-slate-500"
                      }`}
                    />
                    <span>{labelTabUrl}</span>
                  </button>

                  <span className="ml-4 h-5 w-px bg-slate-200" />
                </div>

                {/* selector de idioma centrado */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative pointer-events-auto flex items-center">
                    <div className="relative mr-16" ref={leftRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenLeft((v) => !v);
                          setOpenRight(false);
                        }}
                        className="inline-flex items-center gap-2 px-2 py-1 text-[15px] font-medium text-slate-700 hover:text-slate-900 rounded-md"
                      >
                        <span>{src === "auto" ? autoShownLabel : langLabel(src)}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="#334155"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <Dropdown
                        open={openLeft}
                        selected={src}
                        onSelect={(val) => {
                          setSrc(val);
                          setOpenLeft(false);
                          if (val !== "auto") setDetectedLang("");
                          setDirty(true);
                          clearLimit();
                          clearError();
                        }}
                        align="left"
                        options={OPTIONS_SRC}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        swap();
                        setDirty(true);
                        clearLimit();
                        clearError();
                      }}
                      aria-label={labelSwapAria}
                      className="absolute left-1/2 -translate-x-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 hover:bg-slate-200 transition"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 7h11M7 7l3-3M7 7l3 3"
                          stroke="#475569"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 17H6M17 17l-3-3M17 17l-3 3"
                          stroke="#475569"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="relative ml-16" ref={rightRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenRight((v) => !v);
                          setOpenLeft(false);
                        }}
                        className="inline-flex items-center gap-2 px-2 py-1 text-[15px] font-medium text-slate-700 hover:text-slate-900 rounded-md"
                      >
                        <span>{langLabel(dst)}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="#334155"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <Dropdown
                        open={openRight}
                        selected={dst}
                        onSelect={(val) => {
                          setDst(val);
                          setOpenRight(false);
                          setDirty(true);
                          clearLimit();
                          clearError();
                        }}
                        align="right"
                        options={OPTIONS_DST}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClearLeft}
                aria-label={labelClear}
                className="group absolute top-1/2 -translate-y-1/2 right-4 p-2 rounded-md hover:bg-slate-100"
              >
                <Trash2 className="w-5 h-5 text-slate-500" />
                <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                  {labelClear}
                </span>
              </button>
            </div>

            {/* paneles */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              {/* IZQUIERDA */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200 relative">
                {sourceMode === "text" && (
                  <>
                    <textarea
                      ref={leftTA}
                      value={leftText}
                      onChange={(e) => {
                        const v = e.target.value;
                        setLeftText(v);
                        setDirty(true);
                        if (displayErr) clearError();

                        if (v.length >= MAX_CHARS) {
                          clearError();
                          setCharsLimit();
                          setErrorKey("premiumTranslator_errorMaxChars");
                          setErrorFallback("Has superado el límite de caracteres permitido.");
                        } else {
                          if (limitType === "chars") clearLimit();
                        }
                      }}
                      placeholder={labelLeftPlaceholder}
                      className={`w-full ${FIXED_PANEL_H} resize-none bg-transparent outline-none text-[17px] leading-8 text-slate-700 placeholder:text-slate-500 font-medium ${HIDE_SCROLLBAR}`}
                    />

                    <div
                      className={`absolute bottom-4 right-6 text-[13px] ${
                        leftText.length >= MAX_CHARS ? "text-red-500" : "text-slate-400"
                      }`}
                    >
                      {leftText.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                    </div>
                  </>
                )}

                {sourceMode === "document" && (
                  <div
                    className={`w-full ${FIXED_PANEL_H} flex flex-col relative overflow-hidden ${
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
                      onClick={() => {
                        fileInputRef.current?.click();
                        clearLimit();
                        clearError();
                      }}
                      className="w-full rounded-2xl border border-dashed border-slate-300 bg-white/40 hover:bg-slate-50 transition px-6 py-8 text-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] flex-none"
                      aria-label={labelChooseFileTitle}
                      title={labelChooseFileTitle}
                    >
                      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center">
                        <Plus className="w-9 h-9 text-sky-600" />
                      </div>
                      <div className="text-xl font-semibold text-slate-800">{labelChooseFileTitle}</div>
                      <div className="mt-3 text-sm text-slate-500">{labelAcceptedFormats}</div>
                      <div className="mt-1 text-xs text-slate-400">{labelFolderHint}</div>
                    </button>

                    {documents.length > 0 && (
                      <div className="mt-4 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white">
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
                  <div className={`w-full ${FIXED_PANEL_H} flex flex-col overflow-hidden`}>
                    <div className="mb-3 flex items-center justify-between flex-none">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                        <UrlIcon className="w-4 h-4" />
                        {labelPasteUrls}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setUrlInputOpen(true);
                          clearLimit();
                          clearError();
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:border-sky-400 transition-colors"
                        aria-label={labelAddUrl}
                        title={labelAddUrl}
                      >
                        <Plus className="w-4 h-4 text-sky-500" />
                        {labelAddUrl}
                      </button>
                    </div>

                    {urlInputOpen && (
                      <div className="mb-4 rounded-xl border border-slate-300 p-3 bg-white flex-none">
                        <textarea
                          value={urlsTextarea}
                          onChange={(e) => {
                            setUrlsTextarea(e.target.value);
                            if (limitType) clearLimit();
                            if (displayErr) clearError();
                          }}
                          placeholder={tr("premiumTranslator_paste_urls_placeholder", "Introduce URLs separadas por línea")}
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
                      <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
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

              {/* DERECHA */}
              <div className="p-8 md:p-10 relative">
                <ProLimitBanner visible={!!limitType} message={displayErr || limitMsg} />

                <textarea
                  ref={rightTA}
                  value={loading && document.activeElement !== rightTA.current ? labelLoading : rightText}
                  placeholder={labelRightPlaceholder}
                  readOnly
                  className={`w-full ${FIXED_PANEL_H} resize-none bg-transparent outline-none text-[17px] leading-8 text-slate-700 placeholder:text-slate-500 font-medium ${
                    loading ? "italic text-slate-500" : ""
                  } ${HIDE_SCROLLBAR}`}
                />

                {showTranslateButton && (
                  <div className="absolute left-8 right-8 top-[42%] -translate-y-1/2 z-10 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleTranslateClick}
                      disabled={!leftText.trim() || loading}
                      className={`h-12 px-10 rounded-full text-white font-semibold shadow-sm transition ${
                        !leftText.trim() || loading
                          ? "bg-blue-600 opacity-50 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {labelTranslateBtn}
                    </button>
                  </div>
                )}

                {displayErr && !limitType && (
                  <div className="absolute bottom-4 left-8 text-sm text-red-500">{displayErr}</div>
                )}

                <div className="absolute bottom-4 right-6 flex flex-col items-end gap-1 text-slate-500">
                  {savedToLibrary && <p className="text-xs text-emerald-600 mb-1">{librarySavedMessage}</p>}

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleSpeakToggle}
                      aria-label={speaking ? labelStop : labelListen}
                      className={`group relative p-2 rounded-md hover:bg-slate-100 ${
                        speaking ? "text-slate-900" : ""
                      } ${hasRealResult ? "" : "opacity-40 cursor-not-allowed"}`}
                      disabled={!hasRealResult}
                    >
                      {speaking ? (
                        <span className="inline-block w-[10px] h-[10px] rounded-[2px] bg-slate-600" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                      <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                        {speaking ? labelStop : labelListen}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      aria-label={labelCopy}
                      className={`group relative p-2 rounded-md hover:bg-slate-100 ${
                        hasRealResult ? "" : "opacity-40 cursor-not-allowed"
                      }`}
                      disabled={!hasRealResult}
                    >
                      {copied ? <Check className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                      <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                        {copied ? labelCopied : labelCopy}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      aria-label={labelPdf}
                      className={`group relative p-2 rounded-md hover:bg-slate-100 ${
                        hasRealResult ? "" : "opacity-40 cursor-not-allowed"
                      }`}
                      disabled={!hasRealResult}
                    >
                      <FileDown className="w-5 h-5" />
                      <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                        {labelPdf}
                      </span>
                    </button>

                    {canSave && (
                      <button
                        type="button"
                        onClick={handleSaveTranslation}
                        className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:brightness-95 active:scale-[0.98] transition-all"
                        style={{ backgroundColor: "#22c55e" }}
                      >
                        {labelSaveTranslation}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}