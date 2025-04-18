import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

// NOTE: This component should be removed or secured after initial admin setup
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(
        "Admin registered successfully! You will be redirected to login page."
      );
      setTimeout(() => {
        navigate("/admin/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Registration</h2>
        <p style={{ color: "red", fontWeight: "bold" }}>
          IMPORTANT: This page should be removed after creating the admin
          account!
        </p>

        {error && <div className="admin-error">{error}</div>}
        {success && (
          <div
            style={{ color: "green", padding: "10px", marginBottom: "20px" }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-submit-btn" disabled={loading}>
            {loading ? "Registering..." : "Register Admin"}
          </button>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <a
              href="/admin/login"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              Go to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
