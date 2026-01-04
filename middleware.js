import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // دریافت توکن احراز هویت
  const accessToken = req.cookies.get("access_token");

  // بررسی وجود توکن
  if (!accessToken) {
    console.log(`[Middleware] Unauthorized access attempt to: ${pathname}`);

    // ریدایرکت به صفحه لاگین با query parameter برای بازگشت
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("redirect", "no-login");

    return NextResponse.redirect(loginUrl);
  }

  // اگر توکن موجود است، ادامه درخواست
  return NextResponse.next();
}

// تنظیمات matcher - صفحاتی که نیاز به احراز هویت دارند
export const config = {
  matcher: [
    "/reservation/:path*", // صفحه رزرو و زیرصفحات آن
    "/reserved-list/:path*", // لیست رزروها و زیرصفحات آن
  ],
};
