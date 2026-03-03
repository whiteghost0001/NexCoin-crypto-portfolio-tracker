# Project Structure

```
crypto-portfolio-tracker/
│
├── 📁 client/                          # React Frontend
│   ├── 📁 public/                      # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/              # Reusable UI components
│   │   │   ├── AddWalletModal.jsx      # Modal for adding wallets
│   │   │   ├── ConnectWalletButton.jsx # MetaMask connection
│   │   │   ├── Navbar.jsx              # Top navigation bar
│   │   │   ├── PortfolioChart.jsx      # Value chart (Recharts)
│   │   │   ├── PortfolioSummary.jsx    # Summary cards
│   │   │   ├── TokenList.jsx           # Token holdings table
│   │   │   └── WalletList.jsx          # Connected wallets list
│   │   │
│   │   ├── 📁 context/                 # React Context providers
│   │   │   ├── AuthContext.jsx         # Authentication state
│   │   │   └── ThemeContext.jsx        # Dark/light mode
│   │   │
│   │   ├── 📁 pages/                   # Route pages
│   │   │   ├── Dashboard.jsx           # Main dashboard
│   │   │   ├── Login.jsx               # Login page
│   │   │   └── Register.jsx            # Registration page
│   │   │
│   │   ├── 📁 utils/                   # Helper functions
│   │   │   └── pdfExport.js            # PDF generation
│   │   │
│   │   ├── App.jsx                     # Main app component
│   │   ├── index.css                   # Global styles
│   │   └── main.jsx                    # Entry point
│   │
│   ├── .env.example                    # Environment template
│   ├── Dockerfile                      # Docker configuration
│   ├── index.html                      # HTML template
│   ├── nginx.conf                      # Nginx config (production)
│   ├── package.json                    # Dependencies
│   ├── postcss.config.js               # PostCSS config
│   ├── tailwind.config.js              # Tailwind CSS config
│   └── vite.config.js                  # Vite configuration
│
├── 📁 server/                          # Node.js Backend
│   ├── 📁 middleware/                  # Express middleware
│   │   └── auth.js                     # JWT authentication
│   │
│   ├── 📁 models/                      # Mongoose schemas
│   │   ├── PriceAlert.js               # Price alert model
│   │   ├── User.js                     # User model
│   │   └── Wallet.js                   # Wallet model
│   │
│   ├── 📁 routes/                      # API endpoints
│   │   ├── auth.js                     # Authentication routes
│   │   ├── notifications.js            # Price alerts routes
│   │   ├── portfolio.js                # Portfolio data routes
│   │   ├── prices.js                   # Token prices routes
│   │   └── wallets.js                  # Wallet CRUD routes
│   │
│   ├── 📁 scripts/                     # Utility scripts
│   │   └── seed.js                     # Database seeding
│   │
│   ├── 📁 services/                    # Business logic
│   │   ├── blockchain.js               # Blockchain RPC calls
│   │   └── coingecko.js                # CoinGecko API
│   │
│   ├── .env.example                    # Environment template
│   ├── Dockerfile                      # Docker configuration
│   ├── package.json                    # Dependencies
│   └── server.js                       # Express server
│
├── 📁 smart-contracts/                 # Blockchain utilities
│   ├── 📁 abi/                         # Contract ABIs
│   │   └── ERC20.json                  # ERC20 ABI
│   │
│   ├── erc20.js                        # ERC20 utilities
│   ├── networks.js                     # Network configs
│   └── README.md                       # Documentation
│
├── 📄 .gitignore                       # Git ignore rules
├── 📄 API.md                           # API documentation
├── 📄 ARCHITECTURE.md                  # System architecture
├── 📄 docker-compose.yml               # Docker Compose config
├── 📄 FEATURES.md                      # Feature documentation
├── 📄 package.json                     # Root package.json
├── 📄 PROJECT_STRUCTURE.md             # This file
├── 📄 QUICK_START.md                   # Quick start guide
├── 📄 README.md                        # Main documentation
└── 📄 setup.sh                         # Setup script

```

## Directory Descriptions

### `/client` - Frontend Application
React-based single-page application with modern UI/UX.

**Key Technologies:**
- React 18 with Hooks
- Tailwind CSS for styling
- Vite for fast development
- Recharts for data visualization
- Ethers.js for blockchain interaction

**Structure:**
- `components/` - Reusable UI components
- `context/` - Global state management
- `pages/` - Route-level components
- `utils/` - Helper functions

### `/server` - Backend API
RESTful API built with Express and MongoDB.

**Key Technologies:**
- Express.js web framework
- MongoDB with Mongoose ODM
- JWT for authentication
- Ethers.js for blockchain queries
- Axios for external APIs

**Structure:**
- `routes/` - API endpoint definitions
- `models/` - Database schemas
- `services/` - Business logic layer
- `middleware/` - Request processors
- `scripts/` - Utility scripts

### `/smart-contracts` - Blockchain Utilities
Reusable blockchain interaction code.

**Contents:**
- ERC20 token utilities
- Network configurations
- Contract ABIs
- Helper functions

## File Purposes

### Configuration Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Multi-container orchestration |
| `tailwind.config.js` | Tailwind CSS customization |
| `vite.config.js` | Vite build configuration |
| `postcss.config.js` | PostCSS plugins |
| `.env.example` | Environment variable template |
| `nginx.conf` | Production web server config |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `QUICK_START.md` | Getting started guide |
| `API.md` | API endpoint reference |
| `ARCHITECTURE.md` | System design documentation |
| `FEATURES.md` | Feature descriptions |
| `PROJECT_STRUCTURE.md` | This file |

### Script Files

| File | Purpose |
|------|---------|
| `setup.sh` | Automated setup script |
| `server/scripts/seed.js` | Database seeding |

## Component Hierarchy

```
App
├── ThemeProvider
│   └── AuthProvider
│       └── Router
│           ├── Login
│           ├── Register
│           └── Dashboard (Protected)
│               ├── Navbar
│               ├── PortfolioSummary
│               ├── PortfolioChart
│               ├── TokenList
│               ├── WalletList
│               ├── AddWalletModal
│               └── ConnectWalletButton
```

## Data Flow

```
User Action
    ↓
React Component
    ↓
Context/State Update
    ↓
API Call (Axios)
    ↓
Express Route
    ↓
Middleware (Auth)
    ↓
Service Layer
    ├── Database (MongoDB)
    ├── Blockchain (RPC)
    └── External API (CoinGecko)
    ↓
Response
    ↓
Component Update
    ↓
UI Render
```

## API Routes Structure

```
/api
├── /auth
│   ├── POST   /register       # Create account
│   ├── POST   /login          # Login
│   ├── GET    /me             # Get current user
│   └── PATCH  /preferences    # Update preferences
│
├── /wallets
│   ├── GET    /               # List wallets
│   ├── POST   /               # Add wallet
│   ├── PATCH  /:id            # Update wallet
│   └── DELETE /:id            # Remove wallet
│
├── /portfolio
│   ├── GET    /               # Get portfolio data
│   └── GET    /history        # Get historical data
│
├── /prices
│   └── GET    /               # Get token prices
│
└── /notifications
    ├── GET    /alerts         # List price alerts
    ├── POST   /alerts         # Create alert
    └── DELETE /alerts/:id     # Delete alert
```

## Database Schema

```
MongoDB: crypto-portfolio
│
├── Collection: users
│   ├── _id: ObjectId
│   ├── email: String (unique)
│   ├── password: String (hashed)
│   ├── name: String
│   ├── preferences: Object
│   └── createdAt: Date
│
├── Collection: wallets
│   ├── _id: ObjectId
│   ├── userId: ObjectId (ref: User)
│   ├── address: String
│   ├── name: String
│   ├── network: String
│   ├── isActive: Boolean
│   └── addedAt: Date
│
└── Collection: pricealerts
    ├── _id: ObjectId
    ├── userId: ObjectId (ref: User)
    ├── tokenSymbol: String
    ├── targetPrice: Number
    ├── condition: String
    ├── isActive: Boolean
    ├── triggered: Boolean
    └── createdAt: Date
```

## Docker Container Structure

```
Docker Compose
│
├── Container: mongodb
│   ├── Image: mongo:6
│   ├── Port: 27017
│   └── Volume: mongodb_data
│
├── Container: server
│   ├── Build: ./server
│   ├── Port: 5000
│   └── Depends: mongodb
│
└── Container: client
    ├── Build: ./client
    ├── Port: 3000 (Nginx)
    └── Depends: server
```

## Build Process

### Development
```
Client (Vite)
├── Hot Module Replacement
├── Fast refresh
└── Dev server on :3000

Server (Nodemon)
├── Auto-restart on changes
├── Source maps
└── Dev server on :5000
```

### Production
```
Client Build
├── Vite build
├── Asset optimization
├── Code splitting
└── Static files → Nginx

Server Build
├── Node.js production mode
├── Environment variables
└── PM2 process manager (recommended)
```

## Key Dependencies

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `ethers` - Blockchain interaction
- `recharts` - Charts
- `tailwindcss` - Styling
- `jspdf` - PDF generation

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `ethers` - Blockchain RPC
- `axios` - HTTP client
- `cors` - CORS middleware

## Environment Variables

### Server
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crypto-portfolio
JWT_SECRET=your-secret-key
NODE_ENV=development
COINGECKO_API_KEY=optional
```

### Client
```env
VITE_API_URL=http://localhost:5000
VITE_BASE_CHAIN_ID=8453
```

## Port Usage

| Service | Port | Purpose |
|---------|------|---------|
| Frontend Dev | 3000 | Vite dev server |
| Backend API | 5000 | Express server |
| MongoDB | 27017 | Database |
| Frontend Prod | 80 | Nginx (Docker) |

## Code Style

- **JavaScript**: ES6+ with async/await
- **React**: Functional components with Hooks
- **CSS**: Tailwind utility classes
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: JSDoc style for functions
- **Formatting**: Consistent indentation (2 spaces)

## Testing Structure (Recommended)

```
tests/
├── unit/
│   ├── models/
│   ├── services/
│   └── utils/
│
├── integration/
│   ├── api/
│   └── database/
│
└── e2e/
    ├── auth.test.js
    ├── wallet.test.js
    └── portfolio.test.js
```

## Deployment Checklist

- [ ] Set production environment variables
- [ ] Update JWT secret
- [ ] Configure MongoDB replica set
- [ ] Set up SSL/TLS certificates
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Enable rate limiting
- [ ] Configure CORS for production domain
- [ ] Optimize database indexes
- [ ] Set up error tracking (Sentry)
- [ ] Configure CDN for static assets
- [ ] Set up health checks
- [ ] Document deployment process

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and rotate JWT secrets
- Monitor API rate limits
- Check blockchain RPC endpoints
- Review error logs
- Backup database
- Update token lists
- Monitor disk space

### Performance Optimization
- Implement Redis caching
- Add database indexes
- Optimize blockchain queries
- Enable gzip compression
- Implement lazy loading
- Add service worker (PWA)
- Optimize images
- Minify assets
