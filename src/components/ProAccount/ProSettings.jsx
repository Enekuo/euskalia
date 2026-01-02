import React, { useEffect, useState } from "react";
import { useTranslation } from "@/lib/translations";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function ProSettings() {
  const { language, setLanguage, t } = useTranslation();

  // ✅ evita que se muestre la clave literal si falta traducción
  const tr = (key, fallback = "") => {
    const val = typeof t === "function" ? t(key) : null;
    if (!val) return fallback;
    if (val === key) return fallback;
    return val;
  };

  const firstNameOnly = (name) => {
    const clean = String(name || "").trim().replace(/\s+/g, " ");
    if (!clean) return "";
    return clean.split(" ")[0];
  };

  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
  });

  const [notifications, setNotifications] = useState({
    product: true,
    tips: true,
    billing: true,
  });

  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  // ✅ Cargar datos reales del usuario (Auth) + notificaciones guardadas (localStorage por UID)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const full = (user?.displayName || "").trim();
      const first = full ? firstNameOnly(full) : "";
      const email = (user?.email || "").trim();

      setProfile({
        displayName: first,
        email,
      });

      // notificaciones por UID (persistencia real en navegador)
      try {
        const uid = user?.uid || null;
        if (uid) {
          const raw = localStorage.getItem(`euskalia:pro:notifications:${uid}`);
          if (raw) {
            const parsed = JSON.parse(raw);
            setNotifications({
              product: typeof parsed?.product === "boolean" ? parsed.product : true,
              tips: typeof parsed?.tips === "boolean" ? parsed.tips : true,
              billing: typeof parsed?.billing === "boolean" ? parsed.billing : true,
            });
          }
        }
      } catch {}
    });

    return () => unsub();
  }, []);

  const saveAll = async (e) => {
    e.preventDefault();
    setSavedMsg("");

    const user = auth.currentUser;
    if (!user) return;

    const cleanFirst = firstNameOnly(profile.displayName);

    setSaving(true);
    try {
      // ✅ 1) Guardar SOLO primer nombre en Firebase Auth
      await updateProfile(user, { displayName: cleanFirst });

      // ✅ 2) Guardar notificaciones por UID (persistencia real en navegador)
      try {
        const uid = user?.uid;
        if (uid) {
          localStorage.setItem(
            `euskalia:pro:notifications:${uid}`,
            JSON.stringify(notifications)
          );
        }
      } catch {}

      // ✅ Mensaje OK (usa traducción si existe)
      setSavedMsg(tr("settings_saved_ok", "Configuración guardada."));
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (err) {
      console.error(err);
      // si quieres, añade otra clave para error:
      setSavedMsg(tr("settings_saved_error", "No se pudo guardar. Intenta de nuevo."));
      setTimeout(() => setSavedMsg(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* TÍTULO */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {tr("settings_title", "Ajustes")}
        </h1>
        <p className="text-slate-600 mt-1">
          {tr("settings_subtitle", "Personaliza tu experiencia en Euskalia.")}
        </p>
      </div>

      <form onSubmit={saveAll} className="space-y-8">
        {/* PERFIL */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              {tr("settings_profile_title", "Perfil")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {tr(
                "settings_profile_desc",
                "Información básica para identificar tu cuenta."
              )}
            </p>
          </div>

          {/* Nombre y email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre visible (solo primer nombre) */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                {tr("settings_profile_display_name", "Nombre visible")}
              </label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) =>
                  setProfile({ ...profile, displayName: e.target.value })
                }
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none"
                placeholder={tr("settings_profile_display_name_ph", "Tu nombre")}
                disabled={saving}
              />
            </div>

            {/* Email (solo mostrar, NO editable) */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                {tr("settings_profile_email", "Email")}
              </label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none text-slate-700"
                placeholder={tr("settings_profile_email_ph", "nombre@ejemplo.com")}
              />
            </div>
          </div>

          <div className="text-xs text-slate-500">
            {tr(
              "settings_profile_security_hint",
              "El cambio de contraseña se gestiona de forma segura en tu cuenta."
            )}
          </div>
        </section>

        {/* APARIENCIA */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              {tr("settings_appearance_title", "Apariencia")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {tr("settings_appearance_desc", "Elige cómo se ve Euskalia.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selector de idioma REAL */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                {tr("settings_appearance_language", "Idioma")}
              </label>

              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="
                    w-full appearance-none rounded-xl border border-slate-200
                    bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200
                    focus:border-sky-500
                  "
                  disabled={saving}
                >
                  <option value="ES">Español</option>
                  <option value="EUS">Euskara</option>
                  <option value="EN">English</option>
                  <option value="FR">Français</option>
                </select>
                <span
                  className="
                    pointer-events-none absolute inset-y-0 right-3 flex items-center
                    text-slate-400 text-xs
                  "
                >
                  ▼
                </span>
              </div>
            </div>

            {/* Tema */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                {tr("settings_appearance_theme", "Tema")}
              </label>

              <select
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                value={"light"}
                disabled
              >
                <option value="light">
                  {tr("settings_theme_light_only", "Claro (único disponible)")}
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* NOTIFICACIONES */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              {tr("settings_notifications_title", "Notificaciones")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {tr(
                "settings_notifications_desc",
                "Elige qué mensajes o avisos quieres recibir."
              )}
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-sky-600"
                checked={notifications.product}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    product: e.target.checked,
                  })
                }
                disabled={saving}
              />
              <div>
                <div className="text-sm font-medium">
                  {tr("settings_notifications_product", "Actualizaciones de producto")}
                </div>
                <p className="text-xs text-slate-500">
                  {tr(
                    "settings_notifications_product_hint",
                    "Novedades, mejoras y avisos importantes."
                  )}
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-sky-600"
                checked={notifications.tips}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    tips: e.target.checked,
                  })
                }
                disabled={saving}
              />
              <div>
                <div className="text-sm font-medium">
                  {tr("settings_notifications_tips", "Consejos y buenas prácticas")}
                </div>
                <p className="text-xs text-slate-500">
                  {tr(
                    "settings_notifications_tips_hint",
                    "Tips rápidos para aprovechar Euskalia."
                  )}
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-sky-600"
                checked={notifications.billing}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    billing: e.target.checked,
                  })
                }
                disabled={saving}
              />
              <div>
                <div className="text-sm font-medium">
                  {tr("settings_notifications_billing", "Facturación")}
                </div>
                <p className="text-xs text-slate-500">
                  {tr(
                    "settings_notifications_billing_hint",
                    "Recibos, avisos de pago y cambios de plan."
                  )}
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* PLAN Y SUSCRIPCIÓN */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-lg text-slate-900">
              {tr("settings_plan_title", "Plan y suscripción")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {tr(
                "settings_plan_desc",
                "Consulta el estado de tu plan actual."
              )}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm text-slate-600">
                {tr("settings_plan_row_plan", "Plan")}
              </div>

              <div className="flex-1 flex justify-center">
                <span
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border border-emerald-200 bg-emerald-50
                    px-3 py-1 text-xs font-semibold text-emerald-700
                  "
                >
                  <span
                    className="
                      inline-flex h-4 w-4 items-center justify-center
                      rounded-full bg-emerald-600 text-white text-[10px]
                    "
                  >
                    ✓
                  </span>
                  {tr("settings_plan_status_active", "Activo")}
                </span>
              </div>

              <div className="text-sm font-semibold text-slate-900">
                {tr("settings_plan_value_pro", "Pro")}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm text-slate-600">
                {tr("settings_plan_row_renews", "Renovación")}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-700">
                  {tr("settings_plan_renews_value", "Mensual")}
                </div>

                <button
                  type="button"
                  onClick={() => alert(tr("settings_plan_demo_alert", "Demo"))}
                  className="
                    rounded-md border border-slate-300 bg-white px-3 py-2
                    text-sm font-medium text-slate-700 hover:bg-slate-50
                  "
                >
                  {tr("settings_plan_cancel_btn", "Cancelar")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BOTÓN GUARDAR */}
        <div className="flex items-center justify-end gap-3">
          {!!savedMsg && (
            <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
              {savedMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="
              rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {saving
              ? tr("settings_cta_saving", "Guardando…")
              : tr("settings_cta_save", "Guardar cambios")}
          </button>
        </div>
      </form>
    </div>
  );
}
