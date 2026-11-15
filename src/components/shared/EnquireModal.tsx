"use client";

import { useState, useEffect } from "react";
import { X, MessageSquare, MapPin, Clock } from "lucide-react";
import { STORE_DETAILS } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  productContext?: {
    title: string;
    sku: string;
    outletPrice: number;
    size?: string;
  };
}

export function EnquireModal({ isOpen, onClose, productContext }: EnquireModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { stop: stopScroll, start: startScroll } = useSmoothScroll();

  // Lock background Lenis smooth scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      stopScroll();
    } else {
      startScroll();
    }
    return () => {
      startScroll();
    };
  }, [isOpen, stopScroll, startScroll]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleWhatsAppDirect = () => {
    let msg = `Hello iNESTYL OUTLET Kapadwanj,\n\nI would like to enquire about store availability:`;
    if (productContext) {
      msg += `\n• Product: ${productContext.title}`;
      msg += `\n• SKU: ${productContext.sku}`;
      if (productContext.size) msg += `\n• Size: UK ${productContext.size}`;
      msg += `\n• Outlet Price: ₹${productContext.outletPrice.toLocaleString("en-IN")}`;
    }
    if (name) msg += `\n• Name: ${name}`;
    if (notes) msg += `\n• Note: ${notes}`;
    msg += `\n\nPlease let me know if this is available for reservation or pickup.`;

    const url = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative z-10 w-full max-w-lg bg-[#FFFFFF] rounded-2xl shadow-dropdown border border-[#E5E7EB] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB] bg-[#F5F5F7]">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] block">
                  Store Service
                </span>
                <h3 className="font-heading text-lg font-semibold text-[#1D1D1F] mt-0.5">
                  Product Enquiry &amp; Reservation
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#86868B] hover:text-[#1D1D1F] rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {productContext && (
                <div className="p-3.5 bg-[#F5F5F7] rounded-lg border border-[#E5E7EB] mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                    Enquiring About
                  </span>
                  <div className="font-semibold text-sm text-[#1D1D1F] mt-0.5">
                    {productContext.title}
                  </div>
                  <div className="text-xs text-[#86868B] mt-0.5">
                    SKU: {productContext.sku} • Outlet Price: ₹
                    {productContext.outletPrice.toLocaleString("en-IN")}
                    {productContext.size && ` • Size: UK ${productContext.size}`}
                  </div>
                </div>
              )}

              {/* Quick WhatsApp Action */}
              <button
                onClick={handleWhatsAppDirect}
                className="w-full flex items-center justify-center gap-2.5 min-h-[44px] py-3 px-6 rounded-full bg-[#25D366] text-white font-medium text-sm hover:bg-[#1EBE5D] transition-all shadow-subtle mb-5 active:scale-98 group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Connect Instantly on WhatsApp
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-[#E5E7EB] w-full" />
                <span className="bg-[#FFFFFF] px-3 text-xs text-[#86868B] uppercase font-medium absolute">
                  or submit enquiry form
                </span>
              </div>

              {submitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-emerald-800 text-sm font-medium">
                  Thank you! Our Kapadwanj store team will contact you shortly via WhatsApp / Phone.
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                      Enquiry Note (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ask about size availability, store reservation or product details..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] py-2.5 px-6 rounded-full bg-[#0071E3] text-white text-xs font-semibold tracking-normal hover:bg-[#0066CC] transition-colors flex items-center justify-center active:scale-98"
                  >
                    Submit Store Enquiry
                  </button>
                </form>
              )}

              {/* Store Info Footer */}
              <div className="mt-5 pt-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-2 text-[11px] text-[#86868B]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>Kapadwanj, Gujarat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>10 AM – 9 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
