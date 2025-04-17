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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
