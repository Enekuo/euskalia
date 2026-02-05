import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/translations";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NAVBAR_H = 88;

const SupportPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isPro = location.pathname.startsWith("/cuenta-pro");

  const tr = (key, fallback = "") => {
    const val = typeof t === "function" ? t(key) : null;
    return !val || val === key ? fallback : val;
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honey: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          lang: location.pathname.includes("/eus") ? "eus" : "es",
          page: location.pathname,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setLoading(false);
        return;
      }

      setStatus("ok");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        honey: "",
      });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        isPro
          ? "w-full bg-gradient-to-b from-[#F6FAFF] to-white"
          : "min-h-screen w-full bg-gradient-to-b from-[#F6FAFF] to-white"
      }
    >
      <div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        style={isPro ? undefined : { minHeight: `calc(100vh - ${NAVBAR_H}px)` }}
      >
        <div className="grid gap-8 md:grid-cols-2 items-start py-6">
          {/* ===== IZQUIERDA ===== */}
          <div className="relative">
            <section className="rounded-2xl border border-slate-200 bg-[#F7F8FC] p-6">
              <h2 className="text-4xl font-extrabold text-slate-900">
                {t("support_title")}
              </h2>
              <p className="mt-2 text-base text-slate-600">
                {t("support_subtitle")}
              </p>

              {/* ✅ MASCOTA SOLO MÓVIL, ARRIBA */}
              <div className="mt-4 flex justify-center md:hidden">
                <img
                  src="/olondo.mascota.png"
                  alt="Soporte Euskalia"
                  className="h-[120px] w-auto select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </section>

            {/* ❌ FRASE ELIMINADA EN MÓVIL */}
            <p className="hidden md:block mt-6 text-sm font-semibold tracking-wider text-blue-600">
              {t("support_kicker")}
            </p>
            <p className="hidden md:block mt-1 text-base text-slate-600">
              {t("support_subtitle")}
            </p>

            {/* ✅ MASCOTA DESKTOP (como antes) */}
            <div className="hidden md:flex mt-6">
              <img
                src="/olondo.mascota.png"
                alt="Soporte Euskalia"
                className="h-[260px] w-auto select-none pointer-events-none"
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

              <div>
                <label className="text-sm font-medium">
                  {t("support_form_email_label")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  {t("support_form_subject_label")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  {t("support_form_message_label")}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={5}
                  className="w-full rounded-xl border px-4 py-3 resize-none"
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading
                  ? tr("support_form_sending", "Bidaltzen...")
                  : t("support_form_submit")}
              </Button>

              {status === "ok" && (
                <p className="text-sm text-emerald-600">✅ Enviado</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">❌ Error</p>
              )}

              <p className="text-xs text-slate-500">
                {t("support_form_privacy_hint")}{" "}
                <Link to="/politica-de-privacidad" className="underline">
                  {t("support_form_privacy_link")}
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
