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
            {/* <img
              src="https://ghchart.rshah.org/00ffff/tilak76"
              alt="GitHub Contribution Graph"
              className="github-image"
            /> */}
            <div className="contribution-graph">
              <div className="graph-months">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
              <div className="graph-grid">
                {[...Array(364)].map((_, i) => {
                  const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
                  return <div key={i} className={`graph-box level-${level}`}></div>;
                })}
              </div>
            </div>
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
            {/* Static Stats Card to ensure visibility */}
            <div className="github-card custom-stat-card">
              <h3>GitHub Statistics</h3>
              <div className="stat-grid">
                <div className="stat-item">
                  <span className="stat-label">Commits</span>
                  <span className="stat-value">120+</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">PRs</span>
                  <span className="stat-value">15</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Issues</span>
                  <span className="stat-value">8</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Contribs</span>
                  <span className="stat-value">30+</span>
                </div>
              </div>
            </div>

            {/* Static Languages Card */}
            <div className="github-card custom-stat-card">
              <h3>Most Used Languages</h3>
              <div className="lang-bars">
                <div className="lang-item">
                  <div className="lang-header">
                    <span>JavaScript</span>
                    <span>65%</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill js" style={{ width: '65%', background: '#f1e05a' }}></div></div>
                </div>
                <div className="lang-item">
                  <div className="lang-header">
                    <span>HTML/CSS</span>
                    <span>30%</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill html" style={{ width: '30%', background: '#e34c26' }}></div></div>
                </div>
                <div className="lang-item">
                  <div className="lang-header">
                    <span>React</span>
                    <span>50%</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill react" style={{ width: '50%', background: '#61dafb' }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
