import axiosInstance from "./axiosInstance";

// * GET user details
const getUser = async () => {
  const { data } = await axiosInstance.get("/user/get-current-user");
  return data;
};

// * PSOT profile pic
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
