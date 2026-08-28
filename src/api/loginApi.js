import axios from "axios";
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const loginApi = async (formData) => {
  const response = await api.post("/api/auth/login", formData);
  return response.data;
};
