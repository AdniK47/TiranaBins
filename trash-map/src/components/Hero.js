 import React from 'react';
import '../style/Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <svg
        className="hero-svg"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="heroGradient" x1="0" x2="1">
            <stop offset="0" stopColor="#0f172a" />
            <stop offset="0.5" stopColor="#1e3a8a" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        <rect width="1200" height="300" fill="url(#heroGradient)" />

        <g transform="translate(0,40)" fill="#071028" opacity="0.95">
          <rect x="40" y="120" width="80" height="160" rx="4" />
          <rect x="140" y="80" width="60" height="200" rx="3" />
          <rect x="220" y="140" width="120" height="140" rx="2" />
          <rect x="380" y="60" width="140" height="220" rx="6" />
          <rect x="560" y="100" width="100" height="180" rx="3" />
          <rect x="700" y="90" width="160" height="190" rx="5" />
          <rect x="900" y="130" width="120" height="150" rx="3" />
        </g>

        <g transform="translate(0,120)" fill="#0b1220" opacity="0.7">
          <path d="M0 120 L1200 120 L1200 300 L0 300 Z" />
        </g>
      </svg>

      <div className="hero-content">
        <h1 className="hero-title">Trash Map</h1>
        <p className="hero-sub">Find and report local cleanups</p>
      </div>
    </section>
  );
}
