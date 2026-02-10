# 🔗 How to Get Your App URL After Deployment

## After Running `railway up`:

### Method 1: Get Domain (Recommended)
```powershell
railway domain
```
This will show your app's public URL like: `https://aquascan-deploy-production.up.railway.app`

### Method 2: Open Dashboard
```powershell
railway open
```
This opens your Railway project dashboard where you can see the URL.

### Method 3: Manual Check
1. Go to: https://railway.app/dashboard
2. Click on "Aquascan deploy" project
3. Click on your service
4. Go to the "Settings" tab
5. Look for "Domains" section - your URL will be there

### Method 4: Generate Custom Domain (Optional)
```powershell
railway domain generate
```

---

## Complete Deployment Flow:

```powershell
# 1. Deploy your app
railway up

# 2. Get your app URL
railway domain

# 3. (Optional) View logs
railway logs
```

---

## What the URL Looks Like:
- Format: `https://[service-name]-[environment].up.railway.app`
- Example: `https://aquascan-deploy-production.up.railway.app`

