import { useState } from "react";
import styles from "./style.module.css";
import { login, loginWithGoogle } from "../../../api/authApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

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
    <div className={styles.container}>
      <div className={styles.outerBox}>
        <div className={styles.formSection}>
          <div className={styles.formBox}>
            <h1 className={styles.logo}>CoStay</h1>
            <h2 className={styles.title}>Login</h2>

            <form onSubmit={handleLogin}>
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
              <div className={styles.forgot}>Forgot Password?</div>
              <button type="submit" className={styles.signinBtn}>
                Sign in
              </button>
            </form>

            <div className={styles.or}>Or continue with</div>
            <div className={styles.socialLogin}>
              <button onClick={handleGoogleLogin} className={styles.googleBtn}>
                <img src="/assets/icons/google.png" alt="Google" />
                Google
              </button>
            </div>

            <div className={styles.register}>
              Don’t have an account yet? <a href="/signup">Register for free</a>
            </div>
          </div>
        </div>
        <div className={styles.imageSection}>
          <img src="/assets/images/login_500x500.png" alt="CoStay mascot" />
        </div>
      </div>
    </div>
  );
}
