import React from "react";
import { useTranslation } from "@/lib/translations";

export default function TermsConditionsPage() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Título centrado */}
      <h1 className="text-3xl font-semibold mb-4 text-center">
        {tr("terms_title", "terms_title")}
      </h1>

      {/* 1. Objeto y aceptación */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section1_title", "terms_section1_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section1_p1", "terms_section1_p1")}
        </p>
      </section>

      {/* 2. Identidad del responsable */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section2_title", "terms_section2_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section2_p1", "terms_section2_p1")}
        </p>
      </section>

      {/* 3. Servicios ofrecidos */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section3_title", "terms_section3_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("terms_section3_p1", "terms_section3_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section3_p2", "terms_section3_p2")}
        </p>
      </section>

      {/* 4. Registro de usuarios */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section4_title", "terms_section4_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section4_p1", "terms_section4_p1")}
        </p>
      </section>

      {/* 5. Condiciones económicas y facturación */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section5_title", "terms_section5_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section5_p1", "terms_section5_p1")}
        </p>
      </section>

      {/* 6. Uso permitido y prohibido */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section6_title", "terms_section6_title")}
        </h2>

        <p className="text-slate-700 leading-relaxed mb-3">
          {tr("terms_section6_p1", "terms_section6_p1")}
        </p>

        <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1 mb-4">
          <li>{tr("terms_section6_li1", "terms_section6_li1")}</li>
          <li>{tr("terms_section6_li2", "terms_section6_li2")}</li>
          <li>{tr("terms_section6_li3", "terms_section6_li3")}</li>
        </ul>

        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section6_p2", "terms_section6_p2")}
        </p>
      </section>

      {/* 7. Propiedad intelectual */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section7_title", "terms_section7_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section7_p1", "terms_section7_p1")}
        </p>
      </section>

      {/* 8. Responsabilidad */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section8_title", "terms_section8_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("terms_section8_p1", "terms_section8_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section8_p2", "terms_section8_p2")}
        </p>
      </section>

      {/* 9. Cancelación y desistimiento */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section9_title", "terms_section9_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section9_p1", "terms_section9_p1")}
        </p>
      </section>

      {/* 10. Modificaciones */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section10_title", "terms_section10_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section10_p1", "terms_section10_p1")}
        </p>
      </section>

      {/* 11. Legislación aplicable y jurisdicción */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("terms_section11_title", "terms_section11_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("terms_section11_p1", "terms_section11_p1")}
        </p>
      </section>

      {/* Nota de fecha al final (misma estética, fecha vacía) */}
      <p className="mt-8 text-sm text-slate-500 italic">
        {tr("terms_footer_note", "terms_footer_note")}
      </p>
    </main>
  );
}
