import { NextRequest, NextResponse } from 'next/server';
import { PikachuNFTGenerator } from '../../../utils/nftGenerator';

export async function GET(
  request: NextRequest,
  { params }: { params: { tokenId: string } }
) {
  try {
    const tokenId = parseInt(params.tokenId);
    
    if (isNaN(tokenId) || tokenId < 1) {
      return NextResponse.json({ error: 'Invalid token ID' }, { status: 400 });
    }

    // Generate NFT metadata
    const generator = new PikachuNFTGenerator();
    const { metadata } = await generator.generateNFT(tokenId);

    // Return metadata in ERC-721 standard format
    return NextResponse.json(metadata);

  } catch (error) {
    console.error('Metadata generation error:', error);
    return NextResponse.json({ error: 'Failed to generate metadata' }, { status: 500 });
  }
}

