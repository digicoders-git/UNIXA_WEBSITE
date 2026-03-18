import axios from "axios";

import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = API_URL?.replace('/api', '') || 'http://localhost:5000';

// Helper: convert relative /uploads/... path to full backend URL
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

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

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors only for real API failures
    if (error.response?.status === 401 && !error.config?.url?.includes('mock')) {
      const token = localStorage.getItem('userToken');
      // Only clear token if it's not a mock token
      if (token && !token.includes('mock_jwt_token')) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userData');
        
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
