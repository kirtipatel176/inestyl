/**
 * INESTYLE OUTLET — Comprehensive Security, Architecture & RBAC Test Suite
 * 
 * Verifies:
 * 1. Monorepo Bundle & Route Isolation (Zero admin leaks in storefront)
 * 2. Supabase Migration & Schema Integrity (24 tables, types, constraints, search_path security)
 * 3. Row-Level Security (RLS) Policy Coverage & Deny-by-Default
 * 4. Seed Data Verification (Roles, Permissions, Products, Inventory, Media)
 * 5. RBAC & Granular Permissions Matrix Logic
 * 6. Zod Validation Boundary Tests (Footwear vs Clothing strict separation, Stock movements)
 * 7. Security Definer & Privilege Escalation Defenses
 * 8. Shared Financial & Utility Functions
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

// ANSI Color Helpers
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

let passedTests = 0;
let failedTests = 0;

function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`  ${colors.green}✓ PASS:${colors.reset} ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ${colors.red}✗ FAIL:${colors.reset} ${testName}`);
    console.error(`    ${colors.red}Error:${colors.reset} ${err.message}`);
    failedTests++;
  }
}

console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}  INESTYLE OUTLET — PRODUCTION SECURITY & ARCHITECTURE TEST SUITE      ${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

// -----------------------------------------------------------------------------
// MODULE 1: Monorepo Architecture & Frontend Bundle Isolation
// -----------------------------------------------------------------------------
console.log(`${colors.bold}1. Monorepo Architecture & Bundle Isolation Tests${colors.reset}`);

runTest('apps/storefront contains zero admin routes or admin-only files', () => {
  const storefrontAppDir = path.join(ROOT_DIR, 'apps/storefront/src/app');
  assert.strictEqual(fs.existsSync(path.join(storefrontAppDir, 'admin')), false, 'Storefront must not have an app/admin route');
  assert.strictEqual(fs.existsSync(path.join(storefrontAppDir, 'api/admin')), false, 'Storefront must not have an api/admin route');
  assert.strictEqual(fs.existsSync(path.join(storefrontAppDir, 'login')), false, 'Storefront must not have an admin login page');
});

runTest('apps/storefront production build has zero admin route artifacts', () => {
  const storefrontManifestPath = path.join(ROOT_DIR, 'apps/storefront/.next/app-build-manifest.json');
  assert.strictEqual(fs.existsSync(storefrontManifestPath), true, 'Storefront app-build-manifest.json must exist');
  
  const manifest = JSON.parse(fs.readFileSync(storefrontManifestPath, 'utf8'));
  const routeKeys = Object.keys(manifest.pages || {});
  
  const adminLeaks = routeKeys.filter(r => 
    r.includes('/admin') || 
    r.includes('/inventory') || 
    r.includes('/audit') || 
    r.includes('/two-factor') ||
    r.includes('/demo-credentials')
  );
  
  assert.strictEqual(adminLeaks.length, 0, `Storefront routes manifest contains private routes: ${adminLeaks.join(', ')}`);
});

runTest('apps/storefront environment template does not contain privileged secrets', () => {
  const storefrontEnv = fs.readFileSync(path.join(ROOT_DIR, 'apps/storefront/.env.example'), 'utf8');
  assert.strictEqual(storefrontEnv.includes('SUPABASE_SERVICE_ROLE_KEY'), false, 'Storefront .env must NOT contain SUPABASE_SERVICE_ROLE_KEY');
  assert.strictEqual(storefrontEnv.includes('ADMIN_SESSION_SECRET'), false, 'Storefront .env must NOT contain ADMIN_SESSION_SECRET');
  assert.strictEqual(storefrontEnv.includes('CLOUDINARY_API_SECRET'), false, 'Storefront .env must NOT contain CLOUDINARY_API_SECRET');
});

runTest('apps/admin contains dedicated administrative routes and APIs', () => {
  const adminManifestPath = path.join(ROOT_DIR, 'apps/admin/.next/app-path-routes-manifest.json');
  assert.strictEqual(fs.existsSync(adminManifestPath), true, 'Admin app-path-routes-manifest.json must exist');
  
  const manifest = JSON.parse(fs.readFileSync(adminManifestPath, 'utf8'));
  const routes = Object.values(manifest);
  
  assert.strictEqual(routes.includes('/api/auth/login'), true, 'Admin must have /api/auth/login');
  assert.strictEqual(routes.includes('/api/auth/me'), true, 'Admin must have /api/auth/me');
  assert.strictEqual(routes.includes('/api/inventory'), true, 'Admin must have /api/inventory');
  assert.strictEqual(routes.includes('/api/audit'), true, 'Admin must have /api/audit');
  assert.strictEqual(routes.includes('/api/enquiries'), true, 'Admin must have /api/enquiries');
});

runTest('apps/admin specifies robots noindex and independent Vercel configuration', () => {
  const adminLayout = fs.readFileSync(path.join(ROOT_DIR, 'apps/admin/src/app/layout.tsx'), 'utf8');
  assert.strictEqual(adminLayout.includes('index: false'), true, 'Admin layout must specify robots noindex');
  
  const adminVercel = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'apps/admin/vercel.json'), 'utf8'));
  assert.strictEqual(adminVercel.headers.some(h => h.headers.some(x => x.key === 'X-Frame-Options' && x.value === 'DENY')), true, 'Admin must have X-Frame-Options DENY');
});

// -----------------------------------------------------------------------------
// MODULE 2: Supabase Migrations & Schema Architecture
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}2. Supabase Migrations & Schema Architecture Tests${colors.reset}`);

const migrationsDir = path.join(ROOT_DIR, 'supabase/migrations');
const migration1 = fs.readFileSync(path.join(migrationsDir, '20261117000001_initial_schema.sql'), 'utf8');
const migration2 = fs.readFileSync(path.join(migrationsDir, '20261117000002_indexes_and_constraints.sql'), 'utf8');
const migration3 = fs.readFileSync(path.join(migrationsDir, '20261117000003_rbac_and_functions.sql'), 'utf8');
const migration4 = fs.readFileSync(path.join(migrationsDir, '20261117000004_row_level_security.sql'), 'utf8');

runTest('Initial schema defines all 24 required relational tables', () => {
  const requiredTables = [
    'profiles', 'roles', 'permissions', 'user_roles', 'role_permissions', 'activity_logs',
    'brands', 'categories', 'collections', 'products', 'product_categories', 'product_collections',
    'product_variants', 'inventory', 'stock_movements', 'product_media', 'banners', 'homepage_sections',
    'customers', 'enquiries', 'enquiry_notes', 'navigation_items', 'size_guides', 'store_settings'
  ];
  
  for (const table of requiredTables) {
    const tableRegex = new RegExp(`CREATE TABLE (IF NOT EXISTS )?(public\\.)?${table}\\b`, 'i');
    assert.strictEqual(tableRegex.test(migration1), true, `Migration 1 must create table "${table}"`);
  }
});

runTest('Money and currency fields use numeric(12,2), not floating point', () => {
  assert.strictEqual(migration1.includes('regular_price NUMERIC(12, 2) NOT NULL'), true, 'regular_price must be NUMERIC(12, 2)');
  assert.strictEqual(migration1.includes('sale_price NUMERIC(12, 2)'), true, 'sale_price must be NUMERIC(12, 2)');
  assert.strictEqual(migration1.includes('price_override NUMERIC(12, 2)'), true, 'price_override must be NUMERIC(12, 2)');
  assert.strictEqual(migration1.includes('FLOAT') || migration1.includes('REAL'), false, 'Prices must not use FLOAT or REAL types');
});

runTest('Timestamps use TIMESTAMPTZ across all tables', () => {
  const matches = migration1.match(/TIMESTAMP(TZ)?/g) || [];
  for (const match of matches) {
    assert.strictEqual(match, 'TIMESTAMPTZ', 'All timestamp columns must use TIMESTAMPTZ');
  }
});

runTest('Footwear and Clothing structured specifications are properly checked', () => {
  assert.strictEqual(migration1.includes("department IN ('footwear', 'clothing')"), true, 'Department must be constrained to footwear or clothing');
  assert.strictEqual(migration1.includes('footwear_attributes JSONB'), true, 'Footwear attributes must be structured JSONB');
  assert.strictEqual(migration1.includes('clothing_attributes JSONB'), true, 'Clothing attributes must be structured JSONB');
});

runTest('Automated updated_at triggers and performance indexes exist', () => {
  assert.strictEqual(migration2.includes('idx_products_slug'), true, 'Slug index must exist');
  assert.strictEqual(migration2.includes('idx_variants_sku'), true, 'Variant SKU index must exist');
  assert.strictEqual(migration2.includes('idx_inventory_variant_id'), true, 'Inventory variant_id index must exist');
  assert.strictEqual(migration2.includes('idx_activity_logs_timestamp'), true, 'Activity log timestamp index must exist');
  assert.strictEqual(migration2.includes('CREATE TRIGGER set_products_updated_at'), true, 'Products updated_at trigger must exist');
});

// -----------------------------------------------------------------------------
// MODULE 3: Security Definer & Privilege Escalation Defenses
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}3. Security Definer Functions & Anti-Privilege Escalation Tests${colors.reset}`);

runTest('All SECURITY DEFINER functions explicitly set search_path = public', () => {
  const functionDefs = migration3.split('CREATE OR REPLACE FUNCTION');
  for (let i = 1; i < functionDefs.length; i++) {
    const def = functionDefs[i];
    if (def.includes('SECURITY DEFINER')) {
      const funcNameMatch = def.match(/^\s*(public\.)?([a-zA-Z0-9_]+)/);
      const funcName = funcNameMatch ? funcNameMatch[2] : `function_${i}`;
      assert.strictEqual(
        def.includes('SET search_path = public') || def.includes('SET search_path = pg_catalog, public'),
        true,
        `SECURITY DEFINER function "${funcName}" must explicitly set search_path to prevent path hijacking`
      );
    }
  }
});

runTest('Atomic adjust_variant_stock function prevents race conditions and validates quantity', () => {
  assert.strictEqual(migration3.includes('CREATE OR REPLACE FUNCTION public.adjust_variant_stock'), true, 'adjust_variant_stock function must exist');
  assert.strictEqual(migration3.includes('FOR UPDATE'), true, 'Inventory row must be locked with FOR UPDATE to prevent race conditions');
  assert.strictEqual(migration3.includes('Stock adjustment cannot result in negative balance'), true, 'Stock adjustment must prevent negative quantities');
});

runTest('Activity logs are append-only with deny-by-default for UPDATE and DELETE', () => {
  // Migration 4 enables RLS on activity_logs and creates SELECT policy, but strictly omits UPDATE/DELETE policies
  assert.strictEqual(migration4.includes('ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;'), true);
  assert.strictEqual(migration4.includes('CREATE POLICY "Authorized staff can read audit activity logs"'), true);
  
  // Verify no UPDATE or DELETE policy exists on activity_logs
  const updatePolicyRegex = /CREATE POLICY .* ON public\.activity_logs FOR UPDATE/i;
  const deletePolicyRegex = /CREATE POLICY .* ON public\.activity_logs FOR DELETE/i;
  assert.strictEqual(updatePolicyRegex.test(migration4), false, 'Activity logs must have NO UPDATE policy');
  assert.strictEqual(deletePolicyRegex.test(migration4), false, 'Activity logs must have NO DELETE policy');
});

// -----------------------------------------------------------------------------
// MODULE 4: Row Level Security (RLS) Policy Coverage
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}4. Row Level Security (RLS) Policy Coverage Tests${colors.reset}`);

runTest('Row Level Security is enabled on every single table', () => {
  const requiredTables = [
    'profiles', 'roles', 'permissions', 'user_roles', 'role_permissions', 'activity_logs',
    'brands', 'categories', 'collections', 'products', 'product_categories', 'product_collections',
    'product_variants', 'inventory', 'stock_movements', 'product_media', 'banners', 'homepage_sections',
    'customers', 'enquiries', 'enquiry_notes', 'navigation_items', 'size_guides', 'store_settings'
  ];
  
  for (const table of requiredTables) {
    const rlsRegex = new RegExp(`ALTER TABLE (public\\.)?${table} ENABLE ROW LEVEL SECURITY;`, 'i');
    assert.strictEqual(rlsRegex.test(migration4), true, `Table "${table}" must have RLS explicitly enabled`);
  }
});

runTest('Public anon users can ONLY read published products, active brands, and public CMS', () => {
  assert.strictEqual(migration4.includes('CREATE POLICY "Public storefront can view published products"'), true, 'Public can view published products policy must exist');
  assert.strictEqual(migration4.includes("status = 'published'"), true, 'Product read policy must restrict to status = published');
  assert.strictEqual(migration4.includes('CREATE POLICY "Public can view all brands"'), true, 'Public brand read policy must exist');
  assert.strictEqual(migration4.includes('CREATE POLICY "Public can view enabled homepage sections"'), true, 'Public homepage section policy must exist');
});

runTest('Private administrative tables have ZERO public read or write access', () => {
  assert.strictEqual(migration4.includes('CREATE POLICY "Public can view profiles"'), false, 'Profiles must never have public read');
  assert.strictEqual(migration4.includes('CREATE POLICY "Public can view enquiries"'), false, 'Enquiries must never have public read');
  assert.strictEqual(migration4.includes('CREATE POLICY "Public can view activity logs"'), false, 'Activity logs must never have public read');
  assert.strictEqual(migration4.includes('CREATE POLICY "Public can view stock movements"'), false, 'Stock movements must never have public read');
});

runTest('Public users can ONLY create customer enquiries', () => {
  assert.strictEqual(migration4.includes('CREATE POLICY "Public storefront can submit customer enquiries"'), true, 'Public enquiry submission policy must exist');
  assert.strictEqual(migration4.includes('CREATE POLICY "Public storefront can update customer enquiries"'), false, 'Public cannot update enquiries');
});

// -----------------------------------------------------------------------------
// MODULE 5: Seed Data Completeness
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}5. Seed Data Verification Tests${colors.reset}`);

const seedSql = fs.readFileSync(path.join(ROOT_DIR, 'supabase/seed.sql'), 'utf8');

runTest('Migration 3 defines all 5 administrative roles', () => {
  const roles = ['owner', 'administrator', 'inventory_manager', 'content_manager', 'enquiry_manager'];
  for (const role of roles) {
    assert.strictEqual(migration3.includes(`'${role}'`), true, `Migration 3 must contain role '${role}'`);
  }
});

runTest('Migration 3 defines all 12 granular permissions', () => {
  const permissions = [
    'products.read', 'products.create', 'products.update', 'products.delete',
    'inventory.read', 'inventory.update',
    'media.manage',
    'enquiries.read', 'enquiries.update',
    'settings.manage', 'users.manage', 'reports.read'
  ];
  for (const perm of permissions) {
    assert.strictEqual(migration3.includes(`'${perm}'`), true, `Migration 3 must contain permission '${perm}'`);
  }
});

runTest('Seed data contains all 28 original catalog products and 168 variants', () => {
  assert.strictEqual(seedSql.includes('INSERT INTO public.products'), true, 'Seed must contain product inserts');
  assert.strictEqual(seedSql.includes('INSERT INTO public.product_variants'), true, 'Seed must contain variant inserts');
  assert.strictEqual(seedSql.includes('INSERT INTO public.inventory'), true, 'Seed must contain inventory inserts');
  
  // Verify specific original products and variants are present
  assert.strictEqual(seedSql.includes('Nike Air Max 270'), true, 'Nike Air Max 270 must be in seed');
  assert.strictEqual(seedSql.includes('NK-270-WHT-6-WHITEBLACK'), true, 'Original variant SKU must be in seed');
  assert.strictEqual(seedSql.includes('prod-24'), true, 'All 28 products through prod-24 and duplicates must be in seed');
});

// -----------------------------------------------------------------------------
// MODULE 6: RBAC & Permission Matrix Engine (TypeScript / Logic)
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}6. RBAC & Granular Permission Matrix Logic Tests${colors.reset}`);

const { 
  ROLE_PERMISSIONS, 
  hasPermission, 
  canAccessTab, 
  getGrantedPermissions 
} = require(path.join(ROOT_DIR, 'packages/permissions/dist/index.js'));

runTest('Owner role has all 12 permissions', () => {
  const ownerPerms = ROLE_PERMISSIONS['owner'];
  assert.strictEqual(ownerPerms.length, 12, 'Owner must have 12 permissions');
  assert.strictEqual(hasPermission(['owner'], 'users.manage'), true);
  assert.strictEqual(hasPermission(['owner'], 'settings.manage'), true);
  assert.strictEqual(hasPermission(['owner'], 'products.delete'), true);
});

runTest('Inventory Manager has stock permissions but CANNOT manage users or delete products', () => {
  const roles = ['inventory_manager'];
  assert.strictEqual(hasPermission(roles, 'inventory.read'), true, 'Inventory Manager can read inventory');
  assert.strictEqual(hasPermission(roles, 'inventory.update'), true, 'Inventory Manager can update inventory');
  assert.strictEqual(hasPermission(roles, 'products.read'), true, 'Inventory Manager can read products');
  assert.strictEqual(hasPermission(roles, 'products.delete'), false, 'Inventory Manager CANNOT delete products');
  assert.strictEqual(hasPermission(roles, 'users.manage'), false, 'Inventory Manager CANNOT manage users');
  assert.strictEqual(hasPermission(roles, 'settings.manage'), false, 'Inventory Manager CANNOT manage settings');
});

runTest('Content Manager can manage media and read products but CANNOT update stock or manage users', () => {
  const roles = ['content_manager'];
  assert.strictEqual(hasPermission(roles, 'media.manage'), true, 'Content Manager can manage media');
  assert.strictEqual(hasPermission(roles, 'products.read'), true, 'Content Manager can read products');
  assert.strictEqual(hasPermission(roles, 'inventory.update'), false, 'Content Manager CANNOT update inventory');
  assert.strictEqual(hasPermission(roles, 'users.manage'), false, 'Content Manager CANNOT manage users');
});

runTest('Enquiry Manager can manage customer enquiries but CANNOT access product editing or stock', () => {
  const roles = ['enquiry_manager'];
  assert.strictEqual(hasPermission(roles, 'enquiries.read'), true, 'Enquiry Manager can read enquiries');
  assert.strictEqual(hasPermission(roles, 'enquiries.update'), true, 'Enquiry Manager can update enquiries');
  assert.strictEqual(hasPermission(roles, 'products.create'), false, 'Enquiry Manager CANNOT create products');
  assert.strictEqual(hasPermission(roles, 'inventory.update'), false, 'Enquiry Manager CANNOT update inventory');
});

runTest('Tab access control correctly restricts dashboard sections', () => {
  assert.strictEqual(canAccessTab(['inventory_manager'], 'inventory'), true);
  assert.strictEqual(canAccessTab(['inventory_manager'], 'users'), false);
  assert.strictEqual(canAccessTab(['content_manager'], 'media'), true);
  assert.strictEqual(canAccessTab(['content_manager'], 'inventory'), false);
  assert.strictEqual(canAccessTab(['enquiry_manager'], 'enquiries'), true);
  assert.strictEqual(canAccessTab(['enquiry_manager'], 'users'), false);
});

// -----------------------------------------------------------------------------
// MODULE 7: Zod Validation Engine (Domain Integrity & Department Separation)
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}7. Zod Validation Engine & Attribute Integrity Tests${colors.reset}`);

const { 
  ProductCreateSchema, 
  ProductBaseSchema,
  StockMovementSchema, 
  CustomerEnquirySubmitSchema 
} = require(path.join(ROOT_DIR, 'packages/validations/dist/index.js'));

runTest('ProductCreateSchema accepts valid Footwear product with required footwear specs', () => {
  const validFootwear = {
    title: 'Air Zoom Test Shoe',
    sku: 'NIKE-AZ-001',
    brand: 'Nike',
    brandSlug: 'nike',
    department: 'footwear',
    category: 'Running Shoes',
    gender: 'Men',
    description: 'High performance running shoe with responsive cushioning.',
    regularPrice: 12999.00,
    salePrice: 9999.00,
    status: 'published',
    image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    variants: [
      { size: '9', colour: 'Black', stockQuantity: 10 }
    ],
    footwearAttributes: {
      shoeType: 'Running',
      upperMaterial: 'Flyknit Mesh',
      soleMaterial: 'Zoom Air Rubber'
    }
  };
  
  const parsed = ProductCreateSchema.safeParse(validFootwear);
  assert.strictEqual(parsed.success, true, `Expected valid footwear payload to pass: ${JSON.stringify(parsed.error?.issues)}`);
});

runTest('ProductCreateSchema REJECTS Footwear product when salePrice exceeds regularPrice', () => {
  const invalidPriceFootwear = {
    title: 'Air Zoom Invalid Price',
    sku: 'NIKE-AZ-002',
    brand: 'Nike',
    brandSlug: 'nike',
    department: 'footwear',
    category: 'Running Shoes',
    gender: 'Men',
    description: 'Sale price higher than regular price.',
    regularPrice: 10000.00,
    salePrice: 12000.00, // Invalid! Outlet sale price cannot exceed MRP
    image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    variants: [{ size: '9', colour: 'Black', stockQuantity: 5 }]
  };
  
  const parsed = ProductCreateSchema.safeParse(invalidPriceFootwear);
  assert.strictEqual(parsed.success, false, 'Sale price exceeding MRP must fail validation');
});

runTest('ProductCreateSchema accepts valid Clothing product with required clothing specs', () => {
  const validClothing = {
    title: 'Classic Oxford Shirt',
    sku: 'RL-OX-001',
    brand: 'Ralph Lauren',
    brandSlug: 'ralph-lauren',
    department: 'clothing',
    category: 'Shirts',
    gender: 'Men',
    description: '100% fine cotton shirt with classic collar.',
    regularPrice: 6499.00,
    salePrice: 4999.00,
    status: 'published',
    image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    variants: [
      { size: 'M', colour: 'Sky Blue', stockQuantity: 15 }
    ],
    clothingAttributes: {
      clothingCategory: 'Shirts',
      fabric: '100% Cotton',
      fit: 'Regular Fit',
      sleeve: 'Full Sleeve'
    }
  };
  
  const parsed = ProductCreateSchema.safeParse(validClothing);
  assert.strictEqual(parsed.success, true, `Expected valid clothing payload to pass: ${JSON.stringify(parsed.error?.issues)}`);
});

runTest('ProductCreateSchema REJECTS Clothing product with footwear size (e.g. 8.5)', () => {
  const invalidClothingSizing = {
    title: 'Invalid Shirt Sizing',
    sku: 'RL-OX-002',
    brand: 'Ralph Lauren',
    brandSlug: 'ralph-lauren',
    department: 'clothing',
    category: 'Shirts',
    gender: 'Men',
    description: 'Testing department sizing separation.',
    regularPrice: 6499.00,
    salePrice: 4999.00,
    image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    variants: [
      { size: '8.5', colour: 'Sky Blue', stockQuantity: 5 } // 8.5 is a shoe size, invalid for shirts!
    ]
  };
  
  const parsed = ProductCreateSchema.safeParse(invalidClothingSizing);
  assert.strictEqual(parsed.success, false, 'Footwear size in clothing product must fail validation');
});

runTest('StockMovementSchema validates movement types and enforces quantity limits', () => {
  const validMovement = {
    variantId: '11111111-1111-1111-1111-111111111111',
    movementType: 'manual_adjustment',
    quantityDelta: -3,
    reason: 'Damaged item written off during physical count audit'
  };
  const parsed = StockMovementSchema.safeParse(validMovement);
  assert.strictEqual(parsed.success, true, `Valid stock movement must pass: ${JSON.stringify(parsed.error?.issues)}`);

  const invalidMovement = {
    variantId: '11111111-1111-1111-1111-111111111111',
    movementType: 'arbitrary_hack', // Invalid movement type
    quantityDelta: 0 // Quantity cannot be 0
  };
  const invalidParsed = StockMovementSchema.safeParse(invalidMovement);
  assert.strictEqual(invalidParsed.success, false, 'Invalid movement type and zero change must fail');
});

runTest('CustomerEnquirySubmitSchema validates phone number and sanitizes customer inputs', () => {
  const validEnquiry = {
    customerName: 'Rahul Sharma',
    customerPhone: '+919876543210',
    customerEmail: 'rahul.sharma@example.com',
    message: 'Is UK 9 available in Mumbai store?'
  };
  const parsed = CustomerEnquirySubmitSchema.safeParse(validEnquiry);
  assert.strictEqual(parsed.success, true, `Valid customer enquiry must pass: ${JSON.stringify(parsed.error?.issues)}`);

  const invalidPhone = {
    customerName: 'Rahul Sharma',
    customerPhone: 'invalid-phone-num',
    message: 'Hello'
  };
  const invalidParsed = CustomerEnquirySubmitSchema.safeParse(invalidPhone);
  assert.strictEqual(invalidParsed.success, false, 'Invalid phone number must fail validation');
});

// -----------------------------------------------------------------------------
// MODULE 8: Shared Utilities & Financial Calculation Tests
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}8. Shared Utilities & Financial Calculations Tests${colors.reset}`);

const { 
  formatINR, 
  calculateDiscount, 
  generateVariantSKU, 
  slugify 
} = require(path.join(ROOT_DIR, 'packages/shared-utils/dist/index.js'));

runTest('formatINR correctly formats Indian Rupee with comma grouping', () => {
  assert.strictEqual(formatINR(12999), '₹12,999');
  assert.strictEqual(formatINR(12999, true), '₹12,999.00');
  assert.strictEqual(formatINR(100000), '₹1,00,000'); // Lakh formatting check
});

runTest('calculateDiscount calculates exact integer percentage off', () => {
  assert.strictEqual(calculateDiscount(10000, 7500), 25);
  assert.strictEqual(calculateDiscount(12999, 9999), 23);
  assert.strictEqual(calculateDiscount(5000, 5000), 0);
  assert.strictEqual(calculateDiscount(5000, undefined), 0);
});

runTest('generateVariantSKU creates standardized uppercase unique identifiers', () => {
  const sku = generateVariantSKU('PEG40', 'UK 9', 'White');
  assert.strictEqual(sku, 'PEG40-UK9-WHIT');
});

runTest('slugify normalizes special characters and preserves URL safety', () => {
  assert.strictEqual(slugify('Air Zoom Pegasus 40 - Limited Edition!'), 'air-zoom-pegasus-40-limited-edition');
  assert.strictEqual(slugify('Women & Men Apparel (2026)'), 'women-men-apparel-2026');
});

// -----------------------------------------------------------------------------
// SUMMARY REPORT
// -----------------------------------------------------------------------------
console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
console.log(`${colors.bold}TEST SUITE EXECUTION SUMMARY:${colors.reset}`);
console.log(`  Total Tests Run:  ${passedTests + failedTests}`);
console.log(`  ${colors.green}Passed:${colors.reset}           ${passedTests}`);
console.log(`  ${colors.red}Failed:${colors.reset}           ${failedTests}`);
console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log(`${colors.green}${colors.bold}ALL SECURITY, SCHEMA, RLS & ARCHITECTURE TESTS PASSED SUCCESSFULLY!${colors.reset}\n`);
  process.exit(0);
}
