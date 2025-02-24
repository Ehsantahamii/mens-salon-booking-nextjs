import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

// to check user is login
export function middleware(req) {
  const accessToken = req.cookies.get("access_token");

  if (!accessToken) {
    toast.error("حساب کاربری شما منقضی شده است.");
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/reservation/:path*"],
};
