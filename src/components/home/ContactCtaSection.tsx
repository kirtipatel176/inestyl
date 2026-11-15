"use client";

import Link from "next/link";
import { MessageSquare, ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { STORE_DETAILS } from "@/constants";

export function ContactCtaSection() {
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET, I would like to enquire about styles, sizes, and availability."
  )}`;

  return (
    <section className="container-luxury py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-10 sm:p-16 lg:p-20 text-center space-y-8 shadow-subtle relative overflow-hidden"
      >
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0071E3]/5 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0071E3] block">
            STORE CONCIERGE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1D1D1F] tracking-tight leading-[1.12]">
            Find Your Next Favourite.
          </h2>
          <p className="text-base sm:text-lg text-[#6E6E73] font-normal leading-relaxed max-w-xl mx-auto">
            Questions about sizes, colours or availability? We&apos;re here to help.
          </p>
        </div>

        {/* Action Buttons Matrix: Contact Us + WhatsApp */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
          {/* Button 1: Contact Us */}
          <Link
            href="/contact"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#0071E3] text-white text-sm font-medium hover:bg-[#0066CC] transition-all shadow-subtle hover:-translate-y-0.5 active:scale-98 group"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Button 2: Enquire on WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#1EBE5D] transition-all shadow-subtle hover:-translate-y-0.5 active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>

        {/* Supporting verified store indicator */}
        <div className="pt-4 border-t border-[#E5E7EB]/70 max-w-md mx-auto flex items-center justify-center gap-2 text-xs text-[#86868B] relative z-10">
          <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>Flagship Outlet • {STORE_DETAILS.fullAddress}</span>
        </div>
      </motion.div>
    </section>
  );
}

