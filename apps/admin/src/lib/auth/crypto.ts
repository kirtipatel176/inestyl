import crypto from "crypto";

const ITERATIONS = 100000;
const KEYLEN = 64;
const DIGEST = "sha512";

/**
 * Computes salted PBKDF2 hash of password.
 */
export function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST);
  return {
    hash: derivedKey.toString("hex"),
    salt,
  };
}

/**
 * Constant-time comparison to prevent timing attacks.
 */
export function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  try {
    const derivedKey = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST);
    const storedBuffer = Buffer.from(storedHash, "hex");
    if (derivedKey.length !== storedBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(derivedKey, storedBuffer);
  } catch {
    return false;
  }
}

/**
 * Generates cryptographically secure random token (hex).
 */
export function generateSecureToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/**
 * Generates a 6-digit OTP string.
 */
export function generateOtpCode(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Generates human-friendly 8-character backup codes formatted as XXXX-XXXX.
 */
export function generateBackupCodes(count = 5): string[] {
  const codes: string[] = [];
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // readable chars without 0/O, 1/I confusion
  for (let i = 0; i < count; i++) {
    let part1 = "";
    let part2 = "";
    for (let j = 0; j < 4; j++) {
      part1 += chars[crypto.randomInt(0, chars.length)];
      part2 += chars[crypto.randomInt(0, chars.length)];
    }
    codes.push(`${part1}-${part2}`);
  }
  return codes;
}
