"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Search,
  Folder,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  Info,
  Filter,
  Image as ImageIcon,
  CheckCircle2,
  Edit2,
  X,
} from "lucide-react";
import { FileUploadProgress, UploadStatus } from "@/components/ui/FileUploadProgress";
import { useToast } from "../ToastContext";

export interface MediaAsset {
  publicId: string;
  secureUrl: string;
  deliveryUrl: string;
  format: string;
  width: number;
  height: number;
  sizeBytes: number;
  category: string;
  folder: string;
  altText: string;
  uploadedAt: string;
  isReferenced: boolean;
  referencedBy: string[];
}

interface UploadTask {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  errorMessage?: string;
}

const FOLDERS = [
  { id: "all", label: "All Media Folders" },
  { id: "inestyle-outlet/products", label: "Products (Footwear & Apparel)" },
  { id: "inestyle-outlet/homepage", label: "Homepage & Banners" },
  { id: "inestyle-outlet/categories", label: "Categories" },
  { id: "inestyle-outlet/collections", label: "Collections" },
  { id: "inestyle-outlet/brands", label: "Brand Logos" },
  { id: "inestyle-outlet/store", label: "Flagship Store" },
  { id: "inestyle-outlet/branding", label: "Branding & Logos" },
];

export function MediaLibraryTab({
  onSelectImage,
}: {
  onSelectImage?: (url: string, publicId: string) => void;
}) {
  const { success, error } = useToast();
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);
  const [activeUploadFolder, setActiveUploadFolder] = useState("inestyle-outlet/products");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [editAltText, setEditAltText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/media", window.location.origin);
      if (selectedFolder !== "all") url.searchParams.set("folder", selectedFolder);
      if (searchQuery.trim()) url.searchParams.set("q", searchQuery.trim());

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setAssets(data.assets || []);
      } else {
        error("Failed to load Cloudinary media assets.");
      }
    } catch (err) {
      error("Network error connecting to media service.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [selectedFolder]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadMedia();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleCopyUrl = (url: string, publicId: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(publicId);
    success("Cloudinary delivery URL copied to clipboard.");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newTasks: UploadTask[] = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      file,
      progress: 0,
      status: "uploading",
    }));

    setUploadTasks((prev) => [...newTasks, ...prev]);

    // Process uploads
    newTasks.forEach((task) => uploadSingleFile(task));
  };

  const uploadSingleFile = async (task: UploadTask) => {
    const formData = new FormData();
    formData.append("file", task.file);
    formData.append("folder", activeUploadFolder);
    formData.append("altText", task.file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));

    try {
      // Simulate progress progression for smooth UX
      const progressInterval = setInterval(() => {
        setUploadTasks((prev) =>
          prev.map((t) =>
            t.id === task.id && t.progress < 90
              ? { ...t, progress: t.progress + 15 }
              : t
          )
        );
      }, 150);

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Upload failed");
      }

      const data = await res.json();

      setUploadTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, progress: 100, status: "completed" } : t
        )
      );

      success(`Uploaded ${task.file.name} to Cloudinary.`);
      loadMedia();
    } catch (err: any) {
      setUploadTasks((prev) =>
        prev.map((t) =>
          t.id === task.id
            ? { ...t, status: "error", errorMessage: err.message || "Failed to upload" }
            : t
        )
      );
      error(`Upload failed for ${task.file.name}: ${err.message}`);
    }
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (asset.isReferenced && asset.referencedBy.length > 0) {
      alert(
        `Security Protection: Cannot delete this image.\n\nIt is currently referenced by:\n${asset.referencedBy.join(
          "\n"
        )}\n\nPlease remove or replace the image in the corresponding product or collection first.`
      );
      return;
    }

    if (
      !confirm(
        `Are you sure you want to delete ${asset.publicId} from Cloudinary?\nThis action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/media/${asset.publicId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }

      success("Media asset deleted from Cloudinary.");
      if (selectedAsset?.publicId === asset.publicId) setSelectedAsset(null);
      loadMedia();
    } catch (err: any) {
      error(err.message || "Delete failed");
    }
  };

  const handleSaveMeta = async () => {
    if (!selectedAsset) return;

    try {
      const res = await fetch(`/api/media/${selectedAsset.publicId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ altText: editAltText }),
      });

      if (!res.ok) throw new Error("Failed to update metadata");

      const data = await res.json();
      setSelectedAsset(data.asset);
      setIsEditingMeta(false);
      success("Image metadata updated successfully.");
      loadMedia();
    } catch (err: any) {
      error(err.message || "Failed to update metadata");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-[#E5E7EB] rounded-2xl shadow-subtle">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-[#1D1D1F]">Cloudinary Media Library</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              CDN Active
            </span>
          </div>
          <p className="text-xs text-[#86868B] mt-1">
            Centrally manage high-resolution catalogue photographs, campaign banners, and brand vectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-subtle cursor-pointer active:scale-95"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New Images</span>
          </button>
        </div>
      </div>

      {/* Upload Target Folder Selection */}
      <div className="p-4 bg-[#F5F5F7] border border-[#E5E7EB] rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-[#1D1D1F] font-semibold">
          <Folder className="w-4 h-4 text-[#0071E3]" />
          <span>Upload Destination:</span>
          <select
            value={activeUploadFolder}
            onChange={(e) => setActiveUploadFolder(e.target.value)}
            className="bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1 text-xs font-medium text-[#1D1D1F] focus:outline-[#0071E3]"
          >
            <option value="inestyle-outlet/products/footwear/men">Products / Footwear / Men</option>
            <option value="inestyle-outlet/products/footwear/women">Products / Footwear / Women</option>
            <option value="inestyle-outlet/products/clothing/men">Products / Clothing / Men</option>
            <option value="inestyle-outlet/products/clothing/women">Products / Clothing / Women</option>
            <option value="inestyle-outlet/homepage/desktop">Homepage / Desktop Hero</option>
            <option value="inestyle-outlet/homepage/mobile">Homepage / Mobile Hero</option>
            <option value="inestyle-outlet/homepage/campaigns">Homepage / Campaigns</option>
            <option value="inestyle-outlet/categories/footwear">Categories / Footwear</option>
            <option value="inestyle-outlet/categories/clothing">Categories / Clothing</option>
            <option value="inestyle-outlet/collections">Collections</option>
            <option value="inestyle-outlet/store">Flagship Store</option>
            <option value="inestyle-outlet/branding/logo">Branding / Logo</option>
          </select>
        </div>

        <span className="text-[11px] text-[#86868B]">
          Automatic format negotiation (AVIF/WebP) and perceptual compression enabled.
        </span>
      </div>

      {/* Active Upload Tasks */}
      {uploadTasks.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1D1D1F]">
            <span>Recent Uploads ({uploadTasks.length})</span>
            <button
              type="button"
              onClick={() => setUploadTasks([])}
              className="text-[#0071E3] hover:underline text-[11px]"
            >
              Clear Completed
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {uploadTasks.map((t) => (
              <FileUploadProgress
                key={t.id}
                fileName={t.file.name}
                fileSizeBytes={t.file.size}
                progress={t.progress}
                status={t.status}
                errorMessage={t.errorMessage}
                onRetry={() => uploadSingleFile(t)}
                onCancel={() => setUploadTasks((prev) => prev.filter((x) => x.id !== t.id))}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by public ID, filename, or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#1D1D1F] focus:outline-[#0071E3]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#86868B]" />
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs font-semibold text-[#1D1D1F] focus:outline-[#0071E3]"
          >
            {FOLDERS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="p-12 text-center bg-white border border-[#E5E7EB] rounded-2xl">
          <div className="w-8 h-8 rounded-full border-2 border-[#E5E7EB] border-t-[#0071E3] animate-spin mx-auto mb-3" />
          <p className="text-xs text-[#86868B]">Loading Cloudinary catalogue...</p>
        </div>
      ) : assets.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#E5E7EB] rounded-2xl">
          <ImageIcon className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#1D1D1F]">No media assets found</p>
          <p className="text-xs text-[#86868B] mt-1">
            Try adjusting your search query or folder filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.publicId}
              className={`group bg-white border rounded-2xl overflow-hidden shadow-2xs hover:shadow-subtle transition-all cursor-pointer flex flex-col ${
                selectedAsset?.publicId === asset.publicId
                  ? "border-[#0071E3] ring-2 ring-[#0071E3]/20"
                  : "border-[#E5E7EB] hover:border-[#1D1D1F]/20"
              }`}
              onClick={() => {
                setSelectedAsset(asset);
                setEditAltText(asset.altText);
                setIsEditingMeta(false);
              }}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-4/3 bg-[#F5F5F7] overflow-hidden">
                <Image
                  src={asset.deliveryUrl}
                  alt={asset.altText || "Cloudinary Asset"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-mono font-bold text-white uppercase">
                    {asset.format}
                  </span>
                  {asset.isReferenced && (
                    <span
                      title="Actively referenced in store catalogue"
                      className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"
                    />
                  )}
                </div>

                {/* Quick Copy Action */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyUrl(asset.deliveryUrl, asset.publicId);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-white text-[#1D1D1F] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                  title="Copy Cloudinary URL"
                >
                  {copiedId === asset.publicId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Card Meta */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#1D1D1F] truncate" title={asset.publicId}>
                    {asset.publicId.split("/").pop()}
                  </p>
                  <p className="text-[10px] text-[#86868B] truncate mt-0.5">
                    {asset.folder.replace("inestyle-outlet/", "")}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[10px] text-[#86868B]">
                  <span>
                    {asset.width}×{asset.height}
                  </span>
                  {onSelectImage && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectImage(asset.deliveryUrl, asset.publicId);
                      }}
                      className="px-2 py-0.5 rounded-md bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold"
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Asset Detail / Metadata Inspection Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5E7EB]">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1D1D1F]">Asset Details & Delivery URLs</h3>
                <p className="text-xs text-[#86868B] font-mono truncate max-w-md">
                  {selectedAsset.publicId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="p-1.5 rounded-full hover:bg-black/5 text-[#86868B] hover:text-[#1D1D1F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Preview */}
              <div className="relative w-full h-64 bg-[#F5F5F7] rounded-2xl overflow-hidden border border-[#E5E7EB] flex items-center justify-center">
                <Image
                  src={selectedAsset.deliveryUrl}
                  alt={selectedAsset.altText}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Alt Text & Metadata */}
              <div className="p-4 bg-[#F5F5F7] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1D1D1F]">Alt Text & SEO Description</span>
                  {!isEditingMeta ? (
                    <button
                      type="button"
                      onClick={() => setIsEditingMeta(true)}
                      className="text-xs font-semibold text-[#0071E3] hover:underline flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSaveMeta}
                      className="text-xs font-semibold text-emerald-600 hover:underline"
                    >
                      Save
                    </button>
                  )}
                </div>

                {isEditingMeta ? (
                  <input
                    type="text"
                    value={editAltText}
                    onChange={(e) => setEditAltText(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#1D1D1F] focus:outline-[#0071E3]"
                  />
                ) : (
                  <p className="text-xs text-[#1D1D1F]">{selectedAsset.altText || "No alt text set"}</p>
                )}
              </div>

              {/* Reference Check Alert */}
              {selectedAsset.isReferenced ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Protected: Actively Referenced</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    This asset is used in: {selectedAsset.referencedBy.join(", ")}. It cannot be deleted until references are updated.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-neutral-50 border border-[#E5E7EB] text-xs text-[#86868B] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Safe to delete: No active catalog references detected.</span>
                </div>
              )}

              {/* Cloudinary URLs */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1D1D1F] block">
                  Cloudinary Delivery Presets
                </span>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs">
                    <div className="min-w-0 pr-3">
                      <span className="font-semibold block text-[#1D1D1F]">Auto-Optimized (AVIF/WebP)</span>
                      <span className="text-[10px] text-[#86868B] font-mono truncate block">
                        {selectedAsset.deliveryUrl}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(selectedAsset.deliveryUrl, "auto")}
                      className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] hover:bg-[#E5E7EB] text-[11px] font-semibold text-[#1D1D1F] shrink-0"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs">
                    <div className="min-w-0 pr-3">
                      <span className="font-semibold block text-[#1D1D1F]">Product Listing Card (600×750)</span>
                      <span className="text-[10px] text-[#86868B] font-mono truncate block">
                        {selectedAsset.deliveryUrl.replace("/f_auto,q_auto/", "/c_fill,w_600,h_750,f_auto,q_auto/")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyUrl(
                          selectedAsset.deliveryUrl.replace(
                            "/f_auto,q_auto/",
                            "/c_fill,w_600,h_750,f_auto,q_auto/"
                          ),
                          "listing"
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#F5F5F7] hover:bg-[#E5E7EB] text-[11px] font-semibold text-[#1D1D1F] shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-[#E5E7EB] bg-[#F5F5F7] flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDelete(selectedAsset)}
                disabled={selectedAsset.isReferenced}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  selectedAsset.isReferenced
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer"
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={selectedAsset.deliveryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open CDN Image</span>
                </a>

                {onSelectImage && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectImage(selectedAsset.deliveryUrl, selectedAsset.publicId);
                      setSelectedAsset(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-xs font-semibold text-white shadow-subtle"
                  >
                    Select for Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
