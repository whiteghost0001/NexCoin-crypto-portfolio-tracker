# 📊 Database Access - Complete Guide

## Your Current Database

You already have **3 registered users** in your NexCoin database:

1. **adam nas** - adam1122@gmail.com (Registered: 3/3/2026, 5:46 PM)
2. **ROSELINE UPAHI** - keengkhalid@gmail.com (Registered: 3/3/2026, 1:53 AM)
3. **Khalid Nasiru** - bigkaytwo@gmail.com (Registered: 3/3/2026, 1:23 AM)

**Total Wallets Connected:** 2  
**Total Price Alerts:** 0

---

## 3 Easy Ways to View Your Database

### 🥇 Method 1: Node.js Script (RECOMMENDED)

**Command:**
```bash
cd server && node view-users.js
```

**What you get:**
- Beautiful formatted output
- Total statistics (users, wallets, alerts)
- Each user's complete details
- Connected wallets for each user
- Price alerts for each user

**Output Example:**
```
═══════════════════════════════════════════════════════════
                💎 NexCoin Database Viewer 💎
═══════════════════════════════════════════════════════════

📊 Database Statistics:
   Total Users: 3
   Total Wallets: 2
   Total Price Alerts: 0

👥 Registered Users:

1. adam nas
   📧 Email: adam1122@gmail.com
   🆔 ID: 69a7104bec0d314b58433798
   📅 Registered: 3/3/2026, 5:46:03 PM
   🎨 Theme: dark
   💰 Currency: USD
   🔔 Price Alerts: Enabled
   💼 Wallets: 1
```

---

### 🥈 Method 2: Interactive Shell Script

**Command:**
```bash
./VIEW_DATABASE.sh
```

**Menu Options:**
1. All registered users
2. Count of registered users
3. All wallets
4. All price alerts
5. Search user by email
6. Open MongoDB shell

---

### 🥉 Method 3: Direct MongoDB Commands

**View all users:**
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {password: 0}).pretty()"
```

**Count users:**
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.countDocuments()"
```

**View only emails and names:**
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {email: 1, name: 1, createdAt: 1, _id: 0}).pretty()"
```

**Search specific user:**
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.findOne({email: 'adam1122@gmail.com'}, {password: 0})"
```

---

## GUI Tools (Visual Interface)

### MongoDB Compass (Official - Recommended)

1. **Download:** https://www.mongodb.com/try/download/compass
2. **Install** MongoDB Compass
3. **Connect** to: `mongodb://localhost:27017`
4. **Select** database: `crypto-portfolio`
5. **Browse** collections: `users`, `wallets`, `pricealerts`

**Benefits:**
- Visual table view
- Easy filtering and sorting
- Export to CSV/JSON
- Query builder
- No command line needed

---

## What Data is Stored?

### Users Collection

Each user has:
```javascript
{
  email: "adam1122@gmail.com",
  password: "$2a$10$..." (encrypted with bcrypt),
  name: "adam nas",
  preferences: {
    theme: "dark",
    currency: "USD",
    notifications: {
      priceAlerts: true,
      email: false
    }
  },
  createdAt: "2026-03-03T17:46:03.949Z"
}
```

**Security:** Passwords are NEVER shown in plain text. They are encrypted with bcrypt.

---

### Wallets Collection

Each wallet has:
```javascript
{
  userId: ObjectId("69a7104bec0d314b58433798"),
  address: "0xc7f610327200e1f6b1f86688e86951596df624c0",
  network: "base",
  label: "My Wallet",
  createdAt: "2026-03-03T..."
}
```

---

### Price Alerts Collection

Each alert has:
```javascript
{
  userId: ObjectId("..."),
  coinId: "bitcoin",
  targetPrice: 50000,
  condition: "above",
  active: true,
  createdAt: "2026-03-03T..."
}
```

---

## Quick Reference Commands

### View Data

```bash
# All users (no passwords)
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {password: 0}).pretty()"

# Count users
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.countDocuments()"

# All wallets
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.wallets.find().pretty()"

# All price alerts
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.pricealerts.find().pretty()"
```

### Search & Filter

```bash
# Find user by email
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.findOne({email: 'adam1122@gmail.com'}, {password: 0})"

# Users registered today
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({createdAt: {\$gte: new Date(new Date().setHours(0,0,0,0))}}, {password: 0}).pretty()"

# Latest 5 users
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {password: 0}).sort({createdAt: -1}).limit(5).pretty()"
```

### Manage Data

```bash
# Delete specific user
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.deleteOne({email: 'user@example.com'})"

# Delete all users (CAREFUL!)
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.deleteMany({})"

# Update user preferences
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.updateOne({email: 'adam1122@gmail.com'}, {\$set: {'preferences.theme': 'light'}})"
```

---

## Export & Backup

### Export Users to JSON

```bash
sudo docker exec mongodb-crypto mongoexport --db=crypto-portfolio --collection=users --out=/tmp/users.json
sudo docker cp mongodb-crypto:/tmp/users.json ./users-backup.json
```

### Full Database Backup

```bash
sudo docker exec mongodb-crypto mongodump --db=crypto-portfolio --out=/tmp/backup
sudo docker cp mongodb-crypto:/tmp/backup ./nexcoin-backup-$(date +%Y%m%d)
```

### Restore Backup

```bash
sudo docker cp ./nexcoin-backup-20260303 mongodb-crypto:/tmp/restore
sudo docker exec mongodb-crypto mongorestore --db=crypto-portfolio /tmp/restore/crypto-portfolio
```

---

## MongoDB Shell (Interactive)

### Open Shell

```bash
sudo docker exec -it mongodb-crypto mongosh crypto-portfolio
```

### Inside Shell Commands

```javascript
// View all users
db.users.find({}, {password: 0}).pretty()

// Count users
db.users.countDocuments()

// Find user
db.users.findOne({email: "adam1122@gmail.com"}, {password: 0})

// View collections
show collections

// Database stats
db.stats()

// Exit
exit
```

---

## Your Current Users

Based on the database check, you have:

### User 1
- **Name:** adam nas
- **Email:** adam1122@gmail.com
- **Registered:** March 3, 2026 at 5:46 PM
- **Theme:** Dark mode
- **Wallets:** 1 connected (Base network)

### User 2
- **Name:** ROSELINE UPAHI
- **Email:** keengkhalid@gmail.com
- **Registered:** March 3, 2026 at 1:53 AM
- **Theme:** Dark mode
- **Wallets:** None

### User 3
- **Name:** Khalid Nasiru
- **Email:** bigkaytwo@gmail.com
- **Registered:** March 3, 2026 at 1:23 AM
- **Theme:** Dark mode
- **Wallets:** 1 connected (Base network)

---

## Troubleshooting

### Can't Access Database?

**Check MongoDB is running:**
```bash
sudo docker ps | grep mongodb
```

**If not running:**
```bash
sudo docker start mongodb-crypto
```

### Permission Denied?

All Docker commands need `sudo`. To avoid this:
```bash
sudo usermod -aG docker $USER
```
Then logout and login again.

### Want to Reset Database?

**Delete all users:**
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.deleteMany({})"
```

**Delete all data:**
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.dropDatabase()"
```

---

## Summary

**Easiest way to view users:**
```bash
cd server && node view-users.js
```

**Quick command:**
```bash
sudo docker exec mongodb-crypto mongosh crypto-portfolio --eval "db.users.find({}, {password: 0}).pretty()"
```

**Best for regular use:**
Download MongoDB Compass and connect to `mongodb://localhost:27017`

---

## Files Created for You

1. `VIEW_DATABASE.sh` - Interactive menu script
2. `server/view-users.js` - Node.js viewer with pretty output
3. `HOW_TO_VIEW_DATABASE.md` - Complete documentation
4. `VIEW_REGISTERED_USERS.txt` - Quick reference
5. `DATABASE_ACCESS_SUMMARY.md` - This file

---

**You're all set! Choose your preferred method and view your database! 💎**
