 // src/App.js
import React, { useEffect, useRef } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Contact from "./components/Contact";
import MapPage from "./pages/MapPage";
import EcoBackground from "./components/EcoBackground";
import ParticleBackground from "./components/ParticleBackground";

export default function App() {
  const createdCursorRef = useRef(false);
  const rafRef = useRef(null);
  const cursorRef = useRef(null);
  const pressTimeoutRef = useRef(null);

  useEffect(() => {
    // create and manage a single minimal cursor element safely across mounts
    let cursor = document.querySelector(".cursor-glow");
    let weCreated = false;

    if (!cursor) {
      cursor = document.createElement("div");
      cursor.className = "cursor-glow";
      cursor.style.left = "0px";
      cursor.style.top = "0px";
      cursor.style.pointerEvents = "none";
      document.body.appendChild(cursor);
      weCreated = true;
    }
    cursorRef.current = cursor;

    if (createdCursorRef.current) {
      return () => {
        if (weCreated && cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
      };
    }
    createdCursorRef.current = true;

    // smooth follow using rAF
    let lastX = 0;
    let lastY = 0;
    let targetX = 0;
    let targetY = 0;

    const moveHandler = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafRef.current) {
        const loop = () => {
          lastX += (targetX - lastX) * 0.28;
          lastY += (targetY - lastY) * 0.28;
          if (cursorRef.current) {
            cursorRef.current.style.left = `${Math.round(lastX)}px`;
            cursorRef.current.style.top = `${Math.round(lastY)}px`;
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const down = () => {
      if (cursorRef.current) cursorRef.current.classList.add("cursor-pressed");
      if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);
    };
    const up = () => {
      if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);
      pressTimeoutRef.current = setTimeout(() => {
        if (cursorRef.current) cursorRef.current.classList.remove("cursor-pressed");
      }, 80);
    };

    const addHideCursor = () => {
      if (window.innerWidth > 720) document.body.style.cursor = "none";
      else document.body.style.cursor = "";
    };

    addHideCursor();
    window.addEventListener("resize", addHideCursor, { passive: true });
    document.addEventListener("mousemove", moveHandler, { passive: true });
    document.addEventListener("mousedown", down, { passive: true });
    document.addEventListener("mouseup", up, { passive: true });

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      window.removeEventListener("resize", addHideCursor);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (weCreated && cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
      document.body.style.cursor = "";
      createdCursorRef.current = false;
      if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);
    };
  }, []);

  return (
    <Router>
      <EcoBackground />
      <ParticleBackground />

      <Header />

      <main>
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
