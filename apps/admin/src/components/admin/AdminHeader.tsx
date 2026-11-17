"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  ChevronRight,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  LogOut,
  ChevronDown,
  Shield,
  KeyRound,
} from "lucide-react";
import { NotificationItem } from "@/types";
import { useAdminAuth } from "./auth/AdminAuthProvider";

interface AdminHeaderProps {
  currentTabName: string;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  notifications: NotificationItem[];
  onOpenNotificationsTab: () => void;
}

export function AdminHeader({
  currentTabName,
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  notifications,
  onOpenNotificationsTab,
}: AdminHeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const { user, logout } = useAdminAuth();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await logout();
  };

  // Initials from full name
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "IN";

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          aria-label="Open Admin Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-xs text-[#86868B]">
          <span className="font-semibold text-[#1D1D1F] hidden sm:inline">Admin Console</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#86868B] hidden sm:inline" />
          <span className="text-[#0071E3] font-bold">{currentTabName}</span>
        </nav>
      </div>

      {/* Middle: Admin Search Input */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products, SKUs, brands, or collections..."
            className="w-full h-9 pl-9 pr-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs focus:bg-white focus:outline-none focus:border-[#0071E3] transition-colors"
          />
        </div>
      </div>

      {/* Right: Notifications, Live Link & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0071E3] text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] p-3 space-y-2 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="font-bold text-[#1D1D1F]">Recent Alerts</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifOpen(false);
                    onOpenNotificationsTab();
                  }}
                  className="text-[11px] font-semibold text-[#0071E3] hover:underline"
                >
                  View All ({notifications.length})
                </button>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {notifications.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl hover:bg-[#F5F5F7] transition-colors space-y-1 cursor-pointer"
                    onClick={() => {
                      setIsNotifOpen(false);
                      onOpenNotificationsTab();
                    }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-[#1D1D1F] truncate block">
                        {n.title}
                      </span>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />}
                    </div>
                    <p className="text-[11px] text-[#6E6E73] line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Storefront Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>Storefront</span>
        </Link>

        {/* Profile Chip with Interactive Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-2 border-l border-[#E5E7EB] text-left hover:opacity-85 transition-opacity focus:outline-none"
            aria-expanded={isProfileOpen}
            aria-label="Admin Profile Menu"
          >
            <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="hidden xl:block">
              <span className="text-xs font-bold block text-[#1D1D1F] leading-tight">
                {user?.fullName || "Store Administrator"}
              </span>
              <span className="text-[10px] text-[#86868B] block capitalize">
                {user?.role ? user.role.replace("_", " ") : "Kapadwanj Flagship"}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#86868B] hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] p-3.5 space-y-3 z-50 text-xs">
              <div className="pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#1D1D1F] text-sm">
                    {user?.fullName || "Store Administrator"}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold text-[10px] uppercase">
                    {user?.role || "Admin"}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#86868B]">{user?.email || "admin@inestyl.com"}</p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#16A34A] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  <span>Authenticated Session Active</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="px-2 py-1.5 rounded-lg bg-[#F5F5F7] flex items-center justify-between text-[#86868B]">
                  <span>Store Node</span>
                  <span className="font-semibold text-[#1D1D1F]">Kapadwanj Flagship</span>
                </div>
                <div className="px-2 py-1.5 rounded-lg bg-[#F5F5F7] flex items-center justify-between text-[#86868B]">
                  <span>2FA Security</span>
                  <span className="font-semibold text-[#1D1D1F]">
                    {user?.twoFactorEnabled ? "Enforced" : "Optional"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB] flex flex-col gap-1.5">
                <Link
                  href="/admin/login"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-[#F5F5F7] text-[#1D1D1F] font-semibold transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#86868B]" />
                  <span>Switch Administrator</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#FFF2F2] hover:bg-[#FEE4E2] text-[#D92D20] font-semibold text-xs transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
