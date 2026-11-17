import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export const metadata = {
  title: "Our Label — In Development | INESTYL OUTLET",
  description:
    "Information regarding the upcoming INESTYL private label collection. Currently in curation.",
};

export default function OurLabelPage() {
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET, I would like to receive updates on when the INESTYL private label drops."
  )}`;

  return (
    <div className="container-luxury py-12 space-y-12 max-w-3xl text-center">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center justify-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Our Label</span>
      </nav>

      {/* 2. Honest In-Development Notice (No Fabricated Products per Rule 13) */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-10 sm:p-16 space-y-6 shadow-subtle">
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0071E3] block">
            PRIVATE LABEL
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
            Our Label is in Development
          </h1>
        </div>

        <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed max-w-xl mx-auto">
          We are currently crafting our in-house label with uncompromising fabric specifications and timeless silhouettes. Rather than displaying placeholder concepts, we will unveil the collection only once finished garments arrive at our Kapadwanj flagship.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle"
          >
            Browse Multi-Brand Catalogue
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E7EB] text-[#1D1D1F] text-xs font-semibold hover:border-[#0071E3] transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Notify Me on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

