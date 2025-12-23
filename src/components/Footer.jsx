import React from "react";
import "./../styles/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-section">
      <p>© 2025 Tilak Kumar Mishra | All Rights Reserved</p>
      <button className="scroll-top-btn" onClick={scrollToTop}>
        ⬆️ Top
      </button>
    </footer>
  );
}
