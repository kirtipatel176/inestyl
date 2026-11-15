import { Metadata } from "next";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Management — iNESTYL OUTLET",
  description:
    "Flagship store inventory management: footwear, clothing, brand representations, collections, and customer enquiries.",
};

export default function AdminPage() {
  return (
    <div className="container-luxury py-8 sm:py-12">
      <AdminDashboardClient />
    </div>
  );
}

