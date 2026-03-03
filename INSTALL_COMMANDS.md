# 📦 Installation Commands

Quick reference for installing dependencies and running the app.

## Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd crypto-portfolio-tracker

# Install all dependencies
npm install --prefix server
npm install --prefix client
```

## Install New Dependencies (Already Added)

The following packages have been added to `client/package.json`:

```bash
cd client
npm install framer-motion@^10.16.0
npm install react-countup@^6.5.0
```

These provide:
- **framer-motion**: Smooth animations and transitions
- **react-countup**: Animated number counters

## Development

```bash
# Terminal 1 - Start MongoDB (if using Docker)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Terminal 2 - Start Backend
cd server
npm run dev

# Terminal 3 - Start Frontend
cd client
npm run dev
```

## Production Build

```bash
# Build frontend
cd client
npm run build

# Output will be in client/dist/
```

## Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

## Verify Installation

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Check if MongoDB is running
mongosh --eval "db.version()"

# Check if ports are available
lsof -i :5000  # Backend port
lsof -i :5173  # Frontend port
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Clear npm Cache

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Issues

```bash
# Check MongoDB status
systemctl status mongod

# Start MongoDB
systemctl start mongod

# Or use Docker
docker start mongodb
```

## Environment Setup

```bash
# Copy example env files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit with your values
nano server/.env
nano client/.env
```

## Quick Start (One Command)

Create a `start.sh` script:

```bash
#!/bin/bash

# Start MongoDB
docker start mongodb || docker run -d -p 27017:27017 --name mongodb mongo:latest

# Start backend in background
cd server && npm run dev &

# Start frontend
cd client && npm run dev
```

Make it executable:
```bash
chmod +x start.sh
./start.sh
```

## Testing the Setup

```bash
# Test backend
curl http://localhost:5000/health

# Should return: {"status":"ok","timestamp":"..."}
```

## Update Dependencies

```bash
# Update all packages
cd server && npm update
cd ../client && npm update

# Check for outdated packages
npm outdated
```

---

All dependencies are now configured for the modern Web3 dashboard! 🚀
