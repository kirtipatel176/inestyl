"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthMeterProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = "" }: PasswordStrengthMeterProps) {
  const requirements = useMemo(() => {
    return [
      { label: "At least 8 characters", met: password.length >= 8 },
      { label: "One uppercase letter (A-Z)", met: /[A-Z]/.test(password) },
      { label: "One lowercase letter (a-z)", met: /[a-z]/.test(password) },
      { label: "One numeric digit (0-9)", met: /[0-9]/.test(password) },
      { label: "One special character (!@#$%...)", met: /[^A-Za-z0-9]/.test(password) },
    ];
  }, [password]);

  const metCount = requirements.filter((r) => r.met).length;

  const strength = useMemo(() => {
    if (password.length === 0) return { score: 0, label: "", color: "bg-neutral-200" };
    if (metCount <= 2) return { score: 1, label: "Weak", color: "bg-[#D92D20]" };
    if (metCount <= 4) return { score: 2, label: "Medium", color: "bg-[#D97706]" };
    return { score: 3, label: "Strong", color: "bg-[#16A34A]" };
  }, [password, metCount]);

  if (!password) {
    return null;
  }

  return (
    <div className="space-y-3 pt-1">
      {/* Progress Bars */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#86868B] font-medium">Password Strength</span>
          <span
            className={`font-bold ${
              strength.score === 1
                ? "text-[#D92D20]"
                : strength.score === 2
                ? "text-[#D97706]"
                : "text-[#16A34A]"
            }`}
          >
            {strength.label}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 h-1.5">
          <div
            className={`h-full rounded-full transition-colors duration-300 ${
              strength.score >= 1 ? strength.color : "bg-neutral-200"
            }`}
          />
          <div
            className={`h-full rounded-full transition-colors duration-300 ${
              strength.score >= 2 ? strength.color : "bg-neutral-200"
            }`}
          />
          <div
            className={`h-full rounded-full transition-colors duration-300 ${
              strength.score >= 3 ? strength.color : "bg-neutral-200"
            }`}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {requirements.map((req, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 text-[11px] transition-colors duration-200 ${
              req.met ? "text-[#16A34A] font-medium" : "text-[#86868B]"
            }`}
          >
            {req.met ? (
              <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
            )}
            <span>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
