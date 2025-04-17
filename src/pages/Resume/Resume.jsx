import React from "react";
import "./Resume.css";

const Resume = () => {
  return (
    <section id="resume" className="resume-section">
      <h2>Resume</h2>

      <div className="resume-container">
        <div className="resume-block experience">
          <h3>Experience</h3>
          <div className="entry">
            <h4>Frontend Developer Intern</h4>
            <p className="institution">Tech Company Name</p>
            <p className="date">Summer 2023</p>
            <ul>
              <li>
                Developed and maintained responsive web applications using
                React.js
              </li>
              <li>
                Collaborated with UI/UX designers to implement modern user
                interfaces
              </li>
              <li>
                Improved website performance by 30% through code optimization
              </li>
            </ul>
          </div>

          <div className="entry">
            <h4>Web Design Freelancer</h4>
            <p className="institution">Self-Employed</p>
            <p className="date">2022 - Present</p>
            <ul>
              <li>
                Created custom websites for small businesses and individuals
              </li>
              <li>
                Managed client relationships and project timelines effectively
              </li>
              <li>Implemented SEO best practices for improved visibility</li>
            </ul>
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
                Relevant Coursework: Data Structures, Algorithms, Web
                Development, Database Management
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
      </div>
    </section>
  );
};

export default Resume;
