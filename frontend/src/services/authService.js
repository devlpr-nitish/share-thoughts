import axios from "axios";

// Base URL  for your backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Login service
export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/signin`, { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Signup service
export const signup = async (email, password, firstName, lastName) => {
  const response = await axios.post(`${BASE_URL}/signup`, {
    email,
    password,
    firstName,
    lastName,
  });
  return response.data;
};

// Logout service
export const logout = () => {
  localStorage.removeItem("token");
};
