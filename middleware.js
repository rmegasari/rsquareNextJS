import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proteksi semua route yang dimulai dengan /admin kecuali /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Cek cookie session
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== "authenticated") {
      // Redirect ke login jika tidak ada session
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
