import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "ngrok-skip-browser-warning": "skip-browser-warning",
  },
});

AxiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },
  (error) => {
    console.log(error.response.data.error.message);
    // return Promise.reject(error);
    throw new Error(error.response.data.error.message);
  }
);
// AxiosInstance.interceptors.response.use(
//   (response) => {
//     if (response.status === 200) return response.data;
//   },
//   (error) => {
//     const errorMessage = error.response.data.message;
//     return Promise.reject(errorMessage);
//   }
// );
AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosInstance;
