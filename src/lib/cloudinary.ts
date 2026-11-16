import cloudinaryModule from "cloudinary";
import type { UploadApiResponse, UploadApiOptions } from "cloudinary";

const cloudinary = cloudinaryModule.v2;

/**
 * Server-side Cloudinary SDK Integration for iNESTYL OUTLET
 * Handles authenticated uploads, asset deletions, management, and secure signature generation.
 * 
 * IMPORTANT: This module must only be used in server-side execution contexts (API routes, server actions).
 * Cloudinary API secrets must NEVER be sent to the browser.
 */

if (typeof window !== "undefined") {
  throw new Error("Security Violation: src/lib/cloudinary.ts cannot be imported on the client side.");
}

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export interface CloudinaryUploadOptions {
  folder: string;
  publicId?: string;
  overwrite?: boolean;
  tags?: string[];
  context?: Record<string, string>;
  transformation?: Array<Record<string, any>>;
  resourceType?: "image" | "raw" | "video" | "auto";
}

export interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resourceType: string;
  createdAt: string;
  version: number;
  originalFilename?: string;
  etag?: string;
}

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "pad" | "scale" | "thumb";
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  gravity?: "center" | "auto" | "face" | "north" | "south";
  dpr?: "auto" | number;
}

/**
 * Validates and retrieves server-side Cloudinary configuration.
 * Throws a descriptive error if environment variables are missing or default placeholders.
 */
export function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName) {
    throw new Error(
      "Cloudinary Configuration Error: CLOUDINARY_CLOUD_NAME is not defined. Please set it in your .env.local file."
    );
  }

  const isConfigured =
    apiKey &&
    apiSecret &&
    apiKey !== "your-api-key" &&
    apiSecret !== "your-api-secret";

  if (!isConfigured) {
    // Return partial config with warning when running dry/read operations
    return {
      cloudName,
      apiKey: apiKey || "",
      apiSecret: apiSecret || "",
    };
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
  };
}

/**
 * Checks whether live Cloudinary credentials are fully configured.
 */
export function isCloudinaryConfigured(): boolean {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  return Boolean(
    cloudName &&
    apiKey &&
    apiSecret &&
    apiKey !== "your-api-key" &&
    apiSecret !== "your-api-secret"
  );
}

/**
 * Initializes and returns the configured Cloudinary v2 instance.
 */
function getCloudinaryClient() {
  const config = getCloudinaryConfig();

  if (!config.apiKey || !config.apiSecret || config.apiKey === "your-api-key") {
    throw new Error(
      "Cloudinary Configuration Error: Active API operations require valid CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET."
    );
  }

  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
    secure: true,
  });

  return cloudinary;
}

/**
 * Upload an image from a local file path, remote URL, or base64 data URI to Cloudinary.
 * Includes duplicate asset protection (overwrite: false by default).
 */
export async function uploadImageToCloudinary(
  fileSource: string | Buffer,
  options: CloudinaryUploadOptions
): Promise<CloudinaryUploadResult> {
  const client = getCloudinaryClient();

  const uploadOptions: UploadApiOptions = {
    folder: options.folder,
    public_id: options.publicId,
    overwrite: options.overwrite ?? false,
    unique_filename: options.publicId ? false : true,
    use_filename: true,
    tags: options.tags || ["inestyle-outlet"],
    context: options.context,
    resource_type: options.resourceType || "image",
  };

  if (options.transformation) {
    uploadOptions.transformation = options.transformation;
  }

  let result: UploadApiResponse;

  if (Buffer.isBuffer(fileSource)) {
    // Stream upload for buffer
    result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = client.uploader.upload_stream(
        uploadOptions,
        (error, res) => {
          if (error || !res) {
            return reject(error || new Error("Failed to receive upload response from Cloudinary"));
          }
          resolve(res);
        }
      );
      uploadStream.end(fileSource);
    });
  } else {
    // String upload (file path, data URI, or URL)
    result = await client.uploader.upload(fileSource, uploadOptions);
  }

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
    url: result.url,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    resourceType: result.resource_type,
    createdAt: result.created_at,
    version: result.version,
    originalFilename: result.original_filename,
    etag: result.etag,
  };
}

/**
 * Deletes an image from Cloudinary by its public ID.
 * Invalidate CDN cache by default.
 */
export async function deleteImageFromCloudinary(
  publicId: string,
  options: { invalidate?: boolean; resourceType?: "image" | "raw" | "video" } = {}
): Promise<{ result: string }> {
  const client = getCloudinaryClient();

  const response = await client.uploader.destroy(publicId, {
    invalidate: options.invalidate ?? true,
    resource_type: options.resourceType || "image",
  });

  return { result: response.result };
}

/**
 * Retrieves details for a specific asset by public ID.
 */
export async function getCloudinaryAsset(publicId: string) {
  const client = getCloudinaryClient();
  return await client.api.resource(publicId);
}

/**
 * Lists assets inside a specific folder in Cloudinary.
 */
export async function listCloudinaryAssets(
  folderPrefix: string = "inestyle-outlet",
  maxResults: number = 100
) {
  const client = getCloudinaryClient();
  return await client.api.resources({
    type: "upload",
    prefix: folderPrefix,
    max_results: maxResults,
  });
}

/**
 * Generates an optimized Cloudinary delivery URL with transformations.
 */
export function generateCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "inestyle-outlet";

  // If publicId already is a full Cloudinary URL, extract publicId
  let cleanId = publicId;
  const match = publicId.match(/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(.+)$/);
  if (match) {
    cleanId = match[1];
  }

  // Remove file extension if present for clean public ID delivery
  cleanId = cleanId.replace(/\.(jpe?g|png|webp|avif)$/i, "");

  const transformations: string[] = [];

  // Default auto format and quality
  transformations.push(`f_${options.format || "auto"}`);
  transformations.push(`q_${options.quality || "auto"}`);

  if (options.crop) {
    transformations.push(`c_${options.crop}`);
  }
  if (options.width) {
    transformations.push(`w_${options.width}`);
  }
  if (options.height) {
    transformations.push(`h_${options.height}`);
  }
  if (options.gravity) {
    transformations.push(`g_${options.gravity}`);
  }
  if (options.dpr) {
    transformations.push(`dpr_${options.dpr}`);
  }

  const transformString = transformations.join(",");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${cleanId}`;
}
