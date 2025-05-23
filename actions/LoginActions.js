"use server";

import { cookies } from "next/headers";
import { getFetch, postFetch } from "@/utils/requests";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    (await cookies()).set({
      name: "login_token",
      value: data.data.token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      status: data.status,
      data: data.data.otp,
      message: data.message,
    };
  } else {
    return {
      status: data.status,
      data: data.data,
      message: data.message,
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
      message: "فورمت کد ارسالی نا معتبر است.",
    };
  }

  const loginToken = (await cookies()).get("login_token");
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
    (await cookies()).delete("login_token");
    (await cookies()).set({
      name: "access_token",
      value: data.data.token,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // One week
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
export async function sendUserName(stateName, formData) {
  const name = formData.get("name");

  if (name === "") {
    return {
      status: "error",
      message: "لطفا یک  نام معتبر وارد نمایید.",
    };
  }
  const accessToken = (await cookies()).get("access_token");
  if (!accessToken) {
    return {
      status: "error",
      message: "خطایی رخ داده است، دوباره تلاش کنید.",
    };
  }

  const data = await postFetch(
    "/api/v1/name",
    { name },
    {
      Authorization: `Bearer ${accessToken.value}`,
    }
  );

  if (data.status === "success") {
    return {
      status: data.status,
      data: data.data,
      message: data.message,
    };
  } else {
    return {
      status: data.status,
      message: data.message,
    };
  }
}

export async function logout() {
  const accessToken = (await cookies()).get("access_token");

  if (!accessToken) {
    return {
      error: "توکن یافت نشد!",
    };
  }

  const data = await postFetch(
    "/api/v1/logout",
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
  const loginToken = (await cookies()).get("login_token");
  if (!loginToken) {
    return {
      status: "error",
      message: "خطایی رخ داده است، دوباره تلاش کنید.",
    };
  }

  const data = await postFetch("/api/v1/resend", {
    token: loginToken.value,
  });
  if (data.status === "success") {
    (await cookies()).delete("login_token");
    (await cookies()).set({
      name: "login_token",
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
