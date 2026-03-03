const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (for demo without MongoDB)
const users = [];
const wallets = [];
const alerts = [];

// Demo user
const demoPasswordHash = bcrypt.hashSync('Demo123!', 10);
users.push({
  _id: 'demo-user-id',
  email: 'demo@example.com',
  password: demoPasswordHash,
  name: 'Demo User',
  preferences: {
    theme: 'dark',
    currency: 'USD',
    notifications: { priceAlerts: true, email: false }
  }
});

// Demo wallets
wallets.push({
  _id: 'wallet-1',
  userId: 'demo-user-id',
  address: '0x742d35cc6634c0532925a3b844bc9e7595f0beb',
  name: 'Main Wallet',
  network: 'ethereum',
  isActive: true
});

// Auth middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
// Auth - Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      _id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      preferences: { theme: 'dark', currency: 'USD', notifications: { priceAlerts: true, email: false } }
    };
    users.push(user);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, name: user.name, preferences: user.preferences }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth - Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name, preferences: user.preferences }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth - Get current user
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = users.find(u => u._id === req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Wallets - Get all
app.get('/api/wallets', authMiddleware, (req, res) => {
  const userWallets = wallets.filter(w => w.userId === req.userId && w.isActive);
  res.json(userWallets);
});

// Wallets - Add
app.post('/api/wallets', authMiddleware, (req, res) => {
  const { address, name, network } = req.body;
  
  const wallet = {
    _id: Date.now().toString(),
    userId: req.userId,
    address: address.toLowerCase(),
    name: name || 'My Wallet',
    network: network || 'ethereum',
    isActive: true,
    addedAt: new Date()
  };
  
  wallets.push(wallet);
  res.status(201).json(wallet);
});

// Wallets - Delete
app.delete('/api/wallets/:id', authMiddleware, (req, res) => {
  const wallet = wallets.find(w => w._id === req.params.id && w.userId === req.userId);
  if (wallet) {
    wallet.isActive = false;
  }
  res.json({ message: 'Wallet removed' });
});

// Portfolio - Get data
app.get('/api/portfolio', authMiddleware, (req, res) => {
  const userWallets = wallets.filter(w => w.userId === req.userId && w.isActive);
  
  // Demo data
  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: 1.5, decimals: 18, address: 'native', price: 3500, value: 5250, change24h: 2.5 },
    { symbol: 'USDC', name: 'USD Coin', balance: 5000, decimals: 6, address: '0xa0b8...', price: 1, value: 5000, change24h: 0.1 },
    { symbol: 'USDT', name: 'Tether', balance: 3000, decimals: 6, address: '0xdac1...', price: 1, value: 3000, change24h: -0.05 }
  ];
  
  const totalValue = tokens.reduce((sum, t) => sum + t.value, 0);
  
  res.json({
    wallets: userWallets.map(w => ({ wallet: w, balances: tokens })),
    totalValue,
    tokens,
    profitLoss: totalValue * 0.15,
    profitLossPercentage: 15
  });
});

// Portfolio - History
app.get('/api/portfolio/history', authMiddleware, (req, res) => {
  const days = 7;
  const history = [];
  const baseValue = 10000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variance = Math.random() * 2000 - 1000;
    
    history.push({
      date: date.toISOString().split('T')[0],
      value: baseValue + variance + (days - i) * 50
    });
  }
  
  res.json(history);
});

// Prices
app.get('/api/prices', authMiddleware, (req, res) => {
  const prices = {
    'ETH': 3500,
    'ETH_change': 2.5,
    'USDC': 1,
    'USDC_change': 0.1,
    'USDT': 1,
    'USDT_change': -0.05
  };
  res.json(prices);
});

// Notifications - Get alerts
app.get('/api/notifications/alerts', authMiddleware, (req, res) => {
  const userAlerts = alerts.filter(a => a.userId === req.userId && a.isActive);
  res.json(userAlerts);
});

// Notifications - Create alert
app.post('/api/notifications/alerts', authMiddleware, (req, res) => {
  const { tokenSymbol, targetPrice, condition } = req.body;
  
  const alert = {
    _id: Date.now().toString(),
    userId: req.userId,
    tokenSymbol: tokenSymbol.toUpperCase(),
    targetPrice,
    condition,
    isActive: true,
    triggered: false,
    createdAt: new Date()
  };
  
  alerts.push(alert);
  res.status(201).json(alert);
});

// Notifications - Delete alert
app.delete('/api/notifications/alerts/:id', authMiddleware, (req, res) => {
  const alert = alerts.find(a => a._id === req.params.id && a.userId === req.userId);
  if (alert) {
    alert.isActive = false;
  }
  res.json({ message: 'Alert deleted' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), mode: 'demo' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Demo server running on port ${PORT}`);
  console.log(`📝 Using in-memory storage (no MongoDB required)`);
  console.log(`👤 Demo account: demo@example.com / Demo123!`);
});
