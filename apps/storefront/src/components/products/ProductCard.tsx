"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Video, Sparkles, CheckCircle2 } from "lucide-react";
import { Product } from "@inestyle/shared-types";

function getProductAvailability(p: Product): string {
  if (!p.inStockSizes || p.inStockSizes.length === 0) return "Contact for Availability";
  if (p.inStockSizes.length < (p.sizes?.length || 0)) return "Limited Stock";
  return "In Stock";
}
import { STORE_DETAILS } from "@/constants";
import { getOptimizedImagePath, getProductImageFitting } from "@/lib/images";
import { trackEvent } from "@/lib/analytics";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { WhatsAppFallbackModal } from "@/components/shared/WhatsAppFallbackModal";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.inStockSizes?.[0] || product.sizes?.[0] || ""
  );
  const [isWhatsAppFallbackOpen, setIsWhatsAppFallbackOpen] = useState(false);
  const [waMessage, setWaMessage] = useState("");

  const availability = getProductAvailability(product);
  const isFootwear = product.type === "footwear";
  const fitting = getProductImageFitting(product.image, product.type);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Actual event-based analytics tracking
    trackEvent("whatsapp_click", product.id, product.title, {
      sku: product.sku,
      brand: product.brand,
      size: selectedSize,
      outletPrice: product.outletPrice,
    });

    const sizeFormatted = isFootwear ? `UK ${selectedSize}` : selectedSize;
    const message =
      `Hello iNESTYL OUTLET Kapadwanj,\n\n` +
      `I am interested in checking stock availability for:\n` +
      `• Product: ${product.title} (${product.brand})\n` +
      `• Store SKU: ${product.sku}\n` +
      `• Size: ${sizeFormatted}\n` +
      `• Outlet Price: ₹${product.outletPrice.toLocaleString("en-IN")}\n\n` +
      `Please let me know if this item is currently available in the Kapadwanj flagship store.`;

    setWaMessage(message);

    const url = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    try {
      const opened = window.open(url, "_blank");
      if (!opened || opened.closed || typeof opened.closed === "undefined") {
        setIsWhatsAppFallbackOpen(true);
      }
    } catch {
      setIsWhatsAppFallbackOpen(true);
    }
  };

  return (
    <article className="group bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:border-[#86868B] hover:shadow-subtle flex flex-col justify-between relative">
      <div>
        {/* 1. Consistent Square Product Image Container */}
        <Link
          href={`/product/${product.slug}`}
          className="product-image-container relative block w-full aspect-square bg-[#F5F5F7] overflow-hidden p-2.5 sm:p-3.5 lg:p-4 select-none"
        >
          {/* Top Badges Overlay (Featured, New Arrival, Video availability) */}
          <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 z-10 flex items-start justify-between gap-1 pointer-events-none">
            <div className="flex flex-col gap-1 items-start">
              {product.isNew && (
                <span className="bg-[#1D1D1F] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                  New Arrival
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-[#0071E3] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Featured
                </span>
              )}
            </div>

            {(product.hasVideo || product.videoUrl) && (
              <span
                title="HD Product Showcase Video Available"
                className="bg-white/95 backdrop-blur-xs text-[#1D1D1F] text-[9px] font-semibold px-2 py-0.5 rounded shadow-xs border border-[#E5E7EB] flex items-center gap-1"
              >
                <Video className="w-2.5 h-2.5 text-[#0071E3]" /> Video
              </span>
            )}
          </div>

          {/* Interactive Zoom Wrapper on Hover */}
          <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            {/* Visual Scaling Wrapper compensating for source image whitespace */}
            <div className={`relative w-full h-full flex items-center justify-center ${fitting.scaleClass}`}>
              <ImageWithFallback
                src={getOptimizedImagePath(product.image, "listing")}
                alt={product.title}
                fallbackTitle={product.title}
                fallbackBrand={product.brand}
                fill
                priority={priority}
                loading={priority ? undefined : "lazy"}
                quality={85}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`product-image ${fitting.objectFitClass} object-center drop-shadow-xs`}
              />
            </div>
          </div>
        </Link>

        {/* 2. Content */}
        <div className="p-4 sm:p-5 space-y-2">
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#6E6E73] uppercase block truncate">
              {product.brand}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium shrink-0 ${
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

          {/* SKU Display */}
          <div className="text-[10px] text-[#86868B] font-mono tracking-wide">
            SKU: <span className="text-[#1D1D1F] font-semibold">{product.sku}</span>
          </div>

          {/* Pricing & Discount */}
          <div className="flex items-center gap-2 pt-0.5 flex-wrap">
            <span className="text-base sm:text-lg font-semibold text-[#1D1D1F]">
              ₹{product.outletPrice.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.outletPrice && (
              <span className="text-xs text-[#6E6E73] line-through font-normal">
                MRP ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-[#0071E3]/10 text-[#0071E3] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Colour Swatches */}
          {product.colours && product.colours.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.colours.map((col) => (
                <span
                  key={col.name}
                  title={col.name}
                  style={{ backgroundColor: col.hex }}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shadow-2xs"
                />
              ))}
              <span className="text-[11px] text-[#6E6E73] ml-1">
                {product.colours.length} {product.colours.length === 1 ? "colour" : "colours"}
              </span>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pt-1.5">
              <div className="flex flex-wrap gap-1">
                {product.sizes.slice(0, 5).map((size) => {
                  const isAvailable = product.inStockSizes?.includes(size);
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
          )}
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
            className="text-[11px] font-semibold text-[#1B8A42] hover:underline flex items-center gap-1.5 py-1 px-2 rounded-lg bg-emerald-50 border border-emerald-100 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Enquire</span>
          </button>
        </div>
      </div>

      <WhatsAppFallbackModal
        isOpen={isWhatsAppFallbackOpen}
        onClose={() => setIsWhatsAppFallbackOpen(false)}
        messageText={waMessage}
        productTitle={product.title}
      />
    </article>
  );
}
