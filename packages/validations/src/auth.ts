import { z } from "zod";

export const AdminLoginSchema = z.object({
  email: z.string().email("Invalid admin email address").toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberDevice: z.boolean().default(false),
});

export const AdminTwoFactorSchema = z.object({
  challengeId: z.string().min(1, "Challenge ID is required"),
  code: z.string().length(6, "Verification code must be exactly 6 digits").regex(/^\d+$/, "Code must contain only digits"),
  rememberDevice: z.boolean().default(false),
});

export const AdminForgotPasswordSchema = z.object({
  email: z.string().email("Invalid admin email address").toLowerCase().trim(),
});

export const AdminResetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
