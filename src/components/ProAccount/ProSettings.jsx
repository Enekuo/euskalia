import React, { useEffect, useState } from "react";
import { useTranslation } from "@/lib/translations";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

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

  // 1) Detectar usuario logeado + cargar datos guardados
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        setErrorMsg("");
        setSavedMsg("");

        if (!user) {
          setUid(null);
          setAuthReady(true);
          return;
        }

        setUid(user.uid);

        // Prefill desde Firebase Auth (lo que viene de Google)
        setProfile({
          displayName: user.displayName || "",
          email: user.email || "",
        });

        // 2) Cargar settings guardados (Firestore) por UID
        const ref = doc(db, "pro_users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data() || {};

          // perfil
          if (data.profile?.displayName != null) {
            setProfile((prev) => ({
              ...prev,
              displayName: String(data.profile.displayName || ""),
              // email siempre del auth (fuente de verdad)
              email: user.email || prev.email || "",
            }));
          }

          // notificaciones
          if (data.notifications) {
            setNotifications((prev) => ({
              ...prev,
              product:
                typeof data.notifications.product === "boolean"
                  ? data.notifications.product
                  : prev.product,
              tips:
                typeof data.notifications.tips === "boolean"
                  ? data.notifications.tips
                  : prev.tips,
              billing:
                typeof data.notifications.billing === "boolean"
                  ? data.notifications.billing
                  : prev.billing,
            }));
          }

          // idioma guardado (opcional)
          if (data.appearance?.language && typeof data.appearance.language === "string") {
            // solo si es distinto para no “parpadear”
            if (data.appearance.language !== language) {
              setLanguage(data.appearance.language);
            }
          }
        }

        setAuthReady(true);
      } catch (e) {
        console.error(e);
        setErrorMsg(t("settings_error_load") || "No se pudieron cargar los ajustes.");
        setAuthReady(true);
      }
    });

    return () => unsub();
  }, [language, setLanguage, t]);

  // 3) Guardar de verdad en Firestore + actualizar displayName en Auth
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
      // A) Guardar settings por UID
      const ref = doc(db, "pro_users", uid);
      await setDoc(
        ref,
        {
          profile: {
            displayName: name,
            // email NO lo guardo editable (fuente real: Firebase Auth)
          },
          appearance: {
            language,
            theme: "light",
          },
          notifications: {
            product: !!notifications.product,
            tips: !!notifications.tips,
            billing: !!notifications.billing,
          },
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // B) Actualizar displayName en Firebase Auth (para que salga en header/home)
      if (auth.currentUser && name && auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      setSavedMsg(t("settings_saved_ok") || "Configuración guardada.");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      console.error(e);
      setErrorMsg(t("settings_error_save") || "No se pudo guardar la configuración.");
    } finally {
      setSaving(false);
    }
  };

  // Si aún no sabemos si hay user o no
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

  // Si no está logeado
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
      {/* TÍTULO */}
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

          {/* Nombre y email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre visible */}
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

            {/* Email (solo lectura: el real viene de Google/Firebase) */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                {t("settings_profile_email")}
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none bg-slate-50 text-slate-500"
                placeholder="nombre@ejemplo.com"
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

          {/* Selector idioma y tema */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selector idioma REAL de Euskalia */}
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

        {/* NOTIFICACIONES */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              {t("settings_notifications_title")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {t("settings_notifications_desc")}
            </p>
          </div>

          {/* Checks */}
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
                  setNotifications({
                    ...notifications,
                    tips: e.target.checked,
                  })
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
                  setNotifications({
                    ...notifications,
                    billing: e.target.checked,
                  })
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

        {/* PLAN Y SUSCRIPCIÓN */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-lg text-slate-900">
              {t("settings_plan_title")}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {t("settings_plan_desc")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            {/* Row: Plan */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm text-slate-600">
                {t("settings_plan_row_plan")}
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
                  {t("settings_plan_status_active")}
                </span>
              </div>

              <div className="text-sm font-semibold text-slate-900">
                {t("settings_plan_value_pro")}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Row: Renews + button */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm text-slate-600">
                {t("settings_plan_row_renews")}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-700">
                  {t("settings_plan_renews_value")}
                </div>

                <button
                  type="button"
                  onClick={() => alert(t("settings_plan_demo_alert"))}
                  className="
                    rounded-md border border-slate-300 bg-white px-3 py-2
                    text-sm font-medium text-slate-700 hover:bg-slate-50
                  "
                >
                  {t("settings_plan_cancel_btn")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback guardado/error */}
        {(savedMsg || errorMsg) && (
          <div className="flex justify-end">
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
          </div>
        )}

        {/* BOTÓN GUARDAR */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="
              rounded-lg bg-sky-600 hover:bg-sky-700 text-white
              px-4 py-2 text-sm font-medium
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {saving ? (t("settings_saving") || "Guardando...") : t("settings_cta_save")}
          </button>
        </div>
      </form>
    </div>
  );
}
