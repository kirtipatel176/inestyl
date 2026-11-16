import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AdminSession, SafeAdminUser } from "@/types/auth";
import { validateSessionToken, destroySession } from "./admin-auth-service";

export const ADMIN_COOKIE_NAME = "inestyl_admin_session";

/**
 * Returns standard cookie attributes.
 * Note: secure is only true if explicitly on HTTPS to prevent Safari and local
 * browsers from discarding the cookie on http://localhost.
 */
export function getSessionCookieOptions(session?: AdminSession) {
  const maxAge = session
    ? Math.floor((session.expiresAt - session.createdAt) / 1000)
    : 8 * 60 * 60;

  const isHttps = process.env.NEXT_PUBLIC_APP_URL?.startsWith("https://") || false;

  return {
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/**
 * Attaches the HTTP-only admin session cookie directly to a NextResponse.
 * This guarantees the Set-Cookie header is sent in Route Handlers.
 */
export function attachSessionCookie(response: NextResponse, session: AdminSession): NextResponse {
  response.cookies.set(ADMIN_COOKIE_NAME, session.token, getSessionCookieOptions(session));
  return response;
}

/**
 * Attaches a cookie-clearing header to a NextResponse for logout.
 */
export function attachClearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}

/**
 * Retrieves the currently active admin session and user from HTTP-only cookie.
 */
export async function getServerAdminSession(): Promise<{
  user: SafeAdminUser | null;
  session: AdminSession | null;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return { user: null, session: null };
  }

  const result = validateSessionToken(token);
  if (!result.valid || !result.user || !result.session) {
    return { user: null, session: null };
  }

  return {
    user: result.user,
    session: result.session,
  };
}

/**
 * Sets the HTTP-only admin session cookie via next/headers cookies().
 */
export async function setAdminSessionCookie(session: AdminSession): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, session.token, getSessionCookieOptions(session));
}

/**
 * Clears the HTTP-only admin session cookie and invalidates session.
 */
export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (token) {
    destroySession(token);
  }

  cookieStore.delete({
    name: ADMIN_COOKIE_NAME,
    path: "/",
  });
}
