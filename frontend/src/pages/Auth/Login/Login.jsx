import { useState } from "react";
import "./Login.css";
import { login, loginWithGoogle } from "../../../api/authApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      console.log("Login Success", data);
    } catch (err) {
      console.log("Login Failed", err);
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className={"login-container"}>
      <div className={"outerBox"}>

        <div className={"formSection"}>

          <div className={"formBox"}>
            <h2 className={"title"}>Login</h2>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <div className="passwordBox">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="togglePassword"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                </span>
              </div>
              <div className={"forgot"}>Forgot Password?</div>
              <button type="submit" className={"signinBtn"}>
                Sign in
              </button>
            </form>

            <div className={"or"}>Or continue with</div>
            <div className={"socialLogin"}>
              <button className={"googleBtn"}>
                <img
                  onClick={handleGoogleLogin}
                  src="/assets/icons/google.png"
                  alt="Google"
                />
              </button>
              <button className={"facebookBtn"}>
                <img
                  src="/assets/icons/facebook-logo.png"
                  alt="Facebook"
                />
              </button>

            </div>

            <div className={"register"}>
              Don’t have an account yet? <a href="/signup">Register for free</a>
            </div>
          </div>
        </div>
        {/* <div className={"imageSection"}>
          <img src="/assets/images/login_500x500.png" alt="CoStay mascot" />
        </div> */}
      </div>
    </div>
  );
}
