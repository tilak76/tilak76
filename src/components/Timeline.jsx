import React from "react";
import "./../styles/Timeline.css";

export default function Timeline() {
    const events = [
        {
            year: "Dec 2024 - Present",
            title: "Full Stack Web Development",
            subtitle: "Masai School",
            desc: "Started my intensive Full Stack Web Development journey at Masai School, mastering the MERN stack and building scalable applications.",
        },
        {
            year: "July 2023 - April 2024",
            title: "IT Professional",
            subtitle: "Industry Experience",
            desc: "Worked in the IT field, gaining practical exposure to industry workflows, technical problem-solving, and professional software development environments.",
        },
        {
            year: "2023",
            title: "Graduation",
            subtitle: "College Completion",
            desc: "Successfully finished my college education.",
        },
    ];

    return (
        <section id="timeline" className="timeline-section">
            <h2 className="timeline-title">My Journey</h2>
            <div className="timeline-container">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                    >
                        <div className="timeline-content">
                            <span className="timeline-date">{event.year}</span>
                            <h3>{event.title}</h3>
                            <h4>{event.subtitle}</h4>
                            <p>{event.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
