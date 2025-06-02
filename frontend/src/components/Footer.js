import React from "react";
import {FaEnvelope, FaInstagram, FaLinkedin} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <div className="footer-btn">
        <footer className="footer">
            <p>copyright, All rights reserved</p>
            <ul className="social-lists">
                <li> 
                <a href="https://www.instagram.com/YOUR_ACCOUNT" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="social-icon " />
                </a>
                </li>
                <li>
                <a href="https://www.linkeden.com/YOUR_ACCOUNT" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="social-icon " />
                </a>
                </li>
                <li>
                <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope className="social-icon " />
                </a>
                </li> 
            </ul>
        </footer>
        </div>
    );
}

export default Footer;