'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http, cookieStorage, createStorage } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'
import '@rainbow-me/rainbowkit/styles.css'

const config = createConfig({
  chains: [base],
  connectors: [
    injected({
      shimDisconnect: false, // Disable auto-reconnection
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    }),
    coinbaseWallet({ 
      appName: 'BaseMint Genesis',
      appLogoUrl: undefined, // Disable auto-connection
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: false, // Disable server-side rendering for wallet connection
  storage: createStorage({
    storage: cookieStorage,
    key: 'wagmi', // This will be cleared on each session
  }),
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={base}
          showRecentTransactions={false}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}