import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
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

            <div className="hidden md:block text-sm">
              <div className="font-medium text-gray-300">{user?.name || user?.email}</div>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 bg-web3-card hover:bg-web3-border rounded-lg transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
