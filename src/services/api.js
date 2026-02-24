import axios from "axios";

import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor if needed (e.g., for tokens)
api.interceptors.request.use(
  (config) => {
    // Public endpoints that don't need auth
    const publicEndpoints = ['/enquiry', '/rental-plans', '/amc-plans', '/products', '/ro-parts', '/payment'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));
    
    if (!isPublicEndpoint) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to suppress console errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Silently handle errors without logging to console
    return Promise.reject(error);
  }
);

export default api;
