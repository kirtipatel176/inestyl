import { AppRole } from "./roles";

export type PermissionCode =
  | "products.read"
  | "products.create"
  | "products.update"
  | "products.delete"
  | "inventory.read"
  | "inventory.update"
  | "media.manage"
  | "enquiries.read"
  | "enquiries.update"
  | "settings.manage"
  | "users.manage"
  | "reports.read";

export const ROLE_PERMISSIONS: Record<AppRole, PermissionCode[]> = {
  owner: [
    "products.read",
    "products.create",
    "products.update",
    "products.delete",
    "inventory.read",
    "inventory.update",
    "media.manage",
    "enquiries.read",
    "enquiries.update",
    "settings.manage",
    "users.manage",
    "reports.read",
  ],
  administrator: [
    "products.read",
    "products.create",
    "products.update",
    "products.delete",
    "inventory.read",
    "inventory.update",
    "media.manage",
    "enquiries.read",
    "enquiries.update",
    "settings.manage",
    "users.manage",
    "reports.read",
  ],
  inventory_manager: [
    "products.read",
    "inventory.read",
    "inventory.update",
    "reports.read",
  ],
  content_manager: [
    "products.read",
    "products.create",
    "products.update",
    "media.manage",
    "settings.manage",
    "reports.read",
  ],
  enquiry_manager: [
    "products.read",
    "inventory.read",
    "enquiries.read",
    "enquiries.update",
    "reports.read",
  ],
};
