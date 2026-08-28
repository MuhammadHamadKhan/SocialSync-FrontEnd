import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const registerUser = async (payload) => {
  const response = await api.post("/api/auth/register", payload);
  return response.data;
};
export const loginApi = async (formData) => {
  const response = await api.post("/api/auth/login", formData);
  return response.data;
};
