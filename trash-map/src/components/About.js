import React, { useEffect } from "react";
import "./../style/about.css";

const About = () => {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      document.querySelector(".about").style.setProperty("--scroll", scrollY / 10 + "px");
    });
  }, []);

  return (
    <section className="about">
      <h1>Misioni Ynë</h1>
      <p>TiranaBin është një nismë për të ndihmuar qytetarët e Tiranës të gjejnë kosha mbeturinash, të shtojnë të reja dhe të kontribuojnë për një qytet më të pastër.</p>
      <div className="timeline">
        <div className="milestone">♻️ Nga mbeturinat → riciklim</div>
        <div className="milestone">🌱 Nga riciklimi → gjelbërim</div>
        <div className="milestone">🏙️ Nga gjelbërimi → qytet i pastër</div>
      </div>
    </section>
  );
};

export default About;

