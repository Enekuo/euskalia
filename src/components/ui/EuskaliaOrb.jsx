// =============================================================================
// Euskalia — ORBE de carga ("la presencia de la IA")
// -----------------------------------------------------------------------------
// CSS puro, solo transform y opacidad:
//   - halo: degradado radial ESTÁTICO; solo late su opacidad/escala (animate-orb)
//   - anillo: degradado cónico recortado en aro que gira (rotate)
//   (sin esfera interior: solo halo + anillo)
// Nada de animar box-shadow ni blur.
//
// Reducir movimiento: animate-orb y .motion-loop se anulan en index.css →
// el orbe queda estático y completo.
// =============================================================================
import React from "react";
import { LOOP_MS } from "@/lib/motion";

export default function EuskaliaOrb({ size = 72, label = "", className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label || undefined}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Halo exterior (radial estático; solo late) */}
      <span
        aria-hidden="true"
        className="absolute -inset-[45%] rounded-full animate-orb bg-[radial-gradient(circle,rgba(59,130,246,0.30)_0%,rgba(56,189,248,0.14)_40%,transparent_70%)]"
        style={{ animationDelay: `-${LOOP_MS.orb / 2}ms` }}
      />

      {/* Anillo de luz que gira */}
      <span
        aria-hidden="true"
        className="motion-loop absolute -inset-[10%] rounded-full animate-spin bg-[conic-gradient(from_0deg,transparent_0deg,rgba(125,211,252,0.95)_70deg,rgba(37,99,235,0.9)_140deg,transparent_220deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))] [-webkit-mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-2px))]"
        style={{ animationDuration: `${LOOP_MS.orb}ms` }}
      />

      {label ? <span className="sr-only">{label}</span> : null}
    </div>
  );
}
