import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">

      <section className="hero">
        <h1>Reinventing Waste, One Bin at a Time</h1>
        <p>Gjeni kosha. Reduktoni ndotjen. Transformoni qytetin.</p>

        <Link to="/map" className="cta-button">
          Hap Hartën
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          ♻
          <h3>Gjej Kosha</h3>
          <p>Harta inteligjente për mbetje të ndryshme.</p>
        </div>

        <div className="feature-card">
          🌱
          <h3>Ruaj Ambientin</h3>
          <p>Çdo hedhje e duhur ndihmon qytetin.</p>
        </div>

        <div className="feature-card">
          🤝
          <h3>Bëhu Pjesë</h3>
          <p>Bashkohu në misionin tonë ekologjik.</p>
        </div>
      </section>

    </div>
  );
};

export default Home;


