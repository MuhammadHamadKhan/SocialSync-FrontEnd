import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const getProPaymentsApi = async () => {
  const response = await api.get("/api/admin/pro-payments");
  return response.data;
};

export const approveProPaymentApi = async (id, transactionId) => {
  const response = await api.patch(`/api/admin/pro-payments/${id}/approve`, {
    transactionId,
  });
  return response.data;
};
export const rejectProPaymentApi = async (id, reason) => {
  const response = await api.patch(`/api/admin/pro-payments/${id}/reject`, {
    reason,
  });
  return response.data;
};
