/**
 * High-fidelity Skeleton for the Full-Width Hero Campaign Section.
 * Matches HeroFullWidth layout and dimensions while awaiting backend response.
 */
export function HeroSectionSkeleton() {
  return (
    <section
      className="relative w-full h-[88vh] min-h-[600px] max-h-[960px] flex flex-col justify-end items-center overflow-hidden bg-[#0A0A0A] pb-12 sm:pb-16 md:pb-20"
      role="status"
      aria-label="Loading campaign hero"
    >
      {/* Background with subtle pulse animation */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#18181B] via-[#0E0E10] to-[#0A0A0A] animate-pulse" />

      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 pointer-events-none" />

      {/* Hero Content Skeletons */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Eyebrow Kicker */}
        <div className="h-3 w-28 bg-white/20 rounded-full mb-3 animate-pulse" />

        {/* Main Headline */}
        <div className="h-10 sm:h-14 md:h-16 w-3/4 max-w-2xl bg-white/25 rounded-xl mb-4 animate-pulse" />

        {/* Subtitle Description */}
        <div className="space-y-2 w-full max-w-xl mx-auto mb-8">
          <div className="h-3.5 sm:h-4 w-full bg-white/15 rounded animate-pulse" />
          <div className="h-3.5 sm:h-4 w-4/5 mx-auto bg-white/15 rounded animate-pulse" />
        </div>

        {/* CTA Button */}
        <div>
          <div className="h-12 w-48 bg-white/30 rounded-full animate-pulse shadow-lg" />
        </div>
      </div>
    </section>
  );
}
