// src/components/Footer.js
import React from "react";
import "./../style/Footer.css";

const Footer = () => (
  <footer>
    <div className="quick-links">
      <a href="/">Kryefaqja</a> | 
      <a href="/about">Rreth Nesh</a> | 
      <a href="/team">Ekipi</a> | 
      <a href="/contact">Kontakti</a> | 
      <a href="/map">Harta</a>
    </div>
    <div className="socials">
      <a href="#">Instagram</a> | <a href="#">LinkedIn</a> | <a href="#">GitHub</a>
    </div>
    <p>Ndërtuar nga Ekipi TiranaBin si pjesë e projektit universitar.</p>
    <p><strong>“Qytete më të pastra, harta më të zgjuara.”</strong></p>
  </footer>
);

export default Footer;


