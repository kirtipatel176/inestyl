interface SectionLoaderProps {
  message?: string;
  subMessage?: string;
  minHeight?: string;
  className?: string;
}

/**
 * Contextual in-section loading placeholder.
 */
export function SectionLoader({
  message = "Loading content...",
  subMessage,
  minHeight = "min-h-[280px]",
  className = "",
}: SectionLoaderProps) {
  return (
    <div
      className={`w-full ${minHeight} flex flex-col items-center justify-center p-8 bg-[#FAFAFA] rounded-2xl border border-[#E5E7EB] ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center max-w-sm text-center space-y-4">
        {/* Minimal Spinner */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#E5E7EB] border-t-[#0071E3] animate-spin" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#1D1D1F]">{message}</p>
          {subMessage && (
            <p className="text-xs text-[#86868B] max-w-xs">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
