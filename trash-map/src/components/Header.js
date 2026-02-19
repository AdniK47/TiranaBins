// src/components/Header.js
import React from "react";
import "./../style/Header.css";

const Header = () => (
  <header className="glass-header">
    <div className="logo">🌍 TiranaBin</div>
    <nav>
      <a href="/" className="nav-link">🏠 Kryefaqja</a>
      <a href="/about" className="nav-link">ℹ️ Rreth Nesh</a>
      <a href="/team" className="nav-link">👥 Ekipi</a>
      <a href="/contact" className="nav-link">📬 Kontakti</a>
      <a href="/map" className="nav-link map-btn">🗺️ Harta</a>
    </nav>
  </header>
);

export default Header;

