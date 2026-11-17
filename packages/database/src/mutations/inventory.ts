import { SupabaseClient } from "@supabase/supabase-js";
import { StockMovementSchema } from "@inestyle/validations";

export async function adjustVariantStockMutation(
  client: SupabaseClient,
  params: {
    variantId: string;
    quantityDelta: number;
    movementType: "stock_addition" | "stock_correction" | "stock_reduction" | "damaged_stock" | "manual_adjustment";
    reason: string;
    referenceId?: string;
  }
) {
  const validated = StockMovementSchema.parse(params);

  const { data, error } = await client.rpc("adjust_variant_stock", {
    p_variant_id: validated.variantId,
    p_quantity_delta: validated.quantityDelta,
    p_movement_type: validated.movementType,
    p_reason: validated.reason,
    p_reference_id: validated.referenceId || null,
  });

  if (error) {
    throw new Error(`Inventory adjustment failed: ${error.message}`);
  }

  return data;
}
