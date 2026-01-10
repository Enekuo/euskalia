import React from "react";
import { useTranslation } from "@/lib/translations";

export default function UseAIPage() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Título principal (centrado) */}
      <h1 className="text-3xl font-semibold mb-8 text-center">
        {tr("aiApiUsage.title", "Uso de APIs de Inteligencia Artificial")}
      </h1>

      {/* Intro corta */}
      <section className="mb-8">
        <p className="text-slate-700 leading-relaxed">
          {tr(
            "aiApiUsage.intro",
            "En esta página explicamos cómo utiliza Euskalia las APIs de inteligencia artificial para ofrecer herramientas lingüísticas basadas en IA, qué datos se envían a estos proveedores y qué recomendaciones debes seguir para usar el servicio de forma segura."
          )}
        </p>
      </section>

      {/* 1. Qué APIs de IA utiliza Euskalia */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("aiApiUsage.section1Title", "1. Qué APIs de IA utiliza Euskalia")}
        </h2>

        <p className="text-slate-700 leading-relaxed mb-3">
          {tr(
            "aiApiUsage.section1Body",
            "Para ofrecer sus funcionalidades (por ejemplo, traducción, resumen, corrección, reformulación y otras herramientas lingüísticas), Euskalia se conecta a servicios de inteligencia artificial ofrecidos por proveedores externos especializados. Estos proveedores procesan el contenido enviado y devuelven una respuesta generada automáticamente, que es la que se muestra en pantalla."
          )}
        </p>

        <p className="text-slate-700 leading-relaxed">
          {tr(
            "aiApiUsage.section1Body2",
            "Los modelos y proveedores de IA pueden cambiar con el tiempo (por ejemplo, nuevas versiones o proveedores). Cuando esto ocurra, Euskalia mantendrá esta página actualizada para que conozcas qué tecnología hay detrás del servicio."
          )}
        </p>
      </section>

      {/* 2. Qué datos se envían a las APIs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("aiApiUsage.section2Title", "2. Qué datos se envían a las APIs")}
        </h2>

        <p className="text-slate-700 leading-relaxed mb-3">
          {tr(
            "aiApiUsage.section2Body",
            "Cuando utilizas cualquiera de las herramientas de Euskalia, el contenido que escribes o pegas (texto, fragmentos de documentos o contenidos obtenidos a partir de URLs) puede enviarse a los servidores del proveedor de IA para generar el resultado."
          )}
        </p>

        <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1 mb-3">
          <li>{tr("aiApiUsage.section2Li1", "Texto introducido por la persona usuaria.")}</li>
          <li>
            {tr(
              "aiApiUsage.section2Li2",
              "Parámetros lingüísticos seleccionados (por ejemplo, idioma de origen y destino o el tipo de herramienta utilizada)."
            )}
          </li>
          <li>
            {tr(
              "aiApiUsage.section2Li3",
              "Instrucciones técnicas necesarias para que el modelo genere la respuesta."
            )}
          </li>
        </ul>

        <p className="text-slate-700 leading-relaxed">
          {tr(
            "aiApiUsage.section2Body2",
            "Euskalia no necesita conocer tu identidad real para funcionar. Siempre que sea posible, evita incluir nombres completos, direcciones, datos de salud u otra información personal o sensible en los textos que envíes."
          )}
        </p>
      </section>

      {/* 3. Tratamiento, conservación y seguridad */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "aiApiUsage.section3Title",
            "3. Tratamiento, conservación y seguridad de los datos"
          )}
        </h2>

        <p className="text-slate-700 leading-relaxed mb-3">
          {tr(
            "aiApiUsage.section3Body",
            "Los contenidos enviados a las APIs se utilizan exclusivamente para generar la respuesta solicitada. Euskalia no vende tus textos ni los comparte con terceros con fines comerciales."
          )}
        </p>

        <p className="text-slate-700 leading-relaxed mb-3">
          {tr(
            "aiApiUsage.section3Body2",
            "Los proveedores de IA pueden conservar durante un tiempo limitado ciertos registros técnicos para garantizar la seguridad, prevenir abusos y mejorar la estabilidad del servicio. Cada proveedor define sus plazos de conservación y medidas de seguridad en sus políticas oficiales."
          )}
        </p>

        <p className="text-slate-700 leading-relaxed">
          {tr(
            "aiApiUsage.section3Body3",
            "Euskalia aplica medidas razonables para proteger las comunicaciones con estos proveedores (por ejemplo, usando conexiones cifradas HTTPS) y minimizar la cantidad de datos personales que se envían."
          )}
        </p>
      </section>

      {/* 4. Recomendaciones de uso responsable */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "aiApiUsage.section4Title",
            "4. Recomendaciones de uso responsable"
          )}
        </h2>

        <p className="text-slate-700 leading-relaxed mb-3">
          {tr(
            "aiApiUsage.section4Body",
            "Para usar Euskalia de forma segura y respetuosa con la privacidad, te recomendamos seguir estas pautas:"
          )}
        </p>

        <ul className="list-disc list-inside text-slate-700 leading-relaxed space-y-1">
          <li>
            {tr(
              "aiApiUsage.section4Li1",
              "Evita enviar datos personales identificables (nombres completos, direcciones, teléfonos, etc.) salvo que sea estrictamente necesario."
            )}
          </li>
          <li>
            {tr(
              "aiApiUsage.section4Li2",
              "No incluyas información especialmente sensible (salud, ideología, datos financieros, menores de edad, etc.)."
            )}
          </li>
          <li>
            {tr(
              "aiApiUsage.section4Li3",
              "Revisa siempre el resultado generado por la IA antes de utilizarlo en contextos importantes (trabajo, estudios, comunicaciones oficiales…)."
            )}
          </li>
          <li>
            {tr(
              "aiApiUsage.section4Li4",
              "Utiliza la herramienta respetando la legislación vigente y los derechos de terceros (propiedad intelectual, confidencialidad, etc.)."
            )}
          </li>
        </ul>
      </section>

      {/* 5. Ausencia de decisiones automatizadas */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "aiApiUsage.section5Title",
            "5. Ausencia de decisiones automatizadas"
          )}
        </h2>

        <p className="text-slate-700 leading-relaxed">
          {tr(
            "aiApiUsage.section5Body",
            "Las herramientas de inteligencia artificial de Euskalia no realizan decisiones automatizadas con efectos legales ni elaboran perfiles de las personas usuarias. Los resultados tienen carácter asistencial y la persona usuaria mantiene el control sobre su uso."
          )}
        </p>
      </section>

      {/* 6. Relación con otras políticas */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "aiApiUsage.section6Title",
            "6. Relación con la Política de Privacidad y otros documentos"
          )}
        </h2>

        <p className="text-slate-700 leading-relaxed mb-3">
          {tr(
            "aiApiUsage.section6Body",
            "Esta información sobre el uso de APIs de IA se complementa con la Política de Privacidad, la Política de Cookies, el Aviso Legal y los Términos y Condiciones de Euskalia. En caso de duda, debe interpretarse junto con el resto de documentos legales disponibles en el sitio web."
          )}
        </p>

        <p className="text-slate-700 leading-relaxed">
          {tr(
            "aiApiUsage.section6Body2",
            "Además, cada proveedor de inteligencia artificial cuenta con sus propias políticas de privacidad y términos de servicio, que recomendamos consultar para conocer en detalle cómo tratan la información que procesan."
          )}
        </p>
      </section>

      {/* Línea final con fecha */}
      <p className="mt-10 text-center text-sm italic text-slate-500">
        {tr(
          "aiApiUsage.lastUpdate",
          "Esta información sobre el uso de APIs de IA está actualizada a fecha 2025-11-21."
        )}
      </p>
    </main>
  );
}
