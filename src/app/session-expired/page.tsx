import Link from "next/link";
import { Clock, Home, LogIn } from "lucide-react";

export const metadata = {
  title: "Session Expired — iNESTYL OUTLET",
  description: "Your session has expired due to inactivity.",
};

export default function SessionExpiredPage() {
  return (
    <div className="container-luxury py-20 sm:py-28 text-center max-w-lg mx-auto space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
        <Clock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block">
          SESSION TIMEOUT
        </span>
        <h1 className="font-heading text-3xl font-bold text-[#1D1D1F] tracking-tight">
          Session Has Expired
        </h1>
        <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
          For your data protection, the current session has ended. Any stored tokens have been securely invalidated.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E7EB] bg-white text-[#1D1D1F] text-xs font-semibold hover:bg-[#F5F5F7] transition-all"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In Again</span>
        </Link>
      </div>
    </div>
  );
}
