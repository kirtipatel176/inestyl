import { NextResponse } from "next/server";
import {
  bulkUpdateStock,
  bulkUpdatePrices,
  bulkAssign,
  bulkPublish,
  bulkArchive,
} from "@/lib/server-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ids, payload, author } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "Must provide non-empty array of product ids" },
        { status: 400 }
      );
    }

    const currentAuthor = author || "Admin (Kapadwanj)";

    if (action === "stock") {
      const { stockAction, quantity, size } = payload || {};
      const res = bulkUpdateStock(ids, stockAction || "in_stock", quantity, size, currentAuthor);
      return NextResponse.json({ success: true, ...res });
    }

    if (action === "price") {
      const { updateType, value } = payload || {};
      const res = bulkUpdatePrices(ids, updateType || "discount_percent", Number(value), currentAuthor);
      return NextResponse.json({ success: true, ...res });
    }

    if (action === "assign") {
      const res = bulkAssign(ids, payload || {}, currentAuthor);
      return NextResponse.json({ success: true, ...res });
    }

    if (action === "publish") {
      const res = bulkPublish(ids, Boolean(payload?.publish), currentAuthor);
      return NextResponse.json({ success: true, ...res });
    }

    if (action === "archive") {
      const res = bulkArchive(ids, Boolean(payload?.archive), currentAuthor);
      return NextResponse.json({ success: true, ...res });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported bulk action: ${action}` },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute bulk action" },
      { status: 500 }
    );
  }
}
