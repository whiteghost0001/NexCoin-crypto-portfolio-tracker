# 🪙 CryptoTracker - Modern Web3 Portfolio Dashboard

A cutting-edge Web3 portfolio tracker with live crypto prices, MetaMask wallet integration, and a stunning glassmorphism UI. Track the top 20 cryptocurrencies in real-time with auto-syncing wallet balances.

## ✨ Features

### 🎨 Modern Web3 Design
- **Glassmorphism UI** with backdrop blur effects
- **Neon Green (#00FF9D)** primary theme with purple gradients
- **Smooth animations** powered by Framer Motion
- **Gradient text headers** and glowing buttons
- **Fully responsive** mobile-first design
- **Dark theme** optimized for crypto trading

### 💹 Live Crypto Data
- **Real-time prices** from CoinGecko API
- **Top 20 coins** by market cap
- **Auto-refresh** every 30 seconds
- **Mini sparkline charts** for price trends
- **24h price changes** with color indicators
- **Market cap** and volume data

### 👛 Wallet Integration
- **MetaMask connection** with one click
- **Auto-sync balances** for ETH and ERC20 tokens
- **Multi-network support** (Ethereum, Polygon, BSC)
- **Real-time balance updates** using Ethers.js
- **Wallet address display** with copy functionality

### 📊 Portfolio Analytics
- **Total portfolio value** with animated counters
- **24h profit/loss** tracking
- **Connected wallet count**
- **Token balance breakdown**

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Web3**: Ethers.js v6
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API**: CoinGecko (live crypto prices)
- **Deployment**: Docker

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 6+
- MetaMask browser extension
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd crypto-portfolio-tracker
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Configure environment variables**

**Server (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crypto-portfolio
JWT_SECRET=your-secret-key-here
NODE_ENV=development

# Optional: Use custom RPC endpoints for better performance
ETHEREUM_RPC=https://eth.llamarpc.com
POLYGON_RPC=https://polygon-rpc.com
BSC_RPC=https://bsc-dataseed.binance.org
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000
```

4. **Start the application**

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

5. **Access the app**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📡 Live Price Data Integration

### CoinGecko API

The app fetches live crypto prices from CoinGecko's public API:

**Endpoint**: `https://api.coingecko.com/api/v3/coins/markets`

**Parameters**:
- `vs_currency=usd` - Prices in USD
- `order=market_cap_desc` - Sort by market cap
- `per_page=20` - Top 20 coins
- `sparkline=true` - Include 7-day price history

**Auto-refresh**: Data updates every 30 seconds on the dashboard

**Fallback**: Demo data is provided if the API is unavailable

### Code Example

```javascript
// server/services/coingecko.js
async function getTopCoins(limit = 20) {
  const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: limit,
      page: 1,
      sparkline: true
    }
  });
  return response.data;
}
```

## 🦊 Wallet Connection Flow

### MetaMask Integration

1. **User clicks "Connect Wallet"**
2. **MetaMask popup appears** requesting permission
3. **App fetches wallet address** and ETH balance
4. **Auto-sync ERC20 tokens** (USDT, USDC, DAI, etc.)
5. **Balances saved** to user's portfolio
6. **Real-time updates** on every page load

### Code Example

```javascript
// client/src/components/WalletConnector.jsx
const provider = new ethers.BrowserProvider(window.ethereum);
const accounts = await provider.send('eth_requestAccounts', []);
const balance = await provider.getBalance(accounts[0]);
```

## 🎨 Design System

### Colors
```css
Background: #0D0D0D (Black)
Primary: #00FF9D (Neon Green)
Purple: #7F00FF → #E100FF (Gradient)
Card: rgba(255, 255, 255, 0.05) (Glassmorphism)
Border: rgba(255, 255, 255, 0.1)
```

### Typography
- **Display Font**: Space Grotesk
- **Body Font**: Inter

### Components
- **Glass Cards**: Backdrop blur with subtle borders
- **Glow Buttons**: Neon green with shadow effects
- **Gradient Text**: Primary and purple gradients
- **Animated Counters**: CountUp.js for numbers
- **Loading Skeletons**: Pulse animations

## 📁 Project Structure

```
crypto-portfolio-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LiveCryptoTable.jsx    # Top 20 coins table
│   │   │   ├── StatCard.jsx           # Animated stat cards
│   │   │   ├── WalletConnector.jsx    # MetaMask integration
│   │   │   └── Navbar.jsx             # Navigation bar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── Login.jsx              # Login page
│   │   │   └── Register.jsx           # Register page
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Auth state
│   │   │   └── ThemeContext.jsx       # Theme state
│   │   └── index.css                  # Web3 styles
│   └── tailwind.config.js             # Theme config
├── server/
│   ├── services/
│   │   ├── coingecko.js              # Live price fetching
│   │   ├── walletBalance.js          # Ethers.js integration
│   │   └── blockchain.js             # Blockchain utilities
│   ├── routes/
│   │   ├── prices.js                 # Price endpoints
│   │   └── wallets.js                # Wallet endpoints
│   └── server.js                     # Express app
└── docker-compose.yml                # Docker config
```

## 🔌 API Endpoints

### Prices
- `GET /api/prices/top?limit=20` - Get top coins with live prices
- `GET /api/prices?symbols=BTC,ETH` - Get specific token prices

### Wallets
- `GET /api/wallets` - Get user wallets
- `POST /api/wallets` - Add wallet (auto-syncs balance)
- `DELETE /api/wallets/:id` - Remove wallet

### Portfolio
- `GET /api/portfolio` - Get portfolio summary

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## 🎯 Key Features Explained

### 1. Live Price Updates
Prices are fetched from CoinGecko every 30 seconds using `setInterval`:

```javascript
useEffect(() => {
  fetchTopCoins();
  const interval = setInterval(fetchTopCoins, 30000);
  return () => clearInterval(interval);
}, []);
```

### 2. Wallet Auto-Sync
When a wallet is connected, the app automatically:
- Fetches native token balance (ETH/MATIC/BNB)
- Scans for common ERC20 tokens
- Updates portfolio value in real-time

### 3. Glassmorphism Cards
CSS backdrop-filter creates the glass effect:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 4. Animated Counters
Numbers animate on load using react-countup:

```jsx
<CountUp end={125430.50} duration={2} decimals={2} separator="," />
```

## 🔧 Configuration

### RPC Endpoints
For better performance, configure custom RPC endpoints in `server/.env`:

```env
ETHEREUM_RPC=https://eth.llamarpc.com
POLYGON_RPC=https://polygon-rpc.com
```

### Supported Networks
- Ethereum Mainnet
- Polygon
- Binance Smart Chain

### Supported Tokens
ETH, BTC, USDT, USDC, DAI, WBTC, MATIC, UNI, LINK, AAVE, BNB, SOL, ADA, DOT, AVAX

## 📱 Mobile Responsive

The app is fully responsive with:
- Mobile-first design approach
- Touch-optimized buttons
- Responsive tables with horizontal scroll
- Adaptive grid layouts

## 🚨 Error Handling

- **API failures**: Fallback to demo data
- **Wallet errors**: User-friendly toast notifications
- **Network issues**: Retry logic with exponential backoff
- **Loading states**: Skeleton screens and spinners

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, Ethers.js, and CoinGecko API
