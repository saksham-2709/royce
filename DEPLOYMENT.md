# Deployment Guide

This guide covers deploying the AquaScan Heavy Metal Pollution Index (HMPI) application.

## Project Structure

- **Frontend**: React + TypeScript application in `AquaScan_prototype/`
- **Backend**: Flask Python API in `app.py`
- **Database**: MongoDB (requires MongoDB Atlas or local instance)

## Prerequisites

1. **Node.js** (v18 or higher) - for building the frontend
2. **Python** 3.11 - for running the backend
3. **MongoDB** - either MongoDB Atlas (cloud) or local MongoDB instance

## Pre-Deployment Steps

### 1. Build the Frontend

Before deploying, you need to build the React frontend:

```bash
cd AquaScan_prototype
npm install
npm run build
cd ..
```

This will create a `dist` folder in `AquaScan_prototype/` with the production build.

Alternatively, use the build script:
```bash
chmod +x build.sh
./build.sh
```

### 2. Set Environment Variables

Create a `.env` file (or set environment variables on your hosting platform):

```env
MONGODB_URI=mongodb://localhost:27017/
PORT=5000
FLASK_ENV=production
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/heavy_metal_db?retryWrites=true&w=majority
```

## Deployment Options

### Option 1: Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create a Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   ```

4. **Build the frontend** (do this before pushing):
   ```bash
   cd AquaScan_prototype
   npm install
   npm run build
   cd ..
   ```

5. **Add buildpacks** (Heroku will auto-detect Python, but you may need Node for build):
   ```bash
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add heroku/python
   ```

6. **Deploy**:
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

### Option 2: Railway

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Initialize project**:
   ```bash
   railway init
   ```

3. **Set environment variables** in Railway dashboard:
   - `MONGODB_URI`
   - `PORT` (Railway sets this automatically)

4. **Deploy**:
   ```bash
   railway up
   ```

### Option 3: Render

1. **Connect your repository** to Render
2. **Create a Web Service**
3. **Build command**: 
   ```bash
   cd AquaScan_prototype && npm install && npm run build && cd ..
   ```
4. **Start command**:
   ```bash
   gunicorn app:app
   ```
5. **Set environment variables**:
   - `MONGODB_URI`

### Option 4: AWS/GCP/Azure

For cloud platforms, you can use:
- **AWS**: Elastic Beanstalk or EC2 + Load Balancer
- **GCP**: App Engine or Cloud Run
- **Azure**: App Service

Follow platform-specific guides for Python Flask applications.

### Option 5: VPS/Docker

#### Using Docker (Recommended)

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install Node.js for building frontend
RUN apt-get update && apt-get install -y nodejs npm

# Copy and build frontend
COPY AquaScan_prototype/package*.json AquaScan_prototype/
WORKDIR /app/AquaScan_prototype
RUN npm install && npm run build
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app.py .
COPY AquaScan_prototype/dist ./AquaScan_prototype/dist

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

Build and run:
```bash
docker build -t aquascan-app .
docker run -p 5000:5000 -e MONGODB_URI=your_uri aquascan-app
```

## Post-Deployment

1. **Verify the application** is running
2. **Check MongoDB connection** - ensure your database is accessible
3. **Test API endpoints**:
   - `GET /` - Should serve the React app
   - `POST /upload` - Test file upload
   - `POST /process` - Test file processing

## Troubleshooting

### Frontend not loading
- Ensure `AquaScan_prototype/dist` exists and contains `index.html`
- Check that the static folder path in `app.py` is correct

### MongoDB connection errors
- Verify `MONGODB_URI` is set correctly
- For MongoDB Atlas, ensure your IP is whitelisted
- Check network connectivity to MongoDB

### Port binding errors
- Ensure `PORT` environment variable is set
- On Heroku, the port is automatically set - don't hardcode it

### Build failures
- Ensure Node.js is available during build (may need multi-buildpack setup)
- Check that all dependencies in `package.json` and `requirements.txt` are valid

## Notes

- The application uses React Router, so ensure your hosting platform supports client-side routing (or configure redirects)
- For production, consider:
  - Adding HTTPS/SSL certificates
  - Setting up proper error logging
  - Implementing rate limiting
  - Adding authentication if needed
  - Setting up database backups

