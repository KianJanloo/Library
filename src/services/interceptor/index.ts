import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Http = axios.create({
  baseURL: baseUrl,
  headers: {'Content-Type': 'application/json'}
});

Http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default Http;
