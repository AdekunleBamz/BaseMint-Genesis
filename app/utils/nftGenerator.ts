// NFT Image Generator - Pikachu with Base Logo Cap
import { Canvas, createCanvas } from 'canvas';

export class PikachuNFTGenerator {
  private canvas: Canvas;
  private ctx: any;

  constructor() {
    this.canvas = createCanvas(512, 512);
    this.ctx = this.canvas.getContext('2d');
  }

  async generateNFT(tokenId: number): Promise<{ image: string; metadata: any }> {
    // Clear canvas
    this.ctx.clearRect(0, 0, 512, 512);
    
    // Generate random traits for variety
    const traits = this.generateTraits(tokenId);
    
    // Draw background gradient
    this.drawBackground(traits.backgroundColor);
    
    // Draw Pikachu body
    this.drawPikachuWithTraits(traits);
    
    // Draw Base logo cap
    this.drawBaseCap(traits.capColor);
    
    // Draw accessories based on traits
    if (traits.hasGlasses) this.drawGlasses();
    if (traits.hasNecklace) this.drawNecklace();
    if (traits.hasBowtie) this.drawBowtie();
    if (traits.hasBandana) this.drawBandana();
    
    // Add token ID watermark
    this.drawTokenId(tokenId);
    
    // Convert to base64 image
    const imageData = this.canvas.toDataURL('image/png');
    const base64Image = imageData.split(',')[1];
    
    // Generate metadata
    const metadata = this.generateMetadata(tokenId, traits, base64Image);
    
    return { image: imageData, metadata };
  }

  private generateTraits(tokenId: number) {
    // Use tokenId as seed for consistent traits
    const seed = tokenId * 12345;
    const seed2 = tokenId * 67890;
    const seed3 = tokenId * 54321;
    
    return {
      backgroundColor: this.getBackgroundColor(seed),
      bodyColor: this.getBodyColor(seed2),
      cheekColor: this.getCheekColor(seed3),
      hasGlasses: (seed % 3) === 0,
      hasNecklace: (seed % 4) === 0,
      capColor: this.getCapColor(seed),
      expression: this.getExpression(seed2),
      tailPattern: (seed3 % 5),
      hasBowtie: (seed2 % 7) === 0,
      hasBandana: (seed3 % 6) === 0,
    };
  }

  private getBackgroundColor(seed: number): string {
    const colors = [
      '#FFE4B5', '#E6E6FA', '#F0F8FF', '#FFF8DC', '#F5F5DC',
      '#FFB6C1', '#E0FFFF', '#F5DEB3', '#FFF0F5', '#F0E68C',
      '#D8BFD8', '#FAFAD2', '#FFE4E1', '#E0E0E0', '#FDF5E6'
    ];
    return colors[seed % colors.length];
  }

  private getCapColor(seed: number): string {
    const colors = [
      '#0052FF', '#00D4FF', '#FF6B35', '#28A745', '#FFC107',
      '#9B59B6', '#E74C3C', '#1ABC9C', '#F39C12', '#34495E',
      '#FF1493', '#00CED1', '#FF4500', '#32CD32', '#FFD700'
    ];
    return colors[seed % colors.length];
  }

  private getBodyColor(seed: number): string {
    const colors = [
      '#FFD700', // Classic yellow
      '#FFE135', // Bright yellow
      '#FFC500', // Golden yellow
      '#FFB700', // Deep yellow
      '#FFF44F', // Light yellow
      '#FFE873', // Cream yellow
      '#FFDB58', // Mustard yellow
      '#FFA500', // Orange tint
    ];
    return colors[seed % colors.length];
  }

  private getCheekColor(seed: number): string {
    const colors = [
      '#FF69B4', // Hot pink
      '#FF1493', // Deep pink
      '#FF6B9D', // Medium pink
      '#FF85A1', // Light pink
      '#FF4500', // Orange red
      '#FF0066', // Bright pink
      '#FF91A4', // Soft pink
    ];
    return colors[seed % colors.length];
  }

  private getExpression(seed: number): string {
    const expressions = ['happy', 'wink', 'excited', 'cool', 'cute'];
    return expressions[seed % expressions.length];
  }

  private drawBackground(color: string) {
    // Create gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, this.lightenColor(color, 20));
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, 512, 512);
    
    // Add some texture
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 10 + 5;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawPikachuWithTraits(traits: any) {
    const ctx = this.ctx;
    const bodyColor = traits.bodyColor;
    const cheekColor = traits.cheekColor;
    
    // Pikachu body
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(256, 300, 80, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Pikachu head
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(256, 180, 70, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(200, 120);
    ctx.lineTo(180, 80);
    ctx.lineTo(220, 100);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(312, 120);
    ctx.lineTo(332, 80);
    ctx.lineTo(292, 100);
    ctx.closePath();
    ctx.fill();
    
    // Ear tips (black)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(180, 80);
    ctx.lineTo(190, 60);
    ctx.lineTo(200, 80);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(332, 80);
    ctx.lineTo(322, 60);
    ctx.lineTo(312, 80);
    ctx.closePath();
    ctx.fill();
    
    // Nose
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(256, 175);
    ctx.lineTo(252, 185);
    ctx.lineTo(260, 185);
    ctx.closePath();
    ctx.fill();
    
    // Mouth
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(256, 200, 15, 0, Math.PI);
    ctx.stroke();
    
    // Draw expression (eyes)
    this.drawExpression(traits.expression);
    
    // Cheeks (colorful circles)
    ctx.fillStyle = cheekColor;
    ctx.beginPath();
    ctx.arc(200, 190, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(312, 190, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Arms
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(200, 280, 25, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(312, 280, 25, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Legs
    ctx.beginPath();
    ctx.ellipse(230, 380, 30, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(282, 380, 30, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Tail with variation
    this.drawTail(bodyColor, traits.tailPattern);
  }

  private drawExpression(expression: string) {
    const ctx = this.ctx;
    
    // Eyes based on expression
    ctx.fillStyle = '#000000';
    
    if (expression === 'wink') {
      // Left eye winking
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(230, 160);
      ctx.lineTo(250, 160);
      ctx.stroke();
      // Right eye normal
      ctx.beginPath();
      ctx.arc(272, 160, 8, 0, Math.PI * 2);
      ctx.fill();
      // Eye highlight
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(274, 158, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (expression === 'excited') {
      // Bigger eyes
      ctx.beginPath();
      ctx.arc(240, 160, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(272, 160, 10, 0, Math.PI * 2);
      ctx.fill();
      // Extra highlights
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(243, 157, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(275, 157, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Normal eyes (default case)
      ctx.beginPath();
      ctx.arc(240, 160, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(272, 160, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye highlights
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(242, 158, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(274, 158, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawTail(bodyColor: string, pattern: number) {
    const ctx = this.ctx;
    
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(180, 320);
    ctx.quadraticCurveTo(120, 300, 100, 350);
    ctx.quadraticCurveTo(80, 400, 120, 420);
    ctx.quadraticCurveTo(160, 440, 180, 400);
    ctx.closePath();
    ctx.fill();
    
    // Tail stripes with variation
    const stripeColors = ['#8B4513', '#654321', '#A0522D', '#CD853F', '#D2691E'];
    ctx.fillStyle = stripeColors[pattern % stripeColors.length];
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(140 + i * 15, 380 + i * 10, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawBaseCap(capColor: string) {
    const ctx = this.ctx;
    
    // Cap base
    ctx.fillStyle = capColor;
    ctx.beginPath();
    ctx.ellipse(256, 130, 75, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cap top
    ctx.fillStyle = capColor;
    ctx.beginPath();
    ctx.ellipse(256, 100, 60, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Base logo (simplified)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('BASE', 256, 140);
    
    // Cap brim (darker shade)
    const darkerShade = this.darkenColor(capColor, 20);
    ctx.fillStyle = darkerShade;
    ctx.beginPath();
    ctx.ellipse(256, 150, 85, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawGlasses() {
    const ctx = this.ctx;
    
    // Glasses frame
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(240, 160, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(272, 160, 20, 0, Math.PI * 2);
    ctx.stroke();
    
    // Bridge
    ctx.beginPath();
    ctx.moveTo(260, 160);
    ctx.lineTo(252, 160);
    ctx.stroke();
    
    // Arms
    ctx.beginPath();
    ctx.moveTo(220, 160);
    ctx.lineTo(200, 150);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(292, 160);
    ctx.lineTo(312, 150);
    ctx.stroke();
  }

  private drawNecklace() {
    const ctx = this.ctx;
    
    // Necklace chain
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(256, 250, 30, 0, Math.PI);
    ctx.stroke();
    
    // Pendant (Base logo)
    ctx.fillStyle = '#0052FF';
    ctx.beginPath();
    ctx.ellipse(256, 280, 8, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('B', 256, 285);
  }

  private drawTokenId(tokenId: number) {
    const ctx = this.ctx;
    
    // Token ID watermark
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`#${tokenId}`, 500, 30);
  }

  private generateMetadata(tokenId: number, traits: any, base64Image: string) {
    const attributes = [
      { trait_type: 'Character', value: 'Pikachu' },
      { trait_type: 'Cap', value: 'Base Logo Cap' },
      { trait_type: 'Body Color', value: traits.bodyColor },
      { trait_type: 'Cheek Color', value: traits.cheekColor },
      { trait_type: 'Cap Color', value: traits.capColor },
      { trait_type: 'Expression', value: traits.expression },
    ];

    if (traits.hasGlasses) {
      attributes.push({ trait_type: 'Accessory', value: 'Glasses' });
    }

    if (traits.hasNecklace) {
      attributes.push({ trait_type: 'Accessory', value: 'Base Logo Necklace' });
    }

    if (traits.hasBowtie) {
      attributes.push({ trait_type: 'Accessory', value: 'Bowtie' });
    }

    if (traits.hasBandana) {
      attributes.push({ trait_type: 'Accessory', value: 'Bandana' });
    }

    return {
      name: `BMG #${tokenId}`,
      description: 'A unique Based Pikachu.',
      image: `data:image/png;base64,${base64Image}`,
      external_url: 'https://basemint-genesis.vercel.app',
      attributes: attributes,
      background_color: traits.backgroundColor,
      animation_url: null,
      youtube_url: null,
    };
  }

  private drawBowtie() {
    const ctx = this.ctx;
    
    // Bowtie
    ctx.fillStyle = '#FF1493';
    ctx.beginPath();
    ctx.moveTo(240, 260);
    ctx.lineTo(250, 270);
    ctx.lineTo(240, 280);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(272, 260);
    ctx.lineTo(262, 270);
    ctx.lineTo(272, 280);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#C71585';
    ctx.beginPath();
    ctx.ellipse(256, 270, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawBandana() {
    const ctx = this.ctx;
    
    // Bandana around neck
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.arc(256, 240, 35, 0, Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#FF4500';
    ctx.stroke();
    
    // Bandana knot
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.moveTo(285, 240);
    ctx.lineTo(305, 250);
    ctx.lineTo(295, 265);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(285, 240);
    ctx.lineTo(305, 230);
    ctx.lineTo(295, 215);
    ctx.closePath();
    ctx.fill();
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (0x1000000 + (R > 0 ? R : 0) * 0x10000 +
      (G > 0 ? G : 0) * 0x100 +
      (B > 0 ? B : 0)).toString(16).slice(1);
  }
}
