"use server";
import { postFetch } from "@/utils/requests";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function sendReserveData(stateCellphone, formData) {
  const service_id = formData.get("service_id");
  const provider_id = formData.get("provider_id");

  if (service_id === "") {
    return {
      status: "error",
      message: "لطفا یکی از خدمات ارائه  شده را انتخاب کنید.",
    };
  }
  if (provider_id === "") {
    return {
      status: "error",
      message: "لطفا یکی از خدمات دهندگان ارائه  شده را انتخاب کنید.",
    };
  }
  const accessToken = cookies().get("access_token");
  if (!accessToken) {
    return {
      status: "error",
      loginStatus: false,
      message: "ایتدا وارد شوید.",
    };
  }

  const data = await postFetch("/api/v1/reservation/days", {
    service_id,
    provider_id,
    token: accessToken.value,
  });
  if (data.status === "success") {
    // cookies().set({
    //   name: "login_token",
    //   value: data.data.token,
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24,
    //   path: "/",
    // });

    return {
      status: data.status,
      data: data.data,
      message: data.message,
    };
  } else {
    return {
      status: "error",
      message: data.message,
    };
  }
}
export async function getReserveTimes(stateCellphone, formData) {
  const day_id = formData.get("day_id");

  if (day_id === "") {
    return {
      status: "error",
      message: "لطفا یکی از روزهای هفته را انتخاب کنید.",
    };
  }
  const accessToken = cookies().get("access_token");
  if (!accessToken) {
    return {
      status: "error",
      loginStatus: false,
      message: "ایتدا وارد شوید.",
    };
  }

  const data = await postFetch("/api/v1/reservation/times", {
    day_id,
    token: accessToken.value,
  });
  if (data.status === "success") {
    return {
      status: data.status,
      data: data.data,
      message: data.message,
    };
  } else {
    return {
      status: data.status,
      message: "خطای شبکه!",
    };
  }
}
export async function sendReserveTime(stateCellphone, formData) {
  const id = formData.get("time_id");

  if (id === "") {
    return {
      status: "error",
      message: "لطفا یکی از محدوده های زمانی را جهت رزرو انتخاب کنید.",
    };
  }
  const accessToken = cookies().get("access_token");
  if (!accessToken) {
    return {
      status: "error",
      loginStatus: false,
      message: "ایتدا وارد شوید.",
    };
  }

  const data = await postFetch(
    "/api/v1/reservation/book",
    { id },
    {
      Authorization: `Bearer ${accessToken.value}`,
    }
  );
  if (data.status === "success") {
    revalidateTag("book");
    return {
      status: data.status,
      data: data.data,
      message: "نوبت شما با موفقیت ثبت شد.",
    };
  } else {
    return {
      status: data.status,
      message: data.message,
    };
  }
}
