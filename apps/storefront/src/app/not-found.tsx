import Link from "next/link";
import { Search, Home, ShoppingBag, MessageSquare, ArrowLeft } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export default function NotFound() {
  return (
    <div className="container-luxury py-20 sm:py-28 text-center max-w-xl mx-auto space-y-8">
      {/* Icon Plinth */}
      <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center mx-auto text-[#0071E3] shadow-xs">
        <Search className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0071E3] block">
          404 ERROR • RESOURCE NOT FOUND
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Looking for Something Specific?
        </h1>
        <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed max-w-md mx-auto">
          The style, brand, or page you are looking for may have been archived, sold out, or moved to another outlet section.
        </p>
      </div>

      {/* Suggested Quick Links */}
      <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] text-left space-y-3">
        <span className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider block">
          Explore Current Flagship Inventory:
        </span>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/sneakers"
            className="px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3] transition-colors"
          >
            Sneakers
          </Link>
          <Link
            href="/shoes/running"
            className="px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3] transition-colors"
          >
            Running Shoes
          </Link>
          <Link
            href="/clothing"
            className="px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3] transition-colors"
          >
            Apparel &amp; Denim
          </Link>
          <Link
            href="/brands"
            className="px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3] transition-colors"
          >
            Featured Brands
          </Link>
        </div>
      </div>

      {/* Recovery Buttons */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E7EB] bg-white text-[#1D1D1F] text-xs font-semibold hover:bg-[#F5F5F7] transition-all"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Browse All Products</span>
        </Link>
        <a
          href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
            "Hello iNESTYL OUTLET Kapadwanj, I was looking for a product that seems to be missing on your website. Can you help me find it?"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:bg-[#E5E7EB] transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>Enquire on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
