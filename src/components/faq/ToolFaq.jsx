import React from "react";
import { useTranslation } from "@/lib/translations";
import Faq from "./Faq";
import "./faq-intense.css";

// FAQ de las herramientas: la réplica nueva (Faq) con los TEXTOS y RESPUESTAS
// de la FAQ antigua (FaqSection) y su FONDO: azul muy claro #eef4ff y
// resplandor azul difuminado arriba.
// Mismas preguntas que antes (ids 1–6 y 10), cada una con su respuesta
// desplegable. Se ven 5 al principio; «Ver todas las preguntas» muestra el resto.
const FAQ_ITEMS = [1, 2, 3, 4, 5, 6, 10];
const INITIAL_VISIBLE = 5;

const OLD_BACKGROUND_STYLE = { "--na-bg": "#eef4ff", position: "relative", overflow: "hidden" };

const OldGlow = (
  <div className="pointer-events-none absolute inset-x-0 -top-40 flex justify-center" aria-hidden="true">
    <div className="h-64 w-[520px] bg-gradient-to-b from-blue-400/35 to-transparent blur-3xl" />
  </div>
);

export default function ToolFaq() {
  const { t } = useTranslation();
  const tr = (key, fallback = "") => t(key) || fallback;

  // Misma lógica que la FAQ antigua: una línea = un párrafo; si contiene el
  // email de contacto, se convierte en enlace mailto.
  const renderAnswer = (answerText) => {
    if (!answerText) return null;
    const email = tr("faq_contact_email", "");

    return answerText
      .split("\n")
      .map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        if (email && trimmed.includes(email)) {
          const parts = trimmed.split(email);
          return (
            <p key={index}>
              {parts[0]}
              <a href={`mailto:${email}`}>{email}</a>
              {parts[1]}
            </p>
          );
        }

        return <p key={index}>{trimmed}</p>;
      })
      .filter(Boolean);
  };

  return (
    <Faq
      titulo={tr("faq_title", "")}
      subtitulo={tr("faq_subtitle", "")}
      preguntas={FAQ_ITEMS.map((id) => tr(`faq_item${id}_question`, ""))}
      respuestas={FAQ_ITEMS.map((id) => renderAnswer(tr(`faq_item${id}_answer`, "")))}
      textoEnlace={tr("infoFaq.more", "Ver todas las preguntas")}
      inicial={INITIAL_VISIBLE}
      style={OLD_BACKGROUND_STYLE}
      fondo={OldGlow}
      className="na-faq--intense"
    />
  );
}
