import { NextRequest, NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { createPasswordResetToken } from "@/lib/auth/admin-auth-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = forgotPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid email address";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;
    const { token } = createPasswordResetToken(email);

    // Security best practice: Always return generic response to prevent account enumeration
    return NextResponse.json({
      success: true,
      message:
        "If an administrator account exists for this email, we have dispatched a single-use password reset link. Please check your inbox and spam folder.",
      // In development mode, provide the token for instant testing
      debugToken: process.env.NODE_ENV !== "production" && token ? token : undefined,
      debugResetUrl:
        process.env.NODE_ENV !== "production" && token
          ? `/admin/reset-password?token=${token}`
          : undefined,
    });
  } catch (err) {
    console.error("Forgot password API error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
