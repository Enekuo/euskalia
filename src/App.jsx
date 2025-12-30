import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Translator from '@/components/Translator';
import { Toaster } from '@/components/ui/toaster';
import AuthPage from '@/pages/AuthPage';
import RegisterPage from "@/pages/RegisterPage";
import SupportPage from '@/pages/SupportPage';
import AssistantPage from "@/pages/AssistantPage";
import Resumen from "@/components/Resumen";
import LegalNoticePage from "@/components/Legal/LegalNoticePage";
import PrivacyPolicyPage from "@/components/Legal/PrivacyPolicyPage";
import TermsConditionsPage from "@/components/Legal/TermsConditionsPage";
import CookiesPolicyPage from "@/components/Legal/CookiesPolicyPage";
import UseAIPage from "@/components/Legal/UseAIPage";
import PricingPage from "@/pages/PricingPage";
import Suggestions from "@/pages/Suggestions";

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

function App() {
  const location = useLocation();

  const isProRoute = location.pathname.startsWith("/cuenta-pro");

  const showHeader =
    !isProRoute &&
    location.pathname !== "/iniciar-sesion" &&
    location.pathname !== "/crear-cuenta";

  return (
    <>
      <Helmet>
        <title>Meditation.AI - Tu Compañero de Meditación con IA</title>
        <meta
          name="description"
          content="Descubre la meditación personalizada con inteligencia artificial. Meditation.AI te ayuda a encontrar la paz interior con sesiones adaptadas a tus necesidades."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
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
            <Route path="/aviso-legal" element={<LegalNoticePage />} />
            <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
            <Route path="/terminos-condiciones" element={<TermsConditionsPage />} />
            <Route path="/cookies" element={<CookiesPolicyPage />} />
            <Route path="/uso-de-ia" element={<UseAIPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/sugerencias" element={<Suggestions />} />


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
         
          </Routes>
        </main>

        <Toaster />
      </div>
    </>
  );
}

export default App;
