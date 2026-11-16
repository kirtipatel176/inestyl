import { Metadata } from "next";
import { AdminAuthLayout } from "@/components/admin/auth/AdminAuthLayout";
import { ForgotPasswordForm } from "@/components/admin/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password — iNESTYL OUTLET Admin",
  description: "Request a secure administrator password reset token.",
};

export default function ForgotPasswordPage() {
  return (
    <AdminAuthLayout
      brandStatement="Account Recovery & Access Security."
      supportingText="Secure administrator identity verification and single-use password reset infrastructure."
    >
      <ForgotPasswordForm />
    </AdminAuthLayout>
  );
}
