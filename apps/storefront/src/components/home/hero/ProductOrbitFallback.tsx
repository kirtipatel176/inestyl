import Image from "next/image";
import Link from "next/link";
import { OrbitProductItem } from "./types";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductOrbitFallbackProps {
  products: OrbitProductItem[];
}

export function ProductOrbitFallback({ products }: ProductOrbitFallbackProps) {
  const featured = products[0];

  if (!featured) return null;

  const imageSrc = featured.cutoutUrl || featured.imageUrl;

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col items-center justify-center p-6 select-none">
      {/* Stage Pedestal */}
      <div className="relative flex flex-col items-center">
        {/* Soft Contact Shadow */}
        <div className="absolute -bottom-4 w-60 h-10 rounded-[50%] blur-md bg-black/15 pointer-events-none" />

        {/* Featured Product Cutout */}
        <div className="relative w-64 h-48 sm:w-80 sm:h-60 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={`${featured.brand} ${featured.title}`}
            fill
            sizes="(max-width: 640px) 260px, 320px"
            priority
            className="object-contain object-center drop-shadow-xl"
          />
        </div>
      </div>

      {/* Featured Details Card */}
      <div className="mt-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-[#E5E7EB] flex items-center gap-6">
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#0071E3] flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            {featured.brand}
          </span>
          <h4 className="text-sm font-semibold text-[#1D1D1F] line-clamp-1">
            {featured.title}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm font-bold text-[#1D1D1F]">
              ₹{featured.outletPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-[#86868B] line-through">
              ₹{featured.mrp.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] font-bold text-[#E50010]">
              {featured.discount}% OFF
            </span>
          </div>
        </div>

        <Link
          href={`/products/${featured.slug}`}
          className="px-4 py-2 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
        >
          <span>View</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
