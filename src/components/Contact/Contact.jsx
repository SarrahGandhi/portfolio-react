import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      // No actual sending - just simulate success
      setTimeout(() => {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: "", email: "", message: "" });
      }, 800);
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        submitting: false,
        success: false,
        error: "An unexpected error occurred.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-info">
        <h2>Here's how you reach me</h2>
        <div className="line"></div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name...</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          disabled={status.submitting}
        />

        <label htmlFor="email">Email...</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          disabled={status.submitting}
        />

        <label htmlFor="message">your Message...</label>
        <textarea
          id="message"
          name="message"
          rows="7"
          required
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
          disabled={status.submitting}
        ></textarea>

        <button type="submit" disabled={status.submitting}>
          {status.submitting ? "Sending..." : "Send Message"}
        </button>

        {status.success && (
          <div id="result" className="success">
            <h3 id="msg">
              Thank you for contacting me! I'll be in touch soon.
            </h3>
          </div>
        )}

        {status.error && (
          <div id="result" className="error">
            <h3 id="msg">Error: {status.error}</h3>
          </div>
        )}
      </form>
    </section>
  );
};

export default Contact;
