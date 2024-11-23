import axiosInstance from "./axiosInstance";

const getUser = async () => {
  const { data } = await axiosInstance.get("/user/get-current-user");
  return data;
};

// profilePicture
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

export { getUser, uploadFile };
