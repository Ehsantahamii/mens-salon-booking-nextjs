import axios from "axios";

const api = axios.create({
  baseURL: "https://admin.developmart.ir/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
