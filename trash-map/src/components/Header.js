import React from "react";
import "../style/Header.css";

export default function Header() {
  return (
    <header className="header" role="banner" aria-label="Main navigation">
      <div className="header-inner">
        <a href="/" className="nav-brand" aria-label="TiranaBin home">
          <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="brandGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#06b6d4" />
                <stop offset="1" stopColor="#16a34a" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#brandGrad)" />
          </svg>
          <span className="nav-brand-text">
            <span className="brand-white">Tirana</span>
            <span className="brand-accent">Bin</span>
          </span>
        </a>

        <nav aria-label="Primary">
          <ul className="nav-list" role="menubar">
            <li role="none"><a role="menuitem" href="/" className="nav-item">Kryefaqja</a></li>
            <li role="none"><a role="menuitem" href="/about" className="nav-item">Rreth Nesh</a></li>
            <li role="none"><a role="menuitem" href="/team" className="nav-item">Ekipi</a></li>
            <li role="none"><a role="menuitem" href="/contact" className="nav-item">Kontakti</a></li>
            <li role="none"><a role="menuitem" href="/map" className="nav-item cta">Harta</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

