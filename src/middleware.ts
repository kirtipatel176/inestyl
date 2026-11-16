import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
  "/admin/verify-email",
  "/admin/two-factor",
  "/admin/unauthorized",
  "/admin/session-expired",
];

const ADMIN_COOKIE_NAME = "inestyl_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only intercept /admin and /api/admin routes
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // Allow all auth API routes
  if (pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  const sessionToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isPublicAuthPage = PUBLIC_ADMIN_PATHS.some((path) => pathname.startsWith(path));

  // Public admin auth pages (login, 2FA, forgot-password, etc.) - always allow access
  if (isPublicAuthPage) {
    return NextResponse.next();
  }

  // Protected Admin Pages (e.g. /admin, /admin/products, etc.)
  if (!sessionToken) {
    // If it is an API request, return 401 Unauthorized
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { error: "Authentication required to access admin API", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    // Web page: redirect to login with returnUrl
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
