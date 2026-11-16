import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/server-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "csv";
    const statusFilter = searchParams.get("status"); // optional: published, draft, archived

    let products = getAllProducts();
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
        escapeCsv(p.subcategory),
        escapeCsv(p.type),
        escapeCsv(p.gender),
        escapeCsv(p.mrp),
        escapeCsv(p.outletPrice),
        escapeCsv(p.discount),
        escapeCsv(p.sizes?.join("; ") || ""),
        escapeCsv(p.inStockSizes?.join("; ") || ""),
        escapeCsv(p.colours?.map((c) => `${c.name} (${c.hex})`).join("; ") || ""),
        escapeCsv(p.status || "published"),
        escapeCsv(p.isNew ? "Yes" : "No"),
        escapeCsv(p.isFeatured ? "Yes" : "No"),
        escapeCsv(p.hasVideo ? "Yes" : "No"),
        escapeCsv(p.image),
        escapeCsv(p.description),
      ];
      csvRows.push(row.join(","));
    }

    const csvContent = csvRows.join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="inestyl-outlet-catalogue-${Date.now()}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to export catalogue" },
      { status: 500 }
    );
  }
}
