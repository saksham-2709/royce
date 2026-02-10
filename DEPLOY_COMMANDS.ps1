# Railway Deployment Commands
# Run these commands one by one in PowerShell

Write-Host "🚂 Railway Deployment Script" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Login
Write-Host "Step 1: Login to Railway" -ForegroundColor Yellow
Write-Host "This will open your browser for authentication" -ForegroundColor Gray
Write-Host ""
$login = Read-Host "Ready to login? (y/n)"
if ($login -eq "y" -or $login -eq "Y") {
    railway login
}

Write-Host ""
Write-Host "Step 2: Initialize Railway Project" -ForegroundColor Yellow
$init = Read-Host "Ready to initialize? (y/n)"
if ($init -eq "y" -or $init -eq "Y") {
    railway init
}

Write-Host ""
Write-Host "Step 3: Set MongoDB URI" -ForegroundColor Yellow
Write-Host "Enter your MongoDB connection string" -ForegroundColor Gray
Write-Host "Example: mongodb+srv://user:pass@cluster.mongodb.net/heavy_metal_db" -ForegroundColor Gray
$mongoUri = Read-Host "MongoDB URI"
if ($mongoUri) {
    railway variables set MONGODB_URI=$mongoUri
    Write-Host "✅ MongoDB URI set!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 4: Deploy!" -ForegroundColor Yellow
$deploy = Read-Host "Ready to deploy? (y/n)"
if ($deploy -eq "y" -or $deploy -eq "Y") {
    railway up
    Write-Host ""
    Write-Host "✅ Deployment complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Get your app URL:" -ForegroundColor Cyan
    railway domain
}

