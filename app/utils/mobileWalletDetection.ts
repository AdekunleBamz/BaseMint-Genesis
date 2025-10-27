// Mobile wallet detection utilities
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isInWalletApp = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for common wallet app user agents
  const walletApps = [
    'MetaMaskMobile',
    'TrustWallet',
    'CoinbaseWallet',
    'Rainbow',
    'Phantom',
    'BraveWallet',
  ];
  
  return walletApps.some(app => navigator.userAgent.includes(app));
};

export const getMobileWalletDeepLink = (walletName: string, dappUrl: string) => {
  const deepLinks: Record<string, string> = {
    metamask: `https://metamask.app.link/dapp/${dappUrl.replace('https://', '')}`,
    trust: `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(dappUrl)}`,
    coinbase: `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(dappUrl)}`,
    rainbow: `https://rnbwapp.com/open?url=${encodeURIComponent(dappUrl)}`,
  };
  
  return deepLinks[walletName.toLowerCase()] || dappUrl;
};

export const detectInstalledWallets = () => {
  if (typeof window === 'undefined') return [];
  
  const wallets = [];
  
  // Check for MetaMask
  if (window.ethereum?.isMetaMask) {
    wallets.push('MetaMask');
  }
  
  // Check for Coinbase Wallet
  if (window.ethereum?.isCoinbaseWallet) {
    wallets.push('Coinbase Wallet');
  }
  
  // Check for Trust Wallet
  if (window.ethereum?.isTrust) {
    wallets.push('Trust Wallet');
  }
  
  // Check for Rainbow
  if (window.ethereum?.isRainbow) {
    wallets.push('Rainbow');
  }
  
  return wallets;
};
