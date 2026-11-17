"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, Send, CheckCircle2, RefreshCw } from "lucide-react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { AuthAlert } from "./AuthAlert";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [debugUrl, setDebugUrl] = useState<string | null>(null);

  const validate = (): boolean => {
    setEmailError("");
    setGeneralError("");
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email address is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid administrator email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setGeneralError("");

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setGeneralError(data.error || "Failed to process request. Please try again.");
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      if (data.debugResetUrl) {
        setDebugUrl(data.debugResetUrl);
      }
      setIsLoading(false);
    } catch {
      setGeneralError("A network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Return to login link */}
      <div>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86868B] hover:text-[#0071E3] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="space-y-2 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                Forgot your password?
              </h2>
              <p className="text-sm text-[#86868B] font-normal leading-relaxed">
                Enter your administrator email address. We will generate a secure, single-use password reset link.
              </p>
            </div>

            {/* Error Banner */}
            {generalError && (
              <AuthAlert
                type="error"
                message={generalError}
                onDismiss={() => setGeneralError("")}
              />
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <AuthInput
                label="Email address"
                type="email"
                autoComplete="email"
                placeholder="admin@inestyl.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                error={emailError}
                icon={<Mail className="w-4 h-4" />}
                disabled={isLoading}
                required
              />

              <div className="pt-2">
                <AuthButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Dispatching reset link..."
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Reset Link
                </AuthButton>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-left"
          >
            {/* Apple-style Confirmation Badge */}
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
                Reset Instructions Sent
              </h2>
              <p className="text-sm text-[#86868B] font-normal leading-relaxed">
                If an administrator account exists for <span className="font-semibold text-[#1D1D1F]">{email}</span>, a secure password reset link has been dispatched.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs space-y-2 text-[#86868B]">
              <p>• The reset link is valid for <span className="font-semibold text-[#1D1D1F]">15 minutes</span>.</p>
              <p>• For security, reset links are single-use and expire immediately after use.</p>
              <p>• Check your spam or quarantine folder if you do not see the email within 2 minutes.</p>
            </div>

            {/* In Development/Preview, provide instant link to test reset screen! */}
            {debugUrl && (
              <div className="p-3.5 rounded-xl bg-[#EFF8FF] border border-[#B2DDFF] space-y-2 text-xs">
                <span className="font-bold text-[#175CD3] block">Test Simulation Link:</span>
                <Link
                  href={debugUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0071E3] text-white font-semibold hover:bg-[#0066CC] transition-colors"
                >
                  <span>Open Reset Password Screen</span>
                  <Send className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link href="/admin/login" className="w-full">
                <AuthButton variant="secondary">Return to Sign In</AuthButton>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setDebugUrl(null);
                }}
                className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#86868B]" />
                <span>Try Another Email</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
