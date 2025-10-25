'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS } from './config/contract'
import { useState, useEffect } from 'react'

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
            <img src="/logo.svg" alt="BaseMint Genesis Logo" className="w-24 h-24" />
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
