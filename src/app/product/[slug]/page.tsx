import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS_DATA } from "@/constants/mock-data";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS_DATA.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found — iNESTYL OUTLET" };

  return {
    title: `${product.title} (${product.brand}) — Outlet Price ₹${product.outletPrice.toLocaleString("en-IN")} | iNESTYL OUTLET`,
    description: `Shop original ${product.brand} ${product.title} at iNESTYL OUTLET. MRP ₹${product.mrp} now ₹${product.outletPrice} (${product.discount}% OFF). Verified authentic inventory at Kapadwanj flagship store.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && (p.brand === product.brand || p.type === product.type)
  ).slice(0, 4);

  const deptLink = product.type === "footwear" ? "/shoes" : "/clothing";
  const deptLabel = product.type === "footwear" ? "Shoes" : "Clothing";

  return (
    <div className="container-luxury py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={deptLink}
          className="hover:text-[#1D1D1F] transition-colors"
        >
          {deptLabel}
        </Link>
        <span>/</span>
        <Link
          href={`/brands/${product.brandSlug}`}
          className="hover:text-[#1D1D1F] transition-colors"
        >
          {product.brand}
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* 2. Client Interactive Product Detail Component */}
      <ProductDetailClient product={product} />

      {/* 3. Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E7EB]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-0.5">
                CURATED RECOMMENDATIONS
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#1D1D1F]">
                You May Also Like
              </h2>
            </div>
            <Link
              href={deptLink}
              className="text-xs sm:text-sm font-semibold text-[#0071E3] hover:text-[#0066CC] flex items-center gap-1 transition-colors"
            >
              <span>Explore More {deptLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
