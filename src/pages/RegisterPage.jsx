// Crear cuenta
import React from "react";
import { Link } from "react-router-dom";
import AuthCard from "@/components/Auth/AuthCard";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex flex-col font-sans">
      {/* Barra superior */}
      <header className="px-8 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold text-xl text-slate-800 hover:opacity-80 transition-opacity"
        >
          Euskalia
        </Link>

      </header>

      {/* Contenido centrado con tarjeta */}
      <main className="relative flex-1 flex items-center justify-center px-4 pb-20">
        {/* Halo suave */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Cuadro reutilizable (mismo que en el modal de Pricing) */}
        <AuthCard variant="page" />
      </main>
    </div>
  );
}
