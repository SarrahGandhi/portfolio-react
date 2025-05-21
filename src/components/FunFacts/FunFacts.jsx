import React from "react";
import "./FunFacts.css";

const FunFacts = () => {
  const facts = [
    {
      title: "Transforming Slay Coffee’s Digital Presence",
      fact: "Redesigned Slay Coffee’s site to reflect its bold brand, improving responsiveness, visuals, and engagement. Also built high-converting landing pages for seasonal campaigns.",
    },
    {
      title: "Creative Freelance Collaborations",
      fact: "As a freelance designer and developer, I’ve created tailored websites for clients like Let There Be Light Studios and MP Ensystems—delivering clean, responsive designs that highlight storytelling, professionalism, and brand clarity across creative and engineering industries.",
    },
    {
      title: "Creating Functional, API-Driven Web Applications",
      fact: "Developed dynamic web apps using MERN, with API integration, form validation, and responsive UI—balancing functionality, design, and accessibility.",
    },
    {
      title: "Designing Packaging & Marketing for Product Launches",
      fact: "Designed packaging and digital assets for multiple Slay Coffee campaigns, including a holiday launch that surpassed sales targets in its first week.",
    },
  ];

  return (
    <section id="funfacts" className="funfacts-section">
      <h2>Career Highlights</h2>
      <div className="funfacts-container">
        {facts.map((fact, index) => (
          <div key={index} className="fact-card">
            <div className="fact-content">
              <h3>{fact.title}</h3>
              <p>{fact.fact}</p>
            </div>
            <div className="corner-box top-left"></div>
            <div className="corner-box top-right"></div>
            <div className="corner-box bottom-left"></div>
            <div className="corner-box bottom-right"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FunFacts;
