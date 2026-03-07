// sounds.js
// Web Audio API Synthesizer with error handling for game audio.
// All functions are wrapped in try-catch to prevent React crashes.

let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, type, duration, vol = 0.5) {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently ignore audio errors to prevent React crashes
  }
}

export function playCorrectSound() {
  playTone(523.25, 'sine', 0.15, 0.4);
  setTimeout(() => playTone(783.99, 'triangle', 0.25, 0.4), 120);
}

export function playWrongSound() {
  playTone(150, 'sawtooth', 0.3, 0.3);
  setTimeout(() => playTone(100, 'sawtooth', 0.35, 0.25), 150);
}

export function playTickSound() {
  playTone(800, 'square', 0.05, 0.1);
}

export function playWinSound() {
  const notes = [261.63, 329.63, 392.00, 493.88, 587.33, 783.99, 1046.50];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      playTone(freq, 'triangle', 0.3, 0.35);
      playTone(freq, 'sine', 0.4, 0.2);
    }, i * 110);
  });
}

export function playStartSound() {
  playTone(400, 'square', 0.1, 0.25);
  setTimeout(() => playTone(800, 'sine', 0.3, 0.3), 200);
}

export function playTimeoutSound() {
  // "Tet tot" double buzzer
  playTone(200, 'sawtooth', 0.2, 0.3);
  setTimeout(() => playTone(150, 'sawtooth', 0.25, 0.3), 250);
}
