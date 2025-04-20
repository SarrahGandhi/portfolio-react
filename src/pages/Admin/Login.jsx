import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page they were trying to visit before being redirected to login
  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    // Check for logout parameter
    const params = new URLSearchParams(location.search);
    const fromLogout = params.get("logout") === "true";

    if (fromLogout) {
      setJustLoggedOut(true);
      // Clear the parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState(null, "", newUrl);
      return; // Skip auth check if we just logged out
    }

    // Check if we're already logged in on component mount
    const checkAuthStatus = async () => {
      try {
        console.log("Checking auth status on login page load");
        console.log("Current hostname:", window.location.hostname);
        console.log("API base URL:", API_BASE_URL);
        console.log("Is production:", IS_PRODUCTION);

        // Use the specific check-auth endpoint instead of general admin endpoint
        const response = await fetch(ENDPOINTS.checkAuth, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        });

        console.log("Auth check response status:", response.status);
        const data = await response.json();
        console.log("Auth check data:", data);

        // Only redirect if we have confirmation of authentication
        if (data && data.isAuthenticated === true) {
          console.log("User already authenticated, redirecting to dashboard");
          navigate(from);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // If there's an error checking auth, we just stay on the login page
      }
    };

    if (!justLoggedOut) {
      checkAuthStatus();
    }
  }, [navigate, location.search, justLoggedOut, from]);

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
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
        mode: "cors",
      });

      console.log("Login response status:", response.status);
      const data = await response.json();
      console.log("Login response data:", data);
      console.log("Login data structure:", {
        hasUser: !!data.user,
        userKeys: data.user ? Object.keys(data.user) : null,
        dataKeys: Object.keys(data),
      });

      if (response.ok) {
        // Successfully logged in
        console.log("Login successful, redirecting to dashboard");

        // Store the user ID in localStorage if available
        if (data && data.user && data.user._id) {
          localStorage.setItem("userId", data.user._id);
          console.log("User ID stored in localStorage:", data.user._id);
        } else if (data && data.admin && data.admin.id) {
          // Server returns admin object with id field
          localStorage.setItem("userId", data.admin.id);
          console.log(
            "User ID stored in localStorage (from admin):",
            data.admin.id
          );
        } else if (data && data._id) {
          // Alternative data structure - direct user object
          localStorage.setItem("userId", data._id);
          console.log(
            "User ID stored in localStorage (from direct data):",
            data._id
          );
        } else {
          console.warn("Could not find user ID in login response");
        }

        // Add a small delay to ensure session is properly saved on the server
        setTimeout(() => {
          // Perform a check-auth request to verify the session was properly saved
          fetch(ENDPOINTS.checkAuth, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
          })
            .then((authResponse) => authResponse.json())
            .then((authData) => {
              console.log("Auth verification after login:", authData);
              navigate(from);
            })
            .catch((error) => {
              console.error("Error verifying auth after login:", error);
              navigate(from); // Navigate anyway
            });
        }, 500);
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
        {justLoggedOut && (
          <div className="admin-success">
            You have been successfully logged out.
          </div>
        )}
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
