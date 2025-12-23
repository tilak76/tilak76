// Navbar.js
import React, { useState, useEffect } from "react";
import "./../styles/Navbar.css";
import { FaBars, FaTimes, FaFileDownload } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const fileId = "1J8UB7G6KX1cVWL4d_mGT6bEdwrU5pVHC";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleResumeDownload = () => {
    // Open in new tab
    window.open(`https://drive.google.com/file/d/${fileId}/view`, "_blank");

    // Trigger download (might be blocked by some browsers but good to try)
    const link = document.createElement('a');
    link.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
    link.download = 'Tilak_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Navbar Background Logic
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Progress Logic
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="logo" onClick={() => window.scrollTo(0, 0)}>
        TM<span>.</span>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="#home" onClick={toggleMenu}>Home</a></li>
        <li><a href="#about" onClick={toggleMenu}>About</a></li>
        <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
        <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
        <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
        <li>
          <button className="resume-btn" onClick={handleResumeDownload}>
            Resume <FaFileDownload />
          </button>
        </li>
      </ul>
    </nav>
  );
}

