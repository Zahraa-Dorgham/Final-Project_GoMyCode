import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="color-strip">
                <div className="strip-blue"></div>
                <div className="strip-purple"></div>
                <div className="strip-yellow"></div>
                <div className="strip-pink"></div>
            </div>

            <div className="container footer-content">
                <div className="row">
                    <div className="col-md-3">
                        <h3 className="brand-logo">FIT CLUB</h3>
                        <p className="footer-text">
                            Transform your daily life. We combine discipline, wellness, and technology to help you achieve your most ambitious goals.
                        </p>
                    </div>

                    <div className="col-md-3">
                        <h4 className="footer-title">ABOUT</h4>
                        <ul className="footer-links">
                            <li><a href="#">aaaaa</a></li>
                            <li><a href="#">aaaa</a></li>
                            <li><a href="#">aaaaaaaaa</a></li>
                            <li><a href="#">aaaaaa</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4 className="footer-title">CLASSES</h4>
                        <ul className="footer-links">
                            <li><a href="#">bbbb</a></li>
                            <li><a href="#">bbbbb</a></li>
                            <li><a href="#">bbb</a></li>
                            <li><a href="#">bbb</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4 className="footer-title">CONTACT US</h4>
                        <div className="contact-item">
                            <FaMapMarkerAlt className="icon" />
                            <span>For All Locations</span>
                        </div>
                        <div className="contact-item">
                            <FaPhoneAlt className="icon" />
                            <span>+216 55789249</span>
                        </div>
                    </div>
                </div>

                <div className="social-section">
                    <a href="#" className="social-icon"><FaFacebookF /></a>
                    <a href="#" className="social-icon"><FaInstagram /></a>
                    <a href="#" className="social-icon"><FaTwitter /></a>
                    <a href="#" className="social-icon"><FaPinterestP /></a>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 FIT CLUB. All rights reserved.</p>
                    <div className="bottom-links">
                        <a href="#">SHOP</a> <a href="#">COACHES</a> <a href="#">CLASSES</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;