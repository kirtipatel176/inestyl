export function ProductOrbitLighting() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* 1. Base architectural warm studio ambient tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFBFD] via-[#F4F5F8] to-[#ECEEF2]" />

      {/* 2. Top-center directional key light centered on the exhibition stage */}
      <div
        className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[160px] opacity-75"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(246,247,250,0.65) 45%, transparent 70%)",
        }}
      />

      {/* 3. Subtle architectural micro-grid lines (restrained studio depth) */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#1D1D1F_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* 4. Bottom ground ambient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ECEEF2]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
