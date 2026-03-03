const axios = require('axios');

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Map common symbols to CoinGecko IDs
const SYMBOL_TO_ID = {
  'ETH': 'ethereum',
  'BTC': 'bitcoin',
  'USDT': 'tether',
  'USDC': 'usd-coin',
  'DAI': 'dai',
  'WBTC': 'wrapped-bitcoin',
  'MATIC': 'matic-network',
  'UNI': 'uniswap',
  'LINK': 'chainlink',
  'AAVE': 'aave',
  'BNB': 'binancecoin',
  'SOL': 'solana',
  'ADA': 'cardano',
  'DOT': 'polkadot',
  'AVAX': 'avalanche-2'
};

/**
 * Get live top coins from CoinGecko with sparkline data
 * This fetches the top 20 coins by market cap with real-time prices
 */
async function getTopCoins(limit = 20) {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h'
      }
    });

    // Transform data to match our frontend needs
    return response.data.map((coin, index) => ({
      rank: index + 1,
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      price_change_24h: coin.price_change_percentage_24h || 0,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      sparkline: coin.sparkline_in_7d?.price || [],
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      circulating_supply: coin.circulating_supply
    }));
  } catch (error) {
    console.error('CoinGecko API error:', error.message);
    
    // Return demo data on error to keep the app functional
    return getDemoTopCoins(limit);
  }
}

/**
 * Get current prices for multiple tokens
 */
async function getTokenPrices(symbols) {
  try {
    // Convert symbols to CoinGecko IDs
    const ids = symbols
      .map(symbol => SYMBOL_TO_ID[symbol.toUpperCase()])
      .filter(Boolean)
      .join(',');

    if (!ids) {
      return {};
    }

    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids,
        vs_currencies: 'usd',
        include_24hr_change: true
      }
    });

    // Map back to symbols
    const prices = {};
    symbols.forEach(symbol => {
      const id = SYMBOL_TO_ID[symbol.toUpperCase()];
      if (id && response.data[id]) {
        prices[symbol.toUpperCase()] = response.data[id].usd;
        prices[`${symbol.toUpperCase()}_change`] = response.data[id].usd_24h_change || 0;
      }
    });

    return prices;
  } catch (error) {
    console.error('CoinGecko API error:', error.message);
    
    // Return demo prices on error
    const demoPrices = {
      'ETH': 3500,
      'BTC': 65000,
      'USDT': 1,
      'USDC': 1,
      'DAI': 1,
      'WBTC': 65000,
      'MATIC': 0.85,
      'ETH_change': 2.5,
      'BTC_change': 1.8,
      'MATIC_change': -0.5
    };

    const result = {};
    symbols.forEach(symbol => {
      const upper = symbol.toUpperCase();
      if (demoPrices[upper]) {
        result[upper] = demoPrices[upper];
        result[`${upper}_change`] = demoPrices[`${upper}_change`] || 0;
      }
    });

    return result;
  }
}

/**
 * Get historical price data
 */
async function getHistoricalPrices(symbol, days = 7) {
  try {
    const id = SYMBOL_TO_ID[symbol.toUpperCase()];
    if (!id) return [];

    const response = await axios.get(`${COINGECKO_API}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days
      }
    });

    return response.data.prices.map(([timestamp, price]) => ({
      timestamp,
      price
    }));
  } catch (error) {
    console.error('Error fetching historical prices:', error.message);
    return [];
  }
}

/**
 * Demo data fallback for when API is unavailable
 */
function getDemoTopCoins(limit) {
  const demoCoins = [
    { name: 'Bitcoin', symbol: 'BTC', price: 65000, change: 2.5, mcap: 1270000000000 },
    { name: 'Ethereum', symbol: 'ETH', price: 3500, change: 3.2, mcap: 420000000000 },
    { name: 'Tether', symbol: 'USDT', price: 1.00, change: 0.01, mcap: 95000000000 },
    { name: 'BNB', symbol: 'BNB', price: 580, change: 1.8, mcap: 89000000000 },
    { name: 'Solana', symbol: 'SOL', price: 145, change: 5.4, mcap: 65000000000 },
    { name: 'USD Coin', symbol: 'USDC', price: 1.00, change: 0.00, mcap: 32000000000 },
    { name: 'Cardano', symbol: 'ADA', price: 0.58, change: -1.2, mcap: 20000000000 },
    { name: 'Avalanche', symbol: 'AVAX', price: 38, change: 4.1, mcap: 14000000000 },
    { name: 'Chainlink', symbol: 'LINK', price: 15.5, change: 2.8, mcap: 9000000000 },
    { name: 'Polygon', symbol: 'MATIC', price: 0.85, change: -0.5, mcap: 8000000000 },
  ];

  return demoCoins.slice(0, limit).map((coin, index) => ({
    rank: index + 1,
    id: coin.symbol.toLowerCase(),
    symbol: coin.symbol,
    name: coin.name,
    image: `https://via.placeholder.com/32`,
    current_price: coin.price,
    price_change_24h: coin.change,
    market_cap: coin.mcap,
    total_volume: coin.mcap * 0.1,
    sparkline: Array(168).fill(0).map((_, i) => coin.price * (1 + Math.sin(i / 10) * 0.05)),
    high_24h: coin.price * 1.05,
    low_24h: coin.price * 0.95,
    circulating_supply: coin.mcap / coin.price
  }));
}

module.exports = {
  getTopCoins,
  getTokenPrices,
  getHistoricalPrices
};
