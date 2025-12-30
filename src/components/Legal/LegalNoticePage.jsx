import React from "react";
import { useTranslation } from "@/lib/translations";

export default function LegalNoticePage() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Título */}
      <h1 className="text-3xl font-semibold mb-2 text-center">
        {tr("legal_notice_title", "legal_notice_title")}
      </h1>


      {/* 1. Información general */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section1_title", "legal_notice_section1_title")}
        </h2>

        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section1_p1", "legal_notice_section1_p1")}
        </p>

        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 space-y-1">
          <li>
            {tr(
              "legal_notice_section1_field_name",
              "legal_notice_section1_field_name"
            )}
          </li>
          <li>
            {tr(
              "legal_notice_section1_field_domain",
              "legal_notice_section1_field_domain"
            )}
          </li>
          <li>
            {tr(
              "legal_notice_section1_field_email",
              "legal_notice_section1_field_email"
            )}
          </li>
          <li>
            {tr(
              "legal_notice_section1_field_activity",
              "legal_notice_section1_field_activity"
            )}
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section1_p2", "legal_notice_section1_p2")}
        </p>
      </section>

      {/* 2. Objeto */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section2_title", "legal_notice_section2_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section2_p1", "legal_notice_section2_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section2_p2", "legal_notice_section2_p2")}
        </p>
      </section>

      {/* 3. Condiciones de uso */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section3_title", "legal_notice_section3_title")}
        </h2>

        <p className="text-slate-700 leading-relaxed mb-3">
          {tr("legal_notice_section3_p1", "legal_notice_section3_p1")}
        </p>

        <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1 mb-4">
          <li>{tr("legal_notice_section3_li1", "legal_notice_section3_li1")}</li>
          <li>{tr("legal_notice_section3_li2", "legal_notice_section3_li2")}</li>
          <li>{tr("legal_notice_section3_li3", "legal_notice_section3_li3")}</li>
          <li>{tr("legal_notice_section3_li4", "legal_notice_section3_li4")}</li>
        </ul>

        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section3_p2", "legal_notice_section3_p2")}
        </p>
      </section>

      {/* 4. Propiedad intelectual e industrial */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section4_title", "legal_notice_section4_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section4_p1", "legal_notice_section4_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section4_p2", "legal_notice_section4_p2")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section4_p3", "legal_notice_section4_p3")}
        </p>
      </section>

      {/* 5. Responsabilidad */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section5_title", "legal_notice_section5_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section5_p1", "legal_notice_section5_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section5_p2", "legal_notice_section5_p2")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section5_p3", "legal_notice_section5_p3")}
        </p>
      </section>

      {/* 6. Política de enlaces */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section6_title", "legal_notice_section6_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section6_p1", "legal_notice_section6_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section6_p2", "legal_notice_section6_p2")}
        </p>
      </section>

      {/* 7. Protección de datos personales */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section7_title", "legal_notice_section7_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section7_p1", "legal_notice_section7_p1")}
        </p>
      </section>

      {/* 8. Uso de cookies */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section8_title", "legal_notice_section8_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section8_p1", "legal_notice_section8_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section8_p2", "legal_notice_section8_p2")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section8_p3", "legal_notice_section8_p3")}
        </p>
      </section>

      {/* 9. Legislación aplicable y jurisdicción */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section9_title", "legal_notice_section9_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          {tr("legal_notice_section9_p1", "legal_notice_section9_p1")}
        </p>
        <p className="text-slate-700 leading-relaxed">
          {tr("legal_notice_section9_p2", "legal_notice_section9_p2")}
        </p>
      </section>

      {/* 10. Contacto */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("legal_notice_section10_title", "legal_notice_section10_title")}
        </h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          {tr("legal_notice_section10_p1", "legal_notice_section10_p1")}
        </p>
        <div className="text-slate-700 leading-relaxed space-y-1">
          <p>
            {tr(
              "legal_notice_section10_contact_email",
              "legal_notice_section10_contact_email"
            )}
          </p>
          <p>
            {tr(
              "legal_notice_section10_contact_address",
              "legal_notice_section10_contact_address"
            )}
          </p>
        </div>
      </section>

      {/* Nota de fecha al final (misma estética que la de privacidad / Olondo) */}
      <p className="mt-8 text-sm text-slate-500 italic">
        {tr(
          "legal_notice_footer_note",
          "legal_notice_footer_note"
        )}
      </p>
    </main>
  );
}
