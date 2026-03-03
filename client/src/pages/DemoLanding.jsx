import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import StatCard from '../components/StatCard';
import LiveCryptoTable from '../components/LiveCryptoTable';

export default function DemoLanding() {
  const [topCoins, setTopCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopCoins();
    const interval = setInterval(fetchTopCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchTopCoins() {
    try {
      const response = await axios.get('/api/prices/top?limit=20');
      setTopCoins(response.data);
    } catch (error) {
      console.error('Failed to load top coins:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-card mb-8 sticky top-4 z-50 mx-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
              >
                💎
              </motion.span>
              <span className="text-2xl font-display font-bold gradient-text">
                NexCoin
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-web3-card transition-colors"
                title="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-web3-card hover:bg-web3-border rounded-lg transition-colors text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-glow text-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-display font-bold gradient-text mb-4">
            Track Crypto Like a Pro
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            NexCoin - Modern Web3 portfolio tracker with live prices and MetaMask integration
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/register')}
            className="btn-glow text-lg px-8 py-4"
          >
            🦊 Connect Wallet & Start Tracking
          </motion.button>
        </motion.div>

        {/* Demo Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Total Market Cap"
            value={2450000000000}
            change={2.5}
            icon="💰"
            delay={0.1}
            prefix="$"
            decimals={0}
          />
          <StatCard
            title="24h Trading Volume"
            value={125000000000}
            change={5.2}
            icon="📊"
            delay={0.2}
            prefix="$"
            decimals={0}
          />
          <StatCard
            title="Active Cryptocurrencies"
            value={20}
            icon="💎"
            delay={0.3}
            prefix=""
            decimals={0}
          />
        </div>

        {/* Live Crypto Table */}
        <LiveCryptoTable coins={topCoins} loading={loading} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 glass-card text-center py-12"
        >
          <h2 className="text-3xl font-display font-bold gradient-text-purple mb-4">
            Ready to Start Tracking?
          </h2>
          <p className="text-gray-400 mb-6">
            Create an account and connect your wallet in seconds
          </p>
          <button
            onClick={() => navigate('/register')}
            className="btn-glow text-lg px-8 py-4"
          >
            Get Started Free
          </button>
        </motion.div>
      </div>
    </div>
  );
}
