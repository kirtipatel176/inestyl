export default function CollectionsLoading() {
  return (
    <div className="container-luxury py-8 sm:py-12 space-y-10 sm:space-y-14 animate-pulse" role="status" aria-label="Loading collections">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-12 bg-[#E5E7EB] rounded" />
        <span className="text-[#86868B]">/</span>
        <div className="h-3 w-24 bg-[#E5E7EB] rounded" />
      </div>

      {/* 2. Header Skeleton */}
      <div className="max-w-3xl space-y-3 pb-6 border-b border-[#E5E7EB]">
        <div className="h-3 w-32 bg-[#E5E7EB] rounded" />
        <div className="h-10 w-72 bg-[#E5E7EB] rounded" />
        <div className="h-4 w-full bg-[#E5E7EB] rounded" />
      </div>

      {/* 3. Campaign Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F5F5F7] aspect-[4/3] flex flex-col justify-end p-6 space-y-2">
            <div className="h-5 w-24 bg-[#E5E7EB] rounded-full" />
            <div className="h-7 w-48 bg-[#E5E7EB] rounded" />
            <div className="h-3 w-full bg-[#E5E7EB] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
