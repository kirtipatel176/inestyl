"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#E5E7EB]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                variant === "danger"
                  ? "bg-red-50 text-red-600"
                  : variant === "warning"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-blue-50 text-[#0071E3]"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-[#1D1D1F]">{title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-[#86868B] hover:text-[#1D1D1F] p-1 rounded-full hover:bg-[#F5F5F7]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#6E6E73] leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-full border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 rounded-full text-xs font-semibold text-white transition-colors ${
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : variant === "warning"
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-[#0071E3] hover:bg-[#0066CC]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
