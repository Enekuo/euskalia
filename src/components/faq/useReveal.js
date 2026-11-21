import { useEffect, useRef, useState } from "react";

/**
 * Animación de entrada al hacer scroll (la misma del original). Devuelve un
 * ref y la clase `na-reveal` (+ `is-visible` cuando el elemento entra en
 * pantalla). Se dispara UNA sola vez: no se vuelve a ocultar al salir.
 * `delay` (ms) retrasa la entrada mediante la variable CSS --reveal-delay.
 * (Convertido de useReveal.ts: solo se han quitado los tipos.)
 */
export function useReveal(delay = 0) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const className = `na-reveal${isVisible ? " is-visible" : ""}`;
  const style = delay ? { "--reveal-delay": `${delay}ms` } : undefined;

  return { ref, isVisible, className, style };
}
