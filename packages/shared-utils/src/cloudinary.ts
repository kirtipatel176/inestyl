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
 * Generates an optimized Cloudinary delivery URL with transformation parameters.
 * Safe for execution in both client-side and server-side contexts.
 */
export function getOptimizedImageUrl(
  publicIdOrUrl: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!publicIdOrUrl) return "/images/placeholder-product.svg";

  // If already a full URL
  if (publicIdOrUrl.startsWith("http://") || publicIdOrUrl.startsWith("https://")) {
    // If not a Cloudinary URL, return as-is
    if (!publicIdOrUrl.includes("res.cloudinary.com")) {
      return publicIdOrUrl;
    }

    // Insert transformations if present
    const transforms: string[] = ["f_auto", "q_auto"];
    if (options.width) transforms.push(`w_${options.width}`);
    if (options.height) transforms.push(`h_${options.height}`);
    if (options.crop) transforms.push(`c_${options.crop}`);
    if (options.dpr) transforms.push(`dpr_${options.dpr}`);

    const transformStr = transforms.join(",");

    // If upload already contains transformations, replace or insert
    const uploadIndex = publicIdOrUrl.indexOf("/upload/");
    if (uploadIndex !== -1) {
      const prefix = publicIdOrUrl.substring(0, uploadIndex + 8);
      const suffix = publicIdOrUrl.substring(uploadIndex + 8);

      // Check if suffix starts with existing params
      if (/^[a-z]_[^/]+\//.test(suffix)) {
        return `${prefix}${transformStr}/${suffix.replace(/^[a-z]_[^/]+\//, "")}`;
      }
      return `${prefix}${transformStr}/${suffix}`;
    }

    return publicIdOrUrl;
  }

  // If provided only publicId
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "egjn8ayb";
  const transforms: string[] = ["f_auto", "q_auto"];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(",")}/${publicIdOrUrl}`;
}
