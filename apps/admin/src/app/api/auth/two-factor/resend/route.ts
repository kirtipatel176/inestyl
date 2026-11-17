import { NextRequest, NextResponse } from "next/server";
import { resendTwoFactorCode } from "@/lib/auth/admin-auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const challengeId = body.challengeId;

    if (!challengeId) {
      return NextResponse.json(
        { success: false, error: "Challenge ID is missing" },
        { status: 400 }
      );
    }

    const result = resendTwoFactorCode(challengeId);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error, cooldownRemaining: result.cooldownRemaining },
        { status: 429 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "A new 6-digit verification code has been dispatched.",
      cooldownRemaining: result.cooldownRemaining,
      debugCode: process.env.NODE_ENV !== "production" ? result.debugCode : undefined,
    });
  } catch (err) {
    console.error("Resend 2FA error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to resend verification code" },
      { status: 500 }
    );
  }
}
