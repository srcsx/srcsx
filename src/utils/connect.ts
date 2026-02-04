import axios from "axios";

const cache = new Map();

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.method === "get") {
    const key = config.url + JSON.stringify(config.params);
    const cached = cache.get(key);

    if (cached) {
      config.adapter = () => {
        return Promise.resolve(cached);
      };
    }
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  const key = response.config.url + JSON.stringify(response.config.params);

  cache.set(key, response);
  return response;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/setup?next=" + window.location.href;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
