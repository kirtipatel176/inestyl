import Link from "next/link";
import { ShieldAlert, ArrowLeft, LayoutDashboard } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5E7EB] p-8 space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
            404 • ADMINISTRATIVE RESOURCE NOT FOUND
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
            The requested administrative module, tab, or resource does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#1D1D1F] text-xs font-semibold hover:bg-[#F5F5F7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
