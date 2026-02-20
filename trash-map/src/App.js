import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Contact from "./components/Contact";
import MapPage from "./pages/MapPage";
import EcoBackground from "./components/EcoBackground";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  useEffect(() => {
    // create the cursor element once
    const cursor = document.createElement("div");
    cursor.className = "cursor-glow";
    // ensure fixed positioning (CSS should already set this, but enforce here)
    cursor.style.position = "fixed";
    cursor.style.left = "0px";
    cursor.style.top = "0px";
    cursor.style.pointerEvents = "none";
    document.body.appendChild(cursor);

    // use clientX/clientY so the dot follows the viewport pointer exactly
    const moveHandler = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    // optional: hide native cursor for desktop only (mobile keeps default)
    const addHideCursor = () => {
      if (window.innerWidth > 720) document.body.style.cursor = "none";
    };
    addHideCursor();
    window.addEventListener("resize", addHideCursor);

    document.addEventListener("mousemove", moveHandler, { passive: true });

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("resize", addHideCursor);
      if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
      // restore default cursor
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <Router>
      <EcoBackground />
      <ParticleBackground />

      <Header />

      <main style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;

