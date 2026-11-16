"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export type AlertType = "error" | "success" | "warning" | "info";

interface AuthAlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function AuthAlert({
  type = "error",
  title,
  message,
  onDismiss,
  className = "",
}: AuthAlertProps) {
  const styles = {
    error: {
      bg: "bg-[#FFF2F2] border-[#FECDCA] text-[#B42318]",
      icon: <AlertCircle className="w-4 h-4 text-[#D92D20] shrink-0 mt-0.5" />,
    },
    success: {
      bg: "bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D]",
      icon: <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />,
    },
    warning: {
      bg: "bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]",
      icon: <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />,
    },
    info: {
      bg: "bg-[#EFF8FF] border-[#B2DDFF] text-[#175CD3]",
      icon: <Info className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />,
    },
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className={`p-3.5 rounded-xl border text-xs font-medium flex items-start gap-3 relative ${styles.bg} ${className}`}
      role="alert"
    >
      {styles.icon}
      <div className="flex-1 pr-4">
        {title && <p className="font-bold text-[13px] mb-0.5 leading-tight">{title}</p>}
        <p className="leading-relaxed">{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 -mr-1 -mt-1 rounded-md"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  );
}
