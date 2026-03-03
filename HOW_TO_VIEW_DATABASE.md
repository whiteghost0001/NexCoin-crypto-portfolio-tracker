# 📊 How to View Database - Registered Users

## Quick Method (Easiest)

### Run the Helper Script
```bash
./VIEW_DATABASE.sh
```

This interactive script lets you:
1. View all registered users
2. Count total users
3. View all wallets
4. View all price alerts
5. Search user by email
6. Open MongoDB shell

---

## Manual Commands

### 1. View All Registered Users
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {password: 0}).pretty()"
```

This shows all users WITHOUT their passwords (for security).

**Output Example:**
```javascript
[
  {
    _id: ObjectId('69a70e67ec0d314b5843378a'),
    email: 'john@example.com',
    name: 'John Doe',
    preferences: {
      notifications: { priceAlerts: true, email: false },
      theme: 'dark',
      currency: 'USD'
    },
    createdAt: ISODate('2026-03-03T16:37:59.949Z'),
    __v: 0
  }
]
```

---

### 2. Count Total Registered Users
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.countDocuments()"
```

**Output:** Number of registered users

---

### 3. View Only Emails and Names
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {email: 1, name: 1, createdAt: 1, _id: 0}).pretty()"
```

**Output Example:**
```javascript
[
  {
    email: 'john@example.com',
    name: 'John Doe',
    createdAt: ISODate('2026-03-03T16:37:59.949Z')
  },
  {
    email: 'jane@example.com',
    name: 'Jane Smith',
    createdAt: ISODate('2026-03-03T17:15:22.123Z')
  }
]
```

---

### 4. Search for Specific User by Email
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.findOne({email: 'john@example.com'}, {password: 0})"
```

Replace `john@example.com` with the email you want to search.

---

### 5. View Latest Registered Users (Last 5)
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {password: 0}).sort({createdAt: -1}).limit(5).pretty()"
```

---

### 6. View Users Registered Today
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({createdAt: {\$gte: new Date(new Date().setHours(0,0,0,0))}}, {password: 0}).pretty()"
```

---

## Using MongoDB Shell (Interactive)

### Open MongoDB Shell
```bash
sudo docker exec -it mongodb-crypto mongosh crypto-portfolio
```

### Once Inside the Shell:

**View all users:**
```javascript
db.users.find({}, {password: 0}).pretty()
```

**Count users:**
```javascript
db.users.countDocuments()
```

**Find user by email:**
```javascript
db.users.findOne({email: "john@example.com"}, {password: 0})
```

**View all collections:**
```javascript
show collections
```

**View database stats:**
```javascript
db.stats()
```

**Exit shell:**
```javascript
exit
```

---

## Using a GUI Tool (Recommended for Easy Viewing)

### Option 1: MongoDB Compass (Official GUI)

1. **Download:** https://www.mongodb.com/try/download/compass
2. **Install** MongoDB Compass
3. **Connect** using: `mongodb://localhost:27017`
4. **Select** database: `crypto-portfolio`
5. **Click** on `users` collection
6. **View** all registered users in a nice interface

### Option 2: Studio 3T (Free)

1. **Download:** https://studio3t.com/download/
2. **Install** Studio 3T
3. **Connect** to: `mongodb://localhost:27017`
4. **Browse** collections visually

### Option 3: NoSQLBooster (Free)

1. **Download:** https://nosqlbooster.com/downloads
2. **Install** and connect to `mongodb://localhost:27017`
3. **Query** with visual interface

---

## View Database from Code

### Create a Simple Admin Script

Create `view-users.js` in the server folder:

```javascript
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/crypto-portfolio')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Get all users
    const users = await User.find({}, '-password');
    
    console.log('\n📊 Registered Users:\n');
    console.log(`Total: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || 'No name'}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Registered: ${user.createdAt}`);
      console.log(`   Theme: ${user.preferences.theme}`);
      console.log('');
    });
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
```

**Run it:**
```bash
cd server
node view-users.js
```

---

## Quick Reference Commands

### View Users (No Password)
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {password: 0}).pretty()"
```

### Count Users
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.countDocuments()"
```

### View Wallets
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.wallets.find().pretty()"
```

### View Price Alerts
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.pricealerts.find().pretty()"
```

### Delete All Users (CAREFUL!)
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.deleteMany({})"
```

### Delete Specific User
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.deleteOne({email: 'user@example.com'})"
```

---

## Database Structure

### Users Collection
```javascript
{
  _id: ObjectId,              // Unique ID
  email: String,              // User email (unique)
  password: String,           // Encrypted password (bcrypt)
  name: String,               // User name (optional)
  preferences: {
    theme: String,            // 'light' or 'dark'
    currency: String,         // 'USD', 'EUR', etc.
    notifications: {
      priceAlerts: Boolean,   // Enable price alerts
      email: Boolean          // Enable email notifications
    }
  },
  createdAt: Date,           // Registration timestamp
  __v: Number                // Version key
}
```

### Wallets Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to user
  address: String,           // Wallet address
  network: String,           // 'ethereum', 'polygon', etc.
  label: String,             // Custom label
  createdAt: Date
}
```

### Price Alerts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to user
  coinId: String,            // Coin identifier
  targetPrice: Number,       // Alert price
  condition: String,         // 'above' or 'below'
  active: Boolean,           // Alert status
  createdAt: Date
}
```

---

## Export Database Data

### Export Users to JSON
```bash
sudo docker exec mongodb-crypto mongoexport --db=crypto-portfolio --collection=users --out=/tmp/users.json
sudo docker cp mongodb-crypto:/tmp/users.json ./users-backup.json
```

### Export All Collections
```bash
sudo docker exec mongodb-crypto mongodump --db=crypto-portfolio --out=/tmp/backup
sudo docker cp mongodb-crypto:/tmp/backup ./database-backup
```

---

## Backup Database

### Create Backup
```bash
sudo docker exec mongodb-crypto mongodump --db=crypto-portfolio --out=/tmp/nexcoin-backup
sudo docker cp mongodb-crypto:/tmp/nexcoin-backup ./nexcoin-backup-$(date +%Y%m%d)
```

### Restore Backup
```bash
sudo docker cp ./nexcoin-backup-20260303 mongodb-crypto:/tmp/restore
sudo docker exec mongodb-crypto mongorestore --db=crypto-portfolio /tmp/restore/crypto-portfolio
```

---

## Troubleshooting

### Can't Connect to MongoDB?
```bash
# Check if MongoDB is running
sudo docker ps | grep mongodb

# If not running, start it
sudo docker start mongodb-crypto
```

### Permission Denied?
All commands need `sudo` because Docker requires root access.

### Want to Avoid Typing sudo?
Add your user to docker group:
```bash
sudo usermod -aG docker $USER
```
Then logout and login again.

---

## Summary

**Easiest Way:**
```bash
./VIEW_DATABASE.sh
```

**Quick View:**
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {password: 0}).pretty()"
```

**GUI Tool:**
Download MongoDB Compass and connect to `mongodb://localhost:27017`

---

**That's it! You can now view all registered users and database data! 💎**
