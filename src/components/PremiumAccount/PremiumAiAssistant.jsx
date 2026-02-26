import React, { useMemo, useState, useRef, useEffect } from "react";
import { Sparkles, Plus, ArrowUp } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { useNavigate } from "react-router-dom";

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
  const listRef = useRef(null);

  const placeholderTitle = useMemo(
    () => tr("assistant.title", "Euskalia AI"),
    [t]
  );

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const newChat = () => {
    setMessages([]);
    setInput("");
  };

  const send = () => {
    const text = (input || "").trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: tr(
            "assistant.reply_hello",
            "¡Hola! ¿En qué puedo ayudarte hoy?"
          ),
        },
      ]);
    }, 150);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-[980px]">
        <div
          className="
            w-full
            bg-white
            rounded-[18px]
            shadow-[0_20px_80px_rgba(0,0,0,0.12)]
            overflow-hidden
            border border-slate-100
          "
        >
          {/* TOP BAR */}
          <div className="flex items-start justify-between px-6 pt-6 pb-2">
            {/* IZQUIERDA → TÍTULO */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>

              <div>
                <div className="text-[18px] font-extrabold text-slate-900">
                  {placeholderTitle}
                </div>

                <div className="mt-1 text-[14px] leading-6 text-slate-600">
                  {tr(
                    "assistant.subtitle",
                    "Tu asistente de IA dentro de Euskalia. (Sin conectar a la API por ahora)"
                  )}
                </div>
              </div>
            </div>

            {/* DERECHA → NUEVO CHAT */}
            <button
              type="button"
              onClick={newChat}
              className="
                h-9 px-4 rounded-full text-sm font-semibold
                border bg-white border-slate-200 text-slate-900 shadow-sm
                inline-flex items-center gap-2
                hover:bg-slate-50 transition
              "
            >
              <Plus className="w-4 h-4" />
              {tr("assistant.new_chat", "Nuevo chat")}
            </button>
          </div>

          {/* CONTENT */}
          <div className="px-6 pt-3 pb-0">
            <div
              className="
                mt-5
                h-[360px] sm:h-[440px]
                rounded-2xl
                bg-white
                overflow-hidden
                flex flex-col
              "
            >
              {/* MENSAJES */}
              <div
                ref={listRef}
                className="flex-1 overflow-auto px-2 sm:px-4 py-4"
              >
                {messages.length === 0 ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="text-[34px] sm:text-[44px] font-extrabold tracking-tight text-slate-900">
                        {tr(
                          "assistant.big_title",
                          "¿Cómo puedo ayudar?"
                        )}
                      </div>
                      <div className="mt-2 text-[16px] sm:text-[18px] text-slate-600">
                        {tr(
                          "assistant.big_subtitle",
                          "Usa el chat IA para generar nuevas ideas"
                        )}
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
                            <div
                              className="
                                max-w-[75%]
                                px-4 py-2.5
                                rounded-[18px]
                                bg-sky-100
                                text-slate-900
                                border border-sky-200
                              "
                            >
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
                          {/* AVATAR */}
                          <div
                            className="
                              mt-0.5
                              h-10 w-10
                              rounded-full
                              bg-sky-100
                              border border-sky-200
                              flex items-center justify-center
                              shrink-0
                              overflow-hidden
                            "
                          >
                            {avatarOk ? (
                              <img
                                src="/olondo-mascota2.png"
                                alt=""
                                className="h-8 w-8 object-contain"
                                draggable={false}
                                onError={() => setAvatarOk(false)}
                              />
                            ) : (
                              <span className="text-slate-700 text-[14px]">
                                🤖
                              </span>
                            )}
                          </div>

                          <div
                            className="
                              max-w-[75%]
                              px-4 py-2.5
                              rounded-[18px]
                              bg-slate-100
                              text-slate-900
                              border border-slate-200
                            "
                          >
                            {m.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* INPUT */}
              <div className="px-2 sm:px-4 pb-4">
                <div
                  className="
                    rounded-[18px]
                    border-2 border-slate-900/90
                    bg-white
                    px-4
                    py-2
                    flex items-center gap-3
                  "
                >
                  <button
                    type="button"
                    className="
                      h-9 w-9
                      rounded-full
                      border border-slate-200
                      bg-white
                      hover:bg-slate-50
                      inline-flex items-center justify-center
                    "
                  >
                    <Plus className="w-5 h-5" />
                  </button>

                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    rows={1}
                    placeholder={tr(
                      "assistant.input_placeholder",
                      "Ask anything…"
                    )}
                    className="
                      flex-1
                      resize-none
                      outline-none
                      text-[14px]
                      text-slate-900
                      placeholder:text-slate-400
                      h-9
                      min-h-[36px]
                      max-h-[72px]
                      pt-[6px]
                    "
                  />

                  <button
                    type="button"
                    onClick={send}
                    disabled={!input.trim()}
                    className={`h-10 w-10 rounded-full inline-flex items-center justify-center transition ${
                      input.trim()
                        ? "bg-slate-100 hover:bg-slate-200"
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    }`}
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>

                <div className="pt-3 text-center text-[12px] text-slate-500">
                  {tr(
                    "assistant.disclaimer",
                    "Euskalia AI can make mistakes. Double-check replies."
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="h-5" />
        </div>

        {/* TEXTO LEGAL */}
        <div className="mt-10 text-center text-[12px] text-slate-500">
          Al usar el chat IA, confirmas que estás de acuerdo con nuestras{" "}
          <button
            onClick={() => navigate("/terminos-condiciones")}
            className="text-blue-600 underline hover:text-blue-700"
          >
            Términos y condiciones
          </button>{" "}
          y que has leído la{" "}
          <button
            onClick={() => navigate("/politica-de-privacidad")}
            className="text-blue-600 underline hover:text-blue-700"
          >
            Política de privacidad
          </button>
          .
        </div>
      </div>
    </div>
  );
}