// src/components/MapComponent.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../style/Mapcomponent.css";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Krijo ikonat e trash bin bazuar në tip
const createShapeIcon = (type) => {
  const colors = {
    general: '#354ce7',    // Shtepiake - blu
    plastic: '#FFA500',    // Plastika - portokalli
    organic: '#4CAF50'     // Organike - jeshile
  };

  let html = '';
  let iconSize = [30, 30];
  let iconAnchor = [15, 15];

  if (type === 'general') {
    html = `<div style="width:28px;height:28px;background-color:${colors[type]};border-radius:4px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`;
  } else if (type === 'plastic') {
    html = `<div style="width:30px;height:26px;position:relative;">
              <svg width="30" height="26" viewBox="0 0 30 26" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));">
                <polygon points="15,0 30,26 0,26" fill="${colors[type]}" stroke="white" stroke-width="2"/>
              </svg>
            </div>`;
    iconSize = [30, 26];
    iconAnchor = [15, 13];
  } else {
    html = `<div style="width:30px;height:30px;background-color:${colors[type]};border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`;
  }

  return L.divIcon({
    className: 'trash-bin-marker',
    html: html,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: [0, -15]
  });
};

const MapComponent = () => {
  const [bins, setBins] = useState([]);
  const [filters, setFilters] = useState({
    general: true,
    plastic: true,
    organic: true
  });

  // Ngarko të dhënat nga CSV
  useEffect(() => {
    fetch('/trash_bins.csv')
      .then(response => response.text())
      .then(data => {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        const binsData = lines.slice(1)
          .filter(line => line.trim().length > 0)
          .map(line => {
            const values = line.split(',').map(val => val.trim());
            return {
              name: values[0],
              latitude: parseFloat(values[1]),
              longitude: parseFloat(values[2]),
              type: values[3]
            };
          });
        setBins(binsData);
      })
      .catch(err => console.error('Gabim gjatë ngarkimit të CSV:', err));
  }, []);

  const toggleFilter = (type) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredBins = bins.filter(bin => filters[bin.type]);

  const tiranCenter = [41.3275, 19.8187]; // Qendra e Tiranës

  return (
    <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
      {/* Paneli i filtrave */}
      <div className="filter-panel">
        <div className="label">Kategoria:</div>
        
        <button
          className={`general ${filters.general ? 'active' : ''}`}
          onClick={() => toggleFilter('general')}
        >
          ● Shtepiake
        </button>

        <button
          className={`plastic ${filters.plastic ? 'active' : ''}`}
          onClick={() => toggleFilter('plastic')}
        >
          ● Plastika
        </button>

        <button
          className={`organic ${filters.organic ? 'active' : ''}`}
          onClick={() => toggleFilter('organic')}
        >
          ● Organike
        </button>

        <div style={{ fontSize: '11px', color: '#999', marginTop: '5px' }}>
          Po tregohen {filteredBins.length} kosha
        </div>
      </div>

      {/* Mapa */}
      <MapContainer center={tiranCenter} zoom={15} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {filteredBins.map((bin, idx) => (
          <Marker key={idx} position={[bin.latitude, bin.longitude]} icon={createShapeIcon(bin.type)}>
            <Popup>
              <div>
                <strong>{bin.name}</strong><br/>
                Lloji: <strong>{bin.type.charAt(0).toUpperCase() + bin.type.slice(1)}</strong><br/>
                Lat: {bin.latitude.toFixed(4)}<br/>
                Lng: {bin.longitude.toFixed(4)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

