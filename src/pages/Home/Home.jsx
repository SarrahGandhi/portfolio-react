import React from "react";
import "./Home.css";
import photoFrame from "../../assets/images/photo_frame.png";

const Home = () => {
  const skills = [
    "Figma",
    "JavaScript",
    "HTML",
    "CSS",
    "GIT",
    "Adobe Suite",
    "React",
    "UI/UX Design",
    "VS Code",
    "Responsive Design",
    "Chrome DevTools",
    "Terminal",
  ];

  // Duplicate skills array for seamless scrolling
  const scrollingSkills = [...skills, ...skills];

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Designs that speak. </h1>
          <h1>Code that works.</h1>
          <h1> Crafting digital experiences with purpose.</h1>
          <button>
            <a href="/resume.pdf">Download Resume</a>
          </button>
        </div>
        <aside className="photo">
          <img src={photoFrame} alt="Sarrah Gandhi" />
        </aside>
      </div>
      <div className="languages">
        <div className="languages-scroll">
          {scrollingSkills.map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
