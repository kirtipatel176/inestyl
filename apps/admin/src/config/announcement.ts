// Announcement Bar Configuration
// Easily configurable for store managers / admin

export interface AnnouncementConfig {
  enabled: boolean;
  message: string;
  linkText?: string;
  linkHref?: string;
}

export const ANNOUNCEMENT_CONFIG: AnnouncementConfig = {
  enabled: true,
  message: "Discover Our Latest Collection — Authentic Footwear & Apparel at Outlet Prices.",
  linkText: "Explore Now",
  linkHref: "/footwear",
};

