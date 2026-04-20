import { useState } from "react";
import "./SignUp.css";
import useNavigation from "../../../hooks/useNavigation";
import { signup, signupWithGoogle } from "../../../api/authApi";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const { goToLogin } = useNavigation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (!form.agree) {
      alert("Bạn cần đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.");
      return;
    }

    try {
      const data = await signup(form); // API register
      console.log("Signup Success", data);
      // Sau khi đăng ký thành công, giả lập gửi OTP
      console.log("Đã gửi OTP đến email:", form.email);
      setStep("otp");
    } catch (err) {
      console.log("Signup Failed", err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    // Sau này backend sẽ verify OTP
    if (otp === "123456") {
      alert("Đăng ký thành công!");
      goToLogin();
    } else {
      alert("OTP không đúng. Vui lòng thử lại.");
    }
  };

  const handleGoogleSignup = async () => {
    await signupWithGoogle();
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">
          {step === "form" ? "Đăng ký" : "Xác thực Email"}
        </h2>

        {step === "form" ? (
          <form onSubmit={handleSignup} className="signup-form">
            <input
              type="text"
              name="name"
              placeholder="Tên đăng nhập"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange}
            />

            <div className="passwordBox">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
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

            <div className="passwordBox">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="togglePassword"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <i className="fa fa-eye-slash"></i>
                ) : (
                  <i className="fa fa-eye"></i>
                )}
              </span>
            </div>

            <div className="agreeBox">
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật
              </label>
            </div>

            <button type="submit" className="signupBtn">
              Đăng ký
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="verify-form">
            <p>
              Xin chào {form.name},<br />
              Mã OTP đã được gửi đến email: <strong>{form.email}</strong>.<br />
              Vui lòng nhập mã OTP để xác thực.
            </p>
            <input
              type="text"
              name="otp"
              placeholder="Nhập OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="signupBtn">
              Xác thực Email
            </button>
            <p className="expire-note">Link này sẽ hết hạn sau 24 giờ.</p>
          </form>
        )}

        <div className="divider">Hoặc đăng ký với</div>
        <div className="socialLogin">
          <button className="googleBtn" onClick={handleGoogleSignup}>
            <img src="/assets/icons/google.png" alt="Google" /> Google
          </button>
          <button className="facebookBtn">
            <img src="/assets/icons/facebook-logo.png" alt="Facebook" />{" "}
            Facebook
          </button>
        </div>

        <div className="loginLink">
          Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
        </div>
      </div>
    </div>
  );
}
