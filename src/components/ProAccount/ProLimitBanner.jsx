import React from "react";
import UpgradeBanner from "@/components/UpgradeBanner";

export default function ProLimitBanner({
  visible,
  message,
  to = "/pricing",
}) {
  if (!visible) return null;

  return (
    <>
      <div className="absolute left-6 md:left-8 right-6 md:right-8 top-1/2 -translate-y-1/2 z-10">
        <UpgradeBanner
          to={to}
          titleKey="pro_limit_banner_title"
          subtitleKey="pro_limit_banner_subtitle"
          ctaKey="pro_limit_banner_cta"
        />
      </div>

      {!!message && (
        <div className="absolute left-6 md:left-8 right-6 md:right-8 bottom-16 z-10">
          <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-3 text-center">
            <p className="text-[13px] sm:text-[14px] text-slate-700">
              {message}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
