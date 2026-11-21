import React, { useId, useState } from "react";
import { useReveal } from "./useReveal";
import "./faq.css";
import "./faq-extra.css";

/**
 * Sección «Preguntas frecuentes». Réplica exacta (estructura, tamaños,
 * colores, animaciones y transiciones) del paquete exportar-faq. Los textos
 * se pasan por props: el componente no trae ninguno.
 * (Convertido de Faq.tsx: solo se han quitado los tipos.)
 *
 * Retrasos de entrada (no cambiar): título 0 ms, subtítulo 90 ms, cada
 * pregunta i × 70 ms, enlace final (nº de preguntas × 70) + 60 ms.
 *
 * Ampliaciones de Euskalia (todas opcionales; sin ellas se comporta igual
 * que el original):
 *  - `respuestas`: array paralelo a `preguntas` (nodos React). Si se pasa,
 *    cada pregunta despliega su respuesta al pulsarla (acordeón, una abierta
 *    a la vez) y el «+» queda como «×» mientras está abierta.
 *  - `inicial`: nº de preguntas visibles al principio. El enlace final pasa a
 *    ser un botón que muestra todas y luego desaparece.
 *  - `className`, `style`, `fondo`: cambiar el fondo / variante de la sección.
 */
function FaqItem({ pregunta, index, delayIndex, respuesta, abierta, onToggle, panelId }) {
  const { ref, className, style } = useReveal(delayIndex * 70);
  const hasAnswer = respuesta !== undefined && respuesta !== null;

  return (
    <>
      <button
        ref={ref}
        type="button"
        className={`na-faq__item ${className}${abierta ? " is-open" : ""}`}
        style={style}
        onClick={hasAnswer ? () => onToggle(index) : undefined}
        aria-expanded={hasAnswer ? abierta : undefined}
        aria-controls={hasAnswer ? panelId : undefined}
      >
        <span className="na-faq__q">{pregunta}</span>
        <span className="na-faq__plus" aria-hidden="true">
          +
        </span>
      </button>
      {hasAnswer && abierta && (
        <div id={panelId} className="na-faq__answer" role="region">
          {respuesta}
        </div>
      )}
    </>
  );
}

function Faq({
  titulo,
  subtitulo,
  preguntas,
  respuestas,
  textoEnlace,
  hrefEnlace,
  inicial,
  style,
  fondo,
  className = "",
}) {
  const baseId = useId();
  const [abierta, setAbierta] = useState(null);
  const [todas, setTodas] = useState(false);
  // Al pulsar «ver todas» la lista se vuelve a montar (key) → todas las
  // preguntas, también las primeras, repiten su animación de entrada.
  const [ronda, setRonda] = useState(0);

  const limite = inicial && !todas ? Math.min(inicial, preguntas.length) : preguntas.length;
  const hayMas = limite < preguntas.length;
  const visibles = preguntas.slice(0, limite);

  const heading = useReveal();
  const lead = useReveal(90);
  const more = useReveal(visibles.length * 70 + 60);

  const toggle = (i) => setAbierta((cur) => (cur === i ? null : i));

  return (
    <section className={`na-faq ${className}`.trim()} style={style}>
      {fondo}
      <h2 ref={heading.ref} className={`na-faq__title ${heading.className}`} style={heading.style}>
        {titulo}
      </h2>
      <p ref={lead.ref} className={`na-faq__lead ${lead.className}`} style={lead.style}>
        {subtitulo}
      </p>

      <div className="na-faq__list" key={ronda}>
        {visibles.map((pregunta, index) => (
          <FaqItem
            key={`${index}-${pregunta}`}
            pregunta={pregunta}
            index={index}
            delayIndex={index}
            respuesta={respuestas ? respuestas[index] : undefined}
            abierta={abierta === index}
            onToggle={toggle}
            panelId={`${baseId}-a${index}`}
          />
        ))}
      </div>

      {inicial ? (
        hayMas && (
          <button
            ref={more.ref}
            type="button"
            onClick={() => {
              setAbierta(null);
              setTodas(true);
              setRonda((r) => r + 1);
            }}
            className={`na-faq__more ${more.className}`}
            style={more.style}
          >
            {textoEnlace}
            <ArrowIcon />
          </button>
        )
      ) : (
        <a ref={more.ref} href={hrefEnlace} className={`na-faq__more ${more.className}`} style={more.style}>
          {textoEnlace}
          <ArrowIcon />
        </a>
      )}
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export default Faq;
