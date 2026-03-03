import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function LiveCryptoTable({ coins, loading }) {
  if (loading) {
    return (
      <div className="glass-card">
        <h2 className="text-2xl font-display font-bold mb-6">Live Crypto Prices</h2>
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="skeleton h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(6)}`;
  };

  const formatMarketCap = (mcap) => {
    if (mcap >= 1e12) return `$${(mcap / 1e12).toFixed(2)}T`;
    if (mcap >= 1e9) return `$${(mcap / 1e9).toFixed(2)}B`;
    if (mcap >= 1e6) return `$${(mcap / 1e6).toFixed(2)}M`;
    return `$${mcap.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <h2 className="text-2xl font-display font-bold mb-6 gradient-text">
        Live Crypto Prices
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-web3-border">
              <th className="text-left py-4 px-4 text-gray-400 font-medium">#</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Coin</th>
              <th className="text-right py-4 px-4 text-gray-400 font-medium">Price</th>
              <th className="text-right py-4 px-4 text-gray-400 font-medium">24h %</th>
              <th className="text-right py-4 px-4 text-gray-400 font-medium">Market Cap</th>
              <th className="text-right py-4 px-4 text-gray-400 font-medium">Chart</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <motion.tr
                key={coin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-web3-border/50 hover:bg-web3-card transition-colors"
              >
                <td className="py-4 px-4 text-gray-400">{coin.rank}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/32';
                      }}
                    />
                    <div>
                      <div className="font-semibold">{coin.name}</div>
                      <div className="text-sm text-gray-400">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-semibold">
                  {formatPrice(coin.current_price)}
                </td>
                <td className="py-4 px-4 text-right">
                  <span
                    className={`font-semibold ${
                      coin.price_change_24h >= 0 ? 'price-up' : 'price-down'
                    }`}
                  >
                    {coin.price_change_24h >= 0 ? '+' : ''}
                    {coin.price_change_24h.toFixed(2)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right text-gray-300">
                  {formatMarketCap(coin.market_cap)}
                </td>
                <td className="py-4 px-4">
                  <div className="w-24 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={coin.sparkline.slice(-24).map((price, i) => ({ price, i }))}>
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={coin.price_change_24h >= 0 ? '#00FF9D' : '#EF4444'}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
