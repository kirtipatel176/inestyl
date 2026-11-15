import Link from "next/link";
import { MapPin } from "lucide-react";
import { ANNOUNCEMENT_CONFIG } from "@/config/announcement";
import { STORE_DETAILS } from "@/constants";

export function AnnouncementBar() {
  // Hide automatically when no announcement is configured or when disabled
  if (!ANNOUNCEMENT_CONFIG.enabled || !ANNOUNCEMENT_CONFIG.message?.trim()) {
    return null;
  }

  return (
    <aside
      aria-label="Store Announcement"
      className="bg-[#1D1D1F] text-white text-[11px] sm:text-[12px] font-normal h-[36px] min-h-[36px] flex items-center border-b border-white/10 select-none transition-colors"
    >
      <div className="container-luxury flex items-center justify-between w-full">
        {/* Announcement Message & Optional Link */}
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="text-[#E5E7EB] truncate">
            {ANNOUNCEMENT_CONFIG.message}
          </span>
          {ANNOUNCEMENT_CONFIG.linkText && ANNOUNCEMENT_CONFIG.linkHref && (
            <Link
              href={ANNOUNCEMENT_CONFIG.linkHref}
              className="inline-flex items-center text-[#2997FF] hover:text-white transition-colors underline-offset-4 hover:underline font-medium flex-shrink-0"
            >
              <span>{ANNOUNCEMENT_CONFIG.linkText}</span>
            </Link>
          )}
        </div>

        {/* Right side: Verified physical store location */}
        <div className="hidden md:flex items-center gap-1.5 text-neutral-400 flex-shrink-0">
          <MapPin className="w-3 h-3 text-[#2997FF]" />
          <Link
            href="/store"
            className="hover:text-white transition-colors text-[11px]"
            title={`Visit ${STORE_DETAILS.name} in ${STORE_DETAILS.locationDisplay}`}
          >
            <span>{STORE_DETAILS.locationDisplay}</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
