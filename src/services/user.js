import axiosInstance from "./axiosInstance";

const getUser = async () => {
  const { data } = await axiosInstance.get("/user/get-current-user");
  return data;
};

export { getUser };
