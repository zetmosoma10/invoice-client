import axiosInstance from "./axiosInstance";

const register = async (user) => {
  const { data } = await axiosInstance.post("/auth/register", user);
  return data;
};

const login = async (user) => {
  const { data } = await axiosInstance.post("/auth/login", user);
  return data;
};

const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post("/auth/forgot-password", email);
  return data;
};

const resetPassword = async (payload) => {
  const { data } = await axiosInstance.patch("/auth/reset-password", payload);
  return data;
};

export { resetPassword, forgotPassword, login, register };
