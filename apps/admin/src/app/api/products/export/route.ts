import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { ProductRepository, createServiceClient } from "@inestyle/database";

export async function GET(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!hasPermission([user.role], "products.read") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires products.read permission" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "csv";
    const statusFilter = searchParams.get("status");

    const supabase = createServiceClient();
    const repo = new ProductRepository(supabase);
    const { data: allProducts } = await repo.getProducts({ includeAllStatus: true, limit: 1000 });

    let products = allProducts;
    if (statusFilter) {
      products = products.filter((p) => p.status === statusFilter);
    }

    if (format === "json") {
      return NextResponse.json({ success: true, count: products.length, products });
    }

    // Generate CSV
    const headers = [
      "SKU",
      "Title",
      "Brand",
      "Category",
      "Subcategory",
      "Department",
      "Gender",
      "MRP",
      "OutletPrice",
      "DiscountPercent",
      "Sizes",
      "InStockSizes",
      "Colours",
      "Status",
      "IsNew",
      "IsFeatured",
      "HasVideo",
      "Image",
      "Description",
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvRows = [headers.join(",")];

    for (const p of products) {
      const row = [
        escapeCsv(p.sku),
        escapeCsv(p.title),
        escapeCsv(p.brand),
        escapeCsv(p.category),
        escapeCsv(p.subcategory || ""),
        escapeCsv(p.type),
        escapeCsv(p.gender),
        p.mrp,
        p.outletPrice,
        p.discount,
        escapeCsv((p.sizes || []).join("; ")),
        escapeCsv((p.inStockSizes || []).join("; ")),
        escapeCsv((p.colours || []).map((c) => c.name).join("; ")),
        escapeCsv(p.status || "published"),
        p.isNew ? "TRUE" : "FALSE",
        p.isFeatured ? "TRUE" : "FALSE",
        p.hasVideo ? "TRUE" : "FALSE",
        escapeCsv(p.image),
        escapeCsv(p.description),
      ];
      csvRows.push(row.join(","));
    }

    const csvContent = csvRows.join("\r\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="inestyle-products-${Date.now()}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to export products" },
      { status: 500 }
    );
  }
}
