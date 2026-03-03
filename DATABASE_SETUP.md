# 💾 Database Setup for NexCoin

## Current Database: MongoDB

Your app uses **MongoDB** to store:
- ✅ User accounts (email, password, name)
- ✅ Wallet addresses
- ✅ Portfolio data

---

## 🚀 Quick Start MongoDB:

### Option 1: Run the Script (Easiest)
```bash
./START_MONGODB.sh
```

### Option 2: Manual Docker Commands
```bash
# Start Docker service
sudo systemctl start docker

# Add your user to docker group (one-time setup)
sudo usermod -aG docker $USER
newgrp docker

# Start MongoDB container
docker start mongodb-crypto

# Or create new container if it doesn't exist
docker run -d -p 27017:27017 --name mongodb-crypto mongo:latest
```

### Option 3: Check if MongoDB is Already Running
```bash
docker ps | grep mongodb
```

---

## 🔧 After MongoDB is Running:

### 1. Start Backend Server
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

### 2. Test Registration
1. Go to: http://localhost:5173/register
2. Fill in:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
3. Click "Register"
4. You should be redirected to dashboard!

---

## 📊 Database Collections:

MongoDB stores data in these collections:

### 1. **users** Collection
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password",
  createdAt: Date
}
```

### 2. **wallets** Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  address: "0x742d...35Bd",
  name: "MetaMask Wallet",
  network: "ethereum",
  isActive: true,
  createdAt: Date
}
```

### 3. **pricealerts** Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  symbol: "BTC",
  targetPrice: 70000,
  condition: "above",
  isActive: true
}
```

---

## 🔍 View Your Data:

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. Database: `crypto-portfolio`
4. Collections: users, wallets, pricealerts

### Using Command Line
```bash
# Connect to MongoDB
docker exec -it mongodb-crypto mongosh

# Switch to database
use crypto-portfolio

# View users
db.users.find()

# View wallets
db.wallets.find()

# Count users
db.users.countDocuments()
```

---

## ✅ Verify Registration Works:

### 1. Check Backend Logs
After registering, you should see in server terminal:
```
POST /api/auth/register 201
```

### 2. Check MongoDB
```bash
docker exec -it mongodb-crypto mongosh
use crypto-portfolio
db.users.find().pretty()
```

You should see your registered user!

---

## 🐛 Troubleshooting:

### Error: "MongoDB connection error"
**Solution:**
```bash
# Check if MongoDB is running
docker ps | grep mongodb

# If not running, start it
docker start mongodb-crypto

# Check logs
docker logs mongodb-crypto
```

### Error: "Failed to register"
**Possible causes:**
1. Backend server not running
2. MongoDB not connected
3. Email already exists

**Solution:**
```bash
# Restart backend
cd server
npm run dev

# Check if you see "✅ MongoDB connected"
```

### Error: "Operation users.insertOne() buffering timed out"
**Solution:**
MongoDB is not running. Start it:
```bash
docker start mongodb-crypto
# Wait 5 seconds
# Restart backend server
```

---

## 📝 Database Connection String:

Located in `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/crypto-portfolio
```

This connects to:
- **Host**: localhost
- **Port**: 27017
- **Database**: crypto-portfolio

---

## 🔒 Security Notes:

- Passwords are hashed with bcrypt
- JWT tokens for authentication
- Private keys never stored
- Only wallet addresses saved

---

## 🚀 Quick Commands:

```bash
# Start MongoDB
docker start mongodb-crypto

# Stop MongoDB
docker stop mongodb-crypto

# View MongoDB logs
docker logs mongodb-crypto

# Remove MongoDB (careful!)
docker rm mongodb-crypto

# Start backend
cd server && npm run dev

# Start frontend
cd client && npm run dev
```

---

**Once MongoDB is running, registration will work perfectly!** 💾
