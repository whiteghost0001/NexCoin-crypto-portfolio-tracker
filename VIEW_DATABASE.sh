#!/bin/bash

# NexCoin Database Viewer
# This script helps you view registered users and database data

echo "═══════════════════════════════════════════════════════════"
echo "           💎 NexCoin Database Viewer 💎"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if MongoDB is running
if ! sudo docker ps | grep -q mongodb-crypto; then
    echo "❌ MongoDB is not running!"
    echo "Start it with: sudo docker start mongodb-crypto"
    exit 1
fi

echo "✅ MongoDB is running"
echo ""

# Menu
echo "What would you like to view?"
echo ""
echo "1. All registered users"
echo "2. Count of registered users"
echo "3. All wallets"
echo "4. All price alerts"
echo "5. Search user by email"
echo "6. Open MongoDB shell"
echo ""
read -p "Enter your choice (1-6): " choice

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

case $choice in
    1)
        echo "📋 All Registered Users:"
        echo ""
        sudo docker exec mongodb-crypto mongosh crypto-portfolio --quiet --eval "db.users.find({}, {password: 0}).pretty()"
        ;;
    2)
        echo "📊 Total Registered Users:"
        echo ""
        sudo docker exec mongodb-crypto mongosh crypto-portfolio --quiet --eval "print('Total users: ' + db.users.countDocuments())"
        ;;
    3)
        echo "💼 All Wallets:"
        echo ""
        sudo docker exec mongodb-crypto mongosh crypto-portfolio --quiet --eval "db.wallets.find().pretty()"
        ;;
    4)
        echo "🔔 All Price Alerts:"
        echo ""
        sudo docker exec mongodb-crypto mongosh crypto-portfolio --quiet --eval "db.pricealerts.find().pretty()"
        ;;
    5)
        read -p "Enter email to search: " email
        echo ""
        echo "🔍 Searching for: $email"
        echo ""
        sudo docker exec mongodb-crypto mongosh crypto-portfolio --quiet --eval "db.users.find({email: '$email'}, {password: 0}).pretty()"
        ;;
    6)
        echo "🐚 Opening MongoDB shell..."
        echo "Type 'exit' to quit the shell"
        echo ""
        sudo docker exec -it mongodb-crypto mongosh crypto-portfolio
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Done! 💎"
echo "═══════════════════════════════════════════════════════════"
