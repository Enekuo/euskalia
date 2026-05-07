// src/components/DetectedLanguageBanner.jsx
import React from "react";
import { Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/translations";

const languageNames = {
  es: {
    ES: "español",
    EUS: "gaztelania",
    EN: "Spanish",
    FR: "espagnol",
  },
  eus: {
    ES: "euskera",
    EUS: "euskara",
    EN: "Basque",
    FR: "basque",
  },
  en: {
    ES: "inglés",
    EUS: "ingelesa",
    EN: "English",
    FR: "anglais",
  },
  fr: {
    ES: "francés",
    EUS: "frantsesa",
    EN: "French",
    FR: "français",
  },
};

export default function DetectedLanguageBanner({ language = null, className = "" }) {
  const { language: currentLanguage } = useTranslation();

  if (!language) return null;

  const normalizedLanguage = String(language).toLowerCase();

  const currentLang = currentLanguage || "ES";

  const detectedName =
    languageNames[normalizedLanguage]?.[currentLang] ||
    languageNames[normalizedLanguage]?.ES ||
    "";

  if (!detectedName) return null;

  const messages = {
    ES: `Hemos detectado texto en ${detectedName}.`,
    EUS: `Testua ${detectedName}z dagoela detektatu dugu.`,
    EN: `We detected text in ${detectedName}.`,
    FR: `Nous avons détecté du texte en ${detectedName}.`,
  };

  return (
    <div
      className={
        "mb-3 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-[13px] font-medium text-blue-800 " +
        className
      }
    >
      <Sparkles className="h-4 w-4 shrink-0" />
      <span>{messages[currentLang] || messages.ES}</span>
    </div>
  );
}