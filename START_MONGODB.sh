#!/bin/bash

echo "🔧 Starting MongoDB for NexCoin..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running or requires sudo"
    echo ""
    echo "Please run:"
    echo "  sudo systemctl start docker"
    echo "  sudo usermod -aG docker $USER"
    echo "  newgrp docker"
    echo ""
    exit 1
fi

# Check if mongodb-crypto container exists
if docker ps -a | grep -q mongodb-crypto; then
    echo "📦 MongoDB container exists, starting it..."
    docker start mongodb-crypto
else
    echo "📦 Creating new MongoDB container..."
    docker run -d -p 27017:27017 --name mongodb-crypto mongo:latest
fi

echo ""
echo "✅ MongoDB is starting..."
echo ""
echo "Waiting for MongoDB to be ready..."
sleep 5

# Check if MongoDB is accessible
if nc -z localhost 27017 2>/dev/null; then
    echo "✅ MongoDB is running on port 27017"
    echo ""
    echo "Now start the backend server:"
    echo "  cd server"
    echo "  npm run dev"
else
    echo "⚠️  MongoDB might still be starting..."
    echo "Wait a few seconds and check with:"
    echo "  docker ps | grep mongodb-crypto"
fi

echo ""
echo "🚀 Ready to use NexCoin!"
