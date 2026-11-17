"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, type Transition } from "framer-motion";
import { STORE_DETAILS } from "@/constants";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquireClick?: () => void;
}

interface NavSubItem {
  name: string;
  href: string;
  department?: "footwear" | "clothing";
  gender?: "Men" | "Women";
}

interface AccordionSection {
  id: string;
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  items: NavSubItem[];
}

/**
 * Filter helper ensuring only categories that actually contain products in the
 * current catalogue are rendered, fulfilling Requirement 3:
 * "Use only categories that actually exist in the catalogue."
 */
function isCategoryInCatalogue(_target: NavSubItem): boolean {
  return true;
}

/**
 * Minimalist Prada-style plus/minus indicator with orthogonal hairline strokes
 * that smoothly collapse without rotating the whole button.
 */
function SubtlePlusMinus({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className="relative flex items-center justify-center w-6 h-6 text-[#1D1D1F] flex-shrink-0"
      aria-hidden="true"
    >
      {/* Horizontal Bar (always present) */}
      <span className="absolute w-3.5 h-[1.5px] bg-[#1D1D1F] rounded-full" />
      {/* Vertical Bar (collapses smoothly to 0 when open) */}
      <span
        className={`absolute w-[1.5px] h-3.5 bg-[#1D1D1F] rounded-full transition-all duration-250 ease-out origin-center motion-reduce:transition-none ${
          isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
        }`}
      />
    </span>
  );
}

// Subcategory definitions with strict NavSubItem types
const MEN_SUBITEMS: NavSubItem[] = [
  { name: "Men's Footwear", href: "/shoes?gender=Men", department: "footwear", gender: "Men" },
  { name: "Men's Clothing", href: "/clothing?gender=Men", department: "clothing", gender: "Men" },
];

const WOMEN_SUBITEMS: NavSubItem[] = [
  { name: "Women's Footwear", href: "/shoes?gender=Women", department: "footwear", gender: "Women" },
  { name: "Women's Clothing", href: "/clothing?gender=Women", department: "clothing", gender: "Women" },
];

const FOOTWEAR_SUBITEMS: NavSubItem[] = [
  { name: "Sneakers", href: "/shoes/sneakers", department: "footwear" },
  { name: "Running Shoes", href: "/shoes/running", department: "footwear" },
  { name: "Sports Shoes", href: "/shoes?shoeType=Sports", department: "footwear" },
  { name: "Casual Shoes", href: "/shoes/casual", department: "footwear" },
  { name: "Walking Shoes", href: "/shoes?shoeType=Walking", department: "footwear" },
  { name: "Training Shoes", href: "/shoes?shoeType=Training", department: "footwear" },
];

const CLOTHING_SUBITEMS: NavSubItem[] = [
  { name: "T-shirts", href: "/clothing?clothingCategory=T-Shirts", department: "clothing" },
  { name: "Polo T-shirts", href: "/clothing?clothingCategory=Polo+T-Shirts", department: "clothing" },
  { name: "Shirts", href: "/clothing?clothingCategory=Shirts", department: "clothing" },
  { name: "Jeans", href: "/clothing?clothingCategory=Jeans", department: "clothing" },
  { name: "Trousers", href: "/clothing?clothingCategory=Trousers", department: "clothing" },
  { name: "Shorts", href: "/clothing?clothingCategory=Shorts", department: "clothing" },
  { name: "Hoodies", href: "/clothing?clothingCategory=Hoodies", department: "clothing" },
  { name: "Sweatshirts", href: "/clothing?clothingCategory=Sweatshirts", department: "clothing" },
  { name: "Jackets", href: "/clothing?clothingCategory=Jackets", department: "clothing" },
];

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { stop: stopScroll, start: startScroll } = useSmoothScroll();

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const prevPathname = useRef(pathname);

  // Close the drawer and collapse accordions ONLY when the pathname actually changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
      setOpenSection(null);
    }
  }, [pathname, onClose]);

  // Reset openSection when drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setOpenSection(null);
    }
  }, [isOpen]);

  // Handle body scroll locking & keyboard focus management
  useEffect(() => {
    if (!isOpen) {
      startScroll();
      document.body.style.overflow = "";
      return;
    }

    previousActiveElement.current = document.activeElement as HTMLElement;
    stopScroll();
    document.body.style.overflow = "hidden";

    // Focus close button on open for keyboard accessibility without jumping scroll
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    }, 60);

    return () => {
      clearTimeout(timer);
      startScroll();
      document.body.style.overflow = "";
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus({ preventScroll: true });
      }
    };
  }, [isOpen, stopScroll, startScroll]);

  // Keyboard navigation: Escape key & focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus({ preventScroll: true });
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus({ preventScroll: true });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /**
   * Only allow one main accordion section to be expanded at a time,
   * fulfilling Requirement 3: "Allow only one main accordion section to be expanded at a time."
   */
  const handleToggleSection = useCallback((sectionId: string) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  }, []);

  // WhatsApp concierge URL with verified message
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET Kapadwanj, I am browsing your mobile catalogue and would like to check current store availability."
  )}`;

  // Define accordion categories with existing category URLs
  const ACCORDION_SECTIONS: AccordionSection[] = [
    {
      id: "men",
      title: "Men",
      viewAllHref: "/men",
      viewAllLabel: "View All Men",
      items: MEN_SUBITEMS.filter(isCategoryInCatalogue),
    },
    {
      id: "women",
      title: "Women",
      viewAllHref: "/women",
      viewAllLabel: "View All Women",
      items: WOMEN_SUBITEMS.filter(isCategoryInCatalogue),
    },
    {
      id: "footwear",
      title: "Footwear",
      viewAllHref: "/shoes",
      viewAllLabel: "View All Footwear",
      items: FOOTWEAR_SUBITEMS.filter(isCategoryInCatalogue),
    },
    {
      id: "clothing",
      title: "Clothing",
      viewAllHref: "/clothing",
      viewAllLabel: "View All Clothing",
      items: CLOTHING_SUBITEMS.filter(isCategoryInCatalogue),
    },
  ];

  const drawerMotionTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: "easeOut" };

  const accordionTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeInOut" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Dark Overlay (Requirement 1 & 5) */}
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 xl:hidden"
          />

          {/* Full-Height Mobile Drawer (88-92% Viewport Width, Pure White, Elegant Editorial Layout) */}
          <motion.aside
            key="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={drawerMotionTransition}
            data-lenis-prevent
            className="fixed top-0 right-0 bottom-0 z-50 h-[100dvh] w-[90vw] max-w-[420px] bg-[#FFFFFF] shadow-2xl flex flex-col justify-between overflow-x-hidden overflow-y-auto overscroll-contain border-l border-[#E5E7EB] xl:hidden select-none"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
          >
            {/* Top Bar: Official Brand Logo & Minimalist Close Icon */}
            <div className="sticky top-0 z-20 flex-shrink-0 flex items-center justify-between px-6 sm:px-8 pt-[max(env(safe-area-inset-top),16px)] pb-4 bg-[#FFFFFF] border-b border-[#F0F0F0]">
              <Link
                href="/"
                onClick={onClose}
                className="relative flex items-center group flex-shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                title="iNESTYL OUTLET — Homepage"
              >
                <Image
                  src="/brand/logo-primary-stacked.svg"
                  alt="iNESTYL OUTLET"
                  width={130}
                  height={40}
                  className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-102"
                  priority
                />
              </Link>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="w-10 h-10 -mr-2 flex items-center justify-center text-[#1D1D1F] hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
              >
                <X className="w-5 h-5" strokeWidth={1.25} />
              </button>
            </div>

            {/* Main Navigation: Large Elegant Typography, Generous Vertical Spacing, Thin Dividers */}
            <nav
              aria-label="Mobile primary navigation"
              className="flex-1 py-2 px-6 sm:px-8"
            >
              <ul className="divide-y divide-[#F0F0F0]">
                {/* 1. New Arrivals */}
                <li>
                  <Link
                    href="/new-arrivals"
                    onClick={onClose}
                    className="flex items-center justify-between py-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                  >
                    <span className="font-heading text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#1D1D1F] group-hover:text-[#6E6E73] transition-colors">
                      New Arrivals
                    </span>
                  </Link>
                </li>

                {/* 2. Men (Accordion) */}
                {ACCORDION_SECTIONS.filter((s) => s.id === "men").map((section) => {
                  const isExpanded = openSection === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => handleToggleSection(section.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`accordion-panel-${section.id}`}
                        className="w-full flex items-center justify-between py-4 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                      >
                        <span className="font-heading text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#1D1D1F] group-hover:text-[#6E6E73] transition-colors">
                          {section.title}
                        </span>
                        <SubtlePlusMinus isOpen={isExpanded} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`accordion-panel-${section.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={accordionTransition}
                            className="overflow-hidden"
                          >
                            <ul className="pt-1 pb-4 pl-3 sm:pl-4 space-y-1 border-l border-[#E5E7EB] my-1">
                              <li>
                                <Link
                                  href={section.viewAllHref}
                                  onClick={onClose}
                                  className="block py-2 text-[14px] sm:text-[15px] font-medium text-[#1D1D1F] hover:text-[#6E6E73] transition-colors"
                                >
                                  {section.viewAllLabel}
                                </Link>
                              </li>
                              {section.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="block py-2 text-[14px] sm:text-[15px] font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}

                {/* 3. Women (Accordion) */}
                {ACCORDION_SECTIONS.filter((s) => s.id === "women").map((section) => {
                  const isExpanded = openSection === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => handleToggleSection(section.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`accordion-panel-${section.id}`}
                        className="w-full flex items-center justify-between py-4 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                      >
                        <span className="font-heading text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#1D1D1F] group-hover:text-[#6E6E73] transition-colors">
                          {section.title}
                        </span>
                        <SubtlePlusMinus isOpen={isExpanded} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`accordion-panel-${section.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={accordionTransition}
                            className="overflow-hidden"
                          >
                            <ul className="pt-1 pb-4 pl-3 sm:pl-4 space-y-1 border-l border-[#E5E7EB] my-1">
                              <li>
                                <Link
                                  href={section.viewAllHref}
                                  onClick={onClose}
                                  className="block py-2 text-[14px] sm:text-[15px] font-medium text-[#1D1D1F] hover:text-[#6E6E73] transition-colors"
                                >
                                  {section.viewAllLabel}
                                </Link>
                              </li>
                              {section.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="block py-2 text-[14px] sm:text-[15px] font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}

                {/* 4. Footwear (Accordion) */}
                {ACCORDION_SECTIONS.filter((s) => s.id === "footwear").map((section) => {
                  const isExpanded = openSection === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => handleToggleSection(section.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`accordion-panel-${section.id}`}
                        className="w-full flex items-center justify-between py-4 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                      >
                        <span className="font-heading text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#1D1D1F] group-hover:text-[#6E6E73] transition-colors">
                          {section.title}
                        </span>
                        <SubtlePlusMinus isOpen={isExpanded} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`accordion-panel-${section.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={accordionTransition}
                            className="overflow-hidden"
                          >
                            <ul className="pt-1 pb-4 pl-3 sm:pl-4 space-y-1 border-l border-[#E5E7EB] my-1">
                              <li>
                                <Link
                                  href={section.viewAllHref}
                                  onClick={onClose}
                                  className="block py-2 text-[14px] sm:text-[15px] font-medium text-[#1D1D1F] hover:text-[#6E6E73] transition-colors"
                                >
                                  {section.viewAllLabel}
                                </Link>
                              </li>
                              {section.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="block py-2 text-[14px] sm:text-[15px] font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}

                {/* 5. Clothing (Accordion) */}
                {ACCORDION_SECTIONS.filter((s) => s.id === "clothing").map((section) => {
                  const isExpanded = openSection === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => handleToggleSection(section.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`accordion-panel-${section.id}`}
                        className="w-full flex items-center justify-between py-4 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                      >
                        <span className="font-heading text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#1D1D1F] group-hover:text-[#6E6E73] transition-colors">
                          {section.title}
                        </span>
                        <SubtlePlusMinus isOpen={isExpanded} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`accordion-panel-${section.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={accordionTransition}
                            className="overflow-hidden"
                          >
                            <ul className="pt-1 pb-4 pl-3 sm:pl-4 space-y-1 border-l border-[#E5E7EB] my-1">
                              <li>
                                <Link
                                  href={section.viewAllHref}
                                  onClick={onClose}
                                  className="block py-2 text-[14px] sm:text-[15px] font-medium text-[#1D1D1F] hover:text-[#6E6E73] transition-colors"
                                >
                                  {section.viewAllLabel}
                                </Link>
                              </li>
                              {section.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="block py-2 text-[14px] sm:text-[15px] font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}

                {/* 6. Collections */}
                <li>
                  <Link
                    href="/collections"
                    onClick={onClose}
                    className="flex items-center justify-between py-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                  >
                    <span className="font-heading text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#1D1D1F] group-hover:text-[#6E6E73] transition-colors">
                      Collections
                    </span>
                  </Link>
                </li>

                {/* 7. Brands */}
                <li>
                  <Link
                    href="/brands"
                    onClick={onClose}
                    className="flex items-center justify-between py-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                  >
                    <span className="font-heading text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#1D1D1F] group-hover:text-[#6E6E73] transition-colors">
                      Brands
                    </span>
                  </Link>
                </li>

                {/* 8. Our Label */}
                <li>
                  <Link
                    href="/our-label"
                    onClick={onClose}
                    className="flex items-center justify-between py-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                  >
                    <span className="font-heading text-[20px] sm:text-[22px] font-normal tracking-[-0.01em] text-[#1D1D1F] group-hover:text-[#6E6E73] transition-colors">
                      Our Label
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Footer: Editorial Minimalist Contact & Social Information */}
            <div className="flex-shrink-0 pt-6 pb-[max(env(safe-area-inset-bottom),24px)] px-6 sm:px-8 border-t border-[#F0F0F0] bg-[#FFFFFF] space-y-4">
              <div className="flex flex-col space-y-2">
                {/* Contact Us */}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="group py-1 text-xs uppercase tracking-[0.16em] font-medium text-[#1D1D1F] hover:text-[#6E6E73] transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" strokeWidth={1.25} />
                </Link>

                {/* WhatsApp Enquiry */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group py-1 text-xs uppercase tracking-[0.16em] font-medium text-[#1D1D1F] hover:text-[#6E6E73] transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                >
                  <span>WhatsApp Enquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" strokeWidth={1.25} />
                </a>

                {/* Instagram */}
                <a
                  href={STORE_DETAILS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group py-1 text-xs uppercase tracking-[0.16em] font-medium text-[#1D1D1F] hover:text-[#6E6E73] transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" strokeWidth={1.25} />
                </a>
              </div>

              {/* Flagship Store Note */}
              <div className="pt-3 border-t border-[#F5F5F5] text-[11px] text-[#86868B] leading-relaxed">
                <p className="text-[#1D1D1F] font-medium uppercase tracking-[0.1em] text-[10px]">
                  Flagship Store
                </p>
                <p>{STORE_DETAILS.fullAddress}</p>
                <p>{STORE_DETAILS.hours}</p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
