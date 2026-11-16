"use client";

import { useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  X,
  Download,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Product } from "@/types";
import { ImportValidationResult, ImportError } from "@/lib/server-db";

interface CsvImportModalProps {
  onClose: () => void;
  onSuccess: (count: number) => void;
}

export function CsvImportModal({ onClose, onSuccess }: CsvImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [validationResult, setValidationResult] = useState<ImportValidationResult | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  // Helper to parse simple CSV to array of row objects
  const parseCsvText = (text: string): Record<string, string>[] => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) return [];

    // Parse CSV header
    const headers = parseCsvLine(lines[0]);
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvLine(lines[i]);
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => {
        row[h.trim()] = values[idx] !== undefined ? values[idx].trim() : "";
      });
      rows.push(row);
    }
    return rows;
  };

  const parseCsvLine = (line: string): string[] => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        values.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current);
    return values;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setParseError(null);
    setValidationResult(null);
    setIsParsing(true);

    try {
      const text = await selected.text();
      const rawRows = parseCsvText(text);

      if (rawRows.length === 0) {
        setParseError("The uploaded CSV file is empty or missing headers.");
        setIsParsing(false);
        return;
      }

      // Send to server validation endpoint
      const res = await fetch("/api/products/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "validate", rows: rawRows }),
      });

      const data = await res.json();
      if (!data.success) {
        setParseError(data.error || "Failed to validate CSV rows.");
      } else {
        setValidationResult(data.result);
      }
    } catch (err: any) {
      setParseError(err.message || "Error reading file.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleCommit = async (validOnly = false) => {
    if (!validationResult || validationResult.validRows.length === 0) return;

    setIsCommitting(true);
    try {
      const res = await fetch("/api/products/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "commit",
          products: validationResult.validRows,
          author: "Admin (CSV Bulk Import)",
        }),
      });

      const data = await res.json();
      if (data.success) {
        onSuccess(data.importedCount);
        onClose();
      } else {
        setParseError(data.error || "Failed to import products.");
      }
    } catch (err: any) {
      setParseError(err.message || "Failed to commit import.");
    } finally {
      setIsCommitting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const templateContent = [
      "sku,title,brand,category,subcategory,type,gender,mrp,outletPrice,sizes,colours,description,image",
      'NK-DUNK-01,Nike Dunk Low Retro,Nike,Shoes,Sneakers,footwear,Men,8295,5995,"7, 8, 9, 10, 11","Black (#111111), White (#FFFFFF)",Iconic hardwood silhouette crafted with premium leather,/images/products/nike-air-max-270.jpg',
      'LV-511-SLIM,Levi\'s 511 Slim Fit Jeans,Levi\'s,Clothing,Jeans,clothing,Men,3999,2699,"30, 32, 34, 36","Indigo (#1A237E)",Modern slim with room to move engineered with +All Seasons Technology,/images/products/levis-511-slim.jpg',
      'PM-CLYDE-02,Puma Clyde Classic Leather,Puma,Shoes,Casual,footwear,Unisex,6999,4499,"6, 7, 8, 9, 10","White (#FFFFFF)",Clean heritage court staple verified from authorized distributor,/images/products/puma-rs-x.jpg',
    ].join("\n");

    const blob = new Blob([templateContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "inestyl-outlet-import-template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB] max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                Bulk Catalogue CSV / Excel Import
              </h3>
              <p className="text-xs text-[#86868B]">
                Upload and validate distributor batch inventory before publishing.
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto space-y-5 text-xs pr-1">
          {/* Template Download Helper */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
            <div>
              <span className="font-bold text-[#1D1D1F] block">Need standard format?</span>
              <p className="text-[11px] text-[#6E6E73]">
                Download our verified CSV column schema with sample footwear &amp; apparel data.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] font-semibold text-[#0071E3] hover:bg-neutral-50 shadow-2xs shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Template.csv</span>
            </button>
          </div>

          {/* Upload Dropzone */}
          <div className="relative border-2 border-dashed border-[#E5E7EB] hover:border-[#0071E3] rounded-3xl p-6 text-center transition-colors">
            <input
              type="file"
              accept=".csv,.tsv,.txt"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2 pointer-events-none">
              <UploadCloud className="w-10 h-10 mx-auto text-[#0071E3]" />
              <p className="font-bold text-sm text-[#1D1D1F]">
                {file ? file.name : "Choose or drag CSV file here"}
              </p>
              <p className="text-[11px] text-[#86868B]">
                Supports .csv and text formats up to 5MB
              </p>
            </div>
          </div>

          {isParsing && (
            <div className="py-6 text-center text-[#86868B] flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#0071E3]" />
              <span>Validating rows and checking duplicate SKUs...</span>
            </div>
          )}

          {parseError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Validation Error:</span>
                <span>{parseError}</span>
              </div>
            </div>
          )}

          {/* Validation Report View */}
          {validationResult && (
            <div className="space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#86868B] uppercase font-bold block">Total Rows</span>
                  <span className="text-xl font-bold text-[#1D1D1F]">{validationResult.totalRows}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold block">Valid to Import</span>
                  <span className="text-xl font-bold text-emerald-800">{validationResult.summary.validCount}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200">
                  <span className="text-[10px] text-red-700 uppercase font-bold block">Errors Found</span>
                  <span className="text-xl font-bold text-red-800">{validationResult.summary.errorCount}</span>
                </div>
              </div>

              {/* Line by line error report */}
              {validationResult.errors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-700 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Line-by-Line Error Report ({validationResult.errors.length}):</span>
                  </div>

                  <div className="border border-red-200 rounded-2xl overflow-hidden max-h-48 overflow-y-auto bg-red-50/30">
                    <table className="w-full text-left text-[11px]">
                      <thead>
                        <tr className="bg-red-100/50 text-red-800 font-bold border-b border-red-200">
                          <th className="py-2 px-3">Row #</th>
                          <th className="py-2 px-3">SKU</th>
                          <th className="py-2 px-3">Field</th>
                          <th className="py-2 px-3">Error Reason</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-red-100 text-red-900 font-mono">
                        {validationResult.errors.map((err, i) => (
                          <tr key={i} className="hover:bg-red-50">
                            <td className="py-1.5 px-3 font-bold">{err.rowNumber}</td>
                            <td className="py-1.5 px-3">{err.sku}</td>
                            <td className="py-1.5 px-3 font-semibold text-red-700">{err.field}</td>
                            <td className="py-1.5 px-3 font-sans text-xs">{err.message}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#E5E7EB] hover:bg-[#F5F5F7] text-xs font-semibold"
          >
            Cancel
          </button>

          {validationResult && (
            <div className="flex items-center gap-2">
              {validationResult.summary.validCount > 0 && validationResult.summary.errorCount > 0 && (
                <button
                  type="button"
                  disabled={isCommitting}
                  onClick={() => handleCommit(true)}
                  className="px-5 py-2 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold text-xs hover:bg-emerald-100 transition-colors"
                >
                  Import {validationResult.summary.validCount} Valid Rows
                </button>
              )}

              {validationResult.summary.validCount > 0 && validationResult.summary.errorCount === 0 && (
                <button
                  type="button"
                  disabled={isCommitting}
                  onClick={() => handleCommit(false)}
                  className="px-6 py-2 rounded-full bg-[#0071E3] text-white font-semibold text-xs hover:bg-[#0066CC] transition-colors flex items-center gap-1.5"
                >
                  {isCommitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Commit {validationResult.summary.validCount} Products</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
