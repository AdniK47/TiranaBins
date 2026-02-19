 import React, { useEffect } from "react";
import "./../style/ecobackground.css";

const EcoBackground = () => {
  useEffect(() => {
    const container = document.querySelector(".eco-container");
    const icons = ["♻️", "🌱", "🗑️", "🌍"];
    for (let i = 0; i < 20; i++) {
      const span = document.createElement("span");
      span.textContent = icons[Math.floor(Math.random() * icons.length)];
      span.style.left = Math.random() * 100 + "vw";
      span.style.animationDuration = 5 + Math.random() * 10 + "s";
      container.appendChild(span);
    }
  }, []);

  return <div className="eco-container"></div>;
};

export default EcoBackground;
