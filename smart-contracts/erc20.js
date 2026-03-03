const { ethers } = require('ethers');

// Standard ERC20 ABI
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)'
];

/**
 * Get ERC20 token information
 */
async function getTokenInfo(tokenAddress, provider) {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply()
  ]);
  
  return {
    address: tokenAddress,
    name,
    symbol,
    decimals,
    totalSupply: ethers.formatUnits(totalSupply, decimals)
  };
}

/**
 * Get token balance for an address
 */
async function getTokenBalance(tokenAddress, walletAddress, provider) {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const balance = await contract.balanceOf(walletAddress);
  const decimals = await contract.decimals();
  
  return {
    raw: balance.toString(),
    formatted: ethers.formatUnits(balance, decimals)
  };
}

module.exports = {
  ERC20_ABI,
  getTokenInfo,
  getTokenBalance
};
