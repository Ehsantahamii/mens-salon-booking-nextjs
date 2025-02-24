"use server";
import { cookies } from "next/headers";
import { getFetch, postFetch } from "@/utils/requests";
import { revalidatePath } from "next/cache";

export async function login(stateCellphone, formData) {
  const mobile = formData.get("mobile");

  if (mobile === "") {
    return {
      status: "error",
      message: "لطفا یک شماره تماس معتبر وارد نمایید.",
    };
  }

  const pattern = /^(\+98|0)?9\d{9}$/i;

  if (!pattern.test(mobile)) {
    return {
      status: "error",
      message: "لطفا یک شماره تماس معتبر وارد نمایید.",
    };
  }

  const data = await postFetch("/api/v1/login", { mobile });

  if (data.status === "success") {
    cookies().set({
      name: "login_token",
      value: data.data.token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      status: data.status,
      data: data.data,
      message: data.message,
    };
  } else {
    return {
      status: "error",
      message: "خطای شبکه",
    };
  }
}

export async function checkOtp(stateOtp, formData) {
  const otp = formData.get("otp");

  if (otp === "") {
    return {
      status: "error",
      message: "کد ارسال شده را وارد نمایید.",
    };
  }

  const pattern = /^[0-9]{6}$/;

  if (!pattern.test(otp)) {
    return {
      status: "error",
      message: " کد نامعتبر است.",
    };
  }

  const loginToken = cookies().get("login_token");
  if (!loginToken) {
    return {
      status: "error",
      message: "خطایی رخ داده است، دوباره تلاش کنید.",
    };
  }

  const data = await postFetch("/api/v1/verify", {
    otp,
    token: loginToken.value,
  });

  if (data.status === "success") {
    cookies().delete("login_token");
    cookies().set({
      name: "access_token",
      value: data.data.token,
      httpOnly: true,
      maxAge: 1 * 60 * 24 * 7, // One day
      path: "/",
    });

    return {
      status: data.status,
      message: data.message,
      user: data.user,
    };
  } else {
    return {
      status: data.status,
      message: "کد ورود نادرست است.",
    };
  }
}

export async function logout() {
  const accessToken = cookies().get("access_token");

  if (!accessToken) {
    return {
      error: "ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  const data = await postFetch(
    "/logout",
    {},
    {
      Authorization: `Bearer ${accessToken.value}`,
    }
  );

  if (data.status === "success") {
    cookies().delete("login_token");
    return {
      success: "با موفقیت خارج شدید.",
    };
  } else {
    return {
      error: "خروج با مشکل روبرو شد!",
    };
  }
}
