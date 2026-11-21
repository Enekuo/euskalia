import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/translations";
import { motion } from "framer-motion";
import { ENTRANCE, ENTRANCE_DELAY_MS, STAGGER_MS, entranceDelay, resultLine } from "@/lib/motion";
import { SheenLayer, primaryButtonMotion, PRIMARY_BUTTON_CLASS } from "@/components/ui/motion-primitives";

// Animaciones (mismo lenguaje que las herramientas, ver motion.js):
// - Entrada en cascada al cargar (CSS en el compositor): tarjeta "Kontaktua"
//   sube SIN opacidad (contiene el título / LCP), texto de ayuda cae y se
//   funde, la mascota entra desde su lado, el formulario sube y sus campos
//   aparecen uno tras otro.
// - Botón "Bidali": barrido de luz + press.
// - Mensaje de enviado / error: sube y aparece como un resultado.
// Con "reducir movimiento": sin desplazamientos (solo fundidos o directo).
const FIELD_DELAY = (i) => ENTRANCE_DELAY_MS.output + ENTRANCE_DELAY_MS.toolbar + i * STAGGER_MS.tool;
const FIELD_CLASS =
  "w-full rounded-xl border px-4 py-3 transition-shadow duration-fast ease-state focus:outline-none focus:ring-2 focus:ring-blue-100";
import { useLocation, Link } from "react-router-dom";

const NAVBAR_H = 88;

const SupportPage = () => {
  const { t, language } = useTranslation();
  const location = useLocation();

  const langForApi = () => {
    const x = String(language || "").toUpperCase();
    if (x === "EUS") return "eus";
    if (x === "ES") return "es";
    if (x === "EN") return "en";
    if (x === "FR") return "fr";
    return location.pathname.includes("/eus") ? "eus" : "es";
  };

  const [form, setForm] = useState({
    email: "",
    subject: "",
    message: "",
    honey: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.honey) return;

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "support",
          email: form.email,
          subject: form.subject,
          message: form.message,
          lang: langForApi(),
          page: location.pathname,
          source: "free",
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setStatus("error");
        return;
      }

      setStatus("ok");
      setForm({ email: "", subject: "", message: "", honey: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F6FAFF] to-white">
      <div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        style={{ minHeight: `calc(100vh - ${NAVBAR_H}px)` }}
      >
        <div className="grid gap-8 md:grid-cols-2 items-start py-6">
          {/* ===== IZQUIERDA ===== */}
          <div>
            <section className={`rounded-2xl border border-slate-200 bg-[#F7F8FC] p-6 ${ENTRANCE.card}`}>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-4xl font-extrabold text-slate-900">
                    {t("support_title", "KONTAKTUA")}
                  </h2>
                  <p className="mt-2 text-base text-slate-600">
                    {t("support_subtitle_bottom", "Formularioa bete edo zuzenean idatz diezagukezue: euskaliaweb@gmail.com",)}
                  </p>
                </div>

                <div className="md:hidden shrink-0">
                  <img
                    src="/olondo.mascota.webp"
                    alt="Soporte Euskalia"
                    className="h-[96px] w-auto pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </section>

            <div className={`hidden md:block ${ENTRANCE.toolbar}`} style={entranceDelay(ENTRANCE_DELAY_MS.input)}>
              <p className="mt-6 text-sm font-semibold tracking-wider text-blue-600">
                {t("support_kicker", "Nola lagun diezazukegu?")}
              </p>
              <p className="mt-1 text-base text-slate-600">
                {t("support_help_text", "Laguntza behar duzu? Hemen gaude laguntzeko.")}
              </p>
            </div>

            <div className={`hidden md:flex mt-6 ${ENTRANCE.heroFromLeft}`} style={entranceDelay(ENTRANCE_DELAY_MS.heroSides)}>
              <img
                src="/olondo.mascota.webp"
                alt="Soporte Euskalia"
                className="h-[260px] w-auto pointer-events-none select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* ===== FORMULARIO ===== */}
          <div
            className={`rounded-2xl border bg-white p-6 shadow border-slate-200 ${ENTRANCE.output}`}
            style={entranceDelay(ENTRANCE_DELAY_MS.output)}
          >
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="honey"
                value={form.honey}
                onChange={onChange}
                className="hidden"
              />

              <div className={ENTRANCE.item} style={entranceDelay(FIELD_DELAY(0))}>
                <label className="text-sm font-medium">
                  {t("support_form_email_label", "Posta elektronikoa")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder={t("support_form_email_placeholder", "Zure posta elektronikoa")}
                  className={FIELD_CLASS}
                />
              </div>

              <div className={ENTRANCE.item} style={entranceDelay(FIELD_DELAY(1))}>
                <label className="text-sm font-medium">
                  {t("support_form_subject_label", "Gaia")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder={t("support_form_subject_placeholder", "Zerri buruz behar duzu laguntza?")}
                  className={FIELD_CLASS}
                />
              </div>

              <div className={ENTRANCE.item} style={entranceDelay(FIELD_DELAY(2))}>
                <label className="text-sm font-medium">
                  {t("support_form_message_label", "Mezua")}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={5}
                  placeholder={t("support_form_message_placeholder", "Esaguzu nola lagundu diezazukegun")}
                  className={`${FIELD_CLASS} resize-none`}
                />
              </div>

              <div className={ENTRANCE.item} style={entranceDelay(FIELD_DELAY(3))}>
                <Button
                  asChild
                  type="submit"
                  disabled={loading}
                  className={`${PRIMARY_BUTTON_CLASS} w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-fast ease-state`}
                >
                  <motion.button {...primaryButtonMotion(!loading)}>
                    <SheenLayer />
                    <span className="relative">
                      {loading ? t("support_form_sending", "Bidaltzen...") : t("support_form_submit", "Bidali")}
                    </span>
                  </motion.button>
                </Button>
              </div>

              {status === "ok" && (
                <motion.p variants={resultLine} initial="hidden" animate="visible" className="text-sm text-emerald-600">
                  {t("support_status_ok", "✅ Enviado")}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p variants={resultLine} initial="hidden" animate="visible" className="text-sm text-red-600">
                  {t("support_status_error", "❌ Error")}
                </motion.p>
              )}

              <p className="text-xs text-slate-500">
                {t("support_form_privacy_hint", "Pribatutasun politika onartzen duzu")}{" "}
                <Link to="/politica-de-privacidad" className="underline">
                  {t("support_form_privacy_link", "irakurri")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;