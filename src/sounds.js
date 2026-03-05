// A simple Web Audio API wrapper to generate synth sounds for the game
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playTone(freq, type, duration, vol = 0.5) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export function playCorrectSound() {
  playTone(600, 'sine', 0.1, 0.4);
  setTimeout(() => playTone(800, 'sine', 0.2, 0.4), 100);
}

export function playWrongSound() {
  playTone(200, 'sawtooth', 0.3, 0.3);
  setTimeout(() => playTone(150, 'sawtooth', 0.4, 0.3), 150);
}

export function playTickSound() {
  playTone(800, 'square', 0.05, 0.1);
}

export function playWinSound() {
  const notes = [400, 500, 600, 800, 1000];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 'sine', 0.2, 0.5), i * 150);
  });
}

export function playStartSound() {
  playTone(400, 'square', 0.1, 0.3);
  setTimeout(() => playTone(800, 'square', 0.3, 0.3), 100);
}
