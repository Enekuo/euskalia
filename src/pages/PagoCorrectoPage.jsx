import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import AuthCard from "@/components/Auth/AuthCard";

export default function PagoCorrectoPage() {
  const { t } = useTranslation();
  const tr = (k, f = "") => t(k) || f;

  const navigate = useNavigate();

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            {tr("paymentSuccess.title", "Pago realizado correctamente")}
          </h1>

          <p className="mt-2 text-slate-600">
            {tr(
              "paymentSuccess.subtitle",
              "Ahora entra con tu cuenta de Google para activar tu Pro."
            )}
          </p>

          <div className="mt-6">
            <AuthCard
              variant="page"
              onSuccess={() => {
                // De momento, tras login enviamos a /cuenta-pro (Paso 3 lo hará inteligente)
                navigate("/cuenta-pro");
              }}
            />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {tr(
              "paymentSuccess.note",
              "Importante: entra con el mismo email con el que realizaste el pago."
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
