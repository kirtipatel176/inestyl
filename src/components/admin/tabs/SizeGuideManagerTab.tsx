"use client";

import { useState } from "react";
import {
  Ruler,
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Info,
  CheckCircle2,
} from "lucide-react";
import { SizeGuideTable, SizeGuideRow } from "@/types";
import { useToast } from "@/components/admin/ToastContext";

interface SizeGuideManagerTabProps {
  initialSizeGuides: Record<string, SizeGuideTable>;
}

export function SizeGuideManagerTab({ initialSizeGuides }: SizeGuideManagerTabProps) {
  const { success, error } = useToast();
  const [guides, setGuides] = useState<Record<string, SizeGuideTable>>(initialSizeGuides);
  const [activeKey, setActiveKey] = useState<
    "menFootwear" | "womenFootwear" | "unisexFootwear" | "menClothing" | "womenClothing"
  >("menFootwear");
  const [isSaving, setIsSaving] = useState(false);

  const guideTabs = [
    { key: "menFootwear", label: "Men's Footwear" },
    { key: "womenFootwear", label: "Women's Footwear" },
    { key: "unisexFootwear", label: "Unisex Footwear" },
    { key: "menClothing", label: "Men's Clothing" },
    { key: "womenClothing", label: "Women's Clothing" },
  ];

  const currentGuide = guides[activeKey];

  const handleCellChange = (rowId: string, colKey: string, value: string) => {
    setGuides((prev) => ({
      ...prev,
      [activeKey]: {
        ...prev[activeKey],
        rows: prev[activeKey].rows.map((r) =>
          r.id === rowId ? { ...r, [colKey]: value } : r
        ),
      },
    }));
  };

  const handleAddRow = () => {
    const newId = `row-${Date.now()}`;
    const newRow: SizeGuideRow = { id: newId };
    currentGuide.headers.forEach((h) => {
      newRow[h.key] = "";
    });

    setGuides((prev) => ({
      ...prev,
      [activeKey]: {
        ...prev[activeKey],
        rows: [...prev[activeKey].rows, newRow],
      },
    }));
  };

  const handleDeleteRow = (rowId: string) => {
    setGuides((prev) => ({
      ...prev,
      [activeKey]: {
        ...prev[activeKey],
        rows: prev[activeKey].rows.filter((r) => r.id !== rowId),
      },
    }));
  };

  const handleMoveRow = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentGuide.rows.length) return;

    const copy = [...currentGuide.rows];
    const [moved] = copy.splice(idx, 1);
    copy.splice(targetIdx, 0, moved);

    setGuides((prev) => ({
      ...prev,
      [activeKey]: {
        ...prev[activeKey],
        rows: copy,
      },
    }));
  };

  const handleMetaChange = (field: "title" | "description" | "measuringTip", value: string) => {
    setGuides((prev) => ({
      ...prev,
      [activeKey]: {
        ...prev[activeKey],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/size-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: activeKey,
          guide: currentGuide,
          author: "Admin (Size Guide Manager)",
        }),
      });

      const data = await res.json();
      if (data.success) {
        success("Size Guide Published", `${currentGuide.title} published and live on storefront.`);
      } else {
        error("Publish Failed", data.error);
      }
    } catch (err: any) {
      error("Error saving size guide", err.message);
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
            Size Guide Management
          </h2>
          <p className="text-xs text-[#86868B] mt-0.5">
            Configure official size conversion charts for Men, Women &amp; Unisex Footwear and Apparel.
          </p>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="px-6 py-2 rounded-full bg-[#0071E3] text-white font-semibold text-xs hover:bg-[#0066CC] transition-colors flex items-center gap-1.5 shadow-subtle self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "Publishing..." : "Publish Size Guide"}</span>
        </button>
      </div>

      {/* Guide Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E7EB]">
        {guideTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveKey(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeKey === tab.key
                ? "bg-[#1D1D1F] text-white"
                : "bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Editor Panel */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 space-y-6 shadow-2xs">
        {/* Meta inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-[#1D1D1F] block mb-1">Chart Title:</label>
            <input
              type="text"
              value={currentGuide.title}
              onChange={(e) => handleMetaChange("title", e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-[#1D1D1F] block mb-1">Target Department &amp; Gender:</label>
            <div className="h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] flex items-center text-xs font-semibold text-[#0071E3]">
              {currentGuide.gender} • {currentGuide.category}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-[#1D1D1F] block mb-1">Description:</label>
            <input
              type="text"
              value={currentGuide.description}
              onChange={(e) => handleMetaChange("description", e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-[#1D1D1F] block mb-1">Measuring Instructions &amp; Advice:</label>
            <textarea
              rows={2}
              value={currentGuide.measuringTip}
              onChange={(e) => handleMetaChange("measuringTip", e.target.value)}
              className="w-full p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
            />
          </div>
        </div>

        {/* Table Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
            <span className="font-bold text-xs uppercase tracking-wider text-[#1D1D1F]">
              Size Conversion Grid ({currentGuide.rows.length} Rows)
            </span>
            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-[#0071E3] text-xs font-semibold hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Size Row</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F5F5F7] text-[#1D1D1F] font-bold border-b border-[#E5E7EB]">
                  <th className="py-2.5 px-3 w-16">Reorder</th>
                  {currentGuide.headers.map((h) => (
                    <th key={h.key} className="py-2.5 px-3">
                      {h.label}
                    </th>
                  ))}
                  <th className="py-2.5 px-3 text-right w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {currentGuide.rows.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-[#FAFAFB]">
                    {/* Reorder Buttons */}
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveRow(idx, "up")}
                          className="p-1 rounded text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-20"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === currentGuide.rows.length - 1}
                          onClick={() => handleMoveRow(idx, "down")}
                          className="p-1 rounded text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-20"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Column Cells */}
                    {currentGuide.headers.map((h) => (
                      <td key={h.key} className="py-2 px-3">
                        <input
                          type="text"
                          value={row[h.key] || ""}
                          onChange={(e) => handleCellChange(row.id, h.key, e.target.value)}
                          placeholder="—"
                          className="w-full h-8 px-2.5 rounded-lg bg-[#F5F5F7] border border-[#E5E7EB] font-medium text-xs focus:bg-white focus:border-[#0071E3]"
                        />
                      </td>
                    ))}

                    {/* Delete */}
                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(row.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50"
                        title="Delete Row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
