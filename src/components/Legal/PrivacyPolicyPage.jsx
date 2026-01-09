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
            "Titular del sitio: Euskalia (proyecto digital independiente)\nNombre comercial: Euskalia\nActividad: Servicios digitales de traducción, resumen y asistencia lingüística basados en inteligencia artificial.\nCorreo electrónico de contacto: euskaliaweb@gmail.com\nDominio web: https://euskaliaweb.com"
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
            "Los datos podrán utilizarse para: facilitar el uso de la plataforma, responder consultas o solicitudes de soporte, enviar comunicaciones informativas o novedades (si se ha dado el consentimiento) y mejorar la experiencia de uso mediante análisis estadísticos agregados. La persona usuaria puede darse de baja de estas comunicaciones en cualquier momento a través de los enlaces de cancelación o escribiendo al correo de contacto indicado."
          )}
        </p>
      </section>

      {/* 4. Base legal del tratamiento */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.legalBasisTitle", "4. Base legal del tratamiento")}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {tr(
            "privacyPolicy.legalBasisBody",
            "El tratamiento de los datos personales se realiza conforme a las siguientes bases legales:\n\n- Consentimiento: cuando el usuario lo otorga, por ejemplo para comunicaciones o cookies no esenciales.\n- Ejecución del servicio: para prestar las funcionalidades solicitadas dentro de la plataforma.\n- Interés legítimo: para seguridad, prevención de abuso y mejora del servicio.\n- Cumplimiento de obligaciones legales: cuando sea aplicable."
          )}
        </p>
      </section>

      {/* 5. Datos tratados */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.dataTitle", "5. Datos tratados")}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {tr(
            "privacyPolicy.dataBody",
            "Euskalia puede tratar las siguientes categorías de datos:\n\n- Datos de contacto: correo electrónico (si el usuario contacta o se registra).\n- Datos técnicos: dirección IP, navegador, dispositivo, identificadores de sesión y eventos de uso.\n- Contenidos aportados por el usuario: texto/documentos/enlaces que se introduzcan para su procesamiento.\n\nSe recomienda no introducir información sensible. Euskalia no solicita intencionalmente categorías especiales de datos."
          )}
        </p>
      </section>

      {/* 6. Conservación */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.retentionTitle", "6. Conservación de los datos")}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {tr(
            "privacyPolicy.retentionBody",
            "Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos y para atender posibles responsabilidades legales.\n\nComo regla general:\n- Consultas/soporte: el tiempo imprescindible para resolver la solicitud.\n- Comunicaciones: hasta que el usuario solicite la baja.\n- Datos técnicos y de medición: según plazos razonables o los definidos por las herramientas utilizadas.\n\nPosteriormente, los datos se eliminarán o anonimizarán cuando sea posible."
          )}
        </p>
      </section>

      {/* 7. Destinatarios y terceros */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.recipientsTitle", "7. Destinatarios y terceros")}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {tr(
            "privacyPolicy.recipientsBody",
            "Euskalia puede apoyarse en proveedores tecnológicos (por ejemplo, alojamiento, analítica o servicios publicitarios) que pueden tratar datos en nombre del responsable como encargados del tratamiento.\n\nEn la versión gratuita pueden mostrarse anuncios y, cuando sea necesario, su uso se gestionará mediante el sistema de consentimiento correspondiente.\n\nEuskalia no vende datos personales."
          )}
        </p>
      </section>

      {/* 8. Transferencias internacionales */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.intlTransfersTitle",
            "8. Transferencias internacionales"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.intlTransfersBody",
            "Algunos proveedores pueden estar ubicados fuera del Espacio Económico Europeo. En esos casos, se aplicarán garantías adecuadas conforme a la normativa, como cláusulas contractuales tipo u otros mecanismos legalmente reconocidos."
          )}
        </p>
      </section>

      {/* 9. Confidencialidad y seguridad */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.section5Title", "9. Confidencialidad y seguridad")}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section5Body",
            "Los datos personales se tratarán de forma confidencial y se aplicarán medidas técnicas y organizativas razonables para evitar accesos no autorizados, pérdidas o alteraciones. No obstante, ningún sistema es completamente infalible y no se puede garantizar una seguridad absoluta frente a incidentes externos."
          )}
        </p>
      </section>

      {/* 10. Derechos de las personas usuarias */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section6Title",
            "10. Derechos de las personas usuarias"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section6Body",
            "De acuerdo con la normativa aplicable, las personas usuarias pueden ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos. Para ello, pueden dirigirse al correo de contacto indicado, señalando de forma clara el derecho que desean ejercer. En caso necesario, también podrán presentar una reclamación ante la autoridad de control competente."
          )}
        </p>
      </section>

      {/* 11. Envíos comerciales y spam */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section7Title",
            "11. Envíos comerciales y comunicaciones"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section7Body",
            "Euskalia no realiza prácticas de envío masivo de correos electrónicos no solicitados (spam). Cualquier comunicación informativa o promocional se enviará únicamente cuando exista una base legítima o se haya obtenido el consentimiento previo, e incluirá siempre un mecanismo claro para cancelar la suscripción."
          )}
        </p>
      </section>

      {/* 12. Publicidad */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr("privacyPolicy.section8Title", "12. Publicidad")}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section8Body",
            "En la versión gratuita de Euskalia podrían mostrarse anuncios. El uso de cookies o tecnologías similares con fines publicitarios se gestionará conforme al sistema de consentimiento y a la Política de Cookies, cuando corresponda."
          )}
        </p>
      </section>

      {/* 13. Comentarios de terceros */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section9Title",
            "13. Comentarios y opiniones de terceros"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section9Body",
            "Euskalia no se hace responsable de las opiniones, valoraciones o comentarios que terceras personas puedan publicar sobre el servicio en redes sociales, plataformas externas o sitios web ajenos al control del proyecto."
          )}
        </p>
      </section>

      {/* 14. Sobre esta Política de Privacidad */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section4Title",
            "14. Sobre esta Política de Privacidad"
          )}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {tr(
            "privacyPolicy.section4Body",
            "Euskalia mantiene un compromiso firme con la protección de los datos personales de sus usuarios. Esta Política busca ser clara y sencilla, para que cada persona pueda decidir de forma informada qué información facilita y con qué finalidad se utilizará."
          )}
        </p>
      </section>

      {/* 15. Modificaciones de la Política */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {tr(
            "privacyPolicy.section10Title",
            "15. Modificaciones de la Política"
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
          "Esta Política de Privacidad está actualizada a fecha 2025-11-21."
        )}
      </p>
    </main>
  );
}
