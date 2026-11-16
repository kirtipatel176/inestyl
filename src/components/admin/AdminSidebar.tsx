"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Layers,
  Tag,
  FolderTree,
  Compass,
  Ruler,
  BarChart3,
  Bell,
  ShieldCheck,
  MessageSquare,
  Sliders,
  ExternalLink,
  Store,
  X,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "./auth/AdminAuthProvider";

export type AdminTab =
  | "products"
  | "footwear"
  | "clothing"
  | "collections"
  | "brands"
  | "navigation"
  | "size-guide"
  | "analytics"
  | "notifications"
  | "audit"
  | "enquiries"
  | "homepage";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  unreadNotificationsCount?: number;
  newEnquiriesCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

export function AdminSidebar({
  activeTab,
  onTabChange,
  unreadNotificationsCount = 0,
  newEnquiriesCount = 0,
  isOpenMobile = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const { user, logout } = useAdminAuth();
  const navSections: NavSection[] = [
    {
      heading: "Catalogue & Inventory",
      items: [
        { id: "products", label: "All Products", icon: Package },
        { id: "footwear", label: "Footwear Stock", icon: Layers },
        { id: "clothing", label: "Apparel Stock", icon: Tag },
        { id: "collections", label: "Collections", icon: FolderTree },
        { id: "brands", label: "Brand Partners", icon: Store },
      ],
    },
    {
      heading: "Content & Standards",
      items: [
        { id: "navigation", label: "Navigation Manager", icon: Compass, badge: "Live" },
        { id: "size-guide", label: "Size Guides", icon: Ruler },
        { id: "homepage", label: "Homepage Sections", icon: Sliders },
      ],
    },
    {
      heading: "Operations & Governance",
      items: [
        {
          id: "enquiries",
          label: "Customer Enquiries",
          icon: MessageSquare,
          badge: newEnquiriesCount > 0 ? String(newEnquiriesCount) : undefined,
          badgeColor: "bg-red-500 text-white",
        },
        {
          id: "notifications",
          label: "Alerts & Notifications",
          icon: Bell,
          badge: unreadNotificationsCount > 0 ? String(unreadNotificationsCount) : undefined,
          badgeColor: "bg-[#0071E3] text-white",
        },
        { id: "analytics", label: "Store Analytics", icon: BarChart3 },
        { id: "audit", label: "Audit & Backups", icon: ShieldCheck },
      ],
    },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#1D1D1F] text-white select-none">
      {/* Top Header / Logo */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="inline-block">
          <Image
            src="/brand/logo-white.svg"
            alt="INESTYLE OUTLET"
            width={140}
            height={36}
            className="h-7 w-auto object-contain"
          />
        </Link>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden text-neutral-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Flagship Store Badge */}
      <div className="px-6 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-neutral-200">Kapadwanj Flagship</span>
        </div>
        <span className="text-[10px] text-neutral-400 font-mono">387620</span>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navSections.map((sec) => (
          <div key={sec.heading} className="space-y-1.5">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              {sec.heading}
            </span>
            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onTabChange(item.id as AdminTab);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#0071E3] text-white shadow-subtle"
                        : "text-neutral-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          item.badgeColor || "bg-white/20 text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-2.5 shrink-0">
        {user && (
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-xs font-bold text-white block truncate">{user.fullName}</span>
              <span className="text-[10px] text-neutral-400 block uppercase font-mono">{user.role}</span>
            </div>
            <button
              type="button"
              onClick={() => logout()}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#D92D20]/20 hover:text-[#D92D20] text-neutral-300 transition-colors"
              title="Sign Out"
              aria-label="Sign out of admin console"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Live Storefront</span>
        </Link>

        <div className="px-2 pt-0.5 flex items-center justify-between text-[10px] text-neutral-400">
          <span>Admin 2.0 • Secured</span>
          <span>Kapadwanj</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed top-0 bottom-0 left-0 w-64 z-30 shadow-2xl">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
