# AquaScan HMPI - Heavy Metal Pollution Index Application

A web application for analyzing heavy metal pollution in groundwater using the Heavy Metal Pollution Index (HMPI) methodology.

## Features

- 📊 Upload and process CSV/Excel files with heavy metal data
- 🗺️ Interactive map visualization of pollution data
- 📈 Statistical analysis and HMPI calculations
- 📥 Export processed results
- 🎨 Modern, responsive UI built with React and Tailwind CSS

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Shadcn UI components
- React Router
- Deck.gl / MapLibre for maps

**Backend:**
- Flask (Python)
- MongoDB
- Pandas for data processing
- NumPy for calculations

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   # Backend
   pip install -r requirements.txt
   
   # Frontend
   cd AquaScan_prototype
   npm install
   ```

2. **Set up MongoDB:**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud)

3. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string

4. **Run the application:**
   ```bash
   # Terminal 1: Backend
   python app.py
   
   # Terminal 2: Frontend (development)
   cd AquaScan_prototype
   npm run dev
   ```

### Build for Production

```bash
cd AquaScan_prototype
npm install
npm run build
```

The built files will be in `AquaScan_prototype/dist/`

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Heroku
- Railway
- Render
- Docker
- VPS

### Quick Deploy (Heroku)

```bash
# Build frontend first
cd AquaScan_prototype && npm install && npm run build && cd ..

# Deploy to Heroku
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

## Project Structure

```
.
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── runtime.txt           # Python version
├── Procfile              # Heroku process file
├── Dockerfile            # Docker configuration
├── AquaScan_prototype/   # Frontend React application
│   ├── src/
│   ├── dist/             # Built frontend (generated)
│   └── package.json
└── DEPLOYMENT.md         # Deployment guide
```

## API Endpoints

- `POST /upload` - Upload and process a dataset file
- `POST /process` - Process a file and return GeoJSON
- `GET /geojson/<file_id>` - Get GeoJSON data for a file
- `GET /download/<file_id>` - Download processed CSV
- `POST /register` - Register a new user
- `GET /user/<user_id>` - Get user information
- `GET /history/<user_id>` - Get user upload history

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (required)
- `PORT` - Server port (default: 5000)
- `FLASK_ENV` - Environment mode (development/production)

## License

[Add your license here]

## Support

For issues and questions, please open an issue on the repository.

