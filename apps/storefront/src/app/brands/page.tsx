import { Metadata } from "next";
import { createStorefrontClient, getActiveBrands, getPublishedProducts } from "@inestyle/database";
import { BrandsPageClient } from "@/components/brands/BrandsPageClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Authorized Brands — 100% Original International Footwear & Fashion | iNESTYL OUTLET",
  description:
    "Explore 100% verified original footwear and apparel from Nike, Puma, adidas, HOKA, Levi's, DIESEL, and U.S. Polo Assn. at our Kapadwanj flagship outlet.",
};

export default async function BrandsPage() {
  const client = createStorefrontClient();
  const [brands, productsResult] = await Promise.all([
    getActiveBrands(client),
    getPublishedProducts(client, { limit: 100 }),
  ]);

  return <BrandsPageClient brands={brands} products={productsResult.data} />;
}
