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
    const cursor = document.createElement("div");
    cursor.className = "cursor-glow";
    document.body.appendChild(cursor);

    const moveHandler = (e) => {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY + "px";
    };

    document.addEventListener("mousemove", moveHandler);

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
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
