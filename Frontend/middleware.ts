import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const checkValidSession = (req: NextRequest) => {
  const token = req.cookies.get("tm-token")?.value;

  const isAuth = !!token;

  const AuthPages = ["/login", "/signup", "/verify-otp"];
  const isAuthPage = AuthPages.includes(req.nextUrl.pathname);

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const protectedRoutes = ["/dashboard", "/verify-otp"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};

export default checkValidSession;
