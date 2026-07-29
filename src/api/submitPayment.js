import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000", // Points to your local backend server
  headers: {
    "Content-Type": "application/json", // Tells the server you are sending JSON data
  },
});

export const submitPaymentApi = async (paymentData) => {
  try {
    const response = await api.post(
      "/api/auth/submit-pro-payment",
      paymentData,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
