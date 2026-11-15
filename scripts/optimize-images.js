/**
 * INESTYLE OUTLET — Automated Image Optimization & Asset Organization Pipeline
 * 
 * Capabilities:
 * 1. Safe Archival: Preserves 100% of original raw assets into public/images/originals/
 * 2. Directory Standardization: Generates structured folders:
 *    - public/images/hero/desktop/ (1600 × 900)
 *    - public/images/hero/mobile/ (750 × 1000)
 *    - public/images/products/footwear/ (Listing: 600 × 750, Detail: 1200 × 1500)
 *    - public/images/products/clothing/ (Listing: 600 × 750, Detail: 1200 × 1500)
 *    - public/images/categories/ (Banner: 900 × 1100)
 *    - public/images/collections/ (Banner: 1200 × 600 / 900 × 1100)
 *    - public/images/banners/ (1400 × 700 / 900 × 1100)
 *    - public/images/thumbnails/ (200 × 250)
 *    - public/images/store/ (1200 × 800 / 800 × 534)
 * 3. Modern Format Generation: Produces AVIF (highest compression), WebP (broad modern support), and optimized JPEG/PNG fallbacks.
 * 4. In-Place Compatibility: Maintains original file paths and creates .webp and .avif siblings for zero broken links.
 * 5. Aspect Ratio Preservation: Uses 'contain' with #F5F5F7 background for products and 'cover' for heroes/banners without distortion.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const ORIGINALS_DIR = path.join(IMAGES_DIR, 'originals');

// Ensure destination directories exist
const REQUIRED_DIRS = [
  path.join(IMAGES_DIR, 'originals'),
  path.join(IMAGES_DIR, 'hero/desktop'),
  path.join(IMAGES_DIR, 'hero/mobile'),
  path.join(IMAGES_DIR, 'products/footwear'),
  path.join(IMAGES_DIR, 'products/clothing'),
  path.join(IMAGES_DIR, 'categories'),
  path.join(IMAGES_DIR, 'brands'),
  path.join(IMAGES_DIR, 'collections'),
  path.join(IMAGES_DIR, 'banners'),
  path.join(IMAGES_DIR, 'thumbnails'),
  path.join(IMAGES_DIR, 'store'),
];

REQUIRED_DIRS.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Category classification for products
const FOOTWEAR_FILES = [
  'adidas-ultraboost.jpg',
  'hoka-clifton-9.jpg',
  'nike-air-max-270-side.jpg',
  'nike-air-max-270-sole.jpg',
  'nike-air-max-270-top.jpg',
  'nike-air-max-270.jpg',
  'puma-rs-x.jpg',
];

const CLOTHING_FILES = [
  'diesel-denim-jacket.jpg',
  'levis-501-original.jpg',
  'nike-club-hoodie.jpg',
  'us-polo-classic-tee.jpg',
];

// Helper: Backup original file safely
function backupOriginal(srcPath, relSubdir) {
  const targetDir = path.join(ORIGINALS_DIR, relSubdir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const destPath = path.join(targetDir, path.basename(srcPath));
  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(srcPath, destPath);
  }
  return destPath;
}

// Helper: Generate AVIF, WebP, and fallback formats
async function outputVariants(pipeline, baseOutputDir, baseFilename, formats = ['avif', 'webp', 'jpg']) {
  const results = [];
  const nameWithoutExt = path.parse(baseFilename).name;

  for (const fmt of formats) {
    const destPath = path.join(baseOutputDir, `${nameWithoutExt}.${fmt}`);
    let instance = pipeline.clone();

    if (fmt === 'avif') {
      instance = instance.avif({ quality: 75, effort: 4 });
    } else if (fmt === 'webp') {
      instance = instance.webp({ quality: 82, effort: 4 });
    } else if (fmt === 'jpg' || fmt === 'jpeg') {
      instance = instance.jpeg({ quality: 84, progressive: true, mozjpeg: true });
    } else if (fmt === 'png') {
      instance = instance.png({ compressionLevel: 8, progressive: true });
    }

    await instance.toFile(destPath);
    const stats = fs.statSync(destPath);
    results.push({ path: destPath, format: fmt, size: stats.size });
  }

  return results;
}

async function runOptimization() {
  console.log('===============================================================');
  console.log('  INESTYLE OUTLET — Image Optimization & Asset Pipeline       ');
  console.log('===============================================================\n');

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;

  // 1. Process HERO Images
  console.log('--- Phase 1: Optimizing Hero & Campaign Images ---');
  const heroDir = path.join(IMAGES_DIR, 'hero');
  const heroFiles = fs.readdirSync(heroDir).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const file of heroFiles) {
    const fullPath = path.join(heroDir, file);
    backupOriginal(fullPath, 'hero');
    const origStats = fs.statSync(fullPath);
    totalOriginalBytes += origStats.size;

    const baseName = path.parse(file).name;
    const isPng = file.endsWith('.png');
    const fallbackFmt = isPng ? 'png' : 'jpg';

    // 1a. Desktop Hero Profile: 1600 × 900 (fit: cover)
    const desktopPipeline = sharp(fullPath)
      .resize(1600, 900, { fit: 'cover', position: 'center' });
    await outputVariants(desktopPipeline, path.join(IMAGES_DIR, 'hero/desktop'), file, ['avif', 'webp', fallbackFmt]);

    // 1b. Mobile Hero Profile: 750 × 1000 (fit: cover)
    const mobilePipeline = sharp(fullPath)
      .resize(750, 1000, { fit: 'cover', position: 'center' });
    await outputVariants(mobilePipeline, path.join(IMAGES_DIR, 'hero/mobile'), file, ['avif', 'webp', fallbackFmt]);

    // 1c. In-place sibling modern variants (.webp, .avif) and optimize original file
    const inPlaceWebp = path.join(heroDir, `${baseName}.webp`);
    const inPlaceAvif = path.join(heroDir, `${baseName}.avif`);
    await sharp(fullPath).webp({ quality: 82 }).toFile(inPlaceWebp);
    await sharp(fullPath).avif({ quality: 75 }).toFile(inPlaceAvif);

    // Also optimize existing original file in place (e.g. hero.png or hero-offer-banner.jpg)
    if (isPng) {
      const optPng = await sharp(fullPath).png({ compressionLevel: 9, effort: 7 }).toBuffer();
      if (optPng.length < origStats.size) {
        fs.writeFileSync(fullPath, optPng);
      }
    } else {
      const optJpg = await sharp(fullPath).jpeg({ quality: 84, progressive: true, mozjpeg: true }).toBuffer();
      if (optJpg.length < origStats.size) {
        fs.writeFileSync(fullPath, optJpg);
      }
    }

    const newStats = fs.statSync(inPlaceWebp);
    totalOptimizedBytes += newStats.size;
    console.log(`✓ Hero [${file}]: ${(origStats.size / 1024).toFixed(1)} KB -> WebP: ${(newStats.size / 1024).toFixed(1)} KB (-${(((origStats.size - newStats.size) / origStats.size) * 100).toFixed(1)}%)`);
  }

  // 2. Process CATEGORIES & BANNERS
  console.log('\n--- Phase 2: Optimizing Category & Banner Images ---');
  const catDir = path.join(IMAGES_DIR, 'categories');
  const catFiles = fs.readdirSync(catDir).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const file of catFiles) {
    const fullPath = path.join(catDir, file);
    backupOriginal(fullPath, 'categories');
    const origStats = fs.statSync(fullPath);
    totalOriginalBytes += origStats.size;

    const baseName = path.parse(file).name;

    // Category banner profile: 900 × 1100 (fit: cover)
    const bannerPipeline = sharp(fullPath)
      .resize(900, 1100, { fit: 'cover', position: 'center' });
    await outputVariants(bannerPipeline, catDir, `${baseName}-banner`, ['avif', 'webp', 'jpg']);
    await outputVariants(bannerPipeline, path.join(IMAGES_DIR, 'banners'), `${baseName}`, ['avif', 'webp', 'jpg']);

    // Category card profile: 600 × 750 (fit: cover)
    const cardPipeline = sharp(fullPath)
      .resize(600, 750, { fit: 'cover', position: 'center' });
    await outputVariants(cardPipeline, catDir, `${baseName}-card`, ['avif', 'webp', 'jpg']);

    // In-place siblings
    const inPlaceWebp = path.join(catDir, `${baseName}.webp`);
    const inPlaceAvif = path.join(catDir, `${baseName}.avif`);
    await sharp(fullPath).webp({ quality: 82 }).toFile(inPlaceWebp);
    await sharp(fullPath).avif({ quality: 75 }).toFile(inPlaceAvif);

    // In-place JPEG optimization
    const optJpg = await sharp(fullPath).jpeg({ quality: 84, progressive: true, mozjpeg: true }).toBuffer();
    if (optJpg.length < origStats.size) {
      fs.writeFileSync(fullPath, optJpg);
    }

    const newStats = fs.statSync(inPlaceWebp);
    totalOptimizedBytes += newStats.size;
    console.log(`✓ Category [${file}]: ${(origStats.size / 1024).toFixed(1)} KB -> WebP: ${(newStats.size / 1024).toFixed(1)} KB (-${(((origStats.size - newStats.size) / origStats.size) * 100).toFixed(1)}%)`);
  }

  // 3. Process PRODUCTS (Footwear & Clothing)
  console.log('\n--- Phase 3: Optimizing Product Imagery (Detail, Listing, Thumbnails) ---');
  const prodDir = path.join(IMAGES_DIR, 'products');
  const prodFiles = fs.readdirSync(prodDir).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const file of prodFiles) {
    const fullPath = path.join(prodDir, file);
    backupOriginal(fullPath, 'products');
    const origStats = fs.statSync(fullPath);
    totalOriginalBytes += origStats.size;

    const baseName = path.parse(file).name;
    const isFootwear = FOOTWEAR_FILES.includes(file);
    const subfolder = isFootwear ? 'footwear' : 'clothing';
    const subfolderPath = path.join(prodDir, subfolder);

    // 3a. Product Listing Profile: 600 × 750 (fit: contain with #F5F5F7 background)
    const listingPipeline = sharp(fullPath)
      .resize(600, 750, {
        fit: 'contain',
        background: { r: 245, g: 245, b: 247, alpha: 1 },
      });
    await outputVariants(listingPipeline, subfolderPath, `${baseName}-listing`, ['avif', 'webp', 'jpg']);

    // 3b. Product Detail Profile: 1200 × 1500 (fit: contain with #F5F5F7 background)
    const detailPipeline = sharp(fullPath)
      .resize(1200, 1500, {
        fit: 'contain',
        background: { r: 245, g: 245, b: 247, alpha: 1 },
      });
    await outputVariants(detailPipeline, subfolderPath, `${baseName}-detail`, ['avif', 'webp', 'jpg']);

    // 3c. Thumbnail Profile: 200 × 250 (fit: contain with #F5F5F7 background)
    const thumbPipeline = sharp(fullPath)
      .resize(200, 250, {
        fit: 'contain',
        background: { r: 245, g: 245, b: 247, alpha: 1 },
      });
    await outputVariants(thumbPipeline, path.join(IMAGES_DIR, 'thumbnails'), `${baseName}-thumb`, ['avif', 'webp', 'jpg']);

    // 3d. Direct in-place siblings (.webp, .avif)
    const inPlaceWebp = path.join(prodDir, `${baseName}.webp`);
    const inPlaceAvif = path.join(prodDir, `${baseName}.avif`);
    await sharp(fullPath).webp({ quality: 85 }).toFile(inPlaceWebp);
    await sharp(fullPath).avif({ quality: 78 }).toFile(inPlaceAvif);

    // 3e. In-place JPEG compression
    const optJpg = await sharp(fullPath).jpeg({ quality: 84, progressive: true, mozjpeg: true }).toBuffer();
    if (optJpg.length < origStats.size) {
      fs.writeFileSync(fullPath, optJpg);
    }

    const newStats = fs.statSync(inPlaceWebp);
    totalOptimizedBytes += newStats.size;
    console.log(`✓ Product [${subfolder}/${file}]: ${(origStats.size / 1024).toFixed(1)} KB -> WebP: ${(newStats.size / 1024).toFixed(1)} KB (-${(((origStats.size - newStats.size) / origStats.size) * 100).toFixed(1)}%)`);
  }

  // 4. Process STORE Images
  console.log('\n--- Phase 4: Optimizing Physical Store Showcase Images ---');
  const storeDir = path.join(IMAGES_DIR, 'store');
  const storeFiles = fs.readdirSync(storeDir).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const file of storeFiles) {
    const fullPath = path.join(storeDir, file);
    backupOriginal(fullPath, 'store');
    const origStats = fs.statSync(fullPath);
    totalOriginalBytes += origStats.size;

    const baseName = path.parse(file).name;

    // In-place siblings
    const inPlaceWebp = path.join(storeDir, `${baseName}.webp`);
    const inPlaceAvif = path.join(storeDir, `${baseName}.avif`);
    await sharp(fullPath).webp({ quality: 82 }).toFile(inPlaceWebp);
    await sharp(fullPath).avif({ quality: 75 }).toFile(inPlaceAvif);

    // In-place JPEG compression
    const optJpg = await sharp(fullPath).jpeg({ quality: 84, progressive: true, mozjpeg: true }).toBuffer();
    if (optJpg.length < origStats.size) {
      fs.writeFileSync(fullPath, optJpg);
    }

    const newStats = fs.statSync(inPlaceWebp);
    totalOptimizedBytes += newStats.size;
    console.log(`✓ Store [${file}]: ${(origStats.size / 1024).toFixed(1)} KB -> WebP: ${(newStats.size / 1024).toFixed(1)} KB (-${(((origStats.size - newStats.size) / origStats.size) * 100).toFixed(1)}%)`);
  }

  // 5. Generate Collections Images
  console.log('\n--- Phase 5: Generating Collections Assets ---');
  const collectionsDir = path.join(IMAGES_DIR, 'collections');
  const collectionSources = [
    { src: path.join(IMAGES_DIR, 'hero/new-arrivals-banner.jpg'), name: 'new-arrivals' },
    { src: path.join(IMAGES_DIR, 'hero/hero-lifestyle-composite.jpg'), name: 'trending-styles' },
    { src: path.join(IMAGES_DIR, 'hero/hero-sneaker-apparel.jpg'), name: 'everyday-essentials' },
    { src: path.join(IMAGES_DIR, 'categories/category-footwear.jpg'), name: 'sports-performance' },
    { src: path.join(IMAGES_DIR, 'hero/hero.png'), name: 'sneakers-collection' },
    { src: path.join(IMAGES_DIR, 'hero/hero-offer-banner.jpg'), name: 'weekend-edit' },
  ];

  for (const item of collectionSources) {
    if (fs.existsSync(item.src)) {
      const bannerPipeline = sharp(item.src).resize(1200, 600, { fit: 'cover', position: 'center' });
      await outputVariants(bannerPipeline, collectionsDir, item.name, ['avif', 'webp', 'jpg']);
      console.log(`✓ Collection Asset [${item.name}]: generated in AVIF, WebP, JPG`);
    }
  }

  console.log('\n===============================================================');
  console.log(`  OPTIMIZATION COMPLETE!`);
  console.log(`  Original Assets Total:   ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  Optimized Serving Total: ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  Bandwidth Reduction:     ${(((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1)}%`);
  console.log('===============================================================\n');
}

runOptimization().catch((err) => {
  console.error('Fatal error during optimization:', err);
  process.exit(1);
});

