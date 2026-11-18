/**
 * High-fidelity Skeleton for the Full-Width Hero Campaign Section.
 * Matches HeroFullWidth layout and dimensions while awaiting backend response.
 */
export function HeroSectionSkeleton() {
  return (
    <section
      className="relative w-full h-[100vh] min-h-[680px] max-h-[1080px] -mt-[48px] sm:-mt-[50px] overflow-hidden select-none bg-[#EFEFF1] flex flex-col justify-between items-center"
      role="status"
      aria-label="Loading campaign hero"
    >
      {/* Background with subtle pulse animation matching light studio aesthetic */}
      <div className="absolute inset-0 w-full h-full bg-[#E8E8EA] animate-pulse" />

      {/* Upper Region Text Group Skeleton */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 pt-[15vh] sm:pt-[17vh] md:pt-[18vh] flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="h-3.5 w-36 bg-black/10 rounded-full mb-3 sm:mb-4 animate-pulse" />

        {/* Main Headline (2 lines) */}
        <div className="space-y-2.5 w-full max-w-lg mx-auto flex flex-col items-center mb-4">
          <div className="h-10 sm:h-12 md:h-14 w-3/4 bg-black/15 rounded-xl animate-pulse" />
          <div className="h-10 sm:h-12 md:h-14 w-4/5 bg-black/15 rounded-xl animate-pulse" />
        </div>

        {/* Subtitle Description */}
        <div className="space-y-2 w-full max-w-xl mx-auto mt-2">
          <div className="h-3.5 sm:h-4 w-full bg-black/10 rounded animate-pulse" />
          <div className="h-3.5 sm:h-4 w-3/4 mx-auto bg-black/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Bottom CTA Block Skeleton */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-6 pb-10 sm:pb-12 md:pb-14 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          <div className="h-11 w-44 bg-black/20 rounded-full animate-pulse shadow-sm" />
          <div className="h-11 w-40 bg-black/10 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
