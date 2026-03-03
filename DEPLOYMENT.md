# Deployment Guide

Complete guide for deploying the Crypto Portfolio Tracker to production.

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database backup strategy in place
- [ ] SSL certificates obtained
- [ ] Domain name configured
- [ ] Monitoring tools set up
- [ ] Error tracking configured
- [ ] Security audit completed

## Deployment Options

### Option 1: Docker Compose (Recommended for Small-Medium Scale)

#### Prerequisites
- Docker and Docker Compose installed
- Domain name pointed to server
- SSL certificate (Let's Encrypt recommended)

#### Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd crypto-portfolio-tracker
```

2. **Configure Environment**

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/crypto-portfolio
JWT_SECRET=<generate-strong-secret>
NODE_ENV=production
COINGECKO_API_KEY=<your-api-key>
```

Create `client/.env`:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_BASE_CHAIN_ID=8453
```

3. **Update docker-compose.yml for Production**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    restart: always
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: <strong-password>
    networks:
      - app-network

  server:
    build: ./server
    restart: always
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://admin:<password>@mongodb:27017/crypto-portfolio?authSource=admin
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
    networks:
      - app-network

  client:
    build: ./client
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - server
    networks:
      - app-network

volumes:
  mongodb_data:

networks:
  app-network:
    driver: bridge
```

4. **Build and Start**
```bash
docker-compose up -d --build
```

5. **Verify Deployment**
```bash
docker-compose ps
docker-compose logs -f
```

### Option 2: Manual Deployment (VPS/Cloud Server)

#### Server Setup (Ubuntu 22.04)

1. **Update System**
```bash
sudo apt update && sudo apt upgrade -y
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

3. **Install MongoDB**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

4. **Install Nginx**
```bash
sudo apt install -y nginx
```

5. **Install PM2**
```bash
sudo npm install -g pm2
```

#### Application Deployment

1. **Clone and Setup**
```bash
cd /var/www
sudo git clone <repository-url> crypto-portfolio
cd crypto-portfolio
sudo chown -R $USER:$USER .
```

2. **Install Dependencies**
```bash
cd server && npm install --production
cd ../client && npm install
```

3. **Configure Environment**
```bash
# Server
cp server/.env.example server/.env
nano server/.env

# Client
cp client/.env.example client/.env
nano client/.env
```

4. **Build Client**
```bash
cd client
npm run build
```

5. **Start Server with PM2**
```bash
cd ../server
pm2 start server.js --name crypto-portfolio-api
pm2 save
pm2 startup
```

6. **Configure Nginx**

Create `/etc/nginx/sites-available/crypto-portfolio`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    root /var/www/crypto-portfolio/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/crypto-portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Setup SSL with Let's Encrypt**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option 3: Cloud Platform Deployment

#### Heroku

1. **Install Heroku CLI**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login and Create App**
```bash
heroku login
heroku create crypto-portfolio-app
```

3. **Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

4. **Configure Environment**
```bash
heroku config:set JWT_SECRET=<your-secret>
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git push heroku main
```

#### AWS (EC2 + RDS)

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Security groups: 80, 443, 22

2. **Setup MongoDB Atlas**
   - Create cluster
   - Configure network access
   - Get connection string

3. **Follow Manual Deployment Steps**
   - Use MongoDB Atlas URI
   - Configure AWS security groups
   - Set up CloudFront for CDN

#### DigitalOcean

1. **Create Droplet**
   - Ubuntu 22.04
   - 2GB RAM minimum
   - Add SSH key

2. **Follow Manual Deployment Steps**

3. **Optional: Use Managed MongoDB**
   - Create managed database
   - Update connection string

## Environment Variables

### Production Server Variables
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://username:password@host:27017/crypto-portfolio?authSource=admin

# Authentication
JWT_SECRET=<generate-with: openssl rand -base64 32>

# External APIs
COINGECKO_API_KEY=<optional-but-recommended>

# Logging
LOG_LEVEL=info
```

### Production Client Variables
```env
VITE_API_URL=https://api.yourdomain.com
VITE_BASE_CHAIN_ID=8453
```

## Security Hardening

### 1. Firewall Configuration
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. MongoDB Security
```bash
# Enable authentication
sudo nano /etc/mongod.conf

# Add:
security:
  authorization: enabled

# Create admin user
mongosh
use admin
db.createUser({
  user: "admin",
  pwd: "<strong-password>",
  roles: ["root"]
})
```

### 3. Rate Limiting

Add to `server/server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. Helmet.js for Security Headers
```bash
cd server
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 5. CORS Configuration
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

## Monitoring & Logging

### 1. PM2 Monitoring
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# View logs
pm2 logs
pm2 monit
```

### 2. Setup Winston Logger

Install:
```bash
npm install winston
```

Create `server/utils/logger.js`:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### 3. Error Tracking with Sentry

```bash
npm install @sentry/node
```

```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

### 4. Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

## Backup Strategy

### 1. MongoDB Backup Script

Create `backup.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mongodb"
mkdir -p $BACKUP_DIR

mongodump --uri="mongodb://admin:password@localhost:27017/crypto-portfolio?authSource=admin" --out=$BACKUP_DIR/$DATE

# Keep only last 7 days
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +
```

### 2. Automated Backups with Cron
```bash
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

### 3. Cloud Backup
- AWS S3
- DigitalOcean Spaces
- Google Cloud Storage

## Performance Optimization

### 1. Enable Gzip Compression

Nginx:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
```

### 2. Redis Caching

Install Redis:
```bash
sudo apt install redis-server
```

Implement caching:
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache token prices for 5 minutes
async function getCachedPrices(symbols) {
  const cached = await client.get(`prices:${symbols}`);
  if (cached) return JSON.parse(cached);
  
  const prices = await getTokenPrices(symbols);
  await client.setex(`prices:${symbols}`, 300, JSON.stringify(prices));
  return prices;
}
```

### 3. Database Indexing

```javascript
// Add indexes
walletSchema.index({ userId: 1, address: 1 });
userSchema.index({ email: 1 });
```

### 4. CDN for Static Assets
- Cloudflare
- AWS CloudFront
- Fastly

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/crypto-portfolio
          git pull
          cd server && npm install --production
          cd ../client && npm install && npm run build
          pm2 restart crypto-portfolio-api
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB is running: `sudo systemctl status mongod`
   - Verify connection string
   - Check firewall rules

2. **502 Bad Gateway**
   - Check backend is running: `pm2 status`
   - Verify Nginx proxy configuration
   - Check backend logs: `pm2 logs`

3. **CORS Errors**
   - Update CORS origin in server
   - Check API URL in client .env

4. **SSL Certificate Issues**
   - Renew certificate: `sudo certbot renew`
   - Check certificate paths in Nginx

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review logs weekly
- [ ] Check disk space
- [ ] Monitor API rate limits
- [ ] Review security advisories
- [ ] Test backups monthly
- [ ] Update SSL certificates (auto with certbot)

### Update Procedure
```bash
# Backup first
./backup.sh

# Pull updates
git pull

# Update dependencies
cd server && npm install
cd ../client && npm install && npm run build

# Restart services
pm2 restart all
sudo systemctl reload nginx
```

## Rollback Procedure

```bash
# Revert to previous commit
git revert HEAD
git push

# Or restore from backup
mongorestore --uri="mongodb://..." /path/to/backup

# Restart services
pm2 restart all
```

## Support & Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Let's Encrypt](https://letsencrypt.org/)

## Post-Deployment Checklist

- [ ] Application accessible via HTTPS
- [ ] All API endpoints working
- [ ] Database connections stable
- [ ] Monitoring tools active
- [ ] Backups configured and tested
- [ ] SSL certificate auto-renewal working
- [ ] Error tracking operational
- [ ] Performance metrics baseline established
- [ ] Documentation updated
- [ ] Team notified of deployment

## Scaling Considerations

### Horizontal Scaling
- Load balancer (Nginx, HAProxy)
- Multiple application servers
- MongoDB replica set
- Redis cluster
- Session management with Redis

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching
- Use CDN for static assets

Congratulations! Your Crypto Portfolio Tracker is now deployed and ready for production use! 🚀
