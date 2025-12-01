import { loginPayload, signupPayload } from "../types";
import API from "./api.config";

const signUpUser = async (data: signupPayload) => {
  const fullName = data?.firstName + " " + data?.lastName;
  const email = data?.email;
  const password = data?.password;

  const payload = {
    fullName,
    email,
    password,
  };

  const res = await API.post("/auth/signup", payload);
  return res.data;
};

const loginUser = async (data: loginPayload) => {
  const res = await API.post("/auth/signin", data);
  return res.data;
};

const logoutUser = async () => {
  const res = await API.post("/auth/signout");
  return res.data;
};

const verifyOTP = async (data: { otp: string }) => {
  const res = await API.post("/auth/verify-otp", data);
  return res.data;
};

const refreshToken = async () => {
  const res = await API.post("/auth/refresh");
  return res.data;
};

export { loginUser, logoutUser, refreshToken, signUpUser, verifyOTP };
