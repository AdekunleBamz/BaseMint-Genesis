import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'BaseMint Genesis',
  description: 'BaseMint Genesis NFT Collection on Base Mainnet',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
