import React from 'react';
import './footer.css';  // Optional for styling

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Alouzious Muhereza. All rights reserved.</p>
        <button className="back-to-top" onClick={scrollToTop}>
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}

export default Footer;
