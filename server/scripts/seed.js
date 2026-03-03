const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

dotenv.config();

// Demo data
const demoUser = {
  email: 'demo@example.com',
  password: 'Demo123!',
  name: 'Demo User',
  preferences: {
    theme: 'dark',
    currency: 'USD',
    notifications: {
      priceAlerts: true,
      email: false
    }
  }
};

const demoWallets = [
  {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    name: 'Main Wallet',
    network: 'ethereum'
  },
  {
    address: '0x8888888888888888888888888888888888888888',
    name: 'Base Wallet',
    network: 'base'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Wallet.deleteMany({});
    console.log('Cleared existing data');

    // Create demo user
    const user = new User(demoUser);
    await user.save();
    console.log('Created demo user:', demoUser.email);

    // Create demo wallets
    for (const walletData of demoWallets) {
      const wallet = new Wallet({
        ...walletData,
        userId: user._id
      });
      await wallet.save();
      console.log('Created wallet:', walletData.name);
    }

    console.log('✅ Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
