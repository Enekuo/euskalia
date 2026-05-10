import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

export default function SpeechInputButton({
  language = "es-ES",
  onResult,
  disabled = false,
  title = "Dictar por voz",
}) {
  const recognitionRef = useRef(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;

      if (transcript && typeof onResult === "function") {
        onResult(transcript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [language, onResult]);

  const handleClick = () => {
    if (!recognitionRef.current || disabled) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      setIsListening(false);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      title={title}
      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
        isListening
          ? "bg-red-50 border-red-300 text-red-600 animate-pulse"
          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isListening ? (
        <MicOff className="w-4 h-4" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
}