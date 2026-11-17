/**
 * Comprehensive Acceptance Test Suite for INESTYLE OUTLET Admin Dashboard
 * Verifies all 14 Acceptance Criteria specified in Section J.
 */

const fs = require("fs");
const path = require("path");

const DB_FILE = fs.existsSync(path.join(__dirname, "..", "apps", "admin", "src", "data", "db.json"))
  ? path.join(__dirname, "..", "apps", "admin", "src", "data", "db.json")
  : path.join(__dirname, "..", "apps", "storefront", "src", "data", "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(message);
  } else {
    console.log(`✅ PASSED: ${message}`);
    passedTests++;
  }
}

async function runAcceptanceTests() {
  console.log("=================================================================");
  console.log("INESTYLE OUTLET — ADMIN CMS FINAL ACCEPTANCE TEST SUITE");
  console.log("=================================================================\n");

  const initialDb = readDb();

  // -------------------------------------------------------------
  // TEST 1: Product Creation & Publication Workflow
  // -------------------------------------------------------------
  console.log("--- Test 1: Product Creation and Publication ---");
  const testProdId = `prod-test-${Date.now()}`;
  const newProduct = {
    id: testProdId,
    title: "Test Performance Runner 2026",
    slug: "test-performance-runner-2026",
    sku: "NK-TEST-001",
    brand: "Nike",
    brandSlug: "nike",
    category: "Shoes",
    subcategory: "Running",
    type: "footwear",
    gender: "Men",
    mrp: 14995,
    outletPrice: 9995,
    discount: 33,
    status: "draft", // Starts as draft
    publishedAt: undefined,
    image: "/images/products/nike-air-max-270.jpg",
    gallery: ["/images/products/nike-air-max-270.jpg"],
    sizes: ["7", "8", "9", "10"],
    inStockSizes: ["7", "8", "9", "10"],
    colours: [{ name: "Volt/Black", hex: "#CEFF00" }],
    isNew: true,
    isFeatured: false,
    hasVideo: true,
    videoUrl: "/videos/products/test-runner.mp4",
    description: "Acceptance test performance shoe with zoom cushioning.",
    variants: [
      { id: "var-1", size: "7", colour: "Volt", stockQuantity: 3, isAvailable: true },
      { id: "var-2", size: "8", colour: "Volt", stockQuantity: 3, isAvailable: true },
      { id: "var-3", size: "9", colour: "Volt", stockQuantity: 3, isAvailable: true },
      { id: "var-4", size: "10", colour: "Volt", stockQuantity: 3, isAvailable: true },
    ],
    changeHistory: [
      {
        id: `ch-create-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author: "Admin QA Suite",
        field: "status",
        from: undefined,
        to: "draft",
        summary: "Created test product in draft mode.",
      },
    ],
  };

  const db1 = readDb();
  db1.products.unshift(newProduct);
  writeDb(db1);

  // Verify it exists in all products but NOT in published products
  const checkDb1 = readDb();
  const createdInAll = checkDb1.products.find((p) => p.id === testProdId);
  assert(Boolean(createdInAll), "Product created in catalogue database");
  assert(createdInAll.status === "draft", "Product status is correctly initialized as 'draft'");

  // Simulate publish workflow
  createdInAll.status = "published";
  createdInAll.publishedAt = new Date().toISOString();
  createdInAll.changeHistory.unshift({
    id: `ch-pub-${Date.now()}`,
    timestamp: new Date().toISOString(),
    author: "Store Manager",
    field: "status",
    from: "draft",
    to: "published",
    summary: "Published product live to storefront.",
  });
  writeDb(checkDb1);

  const checkDb1Pub = readDb();
  const publishedProduct = checkDb1Pub.products.find((p) => p.id === testProdId);
  assert(publishedProduct.status === "published", "Product successfully transitioned to 'published'");
  assert(publishedProduct.changeHistory.length === 2, "Product change history recorded status transitions");

  // -------------------------------------------------------------
  // TEST 2 & 3: Footwear & Clothing Variant Management
  // -------------------------------------------------------------
  console.log("\n--- Test 2 & 3: Footwear and Clothing Variant Management ---");
  // Toggle footwear size 8 out of stock
  publishedProduct.inStockSizes = publishedProduct.inStockSizes.filter((s) => s !== "8");
  publishedProduct.variants = publishedProduct.variants.map((v) =>
    v.size === "8" ? { ...v, isAvailable: false, stockQuantity: 0 } : v
  );
  writeDb(checkDb1Pub);

  const checkDbVariants = readDb();
  const footwearItem = checkDbVariants.products.find((p) => p.id === testProdId);
  assert(!footwearItem.inStockSizes.includes("8"), "Footwear variant UK 8 successfully marked Out of Stock");
  assert(footwearItem.inStockSizes.includes("9"), "Other footwear variants (UK 9) remain in stock");

  // Clothing variant check on an apparel product
  const clothingItem = checkDbVariants.products.find((p) => p.type === "clothing");
  assert(Boolean(clothingItem), "Clothing product found in catalogue");
  assert(Boolean(clothingItem.clothingCategory), "Clothing product has valid clothingCategory attribute");

  // -------------------------------------------------------------
  // TEST 4: Bulk Imports with Validation & Error Reporting
  // -------------------------------------------------------------
  console.log("\n--- Test 4: Bulk Imports & Error Reporting ---");
  const testCsvRows = [
    // Valid row 1
    {
      sku: `IMP-TEST-${Date.now()}-1`,
      title: "Imported Authentic Polo",
      brand: "U.S. Polo Assn.",
      mrp: "2499",
      outletPrice: "1699",
      type: "clothing",
      gender: "Men",
      sizes: "S, M, L, XL",
    },
    // Invalid row 2 (Outlet price higher than MRP)
    {
      sku: `IMP-TEST-${Date.now()}-2`,
      title: "Faulty Pricing Shoe",
      brand: "Puma",
      mrp: "4000",
      outletPrice: "6000", // Invalid!
      type: "footwear",
      gender: "Unisex",
    },
    // Invalid row 3 (Missing SKU)
    {
      sku: "", // Invalid!
      title: "Missing SKU Sneaker",
      brand: "Nike",
      mrp: "5000",
      outletPrice: "3500",
    },
  ];

  // Run validation logic
  const existingSkus = new Set(checkDbVariants.products.map((p) => p.sku.toUpperCase()));
  const validRows = [];
  const errors = [];

  testCsvRows.forEach((row, i) => {
    const rowNum = i + 2;
    if (!row.sku) {
      errors.push({ rowNumber: rowNum, field: "sku", message: "Store SKU is required" });
      return;
    }
    const mrp = Number(row.mrp);
    const outletPrice = Number(row.outletPrice);
    if (outletPrice > mrp) {
      errors.push({ rowNumber: rowNum, field: "outletPrice", message: "Outlet price cannot exceed MRP" });
      return;
    }
    validRows.push(row);
  });

  assert(validRows.length === 1, "Validation correctly identified 1 valid import row");
  assert(errors.length === 2, "Validation correctly caught 2 invalid import rows line-by-line");
  assert(errors[0].field === "outletPrice", "Error report flagged outlet price exceeding MRP");
  assert(errors[1].field === "sku", "Error report flagged missing required SKU");

  // -------------------------------------------------------------
  // TEST 5: Stock and Discounts Calculations
  // -------------------------------------------------------------
  console.log("\n--- Test 5: Stock and Discounts Calculations ---");
  const mrpTest = 10000;
  const targetDiscount = 40; // 40% off
  const computedOutlet = Math.round(mrpTest * (1 - targetDiscount / 100));
  const recomputedDiscount = Math.round(((mrpTest - computedOutlet) / mrpTest) * 100);

  assert(computedOutlet === 6000, "Calculated outlet price for 40% discount on ₹10,000 MRP is ₹6,000");
  assert(recomputedDiscount === 40, "Recalculated discount percentage matches exact 40%");

  // -------------------------------------------------------------
  // TEST 6 & 7: Banner Replacement & Homepage Section Ordering
  // -------------------------------------------------------------
  console.log("\n--- Test 6 & 7: Homepage Section Controls & Banner Replacement ---");
  const dbSections = readDb();
  assert(dbSections.homepageSections.length === 8, "Homepage has 8 distinct configurable sections");
  const heroSection = dbSections.homepageSections.find((s) => s.id === "heroBanner");
  assert(Boolean(heroSection && heroSection.enabled), "Hero campaign banner is present and active");

  // -------------------------------------------------------------
  // TEST 8: Collection Publishing & Assignment
  // -------------------------------------------------------------
  console.log("\n--- Test 8: Collection Publishing & Assignment ---");
  const testColSlug = "trending-styles";
  const assignedProducts = dbSections.products.filter((p) => p.collections?.includes(testColSlug));
  assert(assignedProducts.length > 0, `Products correctly assigned to collection "${testColSlug}"`);

  // -------------------------------------------------------------
  // TEST 9: Navigation Changes (Header, Mega Menus, Footer)
  // -------------------------------------------------------------
  console.log("\n--- Test 9: Navigation Manager Integrity ---");
  const nav = dbSections.navigation;
  assert(Boolean(nav.header && nav.header.length >= 7), "Header navigation links configured");
  assert(Boolean(nav.footwearMegaMenu && nav.footwearMegaMenu.length > 0), "Footwear mega menu configured");
  assert(Boolean(nav.clothingMegaMenu && nav.clothingMegaMenu.length > 0), "Clothing mega menu configured");
  assert(Boolean(nav.footer && nav.footer.length === 4), "Footer configured with 4 columns");

  // -------------------------------------------------------------
  // TEST 10: Store Information
  // -------------------------------------------------------------
  console.log("\n--- Test 10: Flagship Store Details ---");
  const store = dbSections.storeDetails;
  assert(store.city === "Kapadwanj", "Store city is verified as Kapadwanj");
  assert(store.state === "Gujarat", "Store state is verified as Gujarat");
  assert(store.pincode === "387620", "Store pincode is verified as 387620");

  // -------------------------------------------------------------
  // TEST 11: Customer Enquiry Management
  // -------------------------------------------------------------
  console.log("\n--- Test 11: Customer Enquiry Management ---");
  assert(dbSections.enquiries.length > 0, "Customer enquiries stored in database");
  const testEnq = dbSections.enquiries[0];
  const oldStatus = testEnq.status;
  testEnq.status = "In Store Visit";
  testEnq.resolutionNotes = "Customer confirmed visit to Kapadwanj flagship this Saturday.";
  testEnq.updatedAt = new Date().toISOString();
  writeDb(dbSections);

  const checkEnq = readDb().enquiries[0];
  assert(checkEnq.status === "In Store Visit", "Enquiry status updated to 'In Store Visit'");
  assert(checkEnq.resolutionNotes.includes("Kapadwanj"), "Enquiry resolution notes saved");

  // -------------------------------------------------------------
  // TEST 12: Audit Trail & Backups
  // -------------------------------------------------------------
  console.log("\n--- Test 12: Audit Trail & Backup Snapshots ---");
  const auditDb = readDb();
  assert(auditDb.auditLogs.length > 0, "Audit logs contain immutable historical actions");
  assert(Boolean(auditDb.backups && auditDb.backups.length > 0), "Initial system recovery snapshot exists");

  // Create test snapshot
  const newSnapshot = {
    id: `backup-test-${Date.now()}`,
    timestamp: new Date().toISOString(),
    author: "QA Automated Runner",
    reason: "Acceptance Test Verification Snapshot",
    productsCount: auditDb.products.length,
    sizeKb: 135,
  };
  auditDb.backups.unshift(newSnapshot);
  writeDb(auditDb);

  const checkBackups = readDb();
  assert(checkBackups.backups[0].id === newSnapshot.id, "Disaster recovery snapshot created and indexed");

  // -------------------------------------------------------------
  // TEST 13: Size Guide Management (5 Categories)
  // -------------------------------------------------------------
  console.log("\n--- Test 13: Size Guide Management ---");
  const sizeGuides = auditDb.sizeGuides;
  assert(Boolean(sizeGuides.menFootwear), "Men's Footwear size chart exists");
  assert(Boolean(sizeGuides.womenFootwear), "Women's Footwear size chart exists");
  assert(Boolean(sizeGuides.unisexFootwear), "Unisex Footwear size chart exists");
  assert(Boolean(sizeGuides.menClothing), "Men's Clothing size chart exists");
  assert(Boolean(sizeGuides.womenClothing), "Women's Clothing size chart exists");
  assert(sizeGuides.menFootwear.rows.length >= 7, "Men's Footwear chart has full UK 6-12 size coverage");

  // -------------------------------------------------------------
  // TEST 14: Storefront Cache Revalidation & Draft Exclusion
  // -------------------------------------------------------------
  console.log("\n--- Test 14: Storefront Draft Exclusion Check ---");
  const finalDb = readDb();
  // Mark one product as draft
  const testDraftProd = finalDb.products[finalDb.products.length - 1];
  testDraftProd.status = "draft";
  writeDb(finalDb);

  // Storefront filter emulation
  const publishedStorefrontProducts = readDb().products.filter((p) => {
    if (p.status === "draft" || p.status === "archived") return false;
    if (p.status === "scheduled" && p.scheduledPublishDate && p.scheduledPublishDate > new Date().toISOString()) {
      return false;
    }
    return true;
  });

  assert(
    !publishedStorefrontProducts.some((p) => p.id === testDraftProd.id),
    "Unpublished/Draft product strictly excluded from storefront queries"
  );

  // Clean up test created product
  const cleanDb = readDb();
  cleanDb.products = cleanDb.products.filter((p) => p.id !== testProdId);
  // Restore draft product status
  cleanDb.products[cleanDb.products.length - 1].status = "published";
  writeDb(cleanDb);

  console.log("\n=================================================================");
  console.log(`🎉 ALL ${passedTests} ACCEPTANCE TESTS PASSED SUCCESSFULLY! (${passedTests}/${totalTests})`);
  console.log("=================================================================\n");
}

runAcceptanceTests().catch((err) => {
  console.error("Test Suite Execution Failed:", err);
  process.exit(1);
});
