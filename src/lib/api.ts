import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
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
  (error) => {
    // Handle global errors, e.g., token expiration, server errors
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired or unauthorized
        console.error('Unauthorized, redirect to login...');
        // Optionally, redirect to login page
      }
      if (error.response.status === 500) {
        console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      // No response from server
      console.error('No response from server:', error.request);
    } else {
      // Other errors
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  }
);

export { api };
