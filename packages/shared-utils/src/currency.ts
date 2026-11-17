/**
 * Formats a numeric price into standard Indian Rupee notation (INR).
 * Example: 8995 -> "₹8,995", 12995.5 -> "₹12,995.50"
 */
export function formatINR(amount: number, includeDecimals = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return "₹0";
  }

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  });

  return formatter.format(amount);
}

/**
 * Calculates discount percentage given Regular Price (MRP) and Sale Price.
 */
export function calculateDiscount(regularPrice: number, salePrice?: number | null): number {
  if (!regularPrice || regularPrice <= 0 || !salePrice || salePrice >= regularPrice) {
    return 0;
  }
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
}
