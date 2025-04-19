import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINTS, FETCH_OPTIONS } from "../../config/api";
import "./Admin.css";

const ExperienceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    featured: false,
    projects: [],
  });

  const [newProject, setNewProject] = useState("");
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Check authentication and fetch experience if in edit mode
  useEffect(() => {
    const checkAuthAndFetchExperience = async () => {
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

        // If in edit mode, fetch the experience
        if (isEditMode) {
          const experienceResponse = await fetch(ENDPOINTS.experience(id), {
            ...FETCH_OPTIONS,
          });

          if (!experienceResponse.ok) {
            throw new Error("Failed to fetch experience");
          }

          const experienceData = await experienceResponse.json();
          setFormData({
            company: experienceData.company || "",
            position: experienceData.position || "",
            startDate: experienceData.startDate || "",
            endDate: experienceData.endDate || "",
            description: experienceData.description || "",
            featured: experienceData.featured || false,
            projects: experienceData.projects || [],
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchExperience();
  }, [navigate, id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddProject = () => {
    if (newProject.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        projects: [...prevData.projects, newProject.trim()],
      }));
      setNewProject("");
    }
  };

  const handleRemoveProject = (projectToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      projects: prevData.projects.filter(
        (project) => project !== projectToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const url = isEditMode
        ? ENDPOINTS.adminExperience(id)
        : ENDPOINTS.adminExperiences;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        ...FETCH_OPTIONS,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save experience");
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
        {isEditMode ? "Edit Experience" : "Add New Experience"}
      </h2>

      {error && <div className="admin-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label htmlFor="company">Company*</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-form-row">
          <label htmlFor="position">Position*</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-form-row">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="text"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="e.g. Jan 2023"
          />
        </div>

        <div className="admin-form-row">
          <label htmlFor="endDate">End Date</label>
          <input
            type="text"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            placeholder="e.g. Present"
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
          <label>Projects</label>
          <div className="admin-tag-input">
            {Array.isArray(formData.projects) &&
              formData.projects.map((project, index) => (
                <div key={index} className="admin-tag">
                  {typeof project === "object" && project !== null
                    ? project.title || "Untitled Project"
                    : String(project)}
                  <button
                    type="button"
                    className="admin-tag-remove"
                    onClick={() => handleRemoveProject(project)}
                  >
                    &times;
                  </button>
                </div>
              ))}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="Add a project"
            />
            <button
              type="button"
              className="admin-action-btn"
              onClick={handleAddProject}
            >
              Add
            </button>
          </div>
        </div>

        <div className="admin-form-row">
          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured on Resume
          </label>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-cancel-btn"
            onClick={() => navigate("/admin/dashboard")}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="admin-submit-btn"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Experience"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
