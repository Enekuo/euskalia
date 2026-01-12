// Crear cuenta
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "@/components/Auth/AuthCard";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex flex-col font-sans">
      {/* Barra superior */}
      <header className="px-8 py-6 flex items-center justify-between">
        <Link
          to="/"
          tabIndex={-1}
          className="font-bold text-xl text-slate-800 hover:opacity-80 transition-opacity"
        >
          Euskalia
        </Link>
      </header>

      {/* Contenido */}
      <main className="relative flex-1 flex items-center justify-center px-4 pb-20">
        {/* Halo suave */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Layout: tarjeta izquierda + botones derecha */}
        <div className="relative w-full max-w-6xl flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">
          {/* Izquierda: AuthCard */}
          <div className="w-full max-w-xl flex justify-center">
            <AuthCard variant="page" />
          </div>

          {/* Derecha: botones (más estrechos) */}
          <div className="w-full max-w-[360px] flex justify-center lg:justify-start">
            <div className="w-full flex flex-col gap-3">
              <Button className="w-full" onClick={() => navigate("/cuenta-pro")}>
                Entrar a Pro
              </Button>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate("/pago-correcto")}
              >
                Ir a Pago Correcto
              </Button>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate("/pago-cancelado")}
              >
                Ir a Pago Cancelado
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
