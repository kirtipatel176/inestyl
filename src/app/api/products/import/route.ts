import { NextResponse } from "next/server";
import { validateProductImport, commitProductImport } from "@/lib/server-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, rows, products, author } = body;

    if (action === "validate") {
      if (!rows || !Array.isArray(rows)) {
        return NextResponse.json(
          { success: false, error: "Must provide rows array to validate" },
          { status: 400 }
        );
      }

      const result = validateProductImport(rows);
      return NextResponse.json({ success: true, result });
    }

    if (action === "commit") {
      if (!products || !Array.isArray(products) || products.length === 0) {
        return NextResponse.json(
          { success: false, error: "Must provide validated products array to commit" },
          { status: 400 }
        );
      }

      const result = commitProductImport(products, author || "Admin (Kapadwanj)");
      return NextResponse.json({ success: true, ...result });
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
