import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";

// to check user is login
export function middleware(req) {
  const accessToken = req.cookies.get("access_token");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/reservation/:path*", "/reserved-list/:path*"],
};
