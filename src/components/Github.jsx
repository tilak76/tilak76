// Github.js
import React from "react";
import "./../styles/Github.css";
import { FaGithub } from "react-icons/fa";

export default function Github() {
  return (
    <>
      {/* 🎯 Contribution Section */}
      <section id="github-contrib" className="github-section contrib-section">
        <div className="github-container">
          <h2 className="github-title">My GitHub Contribution</h2>
          <div className="github-card">
            <img
              src="https://ghchart.rshah.org/00ffff/tilak76"
              alt="GitHub Contribution Graph"
              className="github-image"
            />
            <div className="social-icons">
              <a
                href="https://github.com/tilak76"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub /> Visit GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 GitHub Stats Section */}
      <section id="github-stats" className="github-section stats-section">
        <div className="github-container">
          <h2 className="github-title">My GitHub Stats</h2>
          <div className="github-stats-grid">
            <div className="github-card">
              <img
                src="https://github-readme-stats.vercel.app/api?username=tilak76&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=00ffff&icon_color=ff00cc"
                alt="GitHub Stats"
                className="github-image"
              />
            </div>
            <div className="github-card">
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=tilak76&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=00ffff&icon_color=ff00cc"
                alt="Top Languages"
                className="github-image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
