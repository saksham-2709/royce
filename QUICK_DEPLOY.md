# Quick Deployment Guide - Direct Links & Commands

## 🚀 Fastest Deployment Options

### Option 1: Railway (Easiest - Recommended) ⭐

**Direct Deploy Link:** [Deploy on Railway](https://railway.app/new)

**Steps:**
1. Click the link above or go to https://railway.app/new
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Connect your repository
5. Railway will auto-detect the setup
6. Add environment variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/heavy_metal_db`)
7. Click "Deploy"

**Or use Railway CLI:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
railway variables set MONGODB_URI="your_mongodb_connection_string"
```

Your app will be live at: `https://your-app-name.up.railway.app`

---

### Option 2: Render (Free Tier Available)

**Direct Link:** [Deploy on Render](https://render.com)

**Steps:**
1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** aquascan-hmpi
   - **Environment:** Python 3
   - **Build Command:** `cd AquaScan_prototype && npm install && npm run build && cd ..`
   - **Start Command:** `gunicorn app:app`
5. Add Environment Variable:
   - `MONGODB_URI` = your MongoDB connection string
6. Click "Create Web Service"

Your app will be live at: `https://aquascan-hmpi.onrender.com`

---

### Option 3: Heroku (Traditional, Reliable)

**Steps:**
```bash
# 1. Install Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli

# 2. Login to Heroku
heroku login

# 3. Create app
heroku create your-app-name

# 4. Set MongoDB URI
heroku config:set MONGODB_URI="your_mongodb_connection_string"

# 5. Deploy
git init
git add .
git commit -m "Initial deploy"
git push heroku main

# 6. Open app
heroku open
```

Your app will be live at: `https://your-app-name.herokuapp.com`

---

### Option 4: Fly.io (Fast & Global)

**Steps:**
```bash
# 1. Install flyctl
# Windows: powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# 2. Login
fly auth login

# 3. Launch app
fly launch

# 4. Set secrets
fly secrets set MONGODB_URI="your_mongodb_connection_string"

# 5. Deploy
fly deploy
```

---

## 📦 One-Command Deploy Script

Create and run this script for Railway:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway login && railway init && railway up && railway variables set MONGODB_URI="your_mongodb_uri"
```

---

## 🔗 Direct Deployment Links by Platform

| Platform | Direct Link | Free Tier |
|----------|------------|-----------|
| **Railway** | https://railway.app/new | ✅ Yes |
| **Render** | https://render.com | ✅ Yes |
| **Fly.io** | https://fly.io/apps | ✅ Yes |
| **Heroku** | https://dashboard.heroku.com/new | ⚠️ Paid only |
| **Vercel** | https://vercel.com/new | ✅ Yes (Frontend only) |
| **Netlify** | https://app.netlify.com/start | ✅ Yes (Frontend only) |

---

## 🎯 Recommended Setup

**For Backend + Frontend together:**
- ✅ **Railway** (easiest, best free tier)
- ✅ **Render** (good free tier, simple setup)

**For Docker deployment:**
- ✅ Use the provided `Dockerfile`
- Deploy to Railway, Render, Fly.io, or any Docker host

---

## ⚡ Quick Start (Railway - Fastest)

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Navigate to project
cd "C:\Users\saksh\OneDrive\Desktop\hmpi deploy"

# 3. Deploy
railway login
railway init
railway variables set MONGODB_URI="mongodb://localhost:27017/"
railway up
```

**Done!** Your app will be live in ~2-3 minutes.

---

## 📝 Get MongoDB URI

### Option A: MongoDB Atlas (Free Cloud Database)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

**Example:** `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/heavy_metal_db?retryWrites=true&w=majority`

### Option B: Local MongoDB
- Use: `mongodb://localhost:27017/`
- Note: Only works locally, not for cloud deployment

---

## ✅ Post-Deployment Checklist

- [ ] App is accessible via provided URL
- [ ] MongoDB connection is working
- [ ] File upload endpoint works
- [ ] Frontend loads correctly
- [ ] All routes work (React Router)

---

## 🆘 Troubleshooting

**Build fails:**
- Ensure Node.js is available (Railway/Render auto-detect)
- Check that `AquaScan_prototype/dist` exists after build

**App won't start:**
- Verify `MONGODB_URI` is set correctly
- Check logs: `railway logs` or Render dashboard logs

**Frontend not loading:**
- Ensure build completed successfully
- Check static folder path in `app.py`

---

## 🎉 Success!

Once deployed, share your app URL:
- Railway: `https://your-app.up.railway.app`
- Render: `https://aquascan-hmpi.onrender.com`
- Heroku: `https://your-app.herokuapp.com`

