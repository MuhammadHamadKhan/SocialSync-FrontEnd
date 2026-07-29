import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const logoutApi = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};
