import { NextRequest, NextResponse } from "next/server";
import { twoFactorSchema } from "@/lib/auth/schemas";
import { verifyTwoFactorChallenge } from "@/lib/auth/admin-auth-service";
import { attachSessionCookie } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = twoFactorSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid two-factor submission";
      return NextResponse.json(
        { success: false, error: firstError, code: "INVALID_2FA" },
        { status: 400 }
      );
    }

    const { challengeId, code } = parseResult.data;
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    const result = verifyTwoFactorChallenge(challengeId, code, clientIp, userAgent);

    if (!result.success) {
      const statusCode = result.code === "EXPIRED_2FA" || result.code === "LOCKED_2FA" ? 410 : 400;
      return NextResponse.json(
        { success: false, error: result.error, code: result.code },
        { status: statusCode }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: result.user,
      redirectUrl: "/admin",
    });

    attachSessionCookie(response, result.session);
    return response;
  } catch (err) {
    console.error("Two-factor API error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected verification error occurred.", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
