import axios from 'axios';

// Read environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '5000', 10);

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'COntent-Type': 'application/json',
  },
});

// Handle error globally if needed
API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data || 'Something went wrong');
  }
);

export default API;
