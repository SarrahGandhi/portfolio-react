import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ENDPOINTS,
  SARRAH_DOMAIN_OPTIONS,
  API_BASE_URL,
  IS_PRODUCTION,
} from "../../config/api";
import "./Admin.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're already logged in on component mount
    const checkAuthStatus = async () => {
      try {
        console.log("Checking auth status on login page load");
        console.log("Current hostname:", window.location.hostname);
        console.log("API base URL:", API_BASE_URL);
        console.log("Is production:", IS_PRODUCTION);

        const response = await fetch(ENDPOINTS.checkAuth, {
          method: "GET",
          ...SARRAH_DOMAIN_OPTIONS,
        });

        console.log("Auth check response status:", response.status);
        const data = await response.json();
        console.log("Auth check data:", data);

        if (data.isAuthenticated) {
          console.log("User already authenticated, redirecting to dashboard");
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // If there's an error checking auth, we just stay on the login page
      }
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting login with credentials");
      const response = await fetch(ENDPOINTS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...SARRAH_DOMAIN_OPTIONS.headers,
        },
        body: JSON.stringify({ username, password }),
        credentials: SARRAH_DOMAIN_OPTIONS.credentials || "include",
        mode: SARRAH_DOMAIN_OPTIONS.mode || "cors",
      });

      console.log("Login response status:", response.status);
      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok) {
        // Successfully logged in
        console.log("Login successful, redirecting to dashboard");
        navigate("/admin/dashboard");
      } else {
        // Login failed
        setError(data.error || "Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        {error && <div className="admin-error">{error}</div>}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
