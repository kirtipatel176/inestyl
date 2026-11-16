import fs from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { uploadImageToCloudinary, deleteImageFromCloudinary, isCloudinaryConfigured } from "./cloudinary";
import { getDatabase } from "./server-db";

export interface MediaAsset {
  publicId: string;
  secureUrl: string;
  deliveryUrl: string;
  format: string;
  width: number;
  height: number;
  sizeBytes: number;
  category: string;
  folder: string;
  altText: string;
  uploadedAt: string;
  isReferenced: boolean;
  referencedBy: string[];
}

const MEDIA_MAP_FILE = path.join(process.cwd(), "src/data/cloudinary-migration-map.json");

/**
 * Loads all media assets from the migration map and database references.
 */
export function getMediaAssets(): MediaAsset[] {
  if (!fs.existsSync(MEDIA_MAP_FILE)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(MEDIA_MAP_FILE, "utf8");
    const data = JSON.parse(raw);
    const assets: MediaAsset[] = (data.assets || []).map((a: any) => ({
      publicId: a.publicId,
      secureUrl: a.secureUrl,
      deliveryUrl: a.deliveryUrl,
      format: a.format || "webp",
      width: a.width || 1200,
      height: a.height || 1200,
      sizeBytes: a.sizeBytes || 0,
      category: a.category || "general",
      folder: a.folder || path.dirname(a.publicId),
      altText: a.altText || a.description || path.basename(a.publicId),
      uploadedAt: a.uploadedAt || new Date().toISOString(),
      isReferenced: false,
      referencedBy: [],
    }));

    // Cross-check references in database
    const db = getDatabase();
    for (const asset of assets) {
      const refs: string[] = [];
      const id = asset.publicId;
      const base = path.basename(id);

      // Check products
      for (const p of db.products) {
        if (
          (p.image && (p.image.includes(id) || p.image.includes(base))) ||
          (p.gallery && p.gallery.some((g) => g.includes(id) || g.includes(base)))
        ) {
          refs.push(`Product: ${p.title}`);
        }
      }

      // Check collections
      for (const c of db.collections) {
        if (c.image && (c.image.includes(id) || c.image.includes(base))) {
          refs.push(`Collection: ${c.title}`);
        }
      }

      // Check brands
      for (const b of db.brands) {
        if (b.logo && (b.logo.includes(id) || b.logo.includes(base))) {
          refs.push(`Brand: ${b.name}`);
        }
      }

      asset.isReferenced = refs.length > 0;
      asset.referencedBy = refs;
    }

    return assets;
  } catch (e) {
    console.error("Failed to read media assets:", e);
    return [];
  }
}

/**
 * Saves the media registry back to disk.
 */
export function saveMediaAssets(assets: MediaAsset[]): void {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    "inestyle-outlet";

  const payload = {
    cloudName,
    migratedAt: new Date().toISOString(),
    totalAssets: assets.length,
    assets,
  };

  fs.writeFileSync(MEDIA_MAP_FILE, JSON.stringify(payload, null, 2));
}

/**
 * Validates and processes an uploaded file buffer.
 */
export async function processAndUploadMedia({
  buffer,
  filename,
  mimeType,
  folder = "inestyle-outlet/products",
  altText = "",
}: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  folder?: string;
  altText?: string;
}): Promise<MediaAsset> {
  const ALLOWED_MIMES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/svg+xml",
  ];

  if (!ALLOWED_MIMES.includes(mimeType.toLowerCase())) {
    throw new Error(
      `Invalid file format: ${mimeType}. Allowed formats are JPEG, PNG, WebP, AVIF, and SVG.`
    );
  }

  // Max 10MB
  const MAX_SIZE = 10 * 1024 * 1024;
  if (buffer.length > MAX_SIZE) {
    throw new Error("File size exceeds maximum allowed limit of 10MB.");
  }

  const isSvg = mimeType === "image/svg+xml";
  let width = 800;
  let height = 800;

  if (!isSvg) {
    try {
      const meta = await sharp(buffer).metadata();
      width = meta.width || 800;
      height = meta.height || 800;
    } catch (e) {
      throw new Error("Corrupted or unreadable image file.");
    }
  }

  const cleanBaseName = path
    .parse(filename)
    .name.toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const timestamp = Date.now();
  const publicId = `${folder}/${cleanBaseName}-${timestamp}`;
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    "inestyle-outlet";

  let secureUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
  let deliveryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;

  // If live Cloudinary credentials are configured, execute upload
  if (isCloudinaryConfigured()) {
    try {
      const res = await uploadImageToCloudinary(buffer, {
        folder,
        publicId: `${cleanBaseName}-${timestamp}`,
        overwrite: false,
        resourceType: isSvg ? "image" : "image",
        tags: ["admin-upload", "inestyle-outlet"],
      });
      secureUrl = res.secureUrl;
      deliveryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${res.publicId}`;
    } catch (err: any) {
      console.warn("Live Cloudinary upload failed, falling back to registered delivery URL:", err.message);
    }
  }

  const newAsset: MediaAsset = {
    publicId,
    secureUrl,
    deliveryUrl,
    format: isSvg ? "svg" : "webp",
    width,
    height,
    sizeBytes: buffer.length,
    category: folder.replace("inestyle-outlet/", "").split("/")[0] || "products",
    folder,
    altText: altText || cleanBaseName.replace(/-/g, " "),
    uploadedAt: new Date().toISOString(),
    isReferenced: false,
    referencedBy: [],
  };

  const assets = getMediaAssets();
  assets.unshift(newAsset);
  saveMediaAssets(assets);

  return newAsset;
}

/**
 * Deletes a media asset safely.
 * Throws an error if the asset is currently referenced by any catalog content.
 */
export async function safeDeleteMediaAsset(publicId: string): Promise<void> {
  const assets = getMediaAssets();
  const target = assets.find((a) => a.publicId === publicId);

  if (!target) {
    throw new Error(`Media asset not found: ${publicId}`);
  }

  if (target.isReferenced && target.referencedBy.length > 0) {
    throw new Error(
      `Cannot delete asset: It is actively referenced by: ${target.referencedBy.join(", ")}.`
    );
  }

  // Delete from Cloudinary if live
  if (isCloudinaryConfigured()) {
    try {
      await deleteImageFromCloudinary(publicId);
    } catch (e: any) {
      console.warn("Cloudinary remote deletion warning:", e.message);
    }
  }

  const remaining = assets.filter((a) => a.publicId !== publicId);
  saveMediaAssets(remaining);
}

/**
 * Updates metadata (alt text, description) for a media asset.
 */
export function updateMediaMetadata(
  publicId: string,
  updates: { altText?: string; folder?: string }
): MediaAsset {
  const assets = getMediaAssets();
  const index = assets.findIndex((a) => a.publicId === publicId);

  if (index === -1) {
    throw new Error(`Media asset not found: ${publicId}`);
  }

  if (updates.altText !== undefined) {
    assets[index].altText = updates.altText;
  }
  if (updates.folder !== undefined) {
    assets[index].folder = updates.folder;
  }

  saveMediaAssets(assets);
  return assets[index];
}
