import { AppRole } from "./roles";
import { PermissionCode, ROLE_PERMISSIONS } from "./matrix";

/**
 * Checks whether any of the user's active roles grant the requested permission.
 */
export function hasPermission(
  roles: (AppRole | string)[],
  permission: PermissionCode
): boolean {
  if (!roles || roles.length === 0) return false;

  for (const role of roles) {
    const perms = ROLE_PERMISSIONS[role as AppRole];
    if (perms && perms.includes(permission)) {
      return true;
    }
  }

  return false;
}

/**
 * Determines whether a user can access a specific administrative dashboard tab.
 */
export function canAccessTab(
  roles: (AppRole | string)[],
  tab: string
): boolean {
  if (!roles || roles.length === 0) return false;
  if (roles.includes("owner") || roles.includes("administrator")) return true;

  switch (tab) {
    case "products":
    case "footwear":
    case "clothing":
      return hasPermission(roles, "products.read");
    case "inventory":
      return hasPermission(roles, "inventory.read");
    case "media":
      return hasPermission(roles, "media.manage");
    case "enquiries":
      return hasPermission(roles, "enquiries.read");
    case "navigation":
    case "size-guide":
    case "homepage":
    case "brands":
    case "collections":
      return hasPermission(roles, "settings.manage");
    case "analytics":
    case "audit":
    case "notifications":
      return hasPermission(roles, "reports.read");
    case "users":
      return hasPermission(roles, "users.manage");
    default:
      return false;
  }
}

/**
 * Returns a list of all distinct permissions held by the given set of roles.
 */
export function getGrantedPermissions(roles: (AppRole | string)[]): PermissionCode[] {
  const set = new Set<PermissionCode>();
  for (const role of roles) {
    const perms = ROLE_PERMISSIONS[role as AppRole];
    if (perms) {
      perms.forEach((p) => set.add(p));
    }
  }
  return Array.from(set);
}
