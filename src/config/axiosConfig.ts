// src/axiosConfig.js
import axios from 'axios';
import { baseURL } from '../constants/apiConstants';

const axiosInstance = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  timeout: 10000, // Optional: set a timeout for requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // For example, add an Authorization header
    // config.headers.Authorization = 'Bearer ' + token;
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
