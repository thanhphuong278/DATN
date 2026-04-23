import React, { useState } from "react";
import "./ForgotPW.css";
import { forgotPassword } from "../../../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // chống spam
    setLoading(true);

    try {
      await forgotPassword({ email }); // ✅ FIX QUAN TRỌNG

      alert("Đã gửi mã reset về email");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Email không tồn tại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <a href="/login" className="back-link">
          Quay lại đăng nhập
        </a>

        <h2 className="forgot-title">Quên mật khẩu?</h2>

        <p className="forgot-desc">
          Đừng lo lắng! Nhập địa chỉ email của bạn và chúng tôi sẽ gửi link đặt
          lại mật khẩu cho bạn.
        </p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <label htmlFor="email">Địa chỉ Email</label>

          <input
            type="email"
            id="email"
            placeholder="Nhập địa chỉ email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="resetBtn" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
          </button>
        </form>

        <div className="extra-links">
          <span>Bạn nhớ mật khẩu rồi?</span>
          <a href="/login" className="login-link">
            Đăng nhập ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;