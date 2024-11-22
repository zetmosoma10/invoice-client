import { useAuth } from "../context/AuthProvider";
import axiosInstance from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getUserRequest = async () => {
  const { data } = await axiosInstance.get("/user/get-current-user");
  return data;
};

const getCurrentUserDetails = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserRequest,
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    enabled: !!user,
  });
};

export { getCurrentUserDetails };
