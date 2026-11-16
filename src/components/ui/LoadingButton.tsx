"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Accessible button with built-in loading state and double-submission lock.
 */
export function LoadingButton({
  isLoading = false,
  loadingText,
  variant = "primary",
  icon,
  children,
  disabled,
  className = "",
  type = "button",
  ...props
}: LoadingButtonProps) {
  const variantStyles = {
    primary:
      "bg-[#0071E3] text-white hover:bg-[#0066CC] border border-[#0071E3] shadow-subtle",
    secondary:
      "bg-[#FFFFFF] text-[#1D1D1F] hover:bg-[#F5F5F7] border border-[#E5E7EB]",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 border border-rose-600 shadow-subtle",
    outline:
      "bg-transparent text-[#0071E3] hover:bg-[#0071E3]/5 border border-[#0071E3]",
    ghost:
      "bg-transparent text-[#1D1D1F] hover:bg-black/5 border border-transparent",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-normal transition-all duration-150 active:scale-98 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
