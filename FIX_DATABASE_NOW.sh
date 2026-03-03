#!/bin/bash

echo "🔧 FIXING DATABASE CONNECTION..."
echo ""
echo "This will start MongoDB so registration works!"
echo ""

# Start Docker service
echo "1️⃣ Starting Docker service..."
sudo systemctl start docker
sleep 2

# Check if mongodb-crypto container exists
echo ""
echo "2️⃣ Checking for MongoDB container..."
if sudo docker ps -a | grep -q mongodb-crypto; then
    echo "   Found existing container, starting it..."
    sudo docker start mongodb-crypto
else
    echo "   Creating new MongoDB container..."
    sudo docker run -d -p 27017:27017 --name mongodb-crypto mongo:latest
fi

echo ""
echo "3️⃣ Waiting for MongoDB to be ready..."
sleep 5

# Check if MongoDB is running
if sudo docker ps | grep -q mongodb-crypto; then
    echo ""
    echo "✅ SUCCESS! MongoDB is now running!"
    echo ""
    echo "📝 Now try registering again:"
    echo "   1. Go to: http://localhost:5173/register"
    echo "   2. Fill in your details"
    echo "   3. Click Register"
    echo "   4. Your data will be saved! ✅"
    echo ""
else
    echo ""
    echo "⚠️  MongoDB might still be starting..."
    echo "   Wait 10 seconds and try registering"
fi

echo ""
echo "🎯 Backend will automatically connect to MongoDB now!"
echo ""
