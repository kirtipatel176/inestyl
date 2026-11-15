"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, MessageSquare, MessageCircle, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STORE_DETAILS } from "@/constants";
import {
  MEN_SUBCATEGORIES,
  WOMEN_SUBCATEGORIES,
  SHOES_SUBCATEGORIES,
  CLOTHING_SUBCATEGORIES,
  getAvailableNavSubcategories,
  BRANDS_DATA,
} from "@/constants/mock-data";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquireClick: () => void;
}

export function MobileNavigation({ isOpen, onClose, onEnquireClick }: MobileNavigationProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { stop: stopScroll, start: startScroll } = useSmoothScroll();

  // Lock background scroll when mobile drawer is open
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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleWhatsAppAction = () => {
    const message = encodeURIComponent(
      "Hello iNESTYL OUTLET Kapadwanj, I am browsing your mobile catalogue and would like to check current store availability."
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${message}`, "_blank");
  };

  const availableMen = getAvailableNavSubcategories(MEN_SUBCATEGORIES, "Men");
  const availableWomen = getAvailableNavSubcategories(WOMEN_SUBCATEGORIES, "Women");
  const availableShoes = getAvailableNavSubcategories(SHOES_SUBCATEGORIES, undefined, "footwear");
  const availableClothing = getAvailableNavSubcategories(CLOTHING_SUBCATEGORIES, undefined, "clothing");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 xl:hidden"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            data-lenis-prevent
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] bg-[#FFFFFF] z-50 flex flex-col justify-between overflow-y-auto shadow-2xl border-l border-[#E5E7EB] saas-scrollbar overscroll-contain"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB] bg-[#F5F5F7]">
                <Link href="/" onClick={onClose} className="block">
                  <Image
                    src="/brand/logo-primary-stacked.svg"
                    alt="iNESTYL OUTLET"
                    width={130}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links (Matching Requirement 1 Structure) */}
              <div className="p-5 space-y-1">
                {/* 1. New Arrivals */}
                <Link
                  href="/new-arrivals"
                  onClick={onClose}
                  className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors border-b border-[#E5E7EB]/60"
                >
                  <span>New Arrivals</span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3]">
                    Fresh Drops
                  </span>
                </Link>

                {/* 2. Men (Expandable) */}
                <div className="border-b border-[#E5E7EB]/60 pb-1 pt-1">
                  <button
                    onClick={() => toggleSection("men")}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#1D1D1F]"
                  >
                    <span>Men</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#86868B] transition-transform duration-200 ${
                        expandedSection === "men" ? "rotate-180 text-[#0071E3]" : ""
                      }`}
                    />
                  </button>
                  {expandedSection === "men" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 py-2 space-y-2 border-l-2 border-[#0071E3] ml-1 my-1"
                    >
                      <Link
                        href="/men"
                        onClick={onClose}
                        className="block text-xs font-semibold text-[#0071E3] uppercase tracking-wider py-1"
                      >
                        All Men&apos;s Collection
                      </Link>
                      {availableMen.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={onClose}
                          className="block text-xs text-[#6E6E73] hover:text-[#0071E3] py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* 3. Women (Expandable) */}
                <div className="border-b border-[#E5E7EB]/60 pb-1 pt-1">
                  <button
                    onClick={() => toggleSection("women")}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#1D1D1F]"
                  >
                    <span>Women</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#86868B] transition-transform duration-200 ${
                        expandedSection === "women" ? "rotate-180 text-[#0071E3]" : ""
                      }`}
                    />
                  </button>
                  {expandedSection === "women" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 py-2 space-y-2 border-l-2 border-[#0071E3] ml-1 my-1"
                    >
                      <Link
                        href="/women"
                        onClick={onClose}
                        className="block text-xs font-semibold text-[#0071E3] uppercase tracking-wider py-1"
                      >
                        All Women&apos;s Collection
                      </Link>
                      {availableWomen.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={onClose}
                          className="block text-xs text-[#6E6E73] hover:text-[#0071E3] py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* 4. Shoes (Expandable) */}
                <div className="border-b border-[#E5E7EB]/60 pb-1 pt-1">
                  <button
                    onClick={() => toggleSection("shoes")}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#1D1D1F]"
                  >
                    <span>Shoes</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#86868B] transition-transform duration-200 ${
                        expandedSection === "shoes" ? "rotate-180 text-[#0071E3]" : ""
                      }`}
                    />
                  </button>
                  {expandedSection === "shoes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 py-2 space-y-2 border-l-2 border-[#0071E3] ml-1 my-1"
                    >
                      <Link
                        href="/shoes"
                        onClick={onClose}
                        className="block text-xs font-semibold text-[#0071E3] uppercase tracking-wider py-1"
                      >
                        All Shoes Directory
                      </Link>
                      {availableShoes.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={onClose}
                          className="block text-xs text-[#6E6E73] hover:text-[#0071E3] py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* 5. Clothing (Expandable) */}
                <div className="border-b border-[#E5E7EB]/60 pb-1 pt-1">
                  <button
                    onClick={() => toggleSection("clothing")}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#1D1D1F]"
                  >
                    <span>Clothing</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#86868B] transition-transform duration-200 ${
                        expandedSection === "clothing" ? "rotate-180 text-[#0071E3]" : ""
                      }`}
                    />
                  </button>
                  {expandedSection === "clothing" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 py-2 space-y-2 border-l-2 border-[#0071E3] ml-1 my-1"
                    >
                      <Link
                        href="/clothing"
                        onClick={onClose}
                        className="block text-xs font-semibold text-[#0071E3] uppercase tracking-wider py-1"
                      >
                        All Clothing Directory
                      </Link>
                      {availableClothing.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={onClose}
                          className="block text-xs text-[#6E6E73] hover:text-[#0071E3] py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* 6. Collections */}
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors border-b border-[#E5E7EB]/60"
                >
                  <span>Collections</span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#86868B]">
                    11 Curations
                  </span>
                </Link>

                {/* 7. Brands (Expandable) */}
                <div className="border-b border-[#E5E7EB]/60 pb-1 pt-1">
                  <button
                    onClick={() => toggleSection("brands")}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#1D1D1F]"
                  >
                    <span>Brands</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#86868B] transition-transform duration-200 ${
                        expandedSection === "brands" ? "rotate-180 text-[#0071E3]" : ""
                      }`}
                    />
                  </button>
                  {expandedSection === "brands" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 py-2 space-y-2 border-l-2 border-[#0071E3] ml-1 my-1"
                    >
                      <Link
                        href="/brands"
                        onClick={onClose}
                        className="block text-xs font-semibold text-[#0071E3] uppercase tracking-wider py-1"
                      >
                        All Brands Directory
                      </Link>
                      {BRANDS_DATA.map((b) => (
                        <Link
                          key={b.slug}
                          href={`/brands/${b.slug}`}
                          onClick={onClose}
                          className="block text-xs text-[#6E6E73] hover:text-[#0071E3] py-1"
                        >
                          {b.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* 8. Our Label */}
                <Link
                  href="/our-label"
                  onClick={onClose}
                  className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors border-b border-[#E5E7EB]/60"
                >
                  <span>Our Label</span>
                  <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                </Link>

                {/* Contact Us */}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block py-2.5 text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors border-b border-[#E5E7EB]/60"
                >
                  Contact Us
                </Link>

                {/* Visit Our Flagship Store */}
                <Link
                  href="/store"
                  onClick={onClose}
                  className="flex items-center gap-2 py-2.5 text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>Station Road, Kapadwanj, Gujarat</span>
                </Link>
              </div>
            </div>

            {/* Bottom Actions: WhatsApp & Enquire */}
            <div className="p-5 border-t border-[#E5E7EB] bg-[#F5F5F7] space-y-2.5">
              <button
                onClick={handleWhatsAppAction}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20BA5A] transition-colors shadow-subtle"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Enquire on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onEnquireClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-colors shadow-subtle"
              >
                <span>Submit Product Enquiry</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
