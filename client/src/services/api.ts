import axios from 'axios';
import { store } from '../app/store';
import { logout } from '../features/userSlice';

// Read environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '5000', 10);

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle error globally if needed
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error.response?.data || 'Something went wrong');
  }
);

API.interceptors.request.use((config) => {
  // Get the token from Redux Toolkit's `users` slice
  const token = store.getState().users.currentUser?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // Handle request error
  return Promise.reject(error);
});

export default API;
