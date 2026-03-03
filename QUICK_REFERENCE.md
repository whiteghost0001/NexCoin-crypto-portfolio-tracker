# ⚡ Quick Reference Card

## 🚀 Start the App (3 Commands)

```bash
# 1. Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# 2. Start Backend (Terminal 1)
cd server && npm run dev

# 3. Start Frontend (Terminal 2)
cd client && npm run dev
```

**Access**: http://localhost:5173

---

## 🎨 Key Design Classes

```jsx
// Glassmorphism Card
<div className="glass-card">

// Glowing Button
<button className="btn-glow">

// Gradient Text
<h1 className="gradient-text">

// Input Field
<input className="input-web3">

// Stat Card
<div className="stat-card">

// Price Up/Down
<span className="price-up">
<span className="price-down">

// Loading Skeleton
<div className="skeleton h-16 w-full">
```

---

## 🎬 Animation Patterns

```jsx
// Fade In Up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>

// Button Hover
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>

// Stagger List
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.05 }}
  >
))}

// Animated Counter
<CountUp end={125430.50} duration={2} decimals={2} />
```

---

## 🌐 API Endpoints

```javascript
// Get top 20 coins
GET /api/prices/top?limit=20

// Get specific prices
GET /api/prices?symbols=BTC,ETH

// Add wallet
POST /api/wallets
Body: { address, name, network }

// Get portfolio
GET /api/portfolio

// Login
POST /api/auth/login
Body: { email, password }
```

---

## 🦊 Wallet Connection

```javascript
// Connect MetaMask
const provider = new ethers.BrowserProvider(window.ethereum);
const accounts = await provider.send('eth_requestAccounts', []);
const balance = await provider.getBalance(accounts[0]);

// Get network
const network = await provider.getNetwork();
```

---

## 🎨 Color Palette

```css
Background:  #0D0D0D  (Black)
Primary:     #00FF9D  (Neon Green)
Purple:      #7F00FF  (Purple Start)
Pink:        #E100FF  (Purple End)
Card:        rgba(255, 255, 255, 0.05)
Border:      rgba(255, 255, 255, 0.1)
Text:        #FFFFFF  (White)
Gray:        #9CA3AF  (Secondary Text)
Success:     #00FF9D  (Green)
Error:       #EF4444  (Red)
```

---

## 📁 File Structure

```
client/src/
├── components/
│   ├── LiveCryptoTable.jsx    # Top coins table
│   ├── StatCard.jsx            # Animated stats
│   ├── WalletConnector.jsx     # MetaMask
│   └── Navbar.jsx              # Navigation
├── pages/
│   ├── Dashboard.jsx           # Main page
│   ├── Login.jsx               # Auth
│   └── Register.jsx            # Auth
└── index.css                   # Web3 styles

server/
├── services/
│   ├── coingecko.js           # Live prices
│   └── walletBalance.js       # Ethers.js
└── routes/
    └── prices.js              # API routes
```

---

## 🔧 Environment Variables

```env
# server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crypto-portfolio
JWT_SECRET=your-secret-key
ETHEREUM_RPC=https://eth.llamarpc.com

# client/.env
VITE_API_URL=http://localhost:5000
```

---

## 🐛 Troubleshooting

```bash
# Port in use
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Check MongoDB
docker ps | grep mongodb
docker start mongodb

# Test backend
curl http://localhost:5000/health
```

---

## 📦 Install Dependencies

```bash
# First time setup
cd server && npm install
cd ../client && npm install

# New packages (already in package.json)
cd client
npm install framer-motion react-countup
```

---

## 🎯 Key Features

✅ Live crypto prices (30s refresh)
✅ MetaMask wallet connection
✅ Glassmorphism UI
✅ Smooth animations
✅ Responsive design
✅ Real-time balance sync
✅ Top 20 coins table
✅ Sparkline charts
✅ Animated counters
✅ Loading states

---

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

---

## 🎨 Component Props

```jsx
// StatCard
<StatCard
  title="Total Value"
  value={125430.50}
  change={3.45}
  icon="💰"
  delay={0.1}
  prefix="$"
  decimals={2}
/>

// LiveCryptoTable
<LiveCryptoTable
  coins={topCoins}
  loading={false}
/>

// WalletConnector
<WalletConnector
  onConnect={(walletInfo) => {}}
/>
```

---

## 🚀 Production Build

```bash
# Build frontend
cd client
npm run build

# Output: client/dist/

# Deploy with Docker
docker-compose up -d --build
```

---

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP_GUIDE.md` - Step-by-step setup
- `WEB3_FEATURES.md` - Design system
- `VISUAL_PREVIEW.md` - UI preview
- `INSTALL_COMMANDS.md` - Commands
- `UPGRADE_SUMMARY.md` - What changed
- `QUICK_REFERENCE.md` - This file

---

**Keep this handy for quick lookups!** 📌
