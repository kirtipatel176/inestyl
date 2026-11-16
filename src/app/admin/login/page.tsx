import { Suspense } from "react";
import { Metadata } from "next";
import { AdminAuthLayout } from "@/components/admin/auth/AdminAuthLayout";
import { LoginForm } from "@/components/admin/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — iNESTYL OUTLET",
  description: "Secure administrator sign-in for INESTYLE OUTLET flagship management console.",
};

export default function AdminLoginPage() {
  return (
    <AdminAuthLayout
      brandStatement="Your Store. Your Control."
      supportingText="Manage products, inventory, collections and your digital storefront from one place."
    >
      <Suspense
        fallback={
          <div className="py-12 flex justify-center text-xs text-[#86868B]">
            Loading authentication portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AdminAuthLayout>
  );
}
