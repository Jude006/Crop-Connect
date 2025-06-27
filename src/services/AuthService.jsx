import axios from 'axios';

// Use the same port your backend is running on
const API_URL = 'https://crop-connect-server.onrender.com'; 

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, // 5 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    let errorMessage = 'Network error - please try again later';
    
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data.message || 'Registration failed';
    } else if (error.request) {
      // Request was made but no response
      errorMessage = 'Server not responding - please try again later';
    }
    
    throw new Error(errorMessage);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
      localStorage.setItem(
      "user",
      JSON.stringify({
        ...response.data.user, // Store the entire user object
        token: response.data.token // Include the token
      })
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'Network error - please try again later';
    
    if (error.response) {
      errorMessage = error.response.data.message || 'too many attempts try again in the next 5 minute';
    } else if (error.request) {
      errorMessage = 'Server not responding - please try again later';
    }else if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }

    
    throw new Error(errorMessage);
  }
};