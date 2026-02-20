import React from "react";
import "../style/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo" aria-label="Footer">
      <div className="footer-inner">
        <div className="col about">
          <div className="brand">TiranaBin</div>
          <p className="about-text">
            Ndërtuar nga Ekipi TiranaBin si pjesë e projektit universitar.
          </p>
        </div>

        <div className="col links">
          <h4>Quick links</h4>
          <ul>
            <li><a href="/">Kryefaqja</a></li>
            <li><a href="/about">Rreth Nesh</a></li>
            <li><a href="/team">Ekipi</a></li>
            <li><a href="/map">Harta</a></li>
            <li><a href="/contact">Kontakti</a></li>
          </ul>
        </div>

        <div className="col social">
          <h4>Na ndiqni</h4>
          <div className="social-icons" aria-hidden="false">
            <a className="icon" href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="#fff" opacity="0.06"/>
                <path d="M7 7h10v10H7z" fill="#fff" opacity="0.12"/>
                <circle cx="12" cy="12" r="3.2" fill="#fff"/>
              </svg>
            </a>

            <a className="icon" href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="#fff" opacity="0.06"/>
                <path d="M8 10.5v6H6v-6h2zM7 9.25a1 1 0 110-2 1 1 0 010 2zM18 16.5v-3.25c0-1.8-1-2.25-1.9-2.25-.9 0-1.6.5-1.9 1v-1h-2v6h2v-3c0-.8.3-1.5 1.2-1.5.9 0 1.1.9 1.1 1.6v3.9h2z" fill="#fff"/>
              </svg>
            </a>

            <a className="icon" href="#" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" opacity="0.04"/>
                <path d="M12 6a6 6 0 00-1.9 11.7c.3.05.4-.13.4-.3v-1.06c-1.6.35-1.9-.7-1.9-.7-.26-.66-.64-.84-.64-.84-.52-.36.04-.35.04-.35.58.04.88.6.88.6.5.86 1.3.6 1.6.46.05-.36.2-.6.36-.74-1.28-.15-2.62-.64-2.62-2.86 0-.63.22-1.15.58-1.56-.06-.15-.25-.77.06-1.6 0 0 .48-.15 1.6.6a5.5 5.5 0 012.9 0c1.12-.75 1.6-.6 1.6-.6.31.83.12 1.45.06 1.6.36.41.58.93.58 1.56 0 2.23-1.34 2.71-2.62 2.86.2.17.38.5.38 1.02v1.51c0 .17.1.36.4.3A6 6 0 0012 6z" fill="#fff"/>
              </svg>
            </a>
          </div>

          <p className="tagline">Qytete më të pastra, harta më të zgjuara</p>
        </div>
      </div>

      <div className="footer-bottom">© {new Date().getFullYear()} TiranaBin — Të gjitha të drejtat e rezervuara</div>
    </footer>
  );
}

