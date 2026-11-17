import { NextRequest, NextResponse } from "next/server";
import { verifyEmailToken, createEmailVerificationToken } from "@/lib/auth/admin-auth-service";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Verification token is missing." },
      { status: 400 }
    );
  }

  const result = verifyEmailToken(token);
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    email: result.email,
    message: "Administrator email successfully verified.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    const { token } = createEmailVerificationToken(email);

    return NextResponse.json({
      success: true,
      message: "A new email verification link has been dispatched.",
      debugToken: process.env.NODE_ENV !== "production" && token ? token : undefined,
      debugVerifyUrl:
        process.env.NODE_ENV !== "production" && token
          ? `/admin/verify-email?token=${token}`
          : undefined,
    });
  } catch (err) {
    console.error("Resend email verification error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to dispatch verification email." },
      { status: 500 }
    );
  }
}
