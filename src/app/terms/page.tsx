import Link from "next/link";
import { STORE_DETAILS } from "@/constants";

export const metadata = {
  title: "Terms and Conditions — INESTYL OUTLET",
  description:
    "Terms and Conditions governing the use of the INESTYL OUTLET discovery catalogue and physical outlet purchases.",
};

export default function TermsPage() {
  return (
    <div className="container-luxury py-8 space-y-10 max-w-4xl">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Terms and Conditions</span>
      </nav>

      {/* 2. Header */}
      <div className="space-y-3 pb-6 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          OPERATIONAL TERMS &amp; CONDITIONS
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-xs text-[#86868B]">
          Effective as of November 2026 • Governing INESTYL OUTLET catalogue and in-store operations
        </p>
      </div>

      {/* 3. Terms Content */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 space-y-8 text-sm text-[#6E6E73] leading-relaxed shadow-subtle">
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            1. Nature of the Website
          </h2>
          <p>
            The website at inestyl.com is an informational catalogue operated by INESTYL OUTLET. It is designed to allow customers to view available stock, examine pricing, and enquire about sizes at our physical store in Kapadwanj, Gujarat. This website does not constitute an e-commerce transactional store, and no binding contract of sale is concluded through this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            2. Catalogue Pricing &amp; Availability
          </h2>
          <p>
            All prices listed on this website represent our in-store outlet pricing in Indian Rupees (INR) alongside official manufacturer Maximum Retail Price (MRP). While we strive for continuous accuracy, real-time store footfall may result in temporary inventory variances. All purchases must be completed in person at our physical outlet.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            3. Intellectual Property &amp; Trademarks
          </h2>
          <p>
            All brand trademarks, trade names, logos, and emblems displayed on this website—including Nike, adidas, Puma, HOKA, Levi&apos;s, DIESEL, and U.S. Polo Assn.—are the registered trademarks of their respective proprietors. INESTYL OUTLET is an independent multi-brand retailer that sources original, authentic inventory through authorized wholesale distribution channels. Display of logos is solely for product identification and does not imply direct brand sponsorship or dealership unless formally stated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            4. In-Store Transactions
          </h2>
          <p>
            Sales transactions take place exclusively at our physical boutique located at Station Road, Kapadwanj, Gujarat. Payment methods accepted in store include Cash, UPI, and major domestic Debit and Credit cards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            5. Governing Law &amp; Jurisdiction
          </h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of store transactions or website usage are subject to the exclusive jurisdiction of the competent courts in Kheda District, Gujarat.
          </p>
        </section>
      </div>
    </div>
  );
}

