import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // دریافت توکن احراز هویت
  const accessToken = req.cookies.get("access_token");

  // 1️⃣ اگر کاربر در صفحه اصلی (/) است
  if (pathname === "/") {
    // اگر لاگین است، به /reservation هدایت شود
    if (accessToken) {
      console.log(
        `[Middleware] Logged-in user redirected from / to /reservation`
      );
      return NextResponse.redirect(new URL("/reservation", req.url));
    }
    // اگر لاگین نیست، اجازه دسترسی به / داده می‌شود
    console.log(`[Middleware] Guest user allowed to access /`);
    return NextResponse.next();
  }

  // 2️⃣ برای صفحات محافظت‌شده (reservation, reserved-list)
  if (!accessToken) {
    console.log(`[Middleware] Unauthorized access attempt to: ${pathname}`);

    // ریدایرکت به صفحه لاگین با query parameter برای بازگشت
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("redirect", "no-login");

    return NextResponse.redirect(loginUrl);
  }

  // 3️⃣ اگر توکن موجود است، ادامه درخواست
  console.log(`[Middleware] Authorized access to: ${pathname}`);
  return NextResponse.next();
}

// تنظیمات matcher - صفحاتی که middleware روی آنها اجرا می‌شود
export const config = {
  matcher: [
    "/", // صفحه اصلی (برای چک کردن لاگین و ریدایرکت)
    "/reservation/:path*", // صفحه رزرو و زیرصفحات آن (محافظت‌شده)
    "/reserved-list/:path*", // لیست رزروها و زیرصفحات آن (محافظت‌شده)
  ],
};
