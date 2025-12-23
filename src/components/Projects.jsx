import React from "react";
import "./../styles/Projects.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import matchme from "../assets/matchme.png"
import fitnesspro from "../assets/fitness_pro.png"
import smarthome from "../assets/smarthome.png"
import auramarket from "../assets/aura_market.png"

export default function Projects() {
  const projects = [
    {
      title: "Match Maker",
      desc: "A full-stack matchmaking web application that helps users find compatible partners based on their preferences. It includes both frontend and backend integration.",
      tech: "React, Node.js, Express.js, MongoDB (Full Stack Application)",
      github: "https://github.com/techravi552/matchMekarme",
      netlify: "https://magenta-florentine-9b2c7f.netlify.app/",
      img: matchme
    },
    {
      title: "Fitness Pro",
      desc: "A comprehensive fitness tracking application that allows users to manage workouts, track progress, and stay healthy with a modern dashboard.",
      tech: "React, JavaScript, CSS",
      github: "https://github.com/tilak76/gym-fitness",
      netlify: "https://fitnessprooo.netlify.app/",
      img: fitnesspro,
    },
    // {
    //   title: "Smart Home",
    //   desc: "A smart home control dashboard built with React and Firebase, allowing users to manage and monitor home devices through an interactive UI.",
    //   tech: "React, Firebase, JavaScript, Vite",
    //   github: "https://github.com/techravi552/SmartHomeManager",
    //   netlify: "https://strong-wisp-3efde6.netlify.app/",
    //   img: smarthome
    // },
    {
      title: "Aura Market",
      desc: "An advanced e-commerce platform offering a seamless shopping experience with product filtering, cart management, and secure checkout.",
      tech: "HTML, CSS, JavaScript",
      github: "https://github.com/tilak76/Aura-market",
      netlify: "https://aura-market.netlify.app/",
      img: auramarket,
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((proj, index) => (
          <div
            key={index}
            className={`project-card ${index % 2 === 0 ? "image-right" : "image-left"
              }`}
          >
            <div className="project-info">
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <p className="project-tech">{proj.tech}</p>
              <div className="project-links">
                <a href={proj.github} target="_blank" rel="noreferrer">
                  <FaGithub /> GitHub
                </a>
                <a href={proj.netlify} target="_blank" rel="noreferrer">
                  <FaExternalLinkAlt /> Netlify
                </a>
              </div>
            </div>
            <div className="project-img">
              <img src={proj.img} alt={proj.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
