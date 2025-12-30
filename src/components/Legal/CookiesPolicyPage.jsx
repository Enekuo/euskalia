import React from "react";
import { useTranslation } from "@/lib/translations";

export default function CookiesPolicyPage() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Título centrado */}
      <h1 className="text-3xl font-semibold mb-2 text-center">
        {tr("cookies_title", "cookies_title")}
      </h1>

      {/* 1. ¿Qué son las cookies? */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("cookies_section1_title", "cookies_section1_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("cookies_section1_p1", "cookies_section1_p1")}
        </p>
      </section>

      {/* 2. Tipos de cookies utilizadas por Euskalia */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("cookies_section2_title", "cookies_section2_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("cookies_section2_p1", "cookies_section2_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("cookies_section2_p2", "cookies_section2_p2")}
        </p>
      </section>

      {/* 3. Finalidad de las cookies */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("cookies_section3_title", "cookies_section3_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("cookies_section3_p1", "cookies_section3_p1")}
        </p>
      </section>

      {/* 4. Cómo gestionar las cookies */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("cookies_section4_title", "cookies_section4_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("cookies_section4_p1", "cookies_section4_p1")}
        </p>
      </section>

      {/* 5. Actualizaciones de la Política de Cookies */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("cookies_section5_title", "cookies_section5_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("cookies_section5_p1", "cookies_section5_p1")}
        </p>
      </section>

      {/* Fecha al final, estilo como el ejemplo */}
      <p className="mt-10 text-sm italic text-slate-500">
        {tr("cookies_last_update", "cookies_last_update")}
      </p>
    </main>
  );
}
