import { Suspense } from "react";
import { Metadata } from "next";
import { AdminAuthLayout } from "@/components/admin/auth/AdminAuthLayout";
import { VerifyEmailForm } from "@/components/admin/auth/VerifyEmailForm";

export const metadata: Metadata = {
  title: "Verify Email — iNESTYL OUTLET Admin",
  description: "Verify your administrator email address for INESTYLE OUTLET console access.",
};

export default function VerifyEmailPage() {
  return (
    <AdminAuthLayout
      brandStatement="Verified Identity & Clearance."
      supportingText="Confirm your authorized corporate email to activate administrative privileges."
    >
      <Suspense
        fallback={
          <div className="py-12 flex justify-center text-xs text-[#86868B]">
            Checking verification token...
          </div>
        }
      >
        <VerifyEmailForm />
      </Suspense>
    </AdminAuthLayout>
  );
}
