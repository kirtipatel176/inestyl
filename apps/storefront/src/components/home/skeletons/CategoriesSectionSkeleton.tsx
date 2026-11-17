/**
 * High-fidelity Skeleton for the Explore Categories Section.
 * Matches ExploreCategoriesSection 4-card editorial grid while awaiting backend response.
 */
export function CategoriesSectionSkeleton() {
  return (
    <section
      className="container-luxury space-y-8 sm:space-y-12 animate-pulse"
      role="status"
      aria-label="Loading categories"
    >
      {/* Section Header Skeleton */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="h-9 sm:h-12 w-64 bg-[#E5E7EB] rounded-lg mx-auto" />
        <div className="h-4 w-80 max-w-full bg-[#E5E7EB] rounded mx-auto" />
      </div>

      {/* 4 Large Editorial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F5F5F7] border border-[#E5E7EB] p-6 sm:p-8 flex flex-col justify-end space-y-3"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#E5E7EB]/80 via-[#F5F5F7]/30 to-transparent" />
            <div className="relative z-10 space-y-2">
              <div className="h-7 w-3/4 bg-[#E5E7EB] rounded-md" />
              <div className="h-4 w-28 bg-[#E5E7EB] rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
