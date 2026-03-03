const express = require('express');
const { body, validationResult } = require('express-validator');
const Wallet = require('../models/Wallet');
const authMiddleware = require('../middleware/auth');
const { ethers } = require('ethers');

const router = express.Router();

// Get all wallets for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wallets = await Wallet.find({ userId: req.userId, isActive: true });
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new wallet
router.post('/', [
  authMiddleware,
  body('address').custom((value) => {
    if (!ethers.isAddress(value)) {
      throw new Error('Invalid Ethereum address');
    }
    return true;
  }),
  body('name').optional().trim(),
  body('network').optional().isIn(['ethereum', 'base', 'polygon'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address, name, network } = req.body;

    // Check if wallet already exists for this user
    const existingWallet = await Wallet.findOne({
      userId: req.userId,
      address: address.toLowerCase()
    });

    if (existingWallet) {
      if (!existingWallet.isActive) {
        // Reactivate wallet
        existingWallet.isActive = true;
        await existingWallet.save();
        return res.json(existingWallet);
      }
      return res.status(400).json({ error: 'Wallet already added' });
    }

    // Create new wallet
    const wallet = new Wallet({
      userId: req.userId,
      address: address.toLowerCase(),
      name: name || 'My Wallet',
      network: network || 'ethereum'
    });

    await wallet.save();
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update wallet
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, network } = req.body;
    const wallet = await Wallet.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: { name, network } },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete wallet (soft delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const wallet = await Wallet.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: { isActive: false } },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.json({ message: 'Wallet removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
