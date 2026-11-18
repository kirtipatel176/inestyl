"use client";

import { useState, useEffect } from "react";
import {
  Compass,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
  Smartphone,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { NavigationConfig, NavigationLink, MegaMenuSection } from "@/types";
import { useToast } from "@/components/admin/ToastContext";
import { DEFAULT_NAVIGATION_CONFIG } from "@/config/navigation";

function normalizeNavigation(nav?: NavigationConfig | null): NavigationConfig {
  if (!nav) return DEFAULT_NAVIGATION_CONFIG;
  return {
    header: Array.isArray(nav.header) ? nav.header : DEFAULT_NAVIGATION_CONFIG.header,
    footwearMegaMenu: Array.isArray(nav.footwearMegaMenu) ? nav.footwearMegaMenu : DEFAULT_NAVIGATION_CONFIG.footwearMegaMenu,
    clothingMegaMenu: Array.isArray(nav.clothingMegaMenu) ? nav.clothingMegaMenu : DEFAULT_NAVIGATION_CONFIG.clothingMegaMenu,
    menMegaMenu: Array.isArray(nav.menMegaMenu) ? nav.menMegaMenu : DEFAULT_NAVIGATION_CONFIG.menMegaMenu,
    womenMegaMenu: Array.isArray(nav.womenMegaMenu) ? nav.womenMegaMenu : DEFAULT_NAVIGATION_CONFIG.womenMegaMenu,
    collections: Array.isArray(nav.collections) ? nav.collections : DEFAULT_NAVIGATION_CONFIG.collections,
    brands: Array.isArray(nav.brands) ? nav.brands : DEFAULT_NAVIGATION_CONFIG.brands,
    footer: Array.isArray(nav.footer) ? nav.footer : DEFAULT_NAVIGATION_CONFIG.footer,
  };
}

interface NavigationManagerTabProps {
  initialNavigation: NavigationConfig;
}

export function NavigationManagerTab({ initialNavigation }: NavigationManagerTabProps) {
  const { success, error } = useToast();
  const [navigation, setNavigation] = useState<NavigationConfig>(() => normalizeNavigation(initialNavigation));
  const [activeSection, setActiveSection] = useState<
    "header" | "footwear" | "clothing" | "gender" | "collections" | "brands" | "footer"
  >("header");
  const [isSaving, setIsSaving] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(true);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>("Shoes");

  useEffect(() => {
    if (initialNavigation) {
      setNavigation(normalizeNavigation(initialNavigation));
    }
  }, [initialNavigation]);

  // Reordering helpers
  const moveItem = (list: any[], index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return list;
    const copy = [...list];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);
    return copy.map((item, idx) => ({ ...item, order: idx + 1 }));
  };

  const handleHeaderMove = (index: number, direction: "up" | "down") => {
    setNavigation((prev) => ({
      ...prev,
      header: moveItem(prev.header || [], index, direction),
    }));
  };

  const handleHeaderToggleVisibility = (id: string) => {
    setNavigation((prev) => ({
      ...prev,
      header: (prev.header || []).map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      ),
    }));
  };

  const handleHeaderChange = (id: string, field: "label" | "href" | "badge", value: string) => {
    setNavigation((prev) => ({
      ...prev,
      header: (prev.header || []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddHeaderLink = () => {
    const newId = `nav-custom-${Date.now()}`;
    const newLink: NavigationLink = {
      id: newId,
      label: "New Link",
      href: "/custom",
      visible: true,
      order: (navigation.header?.length || 0) + 1,
    };
    setNavigation((prev) => ({
      ...prev,
      header: [...(prev.header || []), newLink],
    }));
  };

  const handleDeleteHeaderLink = (id: string) => {
    setNavigation((prev) => ({
      ...prev,
      header: (prev.header || []).filter((item) => item.id !== id),
    }));
  };

  // Mega Menu Links Reordering
  const handleMegaLinkMove = (
    menu: "footwearMegaMenu" | "clothingMegaMenu",
    secId: string,
    linkIdx: number,
    direction: "up" | "down"
  ) => {
    setNavigation((prev) => ({
      ...prev,
      [menu]: (prev[menu] || []).map((sec) =>
        sec.id === secId
          ? { ...sec, links: moveItem(sec.links || [], linkIdx, direction) }
          : sec
      ),
    }));
  };

  const handleMegaLinkToggle = (
    menu: "footwearMegaMenu" | "clothingMegaMenu",
    secId: string,
    linkId: string
  ) => {
    setNavigation((prev) => ({
      ...prev,
      [menu]: (prev[menu] || []).map((sec) =>
        sec.id === secId
          ? {
              ...sec,
              links: (sec.links || []).map((link) =>
                link.id === linkId ? { ...link, visible: !link.visible } : link
              ),
            }
          : sec
      ),
    }));
  };

  // Footer Links Reordering
  const handleFooterLinkToggle = (columnId: string, linkId: string) => {
    setNavigation((prev) => ({
      ...prev,
      footer: (prev.footer || []).map((col) =>
        col.id === columnId
          ? {
              ...col,
              links: (col.links || []).map((link) =>
                link.id === linkId ? { ...link, visible: !link.visible } : link
              ),
            }
          : col
      ),
    }));
  };

  // Save changes to API & persistent store
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navigation }),
      });
      const data = await res.json();
      if (data.success) {
        success("Navigation Updated", "Storefront header, mega menus, and footer updated successfully.");
      } else {
        error("Save Failed", data.error);
      }
    } catch (err: any) {
      error("Error saving navigation", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h2 className="font-heading text-xl font-bold text-[#1D1D1F]">
            Navigation Manager
          </h2>
          <p className="text-xs text-[#86868B] mt-0.5">
            Control storefront header menus, footwear &amp; clothing mega menus, brand links, and footer links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className={`px-3.5 py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showMobilePreview
                ? "bg-[#1D1D1F] text-white border-[#1D1D1F]"
                : "bg-white text-[#1D1D1F] border-[#E5E7EB] hover:bg-[#F5F5F7]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{showMobilePreview ? "Hide Mobile Preview" : "Show Mobile Preview"}</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="px-6 py-2 rounded-full bg-[#0071E3] text-white font-semibold text-xs hover:bg-[#0066CC] transition-colors flex items-center gap-1.5 shadow-subtle"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Navigation"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Editor on Left, Live Mobile Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Column (8 cols or full) */}
        <div className={showMobilePreview ? "lg:col-span-7 space-y-6" : "lg:col-span-12 space-y-6"}>
          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E7EB]">
            {[
              { id: "header", label: "Header Main Menu" },
              { id: "footwear", label: "Footwear Mega Menu" },
              { id: "clothing", label: "Clothing Mega Menu" },
              { id: "collections", label: "Collection Links" },
              { id: "brands", label: "Brand Links" },
              { id: "footer", label: "Footer Navigation" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeSection === tab.id
                    ? "bg-[#0071E3] text-white"
                    : "bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 1. Header Main Menu Editor */}
          {activeSection === "header" && (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h3 className="font-bold text-sm text-[#1D1D1F]">Header Top Nav Items</h3>
                  <p className="text-[11px] text-[#86868B]">
                    Drag or use arrows to reorder. Toggle visibility to hide links from customers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddHeaderLink}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-[#0071E3] text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Link</span>
                </button>
              </div>

              <div className="divide-y divide-[#E5E7EB]">
                {(navigation.header || []).map((item, idx) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    {/* Reorder Arrows */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleHeaderMove(idx, "up")}
                        className="p-1 rounded text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === (navigation.header || []).length - 1}
                        onClick={() => handleHeaderMove(idx, "down")}
                        className="p-1 rounded text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleHeaderChange(item.id, "label", e.target.value)}
                        placeholder="Label"
                        className="h-8 px-2.5 rounded-lg bg-[#F5F5F7] border border-[#E5E7EB] font-semibold"
                      />
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => handleHeaderChange(item.id, "href", e.target.value)}
                        placeholder="/destination-url"
                        className="h-8 px-2.5 rounded-lg bg-[#F5F5F7] border border-[#E5E7EB] font-mono text-[11px]"
                      />
                      <input
                        type="text"
                        value={item.badge || ""}
                        onChange={(e) => handleHeaderChange(item.id, "badge", e.target.value)}
                        placeholder="Badge (optional)"
                        className="h-8 px-2.5 rounded-lg bg-[#F5F5F7] border border-[#E5E7EB]"
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleHeaderToggleVisibility(item.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          item.visible
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-neutral-100 text-neutral-400 border-neutral-200"
                        }`}
                        title={item.visible ? "Visible on Storefront" : "Hidden from Storefront"}
                      >
                        {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteHeaderLink(item.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Footwear Mega Menu Editor */}
          {activeSection === "footwear" && (
            <div className="space-y-4">
              {(navigation.footwearMegaMenu || []).map((section) => (
                <div key={section.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#0071E3]">
                      {section.title}
                    </span>
                    <span className="text-[11px] text-[#86868B]">{(section.links || []).length} Links</span>
                  </div>

                  <div className="divide-y divide-[#E5E7EB]">
                    {(section.links || []).map((link, idx) => (
                      <div key={link.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMegaLinkMove("footwearMegaMenu", section.id, idx, "up")}
                            className="p-1 text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (section.links || []).length - 1}
                            onClick={() => handleMegaLinkMove("footwearMegaMenu", section.id, idx, "down")}
                            className="p-1 text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex-1">
                          <span className="font-semibold block">{link.label}</span>
                          <span className="text-[11px] text-[#86868B] font-mono">{link.href}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleMegaLinkToggle("footwearMegaMenu", section.id, link.id)}
                          className={`p-1.5 rounded-lg border ${
                            link.visible
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-neutral-100 text-neutral-400 border-neutral-200"
                          }`}
                        >
                          {link.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Clothing Mega Menu Editor */}
          {activeSection === "clothing" && (
            <div className="space-y-4">
              {(navigation.clothingMegaMenu || []).map((section) => (
                <div key={section.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#0071E3]">
                      {section.title}
                    </span>
                    <span className="text-[11px] text-[#86868B]">{(section.links || []).length} Links</span>
                  </div>

                  <div className="divide-y divide-[#E5E7EB]">
                    {(section.links || []).map((link, idx) => (
                      <div key={link.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMegaLinkMove("clothingMegaMenu", section.id, idx, "up")}
                            className="p-1 text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-30"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (section.links || []).length - 1}
                            onClick={() => handleMegaLinkMove("clothingMegaMenu", section.id, idx, "down")}
                            className="p-1 text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-30"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex-1">
                          <span className="font-semibold block">{link.label}</span>
                          <span className="text-[11px] text-[#86868B] font-mono">{link.href}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleMegaLinkToggle("clothingMegaMenu", section.id, link.id)}
                          className={`p-1.5 rounded-lg border ${
                            link.visible
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-neutral-100 text-neutral-400 border-neutral-200"
                          }`}
                        >
                          {link.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Collection Links */}
          {activeSection === "collections" && (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-[#0071E3] block pb-2 border-b border-[#E5E7EB]">
                Featured Collection Navigation Links
              </span>
              <div className="divide-y divide-[#E5E7EB]">
                {(navigation.collections || []).map((col) => (
                  <div key={col.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold block">{col.label}</span>
                      <span className="text-[11px] text-[#86868B] font-mono">{col.href}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setNavigation((prev) => ({
                          ...prev,
                          collections: (prev.collections || []).map((c) =>
                            c.id === col.id ? { ...c, visible: !c.visible } : c
                          ),
                        }))
                      }
                      className={`p-1.5 rounded-lg border ${
                        col.visible
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-neutral-100 text-neutral-400 border-neutral-200"
                      }`}
                    >
                      {col.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Brand Links */}
          {activeSection === "brands" && (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-[#0071E3] block pb-2 border-b border-[#E5E7EB]">
                Authorized Brand Navigation Links
              </span>
              <div className="divide-y divide-[#E5E7EB]">
                {(navigation.brands || []).map((b) => (
                  <div key={b.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold block">{b.label}</span>
                      <span className="text-[11px] text-[#86868B] font-mono">{b.href}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setNavigation((prev) => ({
                          ...prev,
                          brands: (prev.brands || []).map((item) =>
                            item.id === b.id ? { ...item, visible: !item.visible } : item
                          ),
                        }))
                      }
                      className={`p-1.5 rounded-lg border ${
                        b.visible
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-neutral-100 text-neutral-400 border-neutral-200"
                      }`}
                    >
                      {b.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Footer Navigation */}
          {activeSection === "footer" && (
            <div className="space-y-4">
              {(navigation.footer || []).map((column) => (
                <div key={column.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1D1D1F]">
                      Column: {column.title}
                    </span>
                    <span className="text-[11px] text-[#86868B]">{(column.links || []).length} Links</span>
                  </div>

                  <div className="divide-y divide-[#E5E7EB]">
                    {(column.links || []).map((link) => (
                      <div key={link.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold block">{link.label}</span>
                          <span className="text-[11px] text-[#86868B] font-mono">{link.href}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleFooterLinkToggle(column.id, link.id)}
                          className={`p-1.5 rounded-lg border ${
                            link.visible
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-neutral-100 text-neutral-400 border-neutral-200"
                          }`}
                        >
                          {link.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Mobile Menu Preview Column (5 cols) */}
        {showMobilePreview && (
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#1D1D1F] p-4 rounded-[40px] shadow-2xl border border-neutral-800">
              <div className="flex items-center justify-between px-3 pb-3 text-white text-xs">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#2997FF]" />
                  <span className="font-bold">Live Mobile Drawer Preview</span>
                </div>
                <span className="text-[10px] text-neutral-400">Interactive</span>
              </div>

              {/* Mobile Phone Mockup */}
              <div className="bg-white rounded-[32px] overflow-hidden p-4 space-y-3 text-xs max-h-[580px] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <span className="font-extrabold text-sm text-[#1D1D1F]">iNESTYL OUTLET</span>
                  <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded-full font-bold">Menu</span>
                </div>

                {/* Mobile Accordions derived from live navigation */}
                <div className="divide-y divide-[#E5E7EB]">
                  {/* Shoes Accordion */}
                  <div className="py-2.5">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === "Shoes" ? null : "Shoes")}
                      className="w-full flex items-center justify-between font-bold text-[#1D1D1F]"
                    >
                      <span>Shoes</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          mobileExpanded === "Shoes" ? "rotate-180 text-[#0071E3]" : ""
                        }`}
                      />
                    </button>
                    {mobileExpanded === "Shoes" && (
                      <div className="pt-2 pl-3 space-y-1.5 text-[11px] text-[#6E6E73]">
                        {(navigation.footwearMegaMenu?.[0]?.links || [])
                          .filter((l) => l.visible)
                          .map((l) => (
                            <div key={l.id} className="py-1 flex items-center justify-between">
                              <span>{l.label}</span>
                              <ChevronRight className="w-3 h-3 text-neutral-300" />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Clothing Accordion */}
                  <div className="py-2.5">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === "Clothing" ? null : "Clothing")}
                      className="w-full flex items-center justify-between font-bold text-[#1D1D1F]"
                    >
                      <span>Clothing</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          mobileExpanded === "Clothing" ? "rotate-180 text-[#0071E3]" : ""
                        }`}
                      />
                    </button>
                    {mobileExpanded === "Clothing" && (
                      <div className="pt-2 pl-3 space-y-1.5 text-[11px] text-[#6E6E73]">
                        {(navigation.clothingMegaMenu?.[0]?.links || [])
                          .filter((l) => l.visible)
                          .map((l) => (
                            <div key={l.id} className="py-1 flex items-center justify-between">
                              <span>{l.label}</span>
                              <ChevronRight className="w-3 h-3 text-neutral-300" />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Header Links List */}
                  {(navigation.header || [])
                    .filter((h) => h.visible)
                    .map((item) => (
                      <div key={item.id} className="py-2.5 flex items-center justify-between font-medium text-[#1D1D1F]">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] bg-blue-50 text-[#0071E3] font-bold px-1.5 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] text-center text-[10px] text-[#86868B]">
                  Station Road, Kapadwanj, Gujarat
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
