import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@inestyle/permissions";
import { ProductRepository, createServiceClient, logActivityMutation } from "@inestyle/database";
import { ImportError, ImportValidationResult } from "@/types";

export async function POST(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    if (!hasPermission([user.role], "products.create") && user.role !== "super_admin" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Requires products.create permission" }, { status: 403 });
    }

    const body = await request.json();
    const { action, rows, products, author } = body;
    const supabase = createServiceClient();
    const currentAuthor = author || user.fullName || "Staff Member";

    if (action === "validate") {
      if (!rows || !Array.isArray(rows)) {
        return NextResponse.json(
          { success: false, error: "Must provide rows array to validate" },
          { status: 400 }
        );
      }

      // Query existing SKUs from Supabase
      const { data: existingRows } = await supabase.from("products").select("sku");
      const existingSkus = new Set((existingRows || []).map((r) => r.sku?.toUpperCase()));
      const seenSkusInFile = new Set<string>();

      const validRows: any[] = [];
      const errorRows: ImportError[] = [];

      rows.forEach((row, idx) => {
        const rowNum = idx + 2;
        const sku = (row.sku || row.SKU || "").trim();
        const title = (row.title || row.Title || row.name || row.Name || "").trim();
        const brand = (row.brand || row.Brand || "").trim();
        const mrp = Number(row.mrp || row.MRP);
        const outletPrice = Number(row.outletPrice || row.OutletPrice || row.price || row.Price);
        const type = (row.type || row.Type || "footwear").toLowerCase().trim() as "footwear" | "clothing";
        const gender = (row.gender || row.Gender || "Men").trim() as "Men" | "Women" | "Unisex";

        if (!sku) {
          errorRows.push({ rowNumber: rowNum, sku: "EMPTY", field: "sku", message: "Store SKU is required.", rawData: row });
          return;
        }

        if (existingSkus.has(sku.toUpperCase())) {
          errorRows.push({ rowNumber: rowNum, sku, field: "sku", message: `SKU "${sku}" already exists in the flagship catalogue.`, rawData: row });
          return;
        }

        if (seenSkusInFile.has(sku.toUpperCase())) {
          errorRows.push({ rowNumber: rowNum, sku, field: "sku", message: `Duplicate SKU "${sku}" repeated inside CSV.`, rawData: row });
          return;
        }

        seenSkusInFile.add(sku.toUpperCase());

        if (!title || title.length < 3) {
          errorRows.push({ rowNumber: rowNum, sku, field: "title", message: "Title must be at least 3 characters.", rawData: row });
          return;
        }

        if (!brand) {
          errorRows.push({ rowNumber: rowNum, sku, field: "brand", message: "Brand is required.", rawData: row });
          return;
        }

        if (isNaN(mrp) || mrp <= 0) {
          errorRows.push({ rowNumber: rowNum, sku, field: "mrp", message: "MRP must be a positive number.", rawData: row });
          return;
        }

        if (isNaN(outletPrice) || outletPrice <= 0 || outletPrice > mrp) {
          errorRows.push({ rowNumber: rowNum, sku, field: "outletPrice", message: "Outlet price must be positive and not exceed MRP.", rawData: row });
          return;
        }

        const discount = Math.round(((mrp - outletPrice) / mrp) * 100);
        const sizesStr = row.sizes || row.Sizes || (type === "footwear" ? "7, 8, 9, 10" : "S, M, L, XL");
        const sizes = sizesStr.split(/[,;]/).map((s: string) => s.trim()).filter(Boolean);

        validRows.push({
          sku,
          title,
          brand,
          mrp,
          outletPrice,
          regularPrice: mrp,
          salePrice: outletPrice,
          discount,
          type,
          department: type,
          gender,
          sizes,
          status: "published",
          image: row.image || row.Image || "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270",
          description: row.description || `${brand} ${title} at Kapadwanj flagship store.`,
        });
      });

      const result: ImportValidationResult = {
        totalRows: rows.length,
        validRows,
        errorRows,
        errors: errorRows,
        summary: {
          validCount: validRows.length,
          errorCount: errorRows.length,
        },
      };

      return NextResponse.json({ success: true, result });
    }

    if (action === "commit") {
      if (!products || !Array.isArray(products) || products.length === 0) {
        return NextResponse.json(
          { success: false, error: "Must provide validated products array to commit" },
          { status: 400 }
        );
      }

      const repo = new ProductRepository(supabase);
      let importedCount = 0;

      for (const prod of products) {
        try {
          await repo.createProduct({
            title: prod.title,
            sku: prod.sku,
            brand: prod.brand,
            department: prod.department || prod.type || "footwear",
            subcategory: prod.subcategory || "General",
            gender: prod.gender || "Unisex",
            regularPrice: prod.regularPrice || prod.mrp,
            salePrice: prod.salePrice || prod.outletPrice,
            discount: prod.discount,
            description: prod.description,
            status: prod.status || "published",
            image: prod.image,
            variants: (prod.sizes || ["Standard"]).map((size: string, idx: number) => ({
              size,
              colour: "Default",
              sku: `${prod.sku}-${size}`.toUpperCase().replace(/\s+/g, ""),
              stockQuantity: 5,
              isAvailable: true,
            })),
          });
          importedCount++;
        } catch (e: any) {
          console.error(`Failed to commit imported product ${prod.sku}:`, e.message);
        }
      }

      await logActivityMutation(supabase, {
        userId: user.id,
        action: "csv_import",
        entityType: "product",
        entityId: `import-${importedCount}`,
        authorName: currentAuthor,
        details: `Imported and created ${importedCount} products via CSV`,
      });

      return NextResponse.json({ success: true, importedCount });
    }

    return NextResponse.json(
      { success: false, error: `Invalid action "${action}". Expected "validate" or "commit".` },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process import" },
      { status: 500 }
    );
  }
}
