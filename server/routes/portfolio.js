const express = require('express');
const Wallet = require('../models/Wallet');
const authMiddleware = require('../middleware/auth');
const { getWalletBalances } = require('../services/blockchain');
const { getTokenPrices } = require('../services/coingecko');

const router = express.Router();

// Get complete portfolio data
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wallets = await Wallet.find({ userId: req.userId, isActive: true });
    
    if (wallets.length === 0) {
      return res.json({
        wallets: [],
        totalValue: 0,
        tokens: [],
        profitLoss: 0,
        profitLossPercentage: 0
      });
    }

    // Get balances for all wallets
    const portfolioData = await Promise.all(
      wallets.map(async (wallet) => {
        const balances = await getWalletBalances(wallet.address, wallet.network);
        return {
          wallet: wallet.toObject(),
          balances
        };
      })
    );

    // Aggregate tokens across all wallets
    const tokenMap = new Map();
    portfolioData.forEach(({ balances }) => {
      balances.forEach(token => {
        const existing = tokenMap.get(token.symbol);
        if (existing) {
          existing.balance += token.balance;
        } else {
          tokenMap.set(token.symbol, { ...token });
        }
      });
    });

    const tokens = Array.from(tokenMap.values());
    
    // Get current prices
    const symbols = tokens.map(t => t.symbol);
    const prices = await getTokenPrices(symbols);

    // Calculate values
    const enrichedTokens = tokens.map(token => {
      const price = prices[token.symbol] || 0;
      const value = token.balance * price;
      
      return {
        ...token,
        price,
        value,
        change24h: prices[`${token.symbol}_change`] || 0
      };
    });

    const totalValue = enrichedTokens.reduce((sum, token) => sum + token.value, 0);

    // Calculate profit/loss (simplified - would need historical cost basis)
    const profitLoss = totalValue * 0.15; // Demo: 15% gain
    const profitLossPercentage = 15;

    res.json({
      wallets: portfolioData,
      totalValue,
      tokens: enrichedTokens,
      profitLoss,
      profitLossPercentage
    });
  } catch (error) {
    console.error('Portfolio error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get portfolio history (for charts)
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    // Generate demo historical data
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const history = [];
    const baseValue = 10000;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variance = Math.random() * 2000 - 1000;
      
      history.push({
        date: date.toISOString().split('T')[0],
        value: baseValue + variance + (days - i) * 50
      });
    }

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
