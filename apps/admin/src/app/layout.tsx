import { ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import { AdminAuthProvider } from "@/components/admin/auth/AdminAuthProvider";
import { NetworkStatusProvider } from "@/components/providers/NetworkStatusProvider";
import { RouteProgressLoader } from "@/components/ui/RouteProgressLoader";
import "./globals.css";

export const metadata: Metadata = {
  title: "iNESTYL OUTLET — Admin Operations Portal",
  description: "Secure administrative management dashboard for iNESTYL OUTLET.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] antialiased">
        <NetworkStatusProvider>
          <Suspense fallback={null}>
            <RouteProgressLoader />
          </Suspense>
          <AdminAuthProvider>
            {children}
          </AdminAuthProvider>
        </NetworkStatusProvider>
      </body>
    </html>
  );
}
