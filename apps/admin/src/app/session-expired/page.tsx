"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, LogIn, ShieldCheck } from "lucide-react";
import { AdminAuthLayout } from "@/components/admin/auth/AdminAuthLayout";
import { AuthButton } from "@/components/admin/auth/AuthButton";

export default function SessionExpiredPage() {
  return (
    <AdminAuthLayout
      brandStatement="Session Integrity & Protection."
      supportingText="Automated inactivity termination safeguarding store operations against unattended console access."
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-6 text-left"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] flex items-center justify-center shadow-sm">
          <Clock className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] font-mono text-[11px] font-bold">
            SECURITY TIMEOUT
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
            Your session has expired
          </h2>
          <p className="text-sm text-[#86868B] leading-relaxed">
            For your security and store data protection, administrator sessions automatically terminate following an idle period.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs text-[#86868B] space-y-2">
          <div className="flex items-center gap-2 text-[#1D1D1F] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0071E3]" />
            <span>Zero Data Leak Guarantee</span>
          </div>
          <p>
            Private operational tokens and customer data have been cleared from this browser session. Please authenticate again to resume your management tasks.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/login">
            <AuthButton icon={<LogIn className="w-4 h-4" />}>
              Sign In Again
            </AuthButton>
          </Link>
        </div>
      </motion.div>
    </AdminAuthLayout>
  );
}
