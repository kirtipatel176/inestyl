import { Suspense } from "react";
import { Metadata } from "next";
import { AdminAuthLayout } from "@/components/admin/auth/AdminAuthLayout";
import { ResetPasswordForm } from "@/components/admin/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — iNESTYL OUTLET Admin",
  description: "Set a new secure password for your administrator account.",
};

export default function ResetPasswordPage() {
  return (
    <AdminAuthLayout
      brandStatement="Secure Credential Lifecycle."
      supportingText="Robust password policy enforcement with cryptographic hashing and session invalidation."
    >
      <Suspense
        fallback={
          <div className="py-12 flex justify-center text-xs text-[#86868B]">
            Validating reset token...
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AdminAuthLayout>
  );
}
