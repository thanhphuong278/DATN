import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/Auth/SignUp/SignUp.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import Home from "../pages/Home/Home.jsx";
import ForgotPassword from "../pages/Auth/ForgotPW/ForgotPW.jsx";
import Contact from "../pages/Contact/Contact.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
