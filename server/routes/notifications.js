const express = require('express');
const PriceAlert = require('../models/PriceAlert');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all price alerts
router.get('/alerts', authMiddleware, async (req, res) => {
  try {
    const alerts = await PriceAlert.find({ userId: req.userId, isActive: true });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create price alert
router.post('/alerts', authMiddleware, async (req, res) => {
  try {
    const { tokenSymbol, targetPrice, condition } = req.body;

    const alert = new PriceAlert({
      userId: req.userId,
      tokenSymbol: tokenSymbol.toUpperCase(),
      targetPrice,
      condition
    });

    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete price alert
router.delete('/alerts/:id', authMiddleware, async (req, res) => {
  try {
    await PriceAlert.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: { isActive: false } }
    );
    res.json({ message: 'Alert deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
