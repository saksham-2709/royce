# PowerShell Script for Railway Deployment
# Run this script to deploy to Railway

Write-Host "🚀 Deploying AquaScan HMPI to Railway..." -ForegroundColor Green

# Check if Railway CLI is installed
$railwayInstalled = Get-Command railway -ErrorAction SilentlyContinue

if (-not $railwayInstalled) {
    Write-Host "Installing Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Railway CLI. Please install manually:" -ForegroundColor Red
        Write-Host "   npm install -g @railway/cli" -ForegroundColor Yellow
        exit 1
    }
}

# Login to Railway
Write-Host "`n🔐 Logging into Railway..." -ForegroundColor Cyan
railway login
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Login failed. Please try again." -ForegroundColor Red
    exit 1
}

# Initialize Railway project
Write-Host "`n📦 Initializing Railway project..." -ForegroundColor Cyan
railway init
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Project may already be initialized. Continuing..." -ForegroundColor Yellow
}

# Set MongoDB URI
Write-Host "`n🗄️  Setting MongoDB URI..." -ForegroundColor Cyan
$mongodbUri = Read-Host "Enter your MongoDB URI (or press Enter to use default: mongodb://localhost:27017/)"
if ([string]::IsNullOrWhiteSpace($mongodbUri)) {
    $mongodbUri = "mongodb://localhost:27017/"
}
railway variables set MONGODB_URI=$mongodbUri

# Deploy
Write-Host "`n🚀 Deploying application..." -ForegroundColor Cyan
railway up

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deployment successful!" -ForegroundColor Green
    Write-Host "`nGet your app URL with: railway domain" -ForegroundColor Cyan
    Write-Host "View logs with: railway logs" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Deployment failed. Check the logs above." -ForegroundColor Red
}

