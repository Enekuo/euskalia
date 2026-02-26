import React, { useState, useRef, useEffect, useMemo } from "react";
import { Sparkles, ArrowUp } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";

export default function PremiumAiAssistant() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tr = (key, fallback = "") => {
    const val = typeof t === "function" ? t(key) : null;
    return !val || val === key ? fallback : val;
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [avatarOk, setAvatarOk] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  // ✅ prompt corto + redirección mínima + no repetir capacidades
  const systemInstructionBase = useMemo(() => {
    return `
Eres Euskalia AI, un asistente de escritura.
Responde de forma útil y directa trabajando con textos: redactar, reescribir, resumir, traducir, mejorar.
No respondas preguntas de cultura general o temas fuera de escritura.
Si el usuario pide algo fuera de contexto, responde SOLO con: "Puedo ayudarte con textos. Pega el texto o dime qué quieres redactar/mejorar."
No añadas listas de capacidades, ejemplos, ni explicaciones extra.
    `.trim();
  }, []);

  const newChat = () => {
    setMessages([]);
    setInput("");
    setIsSending(false);
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
      (data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content) ||
      ""
    );
  };

  const callApi = async (chatMessages) => {
    const user = auth?.currentUser || null;
    const token = user ? await user.getIdToken() : null;

    // ✅ Si ya hubo al menos 1 redirección, endurecemos para que NO vuelva a repetirlo
    const outOfScopeCount = chatMessages.filter(
      (m) =>
        m.role === "assistant" &&
        typeof m.text === "string" &&
        m.text.includes("Puedo ayudarte con textos.")
    ).length;

    const systemInstruction =
      outOfScopeCount >= 1
        ? `
${systemInstructionBase}

IMPORTANTE: ya has redirigido antes. Si vuelve a ser fuera de contexto, repite SOLO exactamente: "Puedo ayudarte con textos. Pega el texto o dime qué quieres redactar/mejorar."
          `.trim()
        : systemInstructionBase;

    const payload = {
      messages: [
        { role: "system", content: systemInstruction },
        ...chatMessages.map((m) => ({
          role: m.role,
          content: m.text,
        })),
      ],
    };

    const res = await fetch("/api/pro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
        `Error ${res.status}. No se pudo generar la respuesta.`;
      throw new Error(msg);
    }

    const out = extractAssistantText(data);
    if (!out) throw new Error("Respuesta vacía del servidor.");
    return out;
  };

  const send = async () => {
    const text = (input || "").trim();
    if (!text || isSending) return;

    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setIsSending(true);

    const placeholderId = `${Date.now()}_${Math.random()
      .toString(16)
      .slice(2)}`;
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "…", _id: placeholderId },
    ]);

    try {
      const reply = await callApi(next);
      setMessages((prev) =>
        prev.map((m) =>
          m._id === placeholderId ? { role: "assistant", text: reply } : m
        )
      );
    } catch (e) {
      const errText =
        (e && e.message) ||
        "No se pudo generar la respuesta. Inténtalo de nuevo.";
      setMessages((prev) =>
        prev.map((m) =>
          m._id === placeholderId ? { role: "assistant", text: errText } : m
        )
      );
    } finally {
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
    <div className="w-full min-h-[calc(100vh-64px)] px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="w-full bg-white rounded-[18px] shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100">
          {/* TOP BAR */}
          <div className="flex items-start justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-[20px] font-extrabold text-slate-900">
                Asistente de IA
              </div>
            </div>

            <button
              type="button"
              onClick={newChat}
              className="h-9 px-4 rounded-full text-sm font-semibold border bg-white border-slate-200 text-slate-900 shadow-sm inline-flex items-center gap-2 hover:bg-slate-50"
            >
              <span className="text-[18px] leading-none">+</span>
              Nuevo chat
            </button>
          </div>

          <div className="px-6 pt-3 pb-0">
            <div className="mt-5 h-[480px] rounded-2xl bg-white overflow-hidden flex flex-col">
              <div ref={listRef} className="flex-1 overflow-auto px-4 py-4">
                {messages.length === 0 ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="text-[40px] font-extrabold tracking-tight text-slate-900">
                        ¿Cómo puedo ayudar?
                      </div>
                      <div className="mt-2 text-[18px] text-slate-600">
                        Escribe tu petición
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
                        <div
                          key={idx}
                          className="w-full flex justify-start items-start gap-3"
                        >
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

              {/* INPUT */}
              <div className="px-4 pb-4">
                <div className="rounded-[18px] border-2 border-slate-900/90 bg-white px-4 h-12 flex items-center gap-3">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Escribe aquí…"
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

        <div className="mt-10 text-center text-[12px] text-slate-500">
          Al usar el chat IA, confirmas que estás de acuerdo con nuestras{" "}
          <button
            type="button"
            onClick={() => navigate("/terminos-condiciones")}
            className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            Términos y condiciones
          </button>{" "}
          y que has leído la{" "}
          <button
            type="button"
            onClick={() => navigate("/politica-de-privacidad")}
            className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            Política de privacidad
          </button>
          .
        </div>
      </div>
    </div>
  );
}