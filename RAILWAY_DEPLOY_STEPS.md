# 🚂 Railway Deployment - Step by Step

## Step 1: Login to Railway

Open PowerShell and run:
```powershell
railway login
```

This will open your browser. Sign in with GitHub (recommended) or email.

---

## Step 2: Initialize Railway Project

After login, run:
```powershell
railway init
```

Choose:
- **Create new project** (press Enter)
- Enter project name: `aquascan-hmpi` (or any name you prefer)

---

## Step 3: Set MongoDB Connection String

**Option A: If you have MongoDB Atlas URI:**
```powershell
railway variables set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/heavy_metal_db?retryWrites=true&w=majority"
```
*(Replace with your actual MongoDB Atlas connection string)*

**Option B: For local MongoDB (testing only):**
```powershell
railway variables set MONGODB_URI="mongodb://localhost:27017/"
```
*Note: This won't work in production - you need MongoDB Atlas*

**Option C: Don't have MongoDB yet?**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Run the command above with your connection string

---

## Step 4: Deploy!

```powershell
railway up
```

This will:
- Build the frontend (React app)
- Install Python dependencies
- Deploy your app
- Give you a live URL!

---

## Step 5: Get Your App URL

```powershell
railway domain
```

Or check the Railway dashboard: https://railway.app/dashboard

---

## ✅ Quick Copy-Paste (After Login)

```powershell
railway init
railway variables set MONGODB_URI="YOUR_MONGODB_URI_HERE"
railway up
railway domain
```

---

## 🆘 Troubleshooting

**Build fails?**
- Make sure `AquaScan_prototype/dist` exists (already built ✅)
- Check Railway logs: `railway logs`

**App won't start?**
- Verify MongoDB URI is set: `railway variables`
- Check logs for errors: `railway logs`

**Need to update?**
- Just run `railway up` again after making changes

---

## 📊 Useful Commands

```powershell
# View logs
railway logs

# View environment variables
railway variables

# Open dashboard
railway open

# Get app URL
railway domain
```

