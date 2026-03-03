# 🚀 Quick Setup Guide - CryptoTracker Web3 Dashboard

## Step-by-Step Installation

### 1️⃣ Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies (includes framer-motion and react-countup)
cd ../client
npm install
```

### 2️⃣ Configure Environment

**Create `server/.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crypto-portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development

# Optional: Custom RPC endpoints for better performance
ETHEREUM_RPC=https://eth.llamarpc.com
POLYGON_RPC=https://polygon-rpc.com
BSC_RPC=https://bsc-dataseed.binance.org
```

**Create `client/.env`:**
```env
VITE_API_URL=http://localhost:5000
```

### 3️⃣ Start MongoDB

```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or start your local MongoDB service
mongod
```

### 4️⃣ Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 5️⃣ Access the App

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🎨 What You'll See

### Login/Register Pages
- Modern glassmorphism design
- Animated background with glowing orbs
- Neon green buttons with hover effects
- Gradient text headers

### Dashboard
- **Top Summary Cards**: Portfolio value, 24h P/L, connected wallets
- **Wallet Connector**: One-click MetaMask integration
- **Live Crypto Table**: Top 20 coins with real-time prices
- **Mini Sparklines**: 7-day price trends
- **Auto-refresh**: Prices update every 30 seconds

## 🦊 Connect Your Wallet

1. Click the **"Connect Wallet"** button
2. MetaMask popup will appear
3. Approve the connection
4. Your wallet address and balance will be displayed
5. Balances auto-sync to your portfolio

## 🔧 Troubleshooting

### MetaMask Not Detected
- Install MetaMask browser extension
- Refresh the page after installation

### API Errors
- Check if backend is running on port 5000
- Verify MongoDB is running
- Check browser console for errors

### Live Prices Not Loading
- CoinGecko API has rate limits (50 calls/minute)
- Demo data will be shown if API fails
- Wait a few seconds and refresh

### Wallet Connection Fails
- Make sure MetaMask is unlocked
- Check that you're on a supported network
- Try disconnecting and reconnecting

## 📦 Production Build

```bash
# Build frontend
cd client
npm run build

# Build output will be in client/dist/
# Serve with nginx or any static file server
```

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🎯 Key Features to Test

1. **Register/Login** - Create an account
2. **Connect MetaMask** - Link your wallet
3. **View Live Prices** - Watch the top 20 coins update
4. **Check Animations** - Smooth transitions and counters
5. **Mobile View** - Test responsive design
6. **Dark Theme** - Enjoy the Web3 aesthetic

## 🌐 Supported Networks

- Ethereum Mainnet
- Polygon
- Binance Smart Chain

## 💡 Tips

- Use a test wallet for development
- Keep MetaMask unlocked while using the app
- Prices update automatically every 30 seconds
- All animations are GPU-accelerated for smooth performance

## 📚 Next Steps

- Add more wallets to track multiple addresses
- Explore the live crypto price table
- Watch your portfolio value update in real-time
- Export your portfolio data (coming soon)

---

Enjoy your modern Web3 portfolio tracker! 🚀
