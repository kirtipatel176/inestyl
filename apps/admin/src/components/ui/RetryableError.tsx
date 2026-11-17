"use client";

import { AlertTriangle, RefreshCw, Home, MessageSquare } from "lucide-react";
import Link from "next/link";
import { STORE_DETAILS } from "@/constants";

interface RetryableErrorProps {
  title?: string;
  message?: string;
  statusCode?: number | string;
  onRetry?: () => void;
  isRetrying?: boolean;
  homeHref?: string;
  showWhatsAppHelp?: boolean;
  className?: string;
}

/**
 * Reusable error state component with built-in retry action and WhatsApp assistance fallback.
 */
export function RetryableError({
  title = "Unable to Load Information",
  message = "A temporary network or server error occurred while retrieving this data.",
  statusCode,
  onRetry,
  isRetrying = false,
  homeHref,
  showWhatsAppHelp = true,
  className = "",
}: RetryableErrorProps) {
  const handleWhatsAppContact = () => {
    const text = `Hello iNESTYL OUTLET Kapadwanj,\n\nI encountered an error on the site (${statusCode || "Network"}). Can you assist me?`;
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div
      className={`p-8 sm:p-10 rounded-2xl bg-white border border-[#E5E7EB] text-center space-y-5 max-w-lg mx-auto shadow-subtle ${className}`}
      role="alert"
    >
      {/* Icon Plinth */}
      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        {statusCode && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block">
            Status {statusCode}
          </span>
        )}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#1D1D1F]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed max-w-md mx-auto">
          {message}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0066CC] text-white text-xs font-semibold tracking-normal transition-all shadow-subtle active:scale-98 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? "animate-spin" : ""}`} />
            <span>{isRetrying ? "Retrying..." : "Try Again"}</span>
          </button>
        )}

        {homeHref && (
          <Link
            href={homeHref}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        )}

        {showWhatsAppHelp && (
          <button
            type="button"
            onClick={handleWhatsAppContact}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] hover:bg-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Kapadwanj Support</span>
          </button>
        )}
      </div>
    </div>
  );
}
