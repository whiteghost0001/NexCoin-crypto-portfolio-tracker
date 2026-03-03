import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function StatCard({ title, value, change, icon, delay = 0, prefix = '$', decimals = 2 }) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="stat-card hover:shadow-glow-green"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      
      <div className="text-3xl font-bold font-display mb-2">
        {prefix}
        <CountUp
          end={value}
          duration={2}
          decimals={decimals}
          separator=","
        />
      </div>
      
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'price-up' : 'price-down'}`}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
          <span className="text-gray-500 font-normal">24h</span>
        </div>
      )}
    </motion.div>
  );
}
