/**
 * Converts a text title into an SEO-friendly URL slug.
 * Example: "Nike Air Max 270 (Triple Black)" -> "nike-air-max-270-triple-black"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Generates a clean, standardized SKU string.
 */
export function generateVariantSKU(productSku: string, size: string, colour: string): string {
  const cleanColour = colour.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  const cleanSize = size.replace(/[^A-Za-z0-9.]/g, "");
  return `${productSku}-${cleanSize}-${cleanColour}`;
}
