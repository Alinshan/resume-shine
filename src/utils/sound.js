// Web Audio API Synthesizer Engine for ReactBits micro-interactions

let audioCtx = null;
let soundEnabled = true;

try {
  const saved = localStorage.getItem('rb-sound');
  if (saved !== null) soundEnabled = saved === 'true';
} catch (_) {}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(val) {
  soundEnabled = val;
  try {
    localStorage.setItem('rb-sound', val);
  } catch (_) {}
}

export function playTone(freq1 = 440, freq2 = 880, duration = 0.05, attack = 0.005, type = 'sine') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = type;
    osc.frequency.setValueAtTime(freq1, now);
    if (freq2 && freq2 !== freq1) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(freq2, 10), now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch (_) {}
}

export const sound = {
  click: () => playTone(680, 480, 0.025, 0.005),
  toggle: () => playTone(540, 260, 0.04, 0.01),
  spark: () => playTone(780, 480, 0.018, 0.004),
  chime: () => playTone(680, 880, 0.035, 0.006),
  laser: () => playTone(440, 880, 0.05, 0.01, 'triangle'),
  tab: () => playTone(520, 680, 0.02, 0.005),
};
