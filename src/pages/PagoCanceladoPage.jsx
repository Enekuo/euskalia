import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PagoCanceladoPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">
            Pago cancelado
          </h1>

          <p className="mt-2 text-slate-600">
            No se ha realizado ningún cargo. Puedes volver cuando quieras.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
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
