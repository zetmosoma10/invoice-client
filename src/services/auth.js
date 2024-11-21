import axiosInstance from "./axiosInstance";
import { useMutation } from "@tanstack/react-query";

const loginRequest = async (user) => {
  const { data } = await axiosInstance.post("/auth/login", user);
  return data;
};

const loginUser = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      console.log("Error logging user");
      console.log(error);
    },
  });
};

export { loginUser };
