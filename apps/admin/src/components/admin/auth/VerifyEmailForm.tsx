"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MailCheck, AlertCircle, CheckCircle2, ArrowRight, RefreshCw, Mail } from "lucide-react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { AuthAlert } from "./AuthAlert";

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [isVerifying, setIsVerifying] = useState(Boolean(token));
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    email?: string;
    error?: string;
  } | null>(null);

  // Resend state
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ success: boolean; message: string; debugUrl?: string } | null>(null);

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      return;
    }

    fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        setIsVerifying(false);
        setVerificationResult(data);
      })
      .catch(() => {
        setIsVerifying(false);
        setVerificationResult({
          success: false,
          error: "Network error occurred while verifying your email.",
        });
      });
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resendEmail)) {
      setResendStatus({ success: false, message: "Please provide a valid administrator email address." });
      return;
    }

    setIsResending(true);
    setResendStatus(null);

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail.trim() }),
      });

      const data = await res.json();
      setIsResending(false);
      setResendStatus({
        success: data.success,
        message: data.message || data.error || "Processed verification request.",
        debugUrl: data.debugVerifyUrl,
      });
    } catch {
      setIsResending(false);
      setResendStatus({ success: false, message: "Network error while requesting verification link." });
    }
  };

  // State 1: Verifying active token
  if (isVerifying) {
    return (
      <div className="py-12 space-y-4 text-center">
        <div className="w-10 h-10 mx-auto border-3 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
        <h3 className="text-lg font-bold text-[#1D1D1F]">Verifying Administrator Email</h3>
        <p className="text-xs text-[#86868B]">Validating your single-use verification token...</p>
      </div>
    );
  }

  // State 2: Verification Success
  if (verificationResult?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 text-left"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Email Successfully Verified
          </h2>
          <p className="text-sm text-[#86868B] leading-relaxed">
            Your administrator account (<span className="font-semibold text-[#1D1D1F]">{verificationResult.email}</span>) is now active and authorized to access the management portal.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/login">
            <AuthButton icon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Sign In
            </AuthButton>
          </Link>
        </div>
      </motion.div>
    );
  }

  // State 3: Verification Failure with Token
  if (verificationResult && !verificationResult.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 text-left"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#FFF2F2] border border-[#FECDCA] text-[#D92D20] flex items-center justify-center shadow-sm">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Verification Link Expired
          </h2>
          <p className="text-sm text-[#86868B] leading-relaxed">
            {verificationResult.error || "This verification link is invalid or has already been used."}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs text-[#86868B] space-y-2">
          <p>You can request a fresh verification link below:</p>
          <form onSubmit={handleResend} className="space-y-3 pt-1">
            <AuthInput
              label="Administrator Email"
              type="email"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
              placeholder="newjoiner@inestyl.com"
              icon={<Mail className="w-4 h-4" />}
            />
            <AuthButton
              type="submit"
              isLoading={isResending}
              loadingText="Sending link..."
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Resend Verification Link
            </AuthButton>
          </form>
        </div>

        {resendStatus && (
          <AuthAlert
            type={resendStatus.success ? "success" : "error"}
            message={resendStatus.message}
          />
        )}

        <div className="pt-2">
          <Link href="/login">
            <AuthButton variant="secondary">Return to Sign In</AuthButton>
          </Link>
        </div>
      </motion.div>
    );
  }

  // State 4: Default landing (e.g. redirected here after trying to log into unverified account)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-left"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#EFF8FF] border border-[#B2DDFF] text-[#0071E3] flex items-center justify-center shadow-sm">
        <MailCheck className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
          Email Verification Required
        </h2>
        <p className="text-sm text-[#86868B] leading-relaxed">
          Before logging into the INESTYLE OUTLET management system, your administrator email address must be verified.
        </p>
      </div>

      {resendStatus && (
        <AuthAlert
          type={resendStatus.success ? "success" : "error"}
          message={resendStatus.message}
        />
      )}

      {resendStatus?.debugUrl && (
        <div className="p-3 rounded-xl bg-[#EFF8FF] border border-[#B2DDFF] space-y-1.5 text-xs">
          <span className="font-bold text-[#175CD3] block">Test Simulation Link:</span>
          <Link
            href={resendStatus.debugUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0071E3] text-white font-semibold hover:bg-[#0066CC] transition-colors"
          >
            <span>Complete Email Verification</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      <form onSubmit={handleResend} className="space-y-4">
        <AuthInput
          label="Administrator Email"
          type="email"
          placeholder="newjoiner@inestyl.com"
          value={resendEmail}
          onChange={(e) => setResendEmail(e.target.value)}
          icon={<Mail className="w-4 h-4" />}
          required
        />

        <AuthButton
          type="submit"
          isLoading={isResending}
          loadingText="Dispatching verification..."
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Resend Verification Email
        </AuthButton>
      </form>

      <div className="pt-2 text-center">
        <Link
          href="/login"
          className="text-xs font-semibold text-[#86868B] hover:text-[#0071E3] transition-colors"
        >
          Return to Sign In
        </Link>
      </div>
    </motion.div>
  );
}
