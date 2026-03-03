#!/bin/bash

echo "🚀 Setting up Crypto Portfolio Tracker..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if MongoDB is running (optional for local dev)
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB not found. You can use Docker or install MongoDB separately."
fi

# Install server dependencies
echo ""
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating server .env file..."
    cp .env.example .env
    echo "⚠️  Please update server/.env with your configuration"
fi

cd ..

# Install client dependencies
echo ""
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating client .env file..."
    cp .env.example .env
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update server/.env with your MongoDB URI and JWT secret"
echo "2. Start MongoDB (if not using Docker)"
echo "3. Run 'npm run seed' to create demo data"
echo "4. Run 'npm run dev:server' in one terminal"
echo "5. Run 'npm run dev:client' in another terminal"
echo ""
echo "Or use Docker:"
echo "  docker-compose up -d"
echo ""
echo "Access the app at http://localhost:3000"
