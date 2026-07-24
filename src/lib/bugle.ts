// "First Call" — the Call to the Post — synthesized from scratch with the
// Web Audio API. No audio file: each note is a little brass instrument built
// from an oscillator, a filter, and envelopes, and the whole call is
// scheduled sample-accurately against the audio clock in one pass.
//
// The score is the real thing: the traditional U.S. bugle call (34 notes,
// C major, 3/8, ♩. ≈ 96 — the tune every racetrack sounds before post).
// A bugle has no valves, so every pitch sits on the harmonic series:
// G4, C5, E5, G5 are the only notes that appear.
//
// Sound only ever starts from a user gesture (the bugle button), which also
// satisfies browser autoplay policy — the AudioContext is created inside the
// click that asks for it.

// One note of the score. `t` and `d` are in eighth-note beats; `a` is the
// articulation: staccato eighths clipped short, the pickup triplets slurred
// full-length, and the last note held under a fermata.
type Articulation = "stacc" | "slur" | "hold"
type Note = { m: number; t: number; d: number; a: Articulation }

const G4 = 67
const C5 = 72
const E5 = 76
const G5 = 79

// One eighth note in seconds. ♩. = 96 → the eighth is 96×3 = 288 to the
// minute ≈ 208ms; racetrack buglers take it a shade statelier than the
// drill-field manual, so we sit just under that.
const EIGHTH = 0.225

// A triplet roll on one pitch: three sixteenth-triplets filling one eighth
// ("they should sound like the last three notes of a sextuplet").
const roll = (m: number, t: number): Note[] =>
  [0, 1, 2].map((i) => ({ m, t: t + i / 3, d: 1 / 3, a: "slur" }))

// The rising pickup that opens each phrase: G-C-E up the bugle's arpeggio,
// three different pitches in the space of one eighth.
const pickup = (t: number): Note[] =>
  [G4, C5, E5].map((m, i) => ({ m, t: t + i / 3, d: 1 / 3, a: "slur" }))

// The full call — two phrases, each opened by the rising G-C-E pickup.
const FIRST_CALL: Note[] = [
  // phrase one: up the arpeggio to the high G, answer on E, land low
  ...pickup(0), //  pickup: g16 c16 e16
  { m: G5, t: 1, d: 1, a: "stacc" }, //  g8
  ...roll(G5, 2), //  g16 g16 g16
  { m: G5, t: 3, d: 1, a: "stacc" }, //  g8
  { m: E5, t: 4, d: 1, a: "stacc" }, //  e8
  ...roll(E5, 5), //  e16 e16 e16
  { m: E5, t: 6, d: 1, a: "stacc" }, //  e8
  { m: C5, t: 7, d: 1, a: "stacc" }, //  c8
  { m: E5, t: 8, d: 1, a: "stacc" }, //  e8
  { m: C5, t: 9, d: 1, a: "stacc" }, //  c8
  { m: G4, t: 10, d: 1, a: "slur" }, //  g8 — phrase lands low, lets ring
  // (eighth rest at t=11)
  // phrase two: same climb, then the low-G roll and the held C
  ...pickup(12), //  pickup again
  { m: G5, t: 13, d: 1, a: "stacc" },
  ...roll(G5, 14),
  { m: G5, t: 15, d: 1, a: "stacc" },
  { m: G5, t: 16, d: 1, a: "stacc" }, //  g8 e8 c8 — stepping down
  { m: E5, t: 17, d: 1, a: "stacc" },
  { m: C5, t: 18, d: 1, a: "stacc" },
  { m: G4, t: 19, d: 1, a: "stacc" }, //  the low roll: g8 [g16 g16 g16] g8
  ...roll(G4, 20),
  { m: G4, t: 21, d: 1, a: "stacc" },
  { m: C5, t: 22, d: 3.2, a: "hold" }, //  c4 fermata — the long "post!"
]

const midiToHz = (m: number) => 440 * 2 ** ((m - 69) / 12)

// The context persists across plays; everything downstream of it is built
// fresh per call and garbage-collects when the notes stop.
let ctx: AudioContext | null = null

function audioContext(): AudioContext | null {
  if (ctx) return ctx
  // Older WebKit ships the constructor under a prefix; typed narrowly
  // instead of reaching for `any`.
  const Ctor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext
  if (!Ctor) return null
  ctx = new Ctor()
  return ctx
}

// One brass voice: sawtooth (a trumpet's spectrum is close to one) through a
// low-pass whose cutoff blooms open and settles — the "blat" of a brass
// attack — into an ADSR gain. A touch of pitch scoop on the way in, and the
// held final note gains a delayed vibrato via an LFO on detune.
function voice(ac: AudioContext, out: AudioNode, note: Note, t0: number) {
  const f = midiToHz(note.m)
  const start = t0 + note.t * EIGHTH
  // Staccato clips the sounding length; slurred triplets run full value.
  const soundDur =
    note.a === "stacc" ? note.d * EIGHTH * 0.62 : note.d * EIGHTH * 0.95
  const end = start + soundDur

  const osc = ac.createOscillator()
  osc.type = "sawtooth"
  // Brass players scoop into the note from just underneath.
  osc.frequency.setValueAtTime(f * 0.972, start)
  osc.frequency.exponentialRampToValueAtTime(f, start + 0.03)

  const filter = ac.createBiquadFilter()
  filter.type = "lowpass"
  filter.Q.value = 1.1
  // The cutoff snaps open with the attack, then relaxes — this envelope is
  // most of what makes it read as brass rather than a synth buzz.
  filter.frequency.setValueAtTime(f * 1.4, start)
  filter.frequency.linearRampToValueAtTime(f * 6, start + 0.035)
  filter.frequency.setTargetAtTime(f * 2.7, start + 0.05, 0.09)

  const amp = ac.createGain()
  amp.gain.setValueAtTime(0, start)
  amp.gain.linearRampToValueAtTime(0.9, start + 0.014) // fast attack
  amp.gain.setTargetAtTime(0.62, start + 0.014, 0.09) // settle to sustain
  // Release: quick for tongued notes, long singing decay under the fermata.
  const releaseTau = note.a === "hold" ? 0.3 : 0.02
  amp.gain.setTargetAtTime(0.0001, end, releaseTau)

  if (note.a === "hold") {
    // Delayed vibrato on the held note — ±9 cents at 5.4Hz, fading in the
    // way a player adds it once the note is planted.
    const lfo = ac.createOscillator()
    lfo.frequency.value = 5.4
    const depth = ac.createGain()
    depth.gain.setValueAtTime(0, start)
    depth.gain.linearRampToValueAtTime(9, start + 0.7)
    lfo.connect(depth)
    depth.connect(osc.detune)
    lfo.start(start)
    lfo.stop(end + 1.6)
  }

  osc.connect(filter)
  filter.connect(amp)
  amp.connect(out)
  osc.start(start)
  osc.stop(end + (note.a === "hold" ? 1.6 : 0.12))
}

// Schedules the entire call and returns its length in milliseconds so the UI
// can light "post time" for exactly as long as the bugle plays (0 = no audio
// available on this browser).
export function playCallToThePost(): number {
  const ac = audioContext()
  if (!ac) return 0
  if (ac.state === "suspended") {
    ac.resume().catch((err) => console.warn("bugle: audio blocked", err))
  }

  // Master chain: one gain to set the level, a gentle compressor as a
  // safety limiter — 34 scheduled voices never get to clip the output.
  const master = ac.createGain()
  master.gain.value = 0.16
  const limiter = ac.createDynamicsCompressor()
  master.connect(limiter)
  limiter.connect(ac.destination)

  const t0 = ac.currentTime + 0.08
  for (const note of FIRST_CALL) voice(ac, master, note, t0)

  const last = FIRST_CALL[FIRST_CALL.length - 1]
  const totalS = last.t * EIGHTH + last.d * EIGHTH + 1.1 // + fermata tail
  return Math.round(totalS * 1000) + 80
}
