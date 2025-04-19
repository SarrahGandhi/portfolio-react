/**
 * API Configuration
 *
 * This file contains central configuration for API endpoints.
 * Use these constants instead of hardcoding URLs in components.
 */

// Determine if we're in production or development
const isProd = window.location.hostname !== "localhost";

console.log("Current hostname:", window.location.hostname);
console.log("Is production environment:", isProd);

// Export the isProd value as IS_PRODUCTION
export const IS_PRODUCTION = isProd;

// Base URLs for API endpoints
// For local development
const LOCAL_API_URL = "http://localhost:5001";

// For production
const PROD_API_URL = isProd
  ? "https://portfolio-react-c64m.onrender.com"
  : LOCAL_API_URL;

// Special case for sarrahgandhi.com - we might need to use a different API URL
const isSarrahDomain = window.location.hostname.includes("sarrahgandhi.com");
if (isSarrahDomain) {
  console.log("Running on sarrahgandhi.com domain, using production API URL");
}

// Set the active API URL based on environment
export const API_BASE_URL = isSarrahDomain
  ? PROD_API_URL
  : isProd
  ? PROD_API_URL
  : LOCAL_API_URL;

console.log("API Base URL:", API_BASE_URL);

// API endpoints
export const ENDPOINTS = {
  // Projects
  projects: `${API_BASE_URL}/api/projects`,
  project: (id) => `${API_BASE_URL}/api/projects/${id}`,

  // Admin projects
  adminProjects: `${API_BASE_URL}/api/admin/projects`,
  adminProject: (id) => `${API_BASE_URL}/api/admin/projects/${id}`,

  // Experiences
  experiences: `${API_BASE_URL}/api/experience`,
  experience: (id) => `${API_BASE_URL}/api/experience/${id}`,

  // Admin experiences
  adminExperiences: `${API_BASE_URL}/api/admin/experience`,
  adminExperience: (id) => `${API_BASE_URL}/api/admin/experience/${id}`,

  // Auth
  login: `${API_BASE_URL}/api/admin/login`,
  register: `${API_BASE_URL}/api/admin/register`,
  checkAuth: `${API_BASE_URL}/api/admin/check-auth`,
  logout: `${API_BASE_URL}/api/admin/logout`,

  // Test endpoints
  test: `${API_BASE_URL}/api/test`,
  testCors: `${API_BASE_URL}/api/test-cors`,
};

// Common fetch options
export const FETCH_OPTIONS = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Special options for sarrahgandhi.com domain
export const SARRAH_DOMAIN_OPTIONS = {
  ...FETCH_OPTIONS,
  // Use include credentials for all domains to allow authentication
  credentials: "include",
  mode: "cors",
};

/**
 * Helper function to handle API requests
 * @param {string} url - The API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
export const apiRequest = async (url, options = {}) => {
  console.log(`Making API request to: ${url}`);

  const mergedOptions = {
    ...FETCH_OPTIONS,
    ...options,
    credentials: "include", // Always use include for authentication
  };

  // For CORS requests, explicitly set the mode
  mergedOptions.mode = "cors";

  console.log("Request options:", mergedOptions);

  try {
    const response = await fetch(url, mergedOptions);

    console.log(`Response status: ${response.status}`);

    // Try to parse JSON response
    let data;
    try {
      data = await response.json();
      console.log("Response data:", data);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      // If we can't parse JSON, return the response text
      const text = await response.text();
      console.log("Response text:", text);
      throw new Error(`Failed to parse response: ${text}`);
    }

    if (!response.ok) {
      throw new Error(
        data.error || `API request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

/**
 * Helper function that tries multiple URLs in sequence
 * Useful for environments where the primary endpoint might be unavailable
 * @param {Array<string>} urls - Array of URLs to try
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Response data from the first successful request
 */
export const tryMultipleEndpoints = async (urls, options = {}) => {
  let lastError;

  for (const url of urls) {
    try {
      console.log(`Attempting to fetch from: ${url}`);

      const mergedOptions = {
        ...FETCH_OPTIONS,
        ...options,
        credentials: "include", // Always use include for authentication
        mode: "cors", // Always use CORS mode
        signal: AbortSignal.timeout(8000), // 8 second timeout
      };

      const response = await fetch(url, mergedOptions);

      if (!response.ok) {
        console.log(`Request to ${url} failed with status: ${response.status}`);
        continue;
      }

      const data = await response.json();
      console.log(`Successfully fetched data from: ${url}`);
      return data;
    } catch (error) {
      console.log(`Error with ${url}:`, error.message);
      lastError = error;
    }
  }

  throw new Error(lastError?.message || "Failed to fetch from all endpoints");
};
