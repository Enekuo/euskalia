import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/translations";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { auth } from "@/lib/firebase";

const NAVBAR_H = 88;

const SupportPage = () => {
  const { t, language } = useTranslation();
  const location = useLocation();

  const isPremium = location.pathname.startsWith("/cuenta-premium");

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

  useEffect(() => {
    const fromPremiumLimitBanner = location.state?.fromPremiumLimitBanner;
    const prefill = location.state?.supportPrefill;

    if (!fromPremiumLimitBanner) return;

    const userEmail = auth?.currentUser?.email || "";

    setForm((prev) => ({
      ...prev,
      email: userEmail,
      subject: prefill?.subject || "Solicitud de ampliación",
      message:
        prefill?.message ||
        "Hola, he alcanzado el límite de caracteres de mi plan Premium y quiero solicitar una ampliación. Gracias.",
    }));
  }, [location.state]);

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
          source: isPremium ? "premium" : "free",
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
    <div
      className={
        isPremium
          ? "w-full bg-gradient-to-b from-[#F6FAFF] to-white"
          : "min-h-screen w-full bg-gradient-to-b from-[#F6FAFF] to-white"
      }
    >
      <div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        style={isPremium ? undefined : { minHeight: `calc(100vh - ${NAVBAR_H}px)` }}
      >
        <div className="grid gap-8 md:grid-cols-2 items-start py-6">
          {/* ===== IZQUIERDA ===== */}
          <div>
            {/* HEADER */}
            <section className="rounded-2xl border border-slate-200 bg-[#F7F8FC] p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-4xl font-extrabold text-slate-900">
                    {t("support_title", "Laguntza")}
                  </h2>
                  <p className="mt-2 text-base text-slate-600">
                    {t("support_subtitle", "Laguntza behar duzu? Hemen gaude laguntzeko.")}
                  </p>
                </div>

                {/* Mascota móvil a la derecha */}
                <div className="md:hidden shrink-0">
                  <img
                    src="/olondo.mascota.png"
                    alt="Soporte Euskalia"
                    className="h-[96px] w-auto pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </section>

            {/* ❌ ESTE BLOQUE NO SALE EN MÓVIL */}
            <div className="hidden md:block">
              <p className="mt-6 text-sm font-semibold tracking-wider text-blue-600">
                {t("support_kicker", "Nola lagun diezazukegu?")}
              </p>
              <p className="mt-1 text-base text-slate-600">
                {t("support_subtitle", "Laguntza behar duzu? Hemen gaude laguntzeko.")}
              </p>
            </div>

            {/* Mascota desktop */}
            <div className="hidden md:flex mt-6">
              <img
                src="/olondo.mascota.png"
                alt="Soporte Euskalia"
                className="h-[260px] w-auto pointer-events-none select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* ===== FORMULARIO ===== */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-white p-6 shadow border-slate-200"
          >
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="honey"
                value={form.honey}
                onChange={onChange}
                className="hidden"
              />

              {/* Posta elektronikoa */}
              <div>
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
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {/* Gaia */}
              <div>
                <label className="text-sm font-medium">
                  {t("support_form_subject_label", "Gaia")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder={t("support_form_subject_placeholder", "Zerri buruz behar duzu laguntza?")}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              {/* Mezua */}
              <div>
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
                  className="w-full rounded-xl border px-4 py-3 resize-none"
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? t("support_form_sending", "Bidaltzen...") : t("support_form_submit", "Bidali")}
              </Button>

              {status === "ok" && (
                <p className="text-sm text-emerald-600">{t("support_status_ok", "✅ Enviado")}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">{t("support_status_error", "❌ Error")}</p>
              )}

              <p className="text-xs text-slate-500">
                {t("support_form_privacy_hint", "Pribatutasun politika onartzen duzu")}{" "}
                <Link to="/politica-de-privacidad" className="underline">
                  {t("support_form_privacy_link", "irakurri")}
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;