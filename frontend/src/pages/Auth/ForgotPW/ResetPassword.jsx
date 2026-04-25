import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../api/authApi";
import "./ResetPassword.css";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return <div>Email không hợp lệ</div>;
    }

    if (loading) return;
    setLoading(true);

    try {
      await resetPassword(email, code, newPassword);

      alert("Đổi mật khẩu thành công!");

      //quay lại login
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Đặt lại mật khẩu</h2>

        <p>
          Email: <b>{email}</b>
        </p>

        <form onSubmit={handleSubmit}>
          <label>Mã xác nhận (OTP)</label>
          <input
            type="text"
            placeholder="Nhập mã OTP"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <label>Mật khẩu mới</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </form>

        <div className="back-login">
          <a href="/login">Quay lại đăng nhập</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
