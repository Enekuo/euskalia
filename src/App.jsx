import React from 'react';
import { useEffect } from "react";
import { pageview } from "@/lib/analytics";
import { Helmet } from 'react-helmet';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import AuthPage from '@/pages/AuthPage';
import RegisterPage from "@/pages/RegisterPage";
import SupportPage from '@/pages/SupportPage';
import AssistantPage from "@/pages/AssistantPage";
import LegalNoticePage from "@/components/Legal/LegalNoticePage";
import PrivacyPolicyPage from "@/components/Legal/PrivacyPolicyPage";
import TermsConditionsPage from "@/components/Legal/TermsConditionsPage";
import CookiesPolicyPage from "@/components/Legal/CookiesPolicyPage";
import UseAIPage from "@/components/Legal/UseAIPage";
import PricingPage from "@/pages/PricingPage";
import Suggestions from "@/pages/Suggestions";
import CookieBanner from "@/components/CookieBanner";
import PagoCorrectoPage from "@/pages/PagoCorrectoPage";
import PagoCanceladoPage from "@/pages/PagoCanceladoPage";
import TraductorSeoRedirect from "./TraductorSeoRedirect";
//Herramientas Public
import Translator from '@/components/Translator';
import Resumen from "@/components/Resumen";
import CorrectorGramatical from "@/components/CorrectorGramatical";
import Parafraseador from "@/components/Parafraseador";
import TextCreator from "@/components/TextCreator";
import EmailCreator from "@/components/EmailCreator";



// Pro-Account //
import ProLayout from "@/components/ProAccount/ProLayout";
import ProHome from "@/components/ProAccount/ProHome";
import ProTranslator from "@/components/ProAccount/ProTranslator";
import ProSummary from "@/components/ProAccount/ProSummary";
import ProGrammarCorrector from "@/components/ProAccount/ProGrammarCorrector";
import ProLibrary from "@/components/ProAccount/ProLibrary";
import ProChat from "@/components/ProAccount/ProChat";
import ProHelp from "@/components/ProAccount/ProHelp";
import ProSettings from "@/components/ProAccount/ProSettings";
import ProLibraryDetail from "@/components/ProAccount/ProLibraryDetail";
import ProParaphraser from "@/components/ProAccount/ProParaphraser";
import ProAiDetector from "@/components/ProAccount/ProAiDetector"; 
import ProHumanizer from "@/components/ProAccount/ProHumanizer";



// Premium-Account //
import PremiumLayout from "@/components/PremiumAccount/PremiumLayout";
import PremiumHome from "@/components/PremiumAccount/PremiumHome";
import PremiumTranslator from "@/components/PremiumAccount/PremiumTranslator";
import PremiumSummary from "@/components/PremiumAccount/PremiumSummary";
import PremiumGrammarCorrector from "@/components/PremiumAccount/PremiumGrammarCorrector";
import PremiumParaphraser from "@/components/PremiumAccount/PremiumParaphraser";
import PremiumAiDetector from "@/components/PremiumAccount/PremiumAiDetector";
import PremiumHumanizer from "@/components/PremiumAccount/PremiumHumanizer";
import PremiumSettings from "@/components/PremiumAccount/PremiumSettings";
import PremiumAiAssistant from "@/components/PremiumAccount/PremiumAiAssistant";
import PremiumLibrary from "@/components/PremiumAccount/PremiumLibrary";
import PremiumLibraryDetail from "@/components/PremiumAccount/PremiumLibraryDetail";
import PremiumTextCreator from "@/components/PremiumAccount/PremiumTextCreator";
import PremiumEmailCreator from "@/components/PremiumAccount/PremiumEmailCreator";
import PremiumAudioCreator from "@/components/PremiumAccount/PremiumAudioCreator";




function App() {
  const location = useLocation();

  useEffect(() => {
  pageview(location.pathname);
}, [location]);

  const isProRoute =
  location.pathname.startsWith("/cuenta-pro") ||
  location.pathname.startsWith("/cuenta-premium");

  const showHeader =
    !isProRoute &&
    location.pathname !== "/iniciar-sesion" &&
    location.pathname !== "/crear-cuenta";

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
            <Route path="/iniciar-sesion" element={<AuthPage />} />
            <Route path="/crear-cuenta" element={<RegisterPage />} />
            <Route path="/soporte" element={<SupportPage />} />
            <Route path="/chat-ia" element={<AssistantPage />} />
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/corrector" element={<CorrectorGramatical />} />
            <Route path="/aviso-legal" element={<LegalNoticePage />} />
            <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
            <Route path="/terminos-condiciones" element={<TermsConditionsPage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />
            <Route path="/uso-de-ia" element={<UseAIPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/sugerencias" element={<Suggestions />} />
            <Route path="/pago-correcto" element={<PagoCorrectoPage />} />
            <Route path="/pago-cancelado" element={<PagoCanceladoPage />} />
            <Route path="/traductor" element={<TraductorSeoRedirect />} />
            <Route path="/parafraseador" element={<Parafraseador />} />
            <Route path="/creador-texto" element={<TextCreator />} />
            <Route path="/creador-email" element={<EmailCreator />} />



            {/* Pro-Account */}
            <Route path="/cuenta-pro" element={<ProLayout><ProHome /></ProLayout>} />
            <Route path="/cuenta-pro/traductor" element={<ProLayout><ProTranslator /></ProLayout>} />
            <Route path="/cuenta-pro/resumen" element={<ProLayout><ProSummary /></ProLayout>} />
            <Route path="/cuenta-pro/corrector" element={<ProLayout><ProGrammarCorrector /></ProLayout>} />
            <Route path="/cuenta-pro/biblioteca" element={<ProLayout><ProLibrary /></ProLayout>} />
            <Route path="/cuenta-pro/chat-ia" element={<ProLayout><ProChat /></ProLayout>} />
            <Route path="/cuenta-pro/sugerencias" element={<ProLayout><Suggestions /></ProLayout>} />
            <Route path="/cuenta-pro/ayuda" element={<ProLayout><ProHelp /></ProLayout>} />
            <Route path="/cuenta-pro/ajustes" element={<ProLayout><ProSettings /></ProLayout>} />
            <Route path="/cuenta-pro/biblioteca/:id" element={<ProLibraryDetail />} />
            <Route path="/cuenta-pro/parafraseador" element={<ProLayout><ProParaphraser /></ProLayout>} />
            <Route path="/cuenta-pro/detector-ia" element={<ProLayout><ProAiDetector /></ProLayout>} />
            <Route path="/cuenta-pro/humanizador" element={<ProLayout><ProHumanizer /></ProLayout>} />
            <Route path="/cuenta-pro/soporte" element={<ProLayout><SupportPage /></ProLayout>} />
         

            {/* Premium-Account */}
            <Route path="/cuenta-premium" element={<PremiumLayout><PremiumHome /></PremiumLayout>} />
            <Route path="/cuenta-premium/traductor" element={<PremiumLayout><PremiumTranslator /></PremiumLayout>} />
            <Route path="/cuenta-premium/resumen" element={<PremiumLayout><PremiumSummary /></PremiumLayout>} />
            <Route path="/cuenta-premium/corrector" element={<PremiumLayout><PremiumGrammarCorrector /></PremiumLayout>} />
            <Route path="/cuenta-premium/parafraseador" element={<PremiumLayout><PremiumParaphraser /></PremiumLayout>} />
            <Route path="/cuenta-premium/detector-ia" element={<PremiumLayout><PremiumAiDetector /></PremiumLayout>} />
            <Route path="/cuenta-premium/humanizador" element={<PremiumLayout><PremiumHumanizer /></PremiumLayout>} />
            <Route path="/cuenta-premium/soporte" element={<PremiumLayout><SupportPage /></PremiumLayout>} />
            <Route path="/cuenta-premium/sugerencias" element={<PremiumLayout><Suggestions /></PremiumLayout>} />
            <Route path="/cuenta-premium/ajustes" element={<PremiumLayout><PremiumSettings /></PremiumLayout>} />
            <Route path="/cuenta-premium/assistant" element={<PremiumLayout><PremiumAiAssistant /></PremiumLayout>} />
            <Route path="/cuenta-premium/biblioteca" element={<PremiumLayout><PremiumLibrary /></PremiumLayout>} />
            <Route path="/cuenta-premium/biblioteca/:id" element={<PremiumLibraryDetail />} />
            <Route path="/cuenta-premium/texto" element={<PremiumLayout><PremiumTextCreator /></PremiumLayout>} />
            <Route path="/cuenta-premium/email" element={<PremiumLayout><PremiumEmailCreator /></PremiumLayout>} />
            <Route path="/cuenta-premium/convertidor" element={<PremiumLayout><PremiumAudioCreator /></PremiumLayout>} />






          </Routes>
        </main>

        <CookieBanner />

        <Toaster />
      </div>
    </>
  );
}

export default App;
