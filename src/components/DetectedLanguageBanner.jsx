// src/components/DetectedLanguageBanner.jsx
import React from "react";
import { X } from "lucide-react";
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

const buttonLabels = {
  es: {
    ES: "Usar Español",
    EUS: "Erabili gaztelania",
    EN: "Use Spanish",
    FR: "Utiliser l’espagnol",
  },
  eus: {
    ES: "Usar Euskera",
    EUS: "Erabili euskara",
    EN: "Use Basque",
    FR: "Utiliser le basque",
  },
  en: {
    ES: "Usar Inglés",
    EUS: "Erabili ingelesa",
    EN: "Use English",
    FR: "Utiliser l’anglais",
  },
  fr: {
    ES: "Usar Francés",
    EUS: "Erabili frantsesa",
    EN: "Use French",
    FR: "Utiliser le français",
  },
};

export default function DetectedLanguageBanner({
  language = null,
  selectedLanguage = null,
  onAccept,
  onClose,
  className = "",
}) {
  const { language: currentLanguage } = useTranslation();

  if (!language) return null;

  const normalizedLanguage = String(language).toLowerCase();
  const normalizedSelected = selectedLanguage
    ? String(selectedLanguage).toLowerCase()
    : null;

  if (
    normalizedSelected &&
    normalizedLanguage === normalizedSelected
  ) {
    return null;
  }

  const currentLang = currentLanguage || "ES";

  const detectedName =
    languageNames[normalizedLanguage]?.[currentLang] ||
    languageNames[normalizedLanguage]?.ES ||
    "";

  if (!detectedName) return null;

  const titles = {
    ES: "¿Cambiar de idioma?",
    EUS: "Hizkuntza aldatu?",
    EN: "Change language?",
    FR: "Changer de langue ?",
  };

  const descriptions = {
    ES: `Hemos detectado texto en ${detectedName}. ¿Quieres cambiar de idioma?`,
    EUS: `Testua ${detectedName}z dagoela detektatu dugu. Hizkuntza aldatu nahi duzu?`,
    EN: `We detected text in ${detectedName}. Do you want to change language?`,
    FR: `Nous avons détecté du texte en ${detectedName}. Voulez-vous changer de langue ?`,
  };

  const buttonText =
    buttonLabels[normalizedLanguage]?.[currentLang] ||
    buttonLabels[normalizedLanguage]?.ES ||
    "";

  return (
    <div
      className={
        "relative mb-4 w-full max-w-[440px] rounded-xl border border-slate-200 bg-white shadow-xl px-5 py-4 " +
        className
      }
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-slate-500 hover:text-slate-800"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="pr-8">
        <div className="text-[20px] font-semibold text-slate-900">
          {titles[currentLang] || titles.ES}
        </div>

        <div className="mt-3 text-[15px] leading-6 text-slate-700">
          {descriptions[currentLang] || descriptions.ES}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onAccept}
            className="h-10 rounded-full bg-emerald-600 px-5 text-[15px] font-semibold text-white hover:bg-emerald-700 transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}