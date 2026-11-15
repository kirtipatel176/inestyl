"use client";

import Link from "next/link";
import { Ruler, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { STORE_DETAILS } from "@/constants";

export function CustomerAssistance() {
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET team, I would like assistance with finding the right footwear size and styles."
  )}`;

  return (
    <section className="container-luxury space-y-6">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          CONCIERGE &amp; SIZING
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
          Here to Help You Find the Right Pair.
        </h2>
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          Simple tools and personal guidance to ensure your next footwear or apparel choice fits perfectly.
        </p>
      </motion.div>

      {/* Three Clean Assistance Options (Restrained Apple Layout, No Heavy Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Option 1: Find Your Size */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#0071E3]/40 transition-colors shadow-subtle group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3]">
              <Ruler className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              Find Your Size
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
              Compare global footwear standards across UK, US, EU, and CM measurements, with specific brand fit recommendations.
            </p>
          </div>
          <div className="pt-5 border-t border-[#E5E7EB] mt-5">
            <Link
              href="/size-guide"
              className="text-xs font-semibold text-[#0071E3] hover:text-[#0066CC] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Size Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Option 2: Check Availability */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#0071E3]/40 transition-colors shadow-subtle group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              Check Availability
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
              Select any size and colour chip on our product pages to instantly view real-time store availability at Kapadwanj.
            </p>
          </div>
          <div className="pt-5 border-t border-[#E5E7EB] mt-5">
            <Link
              href="/products"
              className="text-xs font-semibold text-[#0071E3] hover:text-[#0066CC] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Browse Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Option 3: Ask Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#0071E3]/40 transition-colors shadow-subtle group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#1B8A42]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              Ask Our Team
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
              Have a specific model inquiry or want to request an in-store reservation? Chat directly with our store staff.
            </p>
          </div>
          <div className="pt-5 border-t border-[#E5E7EB] mt-5 flex items-center justify-between">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#1B8A42] hover:underline inline-flex items-center gap-1"
            >
              <span>WhatsApp Chat</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              className="text-xs text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
            >
              Store Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

