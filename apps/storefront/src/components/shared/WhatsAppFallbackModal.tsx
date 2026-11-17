"use client";

import { useState } from "react";
import { MessageSquare, Phone, Copy, Check, ExternalLink, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STORE_DETAILS } from "@/constants";

interface WhatsAppFallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageText?: string;
  productTitle?: string;
}

/**
 * Fallback modal displayed when WhatsApp redirect is blocked or fails to open.
 */
export function WhatsAppFallbackModal({
  isOpen,
  onClose,
  messageText,
  productTitle,
}: WhatsAppFallbackModalProps) {
  const [copied, setCopied] = useState(false);

  const rawNumber = STORE_DETAILS.whatsappNumber; // e.g. "917984471196"
  const formattedNumber = "+91 79844 71196";

  const handleCopyNumber = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(formattedNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenDirect = () => {
    const encoded = messageText ? encodeURIComponent(messageText) : "";
    window.location.href = `https://wa.me/${rawNumber}?text=${encoded}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] p-6 sm:p-7 space-y-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                    KAPADWANJ STORE ASSISTANCE
                  </span>
                  <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
                    Connect with Store Team
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#86868B] leading-relaxed">
              If WhatsApp did not automatically open on your device, you can reach our Kapadwanj flagship outlet directly using the options below:
            </p>

            {productTitle && (
              <div className="p-3 bg-[#F5F5F7] rounded-xl text-xs text-[#1D1D1F] border border-[#E5E7EB]">
                <span className="text-[10px] uppercase font-bold text-[#86868B] block mb-0.5">Enquiring about:</span>
                <span className="font-semibold line-clamp-1">{productTitle}</span>
              </div>
            )}

            {/* Direct Options */}
            <div className="space-y-2.5">
              {/* Copy Number */}
              <div className="p-3.5 bg-[#F5F5F7] rounded-xl border border-[#E5E7EB] flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="text-[10px] uppercase font-bold text-[#86868B] block">Store Phone / WhatsApp</span>
                  <span className="text-sm font-bold text-[#1D1D1F] font-mono">{formattedNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:bg-[#E5E7EB] transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#0071E3]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Call Directly */}
              <a
                href={`tel:+${rawNumber}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#0071E3]" />
                <span>Call Kapadwanj Store Manager Directly</span>
              </a>

              {/* Retry WhatsApp */}
              <button
                type="button"
                onClick={handleOpenDirect}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold transition-all shadow-subtle active:scale-98"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Web WhatsApp</span>
              </button>
            </div>

            {/* Store Location note */}
            <div className="pt-2 border-t border-[#F5F5F7] flex items-center gap-2 text-[11px] text-[#86868B]">
              <MapPin className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
              <span>Station Road, Kapadwanj • Open daily 10 AM – 9 PM</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
