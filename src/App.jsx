import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Portfolio from "./components/Portfolio/Portfolio";
import Resume from "./pages/Resume/Resume";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import FunFacts from "./components/FunFacts/FunFacts";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import ProjectForm from "./pages/Admin/ProjectForm";
import ExperienceForm from "./pages/Admin/ExperienceForm";
import Register from "./pages/Admin/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

// Create a HomePage component that combines all sections except Resume
const HomePage = () => {
  return (
    <>
      <Home />
      <Portfolio />
      <FunFacts />
      <Contact />
    </>
  );
};

// Layout for pages with header and footer
const MainLayout = ({ children }) => (
  <>
    <Header />
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
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/resume"
            element={
              <MainLayout>
                <Resume />
              </MainLayout>
            }
          />
          <Route
            path="/project/:id"
            element={
              <MainLayout>
                <ProjectDetails />
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
