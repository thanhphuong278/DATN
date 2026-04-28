import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUser } from "../api/authApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch {
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) loadUser();
    else setLoading(false);
  }, []);

  const login = async (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    await loadUser();
  };

  const logout = () => {
    localStorage.clear();

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
