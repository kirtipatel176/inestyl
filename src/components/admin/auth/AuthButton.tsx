"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
}

export function AuthButton({
  children,
  isLoading = false,
  loadingText = "Authenticating...",
  variant = "primary",
  icon,
  disabled,
  className = "",
  ...props
}: AuthButtonProps) {
  const baseStyles =
    "w-full h-11 px-4 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-3 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-[#0071E3] hover:bg-[#0066CC] active:bg-[#0055B3] text-white shadow-sm hover:shadow focus:ring-[#0071E3]/25 disabled:bg-[#0071E3]/50 disabled:shadow-none",
    secondary:
      "bg-[#F5F5F7] hover:bg-[#E5E7EB] active:bg-[#D1D5DB] text-[#1D1D1F] border border-[#E5E7EB] focus:ring-[#1D1D1F]/15 disabled:bg-[#F5F5F7] disabled:text-[#86868B]",
    ghost:
      "bg-transparent hover:bg-[#F5F5F7] text-[#1D1D1F] focus:ring-[#1D1D1F]/15 disabled:text-[#86868B]",
  }[variant];

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.985 }}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants} ${className}`}
      {...(props as any)}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
}
