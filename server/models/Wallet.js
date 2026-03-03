const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    default: 'My Wallet'
  },
  network: {
    type: String,
    enum: ['ethereum', 'base', 'polygon'],
    default: 'ethereum'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for user and address
walletSchema.index({ userId: 1, address: 1 }, { unique: true });

module.exports = mongoose.model('Wallet', walletSchema);
