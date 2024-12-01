import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// * GET user details
const getUser = async () => {
  const { data } = await axiosInstance.get("/user/get-current-user");
  return data;
};

// * POST profile pic
const uploadFile = async (file) => {
  const { data } = await axiosInstance.post(
    `/user/upload-profile-image`,
    file,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// * REMOVE PROFILE
//delete-profile-image
const deleteProfilePics = async () => {
  const { data } = await axiosInstance.post("/user/delete-profile-image");
  return data;
};

// * DELETE USER
const deleteUserRequest = async (user) => {
  const { data } = await axiosInstance.post("/user/delete-user", user);
  return data;
};

const deleteUser = () => {
  return useMutation({
    mutationFn: (user) => deleteUserRequest(user),
  });
};

export { getUser, uploadFile, deleteProfilePics, deleteUser };
