import { z } from "zod";

export const CustomerEnquirySubmitSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  customerPhone: z.string().regex(/^[0-9+ -]{10,15}$/, "Please enter a valid 10-digit mobile number"),
  customerEmail: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  productId: z.string().optional(),
  productTitle: z.string().optional(),
  brandName: z.string().optional(),
  variantId: z.string().optional(),
  sizeRequested: z.string().optional(),
  colourRequested: z.string().optional(),
  outletPrice: z.number().min(0).optional(),
  channel: z.enum(["whatsapp", "form", "store_visit"]).default("form"),
  message: z.string().max(1000).optional(),
});

export const CustomerEnquirySchema = CustomerEnquirySubmitSchema;

export const EnquiryStatusUpdateSchema = z.object({
  status: z.enum(["New", "Contacted", "In Progress", "In Store Visit", "Resolved", "Closed"]),
  assignedTo: z.string().uuid("Assigned staff must be a valid UUID").optional().nullable(),
  resolutionNotes: z.string().optional(),
  followUpDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Follow-up date must be YYYY-MM-DD").optional().nullable(),
});

export const EnquiryNoteCreateSchema = z.object({
  enquiryId: z.string().min(1, "Enquiry ID is required"),
  note: z.string().min(2, "Note must be at least 2 characters").max(2000),
});
