import axios from "axios";

const API_URL = ""; // sau này thay bằng URL backend của bạn

// Đăng nhập bằng email + password
export const login = async (form) => {
  try {
    const res = await axios.post(`${API_URL}/login`, form);
    return res.data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

// Đăng nhập bằng Google
export const loginWithGoogle = async () => {
  try {
    window.open(`${API_URL}/google-login`, "_self");
  } catch (err) {
    console.error("Google login error:", err);
    throw err;
  }
};

// Đăng ký tài khoản (email + password)
export const signup = async (form) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, form);
    return res.data;
  } catch (err) {
    console.error("Signup error:", err);
    throw err;
  }
};

// Đăng ký bằng Google
export const signupWithGoogle = async () => {
  try {
    window.open(`${API_URL}/google-signup`, "_self");
  } catch (err) {
    console.error("Google signup error:", err);
    throw err;
  }
};

// Gửi OTP tới email
export const sendOtp = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/send-otp`, { email });
    return res.data;
  } catch (err) {
    console.error("Send OTP error:", err);
    throw err;
  }
};

// Xác thực OTP
export const verifyOtp = async (email, code) => {
  try {
    const res = await axios.post(`${API_URL}/verify-otp`, { email, code });
    return res.data;
  } catch (err) {
    console.error("Verify OTP error:", err);
    throw err;
  }
};
