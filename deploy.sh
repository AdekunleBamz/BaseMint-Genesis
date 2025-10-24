#!/bin/bash

echo "🚀 BaseMint Genesis Deployment Script"
echo "======================================"

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file with your private key:"
    echo "PRIVATE_KEY=your_private_key_here"
    exit 1
fi

# Check if private key is set
if ! grep -q "PRIVATE_KEY=" .env || grep -q "PRIVATE_KEY=$" .env; then
    echo "❌ PRIVATE_KEY not set in .env file!"
    echo "Please add your private key to .env file:"
    echo "PRIVATE_KEY=your_private_key_here"
    exit 1
fi

echo "✅ Environment variables configured"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Deploy contract
echo "🚀 Deploying to Base Mainnet..."
npm run deploy

echo ""
echo "🎉 Deployment completed!"
echo "📋 Next steps:"
echo "1. Run: npm run dev"
echo "2. Visit: http://localhost:3000"
echo "3. Connect your wallet and start minting!"
