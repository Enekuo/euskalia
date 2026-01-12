import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";

export default function PagoCanceladoPage() {
  const { t } = useTranslation();
  const tr = (k, f = "") => t(k) || f;

  const navigate = useNavigate();

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            {tr("paymentCancel.title", "Pago cancelado")}
          </h1>

          <p className="mt-2 text-slate-600">
            {tr(
              "paymentCancel.subtitle",
              "No se ha realizado ningún cargo. Puedes volver cuando quieras."
            )}
          </p>

          <div className="mt-6 flex gap-3">
            <Button onClick={() => navigate("/pricing")}>
              {tr("paymentCancel.backPricing", "Volver a planes")}
            </Button>

            <Button variant="outline" onClick={() => navigate("/")}>
              {tr("paymentCancel.backHome", "Ir al inicio")}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
