import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";
import { createServiceClient, logActivityMutation } from "@inestyle/database";

export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from("size_guides").select("*");

    if (error) throw new Error(error.message);

    const sizeGuides: Record<string, any> = {};
    (data || []).forEach((row: any) => {
      sizeGuides[row.key] = {
        id: row.id,
        key: row.key,
        title: row.title,
        category: row.category,
        gender: row.gender,
        description: row.description || "",
        measuringTip: row.measuring_tip || "",
        headers: row.headers || [],
        rows: row.rows || [],
        isPublished: row.is_published,
        updatedAt: row.updated_at,
      };
    });

    return NextResponse.json({ success: true, sizeGuides });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch size guides" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user } = await getServerAdminSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { key, guide, author } = body;

    if (!key || !guide) {
      return NextResponse.json(
        { success: false, error: "Must specify guide key and guide data" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (guide.title) updatePayload.title = guide.title;
    if (guide.description) updatePayload.description = guide.description;
    if (guide.measuringTip) updatePayload.measuring_tip = guide.measuringTip;
    if (guide.headers) updatePayload.headers = guide.headers;
    if (guide.rows) updatePayload.rows = guide.rows;
    if (guide.isPublished !== undefined) updatePayload.is_published = guide.isPublished;

    const { data, error } = await supabase
      .from("size_guides")
      .update(updatePayload)
      .eq("key", key)
      .select()
      .single();

    if (error) throw new Error(error.message);

    await logActivityMutation(supabase, {
      userId: user.id,
      action: "size_guide_update",
      entityType: "size_guide",
      entityId: key,
      entityName: guide.title || key,
      authorName: author || user.fullName || "Staff Member",
      details: `Updated ${key} size guide standards`,
    });

    return NextResponse.json({ success: true, guide: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update size guide" },
      { status: 500 }
    );
  }
}
