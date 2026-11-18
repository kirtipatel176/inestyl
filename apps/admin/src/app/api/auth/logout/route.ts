import { NextResponse } from "next/server";
import { clearAdminSessionCookie, attachClearSessionCookie } from "@/lib/auth/session";

export async function POST() {
  try {
    await clearAdminSessionCookie();

    const response = NextResponse.json({
      success: true,
      message: "Successfully signed out.",
      redirectUrl: "/login",
    });

    attachClearSessionCookie(response);
    return response;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to log out cleanly." },
      { status: 500 }
    );
  }
}
