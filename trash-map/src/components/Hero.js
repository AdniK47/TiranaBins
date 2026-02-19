 // src/components/Hero.js
import React from "react";
import "./../style/Hero.css";

const Hero = () => (
  <section className="hero">
    <h1>Rikrijojmë Mbetjet, Një Kosh Në Një Kohë</h1>
    <p>TiranaBin ju ndihmon të gjeni kosha në Tiranë, të shtoni të reja dhe të kontribuoni për një qytet më të pastër.</p>
    <button onClick={() => window.location.href='/map'}>Hap Hartën</button>
  </section>
);

export default Hero;
