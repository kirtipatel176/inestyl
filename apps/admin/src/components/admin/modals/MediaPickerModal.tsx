"use client";

import { X } from "lucide-react";
import { MediaLibraryTab } from "../tabs/MediaLibraryTab";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, publicId: string) => void;
  title?: string;
}

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = "Select Image from Cloudinary Media Library",
}: MediaPickerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#F5F5F7] rounded-3xl shadow-2xl overflow-hidden border border-[#E5E7EB] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-white border-b border-[#E5E7EB] flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-sm font-bold text-[#1D1D1F]">{title}</h3>
            <p className="text-[11px] text-[#86868B]">
              Pick an existing optimized Cloudinary asset or upload new photography directly.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#86868B] hover:text-[#1D1D1F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <MediaLibraryTab
            onSelectImage={(url, publicId) => {
              onSelect(url, publicId);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
