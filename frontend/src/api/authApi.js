import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

const api = axios.create({
  baseURL: API_URL,
});

// ================= INTERCEPTOR =================

// Gắn accessToken tự động
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= AUTH =================

export const login = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

export const signup = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

export const verifyOtp = async (email, otp) => {
  const res = await api.post("/verify", { email, otp });
  return res.data;
};

export const resendOtp = async (email) => {
  const res = await api.post(`/resend-otp?email=${encodeURIComponent(email)}`);
  return res.data;
};

// ================= GOOGLE =================

export const loginWithGoogle = () => {
  window.location.href = "http://localhost:8081/oauth2/authorization/google";
};

// ================= TOKEN =================

export const refreshToken = async (token) => {
  const res = await api.post("/refresh", { token }); // ✅ sửa lại body
  return res.data;
};

// ================= PASSWORD =================

export const forgotPassword = async (email) => {
  const res = await api.post(
    `/forgot-password?email=${encodeURIComponent(email)}`,
  );
  return res.data;
};

export const resetPassword = async (email, code, newPassword) => {
  const res = await api.post(
    `/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}&newPassword=${encodeURIComponent(newPassword)}`,
  );
  return res.data;
};

export default api;