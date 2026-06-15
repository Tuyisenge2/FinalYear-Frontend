import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

interface TokenPayload {
  role?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

const PROTECTED_ROUTES = ["/admin", "/guard"];
const AUTH_ROUTES = ["/auth/login", "/auth/signup"];

function getSessionFromCookie(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token");
  if (!sessionToken) return null;

  try {
    return { role: "HEAD_OF_SECURITY", name: "Jean Kanimba" };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Demo mode: skip session validation - allow free access to all pages
  // Re-enable proper auth checks when backend is integrated
  const session = getSessionFromCookie(request);

  // Redirect authenticated users (with session cookie) away from auth pages
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route)) && session) {
    const role = (session as any)?.role;
    const redirectUrl = role === "HEAD_OF_SECURITY" ? "/admin" : "/guard";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
