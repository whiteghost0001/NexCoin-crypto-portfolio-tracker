export default function TokenList({ tokens }) {
  if (!tokens || tokens.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Your Tokens</h2>
        <p className="text-gray-500">No tokens found. Add a wallet to get started.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Your Tokens</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2">Token</th>
              <th className="text-right py-3 px-2">Balance</th>
              <th className="text-right py-3 px-2">Price</th>
              <th className="text-right py-3 px-2">Value</th>
              <th className="text-right py-3 px-2">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => {
              const isPositive = token.change24h >= 0;
              
              return (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-4 px-2">
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-sm text-gray-500">{token.name}</div>
                  </td>
                  <td className="text-right py-4 px-2">
                    {token.balance.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6
                    })}
                  </td>
                  <td className="text-right py-4 px-2">
                    ${token.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </td>
                  <td className="text-right py-4 px-2 font-medium">
                    ${token.value.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </td>
                  <td className={`text-right py-4 px-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
