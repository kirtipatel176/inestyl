/**
 * High-fidelity Product Detail Skeleton matching ProductDetailClient layout.
 */
export function ProductDetailSkeleton() {
  return (
    <div className="container-luxury py-8 space-y-12 animate-pulse" role="status" aria-label="Loading product details">
      {/* 1. Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-12 bg-[#E5E7EB] rounded" />
        <span className="text-[#86868B]">/</span>
        <div className="h-3 w-16 bg-[#E5E7EB] rounded" />
        <span className="text-[#86868B]">/</span>
        <div className="h-3 w-32 bg-[#E5E7EB] rounded" />
      </div>

      {/* 2. Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Vertical Thumbnails + Main Showcase Plinth */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]" />
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]" />
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]" />
          </div>

          {/* Main Image Plinth */}
          <div className="relative flex-1 aspect-square sm:aspect-[4/3] bg-[#F5F5F7] rounded-2xl border border-[#E5E7EB] flex items-center justify-center p-8">
            <div className="w-1/2 h-1/2 bg-[#E5E7EB] rounded-xl" />
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brand & Subcategory */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-20 bg-[#E5E7EB] rounded" />
              <div className="h-3.5 w-16 bg-[#E5E7EB] rounded" />
            </div>
            <div className="h-8 w-4/5 bg-[#E5E7EB] rounded" />
            <div className="h-3 w-40 bg-[#E5E7EB] rounded" />
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#E5E7EB]">
            <div className="h-9 w-28 bg-[#E5E7EB] rounded" />
            <div className="h-5 w-20 bg-[#E5E7EB] rounded" />
            <div className="h-6 w-20 bg-[#E5E7EB] rounded-full" />
          </div>

          {/* Live Store Inventory Banner */}
          <div className="h-10 w-full bg-[#F5F5F7] rounded-xl border border-[#E5E7EB]" />

          {/* Colour Chips */}
          <div className="space-y-2">
            <div className="h-3 w-20 bg-[#E5E7EB] rounded" />
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-[#E5E7EB]" />
              <div className="w-7 h-7 rounded-full bg-[#E5E7EB]" />
            </div>
          </div>

          {/* Size Chips */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-[#E5E7EB] rounded" />
              <div className="h-3 w-16 bg-[#E5E7EB] rounded" />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 bg-[#F5F5F7] rounded-xl border border-[#E5E7EB]" />
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="h-12 w-full bg-[#E5E7EB] rounded-full" />
            <div className="h-12 w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-full" />
          </div>

          {/* Physical Store Pill */}
          <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] space-y-2">
            <div className="h-3.5 w-48 bg-[#E5E7EB] rounded" />
            <div className="h-3 w-36 bg-[#E5E7EB] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
