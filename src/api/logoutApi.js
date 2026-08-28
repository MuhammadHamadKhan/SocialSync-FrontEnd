import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const logoutApi = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};
export const deleteApi = async () => {
  const response = await api.delete("/api/auth/delete");
  return response.data;
};
