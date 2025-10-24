# BaseMint Genesis NFT Collection

A complete ERC-721A NFT collection deployed on Base Mainnet with a modern web interface.

## 🚀 Quick Start

### 1. Add Your Private Key
```bash
# Edit the .env file and add your private key
nano .env
```

Add your private key (without 0x prefix):
```
PRIVATE_KEY=your_private_key_here
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Deploy to Base Mainnet
```bash
npm run deploy
```

This single command will:
- Compile the smart contract
- Deploy to Base Mainnet
- Automatically inject the contract address into the frontend
- Save deployment info to `contract-info.json`

### 4. Start the Frontend
```bash
npm run dev
```

Visit `http://localhost:3000` to start minting!

## 📋 Project Structure

```
├── contracts/
│   └── BaseMintGenesis.sol    # ERC-721A Smart Contract
├── scripts/
│   └── deploy.js              # Deployment script
├── app/
│   ├── config/
│   │   └── contract.ts         # Auto-generated contract config
│   ├── layout.tsx             # App layout
│   ├── page.tsx               # Main minting page
│   └── providers.tsx          # Web3 providers
├── hardhat.config.js          # Hardhat configuration
├── package.json               # Dependencies
└── .env                       # Environment variables
```

## 🔧 Smart Contract Features

- **ERC-721A Implementation**: Gas-optimized for batch minting
- **Public Minting**: Users only pay gas fees
- **Supply Control**: Max 10,000 NFTs
- **Wallet Limits**: Max 5 mints per wallet
- **Owner Controls**: Pause/unpause, withdraw, set base URI
- **Base Network Optimized**: Low gas costs

## 🌐 Frontend Features

- **Auto-Connect**: Automatically connects to Base Mainnet
- **Real-time Stats**: Shows total supply and user balance
- **Batch Minting**: Mint 1-5 NFTs at once
- **Wallet Integration**: RainbowKit + Wagmi
- **Responsive Design**: Works on all devices

## 📊 Contract Details

- **Name**: BaseMint Genesis
- **Symbol**: BMG
- **Max Supply**: 10,000
- **Max per Wallet**: 5
- **Network**: Base Mainnet (Chain ID: 8453)
- **Mint Price**: Free (only gas fees)

## 🔗 Important Links

- **Base Mainnet**: https://mainnet.base.org
- **BaseScan**: https://basescan.org
- **Base Bridge**: https://bridge.base.org

## 🛠️ Development Commands

```bash
# Compile contracts
npm run compile

# Deploy to Base Mainnet
npm run deploy

# Start frontend
npm run dev

# Build for production
npm run build
```

## 📝 Environment Variables

Create a `.env` file with:

```env
PRIVATE_KEY=your_private_key_here
BASE_MAINNET_RPC=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_api_key_here  # Optional
```

## 🎯 Deployment Checklist

- [ ] Add private key to `.env`
- [ ] Run `npm install`
- [ ] Run `npm run deploy`
- [ ] Check contract on BaseScan
- [ ] Run `npm run dev`
- [ ] Test minting on frontend

## 🚨 Important Notes

1. **Private Key Security**: Never commit your private key to version control
2. **Base ETH**: Make sure you have ETH on Base for gas fees
3. **Contract Verification**: Optional but recommended for transparency
4. **Wallet Connect**: Update the project ID in `app/providers.tsx`

## 🎉 You're Ready!

After running `npm run deploy`, your NFT collection will be live on Base Mainnet with a fully functional web interface. Users can connect their wallets and start minting immediately!

The deployment script automatically handles:
- Contract deployment
- Address injection into frontend
- Configuration file generation
- Transaction hash logging

Just add your private key and run one command! 🚀
