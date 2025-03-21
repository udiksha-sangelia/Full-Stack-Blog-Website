import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import "../styles/Contact.css";

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-card">
      {/* 📍 Address */}
      <div className="contact-info">
        <FaMapMarkerAlt className="icon" />
        <p>123 Blog Street, Bangalore, India</p>
      </div>

      {/* 📞 Phone Number */}
      <div className="contact-info">
        <FaPhone className="icon" />
        <p>+91 9876543210</p>
      </div>

      {/* 📧 Email */}
      <div className="contact-info">
        <FaEnvelope className="icon" />
        <p>contact@blogwebsite.com</p>
      </div>

      {/* 📅 Working Hours */}
      <div className="contact-info">
        <p><strong>Working Hours:</strong> Mon - Fri (9 AM - 6 PM)</p>
      </div>

      {/* 🌎 Social Media Links */}
      <div className="social-icons">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="icon" /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="icon" /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="icon" /></a>
      </div>

    </div>
    </div>
  );
};

export default Contact;
