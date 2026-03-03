const express = require('express');
const { getTokenPrices, getTopCoins } = require('../services/coingecko');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get live top coins from CoinGecko
// This endpoint fetches the top 20 coins by market cap with real-time prices
// Updates every 30 seconds on the frontend
router.get('/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const topCoins = await getTopCoins(limit);
    res.json(topCoins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current prices for tokens
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { symbols } = req.query;
    
    if (!symbols) {
      return res.status(400).json({ error: 'Symbols parameter required' });
    }

    const symbolArray = symbols.split(',').map(s => s.trim().toUpperCase());
    const prices = await getTokenPrices(symbolArray);

    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
