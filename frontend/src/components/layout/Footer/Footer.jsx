import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* LEFT */}
        <div className="footer-col">
          <h2 className="brand">HI KOREA</h2>
          <p>
            Nền tảng học và luyện thi TOPIK trực tuyến giúp bạn làm quen với kỳ thi
            thực tế thông qua hệ thống đề chuẩn, chấm điểm tự động và phân tích
            kết quả chi tiết.
          </p>

          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="footer-col">
          <h3>Chức năng</h3>
          <ul>
            <li><a href="#">Luyện đề TOPIK</a></li>
            <li><a href="#">Thi thử online</a></li>
            <li><a href="#">Phân tích kết quả</a></li>
            <li><a href="#">Lộ trình học</a></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-col">
          <h3>Hỗ trợ</h3>
          <ul>
            <li><a href="#">Hướng dẫn sử dụng</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Liên hệ</h3>
          <p>Email: hikorea@gmail.com</p>
          <p>Hotline: 0123 456 789</p>
          <p>Đà Nẵng, Việt Nam</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 HI KOREA — Nền tảng học và luyện thi TOPIK trực tuyến
      </div>
    </footer>
  );
};

export default Footer;