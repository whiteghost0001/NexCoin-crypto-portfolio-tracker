const { ethers } = require('ethers');

// RPC endpoints for different networks
const RPC_ENDPOINTS = {
  ethereum: process.env.ETHEREUM_RPC || 'https://eth.llamarpc.com',
  polygon: process.env.POLYGON_RPC || 'https://polygon-rpc.com',
  bsc: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org'
};

// ERC20 ABI for balance checking
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)'
];

/**
 * Get ETH balance for a wallet address
 * @param {string} address - Wallet address
 * @param {string} network - Network name (ethereum, polygon, bsc)
 * @returns {Promise<string>} Balance in ETH
 */
async function getETHBalance(address, network = 'ethereum') {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[network]);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error(`Error fetching ETH balance for ${address}:`, error.message);
    return '0';
  }
}

/**
 * Get ERC20 token balance for a wallet address
 * @param {string} walletAddress - Wallet address
 * @param {string} tokenAddress - Token contract address
 * @param {string} network - Network name
 * @returns {Promise<object>} Token balance info
 */
async function getTokenBalance(walletAddress, tokenAddress, network = 'ethereum') {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[network]);
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    
    // Fetch token info and balance in parallel
    const [balance, decimals, symbol, name] = await Promise.all([
      contract.balanceOf(walletAddress),
      contract.decimals(),
      contract.symbol(),
      contract.name()
    ]);
    
    const formattedBalance = ethers.formatUnits(balance, decimals);
    
    return {
      symbol,
      name,
      balance: formattedBalance,
      decimals: Number(decimals),
      contractAddress: tokenAddress
    };
  } catch (error) {
    console.error(`Error fetching token balance for ${tokenAddress}:`, error.message);
    return null;
  }
}

/**
 * Get all balances for a wallet (ETH + common ERC20 tokens)
 * @param {string} address - Wallet address
 * @param {string} network - Network name
 * @returns {Promise<object>} All balances
 */
async function getAllBalances(address, network = 'ethereum') {
  try {
    // Common ERC20 token addresses on Ethereum mainnet
    const commonTokens = {
      ethereum: [
        { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT' },
        { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC' },
        { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI' },
        { address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', symbol: 'WBTC' },
        { address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', symbol: 'UNI' },
        { address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', symbol: 'LINK' }
      ],
      polygon: [
        { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', symbol: 'USDT' },
        { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', symbol: 'USDC' }
      ]
    };

    // Get native token balance (ETH/MATIC/BNB)
    const nativeBalance = await getETHBalance(address, network);
    
    const result = {
      address,
      network,
      nativeToken: {
        symbol: network === 'ethereum' ? 'ETH' : network === 'polygon' ? 'MATIC' : 'BNB',
        balance: nativeBalance
      },
      tokens: []
    };

    // Get ERC20 token balances
    const tokens = commonTokens[network] || [];
    const tokenBalances = await Promise.all(
      tokens.map(token => getTokenBalance(address, token.address, network))
    );

    // Filter out null results and tokens with zero balance
    result.tokens = tokenBalances.filter(
      token => token && parseFloat(token.balance) > 0
    );

    return result;
  } catch (error) {
    console.error(`Error fetching all balances for ${address}:`, error.message);
    throw error;
  }
}

/**
 * Validate if an address is a valid Ethereum address
 * @param {string} address - Address to validate
 * @returns {boolean} Is valid
 */
function isValidAddress(address) {
  return ethers.isAddress(address);
}

module.exports = {
  getETHBalance,
  getTokenBalance,
  getAllBalances,
  isValidAddress
};
