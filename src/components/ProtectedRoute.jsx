import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ENDPOINTS } from "../config/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("ProtectedRoute: Checking authentication status...");

        const response = await fetch(ENDPOINTS.checkAuth, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        });

        console.log("ProtectedRoute: Auth response status:", response.status);

        // Check if response is ok first
        if (!response.ok) {
          console.error(
            "ProtectedRoute: Auth response not OK:",
            response.status
          );
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        console.log("ProtectedRoute: Auth data:", data);

        // Explicitly check isAuthenticated value
        setIsAuthenticated(data.isAuthenticated === true);

        // If we're not authenticated but have a userId in localStorage, try again after a short delay
        if (data.isAuthenticated !== true && localStorage.getItem("userId")) {
          console.log(
            "ProtectedRoute: Authentication mismatch, userId exists but not authenticated. Retrying..."
          );
          setTimeout(() => {
            checkAuth();
          }, 1000);
          return;
        }
      } catch (error) {
        console.error("ProtectedRoute: Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // You could show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute: Not authenticated, redirecting to login");
    // Redirect to the login page, but save the page they tried to visit
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  console.log(
    "ProtectedRoute: User is authenticated, rendering protected content"
  );
  return children;
};

export default ProtectedRoute;
