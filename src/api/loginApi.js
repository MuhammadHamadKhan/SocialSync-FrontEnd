import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const loginApi = async (formData) => {
  const response = await api.post("/api/auth/login", formData);
  return response.data;
};
