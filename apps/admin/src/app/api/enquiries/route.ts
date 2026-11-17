import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { EnquiryRepository, createServiceClient, logActivityMutation } from "@inestyle/database";

export async function GET(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission([user.role], "enquiries.read") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires enquiries.read permission" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const supabase = createServiceClient();
    const repo = new EnquiryRepository(supabase);
    const enquiries = await repo.getEnquiries(limit, offset);

    return NextResponse.json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries from store database" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      productTitle = "General Store Enquiry",
      productId,
      variantId,
      productPrice,
      requestedSize,
      requestedColour,
      message,
      channel = "storefront_form",
    } = body;

    // Input validation
    if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name." },
        { status: 422 }
      );
    }

    if (!customerPhone || typeof customerPhone !== "string" || customerPhone.trim().length < 6) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid contact phone or WhatsApp number." },
        { status: 422 }
      );
    }

    const supabase = createServiceClient();
    const cleanPhone = customerPhone.trim().slice(0, 25);
    const cleanName = customerName.trim().slice(0, 100);

    // Upsert customer
    const { data: customer, error: custError } = await supabase
      .from("customers")
      .upsert(
        {
          full_name: cleanName,
          phone: cleanPhone,
          email: customerEmail || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "phone" }
      )
      .select("id")
      .single();

    if (custError || !customer) {
      throw new Error(`Customer record failed: ${custError?.message}`);
    }

    // Insert enquiry
    const enquiryId = `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const { data: enquiry, error: enqError } = await supabase
      .from("enquiries")
      .insert({
        id: enquiryId,
        customer_id: customer.id,
        product_id: productId || null,
        variant_id: variantId || null,
        product_title: productTitle.slice(0, 150),
        outlet_price: typeof productPrice === "number" ? productPrice : 0,
        size_requested: requestedSize ? String(requestedSize).slice(0, 20) : null,
        colour_requested: requestedColour ? String(requestedColour).slice(0, 30) : null,
        channel: channel === "whatsapp" ? "whatsapp" : "storefront_form",
        status: "new",
        message: message ? String(message).slice(0, 1000) : null,
      })
      .select()
      .single();

    if (enqError || !enquiry) {
      throw new Error(`Enquiry creation failed: ${enqError?.message}`);
    }

    await logActivityMutation(supabase, {
      action: "enquiry_received",
      entityType: "enquiry",
      entityId: enquiryId,
      entityName: productTitle,
      authorName: `Customer (${cleanName})`,
      details: `New enquiry via ${channel} for ${productTitle} (${cleanPhone})`,
    });

    return NextResponse.json(
      {
        success: true,
        enquiry: {
          id: enquiry.id,
          customerName: cleanName,
          customerPhone: cleanPhone,
          productTitle: enquiry.product_title,
          outletPrice: Number(enquiry.outlet_price || 0),
          status: enquiry.status,
          channel: enquiry.channel,
          createdAt: enquiry.created_at,
        },
        message: "Enquiry successfully recorded.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred while saving your enquiry." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission([user.role], "enquiries.update") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires enquiries.update permission" }, { status: 403 });
    }

    const body = await request.json();
    const { id, status, resolutionNotes, assignedStaffId, noteText } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Must specify enquiry id" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      // Map frontend status to DB enum (new, contacted, converted, lost, spam)
      const statusMap: Record<string, string> = {
        New: "new",
        Contacted: "contacted",
        "In Progress": "contacted",
        Resolved: "converted",
        Converted: "converted",
        Lost: "lost",
        Spam: "spam",
      };
      updatePayload.status = statusMap[status] || status.toLowerCase();
    }

    if (assignedStaffId) updatePayload.assigned_to = assignedStaffId;

    const { data: updated, error } = await supabase
      .from("enquiries")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // If note provided, insert into enquiry_notes
    if (resolutionNotes || noteText) {
      await supabase.from("enquiry_notes").insert({
        id: `note-${Date.now()}`,
        enquiry_id: id,
        author_id: user.id,
        author_name: user.fullName || "Staff Member",
        text: resolutionNotes || noteText,
      });
    }

    await logActivityMutation(supabase, {
      userId: user.id,
      action: "enquiry_update",
      entityType: "enquiry",
      entityId: id,
      authorName: user.fullName || "Staff Member",
      details: `Updated enquiry ${id} status to ${status || updated.status}`,
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update enquiry status" },
      { status: 500 }
    );
  }
}
