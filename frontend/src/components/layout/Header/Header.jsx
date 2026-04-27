import React, { useState, useRef, useEffect } from "react"; import "./header.css";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              <div className="user-menu" ref={dropdownRef}>
                {/* avatar click */}
                <div
                  className="avatar-wrapper"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" className="avatar-img" />
                  ) : (
                    <div className="avatar-fallback">
                      {(user.fullName || user.username || user.email)
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                <div className={`dropdown ${dropdownOpen ? "show" : ""}`}>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>

                  {user?.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin
                    </Link>
                  )}

                  <div className="dropdown-divider" />

                  <button
                    className="dropdown-item logout"
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </button>
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
