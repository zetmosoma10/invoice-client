import axiosInstance from "./axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthProvider";

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
    onError: (error) => {
      console.log("Error logging user");
      console.log(error);
    },
  });
};

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
    onError: (error) => {
      console.log("Error logging user");
      console.log(error);
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

export { loginUser, registerUser, decodeJwt };
