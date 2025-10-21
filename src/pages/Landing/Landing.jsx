import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import caricatureImg from "../../assets/images/carcicature.png";
import Header from "../../components/Header/Header";
import Home from "../Home/Home";
import Portfolio from "../../components/Portfolio/Portfolio";
import FunFacts from "../../components/FunFacts/FunFacts";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

const Landing = ({ onModeSelect }) => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("web");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const homeContentRef = useRef(null);

  // Cleanup function to reset body overflow
  useEffect(() => {
    return () => {
      // Reset body overflow when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleModeSelection = () => {
    setIsAnimating(true);
    onModeSelect(selectedMode);

    setTimeout(() => {
      setShowContent(true);
      setIsAnimating(false);

      // Automatically scroll to the main content after it appears
      setTimeout(() => {
        if (homeContentRef.current) {
          homeContentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100); // Small delay to ensure content is rendered
    }, 500);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleModeChange = (newMode) => {
    setSelectedMode(newMode);
    onModeSelect(newMode);
  };

  const toggleMode = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <div className="landing-page">
      <div
        className={`landing-container ${
          isAnimating ? "page-transitioning" : ""
        }`}
      >
        <Header scrollToSection={scrollToSection} showContent={showContent} />

        <main className="landing-main">
          <h1 className="landing-title">Hi, I am Sarrah Gandhi.</h1>
          <p className="designer-subtitle">
            Designer by hobby - Developer by profession - Debugger by chance
          </p>

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

          <p className="selection-text">
            Select what you would like to explore
          </p>

          <button
            className={`lets-go-btn ${isAnimating ? "loading" : ""}`}
            onClick={handleModeSelection}
            disabled={isAnimating}
          >
            {isAnimating ? "Loading..." : "Let's Gooo!"}
          </button>
        </main>
      </div>

      {showContent && (
        <div className="main-content" ref={homeContentRef}>
          <Home mode={selectedMode} />
          <Portfolio mode={selectedMode} />
          <FunFacts />
          <Contact />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Landing;
