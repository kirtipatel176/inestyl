import { NextResponse } from "next/server";
import { getDatabase, saveDatabase, createAuditLog } from "@/lib/server-db";
import { StoreEnquiry } from "@/types";

export async function GET() {
  try {
    const db = getDatabase();
    return NextResponse.json({ success: true, count: db.enquiries.length, enquiries: db.enquiries });
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
      productTitle = "General Store Enquiry",
      productSku = "GENERAL",
      productPrice,
      requestedSize,
      message,
      channel = "storefront_form",
      idempotencyKey,
    } = body;

    // Strict input validation
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

    const cleanName = customerName.trim().slice(0, 100);
    const cleanPhone = customerPhone.trim().slice(0, 25);
    const cleanMsg = (message || "").toString().trim().slice(0, 1000);

    const db = getDatabase();

    // Idempotency check: check if identical submission occurred in last 30 seconds
    const thirtySecAgo = new Date(Date.now() - 30 * 1000).toISOString();
    const isDuplicate = db.enquiries.find(
      (e) =>
        e.customerPhone === cleanPhone &&
        e.productTitle === productTitle &&
        e.createdAt > thirtySecAgo
    );

    if (isDuplicate) {
      return NextResponse.json({
        success: true,
        enquiry: isDuplicate,
        duplicateSuppressed: true,
        message: "Enquiry already received and assigned to Kapadwanj store team.",
      });
    }

    const enquiryId = `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newEnquiry: StoreEnquiry = {
      id: enquiryId,
      customerName: cleanName,
      customerPhone: cleanPhone,
      productTitle: productTitle.slice(0, 150),
      outletPrice: typeof productPrice === "number" ? productPrice : 0,
      sizeRequested: requestedSize ? String(requestedSize).slice(0, 20) : undefined,
      channel: (channel === "whatsapp" ? "whatsapp" : "form") as any,
      status: "New",
      message: cleanMsg || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.enquiries.unshift(newEnquiry);

    // Create audit log
    createAuditLog({
      action: "ENQUIRY_RECEIVED",
      entity: "Enquiry",
      entityId: enquiryId,
      entityName: newEnquiry.productTitle || "Store Enquiry",
      author: `Customer (${cleanName})`,
      details: `New enquiry received via ${channel} for ${newEnquiry.productTitle}. Contact: ${cleanPhone}`,
    });

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      enquiry: newEnquiry,
      message: "Enquiry successfully forwarded to Kapadwanj flagship team.",
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while saving your enquiry." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, resolutionNotes, author } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Must specify enquiry id and new status" },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const idx = db.enquiries.findIndex((e) => e.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
    }

    const prev = db.enquiries[idx];
    const updated: StoreEnquiry = {
      ...prev,
      status,
      resolutionNotes: resolutionNotes !== undefined ? resolutionNotes : prev.resolutionNotes,
      resolvedAt: status === "Resolved" ? new Date().toISOString() : prev.resolvedAt,
      updatedAt: new Date().toISOString(),
    };

    db.enquiries[idx] = updated;

    createAuditLog({
      action: "ENQUIRY_STATUS_UPDATE",
      entity: "Enquiry",
      entityId: id,
      entityName: prev.productTitle,
      author: author || "Admin (Kapadwanj)",
      previousValue: prev.status,
      updatedValue: status,
      details: `Updated enquiry status for ${prev.customerName} on "${prev.productTitle}" to "${status}".`,
    });

    saveDatabase(db);
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry status" },
      { status: 500 }
    );
  }
}
