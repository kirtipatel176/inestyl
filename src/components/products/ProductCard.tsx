"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { ProductItem, getProductAvailability } from "@/constants/mock-data";
import { STORE_DETAILS } from "@/constants";
import { getOptimizedImagePath } from "@/lib/images";

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.inStockSizes[0] || product.sizes[0]
  );

  const availability = getProductAvailability(product);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message =
      `Hello iNESTYL OUTLET Kapadwanj,\n\n` +
      `I am interested in checking stock availability for:\n` +
      `• Product: ${product.title} (${product.brand})\n` +
      `• Size: UK ${selectedSize}\n` +
      `• Outlet Price: ₹${product.outletPrice.toLocaleString("en-IN")}\n` +
      `• Store SKU: ${product.sku}\n\n` +
      `Please let me know if this pair is currently available in the Kapadwanj store.`;

    const url = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <article className="group bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:border-[#86868B] hover:shadow-subtle flex flex-col justify-between">
      <div>
        {/* 1. Large High-Quality Product Image */}
        <Link
          href={`/product/${product.slug}`}
          className="block relative aspect-square bg-[#F5F5F7] p-6 overflow-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src={getOptimizedImagePath(product.image, "listing")}
              alt={product.title}
              fill
              loading="lazy"
              quality={75}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain drop-shadow-sm transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        {/* 2. Content */}
        <div className="p-4 sm:p-5 space-y-2">
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#6E6E73] uppercase block">
              {product.brand}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                availability === "In Stock"
                  ? "text-emerald-700"
                  : availability === "Limited Stock"
                  ? "text-amber-700"
                  : "text-[#6E6E73]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  availability === "In Stock"
                    ? "bg-emerald-600"
                    : availability === "Limited Stock"
                    ? "bg-amber-600"
                    : "bg-neutral-400"
                }`}
              />
              <span>{availability}</span>
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-heading text-sm sm:text-base font-medium text-[#1D1D1F] line-clamp-1 group-hover:text-[#0071E3] transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-base sm:text-lg font-semibold text-[#1D1D1F]">
              ₹{product.outletPrice.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.outletPrice && (
              <span className="text-xs text-[#6E6E73] line-through font-normal">
                MRP ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Minimal Colour Swatches */}
          {product.colours && product.colours.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.colours.map((col) => (
                <span
                  key={col.name}
                  title={col.name}
                  style={{ backgroundColor: col.hex }}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                />
              ))}
              <span className="text-[11px] text-[#6E6E73] ml-1">
                {product.colours.length} {product.colours.length === 1 ? "color" : "colors"}
              </span>
            </div>
          )}

          {/* Size Selector */}
          <div className="pt-1.5">
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 5).map((size) => {
                const isAvailable = product.inStockSizes.includes(size);
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedSize(size)}
                    className={`w-7 h-7 rounded text-[11px] font-medium transition-colors ${
                      isSelected
                        ? "bg-[#0071E3] text-white"
                        : isAvailable
                        ? "bg-[#FFFFFF] border border-[#E5E7EB] text-[#1D1D1F] hover:border-[#1D1D1F]"
                        : "bg-[#F5F5F7] text-[#86868B] border border-[#E5E7EB] line-through cursor-not-allowed opacity-50"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
              {product.sizes.length > 5 && (
                <Link
                  href={`/product/${product.slug}`}
                  className="w-7 h-7 rounded text-[11px] font-medium text-[#6E6E73] bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
                >
                  +{product.sizes.length - 5}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Links: Simple View Details & WhatsApp Enquiry */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] text-xs">
          <Link
            href={`/product/${product.slug}`}
            className="text-xs font-medium text-[#0071E3] hover:text-[#0066CC] transition-colors"
          >
            View Details
          </Link>

          <button
            onClick={handleWhatsAppClick}
            aria-label="Enquire on WhatsApp"
            className="text-[11px] font-medium text-[#1B8A42] hover:underline flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3 text-[#25D366]" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </article>
  );
}
