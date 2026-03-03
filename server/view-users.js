const mongoose = require('mongoose');
const User = require('./models/User');
const Wallet = require('./models/Wallet');
const PriceAlert = require('./models/PriceAlert');
require('dotenv').config();

async function viewDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all users
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    const wallets = await Wallet.find();
    const alerts = await PriceAlert.find();

    console.log('═══════════════════════════════════════════════════════════');
    console.log('                💎 NexCoin Database Viewer 💎');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Statistics
    console.log('📊 Database Statistics:');
    console.log(`   Total Users: ${users.length}`);
    console.log(`   Total Wallets: ${wallets.length}`);
    console.log(`   Total Price Alerts: ${alerts.length}\n`);

    console.log('═══════════════════════════════════════════════════════════\n');

    // Display users
    if (users.length === 0) {
      console.log('❌ No users registered yet.\n');
      console.log('Register your first user at: http://localhost:5173/register\n');
    } else {
      console.log('👥 Registered Users:\n');
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name || 'No name provided'}`);
        console.log(`   📧 Email: ${user.email}`);
        console.log(`   🆔 ID: ${user._id}`);
        console.log(`   📅 Registered: ${user.createdAt.toLocaleString()}`);
        console.log(`   🎨 Theme: ${user.preferences.theme}`);
        console.log(`   💰 Currency: ${user.preferences.currency}`);
        console.log(`   🔔 Price Alerts: ${user.preferences.notifications.priceAlerts ? 'Enabled' : 'Disabled'}`);
        console.log(`   📧 Email Notifications: ${user.preferences.notifications.email ? 'Enabled' : 'Disabled'}`);
        
        // Find user's wallets
        const userWallets = wallets.filter(w => w.userId.toString() === user._id.toString());
        if (userWallets.length > 0) {
          console.log(`   💼 Wallets: ${userWallets.length}`);
          userWallets.forEach(wallet => {
            console.log(`      - ${wallet.address.substring(0, 10)}...${wallet.address.substring(wallet.address.length - 8)} (${wallet.network})`);
          });
        }
        
        // Find user's alerts
        const userAlerts = alerts.filter(a => a.userId.toString() === user._id.toString());
        if (userAlerts.length > 0) {
          console.log(`   🔔 Price Alerts: ${userAlerts.length}`);
        }
        
        console.log('');
      });
    }

    console.log('═══════════════════════════════════════════════════════════\n');

    // Display wallets
    if (wallets.length > 0) {
      console.log('💼 All Connected Wallets:\n');
      wallets.forEach((wallet, index) => {
        const user = users.find(u => u._id.toString() === wallet.userId.toString());
        console.log(`${index + 1}. ${wallet.address}`);
        console.log(`   Network: ${wallet.network}`);
        console.log(`   Owner: ${user ? user.email : 'Unknown'}`);
        console.log(`   Added: ${wallet.createdAt ? wallet.createdAt.toLocaleString() : 'Unknown'}\n`);
      });
      console.log('═══════════════════════════════════════════════════════════\n');
    }

    // Display price alerts
    if (alerts.length > 0) {
      console.log('🔔 All Price Alerts:\n');
      alerts.forEach((alert, index) => {
        const user = users.find(u => u._id.toString() === alert.userId.toString());
        console.log(`${index + 1}. ${alert.coinId.toUpperCase()}`);
        console.log(`   Target: $${alert.targetPrice}`);
        console.log(`   Condition: ${alert.condition}`);
        console.log(`   Status: ${alert.active ? '✅ Active' : '❌ Inactive'}`);
        console.log(`   Owner: ${user ? user.email : 'Unknown'}`);
        console.log(`   Created: ${alert.createdAt ? alert.createdAt.toLocaleString() : 'Unknown'}\n`);
      });
      console.log('═══════════════════════════════════════════════════════════\n');
    }

    console.log('✅ Done!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Run the viewer
viewDatabase();
