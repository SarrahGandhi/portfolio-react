import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ENDPOINTS, FETCH_OPTIONS, apiRequest } from "../../config/api";
import "./ProjectDetails.css";

const ProjectDetails = ({ mode = "web" }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProjects, setAllProjects] = useState([]);

  // Mock graphic design projects - should match Portfolio component
  const graphicDesignProjects = [
    {
      _id: "graphic-1",
      title: "Vayu Villa Logo Design",
      description: "Complete branding package for a luxury resort. This project involved creating a sophisticated logo that captures the essence of relaxation and luxury. The design includes a comprehensive brand identity with color palette, typography guidelines, and application examples across various mediums including business cards, letterheads, and digital platforms.",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Color Theory", "Typography"],
      keyFeatures: [
        "Custom logo design with multiple variations",
        "Comprehensive brand guidelines",
        "Color palette development",
        "Typography selection and pairing",
        "Business card and letterhead design",
        "Social media template creation"
      ],
      featured: true,
      type: "graphic",
      projectUrl: null,
      githubUrl: null
    },
    {
      _id: "graphic-2", 
      title: "Slay Coffee Branding",
      description: "A complete brand identity design for a modern coffee shop. This project focused on creating a bold, contemporary brand that appeals to young professionals and coffee enthusiasts. The design includes logo creation, packaging design, and marketing materials that reflect the energetic and stylish nature of the brand.",
      technologies: ["Adobe Illustrator", "Adobe InDesign", "Packaging Design", "Brand Strategy"],
      keyFeatures: [
        "Modern logo design with coffee-inspired elements",
        "Coffee cup and packaging design",
        "Menu and promotional material design",
        "Social media marketing templates",
        "Store signage concepts",
        "Brand voice and personality development"
      ],
      featured: true,
      type: "graphic",
      projectUrl: null,
      githubUrl: null
    },
    {
      _id: "graphic-3",
      title: "Valentine's Day Campaign",
      description: "A romantic-themed marketing campaign design created for social media and print advertising. This project involved creating cohesive visual content across multiple platforms while maintaining a consistent romantic aesthetic. The campaign successfully captured the essence of love and celebration through thoughtful design choices.",
      technologies: ["Adobe Photoshop", "Adobe Illustrator", "Social Media Design", "Print Design"],
      keyFeatures: [
        "Social media post templates",
        "Instagram story and highlight covers",
        "Print advertisement designs",
        "Romantic color scheme development",
        "Typography-focused layouts",
        "Cross-platform design consistency"
      ],
      featured: true,
      type: "graphic",
      projectUrl: null,
      githubUrl: null
    },
    {
      _id: "graphic-4",
      title: "Typography Exploration",
      description: "An experimental typography project exploring different typeface combinations and creative layouts. This project demonstrates advanced understanding of typography principles, hierarchy, and creative text treatments. Various typographic styles were explored to create visually compelling and readable designs.",
      technologies: ["Adobe InDesign", "Adobe Illustrator", "Typography", "Layout Design"],
      keyFeatures: [
        "Multiple typeface explorations",
        "Creative text layout experiments",
        "Hierarchy and readability studies",
        "Custom lettering and modifications",
        "Print and digital applications",
        "Typography guidelines creation"
      ],
      featured: true,
      type: "graphic",
      projectUrl: null,
      githubUrl: null
    }
  ];

  // Fetch all projects first
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        // Check if we need graphic design projects
        if (id && id.startsWith("graphic-")) {
          setAllProjects(graphicDesignProjects);
          return;
        }

        // Try both local and remote endpoints for web dev projects
        const urls = [
          ENDPOINTS.projects,
          "https://portfolio-react-c64m.onrender.com/api/projects",
        ];

        let fetchSuccess = false;

        for (const url of urls) {
          try {
            console.log(`Attempting to fetch projects from: ${url}`);
            const response = await fetch(url, {
              signal: AbortSignal.timeout(5000),
            });

            if (response.ok) {
              const data = await response.json();
              console.log("All available projects:", data);
              setAllProjects(data);
              fetchSuccess = true;
              break;
            }
          } catch (err) {
            console.log(`Error with ${url}:`, err.message);
          }
        }

        if (!fetchSuccess) {
          throw new Error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching all projects:", error);
      }
    };

    fetchAllProjects();
  }, [id]);

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
            ENDPOINTS.project(id),
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

  // Helper function to check if a URL exists and is not empty
  const hasValidUrl = (url) => url && url.trim() !== "";

  return (
    <section className="project-details">
      <div className="project-container">
        {project && project.featured === true ? (
          <>
            <h2>{project?.title}</h2>

            <div className="project-btn">
              {hasValidUrl(project.projectUrl) && (
                <div className="project-link">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-live-btn"
                  >
                    View Live Project
                  </a>
                </div>
              )}

              {hasValidUrl(project.githubUrl) && (
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
            <h3>{project.type === "graphic" ? "Design Tools Used" : "Technologies Used"}</h3>
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

            {project?.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="key-features">
                <h3>Key Features</h3>
                <ul>
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="back-to-portfolio">
              <Link to="/" className="back-to-home">
                Back to Portfolio
              </Link>
            </div>
          </>
        ) : (
          <div className="project-error">
            <h2>Project Details Not Available</h2>
            <div className="back-to-portfolio">
              <Link to="/" className="back-to-home">
                Back to Portfolio
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
