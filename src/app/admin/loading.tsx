export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-4 max-w-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#1D1D1F] flex items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent" />
          <span className="font-serif font-black text-white text-lg tracking-widest">IN</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-[#1D1D1F] tracking-tight">INESTYLE OUTLET</h3>
          <p className="text-xs text-[#86868B]">Loading management console...</p>
        </div>
        <div className="w-40 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#1D1D1F] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
