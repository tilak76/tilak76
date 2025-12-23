import React, { useRef, useState } from "react";
import "./../styles/Contact.css";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  // EmailJS Configuration
  const SERVICE_ID = "service_qb1lwia";
  const TEMPLATE_ID = "template_urc4uyd";
  const PUBLIC_KEY = "bReHHliTqrnCHDnm_";

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setLoading(false);
          toast.success("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          setLoading(false);
          console.error("FAILED...", error.text);
          toast.error("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="contact-section">
      {/* Toast Notification Positioned Here */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="contact-container">
        <div className="contact-wrapper">
          {/* Left Side: Contact Info */}
          <div className="contact-info">
            <h2 className="contact-heading">Connect With Me</h2>
            <div className="contact-details">
              <p>
                <FaPhoneAlt className="contact-icon" /> <span>+91 7627974101</span>
              </p>
              <p>
                <FaEnvelope className="contact-icon" /> <span>tilakmishra.76@gmail.com</span>
              </p>
            </div>

            <div className="contact-socials">
              <a href="https://www.linkedin.com/in/tilak-mishra-101108174/" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://github.com/tilak76" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href="mailto:tilakmishra.76@gmail.com">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="contact-form-container">
            <h2 className="form-heading">Get In Touch</h2>
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-row">
                <input type="text" name="from_name" placeholder="First Name" required />
                <input type="text" name="last_name" placeholder="Last Name" required />
              </div>
              <div className="form-row">
                <input type="email" name="from_email" placeholder="Email address" required />
                <input type="tel" name="phone" placeholder="Phone No." />
              </div>
              <textarea name="message" placeholder="Message" required></textarea>
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
