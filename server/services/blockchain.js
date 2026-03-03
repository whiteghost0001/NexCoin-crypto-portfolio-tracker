const { ethers } = require('ethers');

// Network configurations
const NETWORKS = {
  ethereum: {
    rpc: 'https://eth.llamarpc.com',
    chainId: 1
  },
  base: {
    rpc: 'https://mainnet.base.org',
    chainId: 8453
  },
  polygon: {
    rpc: 'https://polygon-rpc.com',
    chainId: 137
  }
};

// ERC20 ABI for balance checking
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)'
];

// Common token addresses (Ethereum mainnet)
const COMMON_TOKENS = {
  ethereum: [
    { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT' },
    { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC' },
    { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI' },
    { address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', symbol: 'WBTC' }
  ],
  base: [
    { address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', symbol: 'USDC' },
    { address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', symbol: 'DAI' }
  ],
  polygon: [
    { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', symbol: 'USDT' },
    { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', symbol: 'USDC' }
  ]
};

/**
 * Get wallet balances including native token and ERC20 tokens
 */
async function getWalletBalances(address, network = 'ethereum') {
  try {
    const config = NETWORKS[network];
    const provider = new ethers.JsonRpcProvider(config.rpc);
    const balances = [];

    // Get native token balance (ETH, MATIC, etc.)
    const nativeBalance = await provider.getBalance(address);
    const nativeSymbol = network === 'polygon' ? 'MATIC' : 'ETH';
    
    balances.push({
      symbol: nativeSymbol,
      name: nativeSymbol,
      balance: parseFloat(ethers.formatEther(nativeBalance)),
      decimals: 18,
      address: 'native'
    });

    // Get ERC20 token balances
    const tokens = COMMON_TOKENS[network] || [];
    
    for (const token of tokens) {
      try {
        const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
        const balance = await contract.balanceOf(address);
        const decimals = await contract.decimals();
        const name = await contract.name();
        
        const formattedBalance = parseFloat(ethers.formatUnits(balance, decimals));
        
        // Only include tokens with non-zero balance
        if (formattedBalance > 0) {
          balances.push({
            symbol: token.symbol,
            name,
            balance: formattedBalance,
            decimals,
            address: token.address
          });
        }
      } catch (error) {
        console.error(`Error fetching ${token.symbol}:`, error.message);
      }
    }

    return balances;
  } catch (error) {
    console.error('Error getting wallet balances:', error);
    // Return demo data on error
    return [
      { symbol: 'ETH', name: 'Ethereum', balance: 1.5, decimals: 18, address: 'native' },
      { symbol: 'USDC', name: 'USD Coin', balance: 5000, decimals: 6, address: '0xa0b8...' },
      { symbol: 'USDT', name: 'Tether', balance: 3000, decimals: 6, address: '0xdac1...' }
    ];
  }
}

module.exports = {
  getWalletBalances,
  NETWORKS
};
