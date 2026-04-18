import React, { useState } from "react";
import "./header.css";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/flashcard">Flashcard</Link></li>
            <li><Link to="/exam">Luyện thi</Link></li>
            <li><Link to="/courses">Khóa học</Link></li>
            <li><Link to="/reviews">Đánh giá</Link></li>
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
            <Button to="/login">Đăng nhập</Button>
            <Button to="/signup">Đăng ký</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;