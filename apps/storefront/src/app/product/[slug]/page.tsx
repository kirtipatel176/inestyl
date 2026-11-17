import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  createStorefrontClient,
  getProductBySlug,
  getRelatedProducts,
} from "@inestyle/database";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const client = createStorefrontClient();
  const product = await getProductBySlug(client, slug, true);
  if (!product) return { title: "Product Not Found — iNESTYL OUTLET" };

  return {
    title: `${product.title} (${product.brand}) — Outlet Price ₹${product.outletPrice.toLocaleString("en-IN")} | iNESTYL OUTLET`,
    description: `Shop original ${product.brand} ${product.title} at iNESTYL OUTLET. MRP ₹${product.mrp} now ₹${product.outletPrice} (${product.discount}% OFF). Verified authentic inventory at Kapadwanj flagship store.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const client = createStorefrontClient();

  // Strictly enforce publishing workflow: unpublished products return 404 on storefront
  const product = await getProductBySlug(client, slug, true);

  if (!product) {
    notFound();
  }

  // Related products from published inventory only
  const relatedProducts = await getRelatedProducts(
    client,
    product.id,
    product.department || product.type,
    product.brandSlug,
    4
  );

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
        <Link href={deptLink} className="hover:text-[#1D1D1F] transition-colors">
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
        <span className="text-[#1D1D1F] font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* 2. Interactive Product Details View */}
      <ProductDetailClient product={product} />

      {/* 3. Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                More from {product.brand} & {deptLabel}
              </h2>
              <p className="text-xs sm:text-sm text-[#86868B] mt-1">
                Other authentic styles currently in stock at Kapadwanj.
              </p>
            </div>
            <Link
              href={deptLink}
              className="text-xs sm:text-sm font-semibold text-[#0071E3] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
