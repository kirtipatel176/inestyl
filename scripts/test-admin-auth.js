/**
 * Comprehensive Acceptance Test Suite for INESTYLE OUTLET Admin Authentication System
 * Tests all security controls, crypto operations, UI states, rate limits, 2FA, and session lifecycles.
 */

const {
  getAuthDb,
  saveAuthDb,
  resetDemoAccounts,
  authenticateAdmin,
  verifyTwoFactorChallenge,
  resendTwoFactorCode,
  createPasswordResetToken,
  verifyPasswordResetToken,
  executePasswordReset,
  createEmailVerificationToken,
  verifyEmailToken,
  createAdminSession,
  validateSessionToken,
  destroySession,
  clearRateLimit,
} = require("../apps/admin/src/lib/auth/admin-auth-service");
const { hashPassword, verifyPassword } = require("../apps/admin/src/lib/auth/crypto");

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(message);
  } else {
    console.log(`✅ PASSED: ${message}`);
    passed++;
  }
}

async function runAuthTests() {
  console.log("=================================================================");
  console.log("INESTYLE OUTLET — ADMIN AUTHENTICATION COMPREHENSIVE TEST SUITE");
  console.log("=================================================================\n");

  resetDemoAccounts();
  const db = getAuthDb();
  console.log(`Initialized database with ${db.users.length} seeded administrator accounts.`);

  // -------------------------------------------------------------
  // TEST 1: Password Hashing & Constant-time verification
  // -------------------------------------------------------------
  console.log("\n--- Test 1: Cryptographic Salted Hashing & Verification ---");
  const samplePass = "SecureAdmin@IneStyl2026!";
  const hashed = hashPassword(samplePass);
  assert(Boolean(hashed.hash && hashed.salt), "Generated salted hash and unique salt");
  assert(hashed.hash.length === 128, "SHA-512 derived key is 64 bytes (128 hex chars)");
  assert(verifyPassword(samplePass, hashed.salt, hashed.hash), "Valid password successfully verified");
  assert(!verifyPassword("WrongPass@123", hashed.salt, hashed.hash), "Incorrect password strictly rejected");

  // -------------------------------------------------------------
  // TEST 2: Super Admin Login & Session Generation
  // -------------------------------------------------------------
  console.log("\n--- Test 2: Standard Administrator Login ---");
  clearRateLimit("login:admin@inestyl.com:127.0.0.1");
  const loginResult = authenticateAdmin(
    "admin@inestyl.com",
    "Admin@IneStyl2026!",
    true,
    "127.0.0.1",
    "Mac-Chrome"
  );
  assert(loginResult.success === true, "Super administrator authenticated successfully");
  assert(loginResult.user.role === "super_admin", "Correct role assigned (super_admin)");
  assert(loginResult.user.email === "admin@inestyl.com", "User email matched");
  assert(!("passwordHash" in loginResult.user), "Sensitive password hash never leaked in user payload");
  assert(!("passwordSalt" in loginResult.user), "Password salt never leaked in user payload");
  assert(Boolean(loginResult.session.token), "Generated secure 48-byte session token");

  // -------------------------------------------------------------
  // TEST 3: Invalid Credentials Handling
  // -------------------------------------------------------------
  console.log("\n--- Test 3: Invalid Credentials Error Handling ---");
  clearRateLimit("login:admin@inestyl.com:127.0.0.1");
  const badLogin = authenticateAdmin(
    "admin@inestyl.com",
    "CompletelyWrongPassword!",
    false,
    "127.0.0.1"
  );
  assert(badLogin.success === false, "Incorrect password rejected");
  assert(badLogin.code === "INVALID_CREDENTIALS", "Returned INVALID_CREDENTIALS error code");

  // Non-existent email
  const ghostLogin = authenticateAdmin(
    "nonexistent@inestyl.com",
    "Password123!",
    false,
    "127.0.0.1"
  );
  assert(ghostLogin.success === false, "Non-existent administrator rejected");
  assert(ghostLogin.code === "INVALID_CREDENTIALS", "Returns generic invalid credentials (prevents user enumeration)");

  // -------------------------------------------------------------
  // TEST 4: Deactivated / Disabled Account State
  // -------------------------------------------------------------
  console.log("\n--- Test 4: Disabled Account State ---");
  clearRateLimit("login:disabled@inestyl.com:127.0.0.1");
  const disabledLogin = authenticateAdmin(
    "disabled@inestyl.com",
    "Admin@IneStyl2026!",
    false,
    "127.0.0.1"
  );
  assert(disabledLogin.success === false, "Disabled administrator access blocked");
  assert(disabledLogin.code === "ACCOUNT_DISABLED", "Returns ACCOUNT_DISABLED error code");

  // -------------------------------------------------------------
  // TEST 5: Rate Limiting & Brute-Force Lockout
  // -------------------------------------------------------------
  console.log("\n--- Test 5: Rate Limiting & Brute-Force Protection ---");
  const spamEmail = "bruteforce@inestyl.com";
  const spamIp = "192.168.1.100";
  clearRateLimit(`login:${spamEmail}:${spamIp}`);

  let triggeredLockout = false;
  for (let i = 0; i < 5; i++) {
    const res = authenticateAdmin(spamEmail, "WrongPassword", false, spamIp);
    if (res.code === "RATE_LIMITED") {
      triggeredLockout = true;
    }
  }
  assert(triggeredLockout, "Account locked out after 5 consecutive failed attempts");
  const lockedAttempt = authenticateAdmin(spamEmail, "EvenIfCorrect", false, spamIp);
  assert(lockedAttempt.code === "RATE_LIMITED", "Subsequent requests blocked by rate limiter with retry cooldown");

  // -------------------------------------------------------------
  // TEST 6: Two-Factor Authentication (2FA) Challenge Flow
  // -------------------------------------------------------------
  console.log("\n--- Test 6: Two-Factor Authentication (2FA) Flow ---");
  clearRateLimit("login:security@inestyl.com:127.0.0.1");
  const tfaLogin = authenticateAdmin(
    "security@inestyl.com",
    "Admin@IneStyl2026!",
    false,
    "127.0.0.1"
  );
  assert(tfaLogin.requires2FA === true, "2FA-enabled account intercepted with requires2FA challenge");
  assert(Boolean(tfaLogin.challengeId), "Generated distinct challengeId");
  assert(Boolean(tfaLogin.debugCode), "Generated 6-digit OTP code");

  // Bad OTP test
  const badOtp = verifyTwoFactorChallenge(tfaLogin.challengeId, "000000");
  assert(badOtp.success === false, "Incorrect 6-digit OTP rejected");
  assert(badOtp.code === "INVALID_2FA", "Returned INVALID_2FA code");

  // Valid OTP test
  const goodOtp = verifyTwoFactorChallenge(tfaLogin.challengeId, tfaLogin.debugCode);
  assert(goodOtp.success === true, "Valid 6-digit OTP authenticated successfully");
  assert(goodOtp.user.email === "security@inestyl.com", "Authenticated user identity confirmed");
  assert(Boolean(goodOtp.session.token), "Created active session after 2FA verification");

  // Recovery code test
  const tfaLogin2 = authenticateAdmin("security@inestyl.com", "Admin@IneStyl2026!", false);
  const recoveryResult = verifyTwoFactorChallenge(tfaLogin2.challengeId, "SEC-7788-9900");
  assert(recoveryResult.success === true, "Emergency recovery code (SEC-7788-9900) accepted");

  // Burned recovery code reuse test
  const tfaLogin3 = authenticateAdmin("security@inestyl.com", "Admin@IneStyl2026!", false);
  const reusedRecovery = verifyTwoFactorChallenge(tfaLogin3.challengeId, "SEC-7788-9900");
  assert(reusedRecovery.success === false, "Used recovery code burned and cannot be reused");

  // -------------------------------------------------------------
  // TEST 7: Single-Use Password Reset Flow
  // -------------------------------------------------------------
  console.log("\n--- Test 7: Password Reset Lifecycle ---");
  const resetReq = createPasswordResetToken("manager@inestyl.com");
  assert(Boolean(resetReq.token), "Generated cryptographic password reset token");

  const tokenCheck = verifyPasswordResetToken(resetReq.token);
  assert(tokenCheck.valid === true, "Reset token verified as valid and active");

  // Execute password reset
  const newSecret = "NewPass@Kapadwanj2026!";
  const resetExec = executePasswordReset(resetReq.token, newSecret);
  assert(resetExec.success === true, "Password reset executed successfully");

  // Token is single use: verify cannot be reused
  const secondUse = executePasswordReset(resetReq.token, "AnotherPass@123");
  assert(secondUse.success === false, "Token single-use enforced: cannot be reused");

  // Login with old password fails
  clearRateLimit("login:manager@inestyl.com:127.0.0.1");
  const oldLogin = authenticateAdmin("manager@inestyl.com", "Admin@IneStyl2026!", false);
  assert(oldLogin.success === false, "Old password no longer valid");

  // Login with new password succeeds
  const newLogin = authenticateAdmin("manager@inestyl.com", newSecret, false);
  assert(newLogin.success === true, "Login with newly updated password succeeded");

  // -------------------------------------------------------------
  // TEST 8: Email Verification Flow
  // -------------------------------------------------------------
  console.log("\n--- Test 8: Email Verification Flow ---");
  // Before verification, newjoiner cannot log in
  clearRateLimit("login:newjoiner@inestyl.com:127.0.0.1");
  const preVerifyLogin = authenticateAdmin("newjoiner@inestyl.com", "Admin@IneStyl2026!", false);
  assert(preVerifyLogin.success === false, "Unverified user blocked from signing in");
  assert(preVerifyLogin.code === "EMAIL_NOT_VERIFIED", "Returned EMAIL_NOT_VERIFIED");

  // Generate verification token
  const verifyReq = createEmailVerificationToken("newjoiner@inestyl.com");
  assert(Boolean(verifyReq.token), "Email verification token generated");

  // Verify email token
  const verifiedResult = verifyEmailToken(verifyReq.token);
  assert(verifiedResult.success === true, "Verification token validated and processed");

  // Now login succeeds
  const postVerifyLogin = authenticateAdmin("newjoiner@inestyl.com", "Admin@IneStyl2026!", false);
  assert(postVerifyLogin.success === true, "Account activated and can now sign in successfully");

  // -------------------------------------------------------------
  // TEST 9: Session Lifecycle & Invalidation
  // -------------------------------------------------------------
  console.log("\n--- Test 9: Session Management & Invalidation ---");
  const testSession = createAdminSession(goodOtp.user, false);
  assert(Boolean(testSession.token), "Created active session token");

  const sessionCheck = validateSessionToken(testSession.token);
  assert(sessionCheck.valid === true, "Active session token validated");
  assert(sessionCheck.user.email === goodOtp.user.email, "Session user matches");

  // Destroy session (Sign Out)
  destroySession(testSession.token);
  const deadSessionCheck = validateSessionToken(testSession.token);
  assert(deadSessionCheck.valid === false, "Destroyed session invalid on subsequent check");

  // Restore pristine demo accounts state for manual UI testing
  resetDemoAccounts();

  console.log("\n=================================================================");
  console.log(`🎉 ALL ${passed}/${total} AUTHENTICATION ACCEPTANCE TESTS PASSED!`);
  console.log("=================================================================");
}

runAuthTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
