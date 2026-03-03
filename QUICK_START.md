# Quick Start Guide

Get your Crypto Portfolio Tracker up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB 6+ installed (or use Docker)
- MetaMask browser extension (for wallet connection)

## Option 1: Local Development (Recommended for Development)

### Step 1: Install Dependencies

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh
```

Or manually:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Configure Environment

**Server** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crypto-portfolio
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

**Client** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_BASE_CHAIN_ID=8453
```

### Step 3: Start MongoDB

```bash
# If MongoDB is installed locally
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:6
```

### Step 4: Seed Demo Data (Optional)

```bash
cd server
npm run seed
```

This creates a demo account:
- Email: `demo@example.com`
- Password: `Demo123!`

### Step 5: Start Development Servers

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

### Step 6: Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Option 2: Docker (Recommended for Production)

### Step 1: Start All Services

```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- Backend server on port 5000
- Frontend on port 3000

### Step 2: Seed Demo Data

```bash
docker-compose exec server npm run seed
```

### Step 3: Access the Application

Open http://localhost:3000 in your browser.

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f client
```

### Stop Services

```bash
docker-compose down
```

## Using the Application

### 1. Register/Login

- Navigate to http://localhost:3000
- Register a new account or use demo credentials
- You'll be redirected to the dashboard

### 2. Connect a Wallet

**Option A: MetaMask**
1. Click "Connect MetaMask" button
2. Approve the connection in MetaMask
3. Your wallet will be added automatically

**Option B: Manual Entry**
1. Click "+ Add Wallet" button
2. Enter wallet address (e.g., `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`)
3. Choose network (Ethereum, Base, or Polygon)
4. Click "Add Wallet"

### 3. View Portfolio

- Dashboard shows total portfolio value
- Token list displays all holdings with current prices
- Chart shows portfolio value over time
- Profit/Loss calculation displayed

### 4. Export to PDF

Click the "Export to PDF" button to download a portfolio report.

### 5. Toggle Theme

Click the sun/moon icon in the navbar to switch between light and dark mode.

## Supported Networks

- **Ethereum Mainnet** (Chain ID: 1)
- **Base** (Chain ID: 8453)
- **Polygon** (Chain ID: 137)

## Supported Tokens

The app automatically detects balances for popular tokens:

**Ethereum:**
- ETH (native)
- USDT, USDC, DAI
- WBTC, UNI, LINK, AAVE

**Base:**
- ETH (native)
- USDC, DAI

**Polygon:**
- MATIC (native)
- USDT, USDC, DAI, WBTC

## Troubleshooting

### MongoDB Connection Error

**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running: `mongod` or `docker ps`
- Check connection string in `server/.env`
- Try: `mongodb://127.0.0.1:27017/crypto-portfolio`

### MetaMask Not Connecting

**Problem:** "MetaMask not installed" error

**Solution:**
- Install MetaMask browser extension
- Refresh the page
- Ensure you're on a supported browser (Chrome, Firefox, Brave)

### Wallet Balance Not Showing

**Problem:** Wallet added but no tokens displayed

**Solution:**
- Verify the wallet address is correct
- Check if wallet has any token balances
- Try a different RPC endpoint (edit `server/services/blockchain.js`)
- Check browser console for errors

### CORS Errors

**Problem:** API requests blocked by CORS

**Solution:**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `client/.env`
- Verify CORS is enabled in `server/server.js`

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Nodemon restarts server on file changes

### API Testing

Use tools like:
- Postman
- Insomnia
- cURL
- Thunder Client (VS Code extension)

Example cURL request:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"Demo123!"}'

# Get portfolio (replace TOKEN)
curl http://localhost:5000/api/portfolio \
  -H "Authorization: Bearer TOKEN"
```

### Database Management

View MongoDB data:
```bash
# Connect to MongoDB
mongosh

# Switch to database
use crypto-portfolio

# View collections
show collections

# Query users
db.users.find().pretty()

# Query wallets
db.wallets.find().pretty()
```

## Next Steps

- Read [API.md](./API.md) for complete API documentation
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Customize token list in `server/services/blockchain.js`
- Add more networks in `smart-contracts/networks.js`
- Implement additional features from the roadmap

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the documentation files
3. Check browser console and server logs
4. Verify environment variables are set correctly

Happy tracking! 🚀
