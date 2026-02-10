# 🚀 DEPLOY NOW - Direct Commands

## ⚡ Fastest Way: Railway (2 minutes)

### Method 1: Automated Script (Windows PowerShell)

```powershell
.\deploy-railway.ps1
```

### Method 2: Manual Commands

```powershell
# Step 1: Install Railway CLI (if not installed)
npm install -g @railway/cli

# Step 2: Login
railway login

# Step 3: Initialize project
railway init

# Step 4: Set MongoDB URI (use your MongoDB Atlas connection string)
railway variables set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/heavy_metal_db"

# Step 5: Deploy!
railway up
```

**Your app will be live at:** `https://your-project.up.railway.app`

---

## 🌐 Direct Deployment Links

### Railway
👉 **https://railway.app/new** - Click "Deploy from GitHub repo"

### Render
👉 **https://render.com** - Click "New +" → "Web Service"

### Heroku
👉 **https://dashboard.heroku.com/new-app** - Create new app

---

## 📋 Quick Checklist

Before deploying, make sure:
- ✅ Frontend is built (`AquaScan_prototype/dist` exists) - **Already done!**
- ✅ MongoDB connection string ready
- ✅ Git repository initialized (optional, but recommended)

---

## 🎯 Ready to Deploy? Run This:

```powershell
# Copy and paste this entire block:

npm install -g @railway/cli
railway login
railway init
railway variables set MONGODB_URI="YOUR_MONGODB_URI_HERE"
railway up
```

**Replace `YOUR_MONGODB_URI_HERE` with your actual MongoDB connection string.**

---

## 💡 Need MongoDB?

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Sign up (free tier available)
3. Create cluster → Connect → Get connection string
4. Use that string in the command above

---

## ✅ After Deployment

Your app will be live! Get the URL with:
```powershell
railway domain
```

Or check the Railway dashboard for your app URL.

