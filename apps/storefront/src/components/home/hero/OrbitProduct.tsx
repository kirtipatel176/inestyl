import React, { forwardRef } from "react";
import Image from "next/image";
import { OrbitProductItem } from "./types";

interface OrbitProductProps {
  product: OrbitProductItem;
  index: number;
  isFeatured?: boolean;
  onClick?: () => void;
}

export const OrbitProduct = forwardRef<HTMLDivElement, OrbitProductProps>(
  ({ product, index, isFeatured = false, onClick }, ref) => {
    const isFootwear =
      product.department === "footwear" ||
      product.subcategory?.toLowerCase().includes("shoe") ||
      product.subcategory?.toLowerCase().includes("sneaker");

    const isVerticalApparel =
      product.aspectRatio && product.aspectRatio < 0.95;

    // Source image: prefer verified transparent cutout, fallback to catalogue image
    const imageSrc = product.cutoutUrl || product.imageUrl;

    return (
      <div
        ref={ref}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={`View ${product.brand} ${product.title}`}
        className="absolute top-1/2 left-1/2 cursor-pointer select-none outline-none group will-change-transform"
        style={{
          // Default initial positioning centered on origin
          transform: "translate(-50%, -50%) translate3d(0, 0, 0) scale(1)",
          zIndex: 10,
        }}
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* 1. Dynamic Contact Shadow on Ground/Pedestal */}
          <div
            className="absolute -bottom-2 w-[80%] h-3 rounded-[50%] blur-[7px] opacity-25 pointer-events-none transition-all duration-300 group-hover:opacity-40 group-hover:scale-105"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(10,12,18,0.7) 0%, rgba(20,24,36,0.2) 60%, transparent 80%)",
            }}
          />

          {/* 2. Isolated Product Cutout Container (Normalized sizing based on aspect ratio) */}
          <div
            className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
              isVerticalApparel
                ? "w-[125px] h-[180px] sm:w-[150px] sm:h-[215px] lg:w-[170px] lg:h-[245px]"
                : isFootwear
                ? "w-[180px] h-[130px] sm:w-[220px] sm:h-[160px] lg:w-[255px] lg:h-[185px]"
                : "w-[175px] h-[135px] sm:w-[210px] sm:h-[160px] lg:w-[245px] lg:h-[185px]"
            }`}
          >
            <Image
              src={imageSrc}
              alt={`${product.brand} ${product.title}`}
              fill
              sizes="(max-width: 640px) 190px, (max-width: 1024px) 240px, 300px"
              priority={index < 4}
              className="object-contain object-center transition-all duration-300 pointer-events-none"
              style={{
                // Authentic silhouette shadow that follows the shoe/apparel contours
                filter: "drop-shadow(0 10px 16px rgba(0, 0, 0, 0.12))",
              }}
            />
          </div>

          {/* 3. Subtle Luxury Focus Ring on Hover */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-[#0071E3]/0 group-hover:ring-[#0071E3]/25 transition-all duration-300 pointer-events-none" />
        </div>
      </div>
    );
  }
);

OrbitProduct.displayName = "OrbitProduct";
