import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/translations";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function AuthCard({ variant = "page", onSuccess }) {
  const { t } = useTranslation?.() || { t: () => null };
  const tr = (k, f) => (typeof t === "function" ? t(k) : null) || f;

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleGoogle = async () => {
    setErr("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      if (typeof onSuccess === "function") onSuccess();
    } catch (e) {
      setErr(tr("registerPage_error_google", "No se pudo iniciar sesión con Google."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={[
        "relative z-10 w-full max-w-[500px] bg-white rounded-[32px] shadow-sm flex flex-col items-center",
        variant === "modal" ? "p-10" : "p-12",
      ].join(" ")}
    >
      {/* TÍTULO */}
      <h1 className="text-[32px] font-bold mb-10 text-slate-800 tracking-tight">
        {tr("registerPage_title", "Crea tu cuenta")}
      </h1>

      {/* BOTONES SOCIALES */}
      <div className="w-full space-y-4">
        {/* Google (FUNCIONA) */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className={[
            "w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors active:bg-slate-100",
            loading ? "opacity-70 cursor-not-allowed" : "",
          ].join(" ")}
        >
          <img
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            alt="Google"
            className="h-5 w-5"
          />
          {loading
            ? tr("registerPage_google_loading", "Conectando...")
            : tr("registerPage_google", "Registrarte con Google")}
        </button>

        {/* Microsoft (SE VE, PERO NO FUNCIONA) */}
        <button
          type="button"
          disabled
          title={tr("registerPage_microsoft_soon", "Próximamente")}
          className="w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-medium text-slate-700 shadow-sm opacity-60 cursor-not-allowed"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
            className="h-5 w-5"
          />
          {tr("registerPage_microsoft", "Registrarte con Microsoft")}
        </button>

        {err ? (
          <p className="text-[12px] text-center text-red-600">{err}</p>
        ) : null}
      </div>

      {/* TEXTOS INFERIORES */}
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
  );
}
