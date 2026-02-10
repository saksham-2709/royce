#!/bin/bash
# Build script for deployment

echo "Building React frontend..."
cd AquaScan_prototype
npm install
npm run build
cd ..

echo "Build complete! Frontend files are in AquaScan_prototype/dist"

