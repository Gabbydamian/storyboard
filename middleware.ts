import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  const protectedRoutes = ["/", "/dashboard", "/profile", "/settings"];
  const currentPath = req.nextUrl.pathname;

  // Redirect logic
  if (protectedRoutes.includes(currentPath)) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Optional: Redirect authenticated users away from auth pages
  const authRoutes = ["/login", "/signup"];
  if (authRoutes.includes(currentPath) && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
