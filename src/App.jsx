import React from 'react';
import { useEffect } from "react";
import { pageview } from "@/lib/analytics";
import { Helmet } from 'react-helmet';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import SupportPage from '@/pages/SupportPage';
import AssistantPage from "@/pages/AssistantPage";
import LegalNoticePage from "@/components/Legal/LegalNoticePage";
import PrivacyPolicyPage from "@/components/Legal/PrivacyPolicyPage";
import TermsConditionsPage from "@/components/Legal/TermsConditionsPage";
import CookiesPolicyPage from "@/components/Legal/CookiesPolicyPage";
import UseAIPage from "@/components/Legal/UseAIPage";
import Suggestions from "@/pages/Suggestions";
import CookieBanner from "@/components/CookieBanner";
import TraductorSeoRedirect from "./TraductorSeoRedirect";
import InformationPage from "@/pages/InformationPage";
//Herramientas Public
import Translator from '@/components/Translator';
import Resumen from "@/components/Resumen";
import CorrectorGramatical from "@/components/CorrectorGramatical";
import Parafraseador from "@/components/Parafraseador";
import TextCreator from "@/components/TextCreator";
import EmailCreator from "@/components/EmailCreator";




function App() {
  const location = useLocation();

  useEffect(() => {
  pageview(location.pathname);
}, [location]);

  const showHeader = true;

const path = location.pathname || "/";

const seoMap = {
  "/": {
    title: "Traductor de euskera online y gratis | Euskalia",
    desc: "Traductor de euskera con IA para traducir textos online de forma rápida, natural y precisa.",
  },

  "/resumen": {
    title: "Resumidor de textos en euskera con IA | Euskalia",
    desc: "Resume textos largos en euskera automáticamente con inteligencia artificial de forma clara y rápida.",
  },

  "/corrector": {
    title: "Corrector ortográfico y gramatical en euskera | Euskalia",
    desc: "Corrige textos en euskera con inteligencia artificial. Mejora ortografía, gramática y claridad automáticamente.",
  },

  "/parafraseador": {
    title: "Parafraseador de textos en euskera | Euskalia",
    desc: "Reescribe textos en euskera con IA manteniendo el significado original de forma natural.",
  },

  "/creador-texto": {
    title: "Generador de textos con IA en euskera | Euskalia",
    desc: "Crea textos automáticamente en euskera con inteligencia artificial para estudios, trabajo o contenido.",
  },

  "/creador-email": {
    title: "Generador de emails con IA en euskera | Euskalia",
    desc: "Genera emails profesionales en euskera automáticamente con inteligencia artificial.",
  },

  "/chat-ia": {
    title: "Asistente de IA especializado en euskera | Euskalia",
    desc: "Asistente de inteligencia artificial especializado en euskera para ayudarte con textos, dudas y contenido.",
  },
};

const seo = seoMap[path] || {
  title: "Euskalia",
  desc: "Herramientas de inteligencia artificial especializadas en euskera.",
  };
  const faqSchema = [
  ["¿Qué es Euskalia?", "Euskalia es una plataforma de inteligencia artificial especializada en euskera."],

  ["¿Qué idiomas soporta Euskalia?", "Euskalia trabaja principalmente con euskera y otros idiomas."],

  ["¿Euskalia es gratis?", "Sí. Euskalia es totalmente gratuito."],

  ["¿Cómo funciona el traductor de Euskalia?", "El traductor utiliza inteligencia artificial para traducir textos al euskera y desde euskera de forma rápida y natural."],

  ["¿Cómo funciona el resumidor?", "El resumidor de Euskalia crea resúmenes automáticos de textos largos utilizando inteligencia artificial."],

  ["¿Qué hace el corrector de Euskalia?", "El corrector mejora ortografía, gramática y claridad automáticamente en textos en euskera."],

  ["¿Para qué sirve el parafraseador?", "El parafraseador reescribe textos manteniendo el significado original de forma natural."],

  ["¿Qué hace el generador de textos?", "El generador de textos crea contenido automáticamente con inteligencia artificial en euskera."],

  ["¿Qué hace el generador de emails?", "El generador de emails crea correos profesionales automáticamente con inteligencia artificial."],

  ["¿Qué es el asistente IA de Euskalia?", "Es un asistente especializado en euskera y textos que ayuda a traducir, corregir, resumir y crear contenido."]
];


return ( 
    <>
<Helmet>
  <title>{seo.title}</title>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Euskalia",
        alternateName: "Euskalia",
        url: "https://euskaliaweb.com",
      },

      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Euskalia",
        url: "https://euskaliaweb.com",
        logo: "https://euskaliaweb.com/og-image.png",
      },

      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Euskalia",
        url: "https://euskaliaweb.com",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        description:
          "Euskalia es una plataforma de inteligencia artificial especializada en euskera para traducir, resumir, corregir, parafrasear y crear textos.",
      },

      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSchema.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a,
          },
        })),
      },
    ]),
  }}
/>



  <meta name="description" content={seo.desc} />
  
  <link
    rel="canonical"
    href={`https://euskaliaweb.com${path}`}
  />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Euskalia" />
<meta property="og:title" content={seo.title} />
<meta property="og:description" content={seo.desc} />
<meta property="og:url" content={`https://euskaliaweb.com${path}`} />
<meta property="og:image" content="https://euskaliaweb.com/og-image.png" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={seo.title} />
<meta name="twitter:description" content={seo.desc} />
<meta name="twitter:image" content="https://euskaliaweb.com/og-image.png" />

  
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
  <link rel="icon" href="/favicon.ico" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Quicksand:wght@700&display=swap"
    rel="stylesheet"
  />
</Helmet>




 

      <div className="bg-white text-slate-900"> 
        {showHeader && <Header />}

        <main>
          <Routes>
            <Route path="/" element={<Translator />} />
            <Route path="/soporte" element={<SupportPage />} />
            <Route path="/chat-ia" element={<AssistantPage />} />
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/corrector" element={<CorrectorGramatical />} />
            <Route path="/aviso-legal" element={<LegalNoticePage />} />
            <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
            <Route path="/terminos-condiciones" element={<TermsConditionsPage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />
            <Route path="/uso-de-ia" element={<UseAIPage />} />
            <Route path="/sugerencias" element={<Suggestions />} />
            <Route path="/traductor" element={<TraductorSeoRedirect />} />
            <Route path="/parafraseador" element={<Parafraseador />} />
            <Route path="/creador-texto" element={<TextCreator />} />
            <Route path="/creador-email" element={<EmailCreator />} />
            <Route path="/informacion" element={<InformationPage />} />
          </Routes>
        </main>

        <CookieBanner />

        <Toaster />
      </div>
    </>
  );
}

export default App;
