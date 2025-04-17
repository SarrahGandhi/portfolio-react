import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

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
        console.log("Fetched projects:", data);
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
              src={
                project.imageUrl ||
                project.image ||
                "https://via.placeholder.com/300x200"
              }
              alt={project.title}
              className="portfolio-image"
            />
            <div className="portfolio-text">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link to={`/project/${project._id}`} className="project-button">
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
