import { Loader2 } from "lucide-react";

interface FullPageLoaderProps {
  message?: string;
  subMessage?: string;
}

/**
 * Premium full-page loader matching the iNESTYL OUTLET minimalist luxury brand aesthetic.
 */
export function FullPageLoader({
  message = "Loading Flagship Catalogue...",
  subMessage = "Authentic Multi-Brand Footwear & Apparel",
}: FullPageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm p-6 text-center">
      <div className="flex flex-col items-center max-w-sm space-y-5 animate-pulse">
        {/* Brand Crest Plinth */}
        <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center shadow-subtle relative">
          <div className="w-8 h-8 rounded-full border-2 border-[#E5E7EB] border-t-[#0071E3] animate-spin" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0071E3] block">
            iNESTYL OUTLET
          </span>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1D1D1F] tracking-tight">
            {message}
          </h2>
          {subMessage && (
            <p className="text-xs text-[#86868B] max-w-xs leading-relaxed">
              {subMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
