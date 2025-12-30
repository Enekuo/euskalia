import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export default function AssistantPage() {
  const { t } = useTranslation();
  const tr = (k) => t(k) || k;

  const [messages, setMessages] = useState([]); // { role: "user" | "assistant", content: string }
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Mantener el foco en el input al entrar en la página
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    // Mensaje del usuario
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");

    // Volver a enfocar el input tras enviar
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    // 🔵 Llamada al backend de Euskalia (CHAT OFICIAL)
    try {
      const res = await fetch("/api/euskalia-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "assistant",      // muy importante: activa el manual interno
          messages: newMessages,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en la respuesta del asistente");
      }

      const data = await res.json();
      const assistantText =
        data?.content ||
        "Une honetan ezin izan da erantzuna sortu. Saiatu berriro edo galdetu laguntza atalean.";

      const assistantMsg = {
        role: "assistant",
        content: assistantText,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      const errorMsg = {
        role: "assistant",
        content:
          "Arazo bat egon da erantzuna sortzerakoan. Saiatu berriro pixka batean edo galdetu zuzenean euskarri atalean.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Botón "Txat berria" arriba a la derecha */}
      <div className="flex justify-end px-6 pt-4">
        <button
          onClick={handleNewChat}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white
                     px-4 h-10 text-sm font-medium text-slate-700 shadow-sm
                     hover:bg-slate-50 hover:shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          {tr("assistant_new_chat")}
        </button>
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="flex-1 flex flex-col items-center px-4 pb-8">
        {/* Mascota + título solo si no hay mensajes */}
        {isEmpty && (
          <div className="mt-2 mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex items-center justify-center">
              <img
                src="/olondo.mascota.png"
                alt="Euskalia IA"
                className="h-40 sm:h-44 md:h-48 w-auto"
                draggable={false}
              />
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              {tr("assistant_title")}
            </h1>
          </div>
        )}

        {/* ZONA DE MENSAJES */}
        {!isEmpty && (
          <div className="w-full max-w-3xl flex-1 overflow-y-auto mt-4 mb-6 pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`w-full flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2 text-sm md:text-base leading-relaxed ${
                    m.role === "user"
                      ? "bg-sky-600 text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BARRA DE ESCRITURA — CENTRADA PERFECTAMENTE */}
        <div className="w-full flex justify-center mt-2 mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="w-full max-w-3xl"
          >
            <div
              className="
                flex items-center gap-2
                rounded-full border border-slate-200 bg-white
                shadow-sm px-4 py-2
                hover:shadow-md transition
              "
            >
              {/* Botón + */}
              <button
                type="button"
                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* INPUT */}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={tr("assistant_placeholder")}
                className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-slate-400 px-1"
              />

              {/* Enviar */}
              <button
                type="submit"
                disabled={!input.trim()}
                className="
                  ml-2 h-9 px-6 rounded-full text-sm font-semibold text-white
                  bg-sky-500 hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed
                  transition
                "
              >
                {tr("assistant_send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
