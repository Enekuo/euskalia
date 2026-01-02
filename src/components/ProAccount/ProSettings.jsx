import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/lib/translations";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function ProSettings() {
  const { language, setLanguage, t } = useTranslation();

  const tr = (key, fallback = "") => t(key) || fallback;

  const db = useMemo(() => getFirestore(), []);

  const [user, setUser] = useState(null);

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

  const firstNameOnly = (name) => {
    const s = String(name || "").trim();
    if (!s) return "";
    return s.split(" ")[0]; // ✅ SOLO primer nombre
  };

  // ✅ Cargar datos reales del usuario logeado (nombre + email)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u || null);

      if (!u) {
        setProfile({ displayName: "", email: "" });
        return;
      }

      // 1) Preferimos Firebase Auth
      const authName = firstNameOnly(u.displayName);
      const authEmail = u.email || "";

      // 2) Si existe Firestore, lo usamos como fallback/override si tiene displayName
      let fsName = "";
      try {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() || {};
          if (typeof data.displayName === "string") {
            fsName = firstNameOnly(data.displayName);
          }
        }
      } catch {
        // si falla Firestore, no rompemos nada
      }

      setProfile({
        displayName: fsName || authName || "",
        email: authEmail,
      });
    });

    return () => unsub();
  }, [db]);

  const saveAll = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setSavedMsg("");

    try {
      const newFirstName = firstNameOnly(profile.displayName);

      // ✅ 1) Guardar en Firebase Auth (esto es lo que usarás en Home)
      // Guardamos SOLO primer nombre para que siempre salga así.
      await updateProfile(user, { displayName: newFirstName });

      // ✅ 2) Guardar también en Firestore (persistencia)
      try {
        const ref = doc(db, "users", user.uid);
        await setDoc(
          ref,
          {
            displayName: newFirstName,
            email: user.email || "",
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch {
        // si Firestore falla, al menos Auth ya quedó actualizado
      }

      // ✅ refrescar estado local
      setProfile((p) => ({ ...p, displayName: newFirstName, email: user.email || p.email }));

      setSavedMsg(tr("settings_saved_ok", "Configuración guardada."));
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (err) {
      console.error(err);
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
        <h1 className="text-2xl font-bold text-slate-900">{t("settings_title")}</h1>
        <p className="text-slate-600 mt-1">{t("settings_subtitle")}</p>
      </div>

      <form onSubmit={saveAll} className="space-y-8">
        {/* PERFIL */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">{t("settings_profile_title")}</h2>
            <p className="text-slate-600 text-sm mt-1">{t("settings_profile_desc")}</p>
          </div>

          {/* Nombre y email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ✅ Nombre visible (editable) */}
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
                placeholder={tr("settings_profile_display_name_ph", "Tu nombre")}
              />
            </div>

            {/* ✅ Email (solo lectura, NO editable) */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                {t("settings_profile_email")}
              </label>
              <input
                type="email"
                value={profile.email}
                readOnly
                disabled
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div className="text-xs text-slate-500">{t("settings_profile_security_hint")}</div>
        </section>

        {/* APARIENCIA */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">{t("settings_appearance_title")}</h2>
            <p className="text-slate-600 text-sm mt-1">{t("settings_appearance_desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Idioma */}
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

            {/* Tema */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                {t("settings_appearance_theme")}
              </label>

              <select
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 cursor-not-allowed"
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
            <h2 className="font-semibold text-lg text-slate-900">{t("settings_notifications_title")}</h2>
            <p className="text-slate-600 text-sm mt-1">{t("settings_notifications_desc")}</p>
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
                <div className="text-sm font-medium">{t("settings_notifications_product")}</div>
                <p className="text-xs text-slate-500">{t("settings_notifications_product_hint")}</p>
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
                <div className="text-sm font-medium">{t("settings_notifications_tips")}</div>
                <p className="text-xs text-slate-500">{t("settings_notifications_tips_hint")}</p>
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
                <div className="text-sm font-medium">{t("settings_notifications_billing")}</div>
                <p className="text-xs text-slate-500">{t("settings_notifications_billing_hint")}</p>
              </div>
            </label>
          </div>
        </section>

        {/* ✅ PLAN Y SUSCRIPCIÓN (RESTAURADO) */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4">
            <h2 className="font-semibold text-lg text-slate-900">{t("settings_plan_title")}</h2>
            <p className="text-slate-600 text-sm mt-1">{t("settings_plan_desc")}</p>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm text-slate-600">{t("settings_plan_row_plan")}</div>

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

            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm text-slate-600">{t("settings_plan_row_renews")}</div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-700">{t("settings_plan_renews_value")}</div>

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

        {/* BOTÓN GUARDAR + mensaje */}
        <div className="flex items-center justify-end gap-3">
          {!!savedMsg && <div className="text-sm text-slate-600">{savedMsg}</div>}

          <button
            type="submit"
            disabled={saving || !user}
            className="
              rounded-lg bg-sky-600 hover:bg-sky-700 text-white
              px-4 py-2 text-sm font-medium
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {saving ? tr("settings_saving", "Guardando...") : t("settings_cta_save")}
          </button>
        </div>
      </form>
    </div>
  );
}
