import React from "react";
import "./../styles/Skills.css";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaGitAlt, FaGithub, FaJava } from "react-icons/fa";
import {
  SiFigma, SiPostman, SiNetlify, SiMongodb, SiExpress, SiVite,
  SiTailwindcss, SiRedux, SiFirebase
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export default function Skills() {
  const categories = [
    {
      title: "Front-End",
      desc: "My preferred technologies for building responsive and modern UIs.",
      skills: [
        { name: "React", icon: <FaReact /> },
        { name: "HTML5", icon: <FaHtml5 /> },
        { name: "CSS3", icon: <FaCss3Alt /> },
        { name: "JavaScript", icon: <FaJs /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "Redux", icon: <SiRedux /> },
      ]
    },
    {
      title: "Back-End",
      desc: "Backend technologies I use for APIs, servers, and databases.",
      skills: [
        { name: "Node.js", icon: <FaNode /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Firebase", icon: <SiFirebase /> },

      ]
    },
    {
      title: "Tools",
      desc: "My favorite tools for version control, testing, and development.",
      skills: [
        { name: "GitHub", icon: <FaGithub /> },
        { name: "Git", icon: <FaGitAlt /> },
        { name: "VS Code", icon: <VscVscode /> },
        { name: "Postman", icon: <SiPostman /> },
        { name: "Vite", icon: <SiVite /> },
        { name: "Netlify", icon: <SiNetlify /> },
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Technical Skills</h2>
      <div className="skills-container">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <h3 className="category-title">{cat.title}</h3>
            <div className="category-grid">
              {cat.skills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-icon">{skill.icon}</div>
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
            <p className="category-desc">{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
