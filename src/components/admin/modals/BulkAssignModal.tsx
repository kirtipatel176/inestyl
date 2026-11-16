"use client";

import { useState } from "react";
import { FolderTree, X } from "lucide-react";
import { BRANDS_DATA, COLLECTIONS_DATA } from "@/constants/mock-data";

interface BulkAssignModalProps {
  selectedCount: number;
  onClose: () => void;
  onSubmit: (assignments: {
    brand?: string;
    category?: string;
    subcategory?: string;
    type?: "footwear" | "clothing";
    gender?: "Men" | "Women" | "Unisex";
    collectionSlug?: string;
  }) => void;
}

export function BulkAssignModal({
  selectedCount,
  onClose,
  onSubmit,
}: BulkAssignModalProps) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState<"" | "footwear" | "clothing">("");
  const [selectedGender, setSelectedGender] = useState<"" | "Men" | "Women" | "Unisex">("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [customSubcategory, setCustomSubcategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {};
    if (selectedBrand) payload.brand = selectedBrand;
    if (selectedType) {
      payload.type = selectedType;
      payload.category = selectedType === "footwear" ? "Shoes" : "Clothing";
    }
    if (selectedGender) payload.gender = selectedGender;
    if (selectedCollection) payload.collectionSlug = selectedCollection;
    if (customSubcategory) payload.subcategory = customSubcategory;

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-6 shadow-2xl border border-[#E5E7EB]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0071E3] flex items-center justify-center shrink-0">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
                Bulk Brand &amp; Taxonomy Assignment
              </h3>
              <p className="text-xs text-[#86868B]">
                Reassign attributes for {selectedCount} selected styles
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <p className="text-[#6E6E73]">
            Choose attributes to update. Fields left blank will retain their existing values.
          </p>

          {/* Brand */}
          <div>
            <label className="font-bold text-[#1D1D1F] block mb-1">Assign Brand:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
            >
              <option value="">— Keep Current Brand —</option>
              {BRANDS_DATA.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="font-bold text-[#1D1D1F] block mb-1">Assign Department:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
            >
              <option value="">— Keep Current Department —</option>
              <option value="footwear">Footwear / Shoes</option>
              <option value="clothing">Clothing / Apparel</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="font-bold text-[#1D1D1F] block mb-1">Assign Gender Target:</label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value as any)}
              className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
            >
              <option value="">— Keep Current Gender —</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          {/* Add to Collection */}
          <div>
            <label className="font-bold text-[#1D1D1F] block mb-1">Add to Thematic Collection:</label>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
            >
              <option value="">— Do Not Add to Collection —</option>
              {COLLECTIONS_DATA.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="font-bold text-[#1D1D1F] block mb-1">Custom Subcategory (optional):</label>
            <input
              type="text"
              value={customSubcategory}
              onChange={(e) => setCustomSubcategory(e.target.value)}
              placeholder="e.g. Sneakers, Running, T-Shirts, Jeans"
              className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[#E5E7EB] hover:bg-[#F5F5F7] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#0071E3] text-white font-semibold hover:bg-[#0066CC] transition-colors"
            >
              Apply Assignments
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
