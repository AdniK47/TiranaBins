// src/components/Hero.js
import React, { useMemo } from "react";
import "../style/Hero.css";

const SCENE = { width: 1200, height: 420 };

function generateActors() {
  const palettes = [
    ["#2b6cff", "#1e40af"],
    ["#f59e0b", "#b45309"],
    ["#34d399", "#059669"],
    ["#60a5fa", "#2563eb"],
    ["#f97316", "#ea580c"],
    ["#a78bfa", "#7c3aed"],
  ];
  return [
    { id: "actor-0", x: 160, y: 260, role: "passerby", clothes: palettes[0], scale: 1 },
    { id: "actor-1", x: 360, y: 258, role: "litterer", clothes: palettes[1], scale: 1 },
    { id: "actor-2", x: 560, y: 262, role: "volunteer", clothes: palettes[2], scale: 1 },
    { id: "actor-3", x: 760, y: 280, role: "picker", clothes: palettes[3], scale: 1 },
    { id: "actor-4", x: 980, y: 260, role: "passerby", clothes: palettes[4], scale: 1 },
  ];
}

const BINS = [
  { id: "bin-1", x: 220, y: 230, label: "Letër" },
  { id: "bin-2", x: 560, y: 230, label: "Plastikë" },
  { id: "bin-3", x: 900, y: 230, label: "Organike" },
];

export default function Hero() {
  const actors = useMemo(() => generateActors(), []);

  return (
    <section className="hero static-hero" aria-label="Hero">
      <svg
        className="hero-svg"
        viewBox={`0 0 ${SCENE.width} ${SCENE.height}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="groundGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3f6b3a" />
            <stop offset="1" stopColor="#254a24" />
          </linearGradient>
          <g id="trash-bottle">
            <rect x="0" y="0" width="6" height="14" rx="2" fill="#9fb7c9" />
            <rect x="1" y="-4" width="4" height="4" rx="1.5" fill="#7f9fb0" />
          </g>
          <g id="trash-paper">
            <rect x="0" y="0" width="8" height="6" rx="1" fill="#e6e6e6" />
            <path d="M1 1 L7 1" stroke="#cfcfcf" strokeWidth="0.6" />
          </g>
          <g id="tree">
            <rect x="-6" y="0" width="12" height="36" rx="3" fill="#6b4f3a" />
            <g transform="translate(0,-8)">
              <ellipse cx="0" cy="0" rx="36" ry="22" fill="#2f8a3a" />
              <ellipse cx="-18" cy="-6" rx="20" ry="12" fill="#2b7a33" />
              <ellipse cx="18" cy="-6" rx="20" ry="12" fill="#2b7a33" />
            </g>
          </g>
          <g id="bench">
            <rect x="-36" y="0" width="72" height="8" rx="2" fill="#6b4f3a" />
            <rect x="-40" y="8" width="6" height="18" rx="2" fill="#6b4f3a" />
            <rect x="34" y="8" width="6" height="18" rx="2" fill="#6b4f3a" />
            <rect x="-30" y="-10" width="60" height="6" rx="2" fill="#8b6b4a" />
          </g>
        </defs>

        <rect y="220" width={SCENE.width} height="200" fill="url(#groundGrad)" />

        <g className="park-foreground">
          <use href="#tree" transform="translate(80,200) scale(1.05)" />
          <use href="#tree" transform="translate(1040,190) scale(1.15)" />
          <use href="#tree" transform="translate(980,220) scale(0.9)" />
          <use href="#bench" transform="translate(640,270) scale(1)" />
          <use href="#bench" transform="translate(820,270) scale(1)" />
        </g>

        {BINS.map((b) => (
          <g key={b.id} className="bin" transform={`translate(${b.x},${b.y})`}>
            <rect className="bin-body" x="-22" y="-34" width="44" height="44" rx="6" />
            <rect className="bin-lid" x="-24" y="-44" width="48" height="12" rx="3" fill="#0f3f1a" />
            <text x="0" y="-6" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="sans-serif" fontWeight="700">
              {b.label}
            </text>
          </g>
        ))}

        <g className="ground-litter" opacity="0.95">
          <use href="#trash-paper" x="200" y="300" className="trash-item" />
          <use href="#trash-bottle" x="320" y="310" className="trash-item" />
          <use href="#trash-paper" x="420" y="295" className="trash-item" />
          <use href="#trash-paper" x="700" y="320" className="trash-item" />
          <use href="#trash-bottle" x="860" y="305" className="trash-item" />
          <use href="#trash-paper" x="1040" y="315" className="trash-item" />
        </g>
      </svg>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-white">Tirana</span>
          <span className="title-accent neon-bin">Bin</span>
        </h1>
        <p className="hero-sub hero-sub-white">Bashkë për një qytet më të pastër</p>
      </div>
    </section>
  );
}


