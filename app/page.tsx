'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS } from './config/contract'
import { useState, useEffect } from 'react'
import { isMobile, isInWalletApp, detectInstalledWallets } from './utils/mobileWalletDetection'
import Image from 'next/image'

const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "quantity", "type": "uint256"}],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export default function Home() {
  const { address, isConnected } = useAccount()
  const [mintQuantity, setMintQuantity] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [mobileInfo, setMobileInfo] = useState<{
    isMobile: boolean;
    isInWalletApp: boolean;
    installedWallets: string[];
  }>({
    isMobile: false,
    isInWalletApp: false,
    installedWallets: [],
  })
  const [nftPreview, setNftPreview] = useState<{ image: string; metadata: any } | null>(null)
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)

  // Detect mobile environment and installed wallets
  useEffect(() => {
    setMobileInfo({
      isMobile: isMobile(),
      isInWalletApp: isInWalletApp(),
      installedWallets: detectInstalledWallets(),
    })
  }, [])

  // Generate NFT preview via API (server-side)
  const generatePreview = async () => {
    setIsGeneratingPreview(true)
    try {
      const randomTokenId = Math.floor(Math.random() * 1000) + 1
      const response = await fetch(`/api/nft/${randomTokenId}`)
      
      if (!response.ok) {
        throw new Error('Failed to generate preview')
      }
      
      const data = await response.json()
      setNftPreview({
        image: data.image,
        metadata: data.metadata
      })
    } catch (error) {
      console.error('Preview generation error:', error)
      alert('Failed to generate preview')
    } finally {
      setIsGeneratingPreview(false)
    }
  }

  // Read contract data
  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'totalSupply',
  })

  const { data: maxSupply } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'MAX_SUPPLY',
  })

  const { data: userBalance } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // Mint function
  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isMintLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isSuccess) {
      setIsMinting(false)
      alert('NFT minted successfully!')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      setIsMinting(false)
      alert('Minting failed!')
    }
  }, [isError])

  const handleMint = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first!')
      return
    }
    
    if (mintQuantity < 1 || mintQuantity > 5) {
      alert('You can mint between 1 and 5 NFTs at a time!')
      return
    }

    setIsMinting(true)
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'mint',
        args: [BigInt(mintQuantity)],
      })
    } catch (error) {
      console.error('Mint error:', error)
      setIsMinting(false)
      alert('Minting failed!')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image src="/logo.svg" alt="BaseMint Genesis Logo" width={96} height={96} priority />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            BaseMint Genesis
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Mint your NFT on Base Mainnet - Only Gas Fees!
          </p>
          
          {/* Connect Wallet Button */}
          <div className="mb-8">
            <ConnectButton />
          </div>

          {/* Mobile Wallet Help */}
          {mobileInfo.isMobile && !isConnected && (
            <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Mobile Wallet Connection
              </h3>
              <div className="text-sm text-yellow-700 space-y-2">
                <p><strong>Detected:</strong> {mobileInfo.isMobile ? 'Mobile Device' : 'Desktop'}</p>
                <p><strong>In Wallet App:</strong> {mobileInfo.isInWalletApp ? 'Yes' : 'No'}</p>
                <p><strong>Installed Wallets:</strong> {mobileInfo.installedWallets.length > 0 ? mobileInfo.installedWallets.join(', ') : 'None detected'}</p>
              </div>
              <div className="mt-3 text-sm text-yellow-700">
                <p className="font-semibold">If no wallets appear:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Try using WalletConnect (QR code option)</li>
                  <li>Open this page in your wallet&apos;s built-in browser</li>
                  <li>Install MetaMask, Trust Wallet, or Coinbase Wallet</li>
                  <li>Refresh the page after installing a wallet</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* NFT Preview Section */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">NFT Preview</h2>
          
          {nftPreview ? (
            <div className="text-center">
              <img 
                src={nftPreview.image} 
                alt="NFT Preview" 
                className="w-64 h-64 mx-auto rounded-lg border-2 border-gray-200 mb-4"
                style={{ imageRendering: 'pixelated' }}
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {nftPreview.metadata.name}
              </h3>
              <p className="text-sm text-gray-600">
                {nftPreview.metadata.description}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                <p className="text-gray-500">No preview generated yet</p>
              </div>
            </div>
          )}
          
          <button
            onClick={generatePreview}
            disabled={isGeneratingPreview}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition duration-200 mt-4"
          >
            {isGeneratingPreview ? 'Generating...' : 'Generate NFT Preview'}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            Each NFT is unique with different traits and accessories!
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Supply</h3>
            <p className="text-3xl font-bold text-blue-600">
              {totalSupply ? totalSupply.toString() : '0'} / {maxSupply ? maxSupply.toString() : '10000'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Balance</h3>
            <p className="text-3xl font-bold text-green-600">
              {userBalance ? userBalance.toString() : '0'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Network</h3>
            <p className="text-3xl font-bold text-purple-600">Base</p>
          </div>
        </div>

        {/* Mint Section */}
        {isConnected && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Mint Your NFT</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Max 5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={mintQuantity}
                onChange={(e) => setMintQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <button
              onClick={handleMint}
              disabled={isMinting || isMintLoading || isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              {isMinting || isMintLoading || isPending ? 'Minting...' : `Mint ${mintQuantity} NFT${mintQuantity > 1 ? 's' : ''}`}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              You only pay gas fees - No mint price!
            </p>
          </div>
        )}

        {/* Wallet Info */}
        {isConnected && address && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Connected: <span className="font-mono text-sm">{address}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
