export default function WalletList({ wallets, onRemove }) {
  function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Connected Wallets</h2>
      
      {wallets.length === 0 ? (
        <p className="text-gray-500">No wallets connected</p>
      ) : (
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <div
              key={wallet._id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{wallet.name}</div>
                <button
                  onClick={() => onRemove(wallet._id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {truncateAddress(wallet.address)}
              </div>
              
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs rounded bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                  {wallet.network}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
