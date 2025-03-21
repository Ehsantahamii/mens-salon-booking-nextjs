// import api from "@/configs/api";
"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const getFetch = async (url, headers = {}) => {
  const res = await fetch(`https://admin.developmart.ir${url}`, {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    throw new Error(`مشکل در دریافت اطلاعات کد : ${res.status}`);
  }
};

const postFetch = async (url, body, headers = {}) => {
  const res = await fetch(`https://admin.developmart.ir${url}`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  revalidatePath("/reservation");
  return await res.json();
};
const putFetch = async (url, body) => {
  const token = cookies().get("login_token");
  const res = await fetch(`https://api.developmart.ir${url}`, {
    cache: "no-store",
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};
const deleteFetch = async (url) => {
  const token = cookies().get("login_token");
  const res = await fetch(`https://api.developmart.ir${url}`, {
    cache: "no-store",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });

  return await res.json();
};

// const liaraFetch = async (url, headers = {}) => {
//   const res = await fetch(`https://api.iran.liara.ir${url}`, {
//     cache: "no-store",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       ...headers,
//     },
//   });

//   if (res.ok) {
//     const data = await res.json();
//     return data;
//   } else {
//     throw new Error(`مشکل در دریافت اطلاعات کد : ${res.status}`);
//   }
// };

const linkFetch = async (url, headers = {}) => {
  const res = await fetch(`https://api.developmart.ir${url}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(res);
  }
};

const getNavbar = async (url, headers = {}) => {
  const res = await fetch(`https://admin.developmart.ir/api/v1${url}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    throw new Error(`مشکل در دریافت اطلاعات کد : ${res.status}`);
  }
};

export { getFetch, postFetch, putFetch, deleteFetch, linkFetch, getNavbar };
