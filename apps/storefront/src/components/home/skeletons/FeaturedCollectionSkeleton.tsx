/**
 * High-fidelity Skeleton for the Featured Collection Section.
 * Matches FeaturedCollectionSection layout (header, 6 product cards, and CTA) while awaiting backend response.
 */
export function FeaturedCollectionSkeleton() {
  return (
    <section
      className="container-luxury space-y-8 sm:space-y-12 animate-pulse"
      role="status"
      aria-label="Loading featured collection"
    >
      {/* Section Header Skeleton */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="h-9 sm:h-12 w-64 bg-[#E5E7EB] rounded-lg mx-auto" />
        <div className="h-4 w-80 max-w-full bg-[#E5E7EB] rounded mx-auto" />
      </div>

      {/* Product Cards Grid: 6 items in 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-[#FBFBFB] rounded-2xl overflow-hidden border border-[#E5E7EB]"
          >
            {/* Image Placeholder */}
            <div className="aspect-square w-full bg-[#F5F5F7] p-8 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-[#E5E7EB] rounded-xl" />
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-3 bg-[#FFFFFF]">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-[#E5E7EB] rounded" />
                <div className="h-4 w-4/5 bg-[#E5E7EB] rounded" />
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-[#F5F5F7]">
                <div className="h-5 w-20 bg-[#E5E7EB] rounded" />
                <div className="h-3 w-12 bg-[#E5E7EB] rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All CTA Button Skeleton */}
      <div className="text-center pt-4">
        <div className="h-11 w-44 bg-[#E5E7EB] rounded-full mx-auto" />
      </div>
    </section>
  );
}
