 import React from "react";
import "./../style/Contact.css";

const Contact = () => (
  <section className="contact-page">
    <div className="contact-card">
      <h3>Na Kontaktoni</h3>
      <p className="lead">Kemi kënaqësi të dëgjojmë nga ju. Plotësoni formularin ose përdorni kontaktet tona më poshtë.</p>

      <form className="contact-form">
        <div>
          <label htmlFor="name">Emri juaj</label>
          <input id="name" type="text" placeholder="Shkruani emrin tuaj" />
        </div>
        <div>
          <label htmlFor="email">Emaili juaj</label>
          <input id="email" type="email" placeholder="Shkruani emailin tuaj" />
        </div>
        <div className="full">
          <label htmlFor="message">Mesazhi juaj</label>
          <textarea id="message" placeholder="Shkruani mesazhin tuaj"></textarea>
        </div>
        <div className="contact-actions">
          <span className="note">Do t’ju përgjigjemi sa më shpejt.</span>
          <button type="submit" className="btn">Dërgo</button>
        </div>
      </form>

      <div className="info">
        <p>Email: <a href="mailto:info@tiranabin.al">info@tiranabin.al</a></p>
        <p>Tel: +355 68 123 456</p>
      </div>
    </div>
  </section>
);

export default Contact;
