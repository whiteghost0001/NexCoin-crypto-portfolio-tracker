import { exportToPDF } from '../utils/pdfExport';

export default function PortfolioSummary({ portfolio }) {
  if (!portfolio) return null;

  const { totalValue, profitLoss, profitLossPercentage } = portfolio;
  const isProfit = profitLoss >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Value */}
      <div className="card">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Total Portfolio Value
        </div>
        <div className="text-3xl font-bold">
          ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      {/* Profit/Loss */}
      <div className="card">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Profit/Loss
        </div>
        <div className={`text-3xl font-bold ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
          {isProfit ? '+' : ''}{profitLossPercentage.toFixed(2)}%
        </div>
        <div className={`text-sm ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
          {isProfit ? '+' : ''}${profitLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      {/* Actions */}
      <div className="card flex items-center justify-center">
        <button
          onClick={() => exportToPDF(portfolio)}
          className="btn-primary w-full"
        >
          📄 Export to PDF
        </button>
      </div>
    </div>
  );
}
