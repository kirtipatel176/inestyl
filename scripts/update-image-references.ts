/**
 * iNESTYL OUTLET — Image Reference Replacement Script
 * 
 * Systematically updates all local /images/ and /brand/partners/ references
 * across src/ to point to high-performance Cloudinary delivery URLs.
 */

import fs from "fs";
import path from "path";

// 1. Synchronously load .env.local
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [k, ...v] = trimmed.split("=");
      process.env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
}

import { LOCAL_TO_CLOUDINARY_PUBLIC_ID, getCloudinaryUrl } from "../src/lib/image-url.ts";

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  "egjn8ayb";

const TARGET_FILES = [
  "src/data/db.json",
  "src/constants/mock-data.ts",
  "src/components/home/HeroFullWidth.tsx",
  "src/components/home/HeroInteractive.tsx",
  "src/components/home/CategoryDiscovery.tsx",
  "src/components/home/CategorySectionAnimated.tsx",
  "src/components/home/DiscoverBrandsSection.tsx",
  "src/components/home/ExploreCategories.tsx",
  "src/components/home/ExploreCategoriesSection.tsx",
  "src/components/home/NewArrivalsBannerAnimated.tsx",
  "src/components/home/ShopByCollectionSection.tsx",
  "src/components/home/ShopByOccasionSection.tsx",
  "src/components/home/TheInestyleEdit.tsx",
  "src/components/home/VisitOurStore.tsx",
  "src/components/layout/ApparelMegaMenu.tsx",
  "src/components/layout/FootwearMegaMenu.tsx",
  "src/components/layout/MenMegaMenu.tsx",
  "src/components/layout/WomenMegaMenu.tsx",
  "src/app/about/page.tsx",
  "src/app/store/page.tsx",
  "src/app/edit/page.tsx",
  "src/components/admin/auth/AdminAuthLayout.tsx",
  "src/components/admin/modals/CsvImportModal.tsx",
  "src/components/admin/AdminDashboardClient.tsx",
  "src/lib/server-db.ts",
];

// Add special mappings for CsvImportModal samples
const EXTENDED_MAPPINGS: Record<string, string> = {
  ...LOCAL_TO_CLOUDINARY_PUBLIC_ID,
  "/images/products/levis-511-slim.jpg": "inestyle-outlet/products/clothing/men/levis-501-original",
  "/images/hero/hero-lifestyle-composite.webp": "inestyle-outlet/homepage/desktop/hero-lifestyle-composite",
  "/images/hero/hero-sneaker-apparel.webp": "inestyle-outlet/homepage/campaigns/hero-sneaker-apparel",
  "/images/hero/new-arrivals-banner.webp": "inestyle-outlet/homepage/campaigns/new-arrivals-banner",
  "/images/hero/hero-offer-banner.webp": "inestyle-outlet/homepage/campaigns/hero-offer-banner",
  "/images/hero/desktop/hero.webp": "inestyle-outlet/homepage/desktop/hero-main",
  "/images/hero/desktop/hero-sneaker-apparel.webp": "inestyle-outlet/homepage/campaigns/hero-sneaker-apparel",
  "/images/hero/desktop/hero-offer-banner.webp": "inestyle-outlet/homepage/campaigns/hero-offer-banner",
  "/brand/partners/nike.svg": "inestyle-outlet/brands/logos/nike",
  "/brand/partners/puma.svg": "inestyle-outlet/brands/logos/puma",
  "/brand/partners/adidas.svg": "inestyle-outlet/brands/logos/adidas",
  "/brand/partners/hoka.svg": "inestyle-outlet/brands/logos/hoka",
  "/brand/partners/levis.svg": "inestyle-outlet/brands/logos/levis",
  "/brand/partners/diesel.svg": "inestyle-outlet/brands/logos/diesel",
  "/brand/partners/us-polo-assn.svg": "inestyle-outlet/brands/logos/us-polo-assn",
};

function getCloudinaryDeliveryUrl(localPath: string): string {
  const publicId = EXTENDED_MAPPINGS[localPath];
  if (!publicId) return localPath;

  const isSvg = localPath.endsWith(".svg");
  if (isSvg) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}.svg`;
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
}

function run() {
  console.log("Replacing local image paths with Cloudinary URLs across project...");
  let totalReplacements = 0;

  for (const relPath of TARGET_FILES) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${relPath}`);
      continue;
    }

    let content = fs.readFileSync(fullPath, "utf8");
    let fileReplacements = 0;

    for (const [localPath, publicId] of Object.entries(EXTENDED_MAPPINGS)) {
      if (content.includes(localPath)) {
        const cdnUrl = getCloudinaryDeliveryUrl(localPath);
        // Do global replacement
        const regex = new RegExp(localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
        const count = (content.match(regex) || []).length;
        content = content.replace(regex, cdnUrl);
        fileReplacements += count;
      }
    }

    // Also update any prior placeholder cloud name references
    if (CLOUD_NAME !== "inestyle-outlet" && content.includes("res.cloudinary.com/inestyle-outlet/")) {
      const placeholderRegex = /res\.cloudinary\.com\/inestyle-outlet\//g;
      const count = (content.match(placeholderRegex) || []).length;
      content = content.replace(placeholderRegex, `res.cloudinary.com/${CLOUD_NAME}/`);
      fileReplacements += count;
    }

    if (fileReplacements > 0) {
      fs.writeFileSync(fullPath, content, "utf8");
      console.log(`✓ ${relPath}: ${fileReplacements} references updated`);
      totalReplacements += fileReplacements;
    }
  }

  console.log(`\nAll done! Successfully updated ${totalReplacements} image references to Cloudinary.`);
}

run();
