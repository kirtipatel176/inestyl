import { NextResponse } from "next/server";
import {
  createDatabaseBackup,
  getBackups,
  restoreDatabaseBackup,
  getDatabase,
} from "@/lib/server-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const download = searchParams.get("download") === "true";

    if (download) {
      const db = getDatabase();
      const content = JSON.stringify(db, null, 2);
      return new NextResponse(content, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="inestyl-outlet-backup-${Date.now()}.json"`,
        },
      });
    }

    const backups = getBackups();
    return NextResponse.json({ success: true, count: backups.length, backups });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch backups" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, reason, backupId, author } = body;

    const currentAuthor = author || "Admin (Kapadwanj)";

    if (action === "create") {
      const snapshot = createDatabaseBackup(currentAuthor, reason || "Manual Snapshot");
      return NextResponse.json({ success: true, snapshot });
    }

    if (action === "restore") {
      if (!backupId) {
        return NextResponse.json(
          { success: false, error: "Must specify backupId to restore" },
          { status: 400 }
        );
      }

      const success = restoreDatabaseBackup(backupId, currentAuthor);
      if (!success) {
        return NextResponse.json(
          { success: false, error: "Failed to restore backup snapshot. Snapshot not found or corrupted." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Successfully restored database to snapshot ${backupId}. Storefront catalogues live-revalidated.`,
      });
    }

    return NextResponse.json(
      { success: false, error: `Invalid action "${action}". Expected "create" or "restore".` },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process backup operation" },
      { status: 500 }
    );
  }
}
