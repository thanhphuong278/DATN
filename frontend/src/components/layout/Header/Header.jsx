import React, { useState } from "react";
import "./header.css";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  return (
    <header className="header">
      <div className="nav-bar">
        <div className="logo">
          <Link to="/">HI KOREA</Link>
        </div>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/flashcard">Flashcard</Link>
            </li>
            <li>
              <Link to="/exam">Luyện thi</Link>
            </li>
            <li>
              <Link to="/courses">Khóa học</Link>
            </li>
            <li>
              <Link to="/reviews">Đánh giá</Link>
            </li>
          </ul>
        </nav>

        <div className={`top-actions ${menuOpen ? "open" : ""}`}>
          <div className="language-selector">
            <select>
              <option value="vi">VI</option>
              <option value="en">ENG</option>
            </select>
          </div>

          <div className="auth-buttons">
            {loading ? null : !user ? (
              <>
                <Button to="/login">Đăng nhập</Button>
                <Button to="/signup">Đăng ký</Button>
              </>
            ) : (
              <div className="user-menu">
                <span className="username">
                  {user.fullName || user.username || user.email}
                </span>

                <div className="dropdown">
                  <Link to="/profile">Profile</Link>

                  {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}

                  <button onClick={logout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
