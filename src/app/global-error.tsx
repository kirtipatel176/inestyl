"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error trace
    console.error("[GlobalRootError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#F5F5F7] text-[#1D1D1F] p-4 font-sans antialiased">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5E7EB] p-8 text-center space-y-6 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block">
              CRITICAL SYSTEM FAULT
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F]">
              Temporary Application Interruption
            </h1>
            <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
              iNESTYL OUTLET encountered an unexpected condition. Your connection and physical store services remain active.
            </p>
          </div>

          <div className="p-3 bg-[#F5F5F7] rounded-xl text-left border border-[#E5E7EB]">
            <span className="text-[11px] font-semibold text-[#1D1D1F] block mb-0.5">
              Flagship Outlet Assistance:
            </span>
            <p className="text-[11px] text-[#86868B]">
              Station Road, Kapadwanj • WhatsApp / Phone: +91 79844 71196
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0066CC] text-white text-xs font-semibold tracking-normal transition-all shadow-subtle active:scale-98"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Application</span>
            </button>
            <a
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E5E7EB] hover:bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
