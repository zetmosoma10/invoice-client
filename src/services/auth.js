import axiosInstance from "./axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthProvider";

// * LOGIN USER
const loginRequest = async (user) => {
  const { data } = await axiosInstance.post("/auth/login", user);
  return data;
};

const loginUser = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.token);
    },
  });
};

// * REGISTER USER
const registerRequest = async (user) => {
  const { data } = await axiosInstance.post("/auth/register", user);
  return data;
};

const registerUser = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      login(data.token);
    },
  });
};

const decodeJwt = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post("/auth/forgot-password", email);
  return data;
};

const forgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (data) => forgotPassword(data),
  });
};

const resetPassword = async (payload) => {
  const { data } = await axiosInstance.patch("/auth/reset-password", payload);
  return data;
};

const resetPasswordMutation = () => {
  return useMutation({
    mutationFn: (payload) => resetPassword(payload),
  });
};

export {
  loginUser,
  registerUser,
  decodeJwt,
  forgotPasswordMutation,
  resetPasswordMutation,
};
