# Mobile Wallet Connection Setup

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```env
# Required for WalletConnect functionality
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Optional: Base Mainnet RPC URL (defaults to public RPC)
BASE_MAINNET_RPC=https://mainnet.base.org
```

## Getting WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID
4. Add it to your `.env.local` file

## Mobile Wallet Support

The app now supports the following mobile wallets:

### Direct Integration
- **MetaMask Mobile** - Via MetaMask connector
- **Trust Wallet** - Via Trust connector  
- **Coinbase Wallet** - Via Coinbase connector
- **Safe Wallet** - Via Safe connector

### WalletConnect Integration
- **Rainbow** - Mobile wallet app
- **Phantom** - Solana wallet (via WalletConnect)
- **Any WalletConnect-compatible wallet**

## Mobile Browser Compatibility

### Supported Mobile Browsers
- Safari (iOS)
- Chrome Mobile (Android/iOS)
- Firefox Mobile
- Brave Mobile
- Edge Mobile

### Wallet App Browsers
- MetaMask Mobile Browser
- Trust Wallet Browser
- Coinbase Wallet Browser
- Rainbow Browser

## Troubleshooting Mobile Wallet Issues

### Issue: Empty wallet list on mobile
**Solutions:**
1. Ensure WalletConnect Project ID is set in `.env.local`
2. Try using WalletConnect (QR code option)
3. Open the dApp in your wallet's built-in browser
4. Install a supported mobile wallet app
5. Refresh the page after installing a wallet

### Issue: WalletConnect not working
**Solutions:**
1. Verify your WalletConnect Project ID is correct
2. Check that the project is active on WalletConnect Cloud
3. Ensure you're using a WalletConnect-compatible wallet
4. Try scanning the QR code with a different wallet app

### Issue: Wallet not detected
**Solutions:**
1. Make sure the wallet app is installed and updated
2. Try refreshing the page
3. Check if the wallet supports the Base network
4. Ensure the wallet is not in private/incognito mode

## Testing Mobile Wallet Connection

1. **Desktop Testing:**
   - Use browser developer tools to simulate mobile devices
   - Test with different user agents

2. **Real Mobile Testing:**
   - Test on actual iOS and Android devices
   - Test with different wallet apps installed
   - Test in different mobile browsers

3. **Wallet App Testing:**
   - Open the dApp URL directly in wallet browsers
   - Test QR code scanning functionality
   - Verify transaction signing works

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Additional Mobile Optimizations

The app includes:
- Mobile wallet detection utilities
- Responsive design for mobile screens
- Mobile-specific wallet connection help
- Debug information for troubleshooting
- Fallback mechanisms for unsupported wallets
