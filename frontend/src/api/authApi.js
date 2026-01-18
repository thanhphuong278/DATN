import axios from "axios";

const API_URL = "";

export const login = async (form) => {
  try {
    // gọi API login
    const res = await axios.post(`${API_URL}/login`, form);
    return res.data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

export const loginWithGoogle = async () => {
  try {
    // thường sẽ redirect sang Google OAuth
    window.open(`${API_URL}/google`, "_self");
  } catch (err) {
    console.error("Google login error:", err);
    throw err;
  }
};

export const sendOtp = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/send-otp`, { email });
    return res.data;
  } catch (err) {
    console.error("Send OTP error:", err);
    throw err;
  }
};

export const verifyOtp = async (email, code) => {
  try {
    const res = await axios.post(`${API_URL}/verify-otp`, { email, code });
    return res.data;
  } catch (err) {
    console.error("Verify OTP error:", err);
    throw err;
  }
};
