import defaultAuthDb from "../../data/admin-auth.json";
import {
  AdminAuthDatabase,
  AdminSession,
  AdminUser,
  PasswordResetToken,
  SafeAdminUser,
  TwoFactorChallenge,
  EmailVerificationToken,
} from "@/types/auth";
import {
  hashPassword,
  verifyPassword,
  generateSecureToken,
  generateOtpCode,
  generateBackupCodes,
} from "./crypto";

let memoryAuthDb: AdminAuthDatabase | null = null;

// Rate limit configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window

// Session duration configuration
const SESSION_DEFAULT_MS = 8 * 60 * 60 * 1000; // 8 hours
const SESSION_REMEMBER_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// 2FA configuration
const TWO_FACTOR_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const TWO_FACTOR_COOLDOWN_MS = 60 * 1000; // 60 seconds
const TWO_FACTOR_MAX_ATTEMPTS = 5;

// Password Reset configuration
const RESET_TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

// Email Verification configuration
const VERIFY_TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function toSafeUser(user: AdminUser): SafeAdminUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, passwordSalt, backupCodes, ...safe } = user;
  return safe;
}

export function getAuthDb(): AdminAuthDatabase {
  if (memoryAuthDb) {
    return memoryAuthDb;
  }

  const initialDb: AdminAuthDatabase = JSON.parse(JSON.stringify(defaultAuthDb));
  initialDb.users.forEach((u: AdminUser) => {
    if (!u.username) {
      if (u.role === "super_admin") u.username = "admin";
      else if (u.email === "security@inestyl.com") u.username = "security";
      else if (u.email === "manager@inestyl.com") u.username = "manager";
    }
  });
  if (!initialDb.sessions) initialDb.sessions = [];
  if (!initialDb.resetTokens) initialDb.resetTokens = [];
  if (!initialDb.twoFactorChallenges) initialDb.twoFactorChallenges = [];
  if (!initialDb.verificationTokens) initialDb.verificationTokens = [];
  if (!initialDb.rateLimits) initialDb.rateLimits = {};

  memoryAuthDb = initialDb;
  return initialDb;
}

export const DEMO_ADMIN_EMAILS = [
  "admin@inestyl.com",
  "security@inestyl.com",
  "manager@inestyl.com",
  "disabled@inestyl.com",
  "newjoiner@inestyl.com",
  "admin",
  "kirti",
  "kirtipatel",
  "security",
  "manager",
];
export const COMMON_DEMO_PASSWORD = "Admin@IneStyl2026!";

export function resetDemoAccounts(): AdminAuthDatabase {
  const freshDb: AdminAuthDatabase = JSON.parse(JSON.stringify(defaultAuthDb));
  freshDb.users.forEach((u: AdminUser) => {
    if (!u.username) {
      if (u.role === "super_admin") u.username = "admin";
      else if (u.email === "security@inestyl.com") u.username = "security";
      else if (u.email === "manager@inestyl.com") u.username = "manager";
    }
  });
  freshDb.rateLimits = {};
  freshDb.twoFactorChallenges = [];
  freshDb.resetTokens = [];
  freshDb.sessions = [];
  freshDb.verificationTokens = [];
  memoryAuthDb = freshDb;
  return freshDb;
}

export function saveAuthDb(db: AdminAuthDatabase): void {
  memoryAuthDb = db;
}

export function seedDefaultAdmins(db: AdminAuthDatabase): void {
  const defaultPassword = COMMON_DEMO_PASSWORD;
  const now = new Date().toISOString();

  // 1. Super Admin (Full Control)
  const superAdminCreds = hashPassword(defaultPassword);
  const superAdmin: AdminUser = {
    id: "adm_super_01",
    email: "admin@inestyl.com",
    username: "admin",
    fullName: "Kirti Patel (Executive Admin)",
    role: "super_admin",
    status: "active",
    emailVerified: true,
    twoFactorEnabled: false,
    passwordHash: superAdminCreds.hash,
    passwordSalt: superAdminCreds.salt,
    backupCodes: ["ADM-9988-7766", "ADM-1122-3344"],
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
  };

  // 2. Security Officer (2FA Enabled by default)
  const securityCreds = hashPassword(defaultPassword);
  const securityAdmin: AdminUser = {
    id: "adm_security_02",
    email: "security@inestyl.com",
    username: "security",
    fullName: "Security Administrator",
    role: "admin",
    status: "active",
    emailVerified: true,
    twoFactorEnabled: true,
    passwordHash: securityCreds.hash,
    passwordSalt: securityCreds.salt,
    backupCodes: ["SEC-7788-9900", "SEC-1122-3344", "SEC-5566-7788"],
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
  };

  // 3. Store / Inventory Manager
  const managerCreds = hashPassword(defaultPassword);
  const managerAdmin: AdminUser = {
    id: "adm_manager_03",
    email: "manager@inestyl.com",
    username: "manager",
    fullName: "Kapadwanj Store Manager",
    role: "inventory_manager",
    status: "active",
    emailVerified: true,
    twoFactorEnabled: false,
    passwordHash: managerCreds.hash,
    passwordSalt: managerCreds.salt,
    backupCodes: ["MGR-4455-6677", "MGR-8899-0011"],
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
  };

  // 4. Deactivated Admin (For testing account disabled UI state)
  const disabledCreds = hashPassword(defaultPassword);
  const disabledAdmin: AdminUser = {
    id: "adm_disabled_04",
    email: "disabled@inestyl.com",
    fullName: "Former Store Clerk",
    role: "admin",
    status: "disabled",
    emailVerified: true,
    twoFactorEnabled: false,
    passwordHash: disabledCreds.hash,
    passwordSalt: disabledCreds.salt,
    backupCodes: ["DIS-0000-1111"],
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
  };

  // 5. Unverified Admin (For testing email verification flow)
  const unverifiedCreds = hashPassword(defaultPassword);
  const unverifiedAdmin: AdminUser = {
    id: "adm_unverified_05",
    email: "newjoiner@inestyl.com",
    fullName: "Associate Trainee",
    role: "admin",
    status: "pending_verification",
    emailVerified: false,
    twoFactorEnabled: false,
    passwordHash: unverifiedCreds.hash,
    passwordSalt: unverifiedCreds.salt,
    backupCodes: ["TRN-2233-4455"],
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
  };

  db.users = [superAdmin, securityAdmin, managerAdmin, disabledAdmin, unverifiedAdmin];
  saveAuthDb(db);
}

// -------------------------------------------------------------
// RATE LIMITING
// -------------------------------------------------------------
export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const db = getAuthDb();
  const entry = db.rateLimits[key];
  if (!entry) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  const now = Date.now();

  // If locked out, check if lockout has passed
  if (entry.lockedUntil && entry.lockedUntil > now) {
    const remaining = Math.ceil((entry.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds: remaining };
  }

  // If previous window has passed, reset
  if (now - entry.lastAttemptAt > ATTEMPT_WINDOW_MS) {
    delete db.rateLimits[key];
    saveAuthDb(db);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedAttempt(key: string): { isNowLocked: boolean; retryAfterSeconds: number } {
  const db = getAuthDb();
  const now = Date.now();
  const entry = db.rateLimits[key] || { attempts: 0, lockedUntil: null, lastAttemptAt: now };

  // If previous window has expired, reset counter
  if (now - entry.lastAttemptAt > ATTEMPT_WINDOW_MS) {
    entry.attempts = 1;
  } else {
    entry.attempts += 1;
  }
  entry.lastAttemptAt = now;

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS;
    db.rateLimits[key] = entry;
    saveAuthDb(db);
    return {
      isNowLocked: true,
      retryAfterSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
    };
  }

  db.rateLimits[key] = entry;
  saveAuthDb(db);
  return { isNowLocked: false, retryAfterSeconds: 0 };
}

export function clearRateLimit(key: string): void {
  const db = getAuthDb();
  if (db.rateLimits[key]) {
    delete db.rateLimits[key];
    saveAuthDb(db);
  }
}

// -------------------------------------------------------------
// AUTHENTICATION WORKFLOWS
// -------------------------------------------------------------
export type LoginResult =
  | { success: true; user: SafeAdminUser; session: AdminSession }
  | { success: false; requires2FA: true; challengeId: string; maskedEmail: string; cooldownRemaining: number; debugCode?: string }
  | { success: false; requires2FA: false; error: string; code: "INVALID_CREDENTIALS" | "ACCOUNT_DISABLED" | "EMAIL_NOT_VERIFIED" | "RATE_LIMITED"; retryAfterSeconds?: number };

export function authenticateAdmin(
  emailInput: string,
  passwordInput: string,
  rememberDevice: boolean,
  clientIp = "127.0.0.1",
  userAgent = "Mozilla/5.0"
): LoginResult {
  const identifier = emailInput.trim().toLowerCase();
  const db = getAuthDb();
  const user = db.users.find(
    (u) =>
      u.email.toLowerCase() === identifier ||
      (u.username && u.username.toLowerCase() === identifier) ||
      (u.role === "super_admin" && (identifier === "admin" || identifier === "kirti" || identifier === "kirtipatel"))
  );

  const rateLimitKey = `login:${user ? user.email : identifier}:${clientIp}`;

  const isDemoAccount =
    DEMO_ADMIN_EMAILS.includes(identifier) ||
    Boolean(user && DEMO_ADMIN_EMAILS.includes(user.email));
  const isDemoPass = passwordInput === COMMON_DEMO_PASSWORD;

  // If using legitimate demo credentials, clear any prior rate limit lockout
  if (isDemoAccount && isDemoPass) {
    clearRateLimit(rateLimitKey);
    clearRateLimit(`login:${identifier}:${clientIp}`);
    if (user) {
      clearRateLimit(`login:${user.email}:${clientIp}`);
    }
  }

  const rateCheck = checkRateLimit(rateLimitKey);
  if (!rateCheck.allowed) {
    return {
      success: false,
      requires2FA: false,
      error: `Too many failed login attempts. For security, please try again in ${Math.ceil(rateCheck.retryAfterSeconds / 60)} minutes.`,
      code: "RATE_LIMITED",
      retryAfterSeconds: rateCheck.retryAfterSeconds,
    };
  }

  // Constant-time check even if user doesn't exist to prevent timing attacks
  if (!user) {
    const dummyHash = "0".repeat(128);
    verifyPassword(passwordInput, "0".repeat(32), dummyHash);
    const lockInfo = recordFailedAttempt(rateLimitKey);
    return {
      success: false,
      requires2FA: false,
      error: lockInfo.isNowLocked
        ? `Account locked due to multiple failed attempts. Please try again in 15 minutes.`
        : "Invalid administrator credentials. Please check your email and password.",
      code: lockInfo.isNowLocked ? "RATE_LIMITED" : "INVALID_CREDENTIALS",
      retryAfterSeconds: lockInfo.retryAfterSeconds,
    };
  }

  // Verify password using constant-time salted hash comparison
  const isValidPassword = verifyPassword(passwordInput, user.passwordSalt, user.passwordHash);

  if (!isValidPassword) {
    const lockInfo = recordFailedAttempt(rateLimitKey);
    return {
      success: false,
      requires2FA: false,
      error: lockInfo.isNowLocked
        ? `Account locked due to multiple failed attempts. Please try again in 15 minutes.`
        : "Invalid administrator credentials. Please check your email and password.",
      code: lockInfo.isNowLocked ? "RATE_LIMITED" : "INVALID_CREDENTIALS",
      retryAfterSeconds: lockInfo.retryAfterSeconds,
    };
  }

  // Check account status
  if (user.status === "disabled") {
    return {
      success: false,
      requires2FA: false,
      error: "This administrator account has been deactivated. Please contact the security administrator.",
      code: "ACCOUNT_DISABLED",
    };
  }

  // Check email verification status
  if (!user.emailVerified || user.status === "pending_verification") {
    return {
      success: false,
      requires2FA: false,
      error: "Email verification is required before you can access the admin dashboard.",
      code: "EMAIL_NOT_VERIFIED",
    };
  }

  // Successful credential validation - clear rate limit
  clearRateLimit(rateLimitKey);

  // Handle 2FA if enabled
  if (user.twoFactorEnabled) {
    const otp = generateOtpCode();
    const challengeId = generateSecureToken(16);
    const now = Date.now();

    // Clean up expired challenges
    db.twoFactorChallenges = db.twoFactorChallenges.filter((c) => c.expiresAt > now);

    const challenge: TwoFactorChallenge = {
      challengeId,
      adminId: user.id,
      email: user.email,
      code: otp,
      createdAt: now,
      expiresAt: now + TWO_FACTOR_EXPIRY_MS,
      cooldownUntil: now + TWO_FACTOR_COOLDOWN_MS,
      attempts: 0,
      rememberDevice,
    };

    db.twoFactorChallenges.push(challenge);
    saveAuthDb(db);

    const parts = user.email.split("@");
    const masked = `${parts[0].slice(0, 2)}***@${parts[1]}`;

    return {
      success: false,
      requires2FA: true,
      challengeId,
      maskedEmail: masked,
      cooldownRemaining: 60,
      debugCode: otp, // surfaced for seamless testing/demoing
    };
  }

  // Non-2FA Login Success -> Create Session
  const session = createAdminSession(user, rememberDevice, clientIp, userAgent);
  user.lastLoginAt = new Date().toISOString();
  user.updatedAt = new Date().toISOString();
  saveAuthDb(db);

  return {
    success: true,
    user: toSafeUser(user),
    session,
  };
}

// -------------------------------------------------------------
// TWO FACTOR VERIFICATION
// -------------------------------------------------------------
export type TwoFactorResult =
  | { success: true; user: SafeAdminUser; session: AdminSession }
  | { success: false; error: string; code: "INVALID_2FA" | "EXPIRED_2FA" | "LOCKED_2FA" };

export function verifyTwoFactorChallenge(
  challengeId: string,
  codeInput: string,
  clientIp = "127.0.0.1",
  userAgent = "Mozilla/5.0"
): TwoFactorResult {
  const db = getAuthDb();
  const now = Date.now();

  const challenge = db.twoFactorChallenges.find((c) => c.challengeId === challengeId);
  if (!challenge) {
    return {
      success: false,
      error: "Verification challenge expired or invalid. Please sign in again.",
      code: "EXPIRED_2FA",
    };
  }

  if (now > challenge.expiresAt) {
    db.twoFactorChallenges = db.twoFactorChallenges.filter((c) => c.challengeId !== challengeId);
    saveAuthDb(db);
    return {
      success: false,
      error: "The 6-digit verification code has expired. Please request a new code.",
      code: "EXPIRED_2FA",
    };
  }

  const user = db.users.find((u) => u.id === challenge.adminId);
  if (!user || user.status === "disabled") {
    return {
      success: false,
      error: "Administrator account not found or deactivated.",
      code: "INVALID_2FA",
    };
  }

  const cleanInput = codeInput.trim().toUpperCase();

  // Check 6-digit OTP code match OR backup code match
  const isOtpMatch = challenge.code === cleanInput;
  const backupMatchIndex = user.backupCodes.findIndex((b) => b.toUpperCase() === cleanInput);
  const isBackupMatch = backupMatchIndex !== -1;

  if (!isOtpMatch && !isBackupMatch) {
    challenge.attempts += 1;
    if (challenge.attempts >= TWO_FACTOR_MAX_ATTEMPTS) {
      db.twoFactorChallenges = db.twoFactorChallenges.filter((c) => c.challengeId !== challengeId);
      saveAuthDb(db);
      return {
        success: false,
        error: "Too many incorrect verification attempts. Challenge cancelled.",
        code: "LOCKED_2FA",
      };
    }
    saveAuthDb(db);
    return {
      success: false,
      error: `Incorrect verification code. ${TWO_FACTOR_MAX_ATTEMPTS - challenge.attempts} attempts remaining.`,
      code: "INVALID_2FA",
    };
  }

  // If a backup code was used, consume it so it cannot be reused
  if (isBackupMatch) {
    user.backupCodes.splice(backupMatchIndex, 1);
  }

  // Remove challenge
  db.twoFactorChallenges = db.twoFactorChallenges.filter((c) => c.challengeId !== challengeId);

  // Issue session
  const session = createAdminSession(user, challenge.rememberDevice, clientIp, userAgent);
  user.lastLoginAt = new Date().toISOString();
  saveAuthDb(db);

  return {
    success: true,
    user: toSafeUser(user),
    session,
  };
}

export function resendTwoFactorCode(challengeId: string): { success: boolean; error?: string; cooldownRemaining?: number; debugCode?: string } {
  const db = getAuthDb();
  const challenge = db.twoFactorChallenges.find((c) => c.challengeId === challengeId);
  if (!challenge) {
    return { success: false, error: "Challenge has expired. Please sign in again." };
  }

  const now = Date.now();
  if (challenge.cooldownUntil > now) {
    const remaining = Math.ceil((challenge.cooldownUntil - now) / 1000);
    return { success: false, error: `Please wait ${remaining} seconds before requesting a new code.`, cooldownRemaining: remaining };
  }

  const newOtp = generateOtpCode();
  challenge.code = newOtp;
  challenge.attempts = 0;
  challenge.expiresAt = now + TWO_FACTOR_EXPIRY_MS;
  challenge.cooldownUntil = now + TWO_FACTOR_COOLDOWN_MS;
  saveAuthDb(db);

  return {
    success: true,
    cooldownRemaining: 60,
    debugCode: newOtp,
  };
}

// -------------------------------------------------------------
// PASSWORD RESET WORKFLOW
// -------------------------------------------------------------
export function createPasswordResetToken(emailInput: string): { token: string | null; email: string } {
  const db = getAuthDb();
  const email = emailInput.trim().toLowerCase();
  const user = db.users.find((u) => u.email.toLowerCase() === email && u.status !== "disabled");

  if (!user) {
    // Return null token to avoid leaking user existence
    return { token: null, email };
  }

  const now = Date.now();
  const token = generateSecureToken(32);

  // Invalidate any existing unused reset tokens for this user
  db.resetTokens = db.resetTokens.filter((t) => t.adminId !== user.id && t.expiresAt > now);

  const resetToken: PasswordResetToken = {
    token,
    adminId: user.id,
    email: user.email,
    createdAt: now,
    expiresAt: now + RESET_TOKEN_EXPIRY_MS,
    used: false,
  };

  db.resetTokens.push(resetToken);
  saveAuthDb(db);

  return { token, email: user.email };
}

export function verifyPasswordResetToken(token: string): { valid: boolean; email?: string; error?: string } {
  const db = getAuthDb();
  const now = Date.now();

  const resetToken = db.resetTokens.find((t) => t.token === token && !t.used);
  if (!resetToken) {
    return { valid: false, error: "This password reset link is invalid or has already been used." };
  }

  if (now > resetToken.expiresAt) {
    return { valid: false, error: "This password reset link has expired. Please request a new one." };
  }

  return { valid: true, email: resetToken.email };
}

export function executePasswordReset(token: string, newPassword: string): { success: boolean; error?: string } {
  const db = getAuthDb();
  const now = Date.now();

  const resetToken = db.resetTokens.find((t) => t.token === token && !t.used);
  if (!resetToken || now > resetToken.expiresAt) {
    return { success: false, error: "Password reset link is invalid or has expired." };
  }

  const user = db.users.find((u) => u.id === resetToken.adminId);
  if (!user) {
    return { success: false, error: "Administrator account not found." };
  }

  // Update user password
  const newCreds = hashPassword(newPassword);
  user.passwordHash = newCreds.hash;
  user.passwordSalt = newCreds.salt;
  user.updatedAt = new Date().toISOString();

  // Mark token as used
  resetToken.used = true;

  // Revoke all existing sessions for this user for security
  db.sessions = db.sessions.filter((s) => s.adminId !== user.id);

  saveAuthDb(db);
  return { success: true };
}

// -------------------------------------------------------------
// EMAIL VERIFICATION WORKFLOW
// -------------------------------------------------------------
export function createEmailVerificationToken(emailInput: string): { token: string | null } {
  const db = getAuthDb();
  const email = emailInput.trim().toLowerCase();
  const user = db.users.find((u) => u.email.toLowerCase() === email);
  if (!user) return { token: null };

  const now = Date.now();
  const token = generateSecureToken(32);

  db.verificationTokens = db.verificationTokens.filter((t) => t.adminId !== user.id && t.expiresAt > now);

  const verificationToken: EmailVerificationToken = {
    token,
    adminId: user.id,
    email: user.email,
    createdAt: now,
    expiresAt: now + VERIFY_TOKEN_EXPIRY_MS,
    used: false,
  };

  db.verificationTokens.push(verificationToken);
  saveAuthDb(db);

  return { token };
}

export function verifyEmailToken(token: string): { success: boolean; email?: string; error?: string } {
  const db = getAuthDb();
  const now = Date.now();

  const item = db.verificationTokens.find((t) => t.token === token && !t.used);
  if (!item) {
    return { success: false, error: "Verification token is invalid or has already been used." };
  }

  if (now > item.expiresAt) {
    return { success: false, error: "Verification token has expired. Please request a new link." };
  }

  const user = db.users.find((u) => u.id === item.adminId);
  if (!user) {
    return { success: false, error: "Account not found." };
  }

  user.emailVerified = true;
  if (user.status === "pending_verification") {
    user.status = "active";
  }
  user.updatedAt = new Date().toISOString();
  item.used = true;

  saveAuthDb(db);
  return { success: true, email: user.email };
}

// -------------------------------------------------------------
// SESSION MANAGEMENT
// -------------------------------------------------------------
export function createAdminSession(
  user: AdminUser,
  rememberDevice: boolean,
  clientIp = "127.0.0.1",
  userAgent = "Mozilla/5.0"
): AdminSession {
  const db = getAuthDb();
  const now = Date.now();
  const duration = rememberDevice ? SESSION_REMEMBER_MS : SESSION_DEFAULT_MS;
  const token = generateSecureToken(48);

  // Clean expired sessions
  db.sessions = db.sessions.filter((s) => s.expiresAt > now);

  const session: AdminSession = {
    token,
    adminId: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    rememberDevice,
    createdAt: now,
    expiresAt: now + duration,
    userAgent,
    ip: clientIp,
  };

  db.sessions.push(session);
  saveAuthDb(db);

  return session;
}

export function validateSessionToken(token: string): { valid: boolean; user?: SafeAdminUser; session?: AdminSession } {
  if (!token) return { valid: false };

  const db = getAuthDb();
  const now = Date.now();

  const session = db.sessions.find((s) => s.token === token);
  if (!session) {
    return { valid: false };
  }

  if (now > session.expiresAt) {
    // Session expired -> remove
    db.sessions = db.sessions.filter((s) => s.token !== token);
    saveAuthDb(db);
    return { valid: false };
  }

  const user = db.users.find((u) => u.id === session.adminId);
  if (!user || user.status === "disabled") {
    return { valid: false };
  }

  return {
    valid: true,
    user: toSafeUser(user),
    session,
  };
}

export function destroySession(token: string): void {
  if (!token) return;
  const db = getAuthDb();
  db.sessions = db.sessions.filter((s) => s.token !== token);
  saveAuthDb(db);
}
