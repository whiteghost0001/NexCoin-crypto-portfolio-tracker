import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Export portfolio data to PDF with enhanced design
 */
export function exportPortfolioPDF(data) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Header with gradient effect (simulated with colors)
  doc.setFillColor(0, 255, 157); // Neon green
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('💎 NexCoin Portfolio Report', pageWidth / 2, 20, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, 30, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  let yPos = 50;
  
  // Wallet Address
  if (data.walletAddress) {
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Connected Wallet:', 14, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(data.walletAddress, 14, yPos + 6);
    yPos += 16;
  }
  
  // Portfolio Summary Box
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(14, yPos, pageWidth - 28, 30, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Portfolio Summary', 20, yPos + 10);
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(`Total Value: $${data.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPos + 18);
  
  const change = data.change24h || 0;
  const changeText = `24h Change: ${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  doc.setTextColor(change >= 0 ? 0 : 255, change >= 0 ? 200 : 0, 0);
  doc.text(changeText, 20, yPos + 25);
  doc.setTextColor(0, 0, 0);
  
  yPos += 40;
  
  // Token Holdings
  if (data.tokens && data.tokens.length > 0) {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Your Token Holdings', 14, yPos);
    yPos += 8;
    
    const tokenData = data.tokens.map(token => [
      token.symbol,
      token.balance,
      `$${token.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      `${token.change24h >= 0 ? '+' : ''}${token.change24h.toFixed(2)}%`
    ]);
    
    doc.autoTable({
      startY: yPos,
      head: [['Token', 'Balance', 'Value (USD)', '24h Change']],
      body: tokenData,
      theme: 'striped',
      headStyles: { 
        fillColor: [0, 255, 157],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 }
    });
    
    yPos = doc.lastAutoTable.finalY + 15;
  }
  
  // Top Cryptocurrencies
  if (data.topCoins && data.topCoins.length > 0) {
    // Check if we need a new page
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Top Cryptocurrencies (Market Cap)', 14, yPos);
    yPos += 8;
    
    const coinData = data.topCoins.map(coin => [
      coin.rank,
      coin.name,
      `$${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      `${coin.price_change_24h >= 0 ? '+' : ''}${coin.price_change_24h.toFixed(2)}%`,
      `$${(coin.market_cap / 1e9).toFixed(2)}B`
    ]);
    
    doc.autoTable({
      startY: yPos,
      head: [['#', 'Coin', 'Price', '24h %', 'Market Cap']],
      body: coinData,
      theme: 'striped',
      headStyles: { 
        fillColor: [127, 0, 255],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 }
    });
    
    yPos = doc.lastAutoTable.finalY + 10;
  }
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount} | NexCoin Portfolio Report`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  // Save PDF
  const filename = `crypto-portfolio-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

/**
 * Legacy export function for backward compatibility
 */
export function exportToPDF(portfolio) {
  exportPortfolioPDF({
    totalValue: portfolio.totalValue || 0,
    change24h: portfolio.profitLossPercentage || 0,
    tokens: portfolio.tokens || [],
    topCoins: []
  });
}
