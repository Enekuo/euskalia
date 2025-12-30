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
import { addLibraryDoc } from "@/proLibraryStore";

const OPTIONS = ["eus", "es", "en", "fr"]; // ✅ EUS, ES, EN, FR (en este orden)

const MAX_CHARS = 5000;

const directionText = (src, dst) => {
  if (src === "eus" && dst === "es") {
    return `
Eres Euskalia, un traductor profesional.
Traduce SIEMPRE de Euskera a Español.
Responde SIEMPRE en Español cuando des la TRADUCCIÓN.
No cambies de idioma en la traducción.
`.trim();
  }
  if (src === "es" && dst === "eus") {
    return `
Eres Euskalia, itzulpen profesionaleko tresna bat.
Itzuli BETI gaztelaniatik euskarara.
Erantzun BETI euskaraz itzulpena ematean.
Ez aldatu hizkuntza itzulpenean.
`.trim();
  }
  return `
Eres Euskalia, un traductor profesional.
Traduce siempre del idioma de origen al idioma de destino indicado.
Responde SIEMPRE en el idioma de destino cuando des la TRADUCCIÓN.
`.trim();
};

export default function ProTranslator() {
  const { t, language } = useTranslation();
  const tr = (k, f) => t(k) || f;

  // ✅ NUEVAS claves proTranslator.output_language_* para etiquetas de idioma
  const LBL_EUS = tr("proTranslator.output_language_eus", "Euskara");
  const LBL_ES = tr("proTranslator.output_language_es", "Gaztelania");
  const LBL_EN = tr("proTranslator.output_language_en", "Ingelesa");
  const LBL_FR = tr("proTranslator.output_language_fr", "Français");

  const langLabel = (val) => {
    if (val === "eus") return LBL_EUS;
    if (val === "es") return LBL_ES;
    if (val === "en") return LBL_EN;
    if (val === "fr") return LBL_FR;
    return val;
  };

  const [src, setSrc] = useState("eus");
  const [dst, setDst] = useState("es");
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);

  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [listening, setListening] = useState(false);

  const [sourceMode, setSourceMode] = useState("text");

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

  useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    },
    []
  );

  const swap = () => {
    setSrc(dst);
    setDst(src);
  };

  useEffect(() => {
    const onDown = (e) => {
      if (leftRef.current && !leftRef.current.contains(e.target))
        setOpenLeft(false);
      if (rightRef.current && !rightRef.current.contains(e.target))
        setOpenRight(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  // ✅ Scroll sin barra visible (pero NO cambia altura)
  const HIDE_SCROLLBAR =
    "overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

  // ✅ ALTURA FIJA del área de contenido (esto evita que “se alarguen las tablas”)
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

      // ✅ NUEVO: mensajes típicos de “no traducción”
      "no se puede traducir",
      "no puedo traducir",
      "no es una palabra",
      "no es una palabra en",
      "no existe en euskera",
      "no tiene traducción",
    ];

    if (patterns.some((p) => low.includes(p))) return true;

    return false;
  };

  const applyTranslationOutput = (data) => {
    const out = (data?.content ?? data?.translation ?? "").toString();

    const flaggedRefusal =
      data?.refusal === true ||
      data?.blocked === true ||
      data?.ok === false ||
      typeof data?.error === "string";

    if (flaggedRefusal) {
      setRightText(out || "");
      setResultStatus("error");
      return;
    }

    if (!out.trim()) {
      setRightText("");
      setResultStatus("idle");
      return;
    }

    if (isNonResultMessage(out)) {
      setRightText(out);
      setResultStatus("error");
      return;
    }

    setRightText(out);
    setResultStatus("success");
  };

  // === Traducción MODO TEXTO
  useEffect(() => {
    if (sourceMode !== "text") return;

    if (leftText.length < MAX_CHARS) setErr("");

    if (!leftText.trim()) {
      setRightText("");
      setResultStatus("idle");
      return;
    }

    if (leftText.length >= MAX_CHARS) {
      setErr(`Límite máximo: ${MAX_CHARS.toLocaleString()} caracteres.`);
      setResultStatus("error");
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setResultStatus("loading");

        const system = `${directionText(
          src,
          dst
        )}\n\nResponde SOLO con la traducción final. Mantén el formato.`;

        const res = await fetch("/api/chat", {
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
          console.error("API /api/chat error:", res.status, raw);
          throw new Error(`API /api/chat ${res.status}`);
        }

        const data = await res.json();
        applyTranslationOutput(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate error:", e);
          const hasPrev = !!(rightText && rightText.trim().length > 0);
          if (!hasPrev) setErr("No se pudo traducir ahora mismo.");
          setResultStatus("error");
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

  // === Traducción MODO URL
  useEffect(() => {
    if (sourceMode !== "url") return;

    if (!urlItems.length) {
      setRightText("");
      setErr("");
      setResultStatus("idle");
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setErr("");
        setResultStatus("loading");

        const urls = urlItems.map((u) => u.url);
        const res = await fetch("/api/chat", {
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
          }),
        });

        if (!res.ok) {
          const raw = await res.text().catch(() => "");
          console.error("API /api/chat (urls) error:", res.status, raw);
          setErr("No se pudieron procesar las URLs ahora mismo.");
          setResultStatus("error");
          return;
        }

        const data = await res.json();
        applyTranslationOutput(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate urls error:", e);
          setErr("No se pudieron procesar las URLs ahora mismo.");
          setResultStatus("error");
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [sourceMode, src, dst, urlItems]);

  const readFileAsText = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result || "");
      reader.onerror = reject;
      reader.readAsText(file);
    });

  // === Traducción MODO DOCUMENTO
  useEffect(() => {
    if (sourceMode !== "document") return;

    if (!documents.length) {
      setRightText("");
      setErr("");
      setResultStatus("idle");
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setErr("");
        setResultStatus("loading");

        const contents = await Promise.all(
          documents.map(({ file }) => readFileAsText(file))
        );
        const combined = contents.join("\n\n---\n\n").slice(0, MAX_CHARS);

        if (!combined.trim()) {
          setErr("No se ha podido leer el documento.");
          setRightText("");
          setResultStatus("error");
          return;
        }

        const system = `${directionText(
          src,
          dst
        )}\n\nResponde SOLO con la traducción final.`;

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.2,
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

        if (!res.ok) {
          const raw = await res.text().catch(() => "");
          console.error("API /api/chat (documents) error:", res.status, raw);
          setErr("No se han podido procesar los documentos ahora mismo.");
          setResultStatus("error");
          return;
        }

        const data = await res.json();
        applyTranslationOutput(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("translate documents error:", e);
          setErr("No se han podido procesar los documentos ahora mismo.");
          setResultStatus("error");
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [sourceMode, src, dst, documents]);

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

  const Dropdown = ({ open, selected, onSelect, align = "left" }) => {
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
            {OPTIONS.map((val) => (
              <Item
                key={val}
                label={langLabel(val)}
                active={selected === val}
                onClick={() => onSelect(val)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ✅ NUEVAS claves proTranslator.sources_tab_* (en vez de summary.*)
  const labelTabText = tr("proTranslator.sources_tab_text", "Testua");
  const labelTabDocument = tr("proTranslator.sources_tab_document", "Dokumentua");
  const labelTabUrl = tr("proTranslator.sources_tab_url", "URLa");

  const labelChooseFileTitle = tr(
    "proTranslator.choose_file_title",
    "Elige tu archivo o carpeta"
  );
  const labelAcceptedFormats = tr("proTranslator.accepted_formats", "Formatos admitidos");
  const labelFolderHint = tr("proTranslator.folder_hint", "Puedes arrastrar varios archivos.");

  const labelPasteUrls = tr("proTranslator.paste_urls_label", "Pegar URLs*");
  const labelAddUrl = tr("proTranslator.add_url", "Añadir URLs");
  const labelSaveUrls = tr("proTranslator.save_urls", "Guardar");
  const labelCancel = tr("proTranslator.cancel", "Cancelar");
  const labelUrlsNoteVisible = tr("proTranslator.urls_note_visible", "Solo se importará el texto visible.");
  const labelUrlsNotePaywalled = tr("proTranslator.urls_note_paywalled", "No se admiten artículos de pago.");
  const labelRemove = tr("proTranslator.remove", "Quitar");

  const labelSaveTranslation = tr("proTranslator.save_button_label", "Guardar");
  const librarySavedMessage = tr("proTranslator.library_saved_toast", "Guardado en biblioteca");

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
              setLeftText((prev) =>
                (prev ? prev + "\n" + txt : txt).slice(0, MAX_CHARS)
              );
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
    setErr("");
    setResultStatus("idle");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rightText || "");
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1200);
    } catch (_) {}
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
    savedTimerRef.current = setTimeout(() => {
      setSavedToLibrary(false);
    }, 2000);
  };

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

  const canSave = resultStatus === "success" && !!rightText?.trim() && !loading;

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
                    onClick={() => setSourceMode("text")}
                    className={`inline-flex items-center gap-2 ${
                      sourceMode === "text"
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <FileText
                      className={`w-4 h-4 ${
                        sourceMode === "text"
                          ? "text-blue-600"
                          : "text-slate-500"
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
                        sourceMode === "url"
                          ? "text-blue-600"
                          : "text-slate-500"
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
                        <span>{langLabel(src)}</span>
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
                        }}
                        align="left"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={swap}
                      aria-label="Intercambiar idiomas"
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
                        }}
                        align="right"
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

            {/* paneles */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              {/* IZQUIERDA */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200 relative">
                {sourceMode === "text" && (
                  <>
                    <textarea
                      ref={leftTA}
                      value={leftText}
                      onChange={(e) =>
                        setLeftText(e.target.value.slice(0, MAX_CHARS))
                      }
                      placeholder={t("translator.left_placeholder")}
                      className={`w-full ${FIXED_PANEL_H} resize-none bg-transparent outline-none text-[17px] leading-8 text-slate-700 placeholder:text-slate-500 font-medium ${HIDE_SCROLLBAR}`}
                    />
                    <div className="absolute bottom-4 right-6 text-[13px] text-slate-400">
                      {leftText.length.toLocaleString()} /{" "}
                      {MAX_CHARS.toLocaleString()}
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

                    {/* Zona superior (NO empuja el tamaño) */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full rounded-2xl border border-dashed border-slate-300 bg-white/40 hover:bg-slate-50 transition px-6 py-8 text-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] flex-none"
                      aria-label={labelChooseFileTitle}
                      title={labelChooseFileTitle}
                    >
                      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center">
                        <Plus className="w-9 h-9 text-sky-600" />
                      </div>
                      <div className="text-xl font-semibold text-slate-800">
                        {labelChooseFileTitle}
                      </div>
                      <div className="mt-3 text-sm text-slate-500">
                        {labelAcceptedFormats}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {labelFolderHint}
                      </div>
                    </button>

                    {/* ✅ LISTA: si no cabe, SOLO aquí aparece scroll (y NO alarga tabla) */}
                    {documents.length > 0 && (
                      <div className="mt-4 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-white">
                        <ul className="divide-y divide-slate-200">
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
                  <div className={`w-full ${FIXED_PANEL_H} flex flex-col overflow-hidden`}>
                    <div className="mb-3 flex items-center justify-between flex-none">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                        <UrlIcon className="w-4 h-4" />
                        {labelPasteUrls}
                      </div>
                      <button
                        type="button"
                        onClick={() => setUrlInputOpen(true)}
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
                          onChange={(e) => setUrlsTextarea(e.target.value)}
                          placeholder={tr(
                            "proTranslator.paste_urls_placeholder",
                            "Introduce URLs separadas por línea"
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
                      <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                        {urlItems.map(({ id, url, host }) => (
                          <li
                            key={id}
                            className="flex items-center justify-between gap-3 px-3 py-2"
                          >
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
                <textarea
                  ref={rightTA}
                  value={
                    loading && document.activeElement !== rightTA.current
                      ? t("translator.loading")
                      : rightText
                  }
                  onChange={(e) => setRightText(e.target.value)}
                  placeholder={t("translator.right_placeholder")}
                  className={`w-full ${FIXED_PANEL_H} resize-none bg-transparent outline-none text-[17px] leading-8 text-slate-700 placeholder:text-slate-500 font-medium ${
                    loading ? "italic text-slate-500" : ""
                  } ${HIDE_SCROLLBAR}`}
                />

                {err && (
                  <div className="absolute bottom-4 left-8 text-sm text-red-500">
                    {err}
                  </div>
                )}

                <div className="absolute bottom-4 right-6 flex flex-col items-end gap-1 text-slate-500">
                  {savedToLibrary && (
                    <p className="text-xs text-emerald-600 mb-1">
                      {librarySavedMessage}
                    </p>
                  )}

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleSpeakToggle}
                      aria-label={speaking ? t("translator.stop") : t("translator.listen")}
                      className={`group relative p-2 rounded-md hover:bg-slate-100 ${
                        speaking ? "text-slate-900" : ""
                      }`}
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
                      className="group relative p-2 rounded-md hover:bg-slate-100"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                      <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                        {copied ? t("translator.copied") : t("translator.copy")}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      aria-label={t("translator.pdf")}
                      className="group relative p-2 rounded-md hover:bg-slate-100"
                    >
                      <FileDown className="w-5 h-5" />
                      <span className="pointer-events-none absolute -top-9 right-1 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition">
                        {t("translator.pdf")}
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
 