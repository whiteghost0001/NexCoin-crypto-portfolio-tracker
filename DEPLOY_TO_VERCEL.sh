#!/bin/bash

echo "═══════════════════════════════════════════════════════════"
echo "        🚀 NexCoin Vercel Deployment Helper 🚀"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}Git not initialized. Initializing...${NC}"
    git init
    echo -e "${GREEN}✅ Git initialized${NC}"
else
    echo -e "${GREEN}✅ Git already initialized${NC}"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Step 1: Prepare Code for Deployment"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Add all files
echo "Adding files to git..."
git add .

# Commit
echo ""
read -p "Enter commit message (default: 'Prepare for Vercel deployment'): " commit_msg
commit_msg=${commit_msg:-"Prepare for Vercel deployment"}

git commit -m "$commit_msg"
echo -e "${GREEN}✅ Files committed${NC}"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Step 2: GitHub Repository"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if remote exists
if git remote | grep -q origin; then
    echo -e "${GREEN}✅ GitHub remote already configured${NC}"
    echo "Remote URL: $(git remote get-url origin)"
    echo ""
    read -p "Push to GitHub? (y/n): " push_confirm
    if [ "$push_confirm" = "y" ]; then
        git push origin main
        echo -e "${GREEN}✅ Pushed to GitHub${NC}"
    fi
else
    echo -e "${YELLOW}No GitHub remote found${NC}"
    echo ""
    echo "Please create a repository on GitHub, then run:"
    echo ""
    echo -e "${YELLOW}git remote add origin https://github.com/YOUR_USERNAME/nexcoin.git${NC}"
    echo -e "${YELLOW}git branch -M main${NC}"
    echo -e "${YELLOW}git push -u origin main${NC}"
    echo ""
    read -p "Have you created a GitHub repository? (y/n): " github_ready
    
    if [ "$github_ready" = "y" ]; then
        read -p "Enter your GitHub repository URL: " repo_url
        git remote add origin "$repo_url"
        git branch -M main
        git push -u origin main
        echo -e "${GREEN}✅ Pushed to GitHub${NC}"
    else
        echo -e "${RED}Please create a GitHub repository first${NC}"
        echo "Visit: https://github.com/new"
        exit 1
    fi
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Step 3: MongoDB Atlas Setup"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "Before deploying to Vercel, you need to set up MongoDB Atlas:"
echo ""
echo "1. Go to: https://www.mongodb.com/cloud/atlas/register"
echo "2. Create a free account"
echo "3. Create a new cluster (M0 Free tier)"
echo "4. Create a database user"
echo "5. Whitelist IP: 0.0.0.0/0 (allow from anywhere)"
echo "6. Get your connection string"
echo ""
echo "Your connection string should look like:"
echo "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/crypto-portfolio"
echo ""

read -p "Have you set up MongoDB Atlas? (y/n): " mongodb_ready

if [ "$mongodb_ready" != "y" ]; then
    echo -e "${RED}Please set up MongoDB Atlas first${NC}"
    echo "Read: VERCEL_DEPLOYMENT.md for detailed instructions"
    exit 1
fi

echo ""
read -p "Enter your MongoDB Atlas connection string: " mongodb_uri

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Step 4: Generate JWT Secret"
echo "═══════════════════════════════════════════════════════════"
echo ""

jwt_secret=$(openssl rand -base64 32)
echo "Generated JWT Secret: $jwt_secret"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Step 5: Deploy to Vercel"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "Now you need to:"
echo ""
echo "1. Go to: https://vercel.com"
echo "2. Sign up or log in"
echo "3. Click 'Add New' → 'Project'"
echo "4. Import your GitHub repository"
echo "5. Configure the project:"
echo ""
echo "   Root Directory: client"
echo "   Framework: Vite"
echo "   Build Command: npm run build"
echo "   Output Directory: dist"
echo ""
echo "6. Add Environment Variables:"
echo ""
echo -e "${YELLOW}   VITE_API_URL=${NC} (leave empty for now, we'll update it)"
echo -e "${YELLOW}   MONGODB_URI=${NC} $mongodb_uri"
echo -e "${YELLOW}   JWT_SECRET=${NC} $jwt_secret"
echo -e "${YELLOW}   NODE_ENV=${NC} production"
echo ""
echo "7. Click 'Deploy'"
echo "8. Wait for deployment to complete"
echo "9. Copy your deployment URL"
echo "10. Go back to Settings → Environment Variables"
echo "11. Update VITE_API_URL to: https://YOUR_PROJECT.vercel.app/api"
echo "12. Redeploy"
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "Environment Variables Summary"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Copy these to Vercel:"
echo ""
echo "MONGODB_URI=$mongodb_uri"
echo "JWT_SECRET=$jwt_secret"
echo "NODE_ENV=production"
echo "VITE_API_URL=https://YOUR_PROJECT.vercel.app/api"
echo ""

# Save to file
cat > .env.vercel << EOF
# Vercel Environment Variables
# Copy these to your Vercel project settings

MONGODB_URI=$mongodb_uri
JWT_SECRET=$jwt_secret
NODE_ENV=production
VITE_API_URL=https://YOUR_PROJECT.vercel.app/api

# After deployment, update VITE_API_URL with your actual Vercel URL
EOF

echo -e "${GREEN}✅ Environment variables saved to .env.vercel${NC}"
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "Next Steps"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "1. ✅ Code pushed to GitHub"
echo "2. ⏳ Deploy to Vercel (follow instructions above)"
echo "3. ⏳ Configure environment variables"
echo "4. ⏳ Test your deployment"
echo ""
echo "Read VERCEL_DEPLOYMENT.md for detailed instructions"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "🎉 Ready to deploy! Good luck! 🚀"
echo "═══════════════════════════════════════════════════════════"
