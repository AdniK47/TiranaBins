import React, { useEffect } from "react";
import "../style/EcoBackground.css";

const ICON_SVGS = [
  // leaf
  `<svg class="eco-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
     <path fill="#34d399" d="M12 2C7 7 4 9 4 13c0 4 4 7 8 7s8-3 8-7c0-4-3-6-8-11z"/>
   </svg>`,
  // globe
  `<svg class="eco-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
     <circle cx="12" cy="12" r="10" fill="#06b6d4"/>
   </svg>`,
  // bin
  `<svg class="eco-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
     <rect x="6" y="7" width="12" height="12" rx="2" fill="#f59e0b"/>
     <rect x="9" y="3" width="6" height="2" rx="1" fill="#f59e0b"/>
   </svg>`
];

const EcoBackground = () => {
  useEffect(() => {
    const container = document.querySelector(".eco-container");
    if (!container) return;

    // clear any previous icons (safe if effect re-runs)
    container.innerHTML = "";

    const count = 14;
    const created = [];

    for (let i = 0; i < count; i++) {
      const wrap = document.createElement("div");
      wrap.className = "eco-icon-wrap";

      // randomize size and choose icon
      const size = 18 + Math.round(Math.random() * 18); // 18-36px
      const svg = ICON_SVGS[Math.floor(Math.random() * ICON_SVGS.length)];
      wrap.innerHTML = svg;

      // style and animation
      wrap.style.left = Math.random() * 100 + "vw";
      wrap.style.top = -40 - Math.random() * 120 + "px";
      wrap.style.animationDuration = 6 + Math.random() * 8 + "s";
      wrap.style.opacity = 0.9 - Math.random() * 0.25;
      const iconEl = wrap.querySelector(".eco-icon");
      if (iconEl) {
        iconEl.style.width = `${size}px`;
        iconEl.style.height = `${size}px`;
      }

      container.appendChild(wrap);
      created.push(wrap);
    }

    // cleanup on unmount
    return () => {
      created.forEach(el => el.remove());
    };
  }, []);

  return <div className="eco-container" aria-hidden="true" />;
};

export default EcoBackground;

