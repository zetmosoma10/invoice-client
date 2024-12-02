import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://invoice-api-av4j.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    console.log("Unexpected error: ", error);
  }

  return Promise.reject(error);
});

export default axiosInstance;
