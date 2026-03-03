#!/bin/bash

# Verification script for CryptoTracker Web3 Dashboard
# Run this after installation to verify everything is set up correctly

echo "🔍 Verifying CryptoTracker Setup..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Found $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} Found v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check MongoDB
echo -n "Checking MongoDB... "
if docker ps | grep -q mongodb; then
    echo -e "${GREEN}✓${NC} MongoDB container running"
elif command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓${NC} MongoDB installed"
else
    echo -e "${YELLOW}⚠${NC} MongoDB not found (will need to start)"
fi

# Check server dependencies
echo -n "Checking server dependencies... "
if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${RED}✗${NC} Not installed (run: cd server && npm install)"
fi

# Check client dependencies
echo -n "Checking client dependencies... "
if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${RED}✗${NC} Not installed (run: cd client && npm install)"
fi

# Check for framer-motion
echo -n "Checking framer-motion... "
if grep -q "framer-motion" client/package.json; then
    echo -e "${GREEN}✓${NC} Found in package.json"
else
    echo -e "${RED}✗${NC} Not found"
fi

# Check for react-countup
echo -n "Checking react-countup... "
if grep -q "react-countup" client/package.json; then
    echo -e "${GREEN}✓${NC} Found in package.json"
else
    echo -e "${RED}✗${NC} Not found"
fi

# Check server .env
echo -n "Checking server/.env... "
if [ -f "server/.env" ]; then
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${YELLOW}⚠${NC} Not found (copy from .env.example)"
fi

# Check client .env
echo -n "Checking client/.env... "
if [ -f "client/.env" ]; then
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${YELLOW}⚠${NC} Not found (copy from .env.example)"
fi

# Check new components
echo ""
echo "Checking new Web3 components..."

echo -n "  LiveCryptoTable.jsx... "
if [ -f "client/src/components/LiveCryptoTable.jsx" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "  StatCard.jsx... "
if [ -f "client/src/components/StatCard.jsx" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "  WalletConnector.jsx... "
if [ -f "client/src/components/WalletConnector.jsx" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check backend services
echo ""
echo "Checking backend services..."

echo -n "  walletBalance.js... "
if [ -f "server/services/walletBalance.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "  coingecko.js (updated)... "
if grep -q "getTopCoins" server/services/coingecko.js; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check Tailwind config
echo ""
echo -n "Checking Tailwind Web3 theme... "
if grep -q "web3-primary" client/tailwind.config.js; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check CSS
echo -n "Checking Web3 styles... "
if grep -q "glass-card" client/src/index.css; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check ports
echo ""
echo "Checking ports..."

echo -n "  Port 5000 (backend)... "
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠${NC} In use"
else
    echo -e "${GREEN}✓${NC} Available"
fi

echo -n "  Port 5173 (frontend)... "
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠${NC} In use"
else
    echo -e "${GREEN}✓${NC} Available"
fi

echo -n "  Port 27017 (MongoDB)... "
if lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} MongoDB running"
else
    echo -e "${YELLOW}⚠${NC} MongoDB not running"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Setup Summary"
echo ""

if [ -d "server/node_modules" ] && [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${RED}✗${NC} Dependencies missing"
    echo ""
    echo "Run these commands:"
    echo "  cd server && npm install"
    echo "  cd client && npm install"
fi

if [ -f "server/.env" ] && [ -f "client/.env" ]; then
    echo -e "${GREEN}✓${NC} Environment files configured"
else
    echo -e "${YELLOW}⚠${NC} Environment files need setup"
    echo ""
    echo "Run these commands:"
    echo "  cp server/.env.example server/.env"
    echo "  cp client/.env.example client/.env"
fi

if docker ps | grep -q mongodb || lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} MongoDB is running"
else
    echo -e "${YELLOW}⚠${NC} MongoDB needs to be started"
    echo ""
    echo "Run this command:"
    echo "  docker run -d -p 27017:27017 --name mongodb mongo:latest"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Start backend:  cd server && npm run dev"
echo "2. Start frontend: cd client && npm run dev"
echo "3. Open browser:   http://localhost:5173"
echo ""
echo "📚 Documentation:"
echo "  - SETUP_GUIDE.md      - Detailed setup"
echo "  - QUICK_REFERENCE.md  - Quick commands"
echo "  - README.md           - Full documentation"
echo ""
echo "✨ Enjoy your Web3 dashboard!"
echo ""
