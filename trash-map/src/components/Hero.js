 import React from "react";
import "../style/Hero.css";

export default function Hero() {
  return (
    <section className="hero" role="region" aria-label="Hero">
      <svg
        className="hero-svg"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="parkGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#07203a" />
            <stop offset="1" stopColor="#06324a" />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0f172a" />
            <stop offset="1" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>

        <rect width="1200" height="300" fill="url(#skyGrad)" />
        <rect y="200" width="1200" height="100" fill="#072b1f" />

        <g fill="#0f9d58" opacity="0.95">
          <ellipse cx="120" cy="170" rx="36" ry="40" />
          <ellipse cx="200" cy="160" rx="28" ry="34" />
          <ellipse cx="420" cy="170" rx="40" ry="44" />
          <ellipse cx="760" cy="170" rx="36" ry="40" />
          <ellipse cx="980" cy="170" rx="34" ry="38" />
        </g>

        <g transform="translate(520,200)" fill="#6b4f3a" opacity="0.95">
          <rect x="-40" y="-8" width="80" height="8" rx="2" />
          <rect x="-44" y="0" width="6" height="18" rx="1" />
          <rect x="38" y="0" width="6" height="18" rx="1" />
        </g>

        <g transform="translate(640,210)" aria-hidden="true">
          <rect x="-10" y="-18" width="20" height="24" rx="3" fill="#1e7f3a" />
          <rect x="-8" y="-22" width="16" height="4" rx="2" fill="#145c2a" />
        </g>

        <g className="hero-cloud" fill="#cfe8ff" opacity="0.06">
          <ellipse cx="300" cy="60" rx="60" ry="20" />
          <ellipse cx="360" cy="60" rx="40" ry="16" />
        </g>
      </svg>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-white">Tirana</span>
          <span className="title-accent">Bin</span>
        </h1>

        <p className="hero-sub">
          Bashkë për një qytet më të pastër.Raporto, Bashkëpuno, Ndrysho.
        </p>
      </div>
    </section>
  );
}
