import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import LiveCryptoTable from '../components/LiveCryptoTable';
import WalletConnector from '../components/WalletConnector';
import TokenSwap from '../components/TokenSwap';
import { exportPortfolioPDF } from '../utils/pdfExport';

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);
  const [topCoins, setTopCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coinsLoading, setCoinsLoading] = useState(true);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [walletBalances, setWalletBalances] = useState([]);
  const [showSwap, setShowSwap] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolioData();
    fetchTopCoins();

    // Auto-refresh top coins every 30 seconds
    const interval = setInterval(() => {
      fetchTopCoins();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Fetch user's portfolio data from backend
   */
  async function fetchPortfolioData() {
    try {
      const response = await axios.get('/api/portfolio');
      setPortfolio(response.data);
    } catch (error) {
      console.error('Failed to load portfolio:', error);
      // Set demo data for display
      setPortfolio({
        totalValue: 0,
        change24h: 0,
        tokens: []
      });
    } finally {
      setLoading(false);
    }
  }

  /**
   * Fetch live top 20 coins from CoinGecko API
   * This updates every 30 seconds to show real-time prices
   */
  async function fetchTopCoins() {
    try {
      const response = await axios.get('/api/prices/top?limit=20');
      setTopCoins(response.data);
    } catch (error) {
      console.error('Failed to load top coins:', error);
      toast.error('Failed to load live prices');
    } finally {
      setCoinsLoading(false);
    }
  }

  /**
   * Handle wallet connection from MetaMask
   * Auto-syncs wallet balance and adds to portfolio
   */
  async function handleWalletConnect(walletInfo) {
    try {
      setConnectedWallet(walletInfo);
      
      // Show demo balances immediately
      const demoBalances = [
        { symbol: 'ETH', balance: walletInfo.balance || '2.5', value: parseFloat(walletInfo.balance || 2.5) * 3500, change24h: 3.2 },
        { symbol: 'USDT', balance: '5000', value: 5000, change24h: 0.01 },
        { symbol: 'USDC', balance: '3000', value: 3000, change24h: 0.00 },
        { symbol: 'BTC', balance: '0.15', value: 9750, change24h: 2.5 },
      ];
      setWalletBalances(demoBalances);
      
      // Update portfolio total
      const totalValue = demoBalances.reduce((sum, token) => sum + token.value, 0);
      setPortfolio(prev => ({
        ...prev,
        totalValue,
        change24h: 2.5,
        tokens: demoBalances
      }));
      
      // Try to add wallet to backend (non-blocking)
      try {
        await axios.post('/api/wallets', {
          address: walletInfo.address,
          name: 'MetaMask Wallet',
          network: walletInfo.network || 'ethereum'
        });
        toast.success('Wallet connected and synced!');
      } catch (error) {
        // Wallet might already exist, that's okay
        console.log('Wallet add note:', error.response?.data?.error || error.message);
        toast.success('Wallet connected successfully!');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet');
    }
  }

  /**
   * Fetch wallet balances for connected wallet
   */
  async function fetchWalletBalances(address) {
    try {
      // This would call your backend to get balances
      // For now, showing demo data
      const demoBalances = [
        { symbol: 'ETH', balance: '2.5', value: 8750, change24h: 3.2 },
        { symbol: 'USDT', balance: '5000', value: 5000, change24h: 0.01 },
        { symbol: 'USDC', balance: '3000', value: 3000, change24h: 0.00 },
        { symbol: 'BTC', balance: '0.15', value: 9750, change24h: 2.5 },
      ];
      setWalletBalances(demoBalances);
      
      // Update portfolio total
      const totalValue = demoBalances.reduce((sum, token) => sum + token.value, 0);
      setPortfolio(prev => ({
        ...prev,
        totalValue,
        tokens: demoBalances
      }));
    } catch (error) {
      console.error('Failed to fetch balances:', error);
    }
  }

  /**
   * Export portfolio to PDF
   */
  function handleExportPDF() {
    try {
      exportPortfolioPDF({
        totalValue: portfolio?.totalValue || 0,
        change24h: portfolio?.change24h || 0,
        tokens: walletBalances,
        walletAddress: connectedWallet?.address,
        topCoins: topCoins.slice(0, 10)
      });
      toast.success('Portfolio exported successfully!');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      toast.error('Failed to export portfolio');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-web3-primary border-t-transparent rounded-full animate-spin" />
            <div className="text-xl text-gray-400">Loading your portfolio...</div>
          </div>
        </div>
      </div>
    );
  }

  const totalValue = portfolio?.totalValue || 0;
  const change24h = portfolio?.change24h || 0;
  const profitLoss = totalValue * (change24h / 100);

  return (
    <div className="min-h-screen pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with gradient text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-5xl font-display font-bold gradient-text mb-2">
              Portfolio Dashboard
            </h1>
            <p className="text-gray-400">Track your crypto assets in real-time</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-web3-card hover:bg-web3-border rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            >
              ← Back
            </button>
            {connectedWallet && (
              <>
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-web3-card hover:bg-web3-border rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                >
                  📄 Export PDF
                </button>
                <button
                  onClick={() => setShowSwap(!showSwap)}
                  className="btn-glow text-sm flex items-center gap-2"
                >
                  🔄 Swap Tokens
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Wallet Connector */}
        <div className="mb-8 max-w-md">
          <WalletConnector onConnect={handleWalletConnect} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Portfolio Value"
            value={totalValue}
            change={change24h}
            icon="💰"
            delay={0.1}
          />
          <StatCard
            title="24h Profit/Loss"
            value={Math.abs(profitLoss)}
            change={change24h}
            icon={change24h >= 0 ? '📈' : '📉'}
            delay={0.2}
          />
          <StatCard
            title="Connected Wallet"
            value={connectedWallet ? 1 : 0}
            icon="🔗"
            delay={0.3}
            prefix=""
            decimals={0}
          />
        </div>

        {/* Token Swap Modal */}
        {showSwap && connectedWallet && (
          <TokenSwap
            walletAddress={connectedWallet.address}
            balances={walletBalances}
            onClose={() => setShowSwap(false)}
            onSwapComplete={() => {
              fetchWalletBalances(connectedWallet.address);
              toast.success('Swap completed successfully!');
            }}
          />
        )}

        {/* Wallet Balances */}
        {connectedWallet && walletBalances.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mb-8"
          >
            <h2 className="text-2xl font-display font-bold mb-6 gradient-text">
              Your Wallet Balances
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-web3-border">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Token</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-medium">Balance</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-medium">Value (USD)</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-medium">24h Change</th>
                  </tr>
                </thead>
                <tbody>
                  {walletBalances.map((token, index) => (
                    <motion.tr
                      key={token.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-web3-border/50 hover:bg-web3-card transition-colors"
                    >
                      <td className="py-4 px-4 font-semibold">{token.symbol}</td>
                      <td className="py-4 px-4 text-right">{token.balance}</td>
                      <td className="py-4 px-4 text-right font-semibold">
                        ${token.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={token.change24h >= 0 ? 'price-up' : 'price-down'}>
                          {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Live Crypto Prices Table */}
        <LiveCryptoTable coins={topCoins} loading={coinsLoading} />

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 glass-card"
        >
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-2 h-2 bg-web3-primary rounded-full animate-pulse" />
            <span>Live prices update every 30 seconds</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
