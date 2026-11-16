import { NextRequest, NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { safeDeleteMediaAsset, updateMediaMetadata } from "@/lib/server-media";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string[] }> }
) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const publicId = resolvedParams.id.join("/");

    await safeDeleteMediaAsset(publicId);

    return NextResponse.json({
      success: true,
      message: `Media asset ${publicId} successfully deleted.`,
    });
  } catch (error: any) {
    console.error("DELETE /api/admin/media error:", error);
    const status = error.message.includes("actively referenced") ? 409 : 400;
    return NextResponse.json({ error: error.message || "Failed to delete media" }, { status });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string[] }> }
) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const publicId = resolvedParams.id.join("/");
    const body = await request.json();

    const updated = updateMediaMetadata(publicId, {
      altText: body.altText,
      folder: body.folder,
    });

    return NextResponse.json({
      success: true,
      asset: updated,
    });
  } catch (error: any) {
    console.error("PATCH /api/admin/media error:", error);
    return NextResponse.json({ error: error.message || "Failed to update media" }, { status: 400 });
  }
}
