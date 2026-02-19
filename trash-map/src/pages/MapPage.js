import MapComponent from "../components/MapComponent";
import "../style/Pages.css";

function MapPage() {
  return (
    <div className="page map-page">
      <h1>Trash Map</h1>
      <p>Use the filters to find trash bins by category.</p>
      <MapComponent />
    </div>
  );
}

export default MapPage;
