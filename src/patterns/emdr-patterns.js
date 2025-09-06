/**
 * EMDR Motion Patterns Module
 * Complete implementation of therapeutic movement patterns
 */

export class EMDRPatterns {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = {
      speed: options.speed || 1.0,
      size: options.size || 30,
      color: options.color || '#4CAF50',
      pattern: options.pattern || 'horizontal',
      ...options
    };
    this.time = 0;
    this.isRunning = false;
  }

  /**
   * Calculate position based on pattern type
   */
  getPosition(pattern, time, size) {
    const effectiveTime = time * this.options.speed;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    switch(pattern) {
      case 'horizontal':
        return [
          centerX + Math.sin(effectiveTime) * size * 5,
          centerY,
          0
        ];
        
      case 'infinity':
        return [
          centerX + Math.sin(effectiveTime) * size * 5,
          centerY + Math.sin(effectiveTime * 2) * size * 2.5,
          0
        ];
        
      case 'diagonal':
        return [
          centerX + Math.sin(effectiveTime) * size * 4,
          centerY + Math.cos(effectiveTime) * size * 3,
          0
        ];
        
      case 'circular':
        return [
          centerX + Math.cos(effectiveTime) * size * 4,
          centerY + Math.sin(effectiveTime) * size * 4,
          0
        ];
        
      case 'butterfly':
        const butterflyScale = size * 0.1;
        return [
          centerX + Math.sin(effectiveTime) * Math.cos(effectiveTime) * size * 5,
          centerY + Math.sin(effectiveTime) * Math.sin(effectiveTime) * size * 3,
          Math.sin(effectiveTime * 3) * butterflyScale // Z-depth for 3D effect
        ];
        
      case 'spiral':
        const radius = (Math.sin(effectiveTime / 3) + 1) * size * 3;
        return [
          centerX + Math.cos(effectiveTime * 3) * radius,
          centerY + Math.sin(effectiveTime * 3) * radius,
          radius / 100 // Z-depth based on radius
        ];
        
      case 'wave':
        return [
          centerX + (effectiveTime % (Math.PI * 2) - Math.PI) * size * 3,
          centerY + Math.sin(effectiveTime * 2) * size * 2,
          Math.cos(effectiveTime) * size * 0.05
        ];
        
      case 'figure8':
        const t = effectiveTime;
        return [
          centerX + Math.sin(t) * size * 4,
          centerY + Math.sin(t * 2) / 2 * size * 4,
          0
        ];
        
      case 'random_smooth':
        // Perlin noise-like smooth random movement
        const noiseX = this.smoothNoise(effectiveTime, 1);
        const noiseY = this.smoothNoise(effectiveTime, 2);
        return [
          centerX + noiseX * size * 4,
          centerY + noiseY * size * 4,
          0
        ];
        
      default:
        return [centerX, centerY, 0];
    }
  }

  /**
   * Smooth noise function for random pattern
   */
  smoothNoise(t, seed) {
    const x = t + seed * 100;
    return Math.sin(x) * 0.5 + Math.sin(x * 2.1) * 0.25 + Math.sin(x * 4.3) * 0.125;
  }

  /**
   * Draw the EMDR object with effects
   */
  drawObject(x, y, z) {
    const ctx = this.ctx;
    const baseSize = this.options.size;
    const size = baseSize * (1 + z * 0.1); // Size based on Z-depth
    
    // Clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw trail effect
    if (this.options.trail) {
      this.drawTrail(x, y);
    }
    
    // Draw glow effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
    gradient.addColorStop(0, this.options.color + '40');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw main object
    ctx.fillStyle = this.options.color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw inner highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(x - size/3, y - size/3, size/3, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Trail effect for smooth movement visualization
   */
  drawTrail(x, y) {
    if (!this.trail) {
      this.trail = [];
    }
    
    this.trail.push({ x, y, time: Date.now() });
    
    // Remove old trail points
    const now = Date.now();
    this.trail = this.trail.filter(point => now - point.time < 500);
    
    // Draw trail
    this.trail.forEach((point, index) => {
      const age = (now - point.time) / 500;
      const opacity = (1 - age) * 0.3;
      const size = this.options.size * (1 - age * 0.5);
      
      this.ctx.fillStyle = this.options.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  /**
   * Animation loop
   */
  animate() {
    if (!this.isRunning) return;
    
    this.time += 0.016; // ~60fps
    const [x, y, z] = this.getPosition(this.options.pattern, this.time, 100);
    this.drawObject(x, y, z);
    
    requestAnimationFrame(() => this.animate());
  }

  /**
   * Control methods
   */
  start() {
    this.isRunning = true;
    this.animate();
  }

  pause() {
    this.isRunning = false;
  }

  stop() {
    this.isRunning = false;
    this.time = 0;
    this.trail = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setPattern(pattern) {
    this.options.pattern = pattern;
  }

  setSpeed(speed) {
    this.options.speed = speed;
  }

  setColor(color) {
    this.options.color = color;
  }

  setSize(size) {
    this.options.size = size;
  }

  /**
   * Adaptive adjustment based on emotional state
   */
  adjustToEmotionalState(emotionData) {
    // High stress - slow down and use calming colors
    if (emotionData.stress > 0.7) {
      this.options.speed *= 0.8;
      this.options.color = '#6B8EAF'; // Calming blue
    }
    
    // Low engagement - increase stimulation
    if (emotionData.engagement < 0.3) {
      this.setPattern(this.getRandomPattern());
      this.options.speed *= 1.1;
    }
    
    // High anxiety - use smoother patterns
    if (emotionData.anxiety > 0.6) {
      const smoothPatterns = ['wave', 'infinity', 'circular'];
      const currentIndex = smoothPatterns.indexOf(this.options.pattern);
      if (currentIndex === -1) {
        this.setPattern(smoothPatterns[0]);
      }
    }
  }

  getRandomPattern() {
    const patterns = ['horizontal', 'infinity', 'butterfly', 'spiral', 'wave', 'circular'];
    return patterns[Math.floor(Math.random() * patterns.length)];
  }
}

export default EMDRPatterns;