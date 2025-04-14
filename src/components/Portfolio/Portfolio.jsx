import React from "react";
import "./Portfolio.css";
import breadCrumbs from "../../assets/images/BREADCRUMBS.jpg";
import valentines from "../../assets/images/valentines.jpg";
import solarSystem from "../../assets/images/solarsystem.jpg";

const Portfolio = () => {
  const projects = [
    {
      title: "BreadCrumbs",
      image: breadCrumbs,
      description:
        "A web application that helps users discover recipes based on available ingredients and adjustable recipe match threshold.",
      link: "https://sarrahgandhi.github.io/BreadCrumbs/",
    },
    {
      title: "Be my Valentine",
      image: valentines,
      description:
        'A quirky web page that asks, "Be my Valentine?" Choose wisely—your answer leads to an unexpected twist!',
      link: "https://sarrahgandhi.github.io/Valentines/",
    },
    {
      title: "Interactive Solar System",
      image: solarSystem,
      description:
        "A visually engaging web page showcasing the solar system, built entirely with HTML and CSS to demonstrate creative use of animations and design principles.",
      link: "https://sarrahgandhi.github.io/SolarSystem/",
    },
  ];

  return (
    <section id="portfolio">
      <h2>My Portfolio</h2>
      <div className="container">
        {projects.map((project, index) => (
          <div key={index} className="portfolio-block">
            <img
              src={project.image}
              alt={project.title}
              className="portfolio-image"
            />
            <div className="portfolio-text">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a className="project-button" href={project.link}>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
