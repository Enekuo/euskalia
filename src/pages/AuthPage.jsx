// Iniciar sesion
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";

export default function AuthPage() {
  const { t } = useTranslation?.() || { t: () => null };
  const tr = (k, f) => (typeof t === "function" ? t(k) : null) || f;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 flex flex-col">
      <header
        style={{
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#0f172a",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}
          className="hover:opacity-80 transition-opacity"
        >
          Euskalia
        </Link>

        <Link
          to="/cuenta-pro"
          style={{
            fontSize: "14px",
            fontWeight: "600",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "8px 16px",
            borderRadius: "9999px",
            textDecoration: "none",
          }}
        >
          Cuenta Pro
        </Link>
      </header>

      {/* Fondo con halo suave + tarjeta */}
      <main className="relative flex-1 flex items-center justify-center px-4 pb-16">
        {/* Halo DETRÁS */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Tarjeta ENCIMA + blanco puro */}
        <div className="relative z-10 w-full max-w-[500px] bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] px-6 pt-6 pb-12 flex flex-col items-center">
          <h1 className="text-3xl font-semibold tracking-tight mb-6 text-center">
            {tr("authPage.welcome", "ONGI ETORRI")}
          </h1>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3 text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.2H272v95h147.1c-6.3 34-25.1 62.7-53.5 81.8v67h86.6c50.7-46.7 81.3-115.6 81.3-193.6z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.9 0 134.2-24.1 178.9-65.2l-86.6-67c-24.1 16.2-55 25.8-92.3 25.8-70.9 0-131-47.9-152.6-112.1H31.5v70.4C76 485.2 167.1 544.3 272 544.3z"
              />
              <path
                fill="#FBBC04"
                d="M119.4 325.8c-10.3-30.9-10.3-64.4 0-95.3V160H31.5c-42.7 85.5-42.7 188.5 0 274l87.9-67.2z"
              />
              <path
                fill="#EA4335"
                d="M272 106.5c39.7-.6 77.8 14 106.9 41.3l80.1-80.1C406.3 25.2 344.9 0 272 0 167.1 0 76 59.1 31.5 160l87.9 70.5C141 154.4 201.1 106.5 272 106.5z"
              />
            </svg>
            <span>
              {tr("authPage.continueWithGoogle", "Jarraitu Google-rekin")}
            </span>
          </button>

          {/* Microsoft */}
          <button
            type="button"
            className="mt-3 w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3 text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 23 23"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="1" y="1" width="9" height="9" fill="#F25022" />
              <rect x="13" y="1" width="9" height="9" fill="#7FBA00" />
              <rect x="1" y="13" width="9" height="9" fill="#00A4EF" />
              <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
            </svg>
            <span>
              {tr("authPage.continueWithMicrosoft", "Jarraitu Microsoft-ekin")}
            </span>
          </button>

          <p className="mt-10 text-sm text-slate-600">
            {tr("authPage.noAccount", "Ez duzu konturik?")}{" "}
            <Link
              to="/crear-cuenta"
              className="font-medium text-indigo-600 hover:underline"
            >
              {tr("authPage.signUp", "Erregistratu")}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
