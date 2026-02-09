import React from "react";
import UpgradeBanner from "@/components/UpgradeBanner";

export default function ProLimitBanner({ visible, message }) {
  if (!visible) return null;

  return (
    <>
      <div className="absolute left-6 md:left-8 right-6 md:right-8 top-1/2 -translate-y-1/2 z-10">
        <UpgradeBanner />
      </div>

      {!!message && (
        <div className="absolute left-6 md:left-8 right-6 md:right-8 bottom-16 z-10 text-sm text-red-500 text-center">
          {message}
        </div>
      )}
    </>
  );
}
