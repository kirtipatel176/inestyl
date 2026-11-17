import { Suspense } from "react";
import { Metadata } from "next";
import { AdminAuthLayout } from "@/components/admin/auth/AdminAuthLayout";
import { TwoFactorForm } from "@/components/admin/auth/TwoFactorForm";

export const metadata: Metadata = {
  title: "Two-Factor Verification — iNESTYL OUTLET Admin",
  description: "Second factor authentication verification for administrator access.",
};

export default function TwoFactorPage() {
  return (
    <AdminAuthLayout
      brandStatement="Multi-Factor Identity Defense."
      supportingText="Time-sensitive six-digit challenges and single-use emergency cryptographic recovery keys."
    >
      <Suspense
        fallback={
          <div className="py-12 flex justify-center text-xs text-[#86868B]">
            Initializing security verification...
          </div>
        }
      >
        <TwoFactorForm />
      </Suspense>
    </AdminAuthLayout>
  );
}
