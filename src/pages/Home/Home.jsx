import React from "react";
import "./Home.css";
import photoFrame from "../../assets/images/photo_frame.png";

const Home = ({ mode = "web" }) => {
  const webDevSkills = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "GIT",
    "VS Code",
    "Responsive Design",
    "Chrome DevTools",
    "Terminal",
    "Express.js",
    "MongoDB",
  ];

  const graphicDesignSkills = [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe InDesign",
    "Figma",
    "Adobe XD",
    "Sketch",
    "Canva",
    "Typography",
    "Color Theory",
    "Branding",
    "Logo Design",
    "Print Design",
  ];

  const skills = mode === "graphic" ? graphicDesignSkills : webDevSkills;

  // Duplicate skills array for seamless scrolling
  const scrollingSkills = [...skills, ...skills];

  const heroText =
    mode === "graphic"
      ? {
          line1: "Creative by nature",
          line2: "Designer by passion",
          line3: "Visual storyteller by choice",
        }
      : {
          line1: "Designer by hobby",
          line2: "Developer by profession",
          line3: "Debugger by chance",
        };

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>{heroText.line1}</h1>
          <h1>{heroText.line2}</h1>
          <h1>{heroText.line3}</h1>
          <button>
            <a href="/resume.pdf">Download Resume</a>
          </button>
        </div>
        {/* <aside className="photo">
          <img src={photoFrame} alt="Sarrah Gandhi" />
        </aside> */}
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
