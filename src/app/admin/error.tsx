"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, LayoutDashboard, LogIn, ShieldAlert } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AdminConsoleError]", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#F5F5F7]">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-10 shadow-subtle text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block">
            ADMIN CONSOLE ERROR
          </span>
          <h1 className="font-heading text-2xl font-bold text-[#1D1D1F] tracking-tight">
            Dashboard Operation Failed
          </h1>
          <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
            The admin management module encountered a processing issue. Unsaved data from this tab could not be finalized.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F5F5F7] text-left border border-[#E5E7EB] space-y-2">
          <span className="text-xs font-semibold text-[#1D1D1F] block">
            Suggested Next Steps:
          </span>
          <ul className="text-xs text-[#86868B] list-disc list-inside space-y-1">
            <li>Try reloading the dashboard module.</li>
            <li>If your administrator session expired, re-authenticate.</li>
            <li>Check network and server connectivity.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0066CC] text-white text-xs font-semibold tracking-normal transition-all shadow-subtle active:scale-98"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Module</span>
          </button>

          <Link
            href="/admin"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E5E7EB] hover:bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin Home</span>
          </Link>
        </div>

        <div className="pt-2 border-t border-[#F5F5F7]">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#86868B] hover:text-[#0071E3] transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Re-authenticate Administrator Session</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
