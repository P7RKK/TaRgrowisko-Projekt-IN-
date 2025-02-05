// Footer Component
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>O nas</h3>
          <p>TarGrowisko to najlepsze miejsce do zakupu gier, akcesoriów i sprzętu gamingowego. Dołącz do nas już dziś!</p>
        </div>
        <div className="footer-section">
          <h3>Pomoc</h3>
          <ul>
            <li><a href="/support">Centrum pomocy</a></li>
            <li><a href="/contact">Kontakt</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Social Media</h3>
          <ul className="social-links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 TarGrowisko. Wszystkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
};

export default Footer;
