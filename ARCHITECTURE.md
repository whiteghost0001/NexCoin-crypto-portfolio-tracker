# Architecture Documentation

## System Overview

The Crypto Portfolio Tracker is a full-stack web application that allows users to track their cryptocurrency holdings across multiple wallets and networks.

## Technology Stack

### Frontend
- **React 18**: UI framework
- **Tailwind CSS**: Styling
- **Vite**: Build tool and dev server
- **Recharts**: Data visualization
- **Ethers.js**: Blockchain interaction
- **Axios**: HTTP client
- **React Router**: Navigation

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **Ethers.js**: Blockchain RPC calls
- **Axios**: External API calls

### Infrastructure
- **Docker**: Containerization
- **Nginx**: Reverse proxy (production)
- **MongoDB**: Data persistence

## Architecture Layers

### 1. Presentation Layer (Client)
```
src/
├── components/       # Reusable UI components
├── pages/           # Route pages
├── context/         # React context providers
├── utils/           # Helper functions
└── main.jsx         # Application entry point
```

### 2. Application Layer (Server)
```
server/
├── routes/          # API endpoints
├── models/          # Database schemas
├── services/        # Business logic
├── middleware/      # Request processors
└── server.js        # Server entry point
```

### 3. Data Layer
- **MongoDB Collections**:
  - `users`: User accounts and preferences
  - `wallets`: Connected wallet addresses
  - `pricealerts`: Price notification settings

### 4. Integration Layer
- **CoinGecko API**: Real-time token prices
- **Blockchain RPCs**: Wallet balance queries
- **MetaMask**: Wallet connection

## Data Flow

### Authentication Flow
1. User submits credentials
2. Server validates and generates JWT
3. Client stores token in localStorage
4. Token included in subsequent requests
5. Middleware validates token on protected routes

### Portfolio Data Flow
1. Client requests portfolio data
2. Server fetches user's wallets from DB
3. For each wallet:
   - Query blockchain RPC for balances
   - Fetch current prices from CoinGecko
   - Calculate USD values
4. Aggregate and return data to client
5. Client renders dashboard with charts

### Wallet Connection Flow
1. User clicks "Connect MetaMask"
2. MetaMask prompts for permission
3. Client receives wallet address and network
4. Address sent to server
5. Server validates and stores wallet
6. Portfolio refreshes with new data

## Security Considerations

### Authentication
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 7-day expiration
- HTTP-only cookies recommended for production

### API Security
- CORS configured for specific origins
- Rate limiting recommended for production
- Input validation on all endpoints
- MongoDB injection prevention via Mongoose

### Blockchain Security
- Read-only RPC calls (no private keys stored)
- Address validation before queries
- Network verification

## Scalability

### Current Limitations
- Synchronous blockchain queries
- In-memory price caching not implemented
- Single MongoDB instance

### Scaling Strategies
1. **Horizontal Scaling**:
   - Load balancer for multiple server instances
   - Redis for session management
   - MongoDB replica set

2. **Performance Optimization**:
   - Implement Redis caching for prices
   - Background jobs for balance updates
   - WebSocket for real-time updates
   - CDN for static assets

3. **Database Optimization**:
   - Index on userId and address fields
   - Aggregate queries for portfolio stats
   - Archive old price data

## Deployment

### Docker Deployment
```bash
docker-compose up -d
```

Services:
- MongoDB: Port 27017
- Server: Port 5000
- Client: Port 3000 (Nginx)

### Environment Variables

**Server**:
- `MONGODB_URI`: Database connection string
- `JWT_SECRET`: Token signing key
- `PORT`: Server port (default: 5000)
- `COINGECKO_API_KEY`: Optional API key

**Client**:
- `VITE_API_URL`: Backend API URL
- `VITE_BASE_CHAIN_ID`: Base network chain ID

## Monitoring & Logging

### Recommended Tools
- **Application**: PM2 for process management
- **Logs**: Winston or Pino for structured logging
- **Monitoring**: Prometheus + Grafana
- **Errors**: Sentry for error tracking
- **Uptime**: UptimeRobot or Pingdom

### Key Metrics
- API response times
- Blockchain RPC latency
- Database query performance
- User authentication success rate
- Portfolio calculation time

## Future Enhancements

1. **Features**:
   - Transaction history tracking
   - DeFi protocol integration
   - NFT portfolio support
   - Tax reporting
   - Multi-currency support

2. **Technical**:
   - GraphQL API
   - WebSocket real-time updates
   - Mobile app (React Native)
   - Progressive Web App (PWA)
   - Automated testing suite

3. **Infrastructure**:
   - Kubernetes deployment
   - CI/CD pipeline
   - Automated backups
   - Multi-region deployment
