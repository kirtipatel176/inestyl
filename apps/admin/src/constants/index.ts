// Brand & Operational Constants for iNESTYL OUTLET

export const BRAND_NAME = "iNESTYL OUTLET";
export const BRAND_TAGLINE = "Original Brands. Outlet Prices. Premium Experience.";
export const BRAND_DESCRIPTION =
  "A curated destination for footwear and fashion from leading global brands, where everyday essentials meet individual expression at verified outlet pricing.";

export const STORE_DETAILS = {
  name: "iNESTYL OUTLET Flagship Store",
  addressLine1: "Station Road",
  city: "Kapadwanj",
  district: "Kheda",
  state: "Gujarat",
  pincode: "387620",
  country: "India",
  fullAddress: "Station Road, Kapadwanj, Gujarat 387620, India",
  locationDisplay: "Kapadwanj, Gujarat",
  hours: "Mon - Sun: 10:00 AM - 9:00 PM",
  phoneDisplay: "+91 98765 43210",
  whatsappNumber: "919876543210",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Station+Road,+Kapadwanj,+Gujarat+387620",
  instagramUrl: "https://instagram.com/inestyloutlet",
  instagramHandle: "@inestyloutlet",
  supportEmail: "concierge@inestyl.com",
};

export const BRAND_COLORS = {
  primary: "#0071E3",
  primaryStrong: "#0066CC",
  secondary: "#2997FF",
  ink: "#1D1D1F",
  secondaryText: "#6E6E73",
  neutralBg: "#F5F5F7",
  surfaceWhite: "#FFFFFF",
  borderMuted: "#E5E7EB",
  stockGreen: "#2E7D32",
  whatsappGreen: "#25D366",
} as const;

export const FEATURED_BRANDS = [
  { name: "Nike", slug: "nike" },
  { name: "Puma", slug: "puma" },
  { name: "adidas", slug: "adidas" },
  { name: "HOKA", slug: "hoka" },
  { name: "Levi's", slug: "levis" },
  { name: "DIESEL", slug: "diesel" },
  { name: "U.S. Polo Assn.", slug: "us-polo-assn" },
] as const;

export const TRUST_PILLARS = [
  {
    title: "100% Original",
    description: "Authentic footwear & apparel sourced exclusively through authorized distributor channels.",
    icon: "ShieldCheck",
  },
  {
    title: "Outlet Prices",
    description: "Verified savings below official retail MRP with transparent comparative pricing.",
    icon: "Tag",
  },
  {
    title: "Visit Our Store",
    description: "Experience styles in person at our flagship destination on Station Road, Kapadwanj.",
    icon: "Store",
  },
  {
    title: "WhatsApp Concierge",
    description: "Check live store availability, reserve sizes, and connect directly with our store team.",
    icon: "MessageCircle",
  },
] as const;
