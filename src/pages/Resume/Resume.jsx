import React, { useState, useEffect } from "react";
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
        const response = await fetch(
          "https://portfolio-react-c64m.onrender.com/api/experience"
        );
        const data = await response.json();
        console.log("Fetched experience:", data);
        setExperience(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching experience:", error);
        setError("Failed to load experience");
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const urls = [
          "http://localhost:5000/api/projects",
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
  const featuredExperience = experience.filter(
    (experience) => experience.featured === true
  );
  return (
    <section id="resume" className="resume-section">
      <h2>Resume</h2>
      <div className="resume-container">
        <div className="resume-block experience">
          <h3>Experience</h3>
          {featuredExperience.length > 0 ? (
            featuredExperience.map((exp, index) => (
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
                      {exp.projects.map((project, projIndex) => (
                        <div key={projIndex} className="project-item">
                          <h5>{project.title}</h5>
                          <p>{project.description}</p>
                        </div>
                      ))}
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
