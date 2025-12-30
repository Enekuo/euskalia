import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/translations";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const NAVBAR_H = 88; // altura del header FREE

const SupportPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isPro = location.pathname.startsWith("/cuenta-pro");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honey: "", // honeypot
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.honey) return; // bot
    const to = "support@olondo.ai";
    const subject = encodeURIComponent(
      `[Olondo.AI] ${form.subject || t("support_form_subject_placeholder")}`
    );
    const body = encodeURIComponent(
      `${t("support_form_name_label")}: ${form.name}\n` +
        `${t("support_form_email_label")}: ${form.email}\n\n` +
        `${t("support_form_message_label")}:\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className={
        isPro
          ? "w-full bg-gradient-to-b from-[#F6FAFF] to-white"
          : "h-screen w-full overflow-hidden bg-gradient-to-b from-[#F6FAFF] to-white dark:from-slate-900 dark:to-slate-900"
      }
    >
      <div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        style={
          isPro
            ? undefined
            : { height: `calc(100vh - ${NAVBAR_H}px)` }
        }
      >
        <div className={isPro ? "grid gap-8 md:grid-cols-2 items-start py-8" : "grid h-full gap-8 md:grid-cols-2 items-start py-5"}>
          {/* ===== Columna izquierda ===== */}
          <div className="relative min-h-0">
            <section className="mb-6 rounded-2xl border border-slate-200 bg-[#F7F8FC] p-6 dark:bg-slate-800 dark:border-slate-700">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
                    {t("support_title")}
                  </h2>
                  <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                    {t("support_subtitle")}
                  </p>
                </div>
                <div className="hidden md:flex">
                  <div className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm whitespace-nowrap">
                    {t("support_cta")}
                  </div>
                </div>
              </div>
            </section>

            <p className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400">
              {t("support_kicker")}
            </p>
            <p className="mt-1 text-base text-slate-600 dark:text-slate-300">
              {t("support_subtitle")}
            </p>

            <div className="mt-6 inline-block">
              <img
                src="/olondo.mascota.png"
                alt="Soporte Olondo.AI"
                className="h-[260px] sm:h-[320px] w-auto select-none pointer-events-none dark:brightness-95"
                draggable={false}
              />
            </div>

            {/* Burbuja */}
            <div
              className="absolute hidden md:block -translate-y-1/2"
              style={{ left: "40%", top: "62%" }}
            >
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-600 dark:bg-slate-700">
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  {t("support_bubble_text")}
                </span>
              </div>
            </div>
          </div>

          {/* ===== Columna derecha: Formulario ===== */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] border-slate-200 dark:bg-slate-800 dark:border-slate-700"
            style={isPro ? undefined : { height: "100%" }}
          >
            <form onSubmit={onSubmit} className="flex h-full flex-col gap-4">
              <input
                type="text"
                name="honey"
                value={form.honey}
                onChange={onChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    {t("support_form_name_label")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder={t("support_form_name_placeholder")}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-blue-500 text-slate-900 placeholder-slate-400 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    {t("support_form_email_label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder={t("support_form_email_placeholder")}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-blue-500 text-slate-900 placeholder-slate-400 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    {t("support_form_subject_label")}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder={t("support_form_subject_placeholder")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-blue-500 text-slate-900 placeholder-slate-400 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                  />
                </div>

                <div className="flex-1 min-h-0">
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    {t("support_form_message_label")}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder={t("support_form_message_placeholder")}
                    required
                    rows={5}
                    className="min-h-[140px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-blue-500 text-slate-900 placeholder-slate-400 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 resize-none"
                  />
                </div>
              </div>

              <div className="pt-1">
                <Button type="submit" className="h-11 rounded-xl px-6 text-base">
                  {t("support_form_submit")}
                </Button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t("support_form_privacy_hint")}{" "}
                <a href="/politica-de-privacidad" className="underline underline-offset-2">
                  {t("support_form_privacy_link")}
                </a>
                .
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
