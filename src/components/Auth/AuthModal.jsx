import React, { useEffect } from "react";
import AuthCard from "@/components/Auth/AuthCard";

export default function AuthModal({ open, onClose, onSuccess }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <div className="relative w-full max-w-[560px]">
        <AuthCard variant="modal" onSuccess={onSuccess} />
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50"
          aria-label="Cerrar"
        >
          ✕ 
        </button>
      </div>
    </div>
  );
}
