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

  const detectedLanguageButtons = {
    es:{ES:"Usar español",EUS:"Gaztelania erabili",EN:"Use Spanish",FR:"Utiliser l’espagnol"},
    eus:{ES:"Usar euskera",EUS:"Euskara erabili",EN:"Use Basque",FR:"Utiliser le basque"},
    en:{ES:"Usar inglés",EUS:"Ingelesa erabili",EN:"Use English",FR:"Utiliser l’anglais"},
    fr:{ES:"Usar francés",EUS:"Frantsesa erabili",EN:"Use French",FR:"Utiliser le français"},
    de:{ES:"Usar alemán",EUS:"Alemana erabili",EN:"Use German",FR:"Utiliser l’allemand"},
    it:{ES:"Usar italiano",EUS:"Italiera erabili",EN:"Use Italian",FR:"Utiliser l’italien"},
    pt:{ES:"Usar portugués",EUS:"Portugesa erabili",EN:"Use Portuguese",FR:"Utiliser le portugais"},
    nl:{ES:"Usar neerlandés",EUS:"Nederlandera erabili",EN:"Use Dutch",FR:"Utiliser le néerlandais"},
    zh:{ES:"Usar chino",EUS:"Txinera erabili",EN:"Use Chinese",FR:"Utiliser le chinois"},
    ja:{ES:"Usar japonés",EUS:"Japoniera erabili",EN:"Use Japanese",FR:"Utiliser le japonais"},
    ar:{ES:"Usar árabe",EUS:"Arabiera erabili",EN:"Use Arabic",FR:"Utiliser l’arabe"},
    ru:{ES:"Usar ruso",EUS:"Errusiera erabili",EN:"Use Russian",FR:"Utiliser le russe"},
    ko:{ES:"Usar coreano",EUS:"Koreera erabili",EN:"Use Korean",FR:"Utiliser le coréen"},
    sv:{ES:"Usar sueco",EUS:"Suediera erabili",EN:"Use Swedish",FR:"Utiliser le suédois"},
    ro:{ES:"Usar rumano",EUS:"Errumaniera erabili",EN:"Use Romanian",FR:"Utiliser le roumain"},
    uk:{ES:"Usar ucraniano",EUS:"Ukrainera erabili",EN:"Use Ukrainian",FR:"Utiliser l’ukrainien"},
  };

  const detectedLanguageDescriptions = {
    es:{ES:"español",EUS:"gaztelania",EN:"Spanish",FR:"espagnol"},
    eus:{ES:"euskera",EUS:"euskara",EN:"Basque",FR:"basque"},
    en:{ES:"inglés",EUS:"ingelesa",EN:"English",FR:"anglais"},
    fr:{ES:"francés",EUS:"frantsesa",EN:"French",FR:"français"},
    de:{ES:"alemán",EUS:"alemana",EN:"German",FR:"allemand"},
    it:{ES:"italiano",EUS:"italiera",EN:"Italian",FR:"italien"},
    pt:{ES:"portugués",EUS:"portugesa",EN:"Portuguese",FR:"portugais"},
    nl:{ES:"neerlandés",EUS:"nederlandera",EN:"Dutch",FR:"néerlandais"},
    zh:{ES:"chino",EUS:"txinera",EN:"Chinese",FR:"chinois"},
    ja:{ES:"japonés",EUS:"japoniera",EN:"Japanese",FR:"japonais"},
    ar:{ES:"árabe",EUS:"arabiera",EN:"Arabic",FR:"arabe"},
    ru:{ES:"ruso",EUS:"errusiera",EN:"Russian",FR:"russe"},
    ko:{ES:"coreano",EUS:"koreera",EN:"Korean",FR:"coréen"},
    sv:{ES:"sueco",EUS:"suediera",EN:"Swedish",FR:"suédois"},
    ro:{ES:"rumano",EUS:"errumaniera",EN:"Romanian",FR:"roumain"},
    uk:{ES:"ucraniano",EUS:"ukrainera",EN:"Ukrainian",FR:"ukrainien"},
  };

  const buttonText =
    detectedLanguageButtons[detectedCode]?.[currentLang] ||
    detectedLanguageButtons[detectedCode]?.ES ||
    "";

  const detectedName =
    detectedLanguageDescriptions[detectedCode]?.[currentLang] ||
    detectedLanguageDescriptions[detectedCode]?.ES ||
    detectedCode;

  if (!detectedCode || !buttonText) return null;

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