# User Contributions Persistence Guide

## Overview
The trash map now supports persistent user contributions. Users can add new trash bins, and these contributions will be saved and available the next time they visit.

## How It Works

### 1. **Client-Side Storage (Default)**
- User contributions are saved to browser **localStorage**
- Persists across browser sessions for the same device
- No server required
- Fast and immediate feedback

### 2. **CSV Data Format**
The CSV now has a `source` column to distinguish between fixed and user-contributed bins:

```csv
name,latitude,longitude,type,source
Bin 1,41.3275,19.8187,general,fixed
User Suggestion,41.3290,19.8200,plastic,user_contribution
```

## Features

### For Users
- **Add bins**: Right-click (or long-press on mobile) anywhere on the map
- **Automatic location naming**: Uses OpenStreetMap to name location
- **Choose type**: Select general, plastic, or organic waste bins
- **View contributions**: Shows count of user contributions in sidebar
- **Delete contributions**: Remove unwanted suggestions
- **Persistent storage**: All contributions saved in browser

### For Developers

#### Utility Functions (`src/utils/userContributionsStorage.js`)
```javascript
// Load all user contributions
const contributions = loadUserContributions();

// Save a new contribution
const newBin = saveUserContribution({
  name: "My Location",
  latitude: 41.3275,
  longitude: 19.8187,
  type: "general"
});

// Delete a contribution
deleteUserContribution(pinId);

// Get statistics
const stats = getContributionStats();
// { total: 5, general: 2, plastic: 1, organic: 2 }

// Export as CSV
const csvString = exportContributionsAsCSV();
```

## Using the Optional Backend (Advanced)

If you want to share contributions across users/devices, you can set up the optional backend API:

### Setup Backend

1. **Install dependencies**:
```bash
cd trash-map
npm install express cors body-parser csv-parser csv-writer
```

2. **Create backend server**:
```bash
# The server.js is already created in /backend directory
node backend/server.js
```

3. **Update MapComponent** to sync with backend:

In `src/components/MapComponent.js`, modify the `confirmPin` function:

```javascript
const savedPin = saveUserContribution(newPin);

if (savedPin) {
  setUserPins([...userPins, savedPin]);
  
  // Sync to backend (optional)
  try {
    await fetch('http://localhost:5000/api/contributions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(savedPin)
    });
  } catch (err) {
    console.warn('Could not sync to backend:', err);
  }
}
```

4. **Load contributions from backend** (optional):

In the useEffect that loads CSV:

```javascript
// After loading CSV, optionally fetch from backend
try {
  const backendContributions = await fetch('http://localhost:5000/api/contributions')
    .then(r => r.json());
  setUserPins(backendContributions);
} catch (err) {
  console.log('Backend not available, using localStorage');
}
```

### Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contributions` | Get all user contributions |
| POST | `/api/contributions` | Add new contribution |
| GET | `/api/stats` | Get contribution statistics |

**Example POST Request**:
```bash
curl -X POST http://localhost:5000/api/contributions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Skanderbeg Square",
    "latitude": 41.3276,
    "longitude": 19.8189,
    "type": "organic"
  }'
```

## Data Flow

```
Browser localStorage
  ↓
MapComponent (React state)
  ↓
Display on Map
  ↓
(Optional) Backend API ↔ CSV File
```

## Development Tips

1. **View stored data**:
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Find key: `trash_map_user_contributions`

2. **Clear all contributions**:
   ```javascript
   localStorage.removeItem('trash_map_user_contributions');
   location.reload();
   ```

3. **Export contributions**:
   ```javascript
   import { exportContributionsAsCSV } from '../utils/userContributionsStorage';
   const csv = exportContributionsAsCSV();
   console.log(csv);
   ```

4. **Get stats**:
   ```javascript
   import { getContributionStats } from '../utils/userContributionsStorage';
   console.log(getContributionStats());
   ```

## File Structure

```
trash-map/
├── src/
│   ├── components/
│   │   └── MapComponent.js (updated)
│   ├── utils/
│   │   └── userContributionsStorage.js (new)
│   ├── trash_bins.csv (updated with source column)
│   └── App.js
├── public/
│   └── trash_bins.csv (updated with source column)
└── backend/
    └── server.js (optional backend API)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Contributions not persisting | Check if localStorage is enabled in browser settings |
| Map not showing old contributions | Clear browser cache or check Application > Local Storage |
| Backend sync not working | Check CORS settings, ensure backend is running on port 5000 |
| Large number of contributions | Consider implementing database instead of CSV |

## Future Enhancements

- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] User authentication (account-based contributions)
- [ ] Contribution voting/validation
- [ ] Admin dashboard to approve contributions
- [ ] Export contributions to GeoJSON
- [ ] Real-time sync with other users
- [ ] Offline mode with service workers
