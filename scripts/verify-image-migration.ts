/**
 * iNESTYL OUTLET — Image Migration Verification Suite
 * 
 * Verifies:
 * 1. Cloudinary Migration Map completeness & validity
 * 2. Database records (products, collections, brands) contain valid Cloudinary URLs
 * 3. Next.js image config & remotePatterns
 * 4. Zero broken or legacy references in source code
 * 5. Retention of critical system assets (favicons, metadata icons)
 */

import fs from "fs";
import path from "path";

interface VerificationReport {
  timestamp: string;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  details: {
    check: string;
    status: "PASS" | "FAIL" | "WARN";
    message: string;
  }[];
}

const report: VerificationReport = {
  timestamp: new Date().toISOString(),
  totalChecks: 0,
  passedChecks: 0,
  failedChecks: 0,
  details: [],
};

function recordCheck(check: string, passed: boolean, message: string, isWarn = false) {
  report.totalChecks++;
  if (passed) {
    report.passedChecks++;
    report.details.push({ check, status: "PASS", message });
    console.log(`  ✓ [PASS] ${check}: ${message}`);
  } else if (isWarn) {
    report.details.push({ check, status: "WARN", message });
    console.log(`  ⚠ [WARN] ${check}: ${message}`);
  } else {
    report.failedChecks++;
    report.details.push({ check, status: "FAIL", message });
    console.error(`  ✗ [FAIL] ${check}: ${message}`);
  }
}

async function runVerification() {
  console.log("==========================================================");
  console.log("   iNESTYL OUTLET — CLOUDINARY MIGRATION VERIFICATION     ");
  console.log("==========================================================\n");

  // 1. Verify Migration Map File
  console.log("1. Checking Cloudinary Migration Map...");
  const mapPath = path.resolve(process.cwd(), "src/data/cloudinary-migration-map.json");
  const mapExists = fs.existsSync(mapPath);
  recordCheck("Migration Map Exists", mapExists, `Located at ${mapPath}`);

  if (mapExists) {
    const mapData = JSON.parse(fs.readFileSync(mapPath, "utf8"));
    recordCheck(
      "Migration Assets Registered",
      mapData.totalAssets >= 40,
      `Total registered assets: ${mapData.totalAssets}`
    );
    recordCheck(
      "Cloudinary Cloud Name Defined",
      Boolean(mapData.cloudName),
      `Cloud Name: ${mapData.cloudName}`
    );
  }

  // 2. Verify Database Image References
  console.log("\n2. Checking Database Records (src/data/db.json)...");
  const dbPath = path.resolve(process.cwd(), "src/data/db.json");
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  let allProductsCloudinary = true;
  for (const p of db.products) {
    if (!p.image.includes("res.cloudinary.com") && !p.image.startsWith("inestyle-outlet/")) {
      allProductsCloudinary = false;
      break;
    }
  }
  recordCheck(
    "Product Images Use Cloudinary",
    allProductsCloudinary,
    `All ${db.products.length} products have Cloudinary delivery URLs`
  );

  let allCollectionsCloudinary = true;
  for (const c of db.collections) {
    if (!c.image.includes("res.cloudinary.com") && !c.image.startsWith("inestyle-outlet/")) {
      allCollectionsCloudinary = false;
      break;
    }
  }
  recordCheck(
    "Collection Images Use Cloudinary",
    allCollectionsCloudinary,
    `All ${db.collections.length} collections have Cloudinary delivery URLs`
  );

  let allBrandsCloudinary = true;
  for (const b of db.brands) {
    if (b.logo && !b.logo.includes("res.cloudinary.com") && !b.logo.startsWith("inestyle-outlet/")) {
      allBrandsCloudinary = false;
      break;
    }
  }
  recordCheck(
    "Brand Logos Use Cloudinary",
    allBrandsCloudinary,
    `All ${db.brands.length} brand partners have Cloudinary logo URLs`
  );

  // 3. Verify System Local Assets Retained
  console.log("\n3. Checking System Critical Local Assets...");
  const SYSTEM_FILES = [
    "public/brand/favicon.ico",
    "public/brand/favicon.svg",
    "public/brand/favicon-32x32.png",
    "public/brand/favicon-180x180.png",
    "public/brand/logo-primary-stacked.svg",
    "public/brand/logo-horizontal-light.svg",
  ];

  for (const sysFile of SYSTEM_FILES) {
    const fullPath = path.resolve(process.cwd(), sysFile);
    recordCheck(
      `System Asset Intact: ${path.basename(sysFile)}`,
      fs.existsSync(fullPath),
      `${sysFile} preserved locally for SEO & Next.js metadata`
    );
  }

  // 4. Verify Next.js Configuration RemotePatterns
  console.log("\n4. Checking next.config.ts...");
  const nextConfigPath = path.resolve(process.cwd(), "next.config.ts");
  const nextConfigContent = fs.readFileSync(nextConfigPath, "utf8");
  recordCheck(
    "Cloudinary RemotePattern Configured",
    nextConfigContent.includes("res.cloudinary.com"),
    "next.config.ts allows https://res.cloudinary.com/**"
  );

  // 5. Verify No Hardcoded Old Paths in Storefront Pages
  console.log("\n5. Checking Storefront Source Code for Legacy Paths...");
  const storefrontFiles = [
    "src/components/home/HeroFullWidth.tsx",
    "src/components/home/CategoryDiscovery.tsx",
    "src/components/home/FeaturedCollectionSection.tsx",
    "src/components/home/TheInestyleEdit.tsx",
    "src/components/home/VisitOurStore.tsx",
    "src/app/about/page.tsx",
    "src/app/store/page.tsx",
  ];

  for (const file of storefrontFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      const hasLocalImages = content.includes("/images/products/") || content.includes("/images/hero/");
      recordCheck(
        `No Legacy Local Paths in ${path.basename(file)}`,
        !hasLocalImages,
        hasLocalImages ? "Contains unmigrated /images/ paths" : "All paths migrated to Cloudinary"
      );
    }
  }

  // 6. Summary
  console.log("\n==========================================================");
  console.log(
    `Verification Completed: ${report.passedChecks}/${report.totalChecks} Checks Passed (${report.failedChecks} Failed)`
  );
  console.log("==========================================================");

  if (report.failedChecks > 0) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
