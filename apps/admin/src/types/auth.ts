export type AdminRole = "super_admin" | "admin" | "inventory_manager";

export type AdminUserStatus = "active" | "disabled" | "pending_verification";

export interface AdminUser {
  id: string;
  email: string;
  username?: string;
  fullName: string;
  role: AdminRole;
  status: AdminUserStatus;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  passwordHash: string;
  passwordSalt: string;
  backupCodes: string[];
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SafeAdminUser = Omit<AdminUser, "passwordHash" | "passwordSalt" | "backupCodes">;

export interface AdminSession {
  token: string;
  adminId: string;
  email: string;
  fullName: string;
  role: AdminRole;
  rememberDevice: boolean;
  createdAt: number;
  expiresAt: number;
  userAgent?: string;
  ip?: string;
}

export interface PasswordResetToken {
  token: string;
  adminId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  used: boolean;
}

export interface TwoFactorChallenge {
  challengeId: string;
  adminId: string;
  email: string;
  code: string;
  createdAt: number;
  expiresAt: number;
  cooldownUntil: number;
  attempts: number;
  rememberDevice: boolean;
}

export interface EmailVerificationToken {
  token: string;
  adminId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  used: boolean;
}

export interface RateLimitEntry {
  attempts: number;
  lockedUntil: number | null;
  lastAttemptAt: number;
}

export interface AdminAuthDatabase {
  users: AdminUser[];
  sessions: AdminSession[];
  resetTokens: PasswordResetToken[];
  twoFactorChallenges: TwoFactorChallenge[];
  verificationTokens: EmailVerificationToken[];
  rateLimits: Record<string, RateLimitEntry>;
}

export interface AuthSuccessResponse {
  success: true;
  user: SafeAdminUser;
  requires2FA?: false;
  redirectUrl?: string;
}

export interface Auth2FARequiredResponse {
  requires2FA: true;
  challengeId: string;
  maskedEmail: string;
  cooldownRemaining: number;
  debugCode?: string; // only in dev for testing
}

export interface AuthErrorResponse {
  success: false;
  error: string;
  code?: "INVALID_CREDENTIALS" | "ACCOUNT_DISABLED" | "EMAIL_NOT_VERIFIED" | "RATE_LIMITED" | "INVALID_2FA" | "INVALID_TOKEN" | "SERVER_ERROR";
  retryAfterSeconds?: number;
}
