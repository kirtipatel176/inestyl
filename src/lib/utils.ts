import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard className merger for Tailwind CSS and shadcn/ui components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a numeric price into standard Indian Rupee notation (e.g. ₹12,995)
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Calculates the percentage discount between MRP and Outlet Price
 */
export function calculateDiscount(mrp: number, outletPrice: number): number {
  if (mrp <= 0 || outletPrice >= mrp) return 0;
  return Math.round(((mrp - outletPrice) / mrp) * 100);
}

