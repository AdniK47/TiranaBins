 import React from "react";
import "../style/Team.css";

const members = [
  {
    name: "Arben Hoxha",
    role: "Project Lead",
    img: "/path/to/arben.jpg",
    bio: "Koordinon zhvillimin dhe bashkëpunimin me partnerët lokalë."
  },
  {
    name: "Elira Dervishi",
    role: "Frontend Developer",
    img: "/path/to/elira.jpg",
    bio: "Dizajnon ndërfaqen dhe përmirëson përvojën e përdoruesit."
  },
  {
    name: "Gentian Leka",
    role: "Data & Mapping",
    img: "/path/to/gentian.jpg",
    bio: "Përgjegjës për hartimin e të dhënave dhe integrimin e hartës."
  }
];

export default function Team() {
  return (
    <section className="team" aria-labelledby="team-title">
      <h2 id="team-title">Ekipi</h2>
      <p className="lead">Një ekip i vogël, i përkushtuar për të sjellë ndryshim në komunitetin tonë.</p>

      <div className="team-grid">
        {members.map((m) => (
          <article className="card" key={m.name}>
            <div className="card-media">
              <img src={m.img} alt={`${m.name} photo`} />
            </div>

            <div className="card-body">
              <h3 className="card-title">{m.name}</h3>
              <div className="card-role">{m.role}</div>
              <p className="card-desc">{m.bio}</p>

              <div className="card-actions">
                <a href="#" aria-label={`Email ${m.name}`}>✉️</a>
                <a href="#" aria-label={`${m.name} LinkedIn`}>in</a>
                <a href="#" aria-label={`${m.name} GitHub`}>GH</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
