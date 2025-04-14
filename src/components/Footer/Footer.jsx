import React from "react";
import "./Footer.css";
import instagramIcon from "../../assets/icons/instagram.png";
import linkedinIcon from "../../assets/icons/linkedin.png";
import githubIcon from "../../assets/icons/github.png";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; sarrah_gandhi</p>
      <p>Portfolio 2024</p>
      <div className="icons">
        <a
          href="https://www.instagram.com/sarrahgandhi_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagramIcon} alt="instagram" />
        </a>
        <a
          href="https://www.linkedin.com/in/sarrah-gandhi-914a53227/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinIcon} alt="linkedin" />
        </a>
        <a
          href="https://github.com/SarrahGandhi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="github" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
