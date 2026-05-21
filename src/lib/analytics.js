export const GA_ID = import.meta.env.VITE_GA_ID;

export const pageview = (url) => {
  if (!window.gtag || !GA_ID) return;

  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

export const trackEvent = (action, params = {}) => {
  if (!window.gtag) return;

  window.gtag("event", action, params);
};