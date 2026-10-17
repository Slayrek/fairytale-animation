import { STORY_CHAPTERS, DialogueLine } from '../story/script';
import { AudioSystem } from './AudioSystem';

export class DialogueEngine {
  private chapterIndex: number = 0;
  private lineIndex: number = 0;
  private charIndex: number = 0;
  private tickCounter: number = 0;
  private textSpeed: number = 3; // slower, comfortable reading pace
  private isTextComplete: boolean = false;

  public chapterBannerTitle: string = '';
  public chapterBannerProgress: number = 0;
  public bannerDuration: number = 90; // frames
  public bannerTimer: number = 0;

  constructor(private audio: AudioSystem) {
    this.startChapter(0);
  }

  public getCurrentLine(): DialogueLine {
    const currentChapter = STORY_CHAPTERS[this.chapterIndex];
    return currentChapter.lines[this.lineIndex];
  }

  public getDisplayedText(): string {
    const line = this.getCurrentLine();
    return line.text.substring(0, this.charIndex);
  }

  public getIsComplete(): boolean {
    return this.isTextComplete;
  }

  public update(): void {
    // Chapter banner progress
    if (this.bannerTimer > 0) {
      this.bannerTimer--;
      this.chapterBannerProgress = 1 - (this.bannerTimer / this.bannerDuration);
      return;
    }

    const currentLine = this.getCurrentLine();

    // Typewriter progression
    if (!this.isTextComplete) {
      this.tickCounter++;
      if (this.tickCounter >= this.textSpeed) {
        this.tickCounter = 0;
        this.charIndex++;

        // Play character blip sound on non-space chars
        const char = currentLine.text[this.charIndex - 1];
        if (char && char !== ' ') {
          this.audio.playVoiceBlip(currentLine.speaker);
        }

        if (this.charIndex >= currentLine.text.length) {
          this.isTextComplete = true;
        }
      }
    }
  }

  public advance(): void {
    this.audio.init();

    // If chapter banner is currently displaying, skip it
    if (this.bannerTimer > 0) {
      this.bannerTimer = 0;
      this.chapterBannerProgress = 1;
      return;
    }

    const currentLine = this.getCurrentLine();

    // If text is still typing, finish instantly
    if (!this.isTextComplete) {
      this.charIndex = currentLine.text.length;
      this.isTextComplete = true;
      return;
    }

    // Otherwise, move to next dialogue line
    const currentChapter = STORY_CHAPTERS[this.chapterIndex];
    if (this.lineIndex + 1 < currentChapter.lines.length) {
      this.lineIndex++;
      this.resetLine();
    } else {
      // Move to next chapter
      if (this.chapterIndex + 1 < STORY_CHAPTERS.length) {
        this.chapterIndex++;
        this.lineIndex = 0;
        this.startChapter(this.chapterIndex);
      } else {
        // Story completed, restart loop
        this.restart();
      }
    }
  }

  public restart(): void {
    this.chapterIndex = 0;
    this.lineIndex = 0;
    this.startChapter(0);
  }

  private startChapter(_index: number): void {
    this.resetLine();

    const line = this.getCurrentLine();
    if (line.chapterTitle) {
      this.chapterBannerTitle = line.chapterTitle;
      this.bannerTimer = this.bannerDuration;
      this.chapterBannerProgress = 0.01;
      this.audio.playChapterChime();
    }

    this.audio.playTrack(line.bgm);
  }

  private resetLine(): void {
    this.charIndex = 0;
    this.tickCounter = 0;
    this.isTextComplete = false;

    const line = this.getCurrentLine();
    this.audio.playTrack(line.bgm);

    if (line.isProposal) {
      this.audio.playProposalChime();
    }
  }
}
