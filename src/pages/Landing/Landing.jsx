import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import caricatureImg from "../../assets/images/carcicature.png";
import Header from "../../components/Header/Header";

const Landing = ({ onModeSelect }) => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("web");
  const [isAnimating, setIsAnimating] = useState(false);

  // Cleanup function to reset body overflow
  useEffect(() => {
    return () => {
      // Reset body overflow when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleModeSelection = () => {
    // First scroll to top instantly
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    // Prevent scrolling during animation
    document.body.style.overflow = "hidden";

    // Small delay then start animation
    setTimeout(() => {
      setIsAnimating(true);
    }, 50);

    // Wait for scroll-up animation then navigate
    setTimeout(() => {
      onModeSelect(selectedMode);
      // Reset overflow before navigation
      document.body.style.overflow = "auto";
      navigate("/home");
    }, 850); // 850ms total delay for smooth transition
  };

  const toggleMode = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <div
      className={`landing-container ${isAnimating ? "page-transitioning" : ""}`}
    >
      <Header />

      <main className="landing-main">
        <h1 className="landing-title">Hi, I am Sarrah Gandhi.</h1>

        <div className="character-image">
          <img src={caricatureImg} alt="Sarrah Gandhi Character" />
        </div>

        <div
          className={`role-selection ${
            selectedMode === "web" ? "web-selected" : ""
          }`}
        >
          <button
            className={`role-btn graphic-designer ${
              selectedMode === "graphic" ? "active" : ""
            }`}
            onClick={() => toggleMode("graphic")}
            disabled={isAnimating}
          >
            Graphic Designer
          </button>
          <button
            className={`role-btn web-developer ${
              selectedMode === "web" ? "active" : ""
            }`}
            onClick={() => toggleMode("web")}
            disabled={isAnimating}
          >
            Web Developer
          </button>
        </div>

        <p className="selection-text">Select what you would like to explore</p>

        <button
          className={`lets-go-btn ${isAnimating ? "loading" : ""}`}
          onClick={handleModeSelection}
          disabled={isAnimating}
        >
          {isAnimating ? "Loading..." : "Let's Gooo!"}
        </button>
      </main>
    </div>
  );
};

export default Landing;
