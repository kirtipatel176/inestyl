import Link from "next/link";
import { MessageSquare, Ruler, Info } from "lucide-react";
import { STORE_DETAILS } from "@/constants";
import { getSizeGuides } from "@/lib/server-db";
import { SizeGuideViewClient } from "@/components/products/SizeGuideViewClient";

export const metadata = {
  title: "Size Guide — Footwear & Apparel Conversions | INESTYL OUTLET",
  description:
    "Complete footwear and apparel size conversion guide for Nike, adidas, Puma, HOKA, Levi's, and DIESEL at INESTYL OUTLET. UK, US, EU, and CM measurements.",
};

export default function SizeGuidePage() {
  const sizeGuides = getSizeGuides();

  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET Kapadwanj, I need assistance confirming my size before visiting the store."
  )}`;

  return (
    <div className="container-luxury py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Size Guide</span>
      </nav>

      {/* 2. Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          OFFICIAL FIT &amp; MEASUREMENT STANDARDS
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Size Guide &amp; Fit Recommendations
        </h1>
        <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
          INESTYLE OUTLET uses authentic international standard sizing. Select a category below to explore standard size conversions, foot length charts, and body measurements curated from official brand distributors.
        </p>
      </div>

      {/* 3. Interactive Tabbed Size Guide Display */}
      <SizeGuideViewClient sizeGuides={sizeGuides} />

      {/* 4. Flagship Assistance Callout */}
      <div className="bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#E5E7EB]">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-[#0071E3]">
            <Ruler className="w-5 h-5" />
            <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
              Unsure About Your Fit? Try In-Store at Kapadwanj
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            Our flagship store on Station Road features specialized measuring scales and dedicated fitting rooms. You can also message our store team on WhatsApp with your favorite sneaker model for tailored fit recommendations.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1B8A42] text-white font-medium text-xs sm:text-sm hover:bg-[#167035] transition-colors shadow-subtle shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>Ask Fit Specialist on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
