import { NextRequest, NextResponse } from 'next/server';
import { PikachuNFTGenerator } from '../../utils/nftGenerator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get('tokenId');
    
    if (!tokenId) {
      return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
    }

    const tokenIdNum = parseInt(tokenId);
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tokenId } = body;
    
    if (!tokenId) {
      return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
    }

    const tokenIdNum = parseInt(tokenId);
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

