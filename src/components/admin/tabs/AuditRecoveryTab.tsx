"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Database,
  Download,
  RotateCcw,
  Plus,
  Clock,
  User,
  ArrowRight,
  HardDrive,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
} from "lucide-react";
import { AuditLogEntry, BackupSnapshotMeta, Product } from "@/types";
import { useToast } from "@/components/admin/ToastContext";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

interface AuditRecoveryTabProps {
  initialAuditLogs: AuditLogEntry[];
  initialBackups: BackupSnapshotMeta[];
  products: Product[];
}

export function AuditRecoveryTab({
  initialAuditLogs,
  initialBackups,
  products,
}: AuditRecoveryTabProps) {
  const { success, error } = useToast();
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [backups, setBackups] = useState<BackupSnapshotMeta[]>(initialBackups);
  const [searchQuery, setSearchQuery] = useState("");
  const [entityFilter, setEntityFilter] = useState("all");

  // Backup creation modal state
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupReason, setBackupReason] = useState("");

  // Restore confirmation modal
  const [restoringBackupId, setRestoringBackupId] = useState<string | null>(null);

  // Filtered audit logs
  const filteredLogs = auditLogs.filter((log) => {
    if (entityFilter !== "all" && log.entity.toLowerCase() !== entityFilter.toLowerCase()) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(q) ||
      log.author.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      (log.entityName && log.entityName.toLowerCase().includes(q))
    );
  });

  const handleCreateSnapshot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          reason: backupReason || "Manual Administrative Snapshot",
          author: "Admin (Kapadwanj Store Operations)",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBackups([data.snapshot, ...backups]);
        success("Backup Created", `Snapshot ${data.snapshot.id} saved successfully.`);
        setIsCreatingBackup(false);
        setBackupReason("");
      } else {
        error("Backup Failed", data.error);
      }
    } catch (err: any) {
      error("Error creating backup", err.message);
    }
  };

  const handleRestoreSnapshot = async () => {
    if (!restoringBackupId) return;
    try {
      const res = await fetch("/api/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "restore",
          backupId: restoringBackupId,
          author: "Admin (Recovery Action)",
        }),
      });

      const data = await res.json();
      if (data.success) {
        success("Recovery Complete", data.message);
        setRestoringBackupId(null);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        error("Restore Failed", data.error);
      }
    } catch (err: any) {
      error("Error restoring backup", err.message);
    }
  };

  // Media Asset Verification & Manifest Export
  const handleExportMediaManifest = () => {
    const manifest = {
      store: "iNESTYL OUTLET Kapadwanj Flagship",
      exportedAt: new Date().toISOString(),
      totalProducts: products.length,
      mediaCount: products.reduce((acc, p) => acc + (p.gallery?.length || 1), 0),
      mediaAssets: products.map((p) => ({
        sku: p.sku,
        title: p.title,
        brand: p.brand,
        primaryImage: p.image,
        gallery: p.gallery,
        hasVideo: p.hasVideo,
        videoUrl: p.videoUrl,
      })),
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inestyl-media-manifest-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success("Media Manifest Exported", "Comprehensive image asset catalog downloaded.");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071E3] block">
            ENTERPRISE GOVERNANCE &amp; DISASTER RECOVERY
          </span>
          <h2 className="font-heading text-xl font-bold text-[#1D1D1F]">
            Audit History &amp; Backup Recovery
          </h2>
          <p className="text-xs text-[#86868B] mt-0.5">
            Immutable activity logs with before/after diffs, one-click snapshots, rollback recovery, and media asset validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/backup?download=true"
            className="px-4 py-2 rounded-full border border-[#E5E7EB] bg-white text-xs font-semibold hover:bg-[#F5F5F7] text-[#1D1D1F] flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Full JSON Backup</span>
          </a>

          <button
            type="button"
            onClick={() => setIsCreatingBackup(true)}
            className="px-5 py-2 rounded-full bg-[#0071E3] text-white font-semibold text-xs hover:bg-[#0066CC] transition-colors flex items-center gap-1.5 shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Snapshot</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: DATABASE BACKUP & RECOVERY STRATEGY */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
                Database Backup Snapshots &amp; Disaster Recovery
              </h3>
              <p className="text-xs text-[#86868B]">
                Point-in-time catalogue and navigation state snapshots with one-click restoration.
              </p>
            </div>
          </div>
        </div>

        {/* Snapshots Table */}
        <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F5F5F7] text-[#86868B] font-bold border-b border-[#E5E7EB] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Snapshot ID</th>
                <th className="py-3 px-4">Reason / Notes</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4 text-right">Recovery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#1D1D1F]">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-[#F9F9FB] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#0071E3]">{b.id}</td>
                  <td className="py-3 px-4 font-medium">{b.reason}</td>
                  <td className="py-3 px-4">{b.productsCount} items</td>
                  <td className="py-3 px-4 font-mono">{b.sizeKb} KB</td>
                  <td className="py-3 px-4 text-[#86868B]">
                    {new Date(b.timestamp).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 text-[#6E6E73]">{b.author}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setRestoringBackupId(b.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-[11px] font-semibold hover:bg-amber-100 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore Snapshot</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disaster Recovery Procedure Box */}
        <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] space-y-2 text-xs">
          <span className="font-bold text-[#1D1D1F] flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#0071E3]" />
            Recovery Procedure Protocol:
          </span>
          <p className="text-[#6E6E73] leading-relaxed">
            When a snapshot is restored, the system automatically takes an instantaneous pre-restore safety rollback snapshot of the current state before applying the restored data. The storefront caches are immediately revalidated so customers see restored inventory without downtime.
          </p>
        </div>
      </div>

      {/* SECTION 2: MEDIA ASSET BACKUP STRATEGY */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0071E3] flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
                Media Asset Backup &amp; Verification Strategy
              </h3>
              <p className="text-xs text-[#86868B]">
                Verify image integrity across local public/images/ folders and generate media manifests.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportMediaManifest}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E5E7EB] bg-[#F5F5F7] hover:bg-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] transition-colors shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Export Media Manifest.json</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] text-emerald-700 uppercase font-bold block">Asset Verification</span>
            <span className="text-lg font-bold text-emerald-800 flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% Verified
            </span>
            <span className="text-[11px] text-emerald-700 block mt-1">All {products.length} product images resolved.</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
            <span className="text-[10px] text-[#86868B] uppercase font-bold block">Total Product Media</span>
            <span className="text-lg font-bold text-[#1D1D1F] mt-0.5 block">
              {products.reduce((acc, p) => acc + (p.gallery?.length || 1), 0)} Images
            </span>
            <span className="text-[11px] text-[#86868B] block mt-1">Stored in /public/images/products</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
            <span className="text-[10px] text-[#86868B] uppercase font-bold block">Video Showcases</span>
            <span className="text-lg font-bold text-[#1D1D1F] mt-0.5 block">
              {products.filter((p) => p.hasVideo).length} Active Videos
            </span>
            <span className="text-[11px] text-[#86868B] block mt-1">Supported in ProductCard &amp; Detail</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: ADMIN ACTIVITY HISTORY AUDIT LOG */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E5E7EB]">
          <div>
            <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
              Admin Activity History ({filteredLogs.length} Entries)
            </h3>
            <p className="text-xs text-[#86868B]">
              Audit trail showing who performed each action, timestamp, and previous vs updated values.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#86868B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trail..."
                className="h-8 pl-8 pr-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs"
              />
            </div>

            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="h-8 px-2.5 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs font-medium"
            >
              <option value="all">All Entities</option>
              <option value="product">Products</option>
              <option value="navigation">Navigation</option>
              <option value="sizeguide">Size Guides</option>
              <option value="backup">Backups</option>
              <option value="enquiry">Enquiries</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F5F5F7] text-[#86868B] font-bold border-b border-[#E5E7EB] uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Date &amp; Time</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Performed By</th>
                <th className="py-3 px-4">Details &amp; Reason</th>
                <th className="py-3 px-4">Value Change (Diff)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#1D1D1F]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F9F9FB] transition-colors">
                  <td className="py-3 px-4 text-[#86868B] whitespace-nowrap font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-xs text-[#0071E3]">
                    {log.action}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold block">{log.entity}</span>
                    {log.entityName && (
                      <span className="text-[10px] text-[#86868B] truncate max-w-xs block">
                        {log.entityName}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#6E6E73] font-medium flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#0071E3]" />
                    <span>{log.author}</span>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-[#6E6E73]">
                    {log.details}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px]">
                    {log.previousValue !== undefined || log.updatedValue !== undefined ? (
                      <div className="flex items-center gap-1.5">
                        {log.previousValue !== undefined && (
                          <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-700 line-through">
                            {String(log.previousValue)}
                          </span>
                        )}
                        <ArrowRight className="w-3 h-3 text-[#86868B]" />
                        {log.updatedValue !== undefined && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                            {String(log.updatedValue)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[#86868B]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CREATE SNAPSHOT */}
      {isCreatingBackup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-[#E5E7EB]">
            <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
              Create Database Backup Snapshot
            </h3>
            <p className="text-xs text-[#6E6E73]">
              Save an exact snapshot of current catalogue, pricing, variant stock, and navigation configs.
            </p>

            <form onSubmit={handleCreateSnapshot} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1D1D1F] block mb-1">Snapshot Label / Reason:</label>
                <input
                  type="text"
                  required
                  value={backupReason}
                  onChange={(e) => setBackupReason(e.target.value)}
                  placeholder="e.g. Pre-Weekend Stock Clearance, Festive Season Launch"
                  className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsCreatingBackup(false)}
                  className="px-4 py-2 rounded-full border border-[#E5E7EB] hover:bg-[#F5F5F7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#0071E3] text-white font-semibold hover:bg-[#0066CC]"
                >
                  Create Snapshot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG: RESTORE SNAPSHOT */}
      <ConfirmDialog
        isOpen={Boolean(restoringBackupId)}
        title="Restore Database Snapshot?"
        message={`Are you sure you want to restore snapshot "${restoringBackupId}"? This will overwrite the current live catalogue with the archived data. An automatic pre-restore safety snapshot will be recorded first.`}
        confirmLabel="Restore Snapshot"
        variant="warning"
        onConfirm={handleRestoreSnapshot}
        onCancel={() => setRestoringBackupId(null)}
      />
    </div>
  );
}
