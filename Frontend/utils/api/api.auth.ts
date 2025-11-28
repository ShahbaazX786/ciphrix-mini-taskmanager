import API from "./api.config";

const signUpUser = async (data: any) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};

const loginUser = async (data: any) => {
  const res = await API.post("/auth/signin", data);
  return res.data;
};

export { loginUser, signUpUser };
