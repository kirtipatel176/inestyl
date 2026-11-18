"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ShieldCheck, ArrowRight, Clock, RefreshCw } from "lucide-react";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { AuthAlert } from "./AuthAlert";
import { DemoCredentialsModal } from "./DemoCredentialsModal";
import { apiClient } from "@/lib/api-client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";
  const isExpiredSession = searchParams.get("expired") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);

  // Validation & Error States
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [lockoutSeconds, setLockoutSeconds] = useState<number | null>(null);

  // Loading & Success States
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live countdown timer if locked out
  useEffect(() => {
    if (lockoutSeconds === null || lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev === null || prev <= 1) return null;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  // Client-side quick field validation
  const validateForm = (targetEmail = email, targetPass = password): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    const trimmedEmail = targetEmail.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    const isUsername = /^[a-zA-Z0-9._-]{3,50}$/.test(trimmedEmail);

    if (!trimmedEmail) {
      setEmailError("Email address or username is required.");
      isValid = false;
    } else if (!isEmail && !isUsername) {
      setEmailError("Please enter a valid administrator email address or username.");
      isValid = false;
    }

    if (!targetPass) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    return isValid;
  };

  const executeLogin = async (loginEmail: string, loginPass: string, remember: boolean) => {
    setIsLoading(true);
    setGeneralError("");

    const res = await apiClient<any>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: loginEmail.trim(),
        password: loginPass,
        rememberDevice: remember,
      }),
      idempotent: false,
    });

    if (res.ok && res.data?.success) {
      // Success -> Redirect to dashboard with full page reload to ensure fresh cookie propagation
      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = returnUrl;
      }, 250);
      return;
    }

    const data = res.data;

    if (data?.requires2FA) {
      // Route seamlessly to Two-Factor Verification screen
      sessionStorage.setItem("inestyl_2fa_masked", data.maskedEmail || "");
      if (data.debugCode) {
        sessionStorage.setItem("inestyl_2fa_debug", data.debugCode);
      }
      router.push(`/two-factor?challengeId=${data.challengeId}&returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }

    if (data?.retryAfterSeconds) {
      setLockoutSeconds(data.retryAfterSeconds);
    }

    if (res.status === 0 || res.status === 408) {
      setGeneralError("A network error occurred while connecting to the authentication server. Please check your connection and try again.");
    } else {
      setGeneralError(
        data?.error || res.error?.userMessage || "Authentication failed. Please verify credentials."
      );
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await executeLogin(email, password, rememberDevice);
  };

  const handleAutofill = (demoEmail: string, demoPass: string, autoSubmit = false) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (autoSubmit) {
      executeLogin(demoEmail, demoPass, rememberDevice);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Session Expired Banner */}
      {isExpiredSession && (
        <AuthAlert
          type="warning"
          title="Session Expired"
          message="Your administrative session has timed out due to inactivity. For your security, please sign in again."
        />
      )}

      {/* Header */}
      <div className="space-y-2 text-left">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
          Welcome back
        </h2>
        <p className="text-sm text-[#86868B] font-normal leading-relaxed">
          Sign in to your administration account.
        </p>
      </div>

      {/* General Error / Lockout Banner */}
      <AnimatePresence>
        {generalError && (
          <AuthAlert
            type="error"
            title={lockoutSeconds ? "Account Temporarily Locked" : undefined}
            message={
              lockoutSeconds
                ? `${generalError} Lockout expires in ${Math.floor(lockoutSeconds / 60)}m ${lockoutSeconds % 60}s.`
                : generalError
            }
            onDismiss={() => setGeneralError("")}
          />
        )}
      </AnimatePresence>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email Address or Username */}
        <AuthInput
          label="Email address or username"
          type="text"
          autoComplete="username"
          placeholder="admin@inestyl.com or admin"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          error={emailError}
          icon={<Mail className="w-4 h-4" />}
          disabled={isLoading || isSuccess}
          required
        />

        {/* Password */}
        <AuthInput
          label="Password"
          isPassword
          autoComplete="current-password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          error={passwordError}
          icon={<Lock className="w-4 h-4" />}
          rightAction={
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#0071E3] hover:underline focus:outline-none"
              tabIndex={-1}
            >
              Forgot password?
            </Link>
          }
          disabled={isLoading || isSuccess}
          required
        />

        {/* Remember Device & Security Indicator */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              disabled={isLoading || isSuccess}
              className="w-4 h-4 rounded border-[#E5E7EB] text-[#0071E3] focus:ring-[#0071E3]/25 transition-colors cursor-pointer"
            />
            <span className="text-xs font-medium text-[#1D1D1F]">Remember this device</span>
          </label>

          <span className="text-[11px] text-[#86868B] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#0071E3]" />
            <span>30 days</span>
          </span>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <AuthButton
            type="submit"
            isLoading={isLoading}
            loadingText="Verifying credentials..."
            disabled={isSuccess || (lockoutSeconds !== null && lockoutSeconds > 0)}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {isSuccess ? "Authentication Confirmed" : "Sign In"}
          </AuthButton>
        </div>
      </form>

      {/* Demo Credentials Quick-Fill Drawer */}
      <DemoCredentialsModal onSelectAccount={handleAutofill} />
    </motion.div>
  );
}
