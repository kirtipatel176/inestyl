"use client";

import { useState } from "react";
import { SizeGuideTable } from "@/types";
import { Info, Check } from "lucide-react";

interface SizeGuideViewClientProps {
  sizeGuides: Record<string, SizeGuideTable>;
}

export function SizeGuideViewClient({ sizeGuides }: SizeGuideViewClientProps) {
  const tabs = [
    { key: "menFootwear", label: "Men's Footwear" },
    { key: "womenFootwear", label: "Women's Footwear" },
    { key: "unisexFootwear", label: "Unisex Footwear" },
    { key: "menClothing", label: "Men's Clothing" },
    { key: "womenClothing", label: "Women's Clothing" },
  ];

  const [activeKey, setActiveKey] = useState<string>("menFootwear");
  const currentGuide = sizeGuides[activeKey] || sizeGuides["menFootwear"];

  if (!currentGuide) {
    return (
      <div className="p-8 text-center text-[#86868B] bg-white rounded-2xl border border-[#E5E7EB]">
        No size guides configured.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E7EB]">
        {tabs.map((tab) => {
          const isActive = activeKey === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveKey(tab.key)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-[#1D1D1F] text-white shadow-subtle"
                  : "bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E7EB]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Table Card */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 space-y-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1D1D1F]">
              {currentGuide.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#86868B] mt-1">
              {currentGuide.description}
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0071E3] bg-[#0071E3]/10 px-3.5 py-1.5 rounded-full self-start sm:self-auto uppercase tracking-wider">
            {currentGuide.gender} • {currentGuide.category}
          </span>
        </div>

        {/* Measuring Tip Alert */}
        {currentGuide.measuringTip && (
          <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] flex items-start gap-3 text-xs text-[#1D1D1F]">
            <Info className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5 text-[#1D1D1F]">How to Measure:</span>
              <span className="text-[#6E6E73] leading-relaxed">{currentGuide.measuringTip}</span>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#1D1D1F] font-bold">
                {currentGuide.headers.map((h, i) => (
                  <th
                    key={h.key}
                    className={`py-3.5 px-4 ${
                      i === 0 ? "bg-[#F5F5F7] rounded-l-xl font-bold" : "bg-[#FAFAFB]"
                    } ${i === currentGuide.headers.length - 1 ? "rounded-r-xl" : ""}`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#6E6E73]">
              {currentGuide.rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F5F5F7]/60 transition-colors">
                  {currentGuide.headers.map((h, i) => (
                    <td
                      key={h.key}
                      className={`py-3 px-4 ${
                        i === 0 ? "font-bold text-[#1D1D1F] bg-[#F5F5F7]/40" : ""
                      }`}
                    >
                      {row[h.key] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
