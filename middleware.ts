import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("user_token")?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/admin");

  if (token !== "AUTHORIZED" && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
