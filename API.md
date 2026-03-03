# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response: 201 Created
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "preferences": {...}
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "jwt_token_here",
  "user": {...}
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "preferences": {...}
}
```

#### Update Preferences
```http
PATCH /auth/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "theme": "dark",
  "currency": "USD",
  "notifications": {
    "priceAlerts": true,
    "email": false
  }
}

Response: 200 OK
{...updated user object}
```

### Wallets

#### Get All Wallets
```http
GET /wallets
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "_id": "wallet_id",
    "userId": "user_id",
    "address": "0x742d35cc...",
    "name": "Main Wallet",
    "network": "ethereum",
    "isActive": true,
    "addedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Add Wallet
```http
POST /wallets
Authorization: Bearer <token>
Content-Type: application/json

{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "name": "My Wallet",
  "network": "ethereum"
}

Response: 201 Created
{
  "_id": "wallet_id",
  "userId": "user_id",
  "address": "0x742d35cc...",
  "name": "My Wallet",
  "network": "ethereum",
  "isActive": true,
  "addedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Wallet
```http
PATCH /wallets/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "network": "base"
}

Response: 200 OK
{...updated wallet object}
```

#### Remove Wallet
```http
DELETE /wallets/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Wallet removed successfully"
}
```

### Portfolio

#### Get Portfolio Data
```http
GET /portfolio
Authorization: Bearer <token>

Response: 200 OK
{
  "wallets": [
    {
      "wallet": {...wallet object},
      "balances": [
        {
          "symbol": "ETH",
          "name": "Ethereum",
          "balance": 1.5,
          "decimals": 18,
          "address": "native"
        }
      ]
    }
  ],
  "totalValue": 12500.50,
  "tokens": [
    {
      "symbol": "ETH",
      "name": "Ethereum",
      "balance": 1.5,
      "decimals": 18,
      "address": "native",
      "price": 3500.00,
      "value": 5250.00,
      "change24h": 2.5
    }
  ],
  "profitLoss": 1875.08,
  "profitLossPercentage": 15.0
}
```

#### Get Portfolio History
```http
GET /portfolio/history?period=7d
Authorization: Bearer <token>

Query Parameters:
- period: "7d" | "30d" | "90d"

Response: 200 OK
[
  {
    "date": "2024-01-01",
    "value": 10000.00
  },
  {
    "date": "2024-01-02",
    "value": 10500.00
  }
]
```

### Prices

#### Get Token Prices
```http
GET /prices?symbols=ETH,BTC,USDC
Authorization: Bearer <token>

Query Parameters:
- symbols: Comma-separated list of token symbols

Response: 200 OK
{
  "ETH": 3500.00,
  "ETH_change": 2.5,
  "BTC": 65000.00,
  "BTC_change": 1.8,
  "USDC": 1.00,
  "USDC_change": 0.0
}
```

### Notifications

#### Get Price Alerts
```http
GET /notifications/alerts
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "_id": "alert_id",
    "userId": "user_id",
    "tokenSymbol": "ETH",
    "targetPrice": 4000,
    "condition": "above",
    "isActive": true,
    "triggered": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Create Price Alert
```http
POST /notifications/alerts
Authorization: Bearer <token>
Content-Type: application/json

{
  "tokenSymbol": "ETH",
  "targetPrice": 4000,
  "condition": "above"
}

Response: 201 Created
{...alert object}
```

#### Delete Price Alert
```http
DELETE /notifications/alerts/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Alert deleted"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!",
  "message": "Detailed error message (development only)"
}
```

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

## Pagination

Not currently implemented. For future implementation:
```http
GET /wallets?page=1&limit=10

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```
