import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProjects, setAllProjects] = useState([]);

  // Fetch all projects first
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch(
          "https://portfolio-react-c64m.onrender.com/api/projects"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        console.log("All available projects:", data);
        setAllProjects(data);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      }
    };

    fetchAllProjects();
  }, []);

  // Then find the project by ID from the list
  useEffect(() => {
    if (allProjects.length > 0 && id) {
      console.log(
        "Finding project with ID:",
        id,
        "from",
        allProjects.length,
        "projects"
      );
      const foundProject = allProjects.find((project) => project._id === id);

      if (foundProject) {
        console.log("Found project:", foundProject);

        // Process the data to ensure it has expected properties
        const processedProject = {
          ...foundProject,
          image: foundProject.imageUrl || foundProject.image,
          link:
            foundProject.projectUrl ||
            foundProject.link ||
            foundProject.githubUrl,
        };

        setProject(processedProject);
        setLoading(false);
      } else {
        console.error("Project not found in list");
        setError("Project not found");
        setLoading(false);
      }
    }
  }, [allProjects, id]);

  // Fallback to direct API call if the project isn't found in the list
  useEffect(() => {
    if (allProjects.length > 0 && !project && id) {
      const fetchProjectDetails = async () => {
        try {
          setLoading(true);
          console.log("Fallback: Fetching project details for ID:", id);

          // Try local API first, then remote
          const urls = [
            `http://localhost:3000/api/projects/${id}`,
            `https://portfolio-react-c64m.onrender.com/api/projects/${id}`,
          ];

          let data = null;

          for (const url of urls) {
            try {
              console.log("Attempting to fetch from:", url);
              const response = await fetch(url);

              if (response.ok) {
                data = await response.json();
                console.log("Project data received:", data);
                break;
              }
            } catch (err) {
              console.log("Failed to fetch from", url, err);
            }
          }

          if (!data) {
            throw new Error("Project not found");
          }

          // Process the data to ensure it has expected properties
          const processedProject = {
            ...data,
            image: data.imageUrl || data.image,
            link: data.projectUrl || data.link || data.githubUrl,
          };

          setProject(processedProject);
          setError(null);
        } catch (error) {
          console.error("Error in fallback fetch:", error);
          // Don't set error here - we'll use the existing list data
        } finally {
          setLoading(false);
        }
      };

      fetchProjectDetails();
    }
  }, [allProjects, project, id]);

  if (loading && allProjects.length === 0)
    return <div className="loading">Loading project details...</div>;
  if (error && !project) return <div className="error">Error: {error}</div>;
  if (!project && !loading)
    return <div className="error">Project not found</div>;

  // Use a fallback project if all else fails but we know the ID
  if (!project && allProjects.length > 0) {
    return (
      <div className="error">
        Could not load project details. <Link to="/">Return to portfolio</Link>
      </div>
    );
  }

  return (
    <section className="project-details">
      <div className="project-container">
        <h2>{project?.title}</h2>

        {project?.image && (
          <img
            src={project.image}
            alt={project.title}
            className="project-details-image"
          />
        )}
        <div className="project-btn">
          {project?.link && (
            <div className="project-link">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-live-btn"
              >
                View Live Project
              </a>
            </div>
          )}

          {project?.githubUrl && (
            <div className="github-link">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="view-github-btn"
              >
                View on GitHub
              </a>
            </div>
          )}
        </div>
        <h3>Technologies Used</h3>
        {project?.technologies && (
          <div className="project-languages">
            <div className="project-languages-scroll">
              <ul>
                {project.technologies.map((tech, index) => (
                  <li key={index}>
                    <p>{tech}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="project-description">
          <h3>Description</h3>
          <p>{project?.description}</p>
        </div>
        <div className="project-description">
          {project.keyfeatures && project.keyfeatures.length > 0 && (
            <ul>
              <h3>Key Features</h3>
              {project.keyfeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="project-description">
          {project?.extra && <p>{project.extra}</p>}
        </div>
        <Link to="/" className="back-btn">
          Back to Portfolio
        </Link>
      </div>
    </section>
  );
};

export default ProjectDetails;
