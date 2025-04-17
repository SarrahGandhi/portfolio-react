import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import breadCrumbs from "../../assets/images/BREADCRUMBS.jpg";
import valentines from "../../assets/images/valentines.jpg";
import solarSystem from "../../assets/images/solarsystem.jpg";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map of default images you can use for projects
  const defaultImages = {
    BreadCrumbs: breadCrumbs,
    "Be my Valentine": valentines,
    "Interactive Solar System": solarSystem,
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();

        // Add image property to each project if not provided by API
        const projectsWithImages = data.map((project) => ({
          ...project,
          image: project.image || defaultImages[project.title] || solarSystem, // Fallback to a default image
          link: project.link || "#", // Provide a fallback link if none exists
        }));

        setProjects(projectsWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section id="portfolio">
      <h2>My Portfolio</h2>
      <div className="container">
        {projects.map((project, index) => (
          <div key={project._id || index} className="portfolio-block">
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
