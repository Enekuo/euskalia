import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/translations";
import {
  Volume2,
  Copy as CopyIcon,
  FileDown,
  Mic,
  Trash2,
  Check,
  FileText,
  File as FileIcon,
  Link2 as UrlIcon,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BenefitsSection from "@/components/BenefitsSection";
import ToolsSection from "@/components/ToolsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const MAX_CHARS = 5000;

export default function Translator() {
  const { t, language } = useTranslation();
  const tr = (k, f) => t(k) || f;

  const uiLang =
    (language || "ES").toString().toUpperCase() === "EUS" ? "EUS" : "ES";

  // ✅ Detectar idioma (auto)
  const LBL_DETECT = tr(
    "translator.detect_language",
    uiLang === "EUS" ? "Hizkuntza detektatu" : "Detectar idioma"
  );
  const LBL_DETECTED_SUFFIX = tr(
    "translator.detected",
    uiLang === "EUS" ? "detektatua" : "detectado"
  );

  // ====== Labels idioma (claves comunes) ======
  const LBL_EUS = tr("summary.output_language_eus", "Euskara");
  const LBL_ES = tr("summary.output_language_es", "Gaztelania");
  const LBL_EN = tr("summary.output_language_en", "Ingelesa");
  const LBL_FR = tr("summary.output_language_fr", "Français");

  // ===== opciones selector =====
  // ✅ ORIGEN: incluye Detectar idioma
  const OPTIONS_SRC = [
    { value: "auto", label: LBL_DETECT },
    { value: "es", label: LBL_ES },
    { value: "eus", label: LBL_EUS },
    { value: "en", label: LBL_EN },
    { value: "fr", label: LBL_FR },
  ];

  // ✅ DESTINO: SIN Detectar idioma (como en Pro)
  const OPTIONS_DST = [
    { value: "es", label: LBL_ES },
    { value: "eus", label: LBL_EUS },
    { value: "en", label: LBL_EN },
    { value: "fr", label: LBL_FR },
  ];

  // ===== estado idioma / texto =====
  const [src, setSrc] = useState("auto"); // AUTO por defecto
  const [dst, setDst] = useState("es");
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);

  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // idioma detectado para mostrar "(...) detectado"
  const [detectedLangLabel, setDetectedLangLabel] = useState("");

  // ===== tabs (Texto / Documento / URL) =====
  const [sourceMode, setSourceMode] = useState("text"); // "text" | "document" | "url"

  // Documentos (solo UI)
  const [documents, setDocuments] = useState([]); // [{id,file}]
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // URLs (solo UI)
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [urlsTextarea, setUrlsTextarea] = useState("");
  const [urlItems, setUrlItems] = useState([]); // [{id,url,host}]

  // === TTS ===
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

  // === refs para grabación (no usado aquí, pero lo dejo tal cual) ===
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const micChunksRef = useRef([]);

  const hasRealResult = !!(rightText && rightText.trim().length > 0);

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

  // Para el prompt (nombres en ES)
  const langNameES = (code) => {
    if (code === "eus") return "Euskera";
    if (code === "es") return "Español";
    if (code === "en") return "Inglés";
    if (code === "fr") return "Francés";
    return "Idioma";
  };

  // parseo DETECTED_LANGUAGE
  const parseDetectedLanguage = (raw) => {
    const s = String(raw || "");
    const lines = s.split(/\r?\n/);
    const first = (lines[0] || "").trim();

    const m = first.match(/^DETECTED_LANGUAGE\s*:\s*(.+)\s*$/i);
    if (!m) return { detected: "", translation: s };

    const detected = (m[1] || "").trim();
    let rest = lines.slice(1);
    if (rest.length && rest[0].trim() === "") rest = rest.slice(1);
    const translation = rest.join("\n").trimStart();

    return { detected, translation };
  };

  // Texto de dirección (incluye AUTO)
  const directionText = (srcVal, dstVal) => {
    if (srcVal === "auto") {
      if (dstVal === "eus") {
        return `
Euskalia zara, itzulpen profesionaleko tresna bat.
Erabiltzailearen testuaren HIZKUNTZA detektatu lehenik.
Lehen lerroan idatzi ZEHAZKI: DETECTED_LANGUAGE: <hizkuntza>
Bigarren lerroa hutsik utzi.
Hirugarren lerrotik aurrera, idatzi BAKARRIK euskarazko itzulpena.
Helburua: itzulpen NATURALA eta ZUZENA.
BAIMENDUTA dago esaldia berrantolatzea edo birformulatzea, euskaraz naturalagoa izan dadin.
Ez asmatu informaziorik, ez gehitu datu berririk, eta ez egin azalpenik.
Ez aldatu hizkuntza itzulpenean.
`.trim();
      }
      if (dstVal === "es") {
        return `
Eres Euskalia, un traductor profesional.
Detecta primero el IDIOMA del texto del usuario.
En la primera línea escribe EXACTAMENTE: DETECTED_LANGUAGE: <idioma>
En la segunda línea deja una línea en blanco.
A partir de la tercera línea, responde SOLO con la traducción final en Español.
Objetivo: traducción NATURAL y CORRECTA.
Puedes reordenar o reformular frases si es necesario para que suenen naturales en el idioma de destino.
No inventes información ni añadas datos nuevos. No expliques nada.
No cambies de idioma en la traducción.
`.trim();
      }
      if (dstVal === "en") {
        return `
You are Euskalia, a professional translator.
First, detect the SOURCE LANGUAGE of the user's text.
On the first line write EXACTLY: DETECTED_LANGUAGE: <language>
On the second line leave it blank.
From the third line onwards, output ONLY the final translation in English.
Goal: a NATURAL, CORRECT translation.
You may reorder or rephrase sentences to sound natural in the target language.
Do not add new information. No explanations.
Do not switch languages in the translation.
`.trim();
      }
      if (dstVal === "fr") {
        return `
Tu es Euskalia, un traducteur professionnel.
Détecte d'abord la LANGUE SOURCE du texte de l'utilisateur.
À la première ligne écris EXACTEMENT : DETECTED_LANGUAGE: <langue>
À la deuxième ligne, laisse une ligne vide.
À partir de la troisième ligne, réponds UNIQUEMENT avec la traduction finale en Français.
Objectif : une traduction NATURELLE et CORRECTE.
Tu peux réorganiser ou reformuler pour que ce soit naturel dans la langue cible.
N'ajoute pas de nouvelles informations. Pas d'explications.
Ne change pas de langue dans la traduction.
`.trim();
      }

      return `
Eres Euskalia, un traductor profesional.
Detecta primero el idioma del texto del usuario.
En la primera línea escribe EXACTAMENTE: DETECTED_LANGUAGE: <idioma>
En la segunda línea deja una línea en blanco.
A partir de la tercera línea, responde SOLO con la traducción final en el idioma de destino.
Objetivo: traducción NATURAL y CORRECTA.
Puedes reordenar o reformular frases si es necesario para que suenen naturales en el idioma de destino.
No inventes información ni añadas datos nuevos. No expliques nada.
`.trim();
    }

    if (dstVal === "eus") {
      return `
Eres Euskalia, itzulpen profesionaleko tresna bat.
Itzuli BETI ${langNameES(srcVal)}tik euskarara.
Helburua: itzulpen NATURALA eta ZUZENA (euskarazko estilo egokiarekin).
BAIMENDUTA dago esaldia berrantolatzea edo birformulatzea, euskaraz naturalagoa izan dadin.
Ez asmatu informaziorik, ez gehitu datu berririk, eta ez egin azalpenik.
Erantzun BAKARRIK itzulpenarekin, eta BETI euskaraz.
Ez aldatu hizkuntza itzulpenean.
`.trim();
    }

    if (dstVal === "es") {
      return `
Eres Euskalia, un traductor profesional.
Traduce SIEMPRE de ${langNameES(srcVal)} a Español.
Objetivo: traducción NATURAL y CORRECTA.
Puedes reordenar o reformular frases si es necesario para que suenen naturales en el idioma de destino.
No inventes información ni añadas datos nuevos. No expliques nada.
Responde SIEMPRE en Español cuando des la TRADUCCIÓN.
No cambies de idioma en la traducción.
`.trim();
    }

    if (dstVal === "en") {
      return `
Eres Euskalia, un traductor profesional.
Traduce SIEMPRE de ${langNameES(srcVal)} a Inglés.
Goal: a NATURAL, CORRECT translation.
You may reorder or rephrase sentences to sound natural in the target language.
Do not add new information. No explanations.
Responde SIEMPRE en Inglés cuando des la TRADUCCIÓN.
Do not switch languages in the translation.
`.trim();
    }

    if (dstVal === "fr") {
      return `
Eres Euskalia, un traductor profesional.
Traduce SIEMPRE de ${langNameES(srcVal)} a Francés.
Objectif : une traduction NATURELLE et CORRECTE.
Tu peux réorganiser ou reformuler pour que ce soit naturel dans la langue cible.
N'ajoute pas de nouvelles informations. Pas d'explications.
Responde SIEMPRE en Francés cuando des la TRADUCCIÓN.
Ne change pas de langue dans la traduction.
`.trim();
    }

    return `
Eres Euskalia, un traductor profesional.
Traduce siempre del idioma de origen al idioma de destino indicado.
Objetivo: traducción NATURAL y CORRECTA.
Puedes reordenar o reformular frases si es necesario para que suenen naturales en el idioma de destino.
No inventes información ni añadas datos nuevos. No expliques nada.
Responde SIEMPRE en el idioma de destino cuando des la TRADUCCIÓN.
`.trim();
  };

  useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    },
    []
  );

  // ✅ Swap: bloqueado si origen es "auto" (Detectar idioma)
  const swap = () => {
    if (src === "auto") return;
    setDetectedLangLabel("");
    const nextSrc = dst;
    const nextDst = src === "auto" ? "es" : src;
    setSrc(nextSrc);
    setDst(nextDst);
  };

  // cerrar dropdowns
  useEffect(() => {
    const onDown = (e) => {
      if (leftRef.current && !leftRef.current.contains(e.target)) setOpenLeft(false);
      if (rightRef.current && !rightRef.current.contains(e.target)) setOpenRight(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  // auto-resize (solo cuando NO estamos en modo texto)
  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };
  useEffect(() => {
    if (sourceMode !== "text") autoResize(leftTA.current);
  }, [leftText, sourceMode]);
  useEffect(() => {
    if (sourceMode !== "text") autoResize(rightTA.current);
  }, [rightText, sourceMode]);

  // etiqueta que se ve en el selector de ORIGEN
  const srcButtonLabel =
    src !== "auto"
      ? OPTIONS_SRC.find((o) => o.value === src)?.label
      : detectedLangLabel && leftText.trim()
      ? `(${detectedLangLabel}) ${LBL_DETECTED_SUFFIX}`
      : LBL_DETECT;

  // ==== Traducción TEXTO /api/public (debounced) ====
  useEffect(() => {
    if (sourceMode !== "text") return;

    if (leftText.length < MAX_CHARS) setErr("");

    if (!leftText.trim()) {
      setRightText("");
      setDetectedLangLabel("");
      return;
    }

    if (leftText.length >= MAX_CHARS) {
      setErr(`Límite máximo: ${MAX_CHARS.toLocaleString()} caracteres.`);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const system = `${directionText(
          src,
          dst
        )}\n\nResponde SOLO con lo que se te pide. Mantén el formato (saltos de línea, listas, mayúsculas) y los nombres propios.`;

        const res = await fetch("/api/public", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.2,
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

        if (!res.ok) {
          const raw = await res.text().catch(() => "");
          console.error("API /api/public error:", res.status, raw);
          throw new Error(`API /api/public ${res.status}`);
        }

        const data = await res.json();
        const out = data?.content ?? data?.translation ?? "";

        if (isRefusal(out)) {
          setRightText("");
          setDetectedLangLabel("");
          setErr(
            uiLang === "EUS"
              ? "Ezin izan da edukia itzuli."
              : "No se pudo traducir el contenido."
          );
          return;
        }

        if (src === "auto") {
          const parsed = parseDetectedLanguage(out);
          setDetectedLangLabel(parsed.detected || "");
          setRightText((parsed.translation || "").trim());
        } else {
          setDetectedLangLabel("");
          setRightText(out);
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate error:", e);
          const hasPrev = !!(rightText && rightText.trim().length > 0);
          if (!hasPrev) setErr("No se pudo traducir ahora mismo.");
        }
      } finally {
        setLoading(false);
      }
    }, 900);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [leftText, src, dst, sourceMode]);

  // ==== Traducción URLs /api/public ====
  useEffect(() => {
    if (sourceMode !== "url") return;

    if (!urlItems.length) {
      setRightText("");
      setErr("");
      setDetectedLangLabel("");
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setErr("");

        const urls = urlItems.map((u) => u.url);

        const system = `${directionText(
          src,
          dst
        )}\n\nSi el contenido es muy largo, traduce lo más importante manteniendo formato.`;

        const res = await fetch("/api/public", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            mode: "translate_urls",
            src,
            dst,
            urls,
            model: "gpt-4o-mini",
            temperature: 0.2,
            messages: [{ role: "system", content: system }],
          }),
        });

        if (!res.ok) {
          const raw = await res.text().catch(() => "");
          console.error("API /api/public (urls) error:", res.status, raw);
          const hasPrev = !!(rightText && rightText.trim().length > 0);
          if (!hasPrev)
            setErr(
              uiLang === "EUS"
                ? "Ezin izan dira URLak orain prozesatu."
                : "No se pudieron procesar las URLs ahora mismo."
            );
          return;
        }

        const data = await res.json();
        const out = data?.content ?? data?.translation ?? "";

        if (isRefusal(out)) {
          setRightText("");
          setDetectedLangLabel("");
          setErr(
            uiLang === "EUS"
              ? "Ezin izan da edukia itzuli. Saiatu beste URL batekin."
              : "No se pudo traducir el contenido. Prueba con otra URL."
          );
          return;
        }

        if (src === "auto") {
          const parsed = parseDetectedLanguage(out);
          setDetectedLangLabel(parsed.detected || "");
          setRightText((parsed.translation || "").trim());
        } else {
          setDetectedLangLabel("");
          setRightText(out);
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate urls error:", e);
          const hasPrev = !!(rightText && rightText.trim().length > 0);
          if (!hasPrev)
            setErr(
              uiLang === "EUS"
                ? "Ezin izan dira URLak orain prozesatu."
                : "No se pudieron procesar las URLs ahora mismo."
            );
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [sourceMode, src, dst, urlItems, language]);

  // === Helper para leer archivos como texto ===
  const readFileAsText = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result || "");
      reader.onerror = reject;
      reader.readAsText(file);
    });

  const isTextReadableExt = (name) => {
    const lower = String(name || "").toLowerCase();
    return (
      lower.endsWith(".txt") ||
      lower.endsWith(".md") ||
      lower.endsWith(".csv") ||
      lower.endsWith(".json") ||
      lower.endsWith(".xml") ||
      lower.endsWith(".html") ||
      lower.endsWith(".htm") ||
      lower.endsWith(".rtf")
    );
  };

  // ==== Traducción DOCUMENTOS /api/public ====
  useEffect(() => {
    if (sourceMode !== "document") return;

    if (!documents.length) {
      setRightText("");
      setErr("");
      setDetectedLangLabel("");
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setErr("");

        const readable = documents.filter(({ file }) =>
          isTextReadableExt(file?.name)
        );
        const unreadable = documents.filter(({ file }) => !isTextReadableExt(file?.name));

        if (unreadable.length > 0 && readable.length === 0) {
          setRightText("");
          setDetectedLangLabel("");
          setErr(
            uiLang === "EUS"
              ? "Ezin da dokumentua irakurri. Saiatu TXT/MD bezalako fitxategi batekin edo itsatsi testua."
              : "No se ha podido leer el documento. Prueba con TXT/MD o pega el texto directamente."
          );
          return;
        }

        const contents = await Promise.all(
          readable.map(({ file }) => readFileAsText(file))
        );
        const combinedFull = contents.join("\n\n---\n\n");

        if (combinedFull.length > MAX_CHARS) {
          setRightText("");
          setDetectedLangLabel("");
          setErr(
            uiLang === "EUS"
              ? `Gehienezko muga: ${MAX_CHARS.toLocaleString()} karaktere (dokumentuak guztira).`
              : `Límite máximo: ${MAX_CHARS.toLocaleString()} caracteres (documentos en total).`
          );
          return;
        }

        if (!combinedFull.trim()) {
          setErr(
            uiLang === "EUS"
              ? "Ezin da dokumentuaren edukia irakurri."
              : "No se ha podido leer el contenido del documento."
          );
          setRightText("");
          setDetectedLangLabel("");
          return;
        }

        const system = `${directionText(
          src,
          dst
        )}\n\nResponde SOLO con lo que se te pide. Mantén formato.`;

        const res = await fetch("/api/public", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.2,
            mode: "translate_text",
            src,
            dst,
            text: combinedFull,
            messages: [
              { role: "system", content: system },
              { role: "user", content: combinedFull },
            ],
          }),
        });

        if (!res.ok) {
          const raw = await res.text().catch(() => "");
          console.error("API /api/public (documents) error:", res.status, raw);
          const hasPrev = !!(rightText && rightText.trim().length > 0);
          if (!hasPrev)
            setErr(
              uiLang === "EUS"
                ? "Ezin izan dira dokumentuak orain prozesatu."
                : "No se han podido procesar los documentos ahora mismo."
            );
          return;
        }

        const data = await res.json();
        const out = data?.content ?? data?.translation ?? "";

        if (isRefusal(out)) {
          setRightText("");
          setDetectedLangLabel("");
          setErr(
            uiLang === "EUS"
              ? "Ezin izan da edukia itzuli. Saiatu beste fitxategi batekin edo itsatsi testua."
              : "No se pudo traducir el contenido. Prueba con otro archivo o pega el texto."
          );
          return;
        }

        if (src === "auto") {
          const parsed = parseDetectedLanguage(out);
          setDetectedLangLabel(parsed.detected || "");
          setRightText((parsed.translation || "").trim());
        } else {
          setDetectedLangLabel("");
          setRightText(out);
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate documents error:", e);
          const hasPrev = !!(rightText && rightText.trim().length > 0);
          if (!hasPrev)
            setErr(
              uiLang === "EUS"
                ? "Ezin izan dira dokumentuak orain prozesatu."
                : "No se han podido procesar los documentos ahora mismo."
            );
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [sourceMode, src, dst, documents, language]);

  const Item = ({ active, label, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3 py-2.5 text-left text-[14px] rounded-md transition ${
        active ? "bg-slate-100" : "hover:bg-slate-100"
      } text-slate-800`}
    >
      {label}
    </button>
  );

  // ✅ Dropdown ahora acepta options (para poder quitar "auto" en el derecho)
  const Dropdown = ({ open, selected, onSelect, align = "left", options = [] }) => {
    if (!open) return null;
    return (
      <div
        className={`absolute top-full mt-2 z-50 ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        <div className="relative">
          <svg width="20" height="10" viewBox="0 0 20 10" className="mx-auto block">
            <path d="M0,10 L10,0 L20,10" className="fill-white" />
            <path d="M0,10 L10,0 L20,10" className="fill-none stroke-slate-200" />
          </svg>
          <div className="w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-2">
            {options.map((opt) => (
              <Item
                key={opt.value}
                label={opt.label}
                active={selected === opt.value}
                onClick={() => onSelect(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ===== tabs i18n =====
  const labelTabText = tr("summary.sources_tab_text", "Testua");
  const labelTabDocument = tr("summary.sources_tab_document", "Dokumentua");
  const labelTabUrl = tr("summary.sources_tab_url", "URLa");

  const labelChooseFileTitle = tr(
    "summary.choose_file_title",
    "Elige tu archivo o carpeta"
  );
  const labelAcceptedFormats = tr(
    "summary.accepted_formats",
    "Formatos admitidos: PDF, DOCX, TXT, MD, imágenes…"
  );
  const labelFolderHint = tr(
    "summary.folder_hint",
    "Puedes arrastrar varios archivos a la vez."
  );
  const labelPasteUrls = tr("summary.paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("summary.add_url", "Añadir URLs");
  const labelSaveUrls = tr("summary.save_urls", "Guardar");
  const labelCancel = tr("summary.cancel", "Cancelar");
  const labelUrlsNoteVisible = tr(
    "summary.urls_note_visible",
    "Solo se importará el texto visible del sitio web."
  );
  const labelUrlsNotePaywalled = tr(
    "summary.urls_note_paywalled",
    "No se admiten artículos de pago."
  );
  const labelRemove = tr("summary.remove", "Quitar");

  // ====== ALTAVOZ (TTS backend) ======
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

  const handleSpeakToggle = async () => {
    if (!hasRealResult) return;

    if (speaking) {
      stopPlayback();
      return;
    }

    const text = rightText?.trim();
    if (!text) return;

    setSpeaking(true);

    if (!audioElRef.current) {
      audioElRef.current = new Audio();
      audioElRef.current.preload = "auto";
      audioElRef.current.onended = () => setSpeaking(false);
      audioElRef.current.onpause = () => {};
    }

    const ctrl = new AbortController();
    ttsAbortRef.current = ctrl;

    try {
      const resp = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({
          text,
          voice: "alloy",
          format: "wav",
        }),
      });

      if (!resp.ok) {
        const raw = await resp.text().catch(() => "");
        console.error("API /api/tts error:", resp.status, raw);
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
        el.play().catch((e) => {
          console.warn("Autoplay blocked:", e);
        });
      };

      if (el.readyState >= 3) start();
      else el.addEventListener("canplay", start, { once: true });

      el.onended = () => {
        setSpeaking(false);
      };
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error("tts fetch error:", e);
      }
      setSpeaking(false);
    }
  };

  // Botón de borrar: limpia TODO
  const handleClearLeft = () => {
    setLeftText("");
    setRightText("");
    setDocuments([]);
    setUrlItems([]);
    setUrlsTextarea("");
    setErr("");
    setDetectedLangLabel("");
  };

  // Acciones: copiar / PDF
  const handleCopy = async () => {
    if (!hasRealResult) return;
    try {
      await navigator.clipboard.writeText(rightText || "");
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1200);
    } catch (_) {}
  };

  const handleDownloadPdf = () => {
    if (!hasRealResult) return;
    const text = (rightText || "").replace(/\n/g, "<br/>");
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    w.document.write(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Traducción - Euskalia</title>
          <style>
            body{ font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif; padding: 32px; line-height: 1.6; color:#0f172a;}
          </style>
        </head>
        <body>${text}</body>
      </html>
    `);
    w.document.close();
    w.focus();
    w.print();
  };

  // helpers Documentos / URLs (solo UI)
  const addFiles = async (list) => {
    if (!list?.length) return;
    const arr = Array.from(list);
    const withIds = arr.map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));
    setDocuments((prev) => [...prev, ...withIds]);
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
    return valid.filter((v) =>
      seen.has(v.href) ? false : (seen.add(v.href), true)
    );
  };

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
  };

  const removeUrl = (id) =>
    setUrlItems((prev) => prev.filter((u) => u.id !== id));

  return (
    <>
      <section className="w-full bg-[#F4F8FF] pt-10 pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden w-full">
            {/* barra superior */}
            <div className="relative h-12 border-b border-slate-200">
              <div className="flex items-center h-full px-6">
                {/* Tabs */}
                <div className="flex items-center text-sm font-medium text-slate-600">
                  <button
                    type="button"
                    onClick={() => setSourceMode("text")}
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
                    onClick={() => setSourceMode("document")}
                    className={`inline-flex items-center gap-2 ${
                      sourceMode === "document"
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <FileIcon
                      className={`w-4 h-4 ${
                        sourceMode === "document"
                          ? "text-blue-600"
                          : "text-slate-500"
                      }`}
                    />
                    <span>{labelTabDocument}</span>
                  </button>

                  <span className="mx-4 h-5 w-px bg-slate-200" />

                  <button
                    type="button"
                    onClick={() => setSourceMode("url")}
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

                {/* selector: centrado */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative pointer-events-auto flex items-center">
                    {/* ORIGEN */}
                    <div className="relative mr-16" ref={leftRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenLeft((v) => !v);
                          setOpenRight(false);
                        }}
                        className="inline-flex items-center gap-2 px-2 py-1 text-[15px] font-medium text-slate-700 hover:text-slate-900 rounded-md"
                      >
                        <span>{srcButtonLabel}</span>
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
                          setDetectedLangLabel("");
                          setOpenLeft(false);
                        }}
                        align="left"
                        options={OPTIONS_SRC}
                      />
                    </div>

                    {/* SWAP (se queda igual, pero bloqueado si src === auto) */}
                    <button
                      type="button"
                      aria-label="Intercambiar idiomas"
                      onClick={swap}
                      disabled={src === "auto"}
                      className={`absolute left-1/2 -translate-x-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 transition ${
                        src === "auto"
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-slate-200"
                      }`}
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

                    {/* DESTINO (SIN Detectar idioma) */}
                    <div className="relative ml-16" ref={rightRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenRight((v) => !v);
                          setOpenLeft(false);
                        }}
                        className="inline-flex items-center gap-2 px-2 py-1 text-[15px] font-medium text-slate-700 hover:text-slate-900 rounded-md"
                      >
                        <span>{OPTIONS_DST.find((o) => o.value === dst)?.label}</span>
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
                aria-label={t("translator.clear_left")}
                className="group absolute top-1/2 -translate-y-1/2 right-4 p-2 rounded-md hover:bg-slate-100"
              >
                <Trash2 className="w-5 h-5 text-slate-500" />
                <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                  {t("translator.clear_left")}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              {/* IZQUIERDA */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200 relative h-[500px] overflow-hidden flex flex-col">
                {sourceMode === "text" && (
                  <>
                    <div className="flex-1 min-h-0">
                      <textarea
                        ref={leftTA}
                        value={leftText}
                        onChange={(e) =>
                          setLeftText(e.target.value.slice(0, MAX_CHARS))
                        }
                        placeholder={t("translator.left_placeholder")}
                        className="w-full h-full resize-none bg-transparent outline-none text-[17px] leading-8 text-slate-700 placeholder:text-slate-500 font-medium overflow-y-auto"
                      />
                    </div>

                    <div className="absolute bottom-4 right-6 text-[13px] text-slate-400">
                      {leftText.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                    </div>
                  </>
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
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full rounded-2xl border border-dashed border-slate-300 bg-white/40 hover:bg-slate-50 transition px-6 py-10 text-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                      aria-label={labelChooseFileTitle}
                      title={labelChooseFileTitle}
                    >
                      <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                        <Plus className="w-10 h-10 text-sky-600" />
                      </div>
                      <div className="text-xl font-semibold text-slate-800">
                        {labelChooseFileTitle}
                      </div>
                      <div className="mt-4 text-sm text-slate-500">
                        {labelAcceptedFormats}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">{labelFolderHint}</div>
                    </button>

                    {documents.length > 0 && (
                      <div className="mt-4 flex-1 min-h-0">
                        <ul className="h-full overflow-y-auto divide-y divide-slate-200 rounded-xl border border-slate-200 overflow-x-hidden">
                          {documents.map(({ id, file }) => (
                            <li
                              key={id}
                              className="flex items-center justify-between gap-3 px-3 py-2 bg-white"
                            >
                              <div className="min-w-0 flex items-center gap-3 flex-1">
                                <div className="shrink-0 w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center">
                                  <FileIcon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-sm font-medium block truncate">
                                    {file.name}
                                  </span>
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
                            "summary.paste_urls_placeholder",
                            "Introduce aquí una o más URLs (separadas por línea)"
                          )}
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

              {/* DERECHA */}
              <div className="px-6 pt-10 pb-4 md:px-8 md:pt-12 md:pb-5 relative h-[500px] overflow-hidden flex flex-col">
                <div className="flex-1 min-h-0 pb-8">
                  <textarea
                    ref={rightTA}
                    value={
                      loading && document.activeElement !== rightTA.current
                        ? t("translator.loading")
                        : rightText
                    }
                    placeholder={t("translator.right_placeholder")}
                    readOnly
                    className={`w-full h-full resize-none bg-transparent outline-none text-[17px] leading-8 text-slate-700 placeholder:text-slate-500 font-medium overflow-y-auto ${
                      loading ? "italic text-slate-500" : ""
                    }`}
                  />
                </div>

                {err && (
                  <div className="absolute bottom-4 left-8 md:left-10 text-sm text-red-500">
                    {err}
                  </div>
                )}

                <div className="absolute bottom-4 right-6 flex items-center gap-4 text-slate-500">
                  <button
                    type="button"
                    onClick={handleSpeakToggle}
                    aria-label={speaking ? t("translator.stop") : t("translator.listen")}
                    aria-pressed={speaking}
                    disabled={!hasRealResult}
                    className={`group relative p-2 rounded-md hover:bg-slate-100 ${
                      speaking ? "text-slate-900" : ""
                    } ${hasRealResult ? "" : "opacity-40 cursor-not-allowed"}`}
                  >
                    {speaking ? (
                      <span className="inline-block w-[10px] h-[10px] rounded-[2px] bg-slate-600" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                    <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      {speaking ? t("translator.stop") : t("translator.listen")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={t("translator.copy")}
                    disabled={!hasRealResult}
                    className={`group relative p-2 rounded-md hover:bg-slate-100 ${
                      hasRealResult ? "" : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <CopyIcon className="w-5 h-5" />
                    )}
                    <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      {copied ? t("translator.copied") : t("translator.copy")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    aria-label={t("translator.pdf")}
                    disabled={!hasRealResult}
                    className={`group relative p-2 rounded-md hover:bg-slate-100 ${
                      hasRealResult ? "" : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <FileDown className="w-5 h-5" />
                    <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      {t("translator.pdf")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BenefitsSection />
      <ToolsSection />
      <FeaturesSection />
      <HowItWorks />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  );
}
