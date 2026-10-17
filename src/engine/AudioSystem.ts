// Audio engine tailored for sound designers and musicians
export class AudioSystem {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private activeBgmSource: AudioBufferSourceNode | HTMLAudioElement | null = null;
  private isInitialized: boolean = false;

  // Track procedural background music oscillator loops
  private synthLoopTimer: number | null = null;
  private currentTrackName: string = '';

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public init(): void {
    if (this.isInitialized) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.7;

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.5;

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.6;

    this.musicGain.connect(this.masterGain);
    this.sfxGain.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.isInitialized = true;
  }

  public toggleMute(): boolean {
    if (!this.masterGain || !this.ctx) return false;
    this.isMuted = !this.isMuted;
    this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime, 0.05);
    return this.isMuted;
  }

  // Speech SFX: plays custom sound file if provided by user in public/assets/audio/sfx/
  public playVoiceBlip(speaker: string): void {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    // Custom voice files: e.g. voice_knight.wav / voice_fairy.wav
    const voiceFileName = speaker === 'Лицар' ? 'voice_knight' : speaker === 'Фея' ? 'voice_fairy' : 'voice_narrator';
    const base = import.meta.env.BASE_URL || './';
    const sfxPath = `${base}assets/audio/sfx/${voiceFileName}.wav`;

    const audio = new Audio(sfxPath);
    audio.volume = 0.5;
    audio.play().catch(() => {
      // If user hasn't added their custom audio file yet, keep silent (no annoying beeps)
    });
  }

  // Play chapter chime
  public playChapterChime(): void {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.0, 523.25]; // C major arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  }

  // Play proposal / magic harp chime
  public playProposalChime(): void {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [329.63, 392.0, 493.88, 587.33, 659.25, 783.99]; // E minor / G major lush harp
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.15, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.85);
    });
  }

  // Play custom audio file if provided by the user in public/assets/audio/
  // otherwise fallback to cozy procedural chord progression
  public playTrack(trackId: string): void {
    if (this.currentTrackName === trackId) return;
    this.currentTrackName = trackId;

    // Check if an actual audio file exists
    const base = import.meta.env.BASE_URL || './';
    const audioPath = `${base}assets/audio/bgm/${trackId}.mp3`;
    const audioElem = new Audio(audioPath);

    audioElem.addEventListener('canplaythrough', () => {
      this.stopCurrentBgm();
      audioElem.loop = true;
      audioElem.volume = 0.5;
      audioElem.play().catch(() => {});
      this.activeBgmSource = audioElem;
    });

    audioElem.addEventListener('error', () => {
      // Audio file not yet added by user -> start procedural ambient music
      this.startProceduralBgm(trackId);
    });
  }

  private stopCurrentBgm(): void {
    if (this.activeBgmSource instanceof HTMLAudioElement) {
      this.activeBgmSource.pause();
      this.activeBgmSource = null;
    }
    if (this.synthLoopTimer !== null) {
      clearInterval(this.synthLoopTimer);
      this.synthLoopTimer = null;
    }
  }

  // Cozy retro 8-bit procedural fairy tale music
  private startProceduralBgm(theme: string): void {
    this.stopCurrentBgm();
    if (!this.ctx || !this.musicGain) return;

    let chords: number[][];
    let tempo = 1800; // ms per chord

    if (theme === 'routine') {
      // Warm, playful morning: C - Am - F - G
      chords = [
        [261.63, 329.63, 392.00], // C
        [220.00, 261.63, 329.63], // Am
        [174.61, 220.00, 261.63], // F
        [196.00, 246.94, 293.66], // G
      ];
    } else if (theme === 'wind') {
      // Melancholic, heroic: Am - Em - F - Dm
      chords = [
        [220.00, 261.63, 329.63], // Am
        [164.81, 196.00, 246.94], // Em
        [174.61, 220.00, 261.63], // F
        [146.83, 174.61, 220.00], // Dm
      ];
      tempo = 2100;
    } else if (theme === 'wings') {
      // Wondrous, ethereal: Fmaj7 - G - Em7 - Am
      chords = [
        [174.61, 220.00, 261.63, 329.63],
        [196.00, 246.94, 293.66],
        [164.81, 196.00, 246.94, 293.66],
        [220.00, 261.63, 329.63],
      ];
      tempo = 1900;
    } else {
      // Sea Sunset / Proposal: Cmaj7 - Fmaj7 - Am - G
      chords = [
        [261.63, 329.63, 392.00, 493.88],
        [174.61, 220.00, 261.63, 329.63],
        [220.00, 261.63, 329.63],
        [196.00, 246.94, 293.66],
      ];
      tempo = 2200;
    }

    let chordIndex = 0;
    const playChordStep = () => {
      if (!this.ctx || !this.musicGain || this.isMuted) return;
      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      const now = this.ctx.currentTime;
      currentChord.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.035, now + 0.3);
        g.gain.exponentialRampToValueAtTime(0.001, now + (tempo / 1000) * 0.95);

        osc.connect(g);
        g.connect(this.musicGain!);

        osc.start(now);
        osc.stop(now + tempo / 1000);
      });
    };

    playChordStep();
    this.synthLoopTimer = window.setInterval(playChordStep, tempo);
  }
}
