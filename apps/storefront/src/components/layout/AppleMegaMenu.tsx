"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { STORE_DETAILS } from "@/constants";
import { NAV_BRANDS, NAV_COLLECTIONS } from "@/constants/navigation";
import { Brand, CollectionItem } from "@inestyle/shared-types";

export type MegaMenuCategory =
  | "men"
  | "women"
  | "shoes"
  | "clothing"
  | "collections"
  | "brands"
  | "our-label";

interface AppleMegaMenuProps {
  activeMenu: MegaMenuCategory;
  onClose: () => void;
  collections?: CollectionItem[];
  brands?: Brand[];
}

export function AppleMegaMenu({
  activeMenu,
  onClose,
  collections = [],
  brands = [],
}: AppleMegaMenuProps) {
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET, I am browsing your online catalogue and would like to check current store availability."
  )}`;

  const privateLabelWhatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET, I would like to receive updates on when the INESTYL private label drops."
  )}`;

  // Use Supabase data when available, with fallback to hardcoded navigation constants
  const activeCollectionsList =
    collections && collections.length > 0
      ? collections
      : NAV_COLLECTIONS.map((c) => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          description: "",
          featured: true,
        }));

  const activeBrandsList =
    brands && brands.length > 0
      ? brands
      : NAV_BRANDS.map((b) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          category: b.category,
          featured: true,
        }));

  const renderContent = () => {
    switch (activeMenu) {
      case "men":
        return (
          <div className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Column 1 — Explore Men (Large Editorial Apple-Style Typography) */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Explore Men
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/men"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Explore All Men
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-arrivals?gender=Men"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clothing?gender=Men"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shoes?gender=Men"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Footwear
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Featured Collections
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 — Men's Clothing */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Men&apos;s Clothing
              </span>
              <ul className="space-y-1">
                {[
                  { label: "T-shirts", href: "/clothing?gender=Men&clothingCategory=T-Shirts" },
                  { label: "Polo T-shirts", href: "/clothing?gender=Men&clothingCategory=Polo+T-Shirts" },
                  { label: "Shirts", href: "/clothing?gender=Men&clothingCategory=Shirts" },
                  { label: "Jeans", href: "/clothing?gender=Men&clothingCategory=Jeans" },
                  { label: "Trousers", href: "/clothing?gender=Men&clothingCategory=Trousers" },
                  { label: "Hoodies", href: "/clothing?gender=Men&clothingCategory=Hoodies" },
                  { label: "Jackets", href: "/clothing?gender=Men&clothingCategory=Jackets" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Men's Footwear */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Men&apos;s Footwear
              </span>
              <ul className="space-y-1">
                {[
                  { label: "Sneakers", href: "/shoes/sneakers?gender=Men" },
                  { label: "Running Shoes", href: "/shoes/running?gender=Men" },
                  { label: "Casual Shoes", href: "/shoes/casual?gender=Men" },
                  { label: "Sports Shoes", href: "/shoes?gender=Men&shoeType=Sports" },
                  { label: "Walking Shoes", href: "/shoes?gender=Men&shoeType=Walking" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Quick Links / Services */}
            <div className="hidden lg:block lg:col-span-2">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Quick Links
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/store"
                    onClick={onClose}
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Visit Kapadwanj Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/size-guide"
                    onClick={onClose}
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Men&apos;s Sizing Guide
                  </Link>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    WhatsApp Concierge
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );

      case "women":
        return (
          <div className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Column 1 — Explore Women (Large Editorial Apple-Style Typography) */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Explore Women
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/women"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Explore All Women
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-arrivals?gender=Women"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clothing?gender=Women"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shoes?gender=Women"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Footwear
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Featured Collections
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 — Women's Clothing (Only verified stocked items per Requirement 3) */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Women&apos;s Clothing
              </span>
              <ul className="space-y-1">
                {[
                  { label: "T-shirts", href: "/clothing?gender=Women&clothingCategory=T-Shirts" },
                  { label: "Tops", href: "/clothing?gender=Women&clothingCategory=Tops" },
                  { label: "Shirts", href: "/clothing?gender=Women&clothingCategory=Shirts" },
                  { label: "Jeans", href: "/clothing?gender=Women&clothingCategory=Jeans" },
                  { label: "Trousers", href: "/clothing?gender=Women&clothingCategory=Trousers" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Women's Footwear */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Women&apos;s Footwear
              </span>
              <ul className="space-y-1">
                {[
                  { label: "Sneakers", href: "/women/shoes" },
                  { label: "Casual Shoes", href: "/shoes/casual?gender=Women" },
                  { label: "Sports Shoes", href: "/shoes?gender=Women&shoeType=Sports" },
                  { label: "Lifestyle Shoes", href: "/shoes?gender=Women&shoeType=Lifestyle" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Quick Links / Services */}
            <div className="hidden lg:block lg:col-span-2">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Quick Links
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/store"
                    onClick={onClose}
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Visit Kapadwanj Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/size-guide"
                    onClick={onClose}
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Women&apos;s Sizing Guide
                  </Link>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    WhatsApp Concierge
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );

      case "shoes":
        return (
          <div className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Column 1 — Explore Shoes */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Explore Shoes
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/shoes"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Explore All Shoes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-arrivals?category=footwear"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shoes?featured=true"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Featured Shoes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 — Categories */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Categories
              </span>
              <ul className="space-y-1">
                {[
                  { label: "Sneakers", href: "/shoes/sneakers" },
                  { label: "Running Shoes", href: "/shoes/running" },
                  { label: "Sports Shoes", href: "/shoes?shoeType=Sports" },
                  { label: "Casual Shoes", href: "/shoes/casual" },
                  { label: "Walking Shoes", href: "/shoes?shoeType=Walking" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Discover */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Discover
              </span>
              <ul className="space-y-1">
                {[
                  { label: "Men's Shoes", href: "/men/shoes" },
                  { label: "Women's Shoes", href: "/women/shoes" },
                  { label: "Featured Brands", href: "/brands?type=footwear" },
                  { label: "Collections", href: "/collections" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Footwear Brands */}
            <div className="hidden lg:block lg:col-span-2">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Footwear Brands
              </span>
              <ul className="space-y-1">
                {activeBrandsList
                  .filter((b) => b.category === "footwear" || b.category === "both" || !b.category)
                  .slice(0, 4)
                  .map((brand) => (
                    <li key={brand.slug}>
                      <Link
                        href={`/brands/${brand.slug}`}
                        onClick={onClose}
                        className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                      >
                        {brand.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );

      case "clothing":
        return (
          <div className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Column 1 — Explore Clothing */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Explore Clothing
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/clothing"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Explore All Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-arrivals?category=apparel"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clothing?featured=true"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Featured Clothing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 — Categories */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Categories
              </span>
              <ul className="space-y-1">
                {[
                  { label: "T-shirts", href: "/clothing?clothingCategory=T-Shirts" },
                  { label: "Polo T-shirts", href: "/clothing?clothingCategory=Polo+T-Shirts" },
                  { label: "Shirts", href: "/clothing?clothingCategory=Shirts" },
                  { label: "Jeans", href: "/clothing?clothingCategory=Jeans" },
                  { label: "Trousers", href: "/clothing?clothingCategory=Trousers" },
                  { label: "Hoodies", href: "/clothing?clothingCategory=Hoodies" },
                  { label: "Jackets", href: "/clothing?clothingCategory=Jackets" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Discover */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Discover
              </span>
              <ul className="space-y-1">
                {[
                  { label: "Men's Clothing", href: "/clothing?gender=Men" },
                  { label: "Women's Clothing", href: "/clothing?gender=Women" },
                  { label: "Featured Brands", href: "/brands?type=clothing" },
                  { label: "Collections", href: "/collections" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Apparel Brands */}
            <div className="hidden lg:block lg:col-span-2">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Apparel Brands
              </span>
              <ul className="space-y-1">
                {activeBrandsList
                  .filter((b) => b.category === "apparel" || b.category === "both" || !b.category)
                  .slice(0, 4)
                  .map((brand) => (
                    <li key={brand.slug}>
                      <Link
                        href={`/brands/${brand.slug}`}
                        onClick={onClose}
                        className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                      >
                        {brand.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );

      case "collections":
        return (
          <div className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Column 1 — Explore Collections */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Explore Collections
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/collections"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Explore All Collections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/new-arrivals"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    New Arrivals Edit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/trending-styles"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Trending Styles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 & 3 — Actual Published Collections from Supabase */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Curated Edits
              </span>
              <ul className="space-y-1">
                {activeCollectionsList.slice(0, 6).map((col) => (
                  <li key={col.slug}>
                    <Link
                      href={`/collections/${col.slug}`}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {col.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                More Themes
              </span>
              <ul className="space-y-1">
                {activeCollectionsList.slice(6, 12).map((col) => (
                  <li key={col.slug}>
                    <Link
                      href={`/collections/${col.slug}`}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {col.title}
                    </Link>
                  </li>
                ))}
                {activeCollectionsList.length <= 6 && (
                  <>
                    <li>
                      <Link
                        href="/shoes/sneakers"
                        onClick={onClose}
                        className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                      >
                        Sneakers Collection
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/clothing?clothingCategory=Jeans"
                        onClick={onClose}
                        className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                      >
                        Premium Denim Edit
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 4 — Discover */}
            <div className="hidden lg:block lg:col-span-2">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Discover
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/shoes"
                    onClick={onClose}
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Footwear Collections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clothing"
                    onClick={onClose}
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Apparel Collections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store"
                    onClick={onClose}
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Kapadwanj In-Store Edits
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        );

      case "brands":
        return (
          <div className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Column 1 — Explore Brands */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Explore Brands
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/brands"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Explore All Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands?type=footwear"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Footwear Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands?type=apparel"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    Apparel Brands
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 & 3 — Actual Active Brands from Catalogue */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Featured Brands
              </span>
              <ul className="space-y-1">
                {activeBrandsList.slice(0, 4).map((brand) => (
                  <li key={brand.slug}>
                    <Link
                      href={`/brands/${brand.slug}`}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {brand.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 sm:col-span-4 lg:col-span-3">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                More Labels
              </span>
              <ul className="space-y-1">
                {activeBrandsList.slice(4).map((brand) => (
                  <li key={brand.slug}>
                    <Link
                      href={`/brands/${brand.slug}`}
                      onClick={onClose}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                    >
                      {brand.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Brand Authenticity Standards */}
            <div className="hidden lg:block lg:col-span-2">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Authenticity
              </span>
              <ul className="space-y-1">
                <li className="text-[12px] sm:text-[13px] text-[#6E6E73] py-1">
                  100% Verified Original
                </li>
                <li className="text-[12px] sm:text-[13px] text-[#6E6E73] py-1">
                  Direct Authorized Stock
                </li>
                <li>
                  <Link
                    href="/store"
                    onClick={onClose}
                    className="text-[12px] sm:text-[13px] font-normal text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Visit Kapadwanj Flagship
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        );

      case "our-label":
        return (
          <div className="grid grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Column 1 — Private Label (Truthful In-Development Status) */}
            <div className="col-span-12 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Private Label
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/our-label"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    INESTYLE Flagship Label
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-label"
                    onClick={onClose}
                    className="text-xl sm:text-[23px] font-semibold tracking-[-0.015em] text-[#1D1D1F] hover:text-[#0071E3] transition-colors leading-[1.3] block py-1"
                  >
                    The Atelier &amp; Story
                  </Link>
                </li>
                <li className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[11px] font-semibold text-[#0071E3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] animate-pulse" />
                    Currently in Curation
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 2 — Upcoming In-House Standards */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Craft Standards
              </span>
              <ul className="space-y-1">
                <li className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] py-1">
                  Heavyweight Combed Cotton
                </li>
                <li className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] py-1">
                  Selvedge &amp; Vintage Denim
                </li>
                <li className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] py-1">
                  Tailored Outerwear
                </li>
                <li className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] py-1">
                  Minimalist Footwear
                </li>
              </ul>
            </div>

            {/* Column 3 — Concierge & Updates */}
            <div className="col-span-6 sm:col-span-4 lg:col-span-4">
              <span className="text-[11px] font-medium tracking-[0.08em] text-[#86868B] uppercase mb-3.5 block select-none">
                Concierge &amp; Updates
              </span>
              <ul className="space-y-1">
                <li>
                  <a
                    href={privateLabelWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] sm:text-[14px] font-medium text-[#0071E3] hover:underline transition-colors block py-1"
                  >
                    Notify Me on WhatsApp →
                  </a>
                </li>
                <li>
                  <Link
                    href="/store"
                    onClick={onClose}
                    className="text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors block py-1"
                  >
                    Kapadwanj Flagship Preview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="text-[13px] sm:text-[14px] font-normal text-[#6E6E73] hover:text-[#1D1D1F] transition-colors block py-1"
                  >
                    Browse Multi-Brand Catalogue
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#FFFFFF] border-b border-[#E5E7EB] shadow-[0_20px_45px_rgba(0,0,0,0.06)] overflow-hidden"
      role="region"
      aria-label={`${activeMenu} navigation menu`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-9 pb-12 sm:pt-11 sm:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
