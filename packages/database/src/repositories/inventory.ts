import { SupabaseClient } from "@supabase/supabase-js";
import { adjustVariantStockMutation } from "../mutations/inventory";

export class InventoryRepository {
  constructor(private client: SupabaseClient) {}

  /**
   * Adjusts stock balance atomically through the security definer function adjust_variant_stock.
   */
  async adjustStock(params: {
    variantId: string;
    quantityDelta: number;
    movementType: "stock_addition" | "stock_correction" | "stock_reduction" | "damaged_stock" | "manual_adjustment";
    reason: string;
    referenceId?: string;
  }) {
    return adjustVariantStockMutation(this.client, params);
  }

  /**
   * Fetches variant inventory levels.
   */
  async getInventory(variantId: string) {
    const { data, error } = await this.client
      .from("inventory")
      .select("*")
      .eq("variant_id", variantId)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch inventory:", error);
      return null;
    }

    return data;
  }

  /**
   * Lists recent stock movements for an inventory item.
   */
  async getStockMovements(inventoryId: string, limit = 20) {
    const { data, error } = await this.client
      .from("stock_movements")
      .select("*, profiles(full_name)")
      .eq("inventory_id", inventoryId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Failed to fetch stock movements:", error);
      return [];
    }

    return data;
  }
}
