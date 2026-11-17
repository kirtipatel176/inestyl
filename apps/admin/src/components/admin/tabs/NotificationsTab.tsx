"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  Sliders,
  Check,
  Trash2,
  Save,
} from "lucide-react";
import { NotificationItem, NotificationSettings } from "@/types";
import { useToast } from "@/components/admin/ToastContext";

interface NotificationsTabProps {
  initialNotifications: NotificationItem[];
  initialSettings: NotificationSettings;
}

export function NotificationsTab({
  initialNotifications,
  initialSettings,
}: NotificationsTabProps) {
  const { success, error } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings);
  const [filter, setFilter] = useState<"all" | "unread" | "stock" | "enquiry">("all");
  const [isSaving, setIsSaving] = useState(false);

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "stock") return n.type === "low_stock" || n.type === "out_of_stock";
    if (filter === "enquiry") return n.type === "enquiry";
    return true;
  });

  const handleMarkRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_read", id }),
    });
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "mark_all_read" }),
    });
    success("All Marked as Read");
  };

  const handleClear = async () => {
    setNotifications([]);
    await fetch("/api/notifications", { method: "DELETE" });
    success("Notifications Cleared");
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_settings", settings }),
      });
      const data = await res.json();
      if (data.success) {
        success("Alert Preferences Saved", "Low stock thresholds and notification triggers updated.");
      } else {
        error("Failed to save settings", data.error);
      }
    } catch (err: any) {
      error("Error saving alert settings", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h2 className="font-heading text-xl font-bold text-[#1D1D1F]">
            Store Operations Notifications &amp; Alerts
          </h2>
          <p className="text-xs text-[#86868B] mt-0.5">
            Configurable real-time notifications for customer enquiries, low inventory, out of stock, and scheduled banners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-full border border-[#E5E7EB] bg-white text-xs font-semibold hover:bg-[#F5F5F7] text-[#1D1D1F]"
          >
            Mark All Read
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-full border border-[#E5E7EB] bg-white text-xs font-semibold hover:bg-red-50 text-red-600"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Notifications Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: "all", label: `All Alerts (${notifications.length})` },
              { id: "unread", label: `Unread (${notifications.filter((n) => !n.read).length})` },
              { id: "stock", label: "Stock Alerts" },
              { id: "enquiry", label: "Customer Enquiries" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setFilter(p.id as any)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                  filter === p.id
                    ? "bg-[#1D1D1F] text-white"
                    : "bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-12 text-center text-[#86868B] space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
              <p className="text-sm font-semibold text-[#1D1D1F]">All Caught Up!</p>
              <p className="text-xs">No active alerts matching your selected filter.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all text-xs flex items-start justify-between gap-4 ${
                    item.read
                      ? "bg-white border-[#E5E7EB] opacity-75"
                      : "bg-white border-blue-200 shadow-2xs ring-1 ring-blue-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        item.severity === "alert"
                          ? "bg-red-50 text-red-600"
                          : item.severity === "warning"
                          ? "bg-amber-50 text-amber-600"
                          : item.severity === "success"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-blue-50 text-[#0071E3]"
                      }`}
                    >
                      {item.severity === "alert" && <AlertCircle className="w-4 h-4" />}
                      {item.severity === "warning" && <AlertTriangle className="w-4 h-4" />}
                      {item.severity === "success" && <CheckCircle2 className="w-4 h-4" />}
                      {item.severity === "info" && <Info className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1D1D1F]">{item.title}</span>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                        )}
                      </div>
                      <p className="text-[#6E6E73] leading-relaxed">{item.message}</p>
                      <span className="text-[10px] text-[#86868B] font-mono flex items-center gap-1 pt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {!item.read && (
                    <button
                      type="button"
                      onClick={() => handleMarkRead(item.id)}
                      className="text-[11px] font-semibold text-[#0071E3] hover:underline shrink-0"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Configurable Alert Preferences (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-5 shadow-2xs sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0071E3]" />
              <h3 className="font-heading text-sm font-bold text-[#1D1D1F]">
                Alert Thresholds &amp; Preferences
              </h3>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Low stock threshold */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
              <div className="flex items-center justify-between font-bold text-[#1D1D1F]">
                <span>Low Stock Threshold:</span>
                <span className="text-sm font-mono text-[#0071E3]">
                  {settings.lowStockThreshold} units
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={settings.lowStockThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, lowStockThreshold: Number(e.target.value) })
                }
                className="w-full accent-[#0071E3]"
              />
              <span className="text-[10px] text-[#86868B] block">
                Trigger warning when size variant stock drops to or below this count.
              </span>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              {[
                {
                  key: "alertLowStock",
                  label: "Low Variant Stock Alerts",
                  desc: "Notify when flagship inventory reaches minimum threshold.",
                },
                {
                  key: "alertOutOfStock",
                  label: "Out of Stock Alerts",
                  desc: "Trigger high-priority alert when all sizes sell out.",
                },
                {
                  key: "alertNewEnquiry",
                  label: "New Customer WhatsApp Enquiries",
                  desc: "Notify when customer requests store availability.",
                },
                {
                  key: "alertScheduledBanner",
                  label: "Scheduled Campaign Start / End",
                  desc: "Notify when promotional campaign banners activate.",
                },
                {
                  key: "alertProductPublication",
                  label: "Product Publication Status",
                  desc: "Alert when scheduled products automatically go live.",
                },
                {
                  key: "alertFailedUploads",
                  label: "Failed Media Uploads",
                  desc: "Notify when image optimization or CDN upload encounters errors.",
                },
              ].map((toggle) => (
                <label
                  key={toggle.key}
                  className="flex items-start justify-between gap-3 p-3 rounded-2xl border border-[#E5E7EB] hover:bg-[#F5F5F7] cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-[#1D1D1F]">{toggle.label}</span>
                    <span className="text-[11px] text-[#6E6E73] block">{toggle.desc}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={(settings as any)[toggle.key]}
                    onChange={(e) =>
                      setSettings({ ...settings, [toggle.key]: e.target.checked })
                    }
                    className="w-4 h-4 rounded mt-0.5 accent-[#0071E3]"
                  />
                </label>
              ))}
            </div>

            {/* Save Preferences Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveSettings}
                className="w-full py-2.5 rounded-full bg-[#1D1D1F] text-white font-semibold text-xs hover:bg-black transition-colors flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? "Saving..." : "Save Preferences"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
