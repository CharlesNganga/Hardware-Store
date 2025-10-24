// src/api/api.js
import axios from "axios";

// --- THIS IS THE CRITICAL LINE ---
// Tell Axios to send cookies (like Django's sessionid) with every request
axios.defaults.withCredentials = true;

// 1. Keep this export from your previous version.
// You NEED this for image paths.
export const backendUrl = "http://localhost:8000";

// 2. Define the API base URL
const BASE_URL = `${backendUrl}/api/`;

// 3. Create your new, robust axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// 4. Keep your new interceptors (they are perfect)
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here later
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// 5. Export the api instance
export default api;