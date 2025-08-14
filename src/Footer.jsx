import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Conference Event Planner</h3>
          <p>Professional event planning made simple</p>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Venue Selection</li>
            <li>Equipment Rental</li>
            <li>Catering Services</li>
            <li>Event Coordination</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@eventplanner.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Conference Event Planner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;