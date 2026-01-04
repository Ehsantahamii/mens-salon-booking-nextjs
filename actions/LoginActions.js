"use server";

import { cookies } from "next/headers";
import { getFetch, postFetch } from "@/utils/requests";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(prevState, formData) {
  const mobile = formData.get("mobile");

  if (!mobile || mobile.length !== 11) {
    return {
      status: "error",
      message: "شماره موبایل نامعتبر است",
    };
  }

  const pattern = /^(\+98|0)?9\d{9}$/i;
  if (!pattern.test(mobile)) {
    return {
      status: "error",
      message: "شماره موبایل نامعتبر است",
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    });

    const data = await res.json();

    if (data.status !== "success") {
      return {
        status: "error",
        message: data.message || "خطا در ارسال کد تایید",
      };
    }
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token");
    if (accessToken) {
      (await cookies()).delete("access_token");
    }

    if (data.data?.token) {
      cookies().set({
        name: "token",
        value: data.data.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return {
      status: "success",
      message: data.message || "کد تایید با موفقیت ارسال شد",
    };
  } catch {
    return {
      status: "error",
      message: "خطا در برقراری ارتباط با سرور",
    };
  }
}
export async function checkOtpAction(prevState, formData) {
  const cookieStore = cookies();
  const loginToken = cookieStore.get("token"); // توکن مرحله OTP
  const otp = formData.get("otp");

  // ✅ validation
  if (!otp || otp.length !== 6) {
    return {
      status: "error",
      message: "کد تایید نامعتبر است",
    };
  }

  // ✅ اگر token مرحله قبل وجود نداشت
  if (!loginToken?.value) {
    return {
      status: "error",
      message: "نشست منقضی شده است، مجدداً وارد شوید",
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, token: loginToken.value }),
    });

    if (!res.ok) {
      return {
        status: "error",
        message: data,
      };
    }

    const data = await res.json();

    if (data.status !== "success") {
      return {
        status: "error",
        message: data.message || "کد تایید اشتباه است",
      };
    }

    //access_token
    if (data.data?.token) {
      cookieStore.set({
        name: "access_token",
        value: data.data.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, //1 week
      });

      // ✅ حذف توکن موقت OTP
      cookieStore.delete("token");
    }

    return {
      status: "success",
      message: "ورود موفقیت‌آمیز بود",
      data: data.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "خطا در بررسی کد تایید",
    };
  }
}
export async function sendUserName(prevState, formData) {
  const name = formData.get("name");
  const lastName = formData.get("last_name");

  if (!name) {
    return {
      status: "error",
      message: "لطفا نام را وارد نمایید",
    };
  }

  if (!lastName) {
    return {
      status: "error",
      message: "لطفا نام خانوادگی را وارد نمایید",
    };
  }

  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken?.value) {
    return {
      status: "error",
      message: "نشست شما منقضی شده است",
    };
  }

  const res = await fetch(`${process.env.API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.value}`,
    },
    body: JSON.stringify({
      name,
      last_name: lastName,
    }),
  });

  const data = await res.json();

  if (!res.ok || data.status !== "success") {
    return {
      status: "error",
      message: data?.message || "خطا در ثبت اطلاعات",
    };
  }

  return {
    status: "success",
    message: data.message || "اطلاعات با موفقیت ثبت شد",
    data:data?.data?.name
  };
}
export async function logout() {
  const accessToken = (await cookies()).get("access_token");

  if (!accessToken) {
    return {
      error: "توکن یافت نشد!",
    };
  }

  const data = await postFetch(
    "/logout",
    {},
    {
      Authorization: `Bearer ${accessToken.value}`,
    }
  );
  // if (data.status === "success") {
  //   redirect("/");
  // }

  if (data.status === "success") {
    (await cookies()).delete("access_token");
    return {
      status: data.status,
      message: data.message,
    };
  } else {
    return {
      status: "error",
      error: "خروج با مشکل روبرو شد!",
    };
  }
}
export async function resendOtp(stateOtp, formData) {
  const cookieStore = cookies();
  const loginToken = cookieStore.get("token");

  if (!loginToken) {
    return {
      status: "error",
      message: "خطایی رخ داده است، دوباره تلاش کنید.",
    };
  }

  const data = await postFetch("/resend", {
    token: loginToken.value,
  });
  if (data.status === "success") {
    (await cookies()).delete("login_token");
    (await cookies()).set({
      name: "token",
      value: data.data.token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      status: data.status,
      message: data.message,
      data: data.data.name,
    };
  } else {
    return {
      status: data.status,
      message: data.message,
    };
  }
}
