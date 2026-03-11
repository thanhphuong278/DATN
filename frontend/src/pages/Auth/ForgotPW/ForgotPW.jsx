import React, { useState } from "react";
import "./ForgotPW.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Liên kết khôi phục đã gửi tới: ${email}`);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Quên mật khẩu</h2>
        <p>Nhập email để nhận liên kết đặt lại mật khẩu</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Gửi liên kết</button>
        </form>
        <div className="extra-links">
          <a href="/login">Quay lại đăng nhập</a>
          <a href="/signup">Tạo tài khoản mới</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
