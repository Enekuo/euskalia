// src/components/DetectedLanguageBanner.jsx
import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export default function DetectedLanguageBanner({
  language = null,
  selectedLanguage = null,
  onAccept,
  onClose,
  className = "",
}) {
  const { language: currentLanguage } = useTranslation();

  if (!language || typeof language !== "object") return null;

  const currentLang = currentLanguage || "ES";

  const detectedCode = String(language.code || "").toLowerCase();
  const detectedName = String(language.label || "").trim();

const buttonTexts = {
  ES: `Usar ${detectedName}`,
  EUS: `${detectedName} erabili`,
  EN: `Use ${detectedName}`,
  FR: `Utiliser ${detectedName}`,
};

const buttonText = buttonTexts[currentLang] || buttonTexts.ES;

  if (!detectedCode || !detectedName) return null;

  const selectedCode = selectedLanguage
    ? String(selectedLanguage).toLowerCase()
    : null;

  const normalizedSelected =
    selectedCode === "eus"
      ? "eu"
      : selectedCode === "euskara"
      ? "eu"
      : selectedCode;

  if (normalizedSelected && detectedCode === normalizedSelected) {
    return null;
  }

  const titles = {
    ES: "¿Cambiar de idioma?",
    EUS: "Hizkuntza aldatu?",
    EN: "Change language?",
    FR: "Changer de langue ?",
  };

  const descriptions = {
    ES: `Hemos detectado texto en ${detectedName}. ¿Quieres cambiar de idioma?`,
    EUS: `Testua ${detectedName} hizkuntzan dagoela detektatu dugu. Hizkuntza aldatu nahi duzu?`,
    EN: `We detected text in ${detectedName}. Do you want to change language?`,
    FR: `Nous avons détecté du texte en ${detectedName}. Voulez-vous changer de langue ?`,
  };

  return (
    <div
      className={
        "relative w-[440px] max-w-[92vw] rounded-2xl border border-slate-200 bg-white shadow-2xl px-5 py-4 " +
        className
      }
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 transition"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="pr-8">
        <div className="text-[22px] leading-none font-semibold text-slate-900">
          {titles[currentLang] || titles.ES}
        </div>

        <div className="mt-3 text-[15px] leading-6 text-slate-600">
          {descriptions[currentLang] || descriptions.ES}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onAccept}
            className="h-10 rounded-full bg-[#2563eb] px-5 text-[15px] font-semibold text-white hover:brightness-95 transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}