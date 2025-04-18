import React, { useState, useEffect } from "react";
import "./Resume.css";
import { use } from "react";

const Resume = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    fetchExperience();
  }, []);
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
            featuredExperience.map((experience, index) => (
              <div key={experience._id || index} className="experience-block">
                <h4>{experience.position}</h4>
                <p className="company">{experience.company}</p>
                {experience.startDate && (
                  <p className="date">
                    {experience.startDate} - {experience.endDate || "Present"}
                  </p>
                )}
                {experience.description && (
                  <p className="description">{experience.description}</p>
                )}
                {experience.technologies &&
                  experience.technologies.length > 0 && (
                    <div className="technologies">
                      <span>Skills: </span>
                      {experience.technologies.join(", ")}
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

      <div className="resume-block certifications">
        <h3>Certifications</h3>
        <div className="entry">
          <h4>Web Development Bootcamp</h4>
          <p className="institution">Udemy</p>
          <p className="date">2023</p>
        </div>
        <div className="entry">
          <h4>UI/UX Design Fundamentals</h4>
          <p className="institution">Coursera</p>
          <p className="date">2022</p>
        </div>
      </div>
    </section>
  );
};

export default Resume;
