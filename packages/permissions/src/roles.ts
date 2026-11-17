export type AppRole =
  | "owner"
  | "administrator"
  | "inventory_manager"
  | "content_manager"
  | "enquiry_manager";

export const APP_ROLES: Record<AppRole, { id: AppRole; name: string; description: string }> = {
  owner: {
    id: "owner",
    name: "Owner",
    description: "Full technological, financial, and organizational authority across INESTYLE OUTLET.",
  },
  administrator: {
    id: "administrator",
    name: "Administrator",
    description: "Complete store management, operational access, and administrative privileges.",
  },
  inventory_manager: {
    id: "inventory_manager",
    name: "Inventory Manager",
    description: "Stock intake, variant adjustments, inventory levels, and low-stock handling.",
  },
  content_manager: {
    id: "content_manager",
    name: "Content Manager",
    description: "Product merchandising, media curation, banners, navigation, and size guides.",
  },
  enquiry_manager: {
    id: "enquiry_manager",
    name: "Enquiry Manager",
    description: "Customer enquiries, WhatsApp concierge, and store visit coordination.",
  },
};
