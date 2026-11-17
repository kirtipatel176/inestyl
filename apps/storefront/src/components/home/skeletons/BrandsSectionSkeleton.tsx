/**
 * High-fidelity Skeleton for the Discover Brands Section.
 * Matches DiscoverBrandsSection 6-tile grid while awaiting backend response.
 */
export function BrandsSectionSkeleton() {
  return (
    <section
      className="container-luxury space-y-8 sm:space-y-12 animate-pulse"
      role="status"
      aria-label="Loading brands"
    >
      {/* Section Header Skeleton */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="h-9 sm:h-12 w-56 bg-[#E5E7EB] rounded-lg mx-auto" />
        <div className="h-4 w-80 max-w-full bg-[#E5E7EB] rounded mx-auto" />
      </div>

      {/* Brand Grid: 6 Balanced Minimalist Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-6 h-36 sm:h-44 rounded-2xl bg-[#FBFBFB] border border-[#E5E7EB] space-y-3"
          >
            {/* Logo Silhouette */}
            <div className="w-16 h-10 bg-[#E5E7EB] rounded-md" />
            {/* Brand Name Text */}
            <div className="h-3 w-14 bg-[#E5E7EB] rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}
