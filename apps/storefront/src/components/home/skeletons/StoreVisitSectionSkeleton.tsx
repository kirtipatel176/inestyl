/**
 * High-fidelity Skeleton for the Flagship Store Visit & Trust Pillars Section.
 * Matches VisitOurStore and TrustPillarsAnimated while awaiting render or backend configuration.
 */
export function StoreVisitSectionSkeleton() {
  return (
    <div className="space-y-16 animate-pulse" role="status" aria-label="Loading store info">
      {/* 1. Visit Store Skeleton */}
      <section className="container-luxury space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div className="space-y-2">
            <div className="h-3 w-28 bg-[#E5E7EB] rounded" />
            <div className="h-8 w-64 bg-[#E5E7EB] rounded" />
            <div className="h-3.5 w-96 max-w-full bg-[#E5E7EB] rounded" />
          </div>
          <div className="h-9 w-36 bg-[#E5E7EB] rounded-full" />
        </div>

        {/* Store Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FBFBFB] border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
          <div className="lg:col-span-6 space-y-4">
            <div className="h-5 w-48 bg-[#E5E7EB] rounded" />
            <div className="h-4 w-72 bg-[#E5E7EB] rounded" />
            <div className="h-4 w-60 bg-[#E5E7EB] rounded" />
            <div className="pt-2 flex gap-3">
              <div className="h-10 w-32 bg-[#E5E7EB] rounded-full" />
              <div className="h-10 w-36 bg-[#E5E7EB] rounded-full" />
            </div>
          </div>
          <div className="lg:col-span-6 h-56 bg-[#E5E7EB]/60 rounded-xl" />
        </div>
      </section>

      {/* 2. Trust Pillars Skeleton */}
      <section className="container-luxury" aria-label="Loading store guarantees">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-[#E5E7EB]">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="h-4 w-32 bg-[#E5E7EB] rounded" />
              <div className="h-3 w-48 bg-[#E5E7EB] rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
