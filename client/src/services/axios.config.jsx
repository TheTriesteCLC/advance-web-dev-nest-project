import axios from "axios";
import GetCookie from "../hooks/GetCookie";

const instance = axios.create({
  // baseURL: "http://localhost:5001",
<<<<<<< HEAD
  // baseURL: "http://localhost:3000",
  baseURL: import.meta.env.VITE_API_URL,
=======
  baseURL: "http://coursera.zapto.org:5001",
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b

  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  function (config) {
    const token = GetCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
