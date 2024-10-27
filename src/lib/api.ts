import axios from 'axios';
import type { AxiosError } from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include authentication token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle global errors, e.g., token expiration, server errors
    const axiosError = error as AxiosError<{ message: string }>;
    
    if (axiosError.response?.status === 401) {
      // Token expired or unauthorized
      console.error('Unauthorized, redirect to login...');
      // Optionally, redirect to login page
    }
    
    if (axiosError.response?.status === 500) {
      const errorMessage = axiosError.response?.data?.message ?? 'Unknown server error';
      console.error('Server error:', errorMessage);
    }
    
    if (axiosError.request) {
      const requestError = String(axiosError.request);
      console.error('No response from server:', requestError);
    }
    
    if (!axiosError.response && !axiosError.request) {
      const errorMessage = axiosError.message ?? 'Unknown error occurred';
      console.error('Axios error:', errorMessage);
    }
    
    return Promise.reject(error);
  }
);

export { api };
