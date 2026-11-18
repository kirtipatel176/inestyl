"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Search, MapPin, Menu, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppleMegaMenu, MegaMenuCategory } from "@/components/layout/AppleMegaMenu";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { STORE_DETAILS } from "@/constants";
import { Brand, CollectionItem, NavigationConfig } from "@inestyle/shared-types";

// Dynamically import heavy modals to keep critical First Load JS lean
const SearchModal = dynamic(
  () => import("@/components/shared/SearchModal").then((mod) => mod.SearchModal),
  { ssr: false }
);

const EnquireModal = dynamic(
  () => import("@/components/shared/EnquireModal").then((mod) => mod.EnquireModal),
  { ssr: false }
);

// Module-level client caches to avoid redundant API queries across client-side page transitions
let cachedNavConfig: NavigationConfig | null = null;
let cachedCollections: CollectionItem[] = [];
let cachedBrands: Brand[] = [];

export function Header() {
  const pathname = usePathname();
  const [navigationConfig, setNavigationConfig] = useState<NavigationConfig | null>(cachedNavConfig);
  const [collections, setCollections] = useState<CollectionItem[]>(cachedCollections);
  const [brands, setBrands] = useState<Brand[]>(cachedBrands);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<MegaMenuCategory | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch navigation, collections and brands from database once and cache in-memory
  useEffect(() => {
    if (cachedNavConfig) {
      setNavigationConfig(cachedNavConfig);
      setCollections(cachedCollections);
      setBrands(cachedBrands);
      return;
    }

    fetch("/api/navigation")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          if (data.navigation) {
            cachedNavConfig = data.navigation;
            setNavigationConfig(data.navigation);
          }
          if (data.collections && Array.isArray(data.collections)) {
            cachedCollections = data.collections;
            setCollections(data.collections);
          }
          if (data.brands && Array.isArray(data.brands)) {
            cachedBrands = data.brands;
            setBrands(data.brands);
          }
        }
      })
      .catch(() => {});
  }, []);

  const isLinkVisible = (label: string) => {
    if (!navigationConfig) return true;
    const lower = label.toLowerCase();
    const item = navigationConfig.header.find(
      (h) =>
        h.label.toLowerCase() === lower ||
        h.href.toLowerCase().includes(lower) ||
        (lower === "footwear" && (h.label.toLowerCase() === "shoes" || h.href.toLowerCase().includes("shoes")))
    );
    return item ? item.visible : true;
  };

  // Scroll detection for sticky navbar treatment & auto-dismiss dropdowns on major scroll
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 15);
      if (Math.abs(currentY - lastY) > 25) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        setActiveDropdown(null);
        lastY = currentY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close dropdown on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        setActiveDropdown(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        setActiveDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Smooth hover intent handlers with grace period to eliminate accidental closing & flickering
  const handleDropdownHover = (menuName: MegaMenuCategory) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(menuName);
  };

  const handleDropdownLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 160);
  };

  const handleCombinedEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleDropdownToggle = (menuName: MegaMenuCategory) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const handleWhatsAppAction = () => {
    const message = encodeURIComponent(
      "Hello iNESTYL OUTLET Kapadwanj, I am browsing your online catalogue and would like to check current store availability."
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${message}`, "_blank");
  };

  const isNewArrivalsActive = pathname.startsWith("/new-arrivals");
  const isMenActive = pathname.startsWith("/men");
  const isWomenActive = pathname.startsWith("/women");
  const isShoesActive = pathname.startsWith("/shoes") || pathname.startsWith("/footwear");
  const isClothingActive = pathname.startsWith("/clothing") || pathname.startsWith("/apparel");
  const isCollectionsActive = pathname.startsWith("/collections");
  const isBrandsActive = pathname.startsWith("/brands");
  const isOurLabelActive = pathname.startsWith("/our-label");
  const isContactActive = pathname.startsWith("/contact");
  const isStoreActive = pathname.startsWith("/store");
  const isHomepage = pathname === "/";

  return (
    <>
      {/* 
        Combined Navigation Container:
        Navbar + MegaMenu live together inside this sticky header at z-50.
        When a menu is active, the navbar seamlessly stays solid white to merge with the dropdown.
      */}
      <header
        ref={navRef}
        onMouseEnter={handleCombinedEnter}
        onMouseLeave={handleDropdownLeave}
        className={`sticky top-0 z-50 w-full transition-all duration-300 select-none ${
          activeDropdown !== null
            ? "bg-[#FFFFFF] border-b border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            : isScrolled
            ? "bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            : isHomepage
            ? "bg-transparent border-b border-transparent shadow-none"
            : "bg-[#FFFFFF] border-b border-[#E5E7EB]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[48px] sm:h-[50px]">
          {/* 1. LEFT: INESTYLE OUTLET Logo */}
          <Link
            href="/"
            onClick={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              setActiveDropdown(null);
            }}
            className="relative flex items-center gap-2 group flex-shrink-0"
            title="iNESTYL OUTLET — Homepage"
          >
            <Image
              src="/brand/logo-primary-stacked.svg"
              alt="iNESTYL OUTLET"
              width={120}
              height={38}
              className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-102"
              priority
            />
          </Link>

          {/* 2. CENTRE: Apple-Style Minimal Horizontal Navigation Bar */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-5 2xl:gap-7"
          >
            {/* 1. New Arrivals */}
            {isLinkVisible("New Arrivals") && (
              <Link
                href="/new-arrivals"
                onMouseEnter={() => handleDropdownHover("men")}
                className={`relative py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                  isNewArrivalsActive
                    ? "text-[#1D1D1F] font-semibold"
                    : "text-[#1D1D1F]/85 hover:text-[#1D1D1F]"
                }`}
              >
                <span>New Arrivals</span>
              </Link>
            )}

            {/* 2. Men */}
            {isLinkVisible("Men") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("men")}
              >
                <Link
                  href="/men"
                  onClick={(e: React.MouseEvent) => {
                    // Clicking on desktop switches or keeps open
                    if (window.innerWidth >= 1280 && activeDropdown !== "men") {
                      e.preventDefault();
                      handleDropdownToggle("men");
                    }
                  }}
                  aria-expanded={activeDropdown === "men"}
                  aria-haspopup="true"
                  className={`py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                    isMenActive || activeDropdown === "men"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#1D1D1F]/85 hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Men</span>
                </Link>
              </div>
            )}

            {/* 3. Women */}
            {isLinkVisible("Women") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("women")}
              >
                <Link
                  href="/women"
                  onClick={(e: React.MouseEvent) => {
                    if (window.innerWidth >= 1280 && activeDropdown !== "women") {
                      e.preventDefault();
                      handleDropdownToggle("women");
                    }
                  }}
                  aria-expanded={activeDropdown === "women"}
                  aria-haspopup="true"
                  className={`py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                    isWomenActive || activeDropdown === "women"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#1D1D1F]/85 hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Women</span>
                </Link>
              </div>
            )}

            {/* 4. Footwear */}
            {(isLinkVisible("Footwear") || isLinkVisible("Shoes")) && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("shoes")}
              >
                <Link
                  href="/shoes"
                  onClick={(e: React.MouseEvent) => {
                    if (window.innerWidth >= 1280 && activeDropdown !== "shoes") {
                      e.preventDefault();
                      handleDropdownToggle("shoes");
                    }
                  }}
                  aria-expanded={activeDropdown === "shoes"}
                  aria-haspopup="true"
                  className={`py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                    isShoesActive || activeDropdown === "shoes"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#1D1D1F]/85 hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Footwear</span>
                </Link>
              </div>
            )}

            {/* 5. Clothing */}
            {isLinkVisible("Clothing") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("clothing")}
              >
                <Link
                  href="/clothing"
                  onClick={(e: React.MouseEvent) => {
                    if (window.innerWidth >= 1280 && activeDropdown !== "clothing") {
                      e.preventDefault();
                      handleDropdownToggle("clothing");
                    }
                  }}
                  aria-expanded={activeDropdown === "clothing"}
                  aria-haspopup="true"
                  className={`py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                    isClothingActive || activeDropdown === "clothing"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#1D1D1F]/85 hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Clothing</span>
                </Link>
              </div>
            )}

            {/* 6. Collections */}
            {isLinkVisible("Collections") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("collections")}
              >
                <Link
                  href="/collections"
                  onClick={(e: React.MouseEvent) => {
                    if (window.innerWidth >= 1280 && activeDropdown !== "collections") {
                      e.preventDefault();
                      handleDropdownToggle("collections");
                    }
                  }}
                  aria-expanded={activeDropdown === "collections"}
                  aria-haspopup="true"
                  className={`py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                    isCollectionsActive || activeDropdown === "collections"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#1D1D1F]/85 hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Collections</span>
                </Link>
              </div>
            )}

            {/* 7. Brands */}
            {isLinkVisible("Brands") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("brands")}
              >
                <Link
                  href="/brands"
                  onClick={(e: React.MouseEvent) => {
                    if (window.innerWidth >= 1280 && activeDropdown !== "brands") {
                      e.preventDefault();
                      handleDropdownToggle("brands");
                    }
                  }}
                  aria-expanded={activeDropdown === "brands"}
                  aria-haspopup="true"
                  className={`py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                    isBrandsActive || activeDropdown === "brands"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#1D1D1F]/85 hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Brands</span>
                </Link>
              </div>
            )}

            {/* 8. Our Label */}
            {isLinkVisible("Our Label") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("our-label")}
              >
                <Link
                  href="/our-label"
                  onClick={(e: React.MouseEvent) => {
                    if (window.innerWidth >= 1280 && activeDropdown !== "our-label") {
                      e.preventDefault();
                      handleDropdownToggle("our-label");
                    }
                  }}
                  aria-expanded={activeDropdown === "our-label"}
                  aria-haspopup="true"
                  className={`py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                    isOurLabelActive || activeDropdown === "our-label"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#1D1D1F]/85 hover:text-[#1D1D1F]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>Our Label</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
                  </span>
                </Link>
              </div>
            )}

            {/* Dynamic Custom Navigation Links configured by Admin (Preserved) */}
            {navigationConfig?.header
              .filter(
                (h) =>
                  h.visible &&
                  ![
                    "men",
                    "women",
                    "shoes",
                    "clothing",
                    "collections",
                    "brands",
                    "our label",
                    "new arrivals",
                  ].includes(h.label.toLowerCase())
              )
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="py-1 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors flex items-center gap-1"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-blue-50 text-[#0071E3] font-bold px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
          </nav>

          {/* 3. RIGHT: Monochrome Minimalist Utility Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search shoes and clothing"
              title="Search catalogue"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-black/5 transition-colors"
            >
              <Search className="w-4 h-4 text-[#1D1D1F]" />
            </button>

            {/* Store Location */}
            <Link
              href="/store"
              aria-label="Store location"
              title={`Visit Kapadwanj Store — ${STORE_DETAILS.locationDisplay}`}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-black/5 transition-colors ${
                isStoreActive ? "bg-black/5" : ""
              }`}
            >
              <MapPin className="w-4 h-4 text-[#1D1D1F]" />
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              className={`hidden md:inline-flex py-1 px-1.5 text-[12px] 2xl:text-[13px] font-normal tracking-[-0.01em] transition-colors ${
                isContactActive
                  ? "text-[#1D1D1F] font-semibold"
                  : "text-[#6E6E73] hover:text-[#1D1D1F]"
              }`}
            >
              Contact Us
            </Link>

            {/* WhatsApp Concierge */}
            <button
              onClick={handleWhatsAppAction}
              aria-label="Connect on WhatsApp Concierge"
              title="Chat with Kapadwanj Store Concierge"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#1D1D1F] hover:bg-black/5 transition-colors text-[11px] font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#1D1D1F]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Enquire Pill Button (Apple-Inspired Monochrome Pill) */}
            <button
              onClick={() => setIsEnquireOpen(true)}
              className="hidden lg:inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-[#1D1D1F] text-white text-[11px] sm:text-[12px] font-medium tracking-normal hover:bg-[#333336] transition-all shadow-xs active:scale-98"
            >
              <span>Enquire</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="xl:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-black/5 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4. APPLE-STYLE FULL-WIDTH MEGA-MENU DROPDOWN */}
        <AnimatePresence>
          {activeDropdown !== null && (
            <AppleMegaMenu
              activeMenu={activeDropdown}
              onClose={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                setActiveDropdown(null);
              }}
              collections={collections}
              brands={brands}
            />
          )}
        </AnimatePresence>
      </header>

      {/* 
        5. BACKGROUND BLUR EFFECT:
        When the mega-menu opens:
        - The backdrop overlay smoothly covers the page underneath.
        - Applies backdrop-filter: blur(10px) and a subtle translucent overlay (bg-black/20).
        - Prevents the underlying content from receiving pointer interactions (pointer-events-auto).
        - Clicking anywhere on the blurred background closes the menu.
        - Navbar and mega-menu are stacked at z-50 above this z-30 overlay, remaining 100% sharp!
      */}
      <AnimatePresence>
        {activeDropdown !== null && (
          <motion.div
            key="apple-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              setActiveDropdown(null);
            }}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[10px] pointer-events-auto"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Global Modals & Mobile Navigation Drawer (Preserved) */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onEnquireClick={() => setIsEnquireOpen(true)}
      />
      {isSearchOpen && (
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
      {isEnquireOpen && (
        <EnquireModal isOpen={isEnquireOpen} onClose={() => setIsEnquireOpen(false)} />
      )}
    </>
  );
}
