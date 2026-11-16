import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft, Lock } from "lucide-react";

export const metadata = {
  title: "Access Denied (403) — iNESTYL OUTLET",
  description: "Access to this requested store area is restricted.",
};

export default function UnauthorizedPage() {
  return (
    <div className="container-luxury py-20 sm:py-28 text-center max-w-lg mx-auto space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
        <Lock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose-600 bg-rose-50 px-3 py-1 rounded-full inline-block">
          ERROR 403 • ACCESS RESTRICTED
        </span>
        <h1 className="font-heading text-3xl font-bold text-[#1D1D1F] tracking-tight">
          Permission Required
        </h1>
        <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
          You do not have authorization to view this resource. This area is reserved for store administrators or authorized personnel.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-left text-xs text-[#86868B] space-y-1">
        <p className="font-semibold text-[#1D1D1F]">Looking for Store Management?</p>
        <p>If you are an iNESTYL OUTLET administrator, please sign in with an authorized account.</p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </Link>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E7EB] bg-white text-[#1D1D1F] text-xs font-semibold hover:bg-[#F5F5F7] transition-all"
        >
          <span>Admin Sign In</span>
        </Link>
      </div>
    </div>
  );
}
