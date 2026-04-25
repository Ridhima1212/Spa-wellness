import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand */}
        <div className="footer-brand">
          <h3>Spa Wellness</h3>
          <p>
            A peaceful sanctuary dedicated to relaxation, rejuvenation, and
            holistic wellness.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            {/* ✅ Route */}
            <li><Link to="/">Home</Link></li>

            {/* ✅ Route */}
            <li><Link to="/services">Services</Link></li>

            {/* ✅ Scroll inside Home */}
            <li><a href="/#about">About</a></li>

            {/* ✅ Scroll inside Home */}
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📍 Wellness Street, Serenity City</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@spawellness.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Spa Wellness. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;