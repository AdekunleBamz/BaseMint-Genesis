'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http, cookieStorage, createStorage } from 'wagmi'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'
import { injected, walletConnect, coinbaseWallet, metaMask } from 'wagmi/connectors'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'BaseMint Genesis',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [base],
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
          appInfo={{
            appName: 'BaseMint Genesis',
            learnMoreUrl: 'https://base.org',
          }}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}