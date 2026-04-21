import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/Auth/SignUp/SignUp.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import Home from "../pages/Home/Home.jsx";
import ForgotPassword from "../pages/Auth/ForgotPW/ForgotPW.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import Reviews from "../pages/Reviews/Reviews.jsx";
import Flashcard from "../pages/Flashcard/Flashcard.jsx";
import CreateFlashcard from "../pages/Flashcard/CreateFlashcard.jsx";
import StudyFlashcard from "../pages/Flashcard/StudyFlashcard.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/" element={<Home />} />
      <Route path="flashcard" element={<Flashcard />} />
      <Route path="flashcard/create-flashcard" element={<CreateFlashcard />} />
      <Route path="/study/:id" element={<StudyFlashcard />} />
    </Routes>
  );
}
