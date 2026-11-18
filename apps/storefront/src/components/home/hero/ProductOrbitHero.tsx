import React from "react";
import { ProductOrbitHeroProps } from "./types";
import { ProductOrbitScene } from "./ProductOrbitScene";
import { ProductOrbitLighting } from "./ProductOrbitLighting";
import { DEFAULT_ORBIT_PRODUCTS } from "./defaultProducts";

/**
 * INESTYLE OUTLET — Complete Centred 3D Circular Product Showcase Hero
 *
 * Design Architecture:
 * - 100% full-width centered luxury fashion installation
 * - Left-side editorial column completely removed
 * - Five individual clothing and footwear products rotating around a stationary platform
 * - Apple-inspired minimalist visual language
 * - Fully centered horizontally and vertically
 */
export function ProductOrbitHero({
  products = DEFAULT_ORBIT_PRODUCTS,
  config,
}: ProductOrbitHeroProps) {
  const displayProducts =
    products && products.length >= 5 ? products : DEFAULT_ORBIT_PRODUCTS;

  return (
    <section
      aria-label="INESTYLE OUTLET 3D Product Showcase"
      className="relative w-full min-h-[88vh] lg:h-[92vh] max-h-[1020px] flex flex-col items-center justify-center overflow-hidden bg-[#FAFBFD]"
    >
      {/* 1. Fixed Minimal Architectural Studio Lighting */}
      <ProductOrbitLighting />

      {/* 2. Fully Centred 3D Product Installation */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <ProductOrbitScene products={displayProducts} config={config} />
      </div>
    </section>
  );
}
