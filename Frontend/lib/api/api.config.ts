import axios from "axios";
import { getToken } from "../utils";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const tmptoken = getToken("tmptoken");
  const token = getToken("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (tmptoken) {
    config.headers.Authorization = `Bearer ${tmptoken}`;
  }
  return config;
});

export default API;
