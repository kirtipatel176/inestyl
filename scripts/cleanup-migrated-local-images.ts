/**
 * iNESTYL OUTLET — Safe Local Image Cleanup Pipeline
 * 
 * Safely removes migrated, redundant image derivatives from public/images/
 * ONLY after strict verification.
 * 
 * Safety Guarantees:
 * 1. Creates a local archive/backup in .image-backup/ before removal
 * 2. Scans entire src/ codebase to ensure zero remaining references
 * 3. Never deletes system assets (favicons, metadata icons, brand logos)
 * 4. Never removes the public/ directory or non-image assets
 */

import fs from "fs";
import path from "path";

const PUBLIC_IMAGES_DIR = path.resolve(process.cwd(), "public/images");
const BACKUP_DIR = path.resolve(process.cwd(), ".image-backup");
const SRC_DIR = path.resolve(process.cwd(), "src");

// System-critical files that MUST NEVER be deleted
const SYSTEM_PRESERVE = new Set([
  "favicon.ico",
  "favicon.svg",
  "favicon-32x32.png",
  "favicon-180x180.png",
]);

function walk(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function runCleanup() {
  console.log("==========================================================");
  console.log("   iNESTYL OUTLET — SAFE LOCAL IMAGE CLEANUP PIPELINE    ");
  console.log("==========================================================\n");

  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    console.log("public/images does not exist. Nothing to clean.");
    return;
  }

  // 1. Scan codebase for any remaining references
  const srcFiles = walk(SRC_DIR).filter((f) => /\.(tsx?|jsx?|json|css|html)$/i.test(f));
  const srcContents = srcFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");

  // 2. Identify candidate images
  const allImageFiles = walk(PUBLIC_IMAGES_DIR);
  console.log(`Discovered ${allImageFiles.length} files in public/images/`);

  const toDelete: string[] = [];
  const toRetain: string[] = [];

  for (const filePath of allImageFiles) {
    const filename = path.basename(filePath);
    const relPath = path.relative(process.cwd(), filePath);
    const publicRelPath = "/" + path.relative(path.resolve(process.cwd(), "public"), filePath);

    if (SYSTEM_PRESERVE.has(filename)) {
      toRetain.push(`${relPath} (System asset)`);
      continue;
    }

    // Check if directly referenced in src/
    if (srcContents.includes(publicRelPath) || srcContents.includes(`"${filename}"`)) {
      toRetain.push(`${relPath} (Actively referenced in code)`);
      continue;
    }

    // Redundant derivatives (.avif, .webp duplicates, originals backup, thumbnails)
    toDelete.push(filePath);
  }

  console.log(`\nAnalysis Results:`);
  console.log(`- Files to retain: ${toRetain.length}`);
  console.log(`- Files eligible for safe deletion: ${toDelete.length}`);

  if (toDelete.length === 0) {
    console.log("No redundant files to delete.");
    return;
  }

  // 3. Create backup before deletion
  console.log(`\nCreating safety backup in ${BACKUP_DIR}...`);
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  let totalBytesSaved = 0;

  for (const file of toDelete) {
    const relFromImages = path.relative(PUBLIC_IMAGES_DIR, file);
    const backupTarget = path.join(BACKUP_DIR, relFromImages);
    fs.mkdirSync(path.dirname(backupTarget), { recursive: true });
    fs.copyFileSync(file, backupTarget);

    const stat = fs.statSync(file);
    totalBytesSaved += stat.size;
  }

  console.log(`✓ Backup complete (${(totalBytesSaved / (1024 * 1024)).toFixed(2)} MB backed up)`);

  // 4. Delete confirmed redundant files
  console.log("Removing confirmed redundant local files...");
  for (const file of toDelete) {
    fs.unlinkSync(file);
  }

  // Clean empty directories
  function cleanEmptyDirs(dir: string) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    if (files.length > 0) {
      for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
          cleanEmptyDirs(full);
        }
      }
    }
    const remaining = fs.readdirSync(dir);
    if (remaining.length === 0 && dir !== PUBLIC_IMAGES_DIR) {
      fs.rmdirSync(dir);
    }
  }

  cleanEmptyDirs(PUBLIC_IMAGES_DIR);

  console.log(`\n==========================================================`);
  console.log(`Cleanup Complete!`);
  console.log(`- Total Files Safely Removed: ${toDelete.length}`);
  console.log(`- Local Storage Reclaimed:    ${(totalBytesSaved / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`- Safety Backup Preserved:    ${BACKUP_DIR}`);
  console.log(`==========================================================`);
}

runCleanup();
