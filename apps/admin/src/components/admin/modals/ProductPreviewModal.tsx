"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Monitor,
  Smartphone,
  X,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Check,
  Video,
  Sparkles,
} from "lucide-react";
import { Product } from "@/types";
import { STORE_DETAILS } from "@/constants";

interface ProductPreviewModalProps {
  product: Product;
  initialMode?: "desktop" | "mobile";
  onClose: () => void;
  onPublishNow?: (productId: string) => void;
}

export function ProductPreviewModal({
  product,
  initialMode = "desktop",
  onClose,
  onPublishNow,
}: ProductPreviewModalProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">(initialMode);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.inStockSizes?.[0] || product.sizes?.[0] || ""
  );

  const isFootwear = product.type === "footwear";
  const isPublished = product.status === "published";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-md">
      <div className="bg-[#F5F5F7] rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-white/20">
        {/* Top Control Bar */}
        <div className="bg-[#FFFFFF] px-6 py-3.5 border-b border-[#E5E7EB] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                product.status === "published"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : product.status === "scheduled"
                  ? "bg-purple-50 text-purple-700 border border-purple-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {product.status?.toUpperCase() || "DRAFT"} PREVIEW
            </span>
            <span className="text-xs font-semibold text-[#1D1D1F] hidden sm:inline truncate max-w-xs">
              {product.title}
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#F5F5F7] p-1 rounded-xl border border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "desktop"
                  ? "bg-[#FFFFFF] text-[#1D1D1F] shadow-xs"
                  : "text-[#6E6E73] hover:text-[#1D1D1F]"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "mobile"
                  ? "bg-[#FFFFFF] text-[#1D1D1F] shadow-xs"
                  : "text-[#6E6E73] hover:text-[#1D1D1F]"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!isPublished && onPublishNow && (
              <button
                type="button"
                onClick={() => {
                  onPublishNow(product.id);
                  onClose();
                }}
                className="px-4 py-1.5 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-colors"
              >
                Publish Now
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center">
          {viewMode === "desktop" ? (
            /* DESKTOP PREVIEW CONTAINER */
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-subtle max-w-4xl w-full p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[78vh]">
              {/* Product Layout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Media Showcase */}
                <div className="space-y-4">
                  <div className="relative aspect-square bg-[#F5F5F7] rounded-2xl overflow-hidden border border-[#E5E7EB] p-8">
                    {product.isNew && (
                      <span className="absolute top-4 left-4 z-10 bg-[#1D1D1F] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        New Arrival
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="absolute top-4 right-4 z-10 bg-[#0071E3] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {product.hasVideo && (
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-2 text-xs text-[#0071E3] font-medium">
                      <Video className="w-4 h-4 shrink-0" />
                      <span>HD Product Video Showcase is enabled for this style.</span>
                    </div>
                  )}
                </div>

                {/* Details & Action */}
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0071E3]">
                      {product.brand}
                    </span>
                    <h1 className="font-heading text-2xl font-bold text-[#1D1D1F] mt-1">
                      {product.title}
                    </h1>
                    <span className="text-xs text-[#86868B] font-mono block mt-1">
                      SKU: <strong className="text-[#1D1D1F]">{product.sku}</strong>
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]">
                    <span className="text-2xl font-bold text-[#1D1D1F]">
                      ₹{product.outletPrice.toLocaleString("en-IN")}
                    </span>
                    {product.mrp > product.outletPrice && (
                      <span className="text-sm text-[#86868B] line-through">
                        MRP ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-[#0071E3]/10 text-[#0071E3] text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Sizes */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#1D1D1F] block">
                      Select Size ({isFootwear ? "UK Standard" : "Apparel Size"}):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => {
                        const inStock = product.inStockSizes.includes(size);
                        const isSelected = selectedSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => inStock && setSelectedSize(size)}
                            className={`min-w-10 h-10 px-3 rounded-xl text-xs font-semibold border transition-all ${
                              isSelected
                                ? "bg-[#0071E3] text-white border-[#0071E3]"
                                : inStock
                                ? "bg-white text-[#1D1D1F] border-[#E5E7EB] hover:border-[#1D1D1F]"
                                : "bg-[#F5F5F7] text-[#86868B] border-[#E5E7EB] line-through opacity-40 cursor-not-allowed"
                            }`}
                          >
                            {isFootwear ? `UK ${size}` : size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    {product.description}
                  </p>

                  {/* Simulated Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      className="w-full py-3.5 rounded-full bg-[#1B8A42] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-subtle hover:bg-[#167035] transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>Enquire Availability on WhatsApp</span>
                    </button>
                    <span className="text-[11px] text-[#86868B] text-center block mt-2">
                      Simulated preview: Customer will connect to {STORE_DETAILS.phoneDisplay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* MOBILE PREVIEW CONTAINER (Simulated iPhone Viewport) */
            <div className="w-[375px] h-[680px] bg-black rounded-[48px] p-3 shadow-2xl border-[4px] border-neutral-800 flex flex-col shrink-0">
              {/* iPhone Notch & Island */}
              <div className="w-full flex justify-center pb-2">
                <div className="w-28 h-5 bg-neutral-900 rounded-full" />
              </div>

              {/* Mobile Screen Frame */}
              <div className="bg-[#FFFFFF] rounded-[36px] flex-1 overflow-y-auto flex flex-col relative text-xs">
                {/* Mobile Header */}
                <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
                  <span className="font-heading font-extrabold text-xs tracking-tight">
                    iNESTYL OUTLET
                  </span>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                    Kapadwanj
                  </span>
                </div>

                {/* Mobile Image */}
                <div className="relative aspect-square bg-[#F5F5F7] p-6 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-[#1D1D1F] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                      New
                    </span>
                  )}
                </div>

                {/* Mobile Details */}
                <div className="p-4 space-y-3 flex-1 pb-20">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#0071E3]">
                      {product.brand}
                    </span>
                    <h2 className="font-heading text-base font-bold text-[#1D1D1F]">
                      {product.title}
                    </h2>
                    <span className="text-[10px] text-[#86868B] font-mono">
                      SKU: {product.sku}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[#1D1D1F]">
                      ₹{product.outletPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#86868B] line-through">
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] font-bold text-[#0071E3] bg-[#0071E3]/10 px-1.5 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>

                  {/* Size Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[#1D1D1F] block">Select Size:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map((s) => {
                        const inStock = product.inStockSizes.includes(s);
                        const isSelected = selectedSize === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => inStock && setSelectedSize(s)}
                            className={`w-8 h-8 rounded-lg text-[10px] font-bold border ${
                              isSelected
                                ? "bg-[#0071E3] text-white border-[#0071E3]"
                                : inStock
                                ? "bg-white text-[#1D1D1F] border-[#E5E7EB]"
                                : "bg-neutral-100 text-neutral-400 border-neutral-200 line-through"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#6E6E73] line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Sticky Bottom Action for Mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xs border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-full bg-[#1B8A42] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp Enquiry</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
