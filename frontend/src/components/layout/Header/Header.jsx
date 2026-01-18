import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="container">
          <div className="contact-info">
            <div className="address">
              <i className="fas fa-map-marker-alt"></i> 470 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng
            </div>
            <div className="phone">
              <i className="fas fa-phone-alt"></i> +84 123 456 789
            </div>
            <div className="email">
              <i className="fas fa-envelope"></i> costayvn@gmail.com
            </div>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="container">
          <div className="logo">CoStay</div>

          <nav className="nav-menu">
            <Link to="/">Trang chủ</Link>
            <Link to="/about">Giới thiệu</Link>
            <Link to="/services">Dịch vụ</Link>
            <Link to="/booking">Đặt sự kiện</Link>
            <Link to="/contact">Liên hệ</Link>
          </nav>
          
          <div className="actions">
            <select className="language-select">
              <option value="vi">VI</option>
              <option value="en">EN</option>
            </select>
            <Link to="/login" className="login-btn">ĐĂNG NHẬP</Link>
            <Link to="/signup" className="register-btn">ĐĂNG KÝ</Link>
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
