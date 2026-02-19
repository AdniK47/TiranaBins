import { Link } from "react-router-dom";
import "../style/Pages.css";

function Home() {
  return (
    <div className="page home-page">
      <div className="hero">
        <h1>TrashFinder</h1>
        <p>Quickly locate nearby trash bins and keep your city clean.</p>
        <Link className="cta-button" to="/map">Go to Map</Link>
      </div>
    </div>
  );
}

export default Home;

