import React, { useState } from "react";
import "./ForgotPW.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sau này backend sẽ xử lý gửi mail reset
    alert(`Liên kết khôi phục đã gửi tới: ${email}`);
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
          <button type="submit" className="resetBtn">
            Gửi link đặt lại mật khẩu
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
