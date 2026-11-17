"use client";

import { useState, forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  rightAction?: ReactNode;
  isPassword?: boolean;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, rightAction, isPassword, className = "", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `auth-input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const inputType = isPassword ? (showPassword ? "text" : "password") : props.type || "text";

    return (
      <div className="w-full space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#1D1D1F] tracking-tight"
          >
            {label}
            {props.required && <span className="text-[#D92D20] ml-0.5">*</span>}
          </label>
          {rightAction}
        </div>

        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B] group-focus-within:text-[#0071E3] transition-colors">
              {icon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={`w-full h-11 ${icon ? "pl-10" : "pl-3.5"} ${
              isPassword ? "pr-11" : "pr-3.5"
            } rounded-xl bg-[#FFFFFF] border text-sm text-[#1D1D1F] placeholder:text-[#A1A1A6] transition-all duration-150 focus:outline-none ${
              error
                ? "border-[#D92D20] focus:border-[#D92D20] focus:ring-3 focus:ring-[#D92D20]/15"
                : "border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#0071E3] focus:ring-3 focus:ring-[#0071E3]/15"
            } disabled:bg-[#F5F5F7] disabled:text-[#86868B] disabled:cursor-not-allowed ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#86868B] hover:text-[#1D1D1F] transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-[#0071E3]" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-[11px] font-medium text-[#D92D20] flex items-center gap-1 mt-1">
            <span>•</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
