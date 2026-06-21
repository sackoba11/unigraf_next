import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getAdminCookieName,
  verifyAdminSessionTokenEdge,
} from "@/lib/admin/session-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    const token = request.cookies.get(getAdminCookieName())?.value;
    if (await verifyAdminSessionTokenEdge(token)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(getAdminCookieName())?.value;
  if (!(await verifyAdminSessionTokenEdge(token))) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
