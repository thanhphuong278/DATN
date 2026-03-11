import React from "react";
import "./Footer.css"; // import file CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2 className="brand">CoStay</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris
          risus, lobortis a commodo at, sit amet.
        </p>
        <div className="social-icons">
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <ul className="footer-nav">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Accommodation</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <p className="copyright">© 2026 CoStay. All Rights Reserved.</p>
      </div>

      <div className="footer-right">
        <h3>Get In Touch</h3>
        <p>74C Aaliyah River, Bayerhaven</p>
        <p>(603) 555-0123</p>
        <ul className="footer-links">
          <li>
            <a href="#">Terms & Conditions</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
