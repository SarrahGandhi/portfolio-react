import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Admin.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check authentication and fetch projects
  useEffect(() => {
    const checkAuthAndFetchProjects = async () => {
      try {
        // Check if user is authenticated
        const authResponse = await fetch(
          "http://localhost:8000/api/admin/check-auth",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const authData = await authResponse.json();

        if (!authData.isAuthenticated) {
          navigate("/admin/login");
          return;
        }

        // Fetch projects
        const projectsResponse = await fetch(
          "http://localhost:8000/api/projects",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!projectsResponse.ok) {
          throw new Error("Failed to fetch projects");
        }

        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchProjects();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/projects/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

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

  if (loading) {
    return <div className="admin-dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="admin-dashboard">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Project Management</h1>
        <div>
          <Link to="/admin/projects/new" className="admin-action-btn">
            Add New Project
          </Link>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
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
  );
};

export default Dashboard;
