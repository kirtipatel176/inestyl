"use client";

import { useState, useEffect } from "react";
import { KeyRound, Check, Copy, ChevronDown, ChevronUp, RotateCcw, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

interface DemoCredentialsModalProps {
  onSelectAccount?: (email: string, pass: string, autoSubmit?: boolean) => void;
}

export function DemoCredentialsModal({ onSelectAccount }: DemoCredentialsModalProps) {
  const [isOpen, setIsOpen] = useState(true); // default open so it's readily accessible
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const [demoData, setDemoData] = useState<{
    commonPassword: string;
    accounts: Array<{
      email: string;
      role: string;
      name: string;
      status: string;
      emailVerified?: boolean;
      twoFactorEnabled: boolean;
      sampleBackupCode?: string;
    }>;
  } | null>(null);

  const loadDemoData = () => {
    fetch("/api/admin/auth/demo-credentials")
      .then((res) => res.json())
      .then((data) => setDemoData(data))
      .catch((err) => console.error("Failed to load demo accounts:", err));
  };

  useEffect(() => {
    loadDemoData();
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleResetDatabase = async () => {
    setIsResetting(true);
    setResetMessage(null);
    try {
      const res = await fetch("/api/admin/auth/demo-credentials", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setResetMessage("Demo accounts reset successfully.");
        loadDemoData();
      }
    } catch {
      setResetMessage("Failed to reset accounts.");
    } finally {
      setIsResetting(false);
      setTimeout(() => setResetMessage(null), 3000);
    }
  };

  const commonPass = demoData?.commonPassword || "Admin@IneStyl2026!";

  return (
    <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F5F5F7] hover:bg-[#E5E7EB]/80 text-[#1D1D1F] text-xs font-semibold transition-colors"
      >
        <span className="flex items-center gap-2">
          <KeyRound className="w-3.5 h-3.5 text-[#0071E3]" />
          <span>Demo Administrator Credentials</span>
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[#86868B]">
          <span>{isOpen ? "Hide" : "Show Test Accounts"}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 p-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-sm text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB] gap-2 flex-wrap">
            <div>
              <span className="font-bold text-[#1D1D1F] block text-xs">Pre-Configured Test Accounts</span>
              <span className="text-[11px] text-[#86868B]">Click &ldquo;Quick Sign In&rdquo; to test any administrator role instantly</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#F5F5F7] text-[11px] font-mono font-medium">
                <span>Pass: {commonPass}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(commonPass, "common-pass")}
                  className="hover:text-[#0071E3]"
                  title="Copy password"
                >
                  {copiedKey === "common-pass" ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetDatabase}
                disabled={isResetting}
                className="p-1 text-neutral-400 hover:text-[#0071E3] transition-colors rounded"
                title="Reset test accounts to pristine default state"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? "animate-spin text-[#0071E3]" : ""}`} />
              </button>
            </div>
          </div>

          {resetMessage && (
            <div className="p-2 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[11px] font-medium flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{resetMessage}</span>
            </div>
          )}

          <div className="space-y-2">
            {demoData?.accounts.map((acc, idx) => {
              const is2FA = acc.twoFactorEnabled;
              const isDisabled = acc.status === "disabled";
              const isUnverified = !acc.emailVerified || acc.status === "pending_verification";

              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#F5F5F7]/80 hover:bg-[#F5F5F7] border border-[#E5E7EB] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-[#1D1D1F] text-xs">{acc.name}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          acc.role === "super_admin"
                            ? "bg-[#0071E3]/15 text-[#0071E3]"
                            : "bg-neutral-200 text-[#1D1D1F]"
                        }`}
                      >
                        {acc.role.replace("_", " ")}
                      </span>
                      {isDisabled && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-[#FFF2F2] text-[#D92D20]">
                          Disabled
                        </span>
                      )}
                      {isUnverified && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-[#EFF8FF] text-[#0071E3]">
                          Unverified
                        </span>
                      )}
                      {is2FA && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-amber-50 text-amber-700">
                          2FA Required
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-[#86868B] truncate mt-0.5">{acc.email}</p>
                    <p className="text-[10px] text-[#A1A1A6] mt-0.5">
                      {is2FA
                        ? "Prompts for 6-digit OTP code (demo code displayed on next screen)"
                        : isDisabled
                        ? "Demonstrates deactivated administrator access rejection (403)"
                        : isUnverified
                        ? "Demonstrates mandatory email verification requirement"
                        : "Immediate dashboard clearance"}
                    </p>
                  </div>

                  {onSelectAccount && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onSelectAccount(acc.email, commonPass, false)}
                        className="px-2.5 py-1 rounded-lg border border-[#E5E7EB] bg-white hover:bg-neutral-100 text-[#1D1D1F] text-[11px] font-semibold transition-colors"
                        title="Fill into form inputs"
                      >
                        Fill Form
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectAccount(acc.email, commonPass, true)}
                        className="px-2.5 py-1 rounded-lg bg-[#0071E3] hover:bg-[#0066CC] text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-xs"
                        title="Sign In immediately"
                      >
                        <span>Quick Sign In</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
