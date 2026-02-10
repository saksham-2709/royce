#!/bin/bash
# Bash Script for Railway Deployment
# Run this script to deploy to Railway

echo "🚀 Deploying AquaScan HMPI to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Railway CLI. Please install manually:"
        echo "   npm install -g @railway/cli"
        exit 1
    fi
fi

# Login to Railway
echo ""
echo "🔐 Logging into Railway..."
railway login
if [ $? -ne 0 ]; then
    echo "❌ Login failed. Please try again."
    exit 1
fi

# Initialize Railway project
echo ""
echo "📦 Initializing Railway project..."
railway init
if [ $? -ne 0 ]; then
    echo "⚠️  Project may already be initialized. Continuing..."
fi

# Set MongoDB URI
echo ""
echo "🗄️  Setting MongoDB URI..."
read -p "Enter your MongoDB URI (or press Enter to use default: mongodb://localhost:27017/): " mongodb_uri
if [ -z "$mongodb_uri" ]; then
    mongodb_uri="mongodb://localhost:27017/"
fi
railway variables set MONGODB_URI="$mongodb_uri"

# Deploy
echo ""
echo "🚀 Deploying application..."
railway up

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "Get your app URL with: railway domain"
    echo "View logs with: railway logs"
else
    echo ""
    echo "❌ Deployment failed. Check the logs above."
fi

