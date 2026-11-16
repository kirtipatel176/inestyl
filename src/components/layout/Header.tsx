"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, MessageSquare, MessageCircle, Phone } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { SearchModal } from "@/components/shared/SearchModal";
import { EnquireModal } from "@/components/shared/EnquireModal";
import { FootwearMegaMenu } from "@/components/layout/FootwearMegaMenu";
import { ApparelMegaMenu } from "@/components/layout/ApparelMegaMenu";
import { MenMegaMenu } from "@/components/layout/MenMegaMenu";
import { WomenMegaMenu } from "@/components/layout/WomenMegaMenu";
import { BrandsDropdown } from "@/components/layout/BrandsDropdown";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { STORE_DETAILS } from "@/constants";
import { NavigationConfig } from "@/types";

export function Header() {
  const pathname = usePathname();
  const [navigationConfig, setNavigationConfig] = useState<NavigationConfig | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Fetch navigation settings from database
  useEffect(() => {
    fetch("/api/navigation")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.navigation) {
          setNavigationConfig(data.navigation);
        }
      })
      .catch(() => {});
  }, []);

  const isLinkVisible = (label: string) => {
    if (!navigationConfig) return true;
    const item = navigationConfig.header.find(
      (h) =>
        h.label.toLowerCase() === label.toLowerCase() ||
        h.href.toLowerCase().includes(label.toLowerCase())
    );
    return item ? item.visible : true;
  };

  const navRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky navbar treatment & auto-dismiss dropdowns on scroll
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 15);
      if (Math.abs(currentY - lastY) > 30) {
        setActiveDropdown(null);
        lastY = currentY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close dropdown on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
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

  const handleDropdownHover = (menuName: string) => {
    setActiveDropdown(menuName);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
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

  return (
    <>
      <header
        ref={navRef}
        onMouseLeave={handleDropdownLeave}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FFFFFF]/95 backdrop-blur-md shadow-subtle border-b border-[#E5E7EB]"
            : "bg-[#FFFFFF] border-b border-[#E5E7EB]"
        }`}
      >
        <div className="container-luxury flex items-center justify-between h-[56px] sm:h-[60px]">
          {/* 1. LEFT: iNESTYL OUTLET Logo */}
          <Link
            href="/"
            onClick={() => setActiveDropdown(null)}
            className="relative flex items-center gap-2 group flex-shrink-0"
            title="iNESTYL OUTLET — Homepage"
          >
            <Image
              src="/brand/logo-primary-stacked.svg"
              alt="iNESTYL OUTLET"
              width={130}
              height={42}
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-102"
              priority
            />
          </Link>

          {/* 2. CENTER: Desktop Navigation Links (Requirement 1 Structure) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1">
            {/* 1. New Arrivals */}
            {isLinkVisible("New Arrivals") && (
              <Link
                href="/new-arrivals"
                className={`relative px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium transition-colors ${
                  isNewArrivalsActive
                    ? "text-[#1D1D1F] font-semibold"
                    : "text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                <span>New Arrivals</span>
                {isNewArrivalsActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#0071E3] rounded-full" />
                )}
              </Link>
            )}

            {/* 2. Men (Mega Menu) */}
            {isLinkVisible("Men") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("men")}
              >
                <Link
                  href="/men"
                  className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium transition-colors ${
                    isMenActive || activeDropdown === "men"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#6E6E73] hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Men</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#86868B] transition-transform duration-200 ${
                      activeDropdown === "men" ? "rotate-180 text-[#0071E3]" : ""
                    }`}
                  />
                </Link>
                {isMenActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#0071E3] rounded-full" />
                )}
              </div>
            )}

            {/* 3. Women (Mega Menu) */}
            {isLinkVisible("Women") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("women")}
              >
                <Link
                  href="/women"
                  className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium transition-colors ${
                    isWomenActive || activeDropdown === "women"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#6E6E73] hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Women</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#86868B] transition-transform duration-200 ${
                      activeDropdown === "women" ? "rotate-180 text-[#0071E3]" : ""
                    }`}
                  />
                </Link>
                {isWomenActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#0071E3] rounded-full" />
                )}
              </div>
            )}

            {/* 4. Shoes (Mega Menu) */}
            {isLinkVisible("Shoes") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("shoes")}
              >
                <Link
                  href="/shoes"
                  className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium transition-colors ${
                    isShoesActive || activeDropdown === "shoes"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#6E6E73] hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Shoes</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#86868B] transition-transform duration-200 ${
                      activeDropdown === "shoes" ? "rotate-180 text-[#0071E3]" : ""
                    }`}
                  />
                </Link>
                {isShoesActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#0071E3] rounded-full" />
                )}
              </div>
            )}

            {/* 5. Clothing (Mega Menu) */}
            {isLinkVisible("Clothing") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("clothing")}
              >
                <Link
                  href="/clothing"
                  className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium transition-colors ${
                    isClothingActive || activeDropdown === "clothing"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#6E6E73] hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Clothing</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#86868B] transition-transform duration-200 ${
                      activeDropdown === "clothing" ? "rotate-180 text-[#0071E3]" : ""
                    }`}
                  />
                </Link>
                {isClothingActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#0071E3] rounded-full" />
                )}
              </div>
            )}

            {/* 6. Collections */}
            {isLinkVisible("Collections") && (
              <Link
                href="/collections"
                className={`relative px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium transition-colors ${
                  isCollectionsActive
                    ? "text-[#1D1D1F] font-semibold"
                    : "text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                <span>Collections</span>
                {isCollectionsActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#0071E3] rounded-full" />
                )}
              </Link>
            )}

            {/* 7. Brands (Dropdown) */}
            {isLinkVisible("Brands") && (
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("brands")}
              >
                <Link
                  href="/brands"
                  className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium transition-colors ${
                    isBrandsActive || activeDropdown === "brands"
                      ? "text-[#1D1D1F] font-semibold"
                      : "text-[#6E6E73] hover:text-[#1D1D1F]"
                  }`}
                >
                  <span>Brands</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#86868B] transition-transform duration-200 ${
                      activeDropdown === "brands" ? "rotate-180 text-[#0071E3]" : ""
                    }`}
                  />
                </Link>
                {isBrandsActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#0071E3] rounded-full" />
                )}
              </div>
            )}

            {/* 8. Our Label */}
            {isLinkVisible("Our Label") && (
              <Link
                href="/our-label"
                className={`relative px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium transition-colors ${
                  isOurLabelActive
                    ? "text-[#1D1D1F] font-semibold"
                    : "text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                <span className="flex items-center gap-1">
                  <span>Our Label</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
                </span>
                {isOurLabelActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#0071E3] rounded-full" />
                )}
              </Link>
            )}

            {/* 9. Dynamic Custom Navigation Links configured by Admin */}
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
                  className="relative px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors flex items-center gap-1"
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

          {/* 3. RIGHT ACTIONS: Search, Contact Us, WhatsApp & Enquire */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search shoes and clothing"
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-black/5 transition-colors"
            >
              <Search className="w-4 h-4 text-[#1D1D1F]" />
            </button>

            {/* Contact Us Link */}
            <Link
              href="/contact"
              className={`hidden md:inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                isContactActive
                  ? "text-[#0071E3] bg-[#0071E3]/10"
                  : "text-[#1D1D1F] hover:bg-black/5"
              }`}
            >
              Contact Us
            </Link>

            {/* WhatsApp Direct Action Button (Requirement 1) */}
            <button
              onClick={handleWhatsAppAction}
              aria-label="Connect on WhatsApp Concierge"
              title="Chat with Kapadwanj Store Concierge"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-all text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Enquire Now Pill Button */}
            <button
              onClick={() => setIsEnquireOpen(true)}
              className="hidden lg:inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#0071E3] text-white text-xs font-semibold tracking-normal hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
            >
              <span>Enquire</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="xl:hidden w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-black/5 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4. MEGA MENUS & DROPDOWNS */}
        <AnimatePresence>
          {activeDropdown === "men" && (
            <MenMegaMenu onClose={() => setActiveDropdown(null)} />
          )}
          {activeDropdown === "women" && (
            <WomenMegaMenu onClose={() => setActiveDropdown(null)} />
          )}
          {activeDropdown === "shoes" && (
            <FootwearMegaMenu onClose={() => setActiveDropdown(null)} />
          )}
          {activeDropdown === "clothing" && (
            <ApparelMegaMenu onClose={() => setActiveDropdown(null)} />
          )}
          {activeDropdown === "brands" && (
            <BrandsDropdown onClose={() => setActiveDropdown(null)} />
          )}
        </AnimatePresence>
      </header>

      {/* Global Modals & Mobile Nav */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onEnquireClick={() => setIsEnquireOpen(true)}
      />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <EnquireModal isOpen={isEnquireOpen} onClose={() => setIsEnquireOpen(false)} />
    </>
  );
}
