import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-luxury py-24 sm:py-32 text-center max-w-xl mx-auto space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center mx-auto text-[#0071E3]">
        <Search className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0071E3]">
          404 Error
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
          The product or page you are looking for may have been moved, sold out, or is temporarily unavailable.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle"
        >
          Return to Homepage
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 rounded-full border border-[#E5E7EB] bg-white text-[#1D1D1F] text-xs font-semibold hover:bg-[#F5F5F7] transition-all"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}

