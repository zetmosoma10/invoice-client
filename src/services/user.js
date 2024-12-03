import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosInstance";

// * GET user details
const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/user/get-current-user");
  return data;
};

// * GET USER FROM LOCALSTORAGE
const getUserFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return jwtDecode(token);
  }
  return null;
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
const deleteProfilePics = async () => {
  const { data } = await axiosInstance.post("/user/delete-profile-image");
  return data;
};

// * DELETE USER
const deleteAccount = async (user) => {
  const { data } = await axiosInstance.post("/user/delete-user", user);
  return data;
};

export {
  getCurrentUser,
  uploadFile,
  deleteProfilePics,
  deleteAccount,
  getUserFromLocalStorage,
};
