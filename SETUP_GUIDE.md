# 🗑️ Trash Map - Complete Setup Guide

This guide explains how to set up and run both the frontend (React) and backend (Node.js/Express) for the Trash Map application with shared user contributions.

## System Requirements

- **Node.js** v14+ (https://nodejs.org/)
- **npm** v6+ (comes with Node.js)
- **Git** (optional, for version control)

Check if you have them:
```bash
node --version
npm --version
```

## Project Structure

```
trash-map/
├── src/                    # Frontend React code
├── public/                 # Frontend static files
├── trash_bins.csv          # CSV with fixed + user contributions
├── package.json            # Frontend dependencies
├── .env.local              # Frontend configuration
└── backend/
    ├── server.js           # Express API server
    ├── package.json        # Backend dependencies
    └── .gitignore
```

## Setup Instructions

### Step 1: Install Frontend Dependencies

```bash
cd trash-map
npm install
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 3: Start the Backend Server

Open a **new terminal/command prompt** and run:

```bash
cd trash-map/backend
npm start
```

You should see:
```
✅ Trash Map Backend API running on http://localhost:5000
```

**Keep this terminal open!** The backend needs to run continuously.

### Step 4: Configure Frontend (if needed)

The frontend is pre-configured to use `http://localhost:5000`. If you want to change this:

Edit `trash-map/.env.local`:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Step 5: Start the Frontend (in original terminal)

```bash
cd trash-map
npm start
```

The app should open in your browser at `http://localhost:3000`.

## How It Works

### Adding a User Contribution

1. Right-click (or long-press on mobile) anywhere on the map
2. Select the trash bin type
3. Click "Shto" (Add)
4. **Backend saves it** → **CSV updated** → **All users see it**

### Data Flow

```
User adds bin
    ↓
Browser sends to Backend API
    ↓
Backend appends to trash_bins.csv
    ↓
Browser loads updated CSV + contributions
    ↓
All users see it on their next visit
```

### Storage

- **Fixed bins**: Initially in CSV with `source=fixed`
- **User contributions**: Added to CSV with `source=user_contribution`
- **Shared**: All users see all contributions (from the CSV)
- **Persistent**: Saved in `public/trash_bins.csv`

## Running Both Concurrently (Easier Way)

You can run both the frontend and backend from one terminal:

```bash
# From trash-map directory
npm run dev
```

> **Note**: This requires concurrently package. If not working, run the manual setup above.

## Testing the Setup

### Check if Backend is Running

```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Backend API running"}
```

### Add a Test Contribution

```bash
curl -X POST http://localhost:5000/api/contributions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Bin",
    "latitude": 41.3275,
    "longitude": 19.8187,
    "type": "plastic"
  }'
```

### View All Contributions

```bash
curl http://localhost:5000/api/contributions
```

## Troubleshooting

### "Backend not connecting" error

**Problem**: Frontend shows warning but still works (using localStorage)

**Solution**: 
1. Check if backend is running: `curl http://localhost:5000/api/health`
2. Ensure `.env.local` has correct URL
3. Restart both frontend and backend

### "Port 5000 already in use"

**Windows**:
```bash
netstat -ano | findstr :5000
# Find the PID, then:
taskkill /PID <pid> /F
```

**Linux/Mac**:
```bash
lsof -i :5000
kill -9 <pid>
```

### "CSV file not found"

The CSV file should be at:
- `trash-map/public/trash_bins.csv` (for real file)
- `trash-map/src/trash_bins.csv` (copy for src)

If missing, the backend will create it on the first contribution.

### npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

## Development Commands

### Frontend

```bash
cd trash-map

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Backend

```bash
cd trash-map/backend

# Start server
npm start

# Start with auto-reload (requires nodemon)
npm run dev

# Install dev dependencies first
npm install --save-dev nodemon
```

## Deployment

### For Production

1. **Update frontend environment variable**:
   ```bash
   # trash-map/.env.local or .env.production
   REACT_APP_BACKEND_URL=https://your-backend-domain.com
   ```

2. **Build frontend**:
   ```bash
   cd trash-map
   npm run build
   ```

3. **Deploy backend**:
   - Set `PORT` environment variable
   - Set `CSV_PATH` to persistent storage location
   - See [backend/README.md](backend/README.md) for hosting options

4. **Serve static files** from `trash-map/build` directory (using Nginx, Apache, or hosting service)

## File Descriptions

### Frontend Files Modified

- **src/components/MapComponent.js**: Updated to use backend API instead of just localStorage
- **src/utils/userContributionsStorage.js**: Utility functions for localStorage (backup)
- **.env.local**: Backend URL configuration

### Backend Files

- **backend/server.js**: Express API server with data handling
- **backend/package.json**: Backend dependencies (Express, CORS, etc.)
- **backend/README.md**: Detailed backend API documentation

### Data Files

- **public/trash_bins.csv**: Master CSV with all bins (fixed + user contributions)
- **src/trash_bins.csv**: Copy for development

## Features

✅ Users can add trash bin suggestions  
✅ All suggestions are shared across users  
✅ Suggestions persist in CSV file  
✅ Works offline (with localStorage fallback)  
✅ CORS enabled for API access  
✅ Reverse geocoding for location names  
✅ Type filtering (general, plastic, organic)  
✅ Delete user contributions  
✅ API statistics endpoint  

## Next Steps

- [ ] Set up on your server/hosting
- [ ] Configure production backend URL
- [ ] Set up automatic CSV backups
- [ ] Add database for better performance (optional)
- [ ] Add user authentication (optional)
- [ ] Set up monitoring/logging
- [ ] Create admin dashboard to moderate contributions (optional)

## Support

For issues or questions:
1. Check the [backend/README.md](backend/README.md) for API details
2. Check browser console (F12) for error messages
3. Check backend terminal for API logs
4. Review the [USER_CONTRIBUTIONS_GUIDE.md](USER_CONTRIBUTIONS_GUIDE.md)

## Quick Reference

| What | Command | Terminal |
|------|---------|----------|
| Start Backend | `cd backend && npm start` | Terminal 1 |
| Start Frontend | `npm start` | Terminal 2 |
| Stop Backend | `Ctrl+C` | Terminal 1 |
| Stop Frontend | `Ctrl+C` | Terminal 2 |
| Check Backend | `curl http://localhost:5000/api/health` | Any |
| View Contributions | `curl http://localhost:5000/api/contributions` | Any |

Enjoy your Trash Map! 🗺️🗑️
