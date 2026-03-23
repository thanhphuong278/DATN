import React from "react";
import "./header.css";
import Button from "../../common/Button/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      {/* Top bar */}
      <div className="top-bar">
        <span>
          <img
            src="../../../../public/assets/icons/location.png"
            className="icon"
          ></img>
          470 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng
        </span>
        <span>
          <img
            src="../../../../public/assets/icons/telephone.png"
            className="icon"
          ></img>
          +84 355 902 873
        </span>
        <span>
          <img
            src="../../../../public/assets/icons/email.png"
            className="icon"
          ></img>
          costay@gmail.com
        </span>
      </div>

      {/* Navigation */}
      <div className="nav-bar">
        <div className="logo">CoStay</div>
        <nav>
          <ul>
            <li>
              <Link to="/" className="active">
                Trang chủ
              </Link>
            </li>
            <li>Dịch vụ</li>
            <li>
              <Link to="/reviews">Đánh giá</Link>
            </li>
            <li>
              <Link to="/contact" className="active">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        <div className="top-actions">
          {/* Language selector */}
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
