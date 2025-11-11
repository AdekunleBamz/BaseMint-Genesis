import { NextRequest, NextResponse } from 'next/server';
import { PikachuNFTGenerator } from '../../../utils/nftGenerator';

export async function GET(
  request: NextRequest,
  { params }: { params: { tokenId: string } }
) {
  try {
    const tokenIdNum = parseInt(params.tokenId);
    
    if (isNaN(tokenIdNum) || tokenIdNum < 1) {
      return NextResponse.json({ error: 'Invalid token ID' }, { status: 400 });
    }

    // Generate NFT image and metadata
    const generator = new PikachuNFTGenerator();
    const { image, metadata } = await generator.generateNFT(tokenIdNum);

    return NextResponse.json({
      tokenId: tokenIdNum,
      image,
      metadata,
    });

  } catch (error) {
    console.error('NFT generation error:', error);
    return NextResponse.json({ error: 'Failed to generate NFT' }, { status: 500 });
  }
}

