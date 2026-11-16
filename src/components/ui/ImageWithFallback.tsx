"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff, RefreshCw, ShoppingBag } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackTitle?: string;
  fallbackBrand?: string;
  aspectRatioClass?: string;
}

/**
 * Image component with skeleton loading placeholder and graceful branded fallback on failure.
 */
export function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  fallbackBrand,
  className = "",
  aspectRatioClass = "aspect-square",
  fill,
  ...rest
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // Reset states if src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleRetry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHasError(false);
    setIsLoading(true);
    setRetryKey((prev) => prev + 1);
  };

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl text-center select-none ${aspectRatioClass} ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#86868B] mb-2 shadow-xs">
          <ShoppingBag className="w-5 h-5 text-[#86868B]" />
        </div>

        {fallbackBrand && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071E3] block">
            {fallbackBrand}
          </span>
        )}

        <span className="text-xs font-semibold text-[#1D1D1F] line-clamp-1 max-w-[160px] mt-0.5">
          {fallbackTitle || alt || "Authentic Stock"}
        </span>

        <span className="text-[10px] text-[#86868B] mt-0.5">
          Kapadwanj Flagship
        </span>

        {src && (
          <button
            type="button"
            onClick={handleRetry}
            className="mt-2.5 px-2.5 py-1 rounded-full bg-white border border-[#E5E7EB] text-[10px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-1 shadow-2xs active:scale-95"
            title="Reload photograph"
          >
            <RefreshCw className="w-2.5 h-2.5 text-[#0071E3]" />
            <span>Reload</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${fill ? "" : aspectRatioClass}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[#F5F5F7] flex items-center justify-center animate-pulse"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#E5E7EB] border-t-[#0071E3] animate-spin opacity-50" />
        </div>
      )}

      {/* Actual Image */}
      <Image
        key={retryKey}
        src={src}
        alt={alt}
        fill={fill}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        {...rest}
      />
    </div>
  );
}
