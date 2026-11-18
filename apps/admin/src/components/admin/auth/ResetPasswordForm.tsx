"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, ShieldAlert, ArrowRight } from "lucide-react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { AuthAlert } from "./AuthAlert";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  // Token validation state
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [accountEmail, setAccountEmail] = useState("");

  // Form input states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [generalError, setGeneralError] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setIsValidatingToken(false);
      setIsTokenValid(false);
      setTokenError("Missing password reset token. Please request a new link.");
      return;
    }

    fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        setIsValidatingToken(false);
        if (data.valid) {
          setIsTokenValid(true);
          setAccountEmail(data.email || "");
        } else {
          setIsTokenValid(false);
          setTokenError(data.error || "Password reset token is invalid or has expired.");
        }
      })
      .catch(() => {
        setIsValidatingToken(false);
        setIsTokenValid(false);
        setTokenError("Network error while verifying reset token.");
      });
  }, [token]);

  const validate = (): boolean => {
    let valid = true;
    setPasswordError("");
    setConfirmError("");
    setGeneralError("");

    if (!password) {
      setPasswordError("New password is required.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      setPasswordError("Password does not meet all security requirements.");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmError("Please confirm your new password.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setGeneralError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setGeneralError(data.error || "Failed to update password. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch {
      setGeneralError("A network error occurred while updating your password.");
      setIsSubmitting(false);
    }
  };

  // 1. Loading state while verifying token
  if (isValidatingToken) {
    return (
      <div className="py-12 space-y-3 text-center">
        <div className="w-8 h-8 mx-auto border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#86868B] font-medium">Validating security token...</p>
      </div>
    );
  }

  // 2. Invalid or Expired Token State
  if (!isTokenValid) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 text-left"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#FFF2F2] border border-[#FECDCA] text-[#D92D20] flex items-center justify-center shadow-sm">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
            Reset Link Expired or Invalid
          </h2>
          <p className="text-sm text-[#86868B] leading-relaxed">
            {tokenError || "This password reset token has expired or has already been used."}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs text-[#86868B] space-y-1">
          <p>For your security, reset links are single-use and expire within 15 minutes of being issued.</p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link href="/forgot-password" className="w-full">
            <AuthButton>Request New Reset Link</AuthButton>
          </Link>
          <Link href="/login" className="w-full">
            <AuthButton variant="secondary">Return to Sign In</AuthButton>
          </Link>
        </div>
      </motion.div>
    );
  }

  // 3. Success State
  if (isSuccess) {
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
            Password Updated
          </h2>
          <p className="text-sm text-[#86868B] leading-relaxed">
            Your administrator password has been updated successfully. All active sessions have been invalidated for security.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/login">
            <AuthButton icon={<ArrowRight className="w-4 h-4" />}>
              Sign In with New Password
            </AuthButton>
          </Link>
        </div>
      </motion.div>
    );
  }

  // 4. Reset Password Form
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6 text-left"
    >
      <div>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86868B] hover:text-[#0071E3] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
          Reset your password
        </h2>
        <p className="text-sm text-[#86868B] leading-relaxed">
          Create a strong, unique password for <span className="font-semibold text-[#1D1D1F]">{accountEmail}</span>.
        </p>
      </div>

      <AnimatePresence>
        {generalError && (
          <AuthAlert
            type="error"
            message={generalError}
            onDismiss={() => setGeneralError("")}
          />
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* New Password */}
        <AuthInput
          label="New Password"
          isPassword
          autoComplete="new-password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          error={passwordError}
          icon={<Lock className="w-4 h-4" />}
          disabled={isSubmitting}
          required
        />

        {/* Live Password Strength Meter */}
        <PasswordStrengthMeter password={password} />

        {/* Confirm Password */}
        <AuthInput
          label="Confirm New Password"
          isPassword
          autoComplete="new-password"
          placeholder="••••••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (confirmError) setConfirmError("");
          }}
          error={confirmError}
          icon={<Lock className="w-4 h-4" />}
          disabled={isSubmitting}
          required
        />

        <div className="pt-2">
          <AuthButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Updating password..."
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            Update Password
          </AuthButton>
        </div>
      </form>
    </motion.div>
  );
}
