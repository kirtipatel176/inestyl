import { NextRequest, NextResponse } from "next/server";

const PUBLIC_AUTH_PATHS = [
  "/login",
  "/admin/login",
  "/forgot-password",
  "/admin/forgot-password",
  "/reset-password",
  "/admin/reset-password",
  "/verify-email",
  "/admin/verify-email",
  "/two-factor",
  "/admin/two-factor",
  "/unauthorized",
  "/admin/unauthorized",
  "/session-expired",
  "/admin/session-expired",
];

const ADMIN_COOKIE_NAME = "inestyl_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Static files and internal Next.js assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  // Allow all auth API routes
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/admin/auth") ||
    pathname === "/api/health"
  ) {
    return NextResponse.next();
  }

  const isPublicAuthPage = PUBLIC_AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"));

  // Public admin auth pages (login, 2FA, forgot-password, etc.) - always allow access
  if (isPublicAuthPage) {
    return NextResponse.next();
  }

  const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // Protected Admin Routes & APIs
  if (!sessionToken) {
    // If it is an API request, return 401 Unauthorized
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: "Authentication required to access administrative API", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    // Web page: redirect to /login with returnUrl
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
