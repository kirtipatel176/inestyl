import { ReactNode } from "react";
import { getServerAdminSession } from "@/lib/auth/session";
import { AdminAuthProvider } from "@/components/admin/auth/AdminAuthProvider";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = await getServerAdminSession();

  return (
    <AdminAuthProvider initialUser={user}>
      {children}
    </AdminAuthProvider>
  );
}
