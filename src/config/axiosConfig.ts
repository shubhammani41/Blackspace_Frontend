// src/axiosConfig.js
import axios from 'axios';
import { baseURL } from '../constants/apiConstants';
import { getTokenFromLocalStorage } from '../constants/appConstants';

const axiosInstance = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  timeout: 60000, // Optional: set a timeout for requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    if (!config?.url?.startsWith('/public')) {
      const token = getTokenFromLocalStorage();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

export default axiosInstance;
