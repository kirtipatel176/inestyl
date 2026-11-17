/**
 * High-fidelity Skeleton for the Shop by Collection Section.
 * Matches ShopByCollectionSection asymmetric editorial grid (7-5 / 5-7 colSpan) while awaiting backend response.
 */
export function CollectionsSectionSkeleton() {
  return (
    <section
      className="container-luxury space-y-8 sm:space-y-12 animate-pulse"
      role="status"
      aria-label="Loading collections"
    >
      {/* Section Header Skeleton */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="h-9 sm:h-12 w-64 bg-[#E5E7EB] rounded-lg mx-auto" />
        <div className="h-4 w-80 max-w-full bg-[#E5E7EB] rounded mx-auto" />
      </div>

      {/* Asymmetric Editorial Grid: 4 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {[
          "lg:col-span-7",
          "lg:col-span-5",
          "lg:col-span-5",
          "lg:col-span-7",
        ].map((colSpan, idx) => (
          <div
            key={idx}
            className={`${colSpan} h-[400px] sm:h-[460px] rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] p-6 sm:p-10 flex flex-col justify-end space-y-3 relative overflow-hidden`}
          >
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#E5E7EB]/80 via-[#F5F5F7]/30 to-transparent" />

            {/* Content Details */}
            <div className="relative z-10 space-y-2">
              <div className="h-5 w-24 bg-[#E5E7EB] rounded-full" />
              <div className="h-7 w-48 bg-[#E5E7EB] rounded" />
              <div className="h-3 w-64 max-w-full bg-[#E5E7EB] rounded" />
              <div className="h-4 w-28 bg-[#E5E7EB] rounded pt-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
