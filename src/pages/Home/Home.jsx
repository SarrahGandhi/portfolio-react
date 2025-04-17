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
          <h1>Designer by hobby</h1>
          <h1>Developer by profession</h1>
          <h1>Debugger by chance</h1>
          <button>
            <a href="#portfolio">See Portfolio</a>
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
