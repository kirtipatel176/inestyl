/**
 * iNESTYL OUTLET — Cloudinary Asset Migration Script
 * 
 * Safely migrates local project image assets to Cloudinary with:
 * - Direct authentication via .env.local credentials
 * - Meaningful Cloudinary folder hierarchy (inestyle-outlet/...)
 * - Public ID preservation and structured delivery URL generation
 * - State tracking (.migration-state.json)
 * - Automatic reference updating to real Cloudinary Cloud Name
 * 
 * Usage:
 *   node --experimental-strip-types scripts/migrate-images-to-cloudinary.ts [--dry-run]
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";

// 1. Synchronously load .env.local credentials
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

import { uploadImageToCloudinary, isCloudinaryConfigured, getCloudinaryConfig } from "../src/lib/cloudinary.ts";

interface AssetToMigrate {
  localPath: string;
  publicId: string;
  folder: string;
  category: "branding" | "homepage" | "categories" | "collections" | "products" | "store";
  description: string;
  isSvg?: boolean;
}

const CANONICAL_ASSETS_TO_MIGRATE: AssetToMigrate[] = [
  // 1. Branding Assets
  {
    localPath: "public/brand/logo-primary-stacked.svg",
    publicId: "inestyle-outlet/branding/logo/logo-primary-stacked",
    folder: "inestyle-outlet/branding/logo",
    category: "branding",
    description: "Primary Stacked Logo (Default)",
    isSvg: true,
  },
  {
    localPath: "public/brand/logo-primary-stacked-light.svg",
    publicId: "inestyle-outlet/branding/logo/logo-primary-stacked-light",
    folder: "inestyle-outlet/branding/logo",
    category: "branding",
    description: "Primary Stacked Logo (Light / White on Dark)",
    isSvg: true,
  },
  {
    localPath: "public/brand/logo-primary-stacked-dark.svg",
    publicId: "inestyle-outlet/branding/logo/logo-primary-stacked-dark",
    folder: "inestyle-outlet/branding/logo",
    category: "branding",
    description: "Primary Stacked Logo (Dark)",
    isSvg: true,
  },
  {
    localPath: "public/brand/logo-horizontal.svg",
    publicId: "inestyle-outlet/branding/logo/logo-horizontal",
    folder: "inestyle-outlet/branding/logo",
    category: "branding",
    description: "Horizontal Logo (Default)",
    isSvg: true,
  },
  {
    localPath: "public/brand/logo-horizontal-light.svg",
    publicId: "inestyle-outlet/branding/logo/logo-horizontal-light",
    folder: "inestyle-outlet/branding/logo",
    category: "branding",
    description: "Horizontal Logo (Light / White on Dark)",
    isSvg: true,
  },
  {
    localPath: "public/brand/logo-horizontal-dark.svg",
    publicId: "inestyle-outlet/branding/logo/logo-horizontal-dark",
    folder: "inestyle-outlet/branding/logo",
    category: "branding",
    description: "Horizontal Logo (Dark)",
    isSvg: true,
  },
  {
    localPath: "public/brand/logo-monogram.svg",
    publicId: "inestyle-outlet/branding/logo/logo-monogram",
    folder: "inestyle-outlet/branding/logo",
    category: "branding",
    description: "Monogram Icon",
    isSvg: true,
  },

  // 2. Brand Partner Logos
  {
    localPath: "public/brand/partners/nike.svg",
    publicId: "inestyle-outlet/brands/logos/nike",
    folder: "inestyle-outlet/brands/logos",
    category: "branding",
    description: "Nike Official Partner Logo",
    isSvg: true,
  },
  {
    localPath: "public/brand/partners/puma.svg",
    publicId: "inestyle-outlet/brands/logos/puma",
    folder: "inestyle-outlet/brands/logos",
    category: "branding",
    description: "Puma Official Partner Logo",
    isSvg: true,
  },
  {
    localPath: "public/brand/partners/adidas.svg",
    publicId: "inestyle-outlet/brands/logos/adidas",
    folder: "inestyle-outlet/brands/logos",
    category: "branding",
    description: "adidas Official Partner Logo",
    isSvg: true,
  },
  {
    localPath: "public/brand/partners/hoka.svg",
    publicId: "inestyle-outlet/brands/logos/hoka",
    folder: "inestyle-outlet/brands/logos",
    category: "branding",
    description: "HOKA Official Partner Logo",
    isSvg: true,
  },
  {
    localPath: "public/brand/partners/levis.svg",
    publicId: "inestyle-outlet/brands/logos/levis",
    folder: "inestyle-outlet/brands/logos",
    category: "branding",
    description: "Levi's Official Partner Logo",
    isSvg: true,
  },
  {
    localPath: "public/brand/partners/diesel.svg",
    publicId: "inestyle-outlet/brands/logos/diesel",
    folder: "inestyle-outlet/brands/logos",
    category: "branding",
    description: "DIESEL Official Partner Logo",
    isSvg: true,
  },
  {
    localPath: "public/brand/partners/us-polo-assn.svg",
    publicId: "inestyle-outlet/brands/logos/us-polo-assn",
    folder: "inestyle-outlet/brands/logos",
    category: "branding",
    description: "U.S. Polo Assn. Official Partner Logo",
    isSvg: true,
  },

  // 3. Homepage & Campaigns
  {
    localPath: "public/images/hero/hero-lifestyle-composite.jpg",
    publicId: "inestyle-outlet/homepage/desktop/hero-lifestyle-composite",
    folder: "inestyle-outlet/homepage/desktop",
    category: "homepage",
    description: "Homepage Desktop Hero Campaign Photograph",
  },
  {
    localPath: "public/images/hero/hero-mobile.jpg",
    publicId: "inestyle-outlet/homepage/mobile/hero-mobile",
    folder: "inestyle-outlet/homepage/mobile",
    category: "homepage",
    description: "Homepage Mobile Hero Campaign Photograph",
  },
  {
    localPath: "public/images/hero/hero-sneaker-apparel.jpg",
    publicId: "inestyle-outlet/homepage/campaigns/hero-sneaker-apparel",
    folder: "inestyle-outlet/homepage/campaigns",
    category: "homepage",
    description: "Curated Sneaker & Apparel Split Campaign Banner",
  },
  {
    localPath: "public/images/hero/new-arrivals-banner.jpg",
    publicId: "inestyle-outlet/homepage/campaigns/new-arrivals-banner",
    folder: "inestyle-outlet/homepage/campaigns",
    category: "homepage",
    description: "New Arrivals Full-Width Editorial Banner",
  },
  {
    localPath: "public/images/hero/hero-offer-banner.jpg",
    publicId: "inestyle-outlet/homepage/campaigns/hero-offer-banner",
    folder: "inestyle-outlet/homepage/campaigns",
    category: "homepage",
    description: "Special Promotion / Offer Announcement Banner",
  },
  {
    localPath: "public/images/hero/hero.png",
    publicId: "inestyle-outlet/homepage/desktop/hero-main",
    folder: "inestyle-outlet/homepage/desktop",
    category: "homepage",
    description: "Homepage Brand Campaign Cover Banner",
  },

  // 4. Categories
  {
    localPath: "public/images/categories/category-footwear.jpg",
    publicId: "inestyle-outlet/categories/footwear/category-footwear",
    folder: "inestyle-outlet/categories/footwear",
    category: "categories",
    description: "Footwear Department Master Cover",
  },
  {
    localPath: "public/images/categories/category-footwear-banner.jpg",
    publicId: "inestyle-outlet/categories/footwear/category-footwear-banner",
    folder: "inestyle-outlet/categories/footwear",
    category: "categories",
    description: "Footwear Department Header Banner",
  },
  {
    localPath: "public/images/categories/category-footwear-card.jpg",
    publicId: "inestyle-outlet/categories/footwear/category-footwear-card",
    folder: "inestyle-outlet/categories/footwear",
    category: "categories",
    description: "Footwear Department Grid Navigation Card",
  },
  {
    localPath: "public/images/categories/category-apparel.jpg",
    publicId: "inestyle-outlet/categories/clothing/category-apparel",
    folder: "inestyle-outlet/categories/clothing",
    category: "categories",
    description: "Apparel Department Master Cover",
  },
  {
    localPath: "public/images/categories/category-apparel-banner.jpg",
    publicId: "inestyle-outlet/categories/clothing/category-apparel-banner",
    folder: "inestyle-outlet/categories/clothing",
    category: "categories",
    description: "Apparel Department Header Banner",
  },
  {
    localPath: "public/images/categories/category-apparel-card.jpg",
    publicId: "inestyle-outlet/categories/clothing/category-apparel-card",
    folder: "inestyle-outlet/categories/clothing",
    category: "categories",
    description: "Apparel Department Grid Navigation Card",
  },

  // 5. Collections
  {
    localPath: "public/images/collections/new-arrivals.jpg",
    publicId: "inestyle-outlet/collections/new-arrivals",
    folder: "inestyle-outlet/collections",
    category: "collections",
    description: "New Arrivals Collection Editorial Banner",
  },
  {
    localPath: "public/images/collections/trending-styles.jpg",
    publicId: "inestyle-outlet/collections/trending-styles",
    folder: "inestyle-outlet/collections",
    category: "collections",
    description: "Trending Styles Curated Collection Banner",
  },
  {
    localPath: "public/images/collections/everyday-essentials.jpg",
    publicId: "inestyle-outlet/collections/everyday-essentials",
    folder: "inestyle-outlet/collections",
    category: "collections",
    description: "Everyday Essentials Capsule Collection Banner",
  },
  {
    localPath: "public/images/collections/sports-performance.jpg",
    publicId: "inestyle-outlet/collections/sports-performance",
    folder: "inestyle-outlet/collections",
    category: "collections",
    description: "Sports & Performance Athletic Wear Banner",
  },
  {
    localPath: "public/images/collections/sneakers-collection.jpg",
    publicId: "inestyle-outlet/collections/sneakers-collection",
    folder: "inestyle-outlet/collections",
    category: "collections",
    description: "Sneakerhead Collection Showcase Banner",
  },
  {
    localPath: "public/images/collections/weekend-edit.jpg",
    publicId: "inestyle-outlet/collections/weekend-edit",
    folder: "inestyle-outlet/collections",
    category: "collections",
    description: "Weekend Edit Casual Editorial Banner",
  },

  // 6. Products — Footwear
  {
    localPath: "public/images/products/nike-air-max-270.jpg",
    publicId: "inestyle-outlet/products/footwear/men/nike-air-max-270",
    folder: "inestyle-outlet/products/footwear/men",
    category: "products",
    description: "Nike Air Max 270 — Lateral Profile Shot",
  },
  {
    localPath: "public/images/products/nike-air-max-270-side.jpg",
    publicId: "inestyle-outlet/products/footwear/men/nike-air-max-270-side",
    folder: "inestyle-outlet/products/footwear/men",
    category: "products",
    description: "Nike Air Max 270 — Medial 3/4 Angle Shot",
  },
  {
    localPath: "public/images/products/nike-air-max-270-top.jpg",
    publicId: "inestyle-outlet/products/footwear/men/nike-air-max-270-top",
    folder: "inestyle-outlet/products/footwear/men",
    category: "products",
    description: "Nike Air Max 270 — Top-Down Lacing View",
  },
  {
    localPath: "public/images/products/nike-air-max-270-sole.jpg",
    publicId: "inestyle-outlet/products/footwear/men/nike-air-max-270-sole",
    folder: "inestyle-outlet/products/footwear/men",
    category: "products",
    description: "Nike Air Max 270 — Outsole Rubber Traction Pattern",
  },
  {
    localPath: "public/images/products/puma-rs-x.jpg",
    publicId: "inestyle-outlet/products/footwear/men/puma-rs-x",
    folder: "inestyle-outlet/products/footwear/men",
    category: "products",
    description: "Puma RS-X Triple White — Lateral Profile Shot",
  },
  {
    localPath: "public/images/products/adidas-ultraboost.jpg",
    publicId: "inestyle-outlet/products/footwear/men/adidas-ultraboost",
    folder: "inestyle-outlet/products/footwear/men",
    category: "products",
    description: "adidas Ultraboost Light — Lateral Profile Shot",
  },
  {
    localPath: "public/images/products/hoka-clifton-9.jpg",
    publicId: "inestyle-outlet/products/footwear/women/hoka-clifton-9",
    folder: "inestyle-outlet/products/footwear/women",
    category: "products",
    description: "HOKA Clifton 9 — Lateral Profile Shot",
  },

  // 7. Products — Clothing
  {
    localPath: "public/images/products/diesel-denim-jacket.jpg",
    publicId: "inestyle-outlet/products/clothing/men/diesel-denim-jacket",
    folder: "inestyle-outlet/products/clothing/men",
    category: "products",
    description: "DIESEL Trucker Denim Jacket — Flat Lay Studio Photograph",
  },
  {
    localPath: "public/images/products/levis-501-original.jpg",
    publicId: "inestyle-outlet/products/clothing/men/levis-501-original",
    folder: "inestyle-outlet/products/clothing/men",
    category: "products",
    description: "Levi's 501 Original Fit Jeans — Studio Capture",
  },
  {
    localPath: "public/images/products/nike-club-hoodie.jpg",
    publicId: "inestyle-outlet/products/clothing/men/nike-club-hoodie",
    folder: "inestyle-outlet/products/clothing/men",
    category: "products",
    description: "Nike Sportswear Club Fleece Hoodie — Studio Capture",
  },
  {
    localPath: "public/images/products/us-polo-classic-tee.jpg",
    publicId: "inestyle-outlet/products/clothing/men/us-polo-classic-tee",
    folder: "inestyle-outlet/products/clothing/men",
    category: "products",
    description: "U.S. Polo Assn. Classic Pique Polo — Studio Capture",
  },

  // 8. Flagship Store (Kapadwanj)
  {
    localPath: "public/images/store/store-interior-1.jpg",
    publicId: "inestyle-outlet/store/store-interior-1",
    folder: "inestyle-outlet/store",
    category: "store",
    description: "Kapadwanj Flagship Store — Main Entrance Display Area",
  },
  {
    localPath: "public/images/store/store-interior-2.jpg",
    publicId: "inestyle-outlet/store/store-interior-2",
    folder: "inestyle-outlet/store",
    category: "store",
    description: "Kapadwanj Flagship Store — Footwear Wall Showcase",
  },
  {
    localPath: "public/images/store/store-interior-3.jpg",
    publicId: "inestyle-outlet/store/store-interior-3",
    folder: "inestyle-outlet/store",
    category: "store",
    description: "Kapadwanj Flagship Store — Premium Apparel Rails & Fitting Lounge",
  },
];

const STATE_FILE = path.resolve(process.cwd(), "scripts/.migration-state.json");
const REPORT_FILE = path.resolve(process.cwd(), "docs/cloudinary-migration-report.md");
const MAP_OUTPUT_FILE = path.resolve(process.cwd(), "src/data/cloudinary-migration-map.json");

interface MigrationRecord {
  localPath: string;
  publicId: string;
  secureUrl: string;
  deliveryUrl: string;
  sha256: string;
  sizeBytes: number;
  format: string;
  category: string;
  status: "success" | "skipped" | "failed";
  uploadedAt: string;
  error?: string;
}

interface MigrationState {
  startedAt: string;
  lastUpdatedAt: string;
  cloudName: string;
  records: Record<string, MigrationRecord>;
}

function computeFileHash(filePath: string): string {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function runMigration() {
  const isDryRun = process.argv.includes("--dry-run");
  const config = getCloudinaryConfig();
  const cloudName = config.cloudName;
  const liveConfigured = isCloudinaryConfigured();

  console.log("==========================================================");
  console.log("   iNESTYL OUTLET — CLOUDINARY LIVE IMAGE MIGRATION       ");
  console.log("==========================================================");
  console.log(`Cloud Name:        ${cloudName}`);
  console.log(`Live Upload:       ${liveConfigured && !isDryRun ? "YES (Authenticating with Cloudinary)" : "NO (Simulation)"}`);
  console.log(`Total Master Files: ${CANONICAL_ASSETS_TO_MIGRATE.length} assets`);
  console.log("----------------------------------------------------------\n");

  const successfulUploads: MigrationRecord[] = [];
  const failedUploads: MigrationRecord[] = [];

  let index = 0;
  for (const asset of CANONICAL_ASSETS_TO_MIGRATE) {
    index++;
    const fullLocalPath = path.resolve(process.cwd(), asset.localPath);

    if (!fs.existsSync(fullLocalPath)) {
      console.warn(`[WARN] File not found: ${asset.localPath}`);
      continue;
    }

    const stat = fs.statSync(fullLocalPath);
    const hash = computeFileHash(fullLocalPath);
    const ext = path.extname(asset.localPath).replace(".", "");

    console.log(`[${index}/${CANONICAL_ASSETS_TO_MIGRATE.length}] Pushing: ${asset.publicId} (${(stat.size / 1024).toFixed(1)} KB)...`);

    let secureUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${asset.publicId}`;
    let deliveryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${asset.publicId}`;
    if (asset.isSvg) {
      deliveryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${asset.publicId}.svg`;
    }

    if (!isDryRun && liveConfigured) {
      let attempts = 0;
      let uploaded = false;
      while (attempts < 3 && !uploaded) {
        attempts++;
        try {
          const uploadResult = await uploadImageToCloudinary(fullLocalPath, {
            folder: asset.folder,
            publicId: path.basename(asset.publicId),
            overwrite: true,
            resourceType: asset.isSvg ? "image" : "image",
            tags: ["inestyle-outlet", asset.category],
          });

          secureUrl = uploadResult.secureUrl;
          deliveryUrl = asset.isSvg
            ? secureUrl
            : `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${asset.publicId}`;
          console.log(`   ✓ Uploaded to Cloudinary: ${secureUrl}`);
          uploaded = true;
        } catch (err: any) {
          console.warn(`   ⚠ Attempt ${attempts} failed: ${err.message}`);
          if (attempts < 3) {
            await new Promise((r) => setTimeout(r, 1000 * attempts));
          } else {
            console.error(`   ✗ Upload failed permanently for ${asset.publicId}`);
            failedUploads.push({
              localPath: asset.localPath,
              publicId: asset.publicId,
              secureUrl,
              deliveryUrl,
              sha256: hash,
              sizeBytes: stat.size,
              format: ext,
              category: asset.category,
              status: "failed",
              uploadedAt: new Date().toISOString(),
              error: err.message,
            });
          }
        }
      }

      if (!uploaded) continue;
    } else {
      console.log(`   ✓ Mapped: ${deliveryUrl}`);
    }

    const record: MigrationRecord = {
      localPath: asset.localPath,
      publicId: asset.publicId,
      secureUrl,
      deliveryUrl,
      sha256: hash,
      sizeBytes: stat.size,
      format: ext,
      category: asset.category,
      status: "success",
      uploadedAt: new Date().toISOString(),
    };

    successfulUploads.push(record);
  }

  // Save full migration mapping file
  const mapData = {
    cloudName,
    migratedAt: new Date().toISOString(),
    totalAssets: successfulUploads.length,
    assets: successfulUploads,
  };
  fs.writeFileSync(MAP_OUTPUT_FILE, JSON.stringify(mapData, null, 2));
  console.log(`\n✓ Saved Cloudinary migration map to: ${MAP_OUTPUT_FILE}`);

  // Generate Markdown report
  const reportContent = `# iNESTYL OUTLET — Cloudinary Image Migration Report
*Generated: ${new Date().toLocaleString()}*

## 1. Executive Summary
- **Cloud Name**: \`${cloudName}\`
- **Total Master Assets Uploaded to Cloudinary**: **${successfulUploads.length}**
- **Failed Uploads**: **${failedUploads.length}**
- **Status**: **LIVE CDN READY**

## 2. Cloudinary Folder Structure
\`\`\`
inestyle-outlet/
├── branding/
│   └── logo/
├── brands/
│   └── logos/
├── homepage/
│   ├── desktop/
│   ├── mobile/
│   └── campaigns/
├── categories/
│   ├── footwear/
│   └── clothing/
├── collections/
├── products/
│   ├── footwear/
│   │   ├── men/
│   │   └── women/
│   └── clothing/
│       └── men/
└── store/
\`\`\`

## 3. Uploaded Assets Registry

| Category | Public ID | Format | Local Source | Secure Cloudinary URL |
| :--- | :--- | :--- | :--- | :--- |
${successfulUploads
  .map(
    (a) =>
      `| **${a.category}** | \`${a.publicId}\` | \`${a.format}\` | \`${a.localPath}\` | [View Asset](${a.secureUrl}) |`
  )
  .join("\n")}
`;

  fs.writeFileSync(REPORT_FILE, reportContent);
  console.log(`✓ Generated Migration Audit Report at: ${REPORT_FILE}`);

  console.log("\n==========================================================");
  console.log(`Migration Complete: ${successfulUploads.length}/${CANONICAL_ASSETS_TO_MIGRATE.length} images pushed to Cloudinary (${cloudName}).`);
  console.log("==========================================================");
}

runMigration().catch((err) => {
  console.error("Fatal Migration Error:", err);
  process.exit(1);
});
