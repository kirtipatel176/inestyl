import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export const metadata = {
  title: "Returns & Exchanges Policy — INESTYL OUTLET",
  description:
    "Returns and Exchanges policy for INESTYL OUTLET physical store purchases in Kapadwanj, Gujarat. 7-day exchange window with original receipt and tags.",
};

export default function ReturnsPolicyPage() {
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET, I would like to enquire about exchanging an item purchased at the store."
  )}`;

  return (
    <div className="container-luxury py-8 space-y-10 max-w-4xl">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Returns &amp; Exchanges Policy</span>
      </nav>

      {/* 2. Header */}
      <div className="space-y-3 pb-6 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          IN-STORE POLICIES
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Returns &amp; Exchanges Policy
        </h1>
        <p className="text-xs text-[#86868B]">
          Applicable for all physical purchases made at our Kapadwanj flagship outlet
        </p>
      </div>

      {/* 3. Core Policy Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6 space-y-2.5 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3] block">
            Exchange Window
          </span>
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            7-Day In-Store Exchange
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            Items purchased at INESTYL OUTLET can be exchanged in person at our Kapadwanj flagship within 7 calendar days from the date of purchase.
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-6 space-y-2.5 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3] block">
            Condition Standard
          </span>
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            Unworn &amp; Original Condition
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
            Footwear must be unworn outdoors with pristine outsoles and original shoebox. Apparel must retain all original brand tags, barcodes, and hygiene liners intact.
          </p>
        </div>
      </div>

      {/* 4. Detailed Policy Terms */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-8 sm:p-12 space-y-8 text-sm text-[#6E6E73] leading-relaxed shadow-subtle">
        <section className="space-y-3">
          <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            1. Exchange Eligibility Requirements
          </h3>
          <p>To qualify for an exchange at our physical boutique, please ensure:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Original cash memo / digital invoice must be presented.</li>
            <li>All product price tags, brand authenticity seals, and packaging must be present and undamaged.</li>
            <li>The item has not been laundered, altered, or worn beyond initial indoor sizing trial.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            2. Available Exchange Options
          </h3>
          <p>
            You may exchange eligible items for another size, a different colorway, or any alternative product of equal or greater value (paying the price difference). If a replacement size is temporarily unavailable, store credit will be issued valid for 60 days.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            3. Final Sale &amp; Clearance Items
          </h3>
          <p>
            Special promotional clearance items marked with a &quot;Final Outlet Markdown&quot; tag in-store are sold as final sale and are not eligible for return or exchange. This is explicitly communicated at the checkout counter.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            4. Need Advice Before Visiting?
          </h3>
          <p>
            If you need to check whether a replacement size is currently available before traveling to the store, message our store team on WhatsApp:
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Store on WhatsApp</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

