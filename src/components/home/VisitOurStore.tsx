"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, Navigation, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { STORE_DETAILS } from "@/constants";

export function VisitOurStore() {
  // If physical store info is unavailable, hide section until configured
  if (!STORE_DETAILS.name || !STORE_DETAILS.fullAddress) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET, I would like to visit the Kapadwanj store and check available styles."
  )}`;

  return (
    <section className="container-luxury space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E7EB]"
      >
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-1">
            FLAGSHIP STORE
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
            Visit Our Kapadwanj Store
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
            Experience authentic footwear and apparel in person. Try on sizes and explore our complete inventory.
          </p>
        </div>
        <Link
          href="/store"
          className="text-xs sm:text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors self-start sm:self-auto"
        >
          <span>Store Information</span>
        </Link>
      </motion.div>

      {/* Main Store Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 sm:p-8 lg:p-10 shadow-subtle">
        {/* Left: Actual Store Photography Mosaic (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 grid grid-cols-2 gap-4 h-full"
        >
          {/* Main Primary View */}
          <div className="relative col-span-2 sm:col-span-1 h-64 sm:h-full min-h-[260px] rounded-xl overflow-hidden border border-[#E5E7EB] group">
            <Image
              src="/images/store/store-interior-1.webp"
              alt="iNESTYL OUTLET Flagship Footwear Display"
              fill
              loading="lazy"
              quality={80}
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute bottom-3 left-3 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
              Sneaker Display Wall
            </div>
          </div>

          {/* Right Stack of 2 Views */}
          <div className="hidden sm:grid grid-rows-2 gap-4 col-span-1 h-full min-h-[260px]">
            <div className="relative rounded-xl overflow-hidden border border-[#E5E7EB] group">
              <Image
                src="/images/store/store-interior-2.webp"
                alt="iNESTYL OUTLET Apparel Curation"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
                Apparel Curation
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-[#E5E7EB] group">
              <Image
                src="/images/store/store-interior-3.webp"
                alt="iNESTYL OUTLET Boutique Interior"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover group-hover:scale-104 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full">
                Fitting &amp; Try-On
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Operational Details & Action Links (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between space-y-6 pt-2"
        >
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6E73] bg-[#F5F5F7] px-2.5 py-1 rounded-full">
                Flagship Destination
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#1D1D1F] mt-2">
                {STORE_DETAILS.name}
              </h3>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 text-sm text-[#1D1D1F]">
              <MapPin className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{STORE_DETAILS.fullAddress}</p>
                <p className="text-xs text-[#6E6E73] mt-0.5">Station Road market area, Kapadwanj</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-3 text-sm text-[#1D1D1F]">
              <Clock className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{STORE_DETAILS.hours}</p>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">Open Today for In-Person Discovery</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-sm text-[#1D1D1F]">
              <Phone className="w-4 h-4 text-[#0071E3] flex-shrink-0" />
              <a
                href={`tel:${STORE_DETAILS.phoneDisplay.replace(/\s+/g, "")}`}
                className="hover:text-[#0071E3] transition-colors"
              >
                {STORE_DETAILS.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Action Buttons Matrix */}
          <div className="space-y-2.5 pt-4 border-t border-[#E5E7EB]">
            {/* Get Directions Link (Maps) */}
            <a
              href={STORE_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-medium hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>

            {/* Contact Store & WhatsApp Pill Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href="/contact"
                className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#E5E7EB] text-xs font-medium text-[#1D1D1F] hover:border-[#1D1D1F] transition-all bg-[#FFFFFF]"
              >
                <span>Contact Store</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-xs font-semibold text-[#1B8A42] hover:bg-[#25D366]/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

