import React, { useState, useEffect } from "react";
import "./../styles/Home.css";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import image from "../assets/tilak.jpeg";

export default function Home() {
  const fileId = "1J8UB7G6KX1cVWL4d_mGT6bEdwrU5pVHC";

  const handleResumeClick = () => {
    window.open(`https://drive.google.com/file/d/${fileId}/view`, "_blank");
  };

  // Typing Effect Logic
  const roles = ["Full Stack Developer", "Tech Enthusiast", "Web Designer"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(currentRole.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      } else {
        setText(currentRole.slice(0, index - 1));
        setIndex((prev) => prev - 1);
      }
    }, deleting ? 50 : 150);

    if (!deleting && index === currentRole.length) {
      setTimeout(() => setDeleting(true), 1000);
    } else if (deleting && index === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, roleIndex]);

  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title">
            Hi, I'm <span>Tilak Kumar Mishra</span>
          </h1>

          <h2 className="home-role">
            I am a <span className="typing-text">{text}</span>
            <span className="cursor">|</span>
          </h2>

          <p className="home-desc">
            Passionate about building modern, responsive, and user-friendly web applications.
            Transforming ideas into reality through code.
          </p>

          <div className="home-buttons">
            <button onClick={handleResumeClick} className="home-btn primary">
              Download Resume
            </button>
            <a href="#projects" className="home-btn secondary">
              View My Work
            </a>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/tilak76"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon github"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/tilak-mishra-101108174/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/7627974101"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon whatsapp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:tilakmishra.76@gmail.com"
              className="social-icon email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="home-image">
          <img src={image} alt="Tilak Kumar Mishra" />
        </div>
      </div>
    </section>
  );
}
