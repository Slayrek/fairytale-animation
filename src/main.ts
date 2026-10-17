import { ScreenManager } from './engine/Screen';
import { AudioSystem } from './engine/AudioSystem';
import { PixelRenderer } from './render/PixelArt';
import { DialogueEngine } from './engine/DialogueEngine';

class Game {
  private screen: ScreenManager;
  private audio: AudioSystem;
  private renderer: PixelRenderer;
  private dialogue: DialogueEngine;
  private tick: number = 0;

  // Sharp DOM UI elements
  private speakerBadge: HTMLElement;
  private dialogueText: HTMLElement;
  private nextArrow: HTMLElement;
  private chapterSplash: HTMLElement;
  private chapterTitle: HTMLElement;

  constructor() {
    this.screen = new ScreenManager('gameCanvas', 'game-container');
    this.audio = new AudioSystem();
    this.renderer = new PixelRenderer();
    this.dialogue = new DialogueEngine(this.audio);

    this.speakerBadge = document.getElementById('speaker-badge')!;
    this.dialogueText = document.getElementById('dialogue-text')!;
    this.nextArrow = document.getElementById('next-arrow')!;
    this.chapterSplash = document.getElementById('chapter-splash')!;
    this.chapterTitle = document.getElementById('chapter-title')!;

    this.setupInputs();
    this.startLoop();
  }

  private setupInputs(): void {
    const handleAction = () => {
      this.dialogue.advance();
    };

    // Container / Canvas click
    const container = document.getElementById('game-container')!;
    container.addEventListener('click', handleAction);

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleAction();
      } else if (e.code === 'KeyM') {
        this.audio.toggleMute();
      } else if (e.code === 'KeyR') {
        this.dialogue.restart();
      }
    });
  }

  private startLoop(): void {
    const loop = () => {
      this.update();
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private update(): void {
    this.tick++;
    const currentLine = this.dialogue.getCurrentLine();
    this.dialogue.update();
    this.renderer.update(currentLine.ambient);
  }

  private render(): void {
    const ctx = this.screen.ctx;
    const currentLine = this.dialogue.getCurrentLine();

    // 1. Draw 256x144 Pixel Art Background
    this.renderer.drawBackground(ctx, currentLine.bg, this.tick);

    // 2. Draw Pixel Art Objects & Characters
    let knightX = 80;
    let knightY = 60;
    let fairyX = 180;
    let fairyY = 38;

    if (currentLine.bg === 'meadow') {
      knightX = 80;
      knightY = 60;
      // When fairy lands on his lap in lines 7-11
      if (currentLine.fairyPose === 'love') {
        fairyX = 86;
        fairyY = 56;
      } else {
        // Circling gracefully over the lavender garden
        fairyX = 175 + Math.floor(Math.sin(this.tick * 0.02) * 15);
        fairyY = 38 + Math.floor(Math.cos(this.tick * 0.02) * 6);
      }
      this.renderer.drawKnight(ctx, knightX, knightY, currentLine.knightPose, this.tick);
      this.renderer.drawFairy(ctx, fairyX, fairyY, currentLine.fairyPose || 'hover', this.tick);
    } else if (currentLine.bg === 'training_grounds') {
      // Knight & Apprentice on training grounds
      knightX = 75;
      knightY = 64;
      const apprenticeX = 140;
      const apprenticeY = 64;

      this.renderer.drawKnight(ctx, knightX, knightY, currentLine.knightPose, this.tick);
      if (currentLine.apprenticePose && currentLine.apprenticePose !== 'none') {
        this.renderer.drawApprentice(ctx, apprenticeX, apprenticeY, currentLine.apprenticePose, this.tick);
      }
    } else if (currentLine.bg === 'surreal_storm') {
      // Surreal storm scene: motionless door on the right, knight battling the wind
      const doorX = 175;
      const doorY = 46;
      this.renderer.drawDoor(ctx, doorX, doorY);

      // Knight pushes forward against the wind
      let stormKnightX = 95;
      let stormKnightY = 62;
      if (currentLine.knightPose === 'sword_ground') {
        stormKnightX = 115;
      } else if (currentLine.showGauntletFly) {
        stormKnightX = 145; // reaching right for the door handle!
      }

      this.renderer.drawKnight(ctx, stormKnightX, stormKnightY, currentLine.knightPose, this.tick);

      // Flying gauntlet into the storm
      if (currentLine.showGauntletFly) {
        this.renderer.drawFlyingGauntlet(ctx, this.tick);
      }
    } else if (currentLine.bg === 'fairy_village') {
      // Fairy alone in her village
      const fairyX = 120;
      const fairyY = 64;
      this.renderer.drawFairy(ctx, fairyX, fairyY, currentLine.fairyPose || 'no_wings', this.tick);
    } else if (currentLine.bg === 'flower_field_door') {
      // Field of golden wheat with the Door & flower wreath
      const doorX = 165;
      const doorY = 44;
      this.renderer.drawDoor(ctx, doorX, doorY, true);

      if (currentLine.knightPose && currentLine.knightPose !== 'none') {
        const knightX = 85;
        const knightY = 64;
        const fairyX = 122;
        const fairyY = 64;
        this.renderer.drawKnight(ctx, knightX, knightY, currentLine.knightPose, this.tick);
        this.renderer.drawFairy(ctx, fairyX, fairyY, currentLine.fairyPose || 'no_wings', this.tick);
      } else {
        const fairyX = 110;
        const fairyY = 64;
        this.renderer.drawFairy(ctx, fairyX, fairyY, currentLine.fairyPose || 'no_wings', this.tick);
      }
    } else if (currentLine.bg === 'fairy_street') {
      // Cobblestone street with spilled paint and Elf's house
      const knightX = 85;
      const knightY = 62;
      const fairyX = 135;
      const fairyY = 64;

      if (currentLine.knightPose && currentLine.knightPose !== 'none') {
        this.renderer.drawKnight(ctx, knightX, knightY, currentLine.knightPose, this.tick);
      }
      this.renderer.drawFairy(ctx, fairyX, fairyY, currentLine.fairyPose || 'no_wings', this.tick);
    } else if (currentLine.bg === 'sea_sunset') {
      // Coastal flight over the waves!
      const fairyX = 75 + Math.floor(Math.sin(this.tick * 0.03) * 16);
      const fairyY = 32 + Math.floor(Math.cos(this.tick * 0.03) * 6);
      const knightX = 155;
      const knightY = 64;

      this.renderer.drawKnight(ctx, knightX, knightY, currentLine.knightPose, this.tick);
      this.renderer.drawFairy(ctx, fairyX, fairyY, currentLine.fairyPose || 'hover', this.tick);
    } else if (currentLine.bg === 'cliff_proposal') {
      // Cliff proposal atop the sea cliff at sunset
      let cliffKnightX = 70;
      let cliffKnightY = 60;
      let cliffFairyX = 110;
      let cliffFairyY = 56;

      if (currentLine.knightPose === 'knee_naked') {
        cliffKnightX = 72;
        cliffKnightY = 64; // down on one knee
        cliffFairyX = 112;
        cliffFairyY = 54;
      } else if (currentLine.fairyPose === 'love') {
        // Embracing or twirling together under evening stars!
        cliffKnightX = 85;
        cliffKnightY = 60;
        cliffFairyX = 89;
        cliffFairyY = 54;
      } else {
        cliffFairyX = 110 + Math.floor(Math.sin(this.tick * 0.03) * 6);
        cliffFairyY = 52 + Math.floor(Math.cos(this.tick * 0.03) * 4);
      }

      this.renderer.drawKnight(ctx, cliffKnightX, cliffKnightY, currentLine.knightPose, this.tick);
      this.renderer.drawFairy(ctx, cliffFairyX, cliffFairyY, currentLine.fairyPose || 'hover', this.tick);

      // Proposal Ring presentation in carved wooden box!
      if (currentLine.showRing) {
        this.renderer.drawProposalRing(ctx, 92, 54, this.tick);
      }
    } else if (currentLine.bg === 'wedding_beach') {
      // Festival night beach wedding celebration!
      // Apprentice with shining sword on left near guests
      if (currentLine.apprenticePose && currentLine.apprenticePose !== 'none') {
        this.renderer.drawApprentice(ctx, 95, 96, currentLine.apprenticePose, this.tick);
      }

      // Knight and Fairy standing hand-in-hand by the ocean water
      const knightX = 175;
      const knightY = 96;
      const fairyX = 195;
      const fairyY = 93;

      this.renderer.drawKnight(ctx, knightX, knightY, currentLine.knightPose, this.tick);
      this.renderer.drawFairy(ctx, fairyX, fairyY, currentLine.fairyPose || 'love', this.tick);
    } else if (currentLine.knightPose === 'knee' || currentLine.knightPose === 'knee_naked') {
      knightX = 96;
      knightY = 70;
      fairyX = 138;
      fairyY = 58;
      this.renderer.drawKnight(ctx, knightX, knightY, currentLine.knightPose, this.tick);
      this.renderer.drawFairy(ctx, fairyX, fairyY, currentLine.fairyPose || 'hover', this.tick);
    } else {
      this.renderer.drawKnight(ctx, 100, 64, currentLine.knightPose, this.tick);
      if (currentLine.fairyPose && currentLine.fairyPose !== 'none') {
        this.renderer.drawFairy(ctx, 140, 58, currentLine.fairyPose, this.tick);
      }
    }

    // 3. Draw Ambient Particles
    this.renderer.drawParticles(ctx, currentLine.ambient);

    // 4. Update Sharp High-Res Pixel Dialogue UI - ALWAYS show speaker for ALL chapters!
    this.speakerBadge.style.display = 'block';
    this.speakerBadge.textContent = currentLine.speaker;
    this.speakerBadge.classList.remove('fairy', 'apprentice', 'narrator');
    if (currentLine.speaker === 'Фея') {
      this.speakerBadge.classList.add('fairy');
    } else if (currentLine.speaker === 'Учень') {
      this.speakerBadge.classList.add('apprentice');
    } else if (currentLine.speaker === 'Оповідач') {
      this.speakerBadge.classList.add('narrator');
    }

    this.dialogueText.textContent = this.dialogue.getDisplayedText();

    if (this.dialogue.getIsComplete()) {
      this.nextArrow.classList.add('visible');
    } else {
      this.nextArrow.classList.remove('visible');
    }

    // 5. Update Chapter Splash Screen
    if (this.dialogue.bannerTimer > 0) {
      this.chapterSplash.classList.add('active');
      this.chapterTitle.textContent = this.dialogue.chapterBannerTitle;
    } else {
      this.chapterSplash.classList.remove('active');
    }
  }
}

// Start game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  new Game();
});
