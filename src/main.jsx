import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "@/App";
import "@/index.css";
import "@/styles/dark.css";

// ⬇️ importa del archivo único
import { LanguageProvider } from "@/lib/translations";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider defaultLang="ES">
      <BrowserRouter>
        {/* Respeta "reducir movimiento" del sistema en todas las animaciones de framer-motion */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>
);