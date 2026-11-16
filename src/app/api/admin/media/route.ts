import { NextRequest, NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { getMediaAssets, processAndUploadMedia } from "@/lib/server-media";

export async function GET(request: NextRequest) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");
    const query = searchParams.get("q")?.toLowerCase();

    let assets = getMediaAssets();

    if (folder && folder !== "all") {
      assets = assets.filter((a) => a.folder.startsWith(folder) || a.category === folder);
    }

    if (query) {
      assets = assets.filter(
        (a) =>
          a.publicId.toLowerCase().includes(query) ||
          a.altText.toLowerCase().includes(query) ||
          a.folder.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      total: assets.length,
      assets,
    });
  } catch (error: any) {
    console.error("GET /api/admin/media error:", error);
    return NextResponse.json({ error: error.message || "Failed to load media" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "inestyle-outlet/products";
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const asset = await processAndUploadMedia({
      buffer,
      filename: file.name,
      mimeType: file.type,
      folder,
      altText,
    });

    return NextResponse.json({
      success: true,
      asset,
    });
  } catch (error: any) {
    console.error("POST /api/admin/media error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 400 });
  }
}
