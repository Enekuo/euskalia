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

      {/* Contenido centrado con tarjeta */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 pb-20">
        {/* Halo suave */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Cuadro reutilizable (mismo que en el modal de Pricing) */}
        <div className="relative w-full flex flex-col items-center">
          <AuthCard variant="page" />

          {/* Botones de test navegación */}
          <div className="mt-6 w-full max-w-md flex flex-col gap-3">
            <Button onClick={() => navigate("/cuenta-pro")}>
              Entrar a Pro
            </Button>

            <Button variant="outline" onClick={() => navigate("/pago-correcto")}>
              Ir a Pago Correcto
            </Button>

            <Button variant="outline" onClick={() => navigate("/pago-cancelado")}>
              Ir a Pago Cancelado
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
