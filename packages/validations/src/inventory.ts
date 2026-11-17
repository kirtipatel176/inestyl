import { z } from "zod";

export const StockMovementSchema = z.object({
  variantId: z.string().min(1, "Variant ID is required"),
  quantityDelta: z.number().int().refine(val => val !== 0, "Quantity delta cannot be zero"),
  movementType: z.enum([
    "stock_addition",
    "stock_correction",
    "stock_reduction",
    "damaged_stock",
    "manual_adjustment",
  ]),
  reason: z.string().min(3, "Reason must be at least 3 characters"),
  referenceId: z.string().optional(),
});

export const BulkStockAdjustmentSchema = z.object({
  adjustments: z.array(StockMovementSchema).min(1, "At least one stock adjustment required"),
});
