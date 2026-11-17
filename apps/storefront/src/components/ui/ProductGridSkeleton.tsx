interface ProductGridSkeletonProps {
  count?: number;
  columnsClass?: string;
}

/**
 * High-fidelity Product Grid Skeleton matching ProductCard layout.
 */
export function ProductGridSkeleton({
  count = 8,
  columnsClass = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
}: ProductGridSkeletonProps) {
  return (
    <div
      className={`grid ${columnsClass} gap-3.5 sm:gap-6`}
      role="status"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden flex flex-col justify-between animate-pulse"
        >
          {/* 1. Image Plinth Skeleton */}
          <div className="product-image-container relative aspect-square bg-[#F5F5F7] p-2.5 sm:p-3.5 lg:p-4 overflow-hidden flex items-center justify-center">
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-16 h-4 bg-[#E5E7EB] rounded" />
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-12 h-4 bg-[#E5E7EB] rounded" />
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-4/5 h-4/5 bg-[#E5E7EB]/70 rounded-lg" />
            </div>
          </div>

          {/* 2. Content Skeleton */}
          <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              {/* Brand & Stock Status */}
              <div className="flex items-center justify-between gap-2">
                <div className="h-3 w-16 bg-[#E5E7EB] rounded" />
                <div className="h-3 w-14 bg-[#E5E7EB] rounded-full" />
              </div>

              {/* Product Title */}
              <div className="h-4 w-4/5 bg-[#E5E7EB] rounded" />

              {/* Pricing Row */}
              <div className="flex items-baseline gap-2 pt-1">
                <div className="h-5 w-20 bg-[#E5E7EB] rounded" />
                <div className="h-3.5 w-12 bg-[#E5E7EB] rounded" />
                <div className="h-4 w-12 bg-[#E5E7EB] rounded-full" />
              </div>
            </div>

            {/* Size Selector Strip */}
            <div className="space-y-1.5 pt-2 border-t border-[#F5F5F7]">
              <div className="h-2.5 w-12 bg-[#E5E7EB] rounded" />
              <div className="flex items-center gap-1 overflow-hidden">
                <div className="w-7 h-6 bg-[#E5E7EB] rounded" />
                <div className="w-7 h-6 bg-[#E5E7EB] rounded" />
                <div className="w-7 h-6 bg-[#E5E7EB] rounded" />
                <div className="w-7 h-6 bg-[#E5E7EB] rounded" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <div className="h-8 bg-[#E5E7EB] rounded-full" />
              <div className="h-8 bg-[#E5E7EB] rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
