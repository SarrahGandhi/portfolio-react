import React from "react";
import "./ModeToggle.css";

const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <div className="mode-toggle-container">
      <div className="mode-toggle">
        <button
          className={`toggle-option ${mode === "web" ? "active" : ""}`}
          onClick={() => onModeChange("web")}
        >
          Web Developer
        </button>
        <button
          className={`toggle-option ${mode === "graphic" ? "active" : ""}`}
          onClick={() => onModeChange("graphic")}
        >
          Graphic Designer
        </button>
        <div className={`toggle-slider ${mode === "graphic" ? "slide-right" : ""}`}></div>
      </div>
    </div>
  );
};

export default ModeToggle;

