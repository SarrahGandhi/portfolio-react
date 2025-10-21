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

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
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
