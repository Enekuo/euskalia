import React, { useEffect, useState } from "react";
import { useTranslation } from "@/lib/translations";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function ProSettings() {
  const { language, setLanguage, t } = useTranslation();

  const [uid, setUid] = useState(null);
  const [authReady, setAuthReady] = useState(false);

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
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setSavedMsg("");
      setErrorMsg("");

      if (!user) {
        setUid(null);
        setAuthReady(true);
        return;
      }

      setUid(user.uid);

      // ✅ Esto es lo que se ve en Home (displayName real)
      setProfile({
        displayName: user.displayName || "",
        email: user.email || "",
      });

      setAuthReady(true);
    });

    return () => unsub();
  }, []);

  const saveAll = async (e) => {
    e.preventDefault();
    setSavedMsg("");
    setErrorMsg("");

    if (!uid) {
      setErrorMsg(t("settings_error_not_logged") || "Debes iniciar sesión para guardar.");
      return;
    }

    const name = (profile.displayName || "").trim();

    setSaving(true);
    try {
      // ✅ Guardado REAL en Firebase (persistente)
      if (auth.currentUser && auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      setSavedMsg(t("settings_saved_ok") || "Configuración guardada.");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e2) {
      console.error(e2);
      setErrorMsg(t("settings_error_save") || "No se pudo guardar la configuración.");
    } finally {
      setSaving(false);
    }
  };

  if (!authReady) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-600">
            {t("settings_loading") || "Cargando ajustes..."}
          </div>
        </div>
      </div>
    );
  }

  if (!uid) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-slate-900">
            {t("settings_title") || "Ajustes"}
          </h1>
          <p className="text-slate-600 mt-2">
            {t("settings_need_login") || "Inicia sesión para ver y guardar tus ajustes."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{t("settings_title")}</h1>
        <p className="text-slate-600 mt-1">{t("settings_subtitle")}</p>
      </div>

      <form onSubmit={saveAll} className="space-y-8">
        {/* PERFIL */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              {t("settings_profile_title")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {t("settings_profile_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ✅ Nombre editable */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                {t("settings_profile_display_name")}
              </label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) =>
                  setProfile({ ...profile, displayName: e.target.value })
                }
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* ✅ Email fijo NO editable */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                {t("settings_profile_email")}
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none bg-slate-50 text-slate-500"
              />
            </div>
          </div>

          <div className="text-xs text-slate-500">
            {t("settings_profile_security_hint")}
          </div>
        </section>

        {/* APARIENCIA */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              {t("settings_appearance_title")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {t("settings_appearance_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                {t("settings_appearance_language")}
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
                >
                  <option value="ES">Español</option>
                  <option value="EUS">Euskara</option>
                  <option value="EN">English</option>
                  <option value="FR">Français</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
                  ▼
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                {t("settings_appearance_theme")}
              </label>
              <select
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={"light"}
                disabled
              >
                <option value="light">Claro (único disponible)</option>
              </select>
            </div>
          </div>
        </section>

        {/* NOTIFICACIONES (por ahora solo UI) */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              {t("settings_notifications_title")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {t("settings_notifications_desc")}
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-sky-600"
                checked={notifications.product}
                onChange={(e) =>
                  setNotifications({ ...notifications, product: e.target.checked })
                }
              />
              <div>
                <div className="text-sm font-medium">
                  {t("settings_notifications_product")}
                </div>
                <p className="text-xs text-slate-500">
                  {t("settings_notifications_product_hint")}
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-sky-600"
                checked={notifications.tips}
                onChange={(e) =>
                  setNotifications({ ...notifications, tips: e.target.checked })
                }
              />
              <div>
                <div className="text-sm font-medium">
                  {t("settings_notifications_tips")}
                </div>
                <p className="text-xs text-slate-500">
                  {t("settings_notifications_tips_hint")}
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-sky-600"
                checked={notifications.billing}
                onChange={(e) =>
                  setNotifications({ ...notifications, billing: e.target.checked })
                }
              />
              <div>
                <div className="text-sm font-medium">
                  {t("settings_notifications_billing")}
                </div>
                <p className="text-xs text-slate-500">
                  {t("settings_notifications_billing_hint")}
                </p>
              </div>
            </label>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          {savedMsg && (
            <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              {savedMsg}
            </div>
          )}
          {errorMsg && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? (t("settings_saving") || "Guardando...") : t("settings_cta_save")}
          </button>
        </div>
      </form>
    </div>
  );
}
