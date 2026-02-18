import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import MapComponent from './components/MapComponent';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <MapComponent />
      <Footer />
    </div>
  );
}

export default App;