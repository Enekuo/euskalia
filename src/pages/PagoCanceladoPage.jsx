import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export default function PagoCanceladoPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tr = (k, f = "") => {
    const val = typeof t === "function" ? t(k) : null;
    if (!val || val === k) return f;
    return val;
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* Texto arriba (centrado, fuera de la tarjeta) */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <XCircle className="h-7 w-7 text-red-600" />
            <h1 className="text-3xl font-semibold text-slate-900">
              {tr("paymentCancel.title", "Pago cancelado")}
            </h1>
          </div>

          <p className="mt-2 text-slate-600">
            {tr(
              "paymentCancel.subtitle",
              "No se ha realizado ningún cargo. Puedes volver cuando quieras."
            )}
          </p>
        </div>

        {/* Tarjeta de botones */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
