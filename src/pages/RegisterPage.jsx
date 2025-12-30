// Crear cuenta
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";

export default function RegisterPage() {
  const { t } = useTranslation?.() || { t: () => null };
  const tr = (k, f) => (typeof t === "function" ? t(k) : null) || f;

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

        <Link
          to="/cuenta-pro"
          className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#2563EB] text-white shadow-md hover:bg-blue-700 transition-all active:scale-95"
        >
          Cuenta Pro
        </Link>
      </header>

      {/* Contenido centrado con tarjeta de padding blanco */}
      <main className="relative flex-1 flex items-center justify-center px-4 pb-20">
        {/* Halo suave (mismo efecto que en login) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-[500px] bg-white rounded-[32px] shadow-sm p-12 flex flex-col items-center">
          {/* TÍTULO */}
          <h1 className="text-[32px] font-bold mb-10 text-slate-800 tracking-tight">
            {tr("registerPage_title", "Crea tu cuenta")}
          </h1>

          {/* BOTONES SOCIALES */}
          <div className="w-full space-y-4">
            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors active:bg-slate-100"
            >
              <img
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt="Google"
                className="h-5 w-5"
              />
              {tr("registerPage_google", "Registrarte con Google")}
            </button>

            {/* Microsoft */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors active:bg-slate-100"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft"
                className="h-5 w-5"
              />
              {tr("registerPage_microsoft", "Registrarte con Microsoft")}
            </button>
          </div>

          {/* TEXTOS INFERIORES DENTRO DEL PADDING */}
          <p className="mt-8 text-[12px] text-center text-slate-500 max-w-[300px] leading-relaxed">
            {tr("registerPage_termsPrefix", "Al continuar, aceptas nuestros")}{" "}
            <Link
              to="/terminos"
              className="underline decoration-slate-300 hover:text-slate-800"
            >
              {tr("registerPage_terms", "Términos")}
            </Link>{" "}
            {tr("registerPage_and", "y")}{" "}
            <Link
              to="/privacidad"
              className="underline decoration-slate-300 hover:text-slate-800"
            >
              {tr("registerPage_privacy", "Política de Privacidad")}
            </Link>
            .
          </p>

          <p className="mt-10 text-sm text-slate-600">
            {tr("registerPage_haveAccount", "¿Ya tienes cuenta?")}{" "}
            <Link
              to="/iniciar-sesion"
              className="font-semibold text-blue-600 hover:underline"
            >
              {tr("registerPage_login", "Iniciar sesión")}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
