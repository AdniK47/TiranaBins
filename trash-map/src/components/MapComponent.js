import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { THEME } from '../constants/theme';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icon function - different shapes based on type
const createShapeIcon = (type) => {
  const colors = {
    general: '#354ce7',    // Gray - Square
    plastic: '#FFA500',    // Orange - Triangle
    organic: '#4CAF50'     // Green - Circle
  };

  let html = '';
  let iconSize = [30, 30];
  let iconAnchor = [15, 15];

  if (type === 'general') {
    // Square for general trash
    html = `
      <div style="
        width: 28px;
        height: 28px;
        background-color: ${colors[type]};
        border-radius: 4px;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      "></div>
    `;
  } else if (type === 'plastic') {
    // Triangle for plastic
    html = `
      <div style="
        width: 30px;
        height: 26px;
        position: relative;
      ">
        <svg width="30" height="26" viewBox="0 0 30 26" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));">
          <polygon points="15,0 30,26 0,26" fill="${colors[type]}" stroke="white" stroke-width="2"/>
        </svg>
      </div>
    `;
    iconSize = [30, 26];
    iconAnchor = [15, 13];
  } else {
    // Circle for organic
    html = `
      <div style="
        width: 30px;
        height: 30px;
        background-color: ${colors[type]};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `;
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

  useEffect(() => {
    // Load CSV data
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
      .catch(error => console.error('Error loading CSV:', error));
  }, []);

  const toggleFilter = (type) => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const filteredBins = bins.filter(bin => filters[bin.type]);

  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const containerStyle = {
    display: 'flex',
    gap: '10px',
    height: '500px',
    position: 'relative'
  };

  const filterPanelStyle = {
    width: '120px',
    backgroundColor: THEME.colors.white,
    padding: THEME.spacing.medium,
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 1000,
    position: 'absolute',
    left: '10px',
    bottom: '10px'
  };

  const buttonStyle = (isActive, color) => ({
    padding: '10px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
    backgroundColor: isActive ? color : '#e0e0e0',
    color: isActive ? 'white' : '#666',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? `0 2px 8px ${color}80` : 'none'
  });

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px'
  };

  const tiranCenter = [41.3275, 19.8187];

  return (
    <div style={containerStyle}>
      <div style={filterPanelStyle}>
        <div style={labelStyle}>Kategoria:</div>
        
        <button
          style={buttonStyle(filters.general, '#354ce7')}
          onClick={() => toggleFilter('general')}
        >
          ● Shtepiake
        </button>
        
        <button
          style={buttonStyle(filters.plastic, '#FFA500')}
          onClick={() => toggleFilter('plastic')}
        >
          ● Plastika
        </button>
        
        <button
          style={buttonStyle(filters.organic, '#4CAF50')}
          onClick={() => toggleFilter('organic')}
        >
          ● Organike
        </button>

        <div style={{ fontSize: '11px', color: '#999', marginTop: '5px' }}>
          Duke treguar {filteredBins.length} kosha
        </div>
      </div>

      <MapContainer 
        center={tiranCenter} 
        zoom={15} 
        style={mapStyles}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {filteredBins.map((bin, index) => (
          <Marker 
            key={index}
            position={[bin.latitude, bin.longitude]}
            icon={createShapeIcon(bin.type)}
          >
            <Popup>
              <div>
                <strong>{bin.name}</strong><br/>
                Type: <strong>{bin.type.charAt(0).toUpperCase() + bin.type.slice(1)}</strong><br/>
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
