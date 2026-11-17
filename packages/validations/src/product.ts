import { z } from "zod";

export const FootwearAttributesSchema = z.object({
  shoeType: z.enum([
    "Sneakers",
    "Running",
    "Walking",
    "Casual",
    "Sports",
    "Training",
    "Lifestyle",
  ]).optional(),
  upperMaterial: z.string().min(1, "Upper material required").optional(),
  soleDetails: z.string().optional(),
  soleMaterial: z.string().optional(),
  closureType: z.string().optional(),
  fitInfo: z.string().optional(),
});

export const ClothingAttributesSchema = z.object({
  clothingCategory: z.enum([
    "T-Shirts",
    "Polo T-Shirts",
    "Shirts",
    "Jeans",
    "Trousers",
    "Shorts",
    "Hoodies",
    "Sweatshirts",
    "Jackets",
    "Sportswear",
    "Track Pants",
  ]).optional(),
  fit: z.enum([
    "Slim Fit",
    "Regular Fit",
    "Relaxed Fit",
    "Oversized Fit",
    "Athletic Fit",
  ]).optional(),
  sleeve: z.enum(["Sleeveless", "Half Sleeve", "Full Sleeve"]).optional(),
  fabric: z.string().min(1, "Fabric specification required").optional(),
  pattern: z.string().optional(),
  careInstructions: z.array(z.string()).default([]),
});

export const ProductColourSchema = z.object({
  name: z.string().min(1, "Colour name is required"),
  hex: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid HEX colour code"),
});

export const ProductVariantInputSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(3, "SKU must be at least 3 characters").optional(),
  size: z.string().min(1, "Size is required"),
  colour: z.string().min(1, "Colour is required"),
  colourHex: z.string().optional(),
  stockQuantity: z.number().int().min(0, "Stock quantity cannot be negative").default(0),
  isAvailable: z.boolean().default(true),
  priceOverride: z.number().min(0).optional().nullable(),
  barcode: z.string().optional(),
});

export const ProductBaseSchema = z.object({
  title: z.string().min(2, "Product title must be at least 2 characters").max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").optional(),
  sku: z.string().min(3, "Product SKU must be at least 3 characters").max(50),
  brand: z.string().min(1, "Brand name is required"),
  brandSlug: z.string().min(1, "Brand slug is required"),
  department: z.enum(["footwear", "clothing"]),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional(),
  gender: z.enum(["Men", "Women", "Unisex"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  regularPrice: z.number().min(0, "Regular price (MRP) cannot be negative"),
  salePrice: z.number().min(0, "Sale price cannot be negative"),
  discount: z.number().int().min(0).max(100).default(0),
  status: z.enum(["draft", "published", "scheduled", "archived"]).default("draft"),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  image: z.string().url("Main product image must be a valid URL"),
  gallery: z.array(z.string().url()).default([]),
  features: z.array(z.string()).default([]),
  colours: z.array(ProductColourSchema).default([]),
  variants: z.array(ProductVariantInputSchema).min(1, "At least one product variant is required"),
  collections: z.array(z.string()).default([]),
  footwearAttributes: FootwearAttributesSchema.optional(),
  clothingAttributes: ClothingAttributesSchema.optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(300).optional(),
  hasVideo: z.boolean().default(false),
  videoUrl: z.string().optional().nullable(),
});

export const ProductCreateSchema = ProductBaseSchema.refine((data) => {
  return data.salePrice <= data.regularPrice;
}, {
  message: "Sale price (Outlet Price) cannot exceed Regular Price (MRP)",
  path: ["salePrice"],
}).refine((data) => {
  const footwearSizes = ["3.5", "4.0", "4.5", "5.0", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5"];
  const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40"];
  
  if (data.department === "footwear") {
    return data.variants.every(v => footwearSizes.includes(v.size) || !isNaN(Number(v.size)));
  } else if (data.department === "clothing") {
    return data.variants.every(v => clothingSizes.includes(v.size) || isNaN(Number(v.size)) || Number(v.size) >= 26);
  }
  return true;
}, {
  message: "Variant sizes do not match the selected department (Footwear sizing vs Clothing sizing)",
  path: ["variants"],
});

export const ProductUpdateSchema = ProductBaseSchema.partial();
