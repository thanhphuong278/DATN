
import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">

      <div className="contact-grid">
        <div className="left">
          <div className="info-box address">
            <h3>Địa chỉ</h3>
            <p>470 Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng</p>
          </div>
          <div className="contact-row">
            <div className="info-box">
              <h3>Điện thoại</h3>
              <p>0355 902 873</p>
            </div>
            <div className="info-box">
              <h3>Email</h3>
              <p>costay@gmail.com</p>
            </div>
          </div>      
          <div className="form-section">
            <h2>Gửi thắc mắc cho chúng tôi</h2>
            <p>
              Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi
              và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Tên của bạn</label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên của bạn"
                value={formData.name}
                onChange={handleChange}
                required
              />       
              <div className="row">
                <div>
                  <label>Email của bạn</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label>Số điện thoại của bạn</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Nhập số điện thoại của bạn"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
      
              <label>Nội dung</label>
              <textarea
                name="message"
                placeholder="Nhập nội dung"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button className="contact-submit" type="submit">Gửi</button>

            </form>

          </div>

        </div>

  
        <div className="map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=470%20Tr%E1%BA%A7n%20%C4%90%E1%BA%A1i%20Ngh%C4%A9a%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng&output=embed"
            loading="lazy"
          ></iframe>
        </div>

      </div>

    </div>
  );
};

export default Contact;
