import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ENDPOINTS,
  FETCH_OPTIONS,
  apiRequest,
  tryMultipleEndpoints,
  SARRAH_DOMAIN_OPTIONS,
} from "../../config/api";
import "./Admin.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [activeTab, setActiveTab] = useState("projects");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication and fetch data
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        console.log("Checking auth and fetching data...");

        // Use the admin API endpoint directly
        const authResponse = await fetch(
          "https://portfolio-react-c64m.onrender.com/api/admin",
          {
            method: "GET",
            ...SARRAH_DOMAIN_OPTIONS,
          }
        );

        console.log("Auth response status:", authResponse.status);
        const authData = await authResponse.json();
        console.log("Auth data:", authData);

        // If no data or empty array, consider not authenticated
        if (!authData || authData.length === 0) {
          console.log("User not authenticated, redirecting to login");
          navigate("/admin/login");
          return;
        }

        // Set user data from the response
        setUser(authData[0]);

        // Fetch projects
        console.log(`Fetching projects from ${ENDPOINTS.projects}`);
        const projectsResponse = await fetch(ENDPOINTS.projects, {
          method: "GET",
          ...SARRAH_DOMAIN_OPTIONS,
        });

        if (!projectsResponse.ok) {
          console.error("Projects response not OK:", projectsResponse.status);
          throw new Error(
            `Failed to fetch projects: ${projectsResponse.status}`
          );
        }

        const projectsData = await projectsResponse.json();
        console.log(`Fetched ${projectsData.length} projects`);
        setProjects(projectsData);

        // Fetch experiences
        console.log(`Fetching experiences from ${ENDPOINTS.experiences}`);
        const experiencesResponse = await fetch(ENDPOINTS.experiences, {
          method: "GET",
          ...SARRAH_DOMAIN_OPTIONS,
        });

        if (!experiencesResponse.ok) {
          console.error(
            "Experiences response not OK:",
            experiencesResponse.status
          );
          throw new Error(
            `Failed to fetch experiences: ${experiencesResponse.status}`
          );
        }

        const experiencesData = await experiencesResponse.json();
        console.log(`Fetched ${experiencesData.length} experiences`);
        setExperiences(experiencesData);
      } catch (error) {
        console.error("Error in checkAuthAndFetchData:", error);
        setError(error.message || "An error occurred fetching data");

        // If we have a network error or CORS error, redirect to login
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          console.log("Network error, redirecting to login");
          navigate("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(ENDPOINTS.logout, {
        method: "POST",
        ...SARRAH_DOMAIN_OPTIONS,
      });

      if (response.ok) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, we'll still redirect to login
      navigate("/admin/login");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.adminProject(id), {
        method: "DELETE",
        ...SARRAH_DOMAIN_OPTIONS,
      });

      if (response.ok) {
        // Remove project from state
        setProjects(projects.filter((project) => project._id !== id));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.message);
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.adminExperience(id), {
        method: "DELETE",
        ...SARRAH_DOMAIN_OPTIONS,
      });

      if (response.ok) {
        // Remove experience from state
        setExperiences(
          experiences.filter((experience) => experience._id !== id)
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete experience");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="admin-dashboard">Loading...</div>;
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="admin-error">{error}</div>
        <button
          className="admin-action-btn"
          style={{ marginTop: "15px" }}
          onClick={() => navigate("/admin/login")}
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user-info">
          {user && (
            <div className="admin-welcome">
              Welcome, <span className="admin-username">{user.username}</span>
            </div>
          )}
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`admin-tab ${activeTab === "experiences" ? "active" : ""}`}
          onClick={() => setActiveTab("experiences")}
        >
          Experiences
        </button>
      </div>

      {activeTab === "projects" && (
        <div className="admin-section">
          <div className="admin-section-header">
            <h2>Project Management</h2>
            <Link to="/admin/projects/new" className="admin-action-btn">
              Add New Project
            </Link>
          </div>

          {projects.length === 0 ? (
            <p>No projects found. Add your first project!</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>{project.title}</td>
                    <td>{project.description.substring(0, 100)}...</td>
                    <td>{project.featured ? "Yes" : "No"}</td>
                    <td className="admin-action-buttons">
                      <Link
                        to={`/admin/projects/edit/${project._id}`}
                        className="admin-edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="admin-delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "experiences" && (
        <div className="admin-section">
          <div className="admin-section-header">
            <h2>Experience Management</h2>
            <Link to="/admin/experience/new" className="admin-action-btn">
              Add New Experience
            </Link>
          </div>

          {experiences.length === 0 ? (
            <p>No experiences found. Add your first work experience!</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Duration</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((experience) => (
                  <tr key={experience._id}>
                    <td>{experience.company}</td>
                    <td>{experience.position}</td>
                    <td>
                      {experience.startDate} - {experience.endDate || "Present"}
                    </td>
                    <td>{experience.featured ? "Yes" : "No"}</td>
                    <td className="admin-action-buttons">
                      <Link
                        to={`/admin/experience/edit/${experience._id}`}
                        className="admin-edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteExperience(experience._id)}
                        className="admin-delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
