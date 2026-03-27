import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

const ADMIN_LOGIN_PATH = "/admin/login";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Only protect /admin routes (exclude /admin/login)
  if (!pathname.startsWith("/admin") || pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.next();
  }

  // 2. Clear out existing sessions that are not valid JWTs
  const session = request.cookies.get("admin_session")?.value;

  if (!session) {
    return redirectToLogin(request, pathname);
  }

  try {
    // 3. Verify JWT session
    const payload = await decrypt(session);
    
    // Check expiration manually just in case
    if (payload && new Date(payload.expires) < new Date()) {
       return redirectToLogin(request, pathname);
    }

    return NextResponse.next();
  } catch (err) {
    // Session is invalid (e.g. old "active" string or tampered)
    const res = redirectToLogin(request, pathname);
    // Delete the invalid cookie
    res.cookies.delete("admin_session");
    return res;
  }
}

function redirectToLogin(request: NextRequest, from: string) {
  const url = request.nextUrl.clone();
  url.pathname = ADMIN_LOGIN_PATH;
  url.searchParams.set("from", from);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
