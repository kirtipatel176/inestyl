/**
 * iNESTYL OUTLET — WhatsApp Enquiry Deep-Link Dispatcher
 * Formulates structured, context-rich message payloads for store staff.
 */

import { STORE_DETAILS } from "@/constants";

export interface WhatsAppEnquiryPayload {
  productTitle: string;
  sku: string;
  brandName?: string;
  selectedSize?: string;
  outletPrice: number;
  productSlug?: string;
  customNote?: string;
}

/**
 * Builds an official WhatsApp Click-to-Chat deep link.
 */
export function buildWhatsAppEnquiryUrl(payload: WhatsAppEnquiryPayload): string {
  const phone = STORE_DETAILS.whatsappNumber;
  const sizeText = payload.selectedSize ? ` (Size: UK ${payload.selectedSize})` : "";
  const brandText = payload.brandName ? ` [${payload.brandName}]` : "";
  const priceFormatted = `₹${payload.outletPrice.toLocaleString("en-IN")}`;
  
  const lines = [
    `*iNESTYL OUTLET — Product Availability Enquiry*`,
    ``,
    `Hello Kapadwanj Store Team, I would like to check availability for:`,
    `• *Product:* ${payload.productTitle}${brandText}${sizeText}`,
    `• *Store SKU:* ${payload.sku}`,
    `• *Outlet Price:* ${priceFormatted}`,
  ];

  if (payload.productSlug) {
    lines.push(`• *Catalogue Link:* ${process.env.NEXT_PUBLIC_APP_URL || "https://inestyl.com"}/product/${payload.productSlug}`);
  }

  if (payload.customNote) {
    lines.push(``, `*Customer Note:* ${payload.customNote}`);
  }

  lines.push(
    ``,
    `Please confirm if this is in stock and available for store reservation or pickup.`
  );

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

