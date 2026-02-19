 import { Link, useLocation } from "react-router-dom";
import "../style/Header.css";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">TrashFinder</div>
      <nav>
        <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
        <Link className={location.pathname === "/about" ? "active" : ""} to="/about">About Us</Link>
        <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">Contact</Link>
        <Link className={location.pathname === "/map" ? "active map-button" : "map-button"} to="/map">Map</Link>
      </nav>
    </header>
  );
}

export default Header;
