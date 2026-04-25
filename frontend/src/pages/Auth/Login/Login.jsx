import { useState } from "react";
import "./Login.css";
import { login, loginWithGoogle } from "../../../api/authApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return; // chống spam click
    setLoading(true);

    try {
      const data = await login(form);

      // lưu token
      if (remember) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      } else {
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
      }

      console.log("Login Success:", data);

      // redirect
      window.location.href = "/";
    } catch (err) {
      console.log("Login Failed:", err);

      const message = err.response?.data?.message || "Sai email hoặc mật khẩu";
      console.log("FORM:", form);

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE =================
  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Đăng nhập</h2>

        <form onSubmit={handleLogin} className="login-form">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="form-label">Mật khẩu:</label>
          <div className="passwordBox">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Nhập mật khẩu"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa fa-eye-slash"></i>
              ) : (
                <i className="fa fa-eye"></i>
              )}
            </span>
          </div>

          <div className="options">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Ghi nhớ đăng nhập
            </label>
            <a href="/forgot-password" className="forgot-link">
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" className="signinBtn" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="register">
          Bạn chưa có tài khoản? <a href="/signup">Đăng ký ngay</a>
        </div>

        <div className="divider">Hoặc đăng nhập bằng</div>

        <div className="socialLogin">
          <button className="googleBtn" onClick={handleGoogleLogin}>
            <img src="/assets/icons/google.png" alt="Google" />
            Google
          </button>

          <button className="facebookBtn">
            <img src="/assets/icons/facebook-logo.png" alt="Facebook" />
            Facebook
          </button>
        </div>

        <div className="terms">Điều khoản dịch vụ & Chính sách bảo mật</div>
      </div>
    </div>
  );
}
