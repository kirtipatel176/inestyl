import { SupabaseClient } from "@supabase/supabase-js";
import { StoreEnquiry } from "@inestyle/shared-types";
import {
  submitEnquiryMutation,
  updateEnquiryStatusMutation,
  addEnquiryNoteMutation,
} from "../mutations/enquiries";

export class EnquiryRepository {
  constructor(private client: SupabaseClient) {}

  async submitEnquiry(input: any) {
    return submitEnquiryMutation(this.client, input);
  }

  async updateStatus(enquiryId: string, input: any) {
    return updateEnquiryStatusMutation(this.client, enquiryId, input);
  }

  async addNote(author: { id: string; name: string }, input: any) {
    return addEnquiryNoteMutation(this.client, author, input);
  }

  async getEnquiries(limit = 50, offset = 0): Promise<StoreEnquiry[]> {
    const { data, error } = await this.client
      .from("enquiries")
      .select("*, customers(*), enquiry_notes(*)")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error || !data) {
      console.error("Failed to fetch enquiries:", error);
      return [];
    }

    return data.map((e: any) => ({
      id: e.id,
      customerName: e.customers?.full_name || "Store Guest",
      customerPhone: e.customers?.phone || "",
      customerEmail: e.customers?.email || undefined,
      productId: e.product_id,
      variantId: e.variant_id,
      productTitle: e.product_title || "",
      brandName: e.brand_name || "",
      outletPrice: Number(e.outlet_price || 0),
      sizeRequested: e.size_requested || undefined,
      colourRequested: e.colour_requested || undefined,
      message: e.message || undefined,
      channel: e.channel,
      status: e.status,
      assignedStaffId: e.assigned_to,
      createdAt: e.created_at,
      notes: (e.enquiry_notes || []).map((n: any) => ({
        id: n.id,
        authorId: n.author_id,
        authorName: n.author_name,
        text: n.text,
        createdAt: n.created_at,
      })),
    }));
  }
}
