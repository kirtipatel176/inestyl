"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, MessageSquare, ArrowLeft } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export default function StorefrontError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[StorefrontError]", error);
  }, [error]);

  const handleWhatsAppContact = () => {
    const text = `Hello iNESTYL OUTLET Kapadwanj,\n\nI encountered a page display error on the store website. Can you help me browse stock?`;
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="container-luxury py-20 sm:py-28 flex flex-col items-center justify-center text-center">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-10 shadow-subtle space-y-6">
        {/* Error Crest */}
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0071E3] block">
            STOREFRONT RECOVERY
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed max-w-md mx-auto">
            We were unable to load this page of the catalogue. Your session and browsing history remain intact.
          </p>
        </div>

        {/* Flagship Store Guarantee Pill */}
        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-left space-y-1">
          <span className="text-xs font-semibold text-[#1D1D1F] block">
            Need Immediate Store Inventory Information?
          </span>
          <p className="text-[11px] text-[#86868B]">
            Our Kapadwanj store team is ready on WhatsApp for size checks, reservation requests, or live video trials.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0071E3] hover:bg-[#0066CC] text-white text-xs font-semibold tracking-normal transition-all shadow-subtle active:scale-98"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E5E7EB] hover:bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        <div className="pt-2 border-t border-[#F5F5F7]">
          <button
            type="button"
            onClick={handleWhatsAppContact}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0071E3] hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Kapadwanj Store Team</span>
          </button>
        </div>
      </div>
    </div>
  );
}
