"use client";

import { useState } from "react";
import { Video, Play, RefreshCw, AlertCircle, MessageSquare } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

interface VideoPlaceholderProps {
  videoUrl?: string;
  title?: string;
  poster?: string;
  className?: string;
}

/**
 * Video loading placeholder with buffering skeleton, play control, and failure fallback.
 */
export function VideoPlaceholder({
  videoUrl,
  title = "HD Product Showcase",
  poster,
  className = "",
}: VideoPlaceholderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = () => {
    if (!videoUrl) return;
    setIsLoading(true);
    setIsPlaying(true);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  const handleWhatsAppVideoRequest = () => {
    const text = `Hello iNESTYL OUTLET Kapadwanj,\n\nCan you share a live video preview of ${title} on WhatsApp?`;
    window.open(`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (hasError || !videoUrl) {
    return (
      <div
        className={`relative aspect-video w-full rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] flex flex-col items-center justify-center p-6 text-center space-y-3 ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#86868B] shadow-xs">
          <Video className="w-5 h-5 text-[#86868B]" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#1D1D1F]">
            {hasError ? "Video showcase temporarily unavailable" : "Live Store Video Available on Request"}
          </p>
          <p className="text-[11px] text-[#86868B] max-w-xs">
            Connect directly with our Kapadwanj store team to view a live 360° product video on WhatsApp.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasError && (
            <button
              type="button"
              onClick={handleRetry}
              className="px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3 text-[#0071E3]" />
              <span>Retry</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleWhatsAppVideoRequest}
            className="px-3.5 py-1.5 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all flex items-center gap-1.5 shadow-subtle"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Request Video on WhatsApp</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video w-full rounded-2xl bg-neutral-900 border border-[#E5E7EB] overflow-hidden ${className}`}
    >
      {!isPlaying ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer group">
          {poster && (
            <img
              src={poster}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />

          {/* Play Plinth */}
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play showcase video for ${title}`}
            className="relative z-10 w-14 h-14 rounded-full bg-white/95 text-[#0071E3] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 active:scale-95 pl-1"
          >
            <Play className="w-6 h-6 fill-current" />
          </button>

          <div className="relative z-10 mt-3 text-center">
            <span className="text-xs font-semibold text-white tracking-wide block drop-shadow-sm">
              Watch 4K Showcase Video
            </span>
            <span className="text-[10px] text-white/80 font-medium">
              Recorded at Kapadwanj Flagship Store
            </span>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
          )}
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            onLoadedData={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
