"use client";

import { AlertCircle } from "lucide-react";

interface UnsavedChangesDialogProps {
  isOpen: boolean;
  onDiscard: () => void;
  onKeepEditing: () => void;
}

export function UnsavedChangesDialog({
  isOpen,
  onDiscard,
  onKeepEditing,
}: UnsavedChangesDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
              Unsaved Changes
            </h3>
            <p className="text-[11px] text-[#86868B]">You have unsaved changes in this form.</p>
          </div>
        </div>

        <p className="text-xs text-[#6E6E73] leading-relaxed">
          If you leave now, any details or stock changes you entered will be lost. Are you sure you want to discard your edits?
        </p>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={onKeepEditing}
            className="px-4 py-2 rounded-full border border-[#E5E7EB] text-xs font-semibold hover:bg-[#F5F5F7]"
          >
            Keep Editing
          </button>
          <button
            type="button"
            onClick={onDiscard}
            className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
          >
            Discard Changes
          </button>
        </div>
      </div>
    </div>
  );
}
