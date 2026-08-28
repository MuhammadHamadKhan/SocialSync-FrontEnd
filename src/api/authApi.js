import axios from "axios";
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const authMe = async () => {
  const response = await api.get("/api/auth/authenticate");
  return response.data;
};
