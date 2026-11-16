import { NextRequest, NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/auth/schemas";
import { verifyPasswordResetToken, executePasswordReset } from "@/lib/auth/admin-auth-service";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  if (!token) {
    return NextResponse.json({ valid: false, error: "Missing reset token" }, { status: 400 });
  }

  const check = verifyPasswordResetToken(token);
  if (!check.valid) {
    return NextResponse.json({ valid: false, error: check.error }, { status: 400 });
  }

  return NextResponse.json({ valid: true, email: check.email });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = resetPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid password update";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { token, password } = parseResult.data;
    const result = executePasswordReset(token, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to update password." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your administrator password has been updated securely. Please sign in with your new password.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while resetting your password." },
      { status: 500 }
    );
  }
}
