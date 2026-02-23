 import React from "react";
import "../style/Team.css";

const members = [
  {
    name: "Daniel Agolli",
    role: "Backend Developer"
  },
  {
    name: "Adni Kazaferi",
    role: "Project Lead and Data Mapper",},
  {
    name: "Aiden Memia ",
    role: "Frontend Developer",
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
            <div className="card-body">
              <h3 className="card-title">{m.name}</h3>
              <div className="card-role">{m.role}</div>
              <p className="card-desc">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
