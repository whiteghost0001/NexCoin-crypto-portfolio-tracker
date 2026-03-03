import { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

export default function ConnectWalletButton({ onConnect }) {
  const [connecting, setConnecting] = useState(false);

  async function handleConnect() {
    if (!window.ethereum) {
      return toast.error('MetaMask not installed');
    }

    setConnecting(true);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const address = accounts[0];
      
      // Get network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      let network = 'ethereum';
      
      if (chainId === '0x2105') { // Base mainnet
        network = 'base';
      } else if (chainId === '0x89') { // Polygon
        network = 'polygon';
      }

      // Add wallet
      await onConnect(address, 'MetaMask Wallet', network);
      
      toast.success('Wallet connected!');
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  }

  return (
    <button
      onClick={handleConnect}
      disabled={connecting}
      className="btn-primary flex items-center gap-2"
    >
      <span>🦊</span>
      {connecting ? 'Connecting...' : 'Connect MetaMask'}
    </button>
  );
}
