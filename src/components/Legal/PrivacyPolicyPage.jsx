import React from "react";
import { useTranslation } from "@/lib/translations";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Título principal */}
      <h1 className="text-3xl font-semibold mb-8 text-center">
        {tr("privacyPolicy.title", "Política de privacidad")}
      </h1>

      {/* Intro general */}
      <section className="mb-6">
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.intro",
            "Esta Política de Privacidad explica cómo se tratan los datos personales en Euskalia y qué derechos tienen las personas usuarias."
          )}
        </p>
      </section>

      {/* 1. Ámbito de aplicación */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.section1Title", "1. Ámbito de aplicación")}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section1Body",
            "Euskalia se compromete a respetar la privacidad de quienes visitan y utilizan su web. Esta Política de Privacidad informa sobre el tratamiento de los datos personales recogidos a través del sitio y de los servicios ofrecidos. El uso del sitio implica la aceptación de esta Política y del tratamiento de los datos conforme a la normativa vigente."
          )}
        </p>
      </section>

      {/* 2. Responsable del tratamiento */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section2Title",
            "2. Responsable del tratamiento de los datos"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          {tr(
            "privacyPolicy.section2Body",
            "Los datos personales facilitados a través de Euskalia se integran en un tratamiento gestionado por el titular del proyecto."
          )}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {tr(
            "privacyPolicy.section2Details",
            "Titular del sitio: [__________]\nNombre comercial: Euskalia\nActividad: Servicios digitales de traducción y resumen de textos con apoyo de inteligencia artificial.\nCorreo electrónico de contacto: [__________]\nDominio web: https://euskalia.ai"
          )}
        </p>
      </section>

      {/* 3. Finalidades del tratamiento */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.section3Title", "3. Finalidades del tratamiento")}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section3Body",
            "Los datos podrán utilizarse para: facilitar información sobre el uso de la plataforma, responder consultas o solicitudes de soporte, enviar comunicaciones informativas o novedades (si se ha dado el consentimiento) y mejorar la experiencia de uso a través de análisis estadísticos agregados. La persona usuaria puede darse de baja de las comunicaciones en cualquier momento a través de los enlaces de cancelación o escribiendo al correo de contacto indicado."
          )}
        </p>
      </section>

      {/* 4. Sobre esta Política de Privacidad */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section4Title",
            "4. Sobre esta Política de Privacidad"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section4Body",
            "Euskalia mantiene un compromiso firme con la protección de los datos personales de sus usuarios. Esta Política busca ser clara y sencilla, para que cada persona pueda decidir de forma informada qué información facilita y con qué finalidad se utilizará."
          )}
        </p>
      </section>

      {/* 5. Confidencialidad y seguridad */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section5Title",
            "5. Confidencialidad y seguridad"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section5Body",
            "Los datos personales se tratarán de forma confidencial y se aplicarán medidas técnicas y organizativas razonables para evitar accesos no autorizados, pérdidas o alteraciones. No obstante, ningún sistema es completamente infalible y no se puede garantizar una seguridad absoluta frente a incidentes externos."
          )}
        </p>
      </section>

      {/* 6. Derechos de las personas usuarias */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section6Title",
            "6. Derechos de las personas usuarias"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section6Body",
            "De acuerdo con la normativa aplicable, las personas usuarias pueden ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos. Para ello, pueden dirigirse al correo de contacto indicado, señalando de forma clara el derecho que desean ejercer. Si lo consideran necesario, también pueden presentar una reclamación ante la autoridad de control competente."
          )}
        </p>
      </section>

      {/* 7. Envíos comerciales y spam */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section7Title",
            "7. Envíos comerciales y comunicaciones"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section7Body",
            "Euskalia no realiza prácticas de envío masivo de correos electrónicos no solicitados (spam). Cualquier comunicación informativa o promocional se enviará únicamente cuando exista una base legítima o se haya obtenido el consentimiento previo, e incluirá siempre un mecanismo claro para cancelar la suscripción."
          )}
        </p>
      </section>

      {/* 8. Publicidad */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.section8Title", "8. Publicidad")}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section8Body",
            "En la versión gratuita de Euskalia podrían mostrarse anuncios. En ningún caso se cederán datos personales a terceros con fines publicitarios sin una base legal adecuada o sin el consentimiento expreso de la persona usuaria."
          )}
        </p>
      </section>

      {/* 9. Comentarios de terceros */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section9Title",
            "9. Comentarios y opiniones de terceros"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section9Body",
            "Euskalia no se hace responsable de las opiniones, valoraciones o comentarios que terceras personas puedan publicar sobre el servicio en redes sociales, plataformas externas o sitios web ajenos al control del proyecto."
          )}
        </p>
      </section>

      {/* 10. Modificaciones de la Política */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section10Title",
            "10. Modificaciones de la Política"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section10Body",
            "Euskalia se reserva el derecho de modificar esta Política de Privacidad para adaptarla a cambios legislativos, criterios de las autoridades de control o mejoras técnicas del servicio. La versión vigente estará siempre disponible en el sitio web y, en caso de cambios relevantes, se informará a las personas usuarias y se recabará de nuevo el consentimiento cuando sea necesario."
          )}
        </p>
      </section>

      {/* Nota final con la fecha (abajo del todo) */}
      <p className="text-sm text-gray-500 italic">
        {tr(
          "privacyPolicy.footerNote",
          "Esta Política de Privacidad está actualizada a fecha 27 de julio de 2025."
        )}
      </p>
    </main>
  );
}
