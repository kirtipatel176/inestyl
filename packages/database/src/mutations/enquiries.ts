import { SupabaseClient } from "@supabase/supabase-js";
import {
  CustomerEnquirySubmitSchema,
  EnquiryStatusUpdateSchema,
  EnquiryNoteCreateSchema,
} from "@inestyle/validations";

export async function submitEnquiryMutation(
  client: SupabaseClient,
  rawInput: any
): Promise<{ success: boolean; enquiryId: string }> {
  const validated = CustomerEnquirySubmitSchema.parse(rawInput);

  // 1. Find or create customer by phone
  const { data: existingCustomer } = await client
    .from("customers")
    .select("id")
    .eq("phone", validated.customerPhone)
    .maybeSingle();

  let customerId: string;

  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else {
    const { data: newCustomer, error: custError } = await client
      .from("customers")
      .insert({
        full_name: validated.customerName,
        phone: validated.customerPhone,
        email: validated.customerEmail || null,
      })
      .select("id")
      .single();

    if (custError || !newCustomer) {
      throw new Error(custError?.message || "Failed to create customer record");
    }
    customerId = newCustomer.id;
  }

  // 2. Insert enquiry
  const enquiryId = `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const { error: enqError } = await client.from("enquiries").insert({
    id: enquiryId,
    customer_id: customerId,
    product_id: validated.productId || null,
    variant_id: validated.variantId || null,
    product_title: validated.productTitle || null,
    brand_name: validated.brandName || null,
    outlet_price: validated.outletPrice || null,
    size_requested: validated.sizeRequested || null,
    colour_requested: validated.colourRequested || null,
    message: validated.message || null,
    channel: validated.channel || "whatsapp",
    status: "New",
  });

  if (enqError) {
    throw new Error(`Failed to submit enquiry: ${enqError.message}`);
  }

  return { success: true, enquiryId };
}

export async function updateEnquiryStatusMutation(
  client: SupabaseClient,
  enquiryId: string,
  rawInput: any
) {
  const validated = EnquiryStatusUpdateSchema.parse(rawInput);

  const { data, error } = await client
    .from("enquiries")
    .update({
      status: validated.status,
      assigned_to: validated.assignedTo || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", enquiryId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update enquiry status: ${error.message}`);
  }

  return data;
}

export async function addEnquiryNoteMutation(
  client: SupabaseClient,
  author: { id: string; name: string },
  rawInput: any
) {
  const validated = EnquiryNoteCreateSchema.parse(rawInput);

  const { data, error } = await client
    .from("enquiry_notes")
    .insert({
      enquiry_id: validated.enquiryId,
      author_id: author.id,
      author_name: author.name,
      text: validated.note,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add enquiry note: ${error.message}`);
  }

  return data;
}
