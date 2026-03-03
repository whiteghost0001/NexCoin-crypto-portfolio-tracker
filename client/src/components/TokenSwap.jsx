import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

export default function TokenSwap({ walletAddress, balances, onClose, onSwapComplete }) {
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [estimatedOutput, setEstimatedOutput] = useState('0');
  const [swapping, setSwapping] = useState(false);

  // Available tokens for swap
  const tokens = ['USDT', 'USDC', 'BTC', 'ETH'];

  // Mock exchange rates (in production, fetch from DEX/Oracle)
  const exchangeRates = {
    'USDT-BTC': 0.000015,
    'USDT-ETH': 0.000286,
    'USDT-USDC': 1.0,
    'USDC-BTC': 0.000015,
    'USDC-ETH': 0.000286,
    'USDC-USDT': 1.0,
    'BTC-USDT': 65000,
    'BTC-USDC': 65000,
    'BTC-ETH': 18.5,
    'ETH-USDT': 3500,
    'ETH-USDC': 3500,
    'ETH-BTC': 0.054,
  };

  // Calculate estimated output
  function calculateOutput(inputAmount) {
    if (!inputAmount || isNaN(inputAmount)) return '0';
    
    const rate = exchangeRates[`${fromToken}-${toToken}`] || 0;
    const output = parseFloat(inputAmount) * rate;
    return output.toFixed(8);
  }

  // Handle amount change
  function handleAmountChange(value) {
    setAmount(value);
    setEstimatedOutput(calculateOutput(value));
  }

  // Swap tokens
  function handleSwapTokens() {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    if (amount) {
      setEstimatedOutput(calculateOutput(amount));
    }
  }

  // Execute swap
  async function handleSwap() {
    if (!amount || parseFloat(amount) <= 0) {
      return toast.error('Please enter a valid amount');
    }

    const fromBalance = balances.find(b => b.symbol === fromToken);
    if (!fromBalance || parseFloat(amount) > parseFloat(fromBalance.balance)) {
      return toast.error(`Insufficient ${fromToken} balance`);
    }

    setSwapping(true);

    try {
      // In production, this would interact with a DEX smart contract
      // For demo, we'll simulate the swap
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success(`Swapped ${amount} ${fromToken} for ${estimatedOutput} ${toToken}`);
      
      if (onSwapComplete) {
        onSwapComplete();
      }
      
      onClose();
    } catch (error) {
      console.error('Swap failed:', error);
      toast.error('Swap failed. Please try again.');
    } finally {
      setSwapping(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold gradient-text">
              Token Swap
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>

          {/* From Token */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-400">From</label>
            <div className="flex gap-3">
              <select
                value={fromToken}
                onChange={(e) => {
                  setFromToken(e.target.value);
                  if (amount) setEstimatedOutput(calculateOutput(amount));
                }}
                className="input-web3 flex-1"
              >
                {tokens.map(token => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.0"
                className="input-web3 flex-1"
                step="any"
              />
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Balance: {balances.find(b => b.symbol === fromToken)?.balance || '0'} {fromToken}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={handleSwapTokens}
              className="p-3 bg-web3-card hover:bg-web3-border rounded-full transition-all duration-300 hover:rotate-180"
            >
              🔄
            </button>
          </div>

          {/* To Token */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-400">To (Estimated)</label>
            <div className="flex gap-3">
              <select
                value={toToken}
                onChange={(e) => {
                  setToToken(e.target.value);
                  if (amount) setEstimatedOutput(calculateOutput(amount));
                }}
                className="input-web3 flex-1"
              >
                {tokens.filter(t => t !== fromToken).map(token => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
              <input
                type="text"
                value={estimatedOutput}
                readOnly
                placeholder="0.0"
                className="input-web3 flex-1 bg-web3-card/50"
              />
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Balance: {balances.find(b => b.symbol === toToken)?.balance || '0'} {toToken}
            </div>
          </div>

          {/* Exchange Rate */}
          {amount && (
            <div className="glass-card mb-6 p-4">
              <div className="text-sm text-gray-400 mb-2">Exchange Rate</div>
              <div className="font-semibold">
                1 {fromToken} = {exchangeRates[`${fromToken}-${toToken}`]?.toFixed(8) || '0'} {toToken}
              </div>
            </div>
          )}

          {/* Swap Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSwap}
            disabled={swapping || !amount}
            className="btn-glow w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {swapping ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Swapping...
              </span>
            ) : (
              `Swap ${fromToken} for ${toToken}`
            )}
          </motion.button>

          {/* Warning */}
          <div className="mt-4 text-xs text-gray-400 text-center">
            ⚠️ This is a demo swap. In production, this would interact with a DEX smart contract.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
