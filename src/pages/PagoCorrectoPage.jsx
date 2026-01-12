import React from "react";
import AuthCard from "@/components/Auth/AuthCard";
import { CheckCircle2 } from "lucide-react";

export default function PagoCorrectoPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* ✅ TEXTO ARRIBA (CENTRADO, FUERA de la tarjeta) */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            <h1 className="text-3xl font-semibold text-slate-900">
              Pago realizado correctamente
            </h1>
          </div>

          <p className="mt-2 text-slate-600">
            Ahora entra con tu cuenta de Google para activar tu acceso Pro.
          </p>
        </div>

        {/* ✅ TARJETA ORIGINAL (mismo tamaño y fondo que antes) */}
        <div className="flex justify-center">
          <AuthCard variant="page" />
        </div>

        {/* ✅ TEXTO ABAJO (CENTRADO, FUERA de la tarjeta) */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Importante: entra con el mismo email con el que realizaste el pago.
        </p>
      </div>
    </main>
  );
}
