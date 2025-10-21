import React from "react";
import "./ModeToggle.css";

const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <div className="mode-toggle-container">
      <div className="mode-toggle">
        <button
          className={`toggle-btn ${mode === "web" ? "active" : ""}`}
          onClick={() => onModeChange("web")}
        >
          Web Development
        </button>
        <button
          className={`toggle-btn ${mode === "graphic" ? "active" : ""}`}
          onClick={() => onModeChange("graphic")}
        >
          Graphic Design
        </button>
      </div>
    </div>
  );
};

export default ModeToggle;
