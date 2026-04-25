import { useState } from "react";
import "./Login.css";
import { login, loginWithGoogle } from "../../../api/authApi";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const data = await login(form);

      // gọi context
      await loginContext(data);

      // decode role từ token (nhanh gọn)
      const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
      const role = payload.role;

      console.log("ROLE:", role);

      // redirect theo role
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message = err.response?.data || "Sai email hoặc mật khẩu";
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
