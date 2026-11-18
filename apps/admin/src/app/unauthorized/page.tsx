"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, Home, LogIn } from "lucide-react";
import { AdminAuthLayout } from "@/components/admin/auth/AdminAuthLayout";
import { AuthButton } from "@/components/admin/auth/AuthButton";

export default function UnauthorizedPage() {
  return (
    <AdminAuthLayout
      brandStatement="Permission Gate & Access Control."
      supportingText="Strict role-based access control protecting sensitive financial, configuration and customer information."
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-6 text-left"
      >
        <div className="w-12 h-12 rounded-2xl bg-[#FFF2F2] border border-[#FECDCA] text-[#D92D20] flex items-center justify-center shadow-sm">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF2F2] text-[#D92D20] font-mono text-[11px] font-bold">
            ERROR 403 • FORBIDDEN
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
            You don&apos;t have permission to access this page.
          </h2>
          <p className="text-sm text-[#86868B] leading-relaxed">
            Your administrator role does not possess the elevated credentials required to view this section or perform this administrative operation.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs text-[#86868B] space-y-2">
          <p className="font-semibold text-[#1D1D1F]">Why am I seeing this?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Certain security functions require <span className="font-semibold text-[#1D1D1F]">super_admin</span> elevation.</li>
            <li>Your account permissions may have been recently modified by the store administrator.</li>
            <li>If you require access, request elevated role authorization from the head of operations.</li>
          </ul>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link href="/" className="w-full">
            <AuthButton icon={<Home className="w-4 h-4" />}>
              Return to Dashboard
            </AuthButton>
          </Link>
          <Link href="/login" className="w-full">
            <AuthButton variant="secondary" icon={<LogIn className="w-4 h-4" />}>
              Sign In with Other Account
            </AuthButton>
          </Link>
        </div>
      </motion.div>
    </AdminAuthLayout>
  );
}
