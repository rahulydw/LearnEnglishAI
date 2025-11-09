import axios from "axios";
import { toast } from "react-hot-toast";

// Create instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://talkone.onrender.com",
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const body = config.data;

    // Always send cookies
    config.withCredentials = true;

    // Auto detect FormData
    if (body instanceof FormData) {
      delete config.headers["Content-Type"]; // Browser sets boundary
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handles 300+ errors also)
api.interceptors.response.use(
  // SUCCESS (Status 200–299)
  (response) => {
    const res = response.data;

    // Backend success:false → treat as error
    if (res?.success === false) {
      toast.error(res.message || "Something went wrong");
      return Promise.reject(res);
    }

    return res; // DATA clean return
  },

  // ERROR (Status 300–599 + network errors)
  (error) => {
    const status = error?.response?.status;

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    // Specific handling example
    if (status >= 300 && status < 400) {
      toast.error(`Redirect Error (${status}): ${message}`);
    } else if (status === 401) {
      toast.error("Unauthorized! Please login");
    } else if (status === 404) {
      toast.error("Not Found!");
    } else if (status >= 500) {
      toast.error("Server Error! Try again later.");
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
