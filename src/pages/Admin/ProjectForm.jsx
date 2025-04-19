import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINTS, FETCH_OPTIONS, apiRequest } from "../../config/api";
import "./Admin.css";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    short_description: "",
    technologies: [],
    keyFeatures: [],
    githubUrl: "",
    projectUrl: "",
    featured: false,
  });

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [newTechnology, setNewTechnology] = useState("");
  const [newKeyFeature, setNewKeyFeature] = useState("");

  // Check authentication and fetch project if in edit mode
  useEffect(() => {
    const checkAuthAndFetchProject = async () => {
      try {
        // Check if user is authenticated
        const authResponse = await fetch(ENDPOINTS.checkAuth, {
          method: "GET",
          ...FETCH_OPTIONS,
        });

        const authData = await authResponse.json();

        if (!authData.isAuthenticated) {
          navigate("/admin/login");
          return;
        }

        // If in edit mode, fetch the project
        if (isEditMode) {
          const projectResponse = await fetch(ENDPOINTS.project(id), {
            ...FETCH_OPTIONS,
          });

          if (!projectResponse.ok) {
            throw new Error("Failed to fetch project");
          }

          const projectData = await projectResponse.json();
          setFormData({
            title: projectData.title || "",
            description: projectData.description || "",
            technologies: projectData.technologies || [],
            keyFeatures: projectData.keyFeatures || [],
            githubUrl: projectData.githubUrl || "",
            projectUrl: projectData.projectUrl || "",
            short_description: projectData.short_description || "",
            featured: projectData.featured || false,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchProject();
  }, [navigate, id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTechnology = () => {
    if (
      newTechnology.trim() &&
      !formData.technologies.includes(newTechnology.trim())
    ) {
      setFormData((prevData) => ({
        ...prevData,
        technologies: [...prevData.technologies, newTechnology.trim()],
      }));
      setNewTechnology("");
    }
  };

  const handleRemoveTechnology = (tech) => {
    setFormData((prevData) => ({
      ...prevData,
      technologies: prevData.technologies.filter((t) => t !== tech),
    }));
  };

  const handleAddKeyFeature = () => {
    if (
      newKeyFeature.trim() &&
      !formData.keyFeatures.includes(newKeyFeature.trim())
    ) {
      setFormData((prevData) => ({
        ...prevData,
        keyFeatures: [...prevData.keyFeatures, newKeyFeature.trim()],
      }));
      setNewKeyFeature("");
    }
  };

  const handleRemoveKeyFeature = (feature) => {
    setFormData((prevData) => ({
      ...prevData,
      keyFeatures: prevData.keyFeatures.filter((f) => f !== feature),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const url = isEditMode
        ? ENDPOINTS.adminProject(id)
        : ENDPOINTS.adminProjects;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        ...FETCH_OPTIONS,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save project");
      }

      // Navigate back to dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Submit error:", error);
      setError(error.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="admin-form-container">Loading...</div>;
  }

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">
        {isEditMode ? "Edit Project" : "Add New Project"}
      </h2>

      {error && <div className="admin-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-form-row">
          <label htmlFor="short_description">Short Description*</label>
          <input
            type="text"
            id="short_description"
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-form-row">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-form-row">
          <label>Technologies</label>
          <div className="admin-tag-input">
            {formData.technologies.map((tech, index) => (
              <div key={index} className="admin-tag">
                {tech}
                <button
                  type="button"
                  className="admin-tag-remove"
                  onClick={() => handleRemoveTechnology(tech)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="Add a technology"
            />
            <button
              type="button"
              className="admin-action-btn"
              onClick={handleAddTechnology}
            >
              Add
            </button>
          </div>
        </div>

        <div className="admin-form-row">
          <label>Key Features</label>
          <div className="admin-tag-input">
            {formData.keyFeatures.map((feature, index) => (
              <div key={index} className="admin-tag">
                {feature}
                <button
                  type="button"
                  className="admin-tag-remove"
                  onClick={() => handleRemoveKeyFeature(feature)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={newKeyFeature}
              onChange={(e) => setNewKeyFeature(e.target.value)}
              placeholder="Add a key feature"
            />
            <button
              type="button"
              className="admin-action-btn"
              onClick={handleAddKeyFeature}
            >
              Add
            </button>
          </div>
        </div>

        <div className="admin-form-row">
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            type="text"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
          />
        </div>

        <div className="admin-form-row">
          <label htmlFor="projectUrl">Project URL</label>
          <input
            type="text"
            id="projectUrl"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleChange}
          />
        </div>

        <div className="admin-form-checkbox">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured">Featured Project</label>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-form-cancel"
            onClick={() => navigate("/admin/dashboard")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="admin-submit-btn"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
