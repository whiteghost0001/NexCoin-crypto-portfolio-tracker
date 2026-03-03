# Smart Contracts Utilities

This directory contains utilities and helpers for interacting with blockchain smart contracts.

## Contents

- `erc20.js` - ERC20 token interaction utilities
- `networks.js` - Network configurations
- `abi/` - Contract ABIs

## Usage

These utilities are used by the backend to interact with blockchain networks and fetch token balances.

## Supported Networks

- Ethereum Mainnet
- Base Network
- Polygon

## Adding New Tokens

To add support for new tokens, update the token list in `../server/services/blockchain.js`.
