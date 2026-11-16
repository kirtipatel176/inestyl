"use client";

import { useState } from "react";
import { Wrench, RefreshCw, MessageSquare, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export default function MaintenancePage() {
  const [isChecking, setIsChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCheckStatus = async () => {
    setIsChecking(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (res.ok) {
        setStatusMessage("Store services are operational! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setStatusMessage("Maintenance is still underway. Please check back shortly.");
      }
    } catch {
      setStatusMessage("Maintenance is still underway. Please check back shortly.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleWhatsAppContact = () => {
    const text = `Hello iNESTYL OUTLET Kapadwanj,\n\nI noticed the website is undergoing scheduled maintenance. Is the physical Kapadwanj store open for shopping right now?`;
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="container-luxury py-20 sm:py-28 text-center max-w-xl mx-auto space-y-8">
      {/* Plinth */}
      <div className="w-16 h-16 rounded-2xl bg-[#0071E3]/10 border border-[#0071E3]/20 text-[#0071E3] flex items-center justify-center mx-auto shadow-xs">
        <Wrench className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full inline-block">
          SCHEDULED SYSTEM UPGRADE
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Catalogue Maintenance in Progress
        </h1>
        <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed max-w-md mx-auto">
          We are currently refreshing our verified authentic inventory, updating pricing tiers, and enhancing database performance.
        </p>
      </div>

      {/* Flagship Store Card */}
      <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-subtle text-left space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E5E7EB]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
            Physical Flagship Store Open as Usual
          </h2>
        </div>

        <div className="space-y-3 text-xs text-[#1D1D1F]">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Station Road, Kapadwanj, Gujarat 387620</p>
              <p className="text-[11px] text-[#86868B]">Near Main Station Circle • Trial rooms and free parking available</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">10:00 AM – 9:00 PM (Daily)</p>
              <p className="text-[11px] text-[#86868B]">Open 7 days a week for in-person shopping</p>
            </div>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F] border border-[#E5E7EB] flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0071E3]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleCheckStatus}
          disabled={isChecking}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? "animate-spin" : ""}`} />
          <span>{isChecking ? "Checking System..." : "Check System Status"}</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsAppContact}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20BD5A] transition-all shadow-subtle"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp Store Concierge</span>
        </button>
      </div>
    </div>
  );
}
