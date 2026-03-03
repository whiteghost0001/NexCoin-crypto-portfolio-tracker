import { useState } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function WalletConnector({ onConnect }) {
  const [connecting, setConnecting] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);

  /**
   * Connect to MetaMask wallet and fetch balances
   * Uses Ethers.js to interact with the wallet
   */
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask to connect your wallet');
      return;
    }

    try {
      setConnecting(true);

      // Request account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];

      // Get ETH balance
      const balance = await provider.getBalance(address);
      const ethBalance = ethers.formatEther(balance);

      // Get network
      const network = await provider.getNetwork();
      const networkName = network.name === 'unknown' ? 'ethereum' : network.name;

      setConnectedAddress(address);
      
      toast.success(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);

      // Call parent callback with wallet info
      if (onConnect) {
        await onConnect({
          address,
          balance: ethBalance,
          network: networkName
        });
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      if (error.code === 4001) {
        toast.error('Connection rejected. Please approve in MetaMask.');
      } else {
        toast.error('Failed to connect wallet');
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setConnectedAddress(null);
    toast.success('Wallet disconnected');
  };

  if (connectedAddress) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-black font-bold">🦊</span>
          </div>
          <div>
            <div className="text-sm text-gray-400">Connected Wallet</div>
            <div className="font-mono font-semibold">
              {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
            </div>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={connectWallet}
      disabled={connecting}
      className="btn-glow w-full flex items-center justify-center gap-3"
    >
      {connecting ? (
        <>
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <span className="text-xl">🦊</span>
          <span>Connect Wallet</span>
        </>
      )}
    </motion.button>
  );
}
