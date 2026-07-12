import React from "react";
import { X, Copy, Check, Share2 } from "lucide-react";
import { useTranslation } from "@/lib/translations";

const BLUE = "#2563eb";

export default function ExpandModal({ open, onClose, title, content, onCopy, onShare, copiedFlash }) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-6xl h-full sm:h-auto sm:max-h-[85vh] bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-slate-200 bg-slate-50/60 shrink-0">
          <div className="text-sm font-medium text-slate-700">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label={t("translator.close")}
            title={t("translator.close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-8">
          <article className="prose prose-slate max-w-none">
            <div
              translate="no"
              className="whitespace-pre-line text-[16px] sm:text-[17px] leading-8 text-slate-800"
            >
              {content}
            </div>
          </article>
        </div>

        <div className="flex items-center justify-end gap-4 px-4 sm:px-6 h-14 border-t border-slate-200 bg-slate-50/60 shrink-0 text-slate-500">
          <button
            type="button"
            onClick={onCopy}
            title={copiedFlash ? t("translator.copied") : t("translator.copy")}
            aria-label={copiedFlash ? t("translator.copied") : t("translator.copy")}
            className="p-2 rounded-md hover:bg-slate-100"
          >
            {copiedFlash ? (
              <Check className="w-5 h-5" style={{ color: BLUE }} />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            onClick={onShare}
            title={t("translator.share")}
            aria-label={t("translator.share")}
            className="p-2 rounded-md hover:bg-slate-100"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
