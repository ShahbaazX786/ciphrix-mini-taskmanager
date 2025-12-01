import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4200",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
