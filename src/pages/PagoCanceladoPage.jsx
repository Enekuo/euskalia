import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PagoCanceladoPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* ❌ TEXTO ARRIBA (FUERA de la tarjeta) */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <XCircle className="h-7 w-7 text-red-600" />
            <h1 className="text-3xl font-semibold text-slate-900">
              Pago cancelado
            </h1>
          </div>

          <p className="mt-2 text-slate-600">
            No se ha realizado ningún cargo. Puedes volver cuando quieras.
          </p>
        </div>

        {/* TARJETA */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate("/pricing")}>
              Volver a planes
            </Button>

            <Button variant="outline" onClick={() => navigate("/")}>
              Ir al inicio
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
