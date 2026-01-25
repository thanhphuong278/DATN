import { useState } from "react";
import "./SignUp.css";
import useNavigation from "../../../hooks/useNavigation";

export default function SignUp() {
  const [form, setForm] = useState({ usename: "", email: "", password: "" });
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const { goToLogin } = useNavigation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password không khớp!");
      return;
    }

    //API register + sendOTP ở đây

    console.log("Đã gửi OTP đến email:", form.email);
    setStep("otp");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp === "123456") {
      alert("Đăng ký thành công!");
      goToLogin();
    } else {
      alert("OTP không đúng. Vui lòng thử lại.");
    }
  };

  return (
    <div className={"login-container"}>
      <div className={"outerBox"}>
        <div className={"formSection"}>
          <div className={"formBox"}>
            <h1 className={"logo"}>CoStay</h1>
            <h2 className={"title"}>
              {step === "form" ? "Register" : "Enter OTP"}
            </h2>

            {step === "form" ? (
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="username@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className={"signupBtn"}>
                  Register
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div className={"loginLink"}>
                  Mã OTP đã được gửi đến email: {form.email}.
                  <div> Vui lòng kiểm tra hộp thư của bạn.</div>
                </div>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit" className={"signupBtn"}>
                  Verify OTP
                </button>
              </form>
            )}

            <div className={"loginLink"}>
              Already have an account? <a href="/login">Login here</a>
            </div>
          </div>
        </div>

        <div className={"imageSection"}>
          <img src="/assets/images/login_500x500.png" alt="CoStay mascot" />
        </div>
      </div>
    </div>
  );
}
