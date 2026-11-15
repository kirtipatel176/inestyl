"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  MapPin,
  ShieldCheck,
  Check,
  Share2,
  Ruler,
  AlertCircle,
  X,
} from "lucide-react";
import { ProductItem } from "@/constants/mock-data";
import { STORE_DETAILS } from "@/constants";

interface ProductDetailClientProps {
  product: ProductItem;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(
    product.gallery[0] || product.image
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.inStockSizes[0] || product.sizes[0] || ""
  );
  const [selectedColour, setSelectedColour] = useState<string>(
    product.colours[0]?.name || "Default"
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const isFootwear = product.type === "footwear";

  // Variant-specific stock lookup
  const matchedVariant = product.variants?.find(
    (v) => v.size === selectedSize && v.colour === selectedColour
  ) || product.variants?.find((v) => v.size === selectedSize);

  const isSizeInStock = product.inStockSizes.includes(selectedSize);
  const stockQuantity = matchedVariant?.stockQuantity ?? (isSizeInStock ? 2 : 0);

  const handleWhatsAppEnquiry = () => {
    const sizeFormat = isFootwear ? `UK ${selectedSize}` : selectedSize;
    const message =
      `Hello iNESTYL OUTLET Kapadwanj,\n\n` +
      `I would like to check physical availability and reserve:\n` +
      `• *Product:* ${product.title} (${product.brand})\n` +
      `• *Size:* ${sizeFormat}\n` +
      `• *Colour:* ${selectedColour}\n` +
      (product.fit ? `• *Fit:* ${product.fit}\n` : "") +
      `• *Outlet Price:* ₹${product.outletPrice.toLocaleString("en-IN")}\n` +
      `• *Store SKU:* ${product.sku}\n\n` +
      `Please let me know if this item is ready for trial at the Kapadwanj flagship outlet.`;

    const url = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Main Showcase Section: Gallery & Purchasing Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Image Gallery (Vertical Thumbnails + Main View) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6">
          {/* Vertical Thumbnail Strip */}
          {product.gallery.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible no-scrollbar">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  aria-label={`Show photo angle ${idx + 1}`}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F5F5F7] border-2 transition-all flex-shrink-0 ${
                    activeImage === img
                      ? "border-[#0071E3] shadow-xs"
                      : "border-[#E5E7EB] hover:border-[#86868B]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Large Main Showcase Plinth */}
          <div className="relative flex-1 aspect-square sm:aspect-[4/3] bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 flex items-center justify-center overflow-hidden shadow-xs">
            {product.isNew && (
              <span className="absolute top-5 left-5 bg-[#1D1D1F] text-white text-[11px] font-semibold tracking-normal px-3 py-1 rounded-full z-10 shadow-xs">
                New
              </span>
            )}
            {product.discount > 0 && (
              <span className="absolute top-5 right-16 bg-[#F5F5F7] text-[#1D1D1F] text-xs font-medium px-3 py-1 rounded-full z-10 border border-[#E5E7EB]">
                {product.discount}% OFF
              </span>
            )}
            <button
              onClick={handleCopyLink}
              title="Share / Copy Link"
              aria-label="Share product link"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#86868B] hover:text-[#0071E3] hover:border-[#0071E3] transition-all z-10 shadow-xs"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <div className="relative w-full h-full">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain drop-shadow-sm transition-transform duration-500 hover:scale-103"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Information & Enquiry Action Matrix */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brand & Title */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Link
                href={`/brands/${product.brandSlug}`}
                className="text-xs font-bold uppercase tracking-wider text-[#0071E3] hover:underline"
              >
                {product.brand}
              </Link>
              <span className="w-1 h-1 rounded-full bg-[#86868B]" />
              <span className="text-xs text-[#86868B] font-medium">
                {product.subcategory || product.category}
              </span>
              {product.gender && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#86868B]" />
                  <span className="text-xs text-[#86868B]">{product.gender}</span>
                </>
              )}
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
              {product.title}
            </h1>
            <p className="text-xs text-[#86868B] font-normal mt-1">
              Store SKU: <span className="font-mono text-[#1D1D1F]">{product.sku}</span> • 100% Verified Authentic
            </p>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#E5E7EB]">
            <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1D1D1F]">
              ₹{product.outletPrice.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.outletPrice && (
              <span className="text-sm sm:text-base text-[#86868B] line-through font-normal">
                MRP ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
            <span className="text-xs font-semibold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-1 rounded-full">
              Save ₹{(product.mrp - product.outletPrice).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Variant-Specific Live Store Inventory Readout */}
          <div
            className={`flex items-center gap-2.5 text-xs font-medium px-4 py-2.5 rounded-xl border ${
              isSizeInStock
                ? stockQuantity <= 1
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-neutral-50 text-neutral-600 border-neutral-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                isSizeInStock
                  ? stockQuantity <= 1
                    ? "bg-amber-600"
                    : "bg-emerald-600"
                  : "bg-neutral-400"
              }`}
            />
            <span>
              {isSizeInStock
                ? stockQuantity <= 1
                  ? `Limited Stock: Only 1 pair/item left in ${
                      isFootwear ? `UK ${selectedSize}` : selectedSize
                    } at Kapadwanj Flagship!`
                  : `In Stock: Available for immediate trial at Flagship Store, Kapadwanj.`
                : `Currently Out of Stock in ${
                    isFootwear ? `UK ${selectedSize}` : selectedSize
                  }. Connect on WhatsApp for restock updates.`}
            </span>
          </div>

          {/* Available Colours */}
          {product.colours.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] mb-2.5">
                <span>Colour: {selectedColour}</span>
                <span className="text-[11px] text-[#86868B] font-normal">
                  {product.colours.length} available
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colours.map((col) => {
                  const isSelected = selectedColour === col.name;
                  const isWhite = col.hex === "#FFFFFF" || col.hex === "#EAEAEA";
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColour(col.name)}
                      style={{ backgroundColor: col.hex }}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? "border-[#0071E3] scale-110 shadow-xs ring-2 ring-[#0071E3]/20"
                          : "border-[#E5E7EB] hover:scale-105"
                      }`}
                      title={col.name}
                      aria-label={`Select ${col.name} color`}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            isWhite ? "text-[#1D1D1F]" : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector (Footwear vs Clothing Aware) */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] mb-2.5">
              <span>{isFootwear ? "Select UK Shoe Size" : "Select Clothing Size"}</span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[#0071E3] hover:underline font-medium capitalize text-xs tracking-normal flex items-center gap-1"
              >
                <Ruler className="w-3 h-3" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const inStock = product.inStockSizes.includes(size);
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-11 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center ${
                      isSelected
                        ? "bg-[#0071E3] text-white shadow-xs"
                        : inStock
                        ? "bg-[#FFFFFF] border border-[#E5E7EB] text-[#1D1D1F] hover:border-[#0071E3]"
                        : "bg-[#F5F5F7] text-[#86868B] border border-[#E5E7EB] line-through opacity-50 cursor-pointer"
                    }`}
                  >
                    {isFootwear ? `UK ${size}` : size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons Matrix (Strict Business Rules: Discovery & Enquiry only!) */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full min-h-[48px] flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#0071E3] text-white text-sm font-semibold tracking-normal hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Enquire &amp; Reserve on WhatsApp</span>
            </button>

            <Link
              href="/contact"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:border-[#1D1D1F] hover:bg-[#F5F5F7] transition-all text-center"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Visit Kapadwanj Flagship Store for Trial</span>
            </Link>
          </div>

          {/* Verified Sourcing & Try-On Assurance */}
          <div className="pt-4 border-t border-[#E5E7EB] space-y-2.5 text-xs text-[#6E6E73]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0071E3] flex-shrink-0" />
              <span>100% Original product sourced from verified brand distributors.</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0071E3] flex-shrink-0" />
              <span>Available for physical inspection at Station Road, Kapadwanj.</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#86868B] flex-shrink-0" />
              <span>Offline purchase destination — no checkout or online payment required.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Detailed Technical Specifications & Category-Specific Attributes */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-1">
            ORIGINAL SPECIFICATIONS
          </span>
          <h2 className="font-heading text-2xl font-bold text-[#1D1D1F]">
            Product Details &amp; Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Narrative description & Features */}
          <div className="space-y-4">
            <h3 className="font-heading text-base font-semibold text-[#1D1D1F]">
              Description
            </h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              {product.description}
            </p>

            <div className="pt-2 space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]">
                Key Highlights
              </h4>
              <ul className="space-y-2 text-xs text-[#6E6E73]">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mt-1.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Category-Specific Attribute Table */}
          <div className="bg-[#F5F5F7] rounded-2xl p-6 border border-[#E5E7EB] space-y-4">
            <h3 className="font-heading text-base font-semibold text-[#1D1D1F]">
              {isFootwear ? "Footwear Specifications" : "Garment Specifications"}
            </h3>

            <dl className="divide-y divide-[#E5E7EB] text-xs">
              <div className="py-2.5 flex justify-between">
                <dt className="text-[#86868B]">Brand</dt>
                <dd className="font-semibold text-[#1D1D1F]">{product.brand}</dd>
              </div>

              <div className="py-2.5 flex justify-between">
                <dt className="text-[#86868B]">Department</dt>
                <dd className="font-semibold text-[#1D1D1F] capitalize">{product.type}</dd>
              </div>

              <div className="py-2.5 flex justify-between">
                <dt className="text-[#86868B]">Gender</dt>
                <dd className="font-semibold text-[#1D1D1F]">{product.gender}</dd>
              </div>

              {/* Footwear-Specific Attributes */}
              {isFootwear && (
                <>
                  {product.shoeType && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[#86868B]">Shoe Type</dt>
                      <dd className="font-semibold text-[#1D1D1F]">{product.shoeType}</dd>
                    </div>
                  )}
                  {product.upperMaterial && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[#86868B]">Upper Material</dt>
                      <dd className="font-semibold text-[#1D1D1F] text-right max-w-[200px]">
                        {product.upperMaterial}
                      </dd>
                    </div>
                  )}
                  {product.soleDetails && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[#86868B]">Sole Details</dt>
                      <dd className="font-semibold text-[#1D1D1F] text-right max-w-[200px]">
                        {product.soleDetails}
                      </dd>
                    </div>
                  )}
                  {product.fitInfo && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[#86868B]">Fit Information</dt>
                      <dd className="font-semibold text-[#1D1D1F] text-right max-w-[200px]">
                        {product.fitInfo}
                      </dd>
                    </div>
                  )}
                </>
              )}

              {/* Clothing-Specific Attributes */}
              {!isFootwear && (
                <>
                  {product.clothingCategory && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[#86868B]">Garment Type</dt>
                      <dd className="font-semibold text-[#1D1D1F]">{product.clothingCategory}</dd>
                    </div>
                  )}
                  {product.fit && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[#86868B]">Fit Type</dt>
                      <dd className="font-semibold text-[#1D1D1F]">{product.fit}</dd>
                    </div>
                  )}
                  {product.fabric && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[#86868B]">Fabric</dt>
                      <dd className="font-semibold text-[#1D1D1F] text-right max-w-[200px]">
                        {product.fabric}
                      </dd>
                    </div>
                  )}
                  {product.sleeve && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[#86868B]">Sleeve Length</dt>
                      <dd className="font-semibold text-[#1D1D1F]">{product.sleeve}</dd>
                    </div>
                  )}
                  {product.careInstructions && product.careInstructions.length > 0 && (
                    <div className="py-2.5">
                      <dt className="text-[#86868B] mb-1">Product Care</dt>
                      <dd className="text-[#1D1D1F] font-normal space-y-1">
                        {product.careInstructions.map((care, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#0071E3]" />
                            <span>{care}</span>
                          </div>
                        ))}
                      </dd>
                    </div>
                  )}
                </>
              )}

              <div className="py-2.5 flex justify-between">
                <dt className="text-[#86868B]">Store Location</dt>
                <dd className="font-semibold text-[#0071E3]">Station Road, Kapadwanj</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* 3. Interactive Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB] relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#0071E3]" />
                <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                  {isFootwear ? "Footwear Size Conversion" : "Apparel Size Chart"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isFootwear ? (
              <div className="space-y-4 text-xs">
                <p className="text-[#6E6E73]">
                  All shoes at iNESTYL OUTLET follow standard UK sizing conventions. Refer to the
                  comparison chart below:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] text-[#86868B] uppercase font-semibold">
                        <th className="py-2">UK Size</th>
                        <th className="py-2">US Men</th>
                        <th className="py-2">EU Size</th>
                        <th className="py-2">Foot Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB] text-[#1D1D1F]">
                      <tr><td className="py-2 font-semibold text-[#0071E3]">UK 6</td><td>7.0</td><td>40.0</td><td>24.5 cm</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">UK 7</td><td>8.0</td><td>41.0</td><td>25.5 cm</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">UK 8</td><td>9.0</td><td>42.5</td><td>26.5 cm</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">UK 9</td><td>10.0</td><td>44.0</td><td>27.5 cm</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">UK 10</td><td>11.0</td><td>45.0</td><td>28.5 cm</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">UK 11</td><td>12.0</td><td>46.0</td><td>29.5 cm</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <p className="text-[#6E6E73]">
                  Garment measurements in inches. For a relaxed fit, we recommend selecting your
                  usual size.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] text-[#86868B] uppercase font-semibold">
                        <th className="py-2">Size</th>
                        <th className="py-2">Chest (in)</th>
                        <th className="py-2">Waist (in)</th>
                        <th className="py-2">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB] text-[#1D1D1F]">
                      <tr><td className="py-2 font-semibold text-[#0071E3]">S</td><td>36 - 38</td><td>30 - 32</td><td>27.5</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">M</td><td>38 - 40</td><td>32 - 34</td><td>28.5</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">L</td><td>40 - 42</td><td>34 - 36</td><td>29.5</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">XL</td><td>42 - 44</td><td>36 - 38</td><td>30.5</td></tr>
                      <tr><td className="py-2 font-semibold text-[#0071E3]">XXL</td><td>44 - 46</td><td>38 - 40</td><td>31.5</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC]"
              >
                Close Size Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
