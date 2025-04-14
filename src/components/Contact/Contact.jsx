import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setShowMessage(true);
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
        ></textarea>

        <button type="submit">Send Message</button>
        {showMessage && (
          <div id="result">
            <h3 id="msg">Thank you for contacting me!</h3>
          </div>
        )}
      </form>
    </section>
  );
};

export default Contact;
