import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import breadCrumbs from "../../assets/images/BREADCRUMBS.jpg";
import valentines from "../../assets/images/valentines.jpg";
import solarSystem from "../../assets/images/solarsystem.jpg";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://portfolio-react-c64m.onrender.com/api/projects"
        );
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects");
      } finally {
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
