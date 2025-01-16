import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/notices"];
  const token = req.cookies.get("token")?.value;

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/Login", req.url));
    }

    try {
    } catch (error) {
      return NextResponse.redirect(new URL("/Login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notices"],
};
