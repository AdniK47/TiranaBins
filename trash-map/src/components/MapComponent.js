import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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
const createShapeIcon = (type, opacity = 1, isUserPin = false) => {
  const colors = {
    general: '#354ce7',    // Gray - Square
    plastic: '#FFA500',    // Orange - Triangle
    organic: '#4CAF50'     // Green - Circle
  };

  let html = '';
  let iconSize = [30, 30];
  let iconAnchor = [15, 15];
  const borderStyle = isUserPin ? '2px dotted white' : '2px solid white';

  if (type === 'general') {
    // Square for general trash
    html = `
      <div style="
        width: 28px;
        height: 28px;
        background-color: ${colors[type]};
        border-radius: 4px;
        border: ${borderStyle};
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        opacity: ${opacity};
      "></div>
    `;
  } else if (type === 'plastic') {
    // Triangle for plastic
    const strokeDasharray = isUserPin ? '5,3' : 'none';
    html = `
      <div style="
        width: 30px;
        height: 26px;
        position: relative;
        opacity: ${opacity};
      ">
        <svg width="30" height="26" viewBox="0 0 30 26" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));">
          <polygon points="15,0 30,26 0,26" fill="${colors[type]}" stroke="white" stroke-width="2" ${isUserPin ? 'stroke-dasharray="5,3"' : ''}/>
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
        border: ${borderStyle};
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        opacity: ${opacity};
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

// Component to handle map right-clicks and long-press on mobile
const MapClicker = ({ onMapClick, onLongPress }) => {
  const [touchStart, setTouchStart] = useState(null);
  const touchDuration = 500; // milliseconds

  useMapEvents({
    contextmenu(e) {
      e.originalEvent.preventDefault();
      onMapClick(e);
    },
    touchstart(e) {
      setTouchStart(Date.now());
    },
    touchend(e) {
      if (touchStart && Date.now() - touchStart >= touchDuration) {
        const touch = e.originalEvent.changedTouches[0];
        if (touch) {
          const point = this.latLngToContainerPoint([e.latlng.lat, e.latlng.lng]);
          const latlng = this.containerPointToLatLng([touch.clientX, touch.clientY]);
          onLongPress({ latlng: latlng });
        }
      }
      setTouchStart(null);
    }
  });
  return null;
};

const MapComponent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [bins, setBins] = useState([]);
  const [filters, setFilters] = useState({
    general: true,
    plastic: true,
    organic: true
  });
  const [userPins, setUserPins] = useState([]);
  const [selectedType, setSelectedType] = useState('general');
  const [pendingPin, setPendingPin] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleMapClick = (e) => {
    setPendingPin({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng
    });
    setSelectedType('general');
  };

  const confirmPin = async () => {
    if (pendingPin) {
      const lat = pendingPin.latitude;
      const lon = pendingPin.longitude;
      let name = 'Sugjerimi juaj';
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
        const resp = await fetch(url);
        if (resp.ok) {
          const data = await resp.json();
          if (data) {
            // prefer street/road name if available
            name = (data.address && (data.address.road || data.address.pedestrian || data.address.cycleway || data.address.footway)) || data.display_name || name;
          }
        }
      } catch (err) {
        console.error('Reverse geocode failed', err);
      }

      const newPin = {
        id: Date.now(),
        latitude: lat,
        longitude: lon,
        type: selectedType,
        name
      };
      setUserPins([...userPins, newPin]);
      setPendingPin(null);
    }
  };

  const cancelPin = () => {
    setPendingPin(null);
  };

  const deleteUserPin = (pinId) => {
    setUserPins(userPins.filter(pin => pin.id !== pinId));
  };

  const filteredBins = bins.filter(bin => filters[bin.type]);
  const filteredUserPins = userPins.filter(pin => filters[pin.type]);

  const mapStyles = {
    height: isMobile ? 'calc(100vh - 200px)' : '500px',
    width: '100%'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '10px',
    height: isMobile ? '100vh' : '500px',
    position: 'relative'
  };

  const filterPanelStyle = {
    width: isMobile ? '100%' : '120px',
    backgroundColor: THEME.colors.white,
    padding: THEME.spacing.medium,
    borderRadius: isMobile ? '0px' : '8px',
    boxShadow: isMobile ? '0 -2px 10px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    gap: '10px',
    zIndex: 1000,
    position: isMobile ? 'relative' : 'absolute',
    left: isMobile ? 'auto' : '10px',
    bottom: isMobile ? 'auto' : '10px',
    overflowX: isMobile ? 'auto' : 'visible'
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
          ● Shtëpiake
        </button>
        
        <button
          style={buttonStyle(filters.plastic, '#FFA500')}
          onClick={() => toggleFilter('plastic')}
        >
          ● Plastikë
        </button>
        
        <button
          style={buttonStyle(filters.organic, '#4CAF50')}
          onClick={() => toggleFilter('organic')}
        >
          ● Organike
        </button>

        <div style={{ fontSize: '11px', color: '#999', marginTop: isMobile ? '0px' : '5px' }}>
          Duke treguar {filteredBins.length} kosha
        </div>

        <div style={{ fontSize: '11px', color: '#999', marginTop: isMobile ? '0px' : '10px', paddingTop: isMobile ? '0px' : '10px', borderTop: isMobile ? 'none' : '1px solid #ddd' }}>
          {isMobile ? 'Mbaj të shtypur për të shtuar' : 'Klikoni me të djathtën për të shtuar një kosh të ri!'}
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
        
        <MapClicker onMapClick={handleMapClick} onLongPress={handleMapClick} />
        
        {filteredBins.map((bin, index) => (
          <Marker 
            key={index}
            position={[bin.latitude, bin.longitude]}
            icon={createShapeIcon(bin.type, 1, false)}
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

        {filteredUserPins.map((pin) => (
          <Marker 
            key={pin.id}
            position={[pin.latitude, pin.longitude]}
            icon={createShapeIcon(pin.type, 0.85, true)}
          >
            <Popup>
              <div>
                <strong>{pin.name || 'Sugjerimi juaj'}</strong><br/>
                Type: <strong>{pin.type.charAt(0).toUpperCase() + pin.type.slice(1)}</strong><br/>
                Lat: {pin.latitude.toFixed(4)}<br/>
                Lng: {pin.longitude.toFixed(4)}<br/>
                <button 
                  onClick={() => deleteUserPin(pin.id)}
                  style={{
                    marginTop: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Hiq
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {pendingPin && (
          <Marker 
            position={[pendingPin.latitude, pendingPin.longitude]}
            icon={createShapeIcon(selectedType, 0.85, true)}
          >
            <Popup>
              <div>
                <strong>Zgjidh llojin e koshit:</strong><br/>
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="general">Shtepiake</option>
                  <option value="plastic">Plastike</option>
                  <option value="organic">Organike</option>
                </select>
                <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                  <button 
                    onClick={confirmPin}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      flex: 1
                    }}
                  >
                    Shto
                  </button>
                  <button 
                    onClick={cancelPin}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      flex: 1
                    }}
                  >
                    Anulo
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
