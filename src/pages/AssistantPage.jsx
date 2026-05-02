import React, { useState, useRef, useEffect, useMemo } from "react";
import { Sparkles, ArrowUp } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export default function AssistantPage() {
  const { t } = useTranslation();

  const tr = (key, fallback = "") => {
    const val = typeof t === "function" ? t(key) : null;
    return !val || val === key ? fallback : val;
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [avatarOk, setAvatarOk] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [systemError, setSystemError] = useState("");

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimerRef = useRef(null);

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const systemInstructionBase = useMemo(() => {
    return `
Eres el Asistente de IA de Euskalia.

Contexto: Euskalia es una plataforma centrada en el euskera para trabajar con textos: traducir, corregir, resumir, reescribir y generar contenido.

También puedes responder preguntas sobre la web de Euskalia: qué es, cómo funciona, qué herramientas incluye, para qué sirve cada una y cómo usarla.

Estilo:
- Responde de forma natural, profesional y directa.
- No enumeres capacidades si el usuario no lo pide.
- No uses frases repetitivas.
- Mantén un tono claro, útil y cercano.

Reglas:
- Si el usuario saluda, responde de forma breve y natural.
- Si pregunta qué es Euskalia, responde claramente en pocas frases.
- Si pide algo fuera de Euskalia o fuera del trabajo con textos, redirige brevemente hacia tareas relacionadas con Euskalia, textos o euskera.
- No uses listas salvo que sean necesarias.
    `.trim();
  }, []);

  const newChat = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setMessages([]);
    setInput("");
    setIsSending(false);
    setSystemError("");

    setTimeout(() => {
      inputRef.current?.focus?.();
    }, 0);
  };

  const extractAssistantText = (data) => {
    if (!data) return "";
    if (typeof data === "string") return data;
    return (
      data.text ||
      data.reply ||
      data.content ||
      data.message ||
      data?.choices?.[0]?.message?.content ||
      ""
    );
  };

  const callApi = async (chatMessages) => {
    const payload = {
      mode: "assistant",
      messages: [
        { role: "system", content: systemInstructionBase },
        ...chatMessages.map((m) => ({
          role: m.role,
          content: m.text,
        })),
      ],
    };

    const res = await fetch("/api/euskalia-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let data = null;
    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      const msg =
        extractAssistantText(data) ||
        tr("assistant_error_generic", "No se pudo generar la respuesta. Inténtalo de nuevo.");
      throw new Error(msg);
    }

    const out = extractAssistantText(data);

    if (!out) {
      throw new Error(tr("assistant_error_empty", "Respuesta vacía del servidor."));
    }

    return out;
  };

  const revealReply = (placeholderId, fullText) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    const safe = String(fullText || "");
    let i = 0;
    const chunkSize = 6;

    typingTimerRef.current = setInterval(() => {
      const nextChunk = safe.slice(i, i + chunkSize);

      if (!nextChunk) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
        setIsSending(false);
        setTimeout(() => inputRef.current?.focus?.(), 0);
        return;
      }

      i += nextChunk.length;

      setMessages((prev) =>
        prev.map((m) =>
          m._id === placeholderId
            ? { role: "assistant", text: safe.slice(0, i), _id: placeholderId }
            : m
        )
      );

      setTimeout(() => scrollToBottom(), 0);
    }, 16);
  };

  const send = async () => {
    const text = (input || "").trim();
    if (!text || isSending) return;

    setSystemError("");

    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setIsSending(true);

    const placeholderId = `${Date.now()}_${Math.random().toString(16).slice(2)}`;

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "", _id: placeholderId },
    ]);

    try {
      const reply = await callApi(next);
      revealReply(placeholderId, reply);
    } catch (e) {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);

      const errText =
        e?.message ||
        tr("assistant_error_generic", "No se pudo generar la respuesta. Inténtalo de nuevo.");

      setMessages((prev) => prev.filter((m) => m._id !== placeholderId));
      setSystemError(errText);
      setIsSending(false);

      setTimeout(() => inputRef.current?.focus?.(), 0);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] px-3 sm:px-6 py-6 sm:py-10 bg-slate-50">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="w-full bg-white rounded-[18px] shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100">
          <div className="flex items-start justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="text-[20px] font-extrabold text-slate-900">
                {tr("assistant_title", "Asistente de IA")}
              </div>
            </div>

            <button
              type="button"
              onClick={newChat}
              className="h-9 px-4 rounded-full text-sm font-semibold border bg-white border-slate-200 text-slate-900 shadow-sm inline-flex items-center gap-2 hover:bg-slate-50"
            >
              <span className="text-[18px] leading-none">+</span>
              {tr("assistant_new_chat", "Nuevo chat")}
            </button>
          </div>

          <div className="px-6 pt-3 pb-0">
            <div className="mt-5 h-[480px] rounded-2xl bg-white overflow-hidden flex flex-col">
              <div ref={listRef} className="relative flex-1 overflow-auto px-4 py-4">
                {messages.length === 0 ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="mb-5 flex justify-center">
                        {avatarOk ? (
                          <img
                            src="/olondo-mascota3.png"
                            alt="Euskalia IA"
                            className="h-36 sm:h-40 md:h-44 w-auto"
                            draggable={false}
                            onError={() => setAvatarOk(false)}
                          />
                        ) : (
                          <div className="h-32 w-32 rounded-full bg-sky-100 flex items-center justify-center text-5xl">
                            🤖
                          </div>
                        )}
                      </div>

                      <div className="text-[36px] sm:text-[40px] font-extrabold tracking-tight text-slate-900">
                        {tr("assistant_emptyTitle", "¿Cómo puedo ayudarte?")}
                      </div>

                      <div className="mt-2 text-[17px] sm:text-[18px] text-slate-600">
                        {tr("assistant_emptySubtitle", "Escribe tu petición para empezar")}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((m, idx) => {
                      const isUser = m.role === "user";

                      if (isUser) {
                        return (
                          <div key={idx} className="w-full flex justify-end">
                            <div className="max-w-[75%] px-4 py-2.5 rounded-[18px] bg-sky-100 text-slate-900 border border-sky-200 whitespace-pre-wrap">
                              {m.text}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={idx} className="w-full flex justify-start items-start gap-3">
                          <div className="mt-0.5 h-10 w-10 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center overflow-hidden">
                            {avatarOk ? (
                              <img
                                src="/olondo-mascota3.png"
                                alt=""
                                className="h-full w-full object-cover scale-[1.35]"
                                onError={() => setAvatarOk(false)}
                              />
                            ) : (
                              <span className="text-[14px]">🤖</span>
                            )}
                          </div>

                          <div className="max-w-[75%] px-4 py-2.5 rounded-[18px] bg-slate-100 text-slate-900 border border-slate-200 whitespace-pre-wrap">
                            {m.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {systemError && (
                <div className="px-4 pb-3">
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {systemError}
                  </div>
                </div>
              )}

              <div className="px-4 pb-4">
                <div className="rounded-[18px] border-2 border-slate-900/90 bg-white px-4 h-12 flex items-center gap-3">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={tr("assistant_placeholder", "Escribe aquí…")}
                    className="flex-1 h-full bg-transparent outline-none text-[14px] text-slate-900 placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={send}
                    disabled={!input.trim() || isSending}
                    className={`h-10 w-10 rounded-full inline-flex items-center justify-center transition ${
                      input.trim() && !isSending
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    }`}
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-5" />
        </div>
      </div>
    </div>
  );
}