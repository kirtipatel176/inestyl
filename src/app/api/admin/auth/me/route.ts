import { NextResponse } from "next/server";
import { getServerAdminSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const { user, session } = await getServerAdminSession();
    if (!user || !session) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user,
      session: {
        createdAt: session.createdAt,
        expiresAt: session.expiresAt,
        rememberDevice: session.rememberDevice,
      },
    });
  } catch (err) {
    console.error("Auth me error:", err);
    return NextResponse.json(
      { authenticated: false, error: "Failed to resolve session." },
      { status: 500 }
    );
  }
}
