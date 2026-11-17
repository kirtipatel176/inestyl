import Link from "next/link";
import Image from "next/image";
import { STORE_DETAILS } from "@/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site Footer"
      className="bg-[#F5F5F7] text-[#1D1D1F] border-t border-[#E5E7EB] pt-14 pb-12 transition-colors select-none"
    >
      <div className="container-luxury space-y-12">
        {/* Footer Top: Brand Identity & Tagline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E5E7EB]">
          <div className="space-y-3 max-w-xl">
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded"
            >
              <Image
                src="/brand/logo-primary-stacked.svg"
                alt="INESTYLE OUTLET"
                width={160}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="font-heading text-lg sm:text-xl font-medium text-[#1D1D1F] tracking-tight">
              Original Brands. Outlet Prices.
            </p>
            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
              Gujarat&apos;s premier multi-brand footwear and apparel outlet destination in Kapadwanj. 100% verified authentic original brands at honest outlet value.
            </p>
          </div>

          <div className="text-xs text-[#6E6E73] space-y-1">
            <p className="font-medium text-[#1D1D1F]">Flagship Destination</p>
            <p>{STORE_DETAILS.fullAddress}</p>
            <p>Hours: {STORE_DETAILS.hours}</p>
          </div>
        </div>

        {/* Footer Navigation Columns: 4 columns desktop, 2 columns tablet, stacked mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-[#E5E7EB]">
          {/* Column 1: EXPLORE */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1D1D1F]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6E6E73]">
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/men"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Men&apos;s Footwear
                </Link>
              </li>
              <li>
                <Link
                  href="/women"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Women&apos;s Footwear
                </Link>
              </li>
              <li>
                <Link
                  href="/clothing"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Brands Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: INESTYLE */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1D1D1F]">
              INESTYLE
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6E6E73]">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Visit Our Store
                </Link>
              </li>
              <li>
                <Link
                  href="/edit"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  The INESTYLE Edit
                </Link>
              </li>
              <li>
                <Link
                  href="/our-label"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Our Label (In Curation)
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1D1D1F]">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6E6E73]">
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact#enquiry-form"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Product Enquiries
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#faq-availability"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Stock Availability
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Returns &amp; Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CONNECT */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1D1D1F]">
              Connect
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6E6E73]">
              <li>
                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                    "Hello iNESTYL OUTLET, I would like to enquire about store availability."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  WhatsApp Enquiry
                </a>
              </li>
              <li>
                <a
                  href={STORE_DETAILS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Instagram ({STORE_DETAILS.instagramHandle})
                </a>
              </li>
              <li>
                <a
                  href={STORE_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Store Directions (Google Maps)
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors py-1 block"
                >
                  Contact Information
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom: Copyright & Legal Policies */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6E6E73] pt-2">
          <div>
            © {currentYear} INESTYLE OUTLET. All rights reserved. Original brands, verified outlet pricing.
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/returns"
              className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors"
            >
              Returns Policy
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-[#1D1D1F] hover:underline underline-offset-4 transition-colors"
            >
              Accessibility Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
