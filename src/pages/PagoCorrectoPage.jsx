import React from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "@/components/Auth/AuthCard";

export default function PagoCorrectoPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">
            Pago realizado correctamente
          </h1>

          <p className="mt-2 text-slate-600">
            Ahora entra con tu cuenta de Google para activar tu acceso Pro.
          </p>

          <div className="mt-6">
            <AuthCard
              variant="page"
              onSuccess={() => {
                navigate("/cuenta-pro");
              }}
            />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Importante: entra con el mismo email con el que realizaste el pago.
          </p>
        </div>
      </div>
    </main>
  );
}
