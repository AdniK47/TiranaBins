/**
 * Optional Backend API for syncing user contributions to server
 * 
 * This is an optional Express.js server that can be used to:
 * 1. Sync user contributions from browser to server
 * 2. Share contributions across users/devices
 * 3. Persist contributions in a database instead of just localStorage
 * 
 * Setup Instructions:
 * 1. Install dependencies: npm install express cors body-parser csv-parser csv-writer
 * 2. Create a server.js file with the code below
 * 3. Run: node server.js
 * 4. Update MapComponent to POST to this API
 * 
 * Then update MapComponent.js confirmPin() to also send to backend:
 * 
 *   const response = await fetch('http://localhost:5000/api/contributions', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(savedPin)
 *   });
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const CSV_PATH = process.env.CSV_PATH || path.join(__dirname, '../public/trash_bins.csv');

// Middleware
app.use(cors());
app.use(bodyParser.json());

console.log(`CSV Path: ${CSV_PATH}`);

/**
 * GET /api/contributions
 * Returns all user contributions from CSV
 */
app.get('/api/contributions', (req, res) => {
  const contributions = [];
  
  if (!fs.existsSync(CSV_PATH)) {
    console.warn(`CSV file not found at ${CSV_PATH}`);
    return res.json([]);
  }

  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', (row) => {
      if (row.source && row.source.trim() === 'user_contribution') {
        contributions.push({
          id: row.id || `contrib_${Date.now()}_${Math.random()}`,
          name: row.name,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude),
          type: row.type,
          source: 'user_contribution',
          createdAt: row.createdAt || new Date().toISOString()
        });
      }
    })
    .on('end', () => {
      console.log(`Retrieved ${contributions.length} contributions`);
      res.json(contributions);
    })
    .on('error', (error) => {
      console.error('Error reading CSV:', error);
      res.status(500).json({ error: 'Failed to read contributions' });
    });
});

/**
 * POST /api/contributions
 * Adds a new user contribution and appends to CSV
 */
app.post('/api/contributions', (req, res) => {
  try {
    const { name, latitude, longitude, type } = req.body;
    
    // Validate input
    if (!name || latitude === undefined || longitude === undefined || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contributionId = `contrib_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const createdAt = new Date().toISOString();

    const contribution = {
      id: contributionId,
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      type,
      source: 'user_contribution',
      createdAt
    };

    // Ensure CSV file exists
    if (!fs.existsSync(CSV_PATH)) {
      const headers = 'name,latitude,longitude,type,source,id,createdAt\n';
      fs.writeFileSync(CSV_PATH, headers);
    }

    // Append to CSV (escape quotes in name)
    const escapedName = `"${name.replace(/"/g, '""')}"`;
    const csvLine = `${escapedName},${latitude},${longitude},${type},user_contribution,${contributionId},${createdAt}\n`;
    
    fs.appendFileSync(CSV_PATH, csvLine);
    console.log('Contribution saved:', contributionId);
    
    res.status(201).json({
      success: true,
      message: 'Contribution saved',
      contribution
    });
  } catch (error) {
    console.error('Error saving contribution:', error);
    res.status(500).json({ error: 'Failed to save contribution' });
  }
});

/**
 * DELETE /api/contributions/:id
 * Removes a contribution by ID
 */
app.delete('/api/contributions/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    if (!fs.existsSync(CSV_PATH)) {
      return res.status(404).json({ error: 'Contribution not found' });
    }

    // Read all lines
    const data = fs.readFileSync(CSV_PATH, 'utf8');
    const lines = data.trim().split('\n');
    const headers = lines[0];
    
    // Filter out the contribution with matching ID
    const filtered = lines.filter((line, idx) => {
      if (idx === 0) return true; // Keep header
      const parts = line.split(',');
      const lineId = parts[parts.length - 2]; // ID is second to last
      return lineId !== id;
    });

    // Write back
    fs.writeFileSync(CSV_PATH, filtered.join('\n'));
    console.log('Contribution deleted:', id);
    
    res.json({ success: true, message: 'Contribution deleted' });
  } catch (error) {
    console.error('Error deleting contribution:', error);
    res.status(500).json({ error: 'Failed to delete contribution' });
  }
});

/**
 * GET /api/stats
 * Returns statistics about contributions
 */
app.get('/api/stats', (req, res) => {
  const stats = {
    total: 0,
    general: 0,
    plastic: 0,
    organic: 0
  };

  if (!fs.existsSync(CSV_PATH)) {
    return res.json(stats);
  }

  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', (row) => {
      if (row.source && row.source.trim() === 'user_contribution') {
        stats.total++;
        if (stats.hasOwnProperty(row.type)) {
          stats[row.type]++;
        }
      }
    })
    .on('end', () => {
      console.log('Stats:', stats);
      res.json(stats);
    })
    .on('error', (error) => {
      console.error('Error reading CSV:', error);
      res.status(500).json({ error: 'Failed to get stats' });
    });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend API running' });
});

app.listen(PORT, () => {
  console.log(`✅ Trash Map Backend API running on http://localhost:${PORT}`);
  console.log(`📊 Endpoints:`);
  console.log(`   GET  /api/contributions - Get all user contributions`);
  console.log(`   POST /api/contributions - Add a new contribution`);
  console.log(`   DELETE /api/contributions/:id - Delete a contribution`);
  console.log(`   GET  /api/stats - Get contribution statistics`);
  console.log(`   GET  /api/health - Health check`);
});
