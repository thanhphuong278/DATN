import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

const api = axios.create({
  baseURL: API_URL,
});

// ================= INTERCEPTOR REQUEST =================

// Gắn accessToken tự động
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  // chống null / undefined string
  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= INTERCEPTOR RESPONSE =================

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const status = err.response?.status;
    const message = err.response?.data || err.message;

    // 🔥 CASE TOKEN EXPIRED
    if (
      status === 401 ||
      (message && message.toString().includes("JWT expired"))
    ) {
      try {
        const refreshToken =
          localStorage.getItem("refreshToken") ||
          sessionStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // 🔄 gọi refresh
        const res = await axios.post("http://localhost:8081/api/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        // 💾 lưu token mới
        localStorage.setItem("accessToken", newAccessToken);

        // 🔁 retry request cũ
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  },
);

// ================= USER =================

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/me");
    return res.data;
  } catch (err) {
    console.error("GET /me failed:", err.response?.data || err.message);
    throw err;
  }
};

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

// FIX: đổi đúng naming cho chuẩn backend
export const refreshToken = async (refreshToken) => {
  const res = await api.post("/refresh", { refreshToken });
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
