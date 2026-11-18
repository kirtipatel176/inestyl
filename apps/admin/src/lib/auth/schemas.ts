/**
 * INESTYLE OUTLET — Authentication Validation Schemas
 *
 * Lightweight, zero-dependency validation schemas providing robust type safety
 * and error reporting without external package dependencies.
 */

export interface ValidationIssue {
  message: string;
  path?: (string | number)[];
}

export type SafeParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: { issues: ValidationIssue[] } };

export interface SchemaValidator<T> {
  safeParse: (input: unknown) => SafeParseResult<T>;
}

// -------------------------------------------------------------
// LOGIN SCHEMA
// -------------------------------------------------------------
export interface LoginInput {
  email: string;
  password: string;
  rememberDevice: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,50}$/;

export const loginSchema: SchemaValidator<LoginInput> = {
  safeParse(input: unknown): SafeParseResult<LoginInput> {
    if (!input || typeof input !== "object") {
      return { success: false, error: { issues: [{ message: "Invalid payload format" }] } };
    }
    const val = input as Record<string, any>;
    const email = typeof val.email === "string" ? val.email.trim().toLowerCase() : "";
    const password = typeof val.password === "string" ? val.password : "";
    const rememberDevice = Boolean(val.rememberDevice);

    if (!email) {
      return { success: false, error: { issues: [{ message: "Email address or username is required", path: ["email"] }] } };
    }
    const isEmail = EMAIL_REGEX.test(email);
    const isUsername = USERNAME_REGEX.test(email);
    if (!isEmail && !isUsername) {
      return { success: false, error: { issues: [{ message: "Please enter a valid email address or username", path: ["email"] }] } };
    }
    if (!password) {
      return { success: false, error: { issues: [{ message: "Password is required", path: ["password"] }] } };
    }

    return {
      success: true,
      data: {
        email,
        password,
        rememberDevice,
      },
    };
  },
};

// -------------------------------------------------------------
// TWO-FACTOR SCHEMA
// -------------------------------------------------------------
export interface TwoFactorInput {
  challengeId: string;
  code: string;
}

export const twoFactorSchema: SchemaValidator<TwoFactorInput> = {
  safeParse(input: unknown): SafeParseResult<TwoFactorInput> {
    if (!input || typeof input !== "object") {
      return { success: false, error: { issues: [{ message: "Invalid payload format" }] } };
    }
    const val = input as Record<string, any>;
    const challengeId = typeof val.challengeId === "string" ? val.challengeId.trim() : "";
    const code = typeof val.code === "string" ? val.code.trim() : "";

    if (!challengeId) {
      return { success: false, error: { issues: [{ message: "Challenge ID is missing", path: ["challengeId"] }] } };
    }
    if (!code) {
      return { success: false, error: { issues: [{ message: "Verification code or recovery code is required", path: ["code"] }] } };
    }

    return {
      success: true,
      data: {
        challengeId,
        code,
      },
    };
  },
};

// -------------------------------------------------------------
// FORGOT PASSWORD SCHEMA
// -------------------------------------------------------------
export interface ForgotPasswordInput {
  email: string;
}

export const forgotPasswordSchema: SchemaValidator<ForgotPasswordInput> = {
  safeParse(input: unknown): SafeParseResult<ForgotPasswordInput> {
    if (!input || typeof input !== "object") {
      return { success: false, error: { issues: [{ message: "Invalid payload format" }] } };
    }
    const val = input as Record<string, any>;
    const email = typeof val.email === "string" ? val.email.trim().toLowerCase() : "";

    if (!email) {
      return { success: false, error: { issues: [{ message: "Email address is required", path: ["email"] }] } };
    }
    if (!EMAIL_REGEX.test(email)) {
      return { success: false, error: { issues: [{ message: "Please enter a valid email address", path: ["email"] }] } };
    }

    return {
      success: true,
      data: { email },
    };
  },
};

// -------------------------------------------------------------
// RESET PASSWORD SCHEMA
// -------------------------------------------------------------
export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword: string;
}

export const resetPasswordSchema: SchemaValidator<ResetPasswordInput> = {
  safeParse(input: unknown): SafeParseResult<ResetPasswordInput> {
    if (!input || typeof input !== "object") {
      return { success: false, error: { issues: [{ message: "Invalid payload format" }] } };
    }
    const val = input as Record<string, any>;
    const token = typeof val.token === "string" ? val.token.trim() : "";
    const password = typeof val.password === "string" ? val.password : "";
    const confirmPassword = typeof val.confirmPassword === "string" ? val.confirmPassword : "";

    if (!token) {
      return { success: false, error: { issues: [{ message: "Reset token is required", path: ["token"] }] } };
    }
    if (!password || password.length < 8) {
      return {
        success: false,
        error: { issues: [{ message: "Password must be at least 8 characters long", path: ["password"] }] },
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        success: false,
        error: { issues: [{ message: "Password must contain at least one uppercase letter", path: ["password"] }] },
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        success: false,
        error: { issues: [{ message: "Password must contain at least one lowercase letter", path: ["password"] }] },
      };
    }
    if (!/[0-9]/.test(password)) {
      return {
        success: false,
        error: { issues: [{ message: "Password must contain at least one number", path: ["password"] }] },
      };
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return {
        success: false,
        error: { issues: [{ message: "Password must contain at least one special character", path: ["password"] }] },
      };
    }
    if (!confirmPassword) {
      return {
        success: false,
        error: { issues: [{ message: "Please confirm your password", path: ["confirmPassword"] }] },
      };
    }
    if (password !== confirmPassword) {
      return {
        success: false,
        error: { issues: [{ message: "Passwords do not match", path: ["confirmPassword"] }] },
      };
    }

    return {
      success: true,
      data: {
        token,
        password,
        confirmPassword,
      },
    };
  },
};

// -------------------------------------------------------------
// VERIFY EMAIL SCHEMA
// -------------------------------------------------------------
export interface VerifyEmailInput {
  token: string;
}

export const verifyEmailSchema: SchemaValidator<VerifyEmailInput> = {
  safeParse(input: unknown): SafeParseResult<VerifyEmailInput> {
    if (!input || typeof input !== "object") {
      return { success: false, error: { issues: [{ message: "Invalid payload format" }] } };
    }
    const val = input as Record<string, any>;
    const token = typeof val.token === "string" ? val.token.trim() : "";

    if (!token) {
      return { success: false, error: { issues: [{ message: "Verification token is required", path: ["token"] }] } };
    }

    return {
      success: true,
      data: { token },
    };
  },
};
