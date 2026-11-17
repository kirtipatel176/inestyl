import { NextResponse } from "next/server";
import { createStorefrontClient, EnquiryRepository } from "@inestyle/database";

/**
 * Public visitors cannot read enquiries. Blocked for privacy and compliance.
 */
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Access Denied: Enquiries are strictly restricted to administrative staff." },
    { status: 403 }
  );
}

/**
 * Public visitors can submit genuine store / WhatsApp enquiries.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = createStorefrontClient();
    const enquiryRepo = new EnquiryRepository(client);

    const result = await enquiryRepo.submitEnquiry({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail || undefined,
      productId: body.productId || undefined,
      variantId: body.variantId || undefined,
      productTitle: body.productTitle || "General Flagship Store Enquiry",
      brandName: body.brandName || undefined,
      outletPrice: body.outletPrice || body.productPrice || undefined,
      sizeRequested: body.sizeRequested || body.requestedSize || undefined,
      colourRequested: body.colourRequested || undefined,
      message: body.message || undefined,
      channel: body.channel === "whatsapp" ? "whatsapp" : "form",
    });

    return NextResponse.json({
      success: true,
      enquiryId: result.enquiryId,
      message: "Your enquiry has been received by our Kapadwanj flagship store team.",
    });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit enquiry" },
      { status: 422 }
    );
  }
}
