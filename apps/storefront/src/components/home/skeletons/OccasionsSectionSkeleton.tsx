/**
 * High-fidelity Skeleton for the Shop by Occasion Section.
 * Matches ShopByOccasionSection 4-card grid while awaiting render.
 */
export function OccasionsSectionSkeleton() {
  return (
    <section
      className="container-luxury space-y-8 sm:space-y-12 animate-pulse"
      role="status"
      aria-label="Loading occasions"
    >
      {/* Section Header Skeleton */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="h-9 sm:h-12 w-64 bg-[#E5E7EB] rounded-lg mx-auto" />
        <div className="h-4 w-80 max-w-full bg-[#E5E7EB] rounded mx-auto" />
      </div>

      {/* 4 Occasion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="aspect-[3/4] rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] p-6 flex flex-col justify-end space-y-2 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#E5E7EB]/80 via-[#F5F5F7]/30 to-transparent" />
            <div className="relative z-10 space-y-2">
              <div className="h-6 w-36 bg-[#E5E7EB] rounded" />
              <div className="h-3 w-48 bg-[#E5E7EB] rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
