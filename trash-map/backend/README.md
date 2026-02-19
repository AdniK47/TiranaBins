# Trash Map Backend API

This is the backend API for the Trash Map application. It handles persistent storage and sharing of user-contributed trash bin locations.

## Features

- ✅ Persistent storage of user contributions in CSV
- ✅ CORS enabled for React frontend
- ✅ Automatic reverse geocoding integration
- ✅ Shared contributions across all users
- ✅ Contribution statistics
- ✅ Fallback to localStorage if backend is unavailable

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Start the Backend Server

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

You should see:
```
✅ Trash Map Backend API running on http://localhost:5000
📊 Endpoints:
   GET  /api/contributions - Get all user contributions
   POST /api/contributions - Add a new contribution
   DELETE /api/contributions/:id - Delete a contribution
   GET  /api/stats - Get contribution statistics
   GET  /api/health - Health check
```

### 3. Configure Frontend

The frontend automatically connects to `http://localhost:5000`. To change the backend URL:

Edit `.env.local` in the trash-map (frontend) directory:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

**For production**, update this to your deployed backend URL:

```env
REACT_APP_BACKEND_URL=https://your-backend.com
```

## API Endpoints

### GET `/api/contributions`
Get all user-contributed trash bins.

**Response:**
```json
[
  {
    "id": "contrib_1708331200000_abc123",
    "name": "Skanderbeg Square",
    "latitude": 41.3276,
    "longitude": 19.8189,
    "type": "organic",
    "source": "user_contribution",
    "createdAt": "2026-02-19T10:00:00.000Z"
  }
]
```

### POST `/api/contributions`
Add a new user contribution.

**Request Body:**
```json
{
  "name": "My Location",
  "latitude": 41.3275,
  "longitude": 19.8187,
  "type": "general"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contribution saved",
  "contribution": {
    "id": "contrib_1708331200000_abc123",
    "name": "My Location",
    "latitude": 41.3275,
    "longitude": 19.8187,
    "type": "general",
    "source": "user_contribution",
    "createdAt": "2026-02-19T10:00:00.000Z"
  }
}
```

### DELETE `/api/contributions/:id`
Delete a user contribution by ID.

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/contributions/contrib_1708331200000_abc123
```

**Response:**
```json
{
  "success": true,
  "message": "Contribution deleted"
}
```

### GET `/api/stats`
Get statistics about user contributions.

**Response:**
```json
{
  "total": 15,
  "general": 5,
  "plastic": 6,
  "organic": 4
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "Backend API running"
}
```

## Data Storage

Contributions are stored in the CSV file at `../public/trash_bins.csv`.

**CSV Format:**
```csv
name,latitude,longitude,type,source,id,createdAt
Skanderbeg Square,41.3276,19.8189,organic,user_contribution,contrib_1708331200000_abc123,2026-02-19T10:00:00.000Z
```

### CSV Columns
- `name`: Display name of the location
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate
- `type`: Trash type (general, plastic, organic)
- `source`: Either "fixed" (original) or "user_contribution"
- `id`: Unique identifier for the contribution
- `createdAt`: ISO 8601 timestamp

## Environment Variables

Create a `.env` file in the backend directory (optional):

```env
PORT=5000
CSV_PATH=/path/to/trash_bins.csv
```

**Default values:**
- `PORT`: 5000
- `CSV_PATH`: `../public/trash_bins.csv`

## Development

For development with auto-reload:

```bash
npm install --save-dev nodemon
npm run dev
```

## Testing the API

### Using curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get all contributions
curl http://localhost:5000/api/contributions

# Add a contribution
curl -X POST http://localhost:5000/api/contributions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Location",
    "latitude": 41.3275,
    "longitude": 19.8187,
    "type": "plastic"
  }'

# Get stats
curl http://localhost:5000/api/stats

# Delete a contribution
curl -X DELETE http://localhost:5000/api/contributions/contrib_1708331200000_abc123
```

### Using Postman

1. Import the requests or create them manually:
   - GET `http://localhost:5000/api/contributions`
   - POST `http://localhost:5000/api/contributions` with JSON body
   - DELETE `http://localhost:5000/api/contributions/{id}`
   - GET `http://localhost:5000/api/stats`

## Troubleshooting

### Backend not connecting

1. **Check if server is running:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Check port conflicts:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Linux/Mac
   lsof -i :5000
   ```

3. **Kill process on port 5000:**
   ```bash
   # Windows
   taskkill /PID <PID> /F
   
   # Linux/Mac
   kill -9 <PID>
   ```

### CSV file not found

Ensure the CSV file exists at the path specified by `CSV_PATH`. The server will create the file on first contribution if it doesn't exist.

### CORS errors

CORS is enabled by default. If you still get errors:
- Check that the frontend URL is correct in browser console
- Ensure backend is running on the correct port
- For production, update CORS settings in `server.js` line 15:
  ```javascript
  app.use(cors({
    origin: 'https://your-frontend-domain.com'
  }));
  ```

### Frontend using localStorage instead of backend

If the frontend falls back to localStorage, check:
1. Backend health: `curl http://localhost:5000/api/health`
2. Browser console for errors
3. Network tab to see API requests
4. Correct `REACT_APP_BACKEND_URL` in frontend `.env.local`

## Deployment

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t trash-map-backend .
docker run -p 5000:5000 -e CSV_PATH=/data/trash_bins.csv trash-map-backend
```

### Heroku

1. Create `Procfile`:
   ```
   web: npm start
   ```

2. Deploy:
   ```bash
   heroku create trash-map-backend
   heroku config:set CSV_PATH=/app/public/trash_bins.csv
   git push heroku main
   ```

### Production Checklist

- [ ] Update `REACT_APP_BACKEND_URL` in frontend `.env.local`
- [ ] Enable HTTPS for the backend URL
- [ ] Set appropriate CORS origins in `server.js`
- [ ] Use a database instead of CSV for better performance with many contributions
- [ ] Add authentication if needed (API keys, JWT tokens)
- [ ] Monitor logs and errors
- [ ] Set up automated backups of CSV/database

## Database Migration (Optional)

As the project grows, consider migrating from CSV to a database like MongoDB, PostgreSQL, or SQLite for better performance and reliability.

## Support

For issues or feature requests, please open an issue in the repository.
