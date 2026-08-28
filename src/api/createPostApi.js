import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  withCredentials: true,
});
export const createPostApi = async (formData) => {
  const response = await api.post("/api/post/create/post", formData);
  return response.data;
};
export const publishPostApi = async ({ postId, platforms }) => {
  const response = await api.post(`/api/post/${postId}/publish`, { platforms });
  return response.data;
};
