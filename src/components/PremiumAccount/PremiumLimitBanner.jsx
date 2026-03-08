import React, { useEffect, useState } from "react";
import { Crown, LifeBuoy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/translations";

export default function PremiumLimitBanner({
  visible = true,
  used = 0,
  limit = 0,
  className = "",
  title,
  description,
  buttonText,
  hideButton = false,
  supportMode = "internal", // "internal" | "mailto" | "external"
  to = "/cuenta-premium/soporte",
  email = "soporte@euskalia.ai",
  externalUrl = "",
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isClosed, setIsClosed] = useState(false);

  const tr = (key, fallback = "") => {
    const val = typeof t === "function" ? t(key) : null;
    return !val || val === key ? fallback : val;
  };

  const safeUsed = Number.isFinite(Number(used)) ? Number(used) : 0;
  const safeLimit = Number.isFinite(Number(limit)) ? Number(limit) : 0;

  useEffect(() => {
    if (visible) {
      setIsClosed(false);
    }
  }, [visible, safeUsed, safeLimit]);

  const handleContact = () => {
    try {
      if (supportMode === "mailto") {
        const subject = encodeURIComponent("Solicitud de ampliación");

        const body = encodeURIComponent(
          "Hola, he alcanzado el límite de caracteres de mi plan Premium y quiero solicitar una ampliación. Gracias."
        );

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        return;
      }

      if (supportMode === "external" && externalUrl) {
        window.open(externalUrl, "_blank", "noopener,noreferrer");
        return;
      }

      navigate(to, {
        state: {
          fromPremiumLimitBanner: true,
          supportPrefill: {
            subject: "Solicitud de ampliación",
            message:
              "Hola, he alcanzado el límite de caracteres de mi plan Premium y quiero solicitar una ampliación. Gracias.",
          },
        },
      });
    } catch (error) {
      console.error("PremiumLimitBanner contact error:", error);
    }
  };

  if (!visible || isClosed) return null;

  return (
    <div
      className={`relative w-full rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-yellow-50 p-4 sm:p-5 shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsClosed(true)}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-amber-100 hover:text-slate-700"
        aria-label={tr("premium_limit_banner_close", "Cerrar aviso")}
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col gap-4 pr-10 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <Crown className="h-5 w-5 text-amber-600" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                {title ||
                  tr(
                    "premium_limit_banner_title",
                    "Has alcanzado el límite de tu plan Premium"
                  )}
              </h3>

              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                <Crown className="h-3.5 w-3.5" />
                {tr("premium_limit_banner_badge", "Premium")}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-600">
              {description ||
                tr(
                  "premium_limit_banner_description",
                  "Has usado todos los caracteres disponibles. Si necesitas más capacidad, puedes solicitar una ampliación personalizada contactando con soporte."
                )}
            </p>
          </div>
        </div>

        {!hideButton && (
          <div className="flex shrink-0">
            <Button
              onClick={handleContact}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              <LifeBuoy className="mr-2 h-4 w-4" />
              {buttonText ||
                tr("premium_limit_banner_button", "Solicitar ampliación")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}