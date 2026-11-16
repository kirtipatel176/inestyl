import { NextResponse } from "next/server";
import { getAuthDb, resetDemoAccounts, COMMON_DEMO_PASSWORD } from "@/lib/auth/admin-auth-service";

export async function GET() {
  const db = getAuthDb();
  const accounts = db.users.map((u) => ({
    email: u.email,
    role: u.role,
    name: u.fullName,
    status: u.status,
    twoFactorEnabled: u.twoFactorEnabled,
    emailVerified: u.emailVerified,
    sampleBackupCode: u.backupCodes && u.backupCodes.length > 0 ? u.backupCodes[0] : "SEC-7788-9900",
  }));

  return NextResponse.json({
    commonPassword: COMMON_DEMO_PASSWORD,
    accounts,
    twoFactorChallenges: db.twoFactorChallenges.map((c) => ({
      email: c.email,
      challengeId: c.challengeId,
      code: c.code,
      expiresAt: c.expiresAt,
    })),
    resetTokens: db.resetTokens
      .filter((t) => !t.used && t.expiresAt > Date.now())
      .map((t) => ({
        email: t.email,
        token: t.token,
        url: `/admin/reset-password?token=${t.token}`,
      })),
  });
}

export async function POST() {
  // Allows resetting demo accounts to pristine state anytime
  const db = resetDemoAccounts();
  return NextResponse.json({
    success: true,
    message: "Demo administrator accounts have been restored to default state.",
    accountsCount: db.users.length,
  });
}
