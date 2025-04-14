import React from "react";
import "./FunFacts.css";

const FunFacts = () => {
  const facts = [
    {
      title: "Coffee Enthusiast",
      fact: "I can't start coding without my daily dose of coffee ☕",
    },
    {
      title: "Night Owl",
      fact: "My best debugging sessions happen after midnight 🦉",
    },
    {
      title: "Travel Bug",
      fact: "I love exploring new places and finding inspiration in different cultures 🌎",
    },
    {
      title: "Music & Code",
      fact: "I code better with lo-fi beats playing in the background 🎵",
    },
  ];

  return (
    <section id="funfacts" className="funfacts-section">
      <h2>Fun Facts About Me</h2>
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
