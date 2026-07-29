import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const authMe = async () => {
  const response = await api.get("/api/auth/authenticate");
  return response.data;
};
