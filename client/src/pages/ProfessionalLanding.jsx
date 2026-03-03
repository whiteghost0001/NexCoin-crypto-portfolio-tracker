import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import LiveCryptoTable from '../components/LiveCryptoTable';

export default function ProfessionalLanding() {
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
      const response = await axios.get('/api/prices/top?limit=10');
      setTopCoins(response.data);
    } catch (error) {
      console.error('Failed to load top coins:', error);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    {
      icon: '🔌',
      title: 'Multi-Wallet Support',
      description: 'Connect multiple wallets from Ethereum, Polygon, BSC and more. Track all your assets in one place.'
    },
    {
      icon: '📊',
      title: 'Real-Time Tracking',
      description: 'Live price updates every 30 seconds. Monitor your portfolio performance with accurate, real-time data.'
    },
    {
      icon: '🔄',
      title: 'Token Swap',
      description: 'Swap between USDT, USDC, BTC, and ETH directly from your dashboard with live exchange rates.'
    },
    {
      icon: '📄',
      title: 'PDF Reports',
      description: 'Export professional portfolio reports with all your holdings, balances, and market data.'
    },
    {
      icon: '🎨',
      title: 'Modern UI/UX',
      description: 'Beautiful glassmorphism design with smooth animations. Light and dark mode support.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your keys, your crypto. We never store your private keys. MetaMask integration for maximum security.'
    }
  ];

  const stats = [
    { number: '20+', label: 'Cryptocurrencies Tracked' },
    { number: '3', label: 'Blockchain Networks' },
    { number: '24/7', label: 'Live Price Updates' },
    { number: '100%', label: 'Free to Use' }
  ];

  const integrations = [
    { name: 'MetaMask', icon: '🦊' },
    { name: 'Ethereum', icon: '◆' },
    { name: 'Polygon', icon: '⬡' },
    { name: 'BSC', icon: '🔶' },
    { name: 'CoinGecko', icon: '🦎' },
    { name: 'Web3', icon: '🌐' }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
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
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-8xl mb-6"
          >
            💎
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-display font-bold gradient-text mb-6">
            CRYPTO PORTFOLIO TRACKER
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Stay on top of your crypto portfolio with NexCoin's free portfolio tracker! 
            Easily track your assets from multiple wallets and exchanges.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="glass-card px-6 py-3">
              <span className="text-web3-primary font-semibold">✓</span> Real-time price tracking
            </div>
            <div className="glass-card px-6 py-3">
              <span className="text-web3-primary font-semibold">✓</span> Multi-wallet support
            </div>
            <div className="glass-card px-6 py-3">
              <span className="text-web3-primary font-semibold">✓</span> Token swap integration
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/register')}
            className="btn-glow text-lg px-12 py-4"
          >
            Start Tracking Free - No Credit Card Required
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass-card text-center"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-display font-bold text-center mb-12 gradient-text">
            Why Choose NexCoin?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass-card hover:shadow-glow-green transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Tracker Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <div className="glass-card p-8">
            <h2 className="text-3xl font-display font-bold mb-4 gradient-text-purple">
              PORTFOLIO TRACKER
            </h2>
            <h3 className="text-2xl font-bold mb-6">Watch your portfolio performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-web3-primary text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold mb-1">Actual ROI and invested fiat</h4>
                    <p className="text-gray-400 text-sm">See how much you have invested in your crypto.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-web3-primary text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold mb-1">Profit/loss & capital gains</h4>
                    <p className="text-gray-400 text-sm">Easily see how much you are up or down.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-web3-primary text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold mb-1">Real-time price updates</h4>
                    <p className="text-gray-400 text-sm">Live prices updated every 30 seconds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-web3-primary text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold mb-1">Token Swap</h4>
                    <p className="text-gray-400 text-sm">Swap tokens directly from your dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Prices */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-8 gradient-text">
            Live Cryptocurrency Prices
          </h2>
          <LiveCryptoTable coins={topCoins} loading={loading} />
        </motion.div>

        {/* Integrations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-8 gradient-text-purple">
            INTEGRATIONS
          </h2>
          <h3 className="text-2xl font-bold text-center mb-12">
            Track your crypto portfolio across multiple platforms
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass-card text-center py-6 hover:shadow-glow-purple transition-all duration-300"
              >
                <div className="text-4xl mb-2">{integration.icon}</div>
                <div className="font-semibold text-sm">{integration.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="glass-card text-center py-16 mb-12"
        >
          <h2 className="text-4xl font-display font-bold gradient-text mb-6">
            Want the best free crypto portfolio tracker?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            NexCoin tracks your entire portfolio to see your overall performance. 
            Start tracking your portfolio today - no credit card needed!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/register')}
            className="btn-glow text-lg px-12 py-4"
          >
            Get Started Free
          </motion.button>
        </motion.div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm py-8">
          <p>© 2024 NexCoin. All rights reserved.</p>
          <p className="mt-2">💎 Track Crypto Like a Pro</p>
        </div>
      </div>
    </div>
  );
}
