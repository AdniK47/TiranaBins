// src/components/Contact.js
import React from "react";
import "./../style/contact.css";

const Contact = () => (
  <section className="contact">
    <h1>Na Kontaktoni</h1>
    <form>
      <input type="text" placeholder="Emri juaj"/>
      <input type="email" placeholder="Emaili juaj"/>
      <textarea placeholder="Mesazhi juaj"></textarea>
      <button type="submit">Dërgo</button>
    </form>
    <div className="info">
      <p>Email: info@tiranabin.al</p>
      <p>Tel: +355 68 123 456</p>
    </div>
  </section>
);

export default Contact;
