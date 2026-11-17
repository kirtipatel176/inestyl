import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAdminSession } from "@/lib/auth/session";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Management Console — iNESTYL OUTLET Flagship",
  description:
    "Flagship store inventory management: footwear, clothing, brand representations, collections, navigation manager, size guides, event analytics, and customer enquiries.",
};

export default async function AdminRootPage() {
  const { user } = await getServerAdminSession();

  if (!user) {
    redirect("/login");
  }

  return <AdminDashboardClient />;
}
