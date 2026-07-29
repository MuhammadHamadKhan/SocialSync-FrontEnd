import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const shopifyApi = async (shopifyUrl) => {
  const response = await api.post("/api/store/extract/link", shopifyUrl);

  return response.data;
};
