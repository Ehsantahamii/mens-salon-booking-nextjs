"use server";
import { postFetch } from "@/utils/requests";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
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
  // if (!accessToken) {
  //   return {
  //     status: "error",
  //     loginStatus: false,
  //     message: "ابتدا وارد شوید.",
  //   };
  // }

  const data = await postFetch("/api/v1/reservation/days", {
    service_id,
    provider_id,
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
      message: data.message,
    };
  }
}
export async function getReserveTimes(stateCellphone, formData) {
  const day_id = formData.get("day_id");
  const service_id = formData.get("service_id");
  const provider_id = formData.get("provider_id");
  if (day_id === "") {
    return {
      status: "error",
      message: "لطفا یکی از روزهای هفته را انتخاب کنید.",
    };
  }
  const data = await postFetch("/api/v1/reservation/times", {
    day_id,
    service_id,
    provider_id,
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
      message: data,
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
      loginStatus: "no-login",
      message: "لطفا مجددا وارد شوید.",
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
      message: data.message,
    };
  } else {
    return {
      status: data.status,
      message: data.message,
    };
  }
}
