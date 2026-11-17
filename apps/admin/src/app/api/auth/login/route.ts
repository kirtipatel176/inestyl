import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/auth/schemas";
import { authenticateAdmin } from "@/lib/auth/admin-auth-service";
import { attachSessionCookie } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid input data";
      return NextResponse.json(
        { success: false, error: firstError, code: "INVALID_CREDENTIALS" },
        { status: 400 }
      );
    }

    const { email, password, rememberDevice } = parseResult.data;
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    const result = authenticateAdmin(email, password, rememberDevice, clientIp, userAgent);

    if (!result.success) {
      if (result.requires2FA) {
        return NextResponse.json({
          success: false,
          requires2FA: true,
          challengeId: result.challengeId,
          maskedEmail: result.maskedEmail,
          cooldownRemaining: result.cooldownRemaining,
          debugCode: result.debugCode,
        });
      }

      const statusCode = result.code === "RATE_LIMITED" ? 429 : result.code === "ACCOUNT_DISABLED" ? 403 : 401;
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          code: result.code,
          retryAfterSeconds: result.retryAfterSeconds,
        },
        { status: statusCode }
      );
    }

    // Successfully authenticated -> set HTTP-only cookie on response
    const response = NextResponse.json({
      success: true,
      user: result.user,
      redirectUrl: "/admin",
    });

    attachSessionCookie(response, result.session);
    return response;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected authentication error occurred.", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
