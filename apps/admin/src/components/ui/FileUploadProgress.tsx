"use client";

import { UploadCloud, CheckCircle2, AlertCircle, RefreshCw, X } from "lucide-react";

export type UploadStatus = "idle" | "uploading" | "completed" | "error" | "retrying";

interface FileUploadProgressProps {
  fileName: string;
  fileSizeBytes?: number;
  progress: number; // 0 - 100
  status: UploadStatus;
  errorMessage?: string;
  onRetry?: () => void;
  onCancel?: () => void;
  className?: string;
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes === 0) return "";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * File upload progress indicator with percentage, animated bar, bytes count, cancel and retry.
 */
export function FileUploadProgress({
  fileName,
  fileSizeBytes,
  progress,
  status,
  errorMessage,
  onRetry,
  onCancel,
  className = "",
}: FileUploadProgressProps) {
  const isFailed = status === "error";
  const isDone = status === "completed";
  const isUploading = status === "uploading" || status === "retrying";

  return (
    <div
      className={`p-4 rounded-xl border bg-white space-y-3 transition-colors ${
        isFailed
          ? "border-rose-200 bg-rose-50/20"
          : isDone
          ? "border-emerald-200 bg-emerald-50/10"
          : "border-[#E5E7EB]"
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 truncate">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              isFailed
                ? "bg-rose-100 text-rose-600"
                : isDone
                ? "bg-emerald-100 text-emerald-600"
                : "bg-[#F5F5F7] text-[#0071E3]"
            }`}
          >
            {isFailed ? (
              <AlertCircle className="w-4 h-4" />
            ) : isDone ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <UploadCloud className="w-4 h-4 animate-bounce" />
            )}
          </div>

          <div className="truncate">
            <p className="text-xs font-semibold text-[#1D1D1F] truncate">
              {fileName}
            </p>
            <p className="text-[10px] text-[#86868B]">
              {fileSizeBytes ? formatBytes(fileSizeBytes) : ""}{" "}
              {isUploading && `• ${progress}% uploaded`}
              {isDone && "• Upload complete"}
              {isFailed && `• ${errorMessage || "Upload failed"}`}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isFailed && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-2.5 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-semibold flex items-center gap-1 shadow-2xs"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>Retry</span>
            </button>
          )}

          {isUploading && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="p-1 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
              title="Cancel upload"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#F5F5F7] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-200 ${
            isFailed
              ? "bg-rose-500"
              : isDone
              ? "bg-emerald-500"
              : "bg-[#0071E3]"
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
