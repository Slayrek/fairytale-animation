export class ScreenManager {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public readonly VIRTUAL_WIDTH = 256;
  public readonly VIRTUAL_HEIGHT = 144;

  constructor(canvasId: string, _containerId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas not found');
    }
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error('2D context not available');
    this.ctx = ctx;

    this.ctx.imageSmoothingEnabled = false;

    window.addEventListener('resize', () => this.handleResize());
    this.handleResize();
  }

  public handleResize(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Lossless integer scaling or maximum fit with preserved 16:9 ratio
    const scaleX = Math.floor(windowWidth / this.VIRTUAL_WIDTH);
    const scaleY = Math.floor(windowHeight / this.VIRTUAL_HEIGHT);
    
    // Choose integer scale if possible, otherwise min 1
    let scale = Math.min(scaleX, scaleY);
    if (scale < 1) scale = 1;

    // Apply exact integer scale to preserve 8x8 pixel crispness
    const targetWidth = this.VIRTUAL_WIDTH * scale;
    const targetHeight = this.VIRTUAL_HEIGHT * scale;

    this.canvas.style.width = `${targetWidth}px`;
    this.canvas.style.height = `${targetHeight}px`;

    // Make sure context retains crispness
    this.ctx.imageSmoothingEnabled = false;
  }
}
