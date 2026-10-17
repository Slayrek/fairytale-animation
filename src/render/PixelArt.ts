export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export class PixelRenderer {
  private particles: Particle[] = [];
  private waveOffset: number = 0;
  private customSprites: Record<string, HTMLImageElement> = {};
  private outlinedSprites: Record<string, HTMLCanvasElement> = {};

  constructor() {
    this.initParticles();
    this.tryLoadCustomAssets();
  }

  // Pre-load user-supplied assets and generate crisp 1px outlines
  private tryLoadCustomAssets(): void {
    const list = [
      'knight', 'knightnaked', 'sword', 'fairy', 'fairywings', 'apprentice', 'door', 'ring',
      'knight_idle', 'knight_training', 'knight_hero', 'knight_knee',
      'fairy_idle', 'fairy_hover', 'fairy_happy', 'fairy_sparkle',
      'bg_meadow', 'bg_wind_cliff', 'bg_fairy_forest', 'bg_sea_sunset'
    ];

    list.forEach(name => {
      const img = new Image();
      const base = import.meta.env.BASE_URL || './';
      img.src = `${base}assets/sprites/${name}.png`;
      img.onload = () => {
        this.customSprites[name] = img;
        this.outlinedSprites[name] = this.createOutlinedImage(img);
      };
    });
  }

  // Creates a pixel-perfect 1px outline for any 8x8/16x16 sprite
  private createOutlinedImage(img: HTMLImageElement, outlineColor: string = '#120c1f'): HTMLCanvasElement {
    const oc = document.createElement('canvas');
    oc.width = img.width + 2;
    oc.height = img.height + 2;
    const octx = oc.getContext('2d')!;
    octx.imageSmoothingEnabled = false;

    // Draw cardinal neighbors (1px up, down, left, right)
    octx.drawImage(img, 0, 1);
    octx.drawImage(img, 2, 1);
    octx.drawImage(img, 1, 0);
    octx.drawImage(img, 1, 2);

    // Tint outline silhouette
    octx.globalCompositeOperation = 'source-in';
    octx.fillStyle = outlineColor;
    octx.fillRect(0, 0, oc.width, oc.height);

    // Draw original sprite on top in the center
    octx.globalCompositeOperation = 'source-over';
    octx.drawImage(img, 1, 1);

    return oc;
  }

  private initParticles(): void {
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: Math.random() * 256,
        y: Math.random() * 144,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.4 + 0.2,
        size: Math.random() > 0.7 ? 2 : 1,
        color: '#ffc0cb',
        alpha: Math.random() * 0.8 + 0.2,
        life: Math.random() * 100,
        maxLife: 100
      });
    }
  }

  public update(ambientType: string): void {
    this.waveOffset += 0.012; // 3x slower waves

    this.particles.forEach(p => {
      p.life += 0.5;
      p.x += p.vx;
      p.y += p.vy;

      if (ambientType === 'wind') {
        p.vx = -0.6 - Math.random() * 0.3; // gentle wind breeze
        p.vy = 0.05 + (Math.random() - 0.5) * 0.1;
        p.color = '#c9e4de';
      } else if (ambientType === 'storm') {
        p.vx = -3.8 - Math.random() * 2.2; // fierce howling windstorm
        p.vy = (Math.random() - 0.5) * 0.3;
        p.color = Math.random() > 0.4 ? '#e0e7ff' : '#93c5fd';
      } else if (ambientType === 'magic') {
        p.vx = (Math.random() - 0.5) * 0.2;
        p.vy = -0.15 - Math.random() * 0.15;
        p.color = Math.random() > 0.5 ? '#fff3b0' : '#b8e0d2';
      } else if (ambientType === 'sunset_sparkles') {
        p.vx = (Math.random() - 0.5) * 0.1;
        p.vy = -0.08 - Math.random() * 0.1;
        p.color = '#ffd166';
      } else if (ambientType === 'hearts') {
        p.vx = (Math.random() - 0.5) * 0.15;
        p.vy = -0.15 - Math.random() * 0.1;
        p.color = '#ff6b6b';
      } else if (ambientType === 'fireworks') {
        p.vx *= 0.96;
        p.vy += 0.035; // gentle gravity
        if (p.life >= p.maxLife || Math.random() < 0.025) {
          const burstX = 35 + Math.random() * 185;
          const burstY = 12 + Math.random() * 38;
          const palette = ['#f43f5e', '#fbbf24', '#38bdf8', '#c084fc', '#4ade80', '#fb923c', '#ffffff'];
          p.x = burstX;
          p.y = burstY;
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.6 + 0.3;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
          p.color = palette[Math.floor(Math.random() * palette.length)];
          p.life = 0;
          p.maxLife = 30 + Math.random() * 25;
          p.size = Math.random() > 0.4 ? 2 : 1;
        }
      } else {
        // petals
        p.vx = 0.15 + Math.sin(p.life * 0.02) * 0.1;
        p.vy = 0.12;
        p.color = '#f7b2bd';
      }

      if (p.x < 0) p.x = 256;
      if (p.x > 256) p.x = 0;
      if (p.y < 0) p.y = 144;
      if (p.y > 144) p.y = 0;
    });
  }

  public drawBackground(ctx: CanvasRenderingContext2D, bg: string, tick: number): void {
    ctx.imageSmoothingEnabled = false;

    if (bg === 'meadow') {
      this.drawMeadow(ctx, tick);
    } else if (bg === 'training_grounds') {
      this.drawTrainingGrounds(ctx, tick);
    } else if (bg === 'surreal_storm') {
      this.drawSurrealStorm(ctx, tick);
    } else if (bg === 'fairy_village') {
      this.drawFairyVillage(ctx, tick);
    } else if (bg === 'flower_field_door') {
      this.drawFlowerFieldDoor(ctx, tick);
    } else if (bg === 'fairy_street') {
      this.drawFairyStreet(ctx, tick);
    } else if (bg === 'wind_cliff') {
      this.drawWindCliff(ctx, tick);
    } else if (bg === 'fairy_forest') {
      this.drawFairyForest(ctx, tick);
    } else if (bg === 'sea_sunset') {
      this.drawSeaSunset(ctx, tick);
    } else if (bg === 'cliff_proposal') {
      this.drawCliffProposal(ctx, tick);
    } else if (bg === 'wedding_beach') {
      this.drawWeddingBeach(ctx, tick);
    }
  }

  // 1. Seaside Cottage Veranda (Cozy morning by the sea)
  private drawMeadow(ctx: CanvasRenderingContext2D, tick: number): void {
    // 1. Morning Coastal Sky
    const sky = ctx.createLinearGradient(0, 0, 0, 68);
    sky.addColorStop(0, '#7ac5d8'); // soft coastal morning blue
    sky.addColorStop(0.6, '#faedcd'); // warm cream glow
    sky.addColorStop(1, '#ffcbb2'); // peachy sunrise horizon
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 68);

    // Warm morning sun
    ctx.fillStyle = '#fff3b0';
    ctx.fillRect(205, 14, 18, 18);
    ctx.fillStyle = '#ffe6a7';
    ctx.fillRect(203, 16, 22, 14);

    // 2. Calm Morning Sea (in the distance)
    ctx.fillStyle = '#22577a';
    ctx.fillRect(100, 48, 156, 26);
    ctx.fillStyle = '#38a3a5';
    ctx.fillRect(100, 52, 156, 12);

    // Morning sea wave ripples
    ctx.fillStyle = '#80ed99';
    for (let y = 50; y < 64; y += 4) {
      const waveShift = Math.floor(Math.sin(y * 0.3 + tick * 0.02) * 6);
      ctx.fillRect(110 + waveShift, y, 18, 1);
      ctx.fillRect(160 + waveShift, y + 2, 24, 1);
      ctx.fillRect(215 + waveShift, y + 1, 20, 1);
    }

    // Sandy coastline / Green garden
    ctx.fillStyle = '#57cc99';
    ctx.fillRect(90, 64, 166, 30);
    ctx.fillStyle = '#38b000';
    ctx.fillRect(90, 64, 166, 2);

    // 3. Flower Garden: Lavender & Chamomile
    for (let i = 0; i < 16; i++) {
      const gx = 115 + (i * 9) % 135;
      const gy = 70 + (i * 5) % 18;
      if (i % 2 === 0) {
        // Lavender stalk
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(gx, gy + 2, 1, 4);
        ctx.fillStyle = '#7209b7';
        ctx.fillRect(gx - 1, gy, 3, 2);
        ctx.fillStyle = '#9d4edd';
        ctx.fillRect(gx, gy - 2, 1, 2);
      } else {
        // Chamomile daisy
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(gx, gy + 2, 1, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gx - 1, gy, 3, 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(gx, gy, 1, 1);
      }
    }

    // 4. Wooden Seaside Cottage (Left side)
    // Wall timber planks
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(0, 0, 85, 90);
    ctx.fillStyle = '#582f0e';
    for (let px = 8; px <= 80; px += 8) {
      ctx.fillRect(px, 0, 1, 90); // vertical wood seams
    }

    // Roof eaves / Overhang
    ctx.fillStyle = '#936639';
    ctx.fillRect(0, 0, 95, 14);
    ctx.fillStyle = '#582f0e';
    ctx.fillRect(0, 14, 95, 2);

    // Cozy open doorway
    ctx.fillStyle = '#2d1808';
    ctx.fillRect(12, 18, 30, 64);
    ctx.fillStyle = '#c5a059'; // warm interior morning light
    ctx.fillRect(16, 24, 22, 54);

    // 5. Polished Knight Armor stand (drying lavender & peaches in helmet!)
    const ax = 22;
    const ay = 44;
    // Stand post
    ctx.fillStyle = '#582f0e';
    ctx.fillRect(ax + 3, ay + 12, 4, 18);
    // Silver Chestplate
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(ax, ay + 6, 10, 10);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(ax + 1, ay + 7, 8, 8);
    ctx.fillStyle = '#f8fafc'; // polished silver shine
    ctx.fillRect(ax + 2, ay + 7, 2, 5);

    // Dried lavender & mint bundles hanging from armor shoulder
    ctx.fillStyle = '#7209b7';
    ctx.fillRect(ax - 2, ay + 6, 2, 5);
    ctx.fillStyle = '#9d4edd';
    ctx.fillRect(ax - 1, ay + 8, 2, 4);
    ctx.fillStyle = '#52b788'; // mint leaves
    ctx.fillRect(ax - 2, ay + 11, 2, 2);

    // Helmet on stool serving as peach basket
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(ax + 14, ay + 14, 8, 6);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(ax + 15, ay + 17, 6, 3);
    // Juicy peaches inside helmet!
    ctx.fillStyle = '#fb8500';
    ctx.fillRect(ax + 15, ay + 13, 3, 3);
    ctx.fillRect(ax + 18, ay + 13, 3, 3);
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(ax + 16, ay + 13, 1, 1);

    // 6. Wooden Veranda Deck (Extending outside)
    ctx.fillStyle = '#b08968';
    ctx.fillRect(45, 74, 100, 14);
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(45, 74, 100, 2);
    ctx.fillRect(45, 87, 100, 2);

    // Veranda railing & post
    ctx.fillStyle = '#936639';
    ctx.fillRect(138, 52, 4, 30); // outer post
    ctx.fillRect(75, 68, 65, 3); // top rail

    // Steaming tea cup on railing
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(128, 63, 4, 5);
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(129, 64, 2, 2); // tea
    // Steam animation
    const steamY = Math.floor(Math.sin(tick * 0.04) * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillRect(129, 58 + steamY, 1, 3);
  }

  // 1b. Training Grounds (Knight Academy yard with practice targets)
  private drawTrainingGrounds(ctx: CanvasRenderingContext2D, tick: number): void {
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, 80);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(1, '#bae6fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 80);

    // Warm sun
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(215, 12, 14, 14);

    // Fluffy clouds drifting
    ctx.fillStyle = '#ffffff';
    const c1 = (tick * 0.06) % 320;
    ctx.fillRect(50 - c1, 20, 36, 8);
    ctx.fillRect(60 - c1, 16, 20, 6);
    ctx.fillRect(220 - c1, 30, 44, 9);

    // Stone castle wall in distance
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, 52, 256, 18);
    // Battlements
    for (let bx = 0; bx < 256; bx += 16) {
      ctx.fillRect(bx, 46, 8, 6);
    }

    // Wooden fence / barrier
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, 68, 256, 3);
    for (let px = 8; px < 256; px += 24) {
      ctx.fillRect(px, 62, 3, 10);
    }

    // Sandy dirt training ground
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(0, 70, 256, 74);
    ctx.fillStyle = '#b08968';
    ctx.fillRect(0, 70, 256, 2);

    // Wooden training target dummy on right side
    const tx = 205;
    const ty = 54;
    ctx.fillStyle = '#713f12';
    ctx.fillRect(tx + 4, ty + 6, 4, 16);
    ctx.fillRect(tx - 3, ty + 10, 18, 3);
    ctx.fillStyle = '#a16207';
    ctx.fillRect(tx + 2, ty, 8, 7);
    // Red bullseye target mark
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(tx + 3, ty + 9, 6, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(tx + 5, ty + 10, 2, 2);

    // Blue heraldic pennant banner flapping
    ctx.fillStyle = '#1e3a8a';
    const flap = Math.floor(Math.sin(tick * 0.08) * 2);
    ctx.fillRect(32, 40, 16 + flap, 10);
    ctx.fillStyle = '#f59e0b'; // golden paw print / star on banner
    ctx.fillRect(38, 43, 4, 4);
  }

  // 1c. Surreal Storm (Endless flat lawn, sunk blood-red sun, thunder storm)
  private drawSurrealStorm(ctx: CanvasRenderingContext2D, tick: number): void {
    // Eerie apocalyptic twilight sky on the right
    const sky = ctx.createLinearGradient(0, 0, 256, 0);
    sky.addColorStop(0, '#0f051d'); // pitch black void
    sky.addColorStop(0.35, '#1e0836'); // deep purple storm
    sky.addColorStop(0.7, '#6b1130'); // crimson twilight
    sky.addColorStop(1, '#991b1b'); // fiery horizon
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 72);

    // Sunk blood-red sun (half buried on horizon at x = 185, y = 54)
    const sunPulse = Math.sin(tick * 0.05) * 1;
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(180, 52 - sunPulse, 24, 20 + sunPulse);
    ctx.fillStyle = '#be123c';
    ctx.fillRect(182, 55 - sunPulse, 20, 17 + sunPulse);
    ctx.fillStyle = '#fda4af'; // eerie sliver of light
    ctx.fillRect(184, 52 - sunPulse, 16, 2);

    // Left side: churning black thunderstorm cloud
    const cloudShift = Math.floor(Math.sin(tick * 0.04) * 2);
    ctx.fillStyle = '#090314';
    ctx.fillRect(0, 0, 95 + cloudShift, 72);
    ctx.fillStyle = '#18072b';
    ctx.fillRect(80 + cloudShift, 10, 25, 62);
    ctx.fillRect(70 + cloudShift, 0, 30, 45);

    // Lightning strike (slowed down: fires once every ~360 frames = ~6 seconds, soft non-blinding flash)
    const lightning = (tick % 360 >= 356);
    if (lightning) {
      // Soft atmospheric lavender flash without harsh screen-wide strobing
      ctx.fillStyle = 'rgba(192, 132, 252, 0.18)';
      ctx.fillRect(0, 0, 95, 72);
      ctx.fillStyle = '#f3e8ff';
      // Distant elegant bolt
      ctx.fillRect(45, 2, 2, 14);
      ctx.fillRect(43, 16, 4, 3);
      ctx.fillRect(46, 19, 2, 16);
      ctx.fillRect(44, 35, 3, 2);
      ctx.fillRect(45, 37, 2, 18);
    }

    // "безкрає, ідеально рівне поле, ніби зі штучно вистриженим газоном"
    ctx.fillStyle = '#059669';
    ctx.fillRect(0, 72, 256, 72);
    // Uncannily neat horizontal lawn stripes
    ctx.fillStyle = '#10b981';
    for (let ly = 72; ly < 144; ly += 6) {
      ctx.fillRect(0, ly, 256, 3);
    }

    // Ferocious horizontal wind speedlines (cutscene gale)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let w = 0; w < 12; w++) {
      const wx = (320 - ((tick * 5 + w * 38) % 380));
      const wy = 15 + (w * 11) % 55;
      ctx.fillRect(wx, wy, 35, 1);
    }

    // Flying blades of torn grass in the ferocious wind
    ctx.fillStyle = '#34d399';
    for (let g = 0; g < 8; g++) {
      const gx = (300 - ((tick * 6 + g * 47) % 350));
      const gy = 60 + (g * 9) % 30;
      ctx.fillRect(gx, gy, 3, 1);
      ctx.fillRect(gx + 1, gy - 1, 1, 1);
    }
  }

  // 1d. Fairy Village (Whimsical fairytale village with mushroom houses)
  private drawFairyVillage(ctx: CanvasRenderingContext2D, tick: number): void {
    // Whimsical pastel sky
    const sky = ctx.createLinearGradient(0, 0, 0, 75);
    sky.addColorStop(0, '#c7d2fe'); // soft lavender blue
    sky.addColorStop(0.5, '#fbcfe8'); // dreamy pink
    sky.addColorStop(1, '#fef08a'); // golden fairy morning
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 75);

    // Distant whimsical purple hills
    ctx.fillStyle = '#818cf8';
    for (let x = 0; x < 256; x += 32) {
      const h = Math.sin(x * 0.04) * 10 + 52;
      ctx.fillRect(x, h, 32, 75 - h);
    }

    // Green clover hills in middleground
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(0, 68, 256, 76);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(0, 68, 256, 3);

    // Whimsical Mushroom Cottages
    // 1. Red mushroom house on left
    const mx = 30;
    const my = 40;
    // Stalk / stem
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(mx + 6, my + 14, 14, 20);
    // Wooden door
    ctx.fillStyle = '#78350f';
    ctx.fillRect(mx + 10, my + 22, 6, 12);
    // Mushroom cap
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(mx, my, 26, 14);
    ctx.fillRect(mx + 4, my - 4, 18, 6);
    // White polka dots
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(mx + 4, my + 3, 3, 3);
    ctx.fillRect(mx + 14, my + 2, 4, 3);
    ctx.fillRect(mx + 10, my + 8, 3, 3);

    // 2. Smaller blue mushroom cottage on right
    const rx = 205;
    const ry = 48;
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(rx + 4, ry + 10, 10, 16);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(rx + 7, ry + 16, 4, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(rx, ry, 18, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(rx + 4, ry + 2, 2, 2);
    ctx.fillRect(rx + 11, ry + 4, 2, 2);

    // Giant fairytale flower swaying
    const sway = Math.floor(Math.sin(tick * 0.05) * 2);
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(100, 52, 2, 22);
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(96 + sway, 46, 10, 8);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(99 + sway, 49, 4, 3);
  }

  // 1e. Flower Field with Door (Golden wheat, clover, and the wooden door with wreath)
  private drawFlowerFieldDoor(ctx: CanvasRenderingContext2D, tick: number): void {
    // Warm afternoon sunset gradient
    const sky = ctx.createLinearGradient(0, 0, 0, 72);
    sky.addColorStop(0, '#60a5fa');
    sky.addColorStop(0.5, '#fdba74');
    sky.addColorStop(1, '#fde047');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 72);

    // Golden sun low in sky
    ctx.fillStyle = '#fffbeb';
    ctx.fillRect(195, 20, 16, 16);

    // Golden wheat / clover field
    ctx.fillStyle = '#eab308';
    ctx.fillRect(0, 68, 256, 76);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(0, 68, 256, 3);

    // Swaying wheat stalks in foreground
    for (let x = 4; x < 256; x += 12) {
      const sw = Math.floor(Math.sin((x + tick) * 0.04) * 2);
      ctx.fillStyle = '#a16207';
      ctx.fillRect(x, 70, 1, 14);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(x + sw, 64, 2, 6);
    }

    // Red poppies & white daisies in grass
    for (let i = 0; i < 14; i++) {
      const fx = (i * 19 + 5) % 250;
      const fy = 82 + (i * 5) % 18;
      ctx.fillStyle = i % 2 === 0 ? '#ef4444' : '#ffffff';
      ctx.fillRect(fx, fy, 2, 2);
    }
  }

  // 1f. Fairy Street with Paint Spills (Old Elf's house, cobblestones, spilled paint puddles)
  private drawFairyStreet(ctx: CanvasRenderingContext2D, _tick: number): void {
    // Cozy afternoon village sky
    const sky = ctx.createLinearGradient(0, 0, 0, 65);
    sky.addColorStop(0, '#93c5fd');
    sky.addColorStop(1, '#fed7aa');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 65);

    // Old Elf's Cottage Wall on left
    ctx.fillStyle = '#fef3c7'; // warm plaster
    ctx.fillRect(0, 15, 110, 60);
    // Dark timber beams
    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, 15, 110, 4);
    ctx.fillRect(0, 60, 110, 4);
    ctx.fillRect(25, 15, 4, 49);
    ctx.fillRect(80, 15, 4, 49);
    // Cottage window
    ctx.fillStyle = '#fde047';
    ctx.fillRect(40, 26, 24, 20);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(51, 26, 2, 20);
    ctx.fillRect(40, 35, 24, 2);

    // Cobblestone paved street
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, 68, 256, 76);
    ctx.fillStyle = '#334155';
    // Cobblestone texture bricks
    for (let cy = 70; cy < 100; cy += 6) {
      const offset = (cy % 12 === 0) ? 0 : 7;
      for (let cx = offset; cx < 256; cx += 14) {
        ctx.fillRect(cx, cy, 12, 1);
        ctx.fillRect(cx, cy, 1, 5);
      }
    }

    // Spilled vibrant paint cans & puddles!
    // Blue puddle
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(115, 76, 16, 5);
    ctx.fillRect(118, 74, 10, 8);
    // Green puddle
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(135, 78, 14, 4);
    ctx.fillRect(138, 75, 8, 8);
    // Gold paint puddle
    ctx.fillStyle = '#eab308';
    ctx.fillRect(124, 82, 18, 5);
    ctx.fillRect(128, 80, 10, 7);

    // Fallen paint cans / buckets
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(108, 74, 5, 4); // tipped blue can
    ctx.fillRect(150, 75, 4, 5); // tipped green bucket
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(109, 75, 2, 2);
  }

  // 2. Wind Cliff (Heroic, windy mountain)
  private drawWindCliff(ctx: CanvasRenderingContext2D, tick: number): void {
    // Gloomy epic sky
    const sky = ctx.createLinearGradient(0, 0, 0, 100);
    sky.addColorStop(0, '#272640');
    sky.addColorStop(1, '#4a4e69');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 100);

    // Fast moving wind clouds
    ctx.fillStyle = '#6b705c';
    const cloudShift = (tick * 0.8) % 300;
    ctx.fillRect(256 - cloudShift, 18, 50, 8);
    ctx.fillRect(180 - cloudShift, 32, 70, 10);
    ctx.fillRect(340 - cloudShift, 25, 40, 6);

    // Jagged mountain peaks
    ctx.fillStyle = '#312244';
    ctx.beginPath();
    ctx.moveTo(0, 90);
    ctx.lineTo(60, 45);
    ctx.lineTo(130, 85);
    ctx.lineTo(200, 35);
    ctx.lineTo(256, 75);
    ctx.lineTo(256, 144);
    ctx.lineTo(0, 144);
    ctx.fill();

    // Dark cliff ground
    ctx.fillStyle = '#1d1a31';
    ctx.fillRect(0, 80, 256, 64);
    ctx.fillStyle = '#3e1f47';
    ctx.fillRect(0, 78, 256, 3);
  }

  // 3. Fairy Forest (Emerald magic)
  private drawFairyForest(ctx: CanvasRenderingContext2D, tick: number): void {
    // Deep twilight forest canopy
    const sky = ctx.createLinearGradient(0, 0, 0, 144);
    sky.addColorStop(0, '#0d1b2a');
    sky.addColorStop(1, '#1b4332');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 144);

    // Massive tree trunks
    ctx.fillStyle = '#081c15';
    ctx.fillRect(15, 0, 24, 144);
    ctx.fillRect(110, 0, 30, 144);
    ctx.fillRect(215, 0, 26, 144);

    // Bioluminescent moss & mushrooms
    ctx.fillStyle = '#52b788';
    ctx.fillRect(0, 85, 256, 60);

    const glowColor = Math.sin(tick * 0.08) > 0 ? '#74c69d' : '#95d5b2';
    ctx.fillStyle = glowColor;
    ctx.fillRect(45, 82, 4, 4);
    ctx.fillRect(160, 80, 5, 5);
    ctx.fillRect(200, 84, 3, 3);
  }

  // 4. Sea Sunset (Romantic, golden-pink waves)
  private drawSeaSunset(ctx: CanvasRenderingContext2D, tick: number): void {
    // Sunset gradient
    const sky = ctx.createLinearGradient(0, 0, 0, 75);
    sky.addColorStop(0, '#5e2a84');
    sky.addColorStop(0.4, '#c75276');
    sky.addColorStop(0.8, '#f78361');
    sky.addColorStop(1, '#f9c784');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 75);

    // Big setting sun
    ctx.fillStyle = '#ffefa0';
    ctx.fillRect(116, 36, 24, 24);

    // Sea water
    ctx.fillStyle = '#3a506b';
    ctx.fillRect(0, 75, 256, 40);

    // Ocean waves (animated horizontal 8-bit lines)
    ctx.fillStyle = '#5bc0be';
    for (let y = 78; y < 110; y += 4) {
      const offset = Math.sin(y * 0.2 + this.waveOffset) * 12;
      ctx.fillRect((offset + tick * 0.2) % 256, y, 20, 2);
      ctx.fillRect((offset + 80 + tick * 0.2) % 256, y, 32, 1);
      ctx.fillRect((offset + 170 + tick * 0.2) % 256, y, 24, 1);
    }

    // Sandy beach at bottom
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(0, 105, 256, 40);
    ctx.fillStyle = '#f4a261';
    ctx.fillRect(0, 103, 256, 3);
  }

  // 5. Cliff Proposal (Majestic sunset cliff over ocean, table with candles & dried flowers)
  private drawCliffProposal(ctx: CanvasRenderingContext2D, tick: number): void {
    // 1. Majestic ocean sunset gradient
    const sky = ctx.createLinearGradient(0, 0, 0, 75);
    sky.addColorStop(0, '#311042'); // deep twilight purple
    sky.addColorStop(0.3, '#701a75'); // fuchsia wine
    sky.addColorStop(0.65, '#e11d48'); // glowing crimson rose
    sky.addColorStop(0.9, '#f97316'); // molten gold-orange horizon
    sky.addColorStop(1, '#fde047');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 75);

    // Glowing sinking sun
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(175, 68, 14, 0, Math.PI * 2);
    ctx.fill();

    // 2. Ocean water reflecting molten gold
    const ocean = ctx.createLinearGradient(0, 72, 0, 144);
    ocean.addColorStop(0, '#b91c1c');
    ocean.addColorStop(0.4, '#831843');
    ocean.addColorStop(0.8, '#4c0519');
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 72, 256, 72);

    // Shimmering golden sun-path on the sea
    const waveShift = Math.floor(Math.sin(tick * 0.04) * 3);
    ctx.fillStyle = '#fde047';
    for (let wy = 74; wy < 140; wy += 4) {
      const spread = (wy - 70) * 0.8;
      const wx = 175 + waveShift + Math.floor(Math.sin(wy + tick * 0.08) * 3);
      ctx.fillRect(wx - spread * 0.5, wy, spread, 1);
    }

    // 3. Grassy Cliff on the left (elevated plateau over ocean)
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.moveTo(0, 144);
    ctx.lineTo(0, 68);
    ctx.lineTo(135, 68);
    ctx.lineTo(155, 82);
    ctx.lineTo(162, 144);
    ctx.closePath();
    ctx.fill();

    // Cliff rock textures
    ctx.fillStyle = '#292524';
    ctx.fillRect(115, 78, 25, 45);
    ctx.fillRect(135, 95, 20, 35);
    ctx.fillStyle = '#44403c';
    ctx.fillRect(80, 85, 40, 20);

    // Lush green cliff turf top
    ctx.fillStyle = '#065f46';
    ctx.fillRect(0, 66, 140, 6);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(0, 64, 136, 3);
    // Flower specks on grass
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(20, 63, 2, 2);
    ctx.fillRect(58, 63, 2, 2);
    ctx.fillRect(112, 63, 2, 2);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(35, 63, 2, 2);
    ctx.fillRect(88, 63, 2, 2);

    // 4. Romantic Picnic Table on the cliff edge
    // Table legs and wooden surface
    ctx.fillStyle = '#451a03';
    ctx.fillRect(32, 60, 22, 6);
    ctx.fillRect(34, 66, 2, 7);
    ctx.fillRect(50, 66, 2, 7);
    // Elegant white tablecloth draped
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(30, 58, 26, 4);
    ctx.fillRect(31, 62, 24, 2);
    // Glass candle lanterns with flickering flame
    ctx.fillStyle = '#cbd5e1'; // glass lantern frame
    ctx.fillRect(33, 52, 5, 6);
    ctx.fillRect(50, 53, 5, 5);
    const flameFlicker = (tick % 16 < 8) ? 0 : 1;
    ctx.fillStyle = '#fde047'; // candle glow
    ctx.fillRect(35, 54 + flameFlicker, 2, 2);
    ctx.fillStyle = '#f97316';
    ctx.fillRect(35, 53 + flameFlicker, 1, 1);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(52, 55, 2, 2);

    // Clay vase with dried flowers (lavender, daisy, strawflower)
    ctx.fillStyle = '#b45309'; // vase
    ctx.fillRect(41, 54, 5, 5);
    ctx.fillStyle = '#a855f7'; // lavender sprigs
    ctx.fillRect(41, 50, 2, 4);
    ctx.fillStyle = '#ffffff'; // chamomile
    ctx.fillRect(43, 49, 2, 2);
    ctx.fillStyle = '#fde047'; // golden flower
    ctx.fillRect(44, 51, 2, 3);
  }

  // 6. Wedding Beach (Night ocean, blue/gold swing, dancing fairies, celebration lanterns)
  private drawWeddingBeach(ctx: CanvasRenderingContext2D, tick: number): void {
    // 1. Midnight sea sky with stars
    const sky = ctx.createLinearGradient(0, 0, 0, 75);
    sky.addColorStop(0, '#060714');
    sky.addColorStop(0.5, '#0c102a');
    sky.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 256, 75);

    // Crescent silver moon
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(220, 24, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0a0d20';
    ctx.beginPath();
    ctx.arc(223, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    // Twinkling stars
    ctx.fillStyle = '#ffffff';
    const starCoords = [
      [15, 12], [42, 8], [80, 20], [115, 14], [150, 9], [185, 18], [240, 32],
      [30, 35], [70, 40], [130, 30], [170, 25], [205, 12]
    ];
    starCoords.forEach(([sx, sy], idx) => {
      if ((tick + idx * 7) % 30 < 20) {
        ctx.fillRect(sx, sy, 1, 1);
      }
    });

    // 2. Night ocean
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 72, 256, 72);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 80, 256, 64);

    // Moonbeams & gentle nocturnal wave crests
    ctx.fillStyle = 'rgba(248, 250, 252, 0.4)';
    for (let wy = 74; wy < 110; wy += 5) {
      const wx = 215 + Math.floor(Math.sin(wy + tick * 0.05) * 4);
      ctx.fillRect(wx - 10, wy, 20, 1);
    }
    // Blue wave foam lines
    ctx.fillStyle = '#38bdf8';
    for (let wy = 82; wy < 112; wy += 8) {
      const wx = (wy * 3 + tick) % 240;
      ctx.fillRect(wx, wy, 16, 1);
    }

    // 3. Sandy Shoreline
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 102, 256, 42);
    ctx.fillStyle = '#292524';
    ctx.fillRect(0, 106, 256, 38);
    // Wet tidal line
    ctx.fillStyle = '#44403c';
    ctx.fillRect(0, 103, 256, 2);

    // 4. Carved Blue & Gold Swing (Gift from old Elf)
    const swingX = 24;
    const swingY = 68;
    // Wooden A-frame posts (royal celestial blue)
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(swingX, swingY, 3, 38);
    ctx.fillRect(swingX + 28, swingY, 3, 38);
    ctx.fillRect(swingX - 2, swingY, 35, 4);
    // Gold trim on top and base
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(swingX - 3, swingY - 1, 37, 2);
    ctx.fillRect(swingX - 1, swingY + 36, 5, 2);
    ctx.fillRect(swingX + 27, swingY + 36, 5, 2);
    // Carved flower wreaths on the swing posts
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(swingX + 1, swingY + 12, 3, 3);
    ctx.fillRect(swingX + 27, swingY + 12, 3, 3);
    // Hanging ropes & bench (gently swaying)
    const swingSway = Math.floor(Math.sin(tick * 0.03) * 2);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(swingX + 8 + swingSway, swingY + 4, 1, 24);
    ctx.fillRect(swingX + 22 + swingSway, swingY + 4, 1, 24);
    // Carved bench
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(swingX + 6 + swingSway, swingY + 28, 18, 4);
    ctx.fillStyle = '#fbbf24'; // gold seat cushion
    ctx.fillRect(swingX + 7 + swingSway, swingY + 27, 16, 2);

    // 5. Festive Hanging Fairy Lanterns
    ctx.fillStyle = '#475569';
    // Rope line
    for (let x = 60; x < 250; x += 4) {
      const sag = Math.floor(Math.sin((x - 60) / 190 * Math.PI) * 5);
      ctx.fillRect(x, 52 + sag, 4, 1);
    }
    // Glowing colorful paper lanterns
    const lanternColors = ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#22c55e', '#fb923c'];
    lanternColors.forEach((col, i) => {
      const lx = 75 + i * 28;
      const sag = Math.floor(Math.sin((lx - 60) / 190 * Math.PI) * 5);
      const ly = 54 + sag;
      ctx.fillStyle = col;
      ctx.fillRect(lx, ly, 5, 6);
      // Golden glow beneath
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(lx + 1, ly + 2, 3, 3);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
      ctx.fillRect(lx - 2, ly - 1, 9, 10);
    });

    // 6. Old Elf & celebratory background figures
    // Old Elf in green robe with white beard near the swing
    const elfX = 58;
    const elfY = 96;
    ctx.fillStyle = '#065f46'; // green robe
    ctx.fillRect(elfX, elfY + 4, 6, 8);
    ctx.fillStyle = '#fed7aa'; // elf head
    ctx.fillRect(elfX + 1, elfY, 4, 4);
    ctx.fillStyle = '#f8fafc'; // white elf beard
    ctx.fillRect(elfX + 1, elfY + 4, 4, 3);
    ctx.fillStyle = '#047857'; // elf hat
    ctx.fillRect(elfX + 1, elfY - 2, 4, 2);
    ctx.fillRect(elfX + 2, elfY - 4, 2, 2);

    // 7. Little dancing fairies swirling with sparkles
    for (let f = 0; f < 3; f++) {
      const fAngle = tick * 0.05 + f * 2.1;
      const fx = 78 + Math.floor(Math.cos(fAngle) * 14);
      const fy = 92 + Math.floor(Math.sin(fAngle) * 6);
      ctx.fillStyle = '#fbcfe8'; // fairy body
      ctx.fillRect(fx, fy, 2, 2);
      ctx.fillStyle = '#fde047'; // sparkling wings
      ctx.fillRect(fx - 1, fy - 1, 1, 1);
      ctx.fillRect(fx + 2, fy - 1, 1, 1);
    }
  }

  // Draw ambient particles
  public drawParticles(ctx: CanvasRenderingContext2D, ambientType: string): void {
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      if (ambientType === 'hearts') {
        // Draw 3x3 pixel heart
        ctx.fillRect(p.x, p.y + 1, 3, 2);
        ctx.fillRect(p.x - 1, p.y, 2, 2);
        ctx.fillRect(p.x + 2, p.y, 2, 2);
        ctx.fillRect(p.x + 1, p.y + 3, 1, 1);
      } else if (ambientType === 'fireworks') {
        // Firework spark in sky
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        // Ocean surface reflection
        if (p.y < 72) {
          const reflectY = 74 + Math.floor((72 - p.y) * 0.45);
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.floor(p.x), reflectY, p.size, 1);
        }
      } else {
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }
    });
  }

  // Draw Cat Knight with crisp 1px outline and poses
  public drawKnight(ctx: CanvasRenderingContext2D, x: number, y: number, pose: string, tick: number): void {
    if (pose === 'none') return;

    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));

    // Slow, gentle breathing bounce
    let bounce = Math.floor(Math.sin(tick * 0.035) * 1);
    if (pose === 'struggle') {
      const struggleJitter = (Math.sin(tick * 0.4) > 0) ? -1 : 0;
      bounce = Math.floor(Math.sin(tick * 0.15) * 1); // trembling against storm
      ctx.translate(struggleJitter, 0);
      ctx.rotate(-0.08); // leaning forward heavily against the gale
    }
    ctx.translate(0, bounce);

    const scale = 2; // integer 2x scale for 8x8 sprite

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(-1 * scale, 7 * scale, 9 * scale, 1 * scale);

    const isNaked = pose === 'naked' || pose === 'crying_naked' || pose === 'knee_naked';
    const knightSpr = isNaked
      ? (this.outlinedSprites['knightnaked'] || this.customSprites['knightnaked'] || this.outlinedSprites['knight'])
      : (this.outlinedSprites['knight'] || this.customSprites['knight']);
    const swordSpr = this.outlinedSprites['sword'] || this.customSprites['sword'];

    if (knightSpr) {
      if (pose === 'knee' || pose === 'knee_naked') {
        // Lower down for proposal
        ctx.drawImage(knightSpr, -1 * scale, 1 * scale, 10 * scale, 10 * scale);
        if (swordSpr && !isNaked) {
          ctx.drawImage(swordSpr, 7 * scale, 2 * scale, 10 * scale, 10 * scale);
        }
      } else if (pose === 'sword_ground') {
        // Sword driven vertically into the turf!
        ctx.drawImage(knightSpr, -1 * scale, -1 * scale, 10 * scale, 10 * scale);
        if (swordSpr) {
          // Planted firmly in the ground - flip vertically so blade is in the earth and hilt is up in hand
          ctx.save();
          ctx.translate(6 * scale, 7 * scale);
          ctx.scale(1, -1);
          ctx.drawImage(swordSpr, -1 * scale, -1 * scale, 10 * scale, 10 * scale);
          ctx.restore();

          // Cutscene details: displaced turf & clods around the blade entry point
          ctx.fillStyle = '#064e3b';
          ctx.fillRect(7 * scale, 6 * scale, 4 * scale, 2 * scale);
          ctx.fillStyle = '#022c22';
          ctx.fillRect(8 * scale, 7 * scale, 2 * scale, 2 * scale);
          ctx.fillStyle = '#34d399';
          ctx.fillRect(6 * scale, 6 * scale, 1 * scale, 1 * scale);
        }
      } else {
        ctx.drawImage(knightSpr, -1 * scale, -1 * scale, 10 * scale, 10 * scale);
        if (swordSpr && !isNaked) {
          if (pose === 'training') {
            const swing = Math.floor(Math.sin(tick * 0.06) * 2);
            ctx.drawImage(swordSpr, 5 * scale, (swing - 1) * scale, 10 * scale, 10 * scale);
          } else {
            // Held at side
            ctx.drawImage(swordSpr, 4 * scale, 0, 10 * scale, 10 * scale);
          }
        }
      }

      // Tears glinting when crying
      if (pose === 'crying' || pose === 'crying_naked') {
        ctx.fillStyle = '#67e8f9';
        ctx.fillRect(4 * scale, 2 * scale, 1 * scale, 1 * scale);
        ctx.fillRect(2 * scale, 2 * scale, 1 * scale, 1 * scale);
      }
    } else {
      // Procedural fallback if image loading
      ctx.fillStyle = '#d97706';
      ctx.fillRect(0, 0, 8 * scale, 8 * scale);
    }

    ctx.restore();
  }

  // Draw Fairy Cat with crisp 1px outline & wings
  public drawFairy(ctx: CanvasRenderingContext2D, x: number, y: number, pose: string, tick: number): void {
    if (pose === 'none') return;

    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));

    // When fairy has no wings, she stands on ground without hover
    const hasWings = pose !== 'no_wings' && pose !== 'surprised_no_wings' && pose !== 'happy_no_wings' && pose !== 'carrying_paint';
    const hoverY = hasWings ? Math.floor(Math.sin(tick * 0.035) * 2) : 0;
    ctx.translate(0, hoverY);

    const scale = 2; // integer 2x scale

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(-1 * scale, 7 * scale, 9 * scale, 1 * scale);

    const fairySpr = this.outlinedSprites['fairy'] || this.customSprites['fairy'];
    const wingsSpr = this.outlinedSprites['fairywings'] || this.customSprites['fairywings'];

    // Wings flutter motion (gentle 1px flap)
    const wingFlap = Math.floor(Math.sin(tick * 0.07) * 1);

    // Draw wings behind fairy ONLY if she has awakened them!
    if (wingsSpr && hasWings) {
      // Wings are 16x8 with 1px outline = 18x10
      ctx.drawImage(
        wingsSpr,
        -5 * scale,
        (wingFlap - 1) * scale,
        18 * scale,
        10 * scale
      );
    }

    // Draw fairy body with 1px outline
    if (fairySpr) {
      ctx.drawImage(fairySpr, -1 * scale, -1 * scale, 10 * scale, 10 * scale);

      // If carrying paint buckets
      if (pose === 'carrying_paint') {
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(-3 * scale, 3 * scale, 2 * scale, 3 * scale);
        ctx.fillRect(7 * scale, 3 * scale, 2 * scale, 3 * scale);
      }
    } else {
      ctx.fillStyle = '#fefae0';
      ctx.fillRect(0, 0, 8 * scale, 8 * scale);
    }

    // Magic sparkle effect around fairy
    if (pose === 'sparkle' || pose === 'love' || pose === 'happy') {
      ctx.fillStyle = '#fef08a';
      const sparkX = Math.floor(Math.sin(tick * 0.08) * 8 * scale);
      const sparkY = Math.floor(Math.cos(tick * 0.08) * 6 * scale);
      ctx.fillRect(sparkX + 4 * scale, sparkY + 2 * scale, 2, 2);
    }

    ctx.restore();
  }

  // Draw Apprentice Cat with crisp 1px outline & wooden training sword
  public drawApprentice(ctx: CanvasRenderingContext2D, x: number, y: number, pose: string, tick: number): void {
    if (pose === 'none') return;

    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));

    const bounce = Math.floor(Math.sin(tick * 0.04) * 1);
    ctx.translate(0, bounce);

    const scale = 2;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(-1 * scale, 7 * scale, 9 * scale, 1 * scale);

    const appSpr = this.outlinedSprites['apprentice'] || this.customSprites['apprentice'];
    if (appSpr) {
      if (pose === 'strike') {
        ctx.translate(Math.floor(Math.sin(tick * 0.08) * 3), 0);
      }
      ctx.drawImage(appSpr, -1 * scale, -1 * scale, 10 * scale, 10 * scale);

      // Wooden training sword in apprentice's paws
      const stickAngle = (pose === 'training' || pose === 'strike') ? Math.floor(Math.sin(tick * 0.1) * 2) : 0;
      ctx.fillStyle = '#b08968';
      ctx.fillRect(6 * scale, (2 + stickAngle) * scale, 1 * scale, 5 * scale);
      ctx.fillStyle = '#7f4f24';
      ctx.fillRect(5 * scale, (4 + stickAngle) * scale, 3 * scale, 1 * scale);
    } else {
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(0, 0, 8 * scale, 8 * scale);
    }

    ctx.restore();
  }

  // Draw The Mysterious Door (16x16 sprite with outline and optional dried flower wreath)
  public drawDoor(ctx: CanvasRenderingContext2D, x: number, y: number, hasWreath: boolean = false): void {
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));
    const scale = 2;

    // Door shadow in grass
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(-1 * scale, 15 * scale, 18 * scale, 2 * scale);

    const doorSpr = this.outlinedSprites['door'] || this.customSprites['door'];
    if (doorSpr) {
      ctx.drawImage(doorSpr, -1 * scale, -1 * scale, 18 * scale, 18 * scale);
    } else {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 0, 16 * scale, 16 * scale);
    }

    // Cute dried flower wreath on door
    if (hasWreath) {
      const wx = 7 * scale;
      const wy = 5 * scale;
      ctx.fillStyle = '#166534'; // leafy ring
      ctx.fillRect(wx - 2, wy, 8, 8);
      ctx.fillStyle = '#f472b6'; // pink flowers
      ctx.fillRect(wx - 3, wy + 1, 3, 3);
      ctx.fillRect(wx + 4, wy + 1, 3, 3);
      ctx.fillStyle = '#fde047'; // gold straw flowers
      ctx.fillRect(wx - 1, wy + 4, 3, 3);
      ctx.fillStyle = '#c084fc'; // purple lavender
      ctx.fillRect(wx + 2, wy + 4, 3, 3);
    }

    ctx.restore();
  }

  // Draw Flying Gauntlet (Лицарська лапка / залізна рукавичка)
  public drawFlyingGauntlet(ctx: CanvasRenderingContext2D, tick: number): void {
    // Flying rapidly backwards to the left into the black storm
    const progress = (tick * 0.025) % 1;
    const gx = 135 - progress * 160;
    const gy = 55 + Math.sin(progress * Math.PI * 4) * 12;

    ctx.save();
    ctx.translate(Math.floor(gx), Math.floor(gy));
    ctx.rotate(progress * Math.PI * 8);

    // Dark outline
    ctx.fillStyle = '#120c1f';
    ctx.fillRect(-3, -3, 6, 6);
    // Gray square (Залізна рукавичка / лапка лицаря)
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-2, -2, 4, 4);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-1, -1, 2, 2);

    ctx.restore();
  }

  // Draw the Proposal Ring in its carved door-wood box with magical halo & sparkle
  public drawProposalRing(ctx: CanvasRenderingContext2D, x: number, y: number, tick: number): void {
    ctx.save();
    ctx.translate(Math.floor(x), Math.floor(y));

    // Floating box bounce
    const floatY = Math.floor(Math.sin(tick * 0.05) * 2);
    ctx.translate(0, floatY);

    // 1. Shimmering romantic halo behind box
    const pulse = (Math.sin(tick * 0.08) + 1) * 0.5;
    const haloGrad = ctx.createRadialGradient(16, 16, 2, 16, 16, 22);
    haloGrad.addColorStop(0, `rgba(254, 240, 138, ${0.45 + pulse * 0.25})`);
    haloGrad.addColorStop(0.5, `rgba(244, 114, 182, ${0.25 + pulse * 0.15})`);
    haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = haloGrad;
    ctx.fillRect(-6, -6, 44, 44);

    // 2. Carved wooden box (made from door fragment)
    ctx.fillStyle = '#120c1f'; // dark 1px outline
    ctx.fillRect(6, 10, 20, 16);
    // Dark mahogany / oak wood base
    ctx.fillStyle = '#78350f';
    ctx.fillRect(7, 11, 18, 14);
    // Inner velvet cushion (royal blue/indigo)
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(9, 13, 14, 10);
    // Wood grain detail
    ctx.fillStyle = '#b45309';
    ctx.fillRect(8, 12, 16, 1);
    ctx.fillRect(8, 22, 16, 1);
    // Tiny golden hinges / lock
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(15, 23, 2, 2);

    // 3. Ring sprite (ring.png is 6x6, rendered inside the cushion)
    const ringSpr = this.outlinedSprites['ring'] || this.customSprites['ring'];
    if (ringSpr) {
      // Shimmering ring resting on cushion
      ctx.drawImage(ringSpr, 11, 9, 10, 10);
    } else {
      // Procedural fallback: white gold band with pearl droplet
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(13, 12, 6, 6);
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(15, 14, 2, 2);
      ctx.fillStyle = '#38bdf8'; // pearl droplet
      ctx.fillRect(15, 10, 2, 2);
    }

    // 4. Sparkling light glints
    const glint1 = (tick % 60 < 20);
    if (glint1) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(10, 6, 1, 3);
      ctx.fillRect(9, 7, 3, 1);
    }
    const glint2 = (tick % 60 >= 30 && tick % 60 < 50);
    if (glint2) {
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(21, 9, 1, 3);
      ctx.fillRect(20, 10, 3, 1);
    }

    ctx.restore();
  }

  // Draw Dialogue Box & Frame
  public drawDialogueBox(
    ctx: CanvasRenderingContext2D,
    speaker: string,
    displayedText: string,
    isComplete: boolean,
    tick: number
  ): void {
    const boxX = 8;
    const boxY = 88;
    const boxW = 240;
    const boxH = 48;

    // Box background
    ctx.fillStyle = 'rgba(12, 10, 24, 0.92)';
    ctx.fillRect(boxX, boxY, boxW, boxH);

    // 8-bit double border
    ctx.fillStyle = '#4c3f78';
    ctx.fillRect(boxX, boxY, boxW, 2); // top
    ctx.fillRect(boxX, boxY + boxH - 2, boxW, 2); // bottom
    ctx.fillRect(boxX, boxY, 2, boxH); // left
    ctx.fillRect(boxX + boxW - 2, boxY, 2, boxH); // right

    // Inner gold trim
    ctx.fillStyle = '#c5a059';
    ctx.fillRect(boxX + 2, boxY + 2, boxW - 4, 1);
    ctx.fillRect(boxX + 2, boxY + boxH - 3, boxW - 4, 1);
    ctx.fillRect(boxX + 2, boxY + 2, 1, boxH - 4);
    ctx.fillRect(boxX + boxW - 3, boxY + 2, 1, boxH - 4);

    // Speaker Name Tag Badge
    if (speaker && speaker !== 'Оповідач') {
      const tagW = speaker.length * 7 + 14;
      const tagH = 12;
      const tagX = boxX + 8;
      const tagY = boxY - 9;

      ctx.fillStyle = '#231e3d';
      ctx.fillRect(tagX, tagY, tagW, tagH);
      ctx.fillStyle = '#c5a059';
      ctx.fillRect(tagX, tagY, tagW, 1);
      ctx.fillRect(tagX, tagY + tagH - 1, tagW, 1);
      ctx.fillRect(tagX, tagY, 1, tagH);
      ctx.fillRect(tagX + tagW - 1, tagY, 1, tagH);

      ctx.fillStyle = speaker === 'Лицар' ? '#f59e0b' : '#f472b6';
      ctx.font = '10px "Pixelify Sans", monospace';
      ctx.fillText(speaker, tagX + 6, tagY + 9);
    }

    // Render dialogue text with wrapping
    ctx.fillStyle = '#ffffff';
    ctx.font = '9px "Pixelify Sans", monospace';

    const maxLineWidth = 222;
    const words = displayedText.split(' ');
    let currentLine = '';
    let lineY = boxY + 14;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxLineWidth && i > 0) {
        ctx.fillText(currentLine, boxX + 8, lineY);
        currentLine = words[i];
        lineY += 11;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      ctx.fillText(currentLine, boxX + 8, lineY);
    }

    // Next Prompt indicator (blinking arrow ▼)
    if (isComplete) {
      const arrowBounce = Math.sin(tick * 0.2) > 0 ? 0 : 2;
      ctx.fillStyle = '#ffd166';
      ctx.fillText('▼', boxX + boxW - 14, boxY + boxH - 6 + arrowBounce);
    }
  }

  // Draw Chapter Splash Banner
  public drawChapterBanner(ctx: CanvasRenderingContext2D, title: string, progress: number): void {
    if (progress <= 0 || progress >= 1) return;

    const alpha = Math.sin(progress * Math.PI);
    ctx.fillStyle = `rgba(10, 8, 20, ${alpha * 0.85})`;
    ctx.fillRect(0, 0, 256, 144);

    ctx.fillStyle = `rgba(255, 239, 160, ${alpha})`;
    ctx.font = '12px "Pixelify Sans", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(title, 128, 74);
    ctx.textAlign = 'left';
  }
}
