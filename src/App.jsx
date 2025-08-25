import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Portfolio from "./components/Portfolio/Portfolio";
import Resume from "./pages/Resume/Resume";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import FunFacts from "./components/FunFacts/FunFacts";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ModeToggle from "./components/ModeToggle/ModeToggle";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import ProjectForm from "./pages/Admin/ProjectForm";
import ExperienceForm from "./pages/Admin/ExperienceForm";
import Register from "./pages/Admin/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

// Create a HomePage component that combines all sections except Resume
const HomePage = ({ mode }) => {
  return (
    <>
      <Home mode={mode} />
      <Portfolio mode={mode} />
      <FunFacts />
      <Contact />
    </>
  );
};

// Layout for pages with header and footer
const MainLayout = ({ children, mode, onModeChange }) => (
  <>
    <Header />
    <ModeToggle mode={mode} onModeChange={onModeChange} />
    <main className="content">{children}</main>
    <Footer />
  </>
);

// Layout without header and footer for admin pages
const AdminLayout = ({ children }) => (
  <>
    <Header />
    <main className="admin-content">{children}</main>
    <Footer />
  </>
);

function App() {
  const [mode, setMode] = useState("web"); // "web" or "graphic"

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={<Landing onModeSelect={handleModeChange} />}
          />

          {/* Public Routes */}
          <Route
            path="/home"
            element={
              <MainLayout mode={mode} onModeChange={handleModeChange}>
                <HomePage mode={mode} />
              </MainLayout>
            }
          />
          <Route
            path="/resume"
            element={
              <MainLayout mode={mode} onModeChange={handleModeChange}>
                <Resume mode={mode} />
              </MainLayout>
            }
          />
          <Route
            path="/project/:id"
            element={
              <MainLayout mode={mode} onModeChange={handleModeChange}>
                <ProjectDetails mode={mode} />
              </MainLayout>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              <AdminLayout>
                <Login />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/projects/new"
            element={
              <AdminLayout>
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/projects/edit/:id"
            element={
              <AdminLayout>
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/experience/new"
            element={
              <AdminLayout>
                <ProtectedRoute>
                  <ExperienceForm />
                </ProtectedRoute>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/experience/edit/:id"
            element={
              <AdminLayout>
                <ProtectedRoute>
                  <ExperienceForm />
                </ProtectedRoute>
              </AdminLayout>
            }
          />
          <Route
            path="/admin/register"
            element={
              <AdminLayout>
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              </AdminLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
