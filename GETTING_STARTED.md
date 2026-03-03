# Getting Started Checklist

Complete this checklist to get your Crypto Portfolio Tracker up and running!

## ✅ Prerequisites Check

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB 6+ installed OR Docker installed
- [ ] Git installed (for cloning)
- [ ] MetaMask browser extension (for wallet connection)
- [ ] Code editor (VS Code recommended)

## 📥 Installation Steps

### Step 1: Get the Code
- [ ] Clone or download the repository
- [ ] Navigate to project directory: `cd crypto-portfolio-tracker`

### Step 2: Install Dependencies

**Option A: Automated (Recommended)**
```bash
chmod +x setup.sh
./setup.sh
```
- [ ] Run setup script
- [ ] Verify no errors in output

**Option B: Manual**
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```
- [ ] Install server dependencies
- [ ] Install client dependencies

### Step 3: Configure Environment

**Server Configuration**
- [ ] Copy `server/.env.example` to `server/.env`
- [ ] Update `MONGODB_URI` (default: `mongodb://localhost:27017/crypto-portfolio`)
- [ ] Update `JWT_SECRET` (generate with: `openssl rand -base64 32`)
- [ ] Set `PORT` (default: 5000)
- [ ] Add `COINGECKO_API_KEY` (optional)

**Client Configuration**
- [ ] Copy `client/.env.example` to `client/.env`
- [ ] Update `VITE_API_URL` (default: `http://localhost:5000`)
- [ ] Set `VITE_BASE_CHAIN_ID` (default: 8453)

### Step 4: Start Database

**Option A: Local MongoDB**
```bash
mongod
```
- [ ] Start MongoDB service
- [ ] Verify it's running on port 27017

**Option B: Docker MongoDB**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:6
```
- [ ] Start MongoDB container
- [ ] Verify container is running: `docker ps`

**Option C: MongoDB Atlas**
- [ ] Create free cluster at mongodb.com
- [ ] Get connection string
- [ ] Update `MONGODB_URI` in `server/.env`

### Step 5: Seed Demo Data (Optional)
```bash
cd server
npm run seed
```
- [ ] Run seed script
- [ ] Verify demo user created
- [ ] Note demo credentials:
  - Email: `demo@example.com`
  - Password: `Demo123!`

### Step 6: Start Development Servers

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```
- [ ] Start backend server
- [ ] Verify "Server running on port 5000" message
- [ ] Verify "MongoDB connected" message

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```
- [ ] Start frontend server
- [ ] Verify "Local: http://localhost:3000" message
- [ ] Note the local URL

### Step 7: Access Application
- [ ] Open browser
- [ ] Navigate to `http://localhost:3000`
- [ ] Verify login page loads

## 🧪 Testing the Application

### Test 1: Authentication
- [ ] Click "Register" link
- [ ] Create new account OR use demo credentials
- [ ] Verify successful login
- [ ] Verify redirect to dashboard

### Test 2: Add Wallet (Manual)
- [ ] Click "+ Add Wallet" button
- [ ] Enter test address: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
- [ ] Enter wallet name: "Test Wallet"
- [ ] Select network: "Ethereum"
- [ ] Click "Add Wallet"
- [ ] Verify wallet appears in list

### Test 3: Connect MetaMask
- [ ] Ensure MetaMask is installed
- [ ] Click "Connect MetaMask" button
- [ ] Approve connection in MetaMask
- [ ] Verify wallet added automatically
- [ ] Check network detected correctly

### Test 4: View Portfolio
- [ ] Verify portfolio summary shows total value
- [ ] Check token list displays holdings
- [ ] Verify prices are showing
- [ ] Check 24h change indicators
- [ ] Verify chart displays data

### Test 5: Theme Toggle
- [ ] Click sun/moon icon in navbar
- [ ] Verify theme switches
- [ ] Refresh page
- [ ] Verify theme persists

### Test 6: Export PDF
- [ ] Click "Export to PDF" button
- [ ] Verify PDF downloads
- [ ] Open PDF
- [ ] Check portfolio data is correct

### Test 7: Remove Wallet
- [ ] Click "Remove" on a wallet
- [ ] Confirm deletion
- [ ] Verify wallet removed
- [ ] Verify portfolio updates

### Test 8: Logout
- [ ] Click "Logout" button
- [ ] Verify redirect to login page
- [ ] Verify cannot access dashboard without login

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error
**Symptoms**: "MongooseServerSelectionError"

**Solutions**:
- [ ] Check MongoDB is running: `mongod` or `docker ps`
- [ ] Verify connection string in `.env`
- [ ] Try: `mongodb://127.0.0.1:27017/crypto-portfolio`
- [ ] Check firewall isn't blocking port 27017

### Issue: Port Already in Use
**Symptoms**: "EADDRINUSE: address already in use"

**Solutions**:
- [ ] Find process: `lsof -i :5000` or `lsof -i :3000`
- [ ] Kill process: `kill -9 <PID>`
- [ ] Or change port in `.env` files

### Issue: MetaMask Not Connecting
**Symptoms**: "MetaMask not installed" error

**Solutions**:
- [ ] Install MetaMask extension
- [ ] Refresh browser page
- [ ] Check browser console for errors
- [ ] Try different browser (Chrome, Firefox, Brave)

### Issue: No Token Balances Showing
**Symptoms**: Wallet added but no tokens displayed

**Solutions**:
- [ ] Verify wallet address is correct
- [ ] Check wallet has token balances on blockchain
- [ ] Check browser console for RPC errors
- [ ] Try different RPC endpoint in `server/services/blockchain.js`

### Issue: CORS Errors
**Symptoms**: API requests blocked

**Solutions**:
- [ ] Verify backend running on port 5000
- [ ] Check `VITE_API_URL` in `client/.env`
- [ ] Restart both servers
- [ ] Clear browser cache

### Issue: Build Errors
**Symptoms**: npm install or build fails

**Solutions**:
- [ ] Delete `node_modules` folders
- [ ] Delete `package-lock.json` files
- [ ] Run `npm install` again
- [ ] Check Node.js version (need 18+)
- [ ] Try `npm cache clean --force`

## 🚀 Docker Alternative

If you prefer Docker, skip all above steps and use:

### Quick Docker Start
```bash
docker-compose up -d
```
- [ ] Run docker-compose
- [ ] Wait for containers to start
- [ ] Access at `http://localhost:3000`

### Seed Demo Data (Docker)
```bash
docker-compose exec server npm run seed
```
- [ ] Run seed command
- [ ] Use demo credentials to login

### View Docker Logs
```bash
docker-compose logs -f
```
- [ ] Check logs for errors
- [ ] Verify all services running

### Stop Docker
```bash
docker-compose down
```
- [ ] Stop all containers
- [ ] Data persists in volumes

## 📚 Next Steps

After successful setup:

1. **Read Documentation**
   - [ ] Review `README.md` for overview
   - [ ] Check `API.md` for API reference
   - [ ] Read `FEATURES.md` for feature details

2. **Explore Code**
   - [ ] Browse `client/src/` for frontend code
   - [ ] Check `server/` for backend code
   - [ ] Review `smart-contracts/` for blockchain utilities

3. **Customize**
   - [ ] Add more tokens in `server/services/blockchain.js`
   - [ ] Customize UI colors in `client/tailwind.config.js`
   - [ ] Add more networks in `smart-contracts/networks.js`

4. **Deploy**
   - [ ] Read `DEPLOYMENT.md` for production setup
   - [ ] Configure production environment
   - [ ] Set up monitoring and backups

## ✨ Success Criteria

You've successfully set up the application when:

- ✅ Both servers running without errors
- ✅ Can login/register users
- ✅ Can add wallets (manual or MetaMask)
- ✅ Portfolio displays with token balances
- ✅ Prices showing in USD
- ✅ Charts rendering correctly
- ✅ Theme toggle working
- ✅ PDF export functioning
- ✅ No console errors

## 🎉 Congratulations!

If all checks are complete, you're ready to use the Crypto Portfolio Tracker!

### Quick Reference

**Demo Account**:
- Email: `demo@example.com`
- Password: `Demo123!`

**URLs**:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

**Commands**:
```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm run dev

# Seed data
cd server && npm run seed

# Docker
docker-compose up -d
```

## 📞 Need Help?

1. Check troubleshooting section above
2. Review error messages in terminal
3. Check browser console (F12)
4. Review documentation files
5. Verify environment variables
6. Check MongoDB connection
7. Ensure all dependencies installed

## 🎯 Development Tips

- Use two terminal windows (backend + frontend)
- Keep browser console open for debugging
- Check Network tab for API calls
- Use React DevTools for component inspection
- Monitor MongoDB with Compass or mongosh
- Test with different wallets and networks
- Try both light and dark themes

Happy coding! 🚀
