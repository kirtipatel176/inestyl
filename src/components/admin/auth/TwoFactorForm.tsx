"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowLeft, RefreshCw, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { OtpInput } from "./OtpInput";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { AuthAlert } from "./AuthAlert";

export function TwoFactorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challengeId") || "";
  const returnUrl = searchParams.get("returnUrl") || "/admin";

  const [maskedEmail, setMaskedEmail] = useState("");
  const [debugCode, setDebugCode] = useState<string | null>(null);

  // Mode: 6-digit OTP code vs Recovery Code
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");

  // Cooldown countdown for resending
  const [cooldown, setCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  // Submission & Feedback
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize from sessionStorage or demo-credentials endpoint
  useEffect(() => {
    const savedMasked = sessionStorage.getItem("inestyl_2fa_masked");
    if (savedMasked) setMaskedEmail(savedMasked);

    const savedDebug = sessionStorage.getItem("inestyl_2fa_debug");
    if (savedDebug) setDebugCode(savedDebug);

    fetch("/api/admin/auth/demo-credentials")
      .then((res) => res.json())
      .then((data) => {
        if (data.twoFactorChallenges && data.twoFactorChallenges.length > 0) {
          const match = data.twoFactorChallenges.find((c: any) => c.challengeId === challengeId);
          if (match && match.code) {
            setDebugCode(match.code);
          } else if (data.twoFactorChallenges[0]?.code) {
            setDebugCode(data.twoFactorChallenges[0].code);
          }
        }
      })
      .catch(() => {});
  }, [challengeId]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleVerify = async (codeToSubmit?: string) => {
    const code = codeToSubmit || (isRecoveryMode ? recoveryCode.trim() : otpCode);
    if (!code) {
      setError(isRecoveryMode ? "Please enter your backup recovery code." : "Please enter the 6-digit code.");
      return;
    }

    if (!challengeId) {
      setError("Challenge ID is missing. Please sign in again.");
      return;
    }

    setIsVerifying(true);
    setError("");
    setInfoMessage("");

    try {
      const res = await fetch("/api/admin/auth/two-factor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId,
          code,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Verification failed. Please check the code and try again.");
        setIsVerifying(false);
        return;
      }

      // Success
      setIsSuccess(true);
      sessionStorage.removeItem("inestyl_2fa_masked");
      sessionStorage.removeItem("inestyl_2fa_debug");

      setTimeout(() => {
        window.location.href = returnUrl;
      }, 400);
    } catch {
      setError("A network error occurred. Please verify your connection.");
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || isResending || !challengeId) return;

    setIsResending(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/two-factor/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to resend code.");
        if (data.cooldownRemaining) setCooldown(data.cooldownRemaining);
        setIsResending(false);
        return;
      }

      setInfoMessage("A new verification code has been dispatched.");
      setCooldown(data.cooldownRemaining || 60);
      if (data.debugCode) {
        setDebugCode(data.debugCode);
      }
      setIsResending(false);
    } catch {
      setError("Network error while requesting code resend.");
      setIsResending(false);
    }
  };

  // Auto-submit when user finishes entering 6 digits in OTP mode
  useEffect(() => {
    if (!isRecoveryMode && otpCode.length === 6) {
      handleVerify(otpCode);
    }
  }, [otpCode, isRecoveryMode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6 text-left"
    >
      <div>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86868B] hover:text-[#0071E3] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & Sign In Again</span>
        </Link>
      </div>

      <div className="space-y-2">
        <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center mb-3">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
          Two-Factor Authentication
        </h2>
        <p className="text-sm text-[#86868B] leading-relaxed">
          {isRecoveryMode ? (
            "Enter one of your emergency recovery codes (e.g. SEC-XXXX-XXXX) to authenticate."
          ) : (
            <>
              Enter the 6-digit verification code sent to{" "}
              <span className="font-semibold text-[#1D1D1F]">
                {maskedEmail || "your registered email"}
              </span>
              .
            </>
          )}
        </p>
      </div>

      <AnimatePresence>
        {error && (
          <AuthAlert
            type="error"
            message={error}
            onDismiss={() => setError("")}
          />
        )}
        {infoMessage && (
          <AuthAlert
            type="info"
            message={infoMessage}
            onDismiss={() => setInfoMessage("")}
          />
        )}
      </AnimatePresence>

      {/* Dev helper: show simulated OTP */}
      {debugCode && !isRecoveryMode && (
        <div className="p-3 rounded-xl bg-[#EFF8FF] border border-[#B2DDFF] flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-[#175CD3] block">Active 2FA Verification Code</span>
            <span className="font-mono text-base font-bold tracking-widest text-[#0071E3]">
              {debugCode}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOtpCode(debugCode)}
            className="px-2.5 py-1 rounded bg-[#0071E3] text-white text-[11px] font-semibold hover:bg-[#0066CC]"
          >
            Autofill Code
          </button>
        </div>
      )}

      {/* Dev helper: show simulated Recovery Code */}
      {isRecoveryMode && (
        <div className="p-3 rounded-xl bg-[#EFF8FF] border border-[#B2DDFF] flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-[#175CD3] block">Test Emergency Backup Key</span>
            <span className="font-mono text-sm font-bold tracking-wider text-[#0071E3]">
              SEC-7788-9900
            </span>
          </div>
          <button
            type="button"
            onClick={() => setRecoveryCode("SEC-7788-9900")}
            className="px-2.5 py-1 rounded bg-[#0071E3] text-white text-[11px] font-semibold hover:bg-[#0066CC]"
          >
            Autofill Recovery Key
          </button>
        </div>
      )}

      {/* Form Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
        className="space-y-5"
      >
        {!isRecoveryMode ? (
          <div className="space-y-2">
            <OtpInput
              value={otpCode}
              onChange={setOtpCode}
              disabled={isVerifying || isSuccess}
              hasError={Boolean(error)}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <AuthInput
              label="Emergency Recovery Code"
              placeholder="SEC-1122-3344"
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
              icon={<Key className="w-4 h-4" />}
              disabled={isVerifying || isSuccess}
              required
            />
            <p className="text-[11px] text-[#86868B]">
              Each recovery code can only be used once. Formats: SEC-XXXX-XXXX or XXXX-XXXX.
            </p>
          </div>
        )}

        {/* Verify Action Button */}
        <AuthButton
          type="submit"
          isLoading={isVerifying}
          loadingText="Verifying security code..."
          disabled={isSuccess || (!isRecoveryMode && otpCode.length !== 6) || (isRecoveryMode && !recoveryCode.trim())}
          icon={isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
        >
          {isSuccess ? "Identity Verified" : "Verify Code"}
        </AuthButton>

        {/* Resend & Recovery Mode Toggle */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E5E7EB]">
          {!isRecoveryMode ? (
            <button
              type="button"
              disabled={cooldown > 0 || isResending || isVerifying}
              onClick={handleResend}
              className="inline-flex items-center gap-1.5 font-semibold text-[#0071E3] hover:underline disabled:text-[#86868B] disabled:no-underline"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
              <span>
                {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend verification code"}
              </span>
            </button>
          ) : (
            <span className="text-[#86868B]">Recovery code mode</span>
          )}

          <button
            type="button"
            onClick={() => {
              setIsRecoveryMode(!isRecoveryMode);
              setError("");
              setInfoMessage("");
            }}
            className="font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
          >
            {isRecoveryMode ? "Use 6-digit code" : "Use recovery code"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
