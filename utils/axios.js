import axios from "axios";

const api = axios.create({
  baseURL: "https://panel.varna-web.ir/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-TENANT-SLUG": "khalili",
  },
});

export default api;

// baseURL: process.env.NEXT_PUBLIC_API_URL,
