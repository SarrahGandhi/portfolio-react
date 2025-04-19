import React, { useState, useEffect } from "react";
import { ENDPOINTS, FETCH_OPTIONS, apiRequest } from "../../config/api";
import "./Resume.css";

const Resume = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [expandedExperience, setExpandedExperience] = useState({});

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        // Try different API endpoints - useful for development and production
        const urls = [
          ENDPOINTS.experiences,
          "https://portfolio-react-c64m.onrender.com/api/experience",
        ];

        let fetchSuccess = false;

        for (const url of urls) {
          try {
            console.log(`Attempting to fetch experiences from: ${url}`);
            const response = await fetch(url, {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              signal: AbortSignal.timeout(5000),
            });

            if (response.ok) {
              const data = await response.json();
              console.log("Fetched experiences:", data);
              setExperience(data);
              fetchSuccess = true;
              break;
            }
          } catch (err) {
            console.log(`Error with ${url}:`, err.message);
          }
        }

        if (!fetchSuccess) {
          setError("Failed to load experiences");
        } else {
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const urls = [
          ENDPOINTS.projects,
          "https://portfolio-react-c64m.onrender.com/api/projects",
        ];

        let fetchSuccess = false;

        for (const url of urls) {
          try {
            console.log(`Attempting to fetch projects from: ${url}`);
            const response = await fetch(url, {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              signal: AbortSignal.timeout(5000),
            });

            if (response.ok) {
              const data = await response.json();
              console.log("Fetched projects:", data);
              setProjects(data);
              fetchSuccess = true;
              break;
            }
          } catch (err) {
            console.log(`Error with ${url}:`, err.message);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchExperience();
    fetchProjects();
  }, []);

  const toggleExperience = (id) => {
    setExpandedExperience((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <div className="loading">Loading experience...</div>;
  if (error) return <div className="error">{error}</div>;

  // Filter to featured experiences if available
  const featuredExperiences = experience.filter((exp) => exp.featured === true);
  const experiencesToDisplay =
    featuredExperiences.length > 0 ? featuredExperiences : experience;

  return (
    <section id="resume" className="resume-section">
      <h2>Resume</h2>
      <div className="resume-container">
        <div className="resume-block experience">
          <h3>Experience</h3>
          {experiencesToDisplay.length > 0 ? (
            experiencesToDisplay.map((exp, index) => (
              <div key={exp._id || index} className="experience-block">
                <div
                  className="experience-header"
                  onClick={() => toggleExperience(exp._id || index)}
                >
                  <h4>{exp.position}</h4>
                  <p className="company">{exp.company}</p>
                  {exp.startDate && (
                    <p className="date">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                  )}
                  {exp.description && (
                    <p className="description">{exp.description}</p>
                  )}
                  <span className="accordion-indicator">
                    {expandedExperience[exp._id || index] ? "▼" : "▶"}
                  </span>
                </div>

                {expandedExperience[exp._id || index] && (
                  <div className="experience-details">
                    <h4>Projects</h4>
                    <div className="projects-list">
                      {exp.projects &&
                        exp.projects.map((project, projIndex) => (
                          <div key={projIndex} className="project-item">
                            <h5>{project.title}</h5>
                            <p>{project.description}</p>
                          </div>
                        ))}
                      {!exp.projects && (
                        <p>No projects associated with this experience.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No experience entries found.</p>
          )}
        </div>
      </div>
      <div className="resume-block skills">
        <h3>Technical Skills</h3>
        <div className="skills-grid">
          <div className="skill-category">
            <h4>Languages</h4>
            <p>JavaScript, HTML5, CSS3, Python, Java</p>
          </div>
          <div className="skill-category">
            <h4>Frameworks & Libraries</h4>
            <p>React.js, Node.js, Express.js, Bootstrap</p>
          </div>
          <div className="skill-category">
            <h4>Tools & Technologies</h4>
            <p>Git, VS Code, Figma, Adobe Creative Suite</p>
          </div>
          <div className="skill-category">
            <h4>Soft Skills</h4>
            <p>Problem Solving, Team Collaboration, Project Management</p>
          </div>
        </div>
      </div>

      <div className="resume-block education">
        <h3>Education</h3>
        <div className="entry">
          <h4>Bachelor of Science in Computer Science</h4>
          <p className="institution">San Jose State University</p>
          <p className="date">2021 - 2025</p>
          <ul>
            <li>GPA: 3.8</li>
            <li>
              Relevant Coursework: Data Structures, Algorithms, Web Development,
              Database Management
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Resume;
