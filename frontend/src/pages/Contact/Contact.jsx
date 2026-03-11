import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      {/* Tiêu đề và mô tả */}
      <h2>Liên hệ với chúng tôi</h2>
      <p>Hãy để lại thông tin, chúng tôi sẽ phản hồi sớm nhất.</p>

      {/* Grid chia 2 cột: thông tin liên hệ + form */}
      <div className="contact-grid">
        {/* Thông tin liên hệ */}
        <div className="contact-info">
          <p>📍 123 Đường ABC, Đà Nẵng</p>
          <p>📞 0123 456 789</p>
          <p>✉️ support@costay.com</p>
        </div>

        {/* Form liên hệ */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tên của bạn"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Nội dung tin nhắn"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Gửi</button>
        </form>
      </div>

      {/* Bản đồ Google Maps hiển thị trực tiếp */}
      <div className="map">
        <iframe
          title="Resort Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.9543115149377!2d108.22969197491457!3d15.96376218470055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421b12ef0b763b%3A0x1123affe8a7d1d01!2zTmjDoCBUcuG7jSBUaOG7iyBBbg!5e0!3m2!1sen!2s!4v1773241760590!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "8px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Liên kết mạng xã hội */}
      <div className="social-links">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Contact;
