# 🚀 Deploy NexCoin to Vercel

Complete guide to deploy your NexCoin crypto portfolio tracker to Vercel.

---

## Overview

We'll deploy:
- **Frontend (Client)** → Vercel
- **Backend (Server)** → Vercel Serverless Functions
- **Database (MongoDB)** → MongoDB Atlas (Free)

---

## Prerequisites

1. ✅ GitHub account
2. ✅ Vercel account (free) - https://vercel.com/signup
3. ✅ MongoDB Atlas account (free) - https://www.mongodb.com/cloud/atlas/register

---

## Step 1: Prepare Your Code for Vercel

### A. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Vercel deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/nexcoin.git
git branch -M main
git push -u origin main
```

---

## Step 2: Setup MongoDB Atlas (Free Cloud Database)

### A. Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a new cluster (M0 Free tier)
4. Choose a cloud provider and region (closest to you)
5. Click "Create Cluster" (takes 3-5 minutes)

### B. Configure Database Access

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `nexcoin`
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### C. Configure Network Access

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### D. Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://nexcoin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Replace `<password>` with your actual password
7. Add database name: `mongodb+srv://nexcoin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/crypto-portfolio?retryWrites=true&w=majority`

---

## Step 3: Deploy to Vercel

### A. Import Project to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will detect it's a monorepo

### B. Configure Frontend (Client)

**Root Directory:** `client`

**Framework Preset:** Vite

**Build Command:** `npm run build`

**Output Directory:** `dist`

**Install Command:** `npm install`

### C. Configure Environment Variables

Click "Environment Variables" and add:

**For Frontend:**
```
VITE_API_URL=https://YOUR_PROJECT_NAME.vercel.app/api
```

**For Backend (we'll add these in Step 4):**
```
MONGODB_URI=mongodb+srv://nexcoin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/crypto-portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

### D. Deploy Frontend

1. Click "Deploy"
2. Wait for deployment to complete
3. You'll get a URL like: `https://nexcoin.vercel.app`

---

## Step 4: Deploy Backend as Serverless Functions

### A. Create Vercel Configuration for Backend

We need to create a separate Vercel project for the backend.

1. Go back to Vercel dashboard
2. Click "Add New" → "Project"
3. Import the SAME GitHub repository
4. This time configure it for backend:

**Root Directory:** `server`

**Framework Preset:** Other

**Build Command:** (leave empty)

**Output Directory:** (leave empty)

**Install Command:** `npm install`

### B. Add Environment Variables for Backend

```
MONGODB_URI=mongodb+srv://nexcoin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/crypto-portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
PORT=5000
```

### C. Deploy Backend

Click "Deploy" and wait for completion.

You'll get a backend URL like: `https://nexcoin-api.vercel.app`

---

## Step 5: Update Frontend Environment Variable

1. Go to your frontend project in Vercel
2. Go to Settings → Environment Variables
3. Update `VITE_API_URL` to your backend URL:
   ```
   VITE_API_URL=https://nexcoin-api.vercel.app
   ```
4. Redeploy frontend (Deployments → click "..." → Redeploy)

---

## Step 6: Test Your Deployment

1. Visit your frontend URL: `https://nexcoin.vercel.app`
2. Try to register a new account
3. Login with your credentials
4. Connect MetaMask wallet
5. View live crypto prices

---

## Alternative: Deploy Both in One Project

You can also deploy both frontend and backend in a single Vercel project using the configuration files I've created.

### Files Created:
- `vercel.json` (root)
- `api/` folder with serverless functions

This approach is simpler and uses one domain for everything.

---

## Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
1. Check MongoDB Atlas connection string is correct
2. Verify IP whitelist includes 0.0.0.0/0
3. Check environment variables are set correctly
4. Redeploy after changing environment variables

### Issue: "CORS errors"

**Solution:**
1. Update CORS configuration in `server/server.js`
2. Add your Vercel frontend URL to allowed origins
3. Redeploy backend

### Issue: "API not found"

**Solution:**
1. Check `VITE_API_URL` environment variable
2. Make sure it points to your backend Vercel URL
3. Redeploy frontend

### Issue: "Build failed"

**Solution:**
1. Check build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Verify Node.js version compatibility

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `nexcoin.com`)
4. Follow DNS configuration instructions
5. Vercel will automatically provision SSL certificate

---

## Environment Variables Reference

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.vercel.app
VITE_BASE_CHAIN_ID=8453
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/crypto-portfolio
JWT_SECRET=generate-with-openssl-rand-base64-32
NODE_ENV=production
PORT=5000
```

---

## Monitoring Your Deployment

### Vercel Analytics

1. Go to your project in Vercel
2. Click "Analytics" tab
3. View traffic, performance, and errors

### MongoDB Atlas Monitoring

1. Go to MongoDB Atlas dashboard
2. Click "Metrics" tab
3. View database operations, connections, and storage

---

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

---

## Cost Breakdown

### Free Tier Limits

**Vercel Free:**
- 100 GB bandwidth/month
- Unlimited projects
- Automatic HTTPS
- Serverless functions

**MongoDB Atlas Free (M0):**
- 512 MB storage
- Shared RAM
- Shared vCPU
- Perfect for small apps

**Total Cost:** $0/month for small to medium traffic

---

## Scaling Considerations

### When to Upgrade

**Vercel Pro ($20/month):**
- More bandwidth
- Better performance
- Team collaboration
- Advanced analytics

**MongoDB Atlas M10+ ($57/month):**
- Dedicated resources
- More storage
- Better performance
- Automated backups

---

## Security Best Practices

1. ✅ Use strong JWT secret (32+ characters)
2. ✅ Enable MongoDB authentication
3. ✅ Use environment variables (never commit secrets)
4. ✅ Enable HTTPS (automatic with Vercel)
5. ✅ Whitelist only necessary IPs (or use 0.0.0.0/0 for public apps)
6. ✅ Regularly update dependencies
7. ✅ Monitor error logs

---

## Backup Strategy

### MongoDB Atlas Backups

1. Go to MongoDB Atlas
2. Click "Backup" tab
3. Enable Cloud Backup (available on paid tiers)
4. Or manually export data:
   ```bash
   mongodump --uri="your-connection-string"
   ```

---

## Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Vercel
- [ ] Environment variables configured
- [ ] Frontend redeployed with correct API URL
- [ ] Registration tested
- [ ] Login tested
- [ ] Wallet connection tested
- [ ] Live prices working

---

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **MongoDB Atlas Documentation:** https://docs.atlas.mongodb.com/
- **Vercel Community:** https://github.com/vercel/vercel/discussions
- **MongoDB Community:** https://www.mongodb.com/community/forums/

---

## Next Steps After Deployment

1. ✅ Set up custom domain
2. ✅ Enable Vercel Analytics
3. ✅ Configure error tracking (Sentry)
4. ✅ Set up monitoring alerts
5. ✅ Create backup schedule
6. ✅ Document API endpoints
7. ✅ Share with users!

---

**Your NexCoin is now live on Vercel! 🎉💎**

Visit your deployment and start tracking crypto portfolios!
