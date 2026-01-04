const KEY = "euskalia_cookie_consent";

export function getCookieConsent() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "accepted" || v === "rejected") return v;
    return null;
  } catch {
    return null;
  }
}

export function setCookieConsent(value) {
  try {
    if (value !== "accepted" && value !== "rejected") return;
    localStorage.setItem(KEY, value);
  } catch {}
}

export function clearCookieConsent() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
