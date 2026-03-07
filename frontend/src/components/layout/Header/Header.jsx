import React from "react";
import "./header.css";
import Button from "../../common/Button/Button";

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
            <li to="/">Trang chủ</li>
            <li>Dịch vụ</li>
            <li>Đặt sự kiện</li>
            <li>Liên hệ</li>
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
