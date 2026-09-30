// Run with: node scripts/test-spectrogram-pitch.cjs
const assert = require("node:assert/strict")
const fs = require("node:fs")
const vm = require("node:vm")
const html = fs.readFileSync("src/pages/doodles/spectrogram2.html", "utf8")
const embedded = name => html.split(`const ${name} = String.raw\``)[1].split("`")[0]
new vm.Script(html.match(/<script type="module">([\s\S]*?)<\/script>/)[1])
let result
const worker = vm.createContext({
  self: {
    postMessage: message => {
      result = message.result
    }
  }
})
vm.runInContext(embedded("workerSource"), worker)
const send = data => worker.self.onmessage({ data })
const rate = 24000
const length = 3600
function reset(minFrequency = 20) {
  send({ type: "reset" })
  send({ type: "config", minFrequency, maxFrequency: 5000 })
}
function analyze(frequency, start = 0, harmonic = false) {
  const samples = Float32Array.from({ length }, (_, i) => {
    const phase = 2 * Math.PI * frequency * (start + i / rate)
    return harmonic
      ? 0.05 * Math.sin(phase) + 0.4 * Math.sin(2 * phase) + 0.3 * Math.sin(3 * phase)
      : 0.5 * Math.sin(phase)
  })
  send({ type: "samples", samples, sampleRate: rate, time: start, generation: 1 })
  return result
}
const cents = (actual, expected) => Math.abs(1200 * Math.log2(actual / expected))
for (const frequency of [20, 55, 110, 440, 1000]) {
  reset()
  const detected = analyze(frequency)
  assert.ok(detected && cents(detected.frequency, frequency) < 5, `tone ${frequency}: ${JSON.stringify(detected)}`)
}
for (const [from, to] of [
  [440, 880],
  [880, 440]
]) {
  reset()
  analyze(from)
  for (let i = 0; i < 6; i++) analyze(to, i / 30)
  assert.ok(result && cents(result.frequency, to) < 5, `octave ${from} -> ${to}: ${JSON.stringify(result)}`)
}
reset()
assert.ok(cents(analyze(220, 0, true).frequency, 220) < 5, "weak fundamental")
for (let i = 0; i < 5; i++)
  send({ type: "samples", samples: new Float32Array(length), sampleRate: rate, time: i, generation: 1 })
assert.equal(result, null, "silence releases pitch")
reset()
analyze(440)
send({ type: "samples", samples: new Float32Array(length), sampleRate: rate, time: 0.2, generation: 1 })
assert.equal(result?.held, true, "temporary dropout is explicitly marked as held")

// Run the actual persistence and tuner functions against lightweight DOM/storage mocks.
const controls = new Map()
for (const match of html.matchAll(/<input\s+id="([^"]+)"([^>]*)>/g)) {
  const attributes = Object.fromEntries([...match[2].matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]))
  controls.set(match[1], attributes)
}
controls.set("wave", { options: ["sine", "square", "sawtooth", "triangle"].map(value => ({ value })) })
for (const id of ["tuner", "tuner-note", "tuner-detail", "tuner-state"]) controls.set(id, { dataset: {} })
let stored = JSON.stringify({ rate: 999, contrast: "bad", wave: "invalid", trackPitch: false, running: false })
let expireTuner
const settings = vm.createContext({
  $: id => controls.get(id),
  localStorage: {
    getItem: () => stored,
    setItem: (_, value) => {
      stored = value
    }
  },
  setTimeout: callback => {
    expireTuner = callback
    return 1
  },
  clearTimeout() {},
  c0: () => 440 / 2 ** (4 + 9 / 12)
})
vm.runInContext(html.slice(html.indexOf("      const config ="), html.indexOf("      let audioContext")), settings)
vm.runInContext(
  html.slice(html.indexOf("      function musicalPitch("), html.indexOf("      function drawSpectrogram()")),
  settings
)
settings.restoreSettings()
assert.equal(vm.runInContext("config.rate", settings), Number(controls.get("rate").max))
assert.equal(vm.runInContext("config.contrast", settings), 1)
assert.equal(vm.runInContext("config.wave", settings), "sine")
assert.equal(vm.runInContext("config.running", settings), true, "pause state is not persisted")
settings.syncSettingControls()
assert.equal(controls.get("track-pitch").checked, false)
settings.saveSettings()
assert.equal(JSON.parse(stored).trackPitch, false)
assert.equal(Object.hasOwn(JSON.parse(stored), "running"), false)
stored = "broken JSON"
assert.doesNotThrow(() => settings.restoreSettings())
settings.localStorage.getItem = settings.localStorage.setItem = () => {
  throw new Error("storage unavailable")
}
assert.doesNotThrow(() => {
  settings.restoreSettings()
  settings.saveSettings()
})
vm.runInContext("config.trackPitch = true", settings)
settings.updateTuner({ frequency: 440, confidence: 0.98 })
assert.equal(controls.get("tuner-note").textContent, "A4")
assert.match(controls.get("tuner-detail").textContent, /0¢ · 440.0 Hz/)
assert.equal(controls.get("tuner-state").textContent, "Measured · 98% confidence")
settings.updateTuner({ frequency: 440, confidence: 0.7, held: true })
assert.equal(controls.get("tuner").dataset.held, "true")
assert.equal(controls.get("tuner-state").textContent, "Held estimate · 70% confidence")
expireTuner()
assert.equal(controls.get("tuner-note").textContent, "—")
vm.runInContext("config.trackPitch = false", settings)
settings.updateTuner(null)
assert.equal(controls.get("tuner-state").textContent, "Tracking off")
console.log("Settings validation, unavailable storage, held estimates, and tuner tests passed.")

// Measure rather than assume vibrato fidelity, including tracker smoothing.
reset()
const trace = new Float32Array(rate * 3)
let phase = 0
for (let i = 0; i < trace.length; i++) {
  phase += (2 * Math.PI * 220 * 2 ** ((50 * Math.sin((2 * Math.PI * 6 * i) / rate)) / 1200)) / rate
  trace[i] = 0.5 * Math.sin(phase)
}
const pitches = []
for (let end = length; end < trace.length; end += 800) {
  send({ type: "samples", samples: trace.slice(end - length, end), sampleRate: rate, time: end / rate, generation: 1 })
  if (end > rate && result) pitches.push(1200 * Math.log2(result.frequency / 220))
}
assert.ok(
  pitches.length > 45 && pitches.every(value => Math.abs(value) < 150),
  "vibrato tracking remains voiced without octave errors"
)
assert.ok(Math.max(...pitches) - Math.min(...pitches) > 70, "vibrato retains at least 70% of its depth")
console.log("6 Hz, ±50-cent vibrato measured span:", (Math.max(...pitches) - Math.min(...pitches)).toFixed(1), "cents")

// Exercise the actual decimator on 2 kHz passband and 20 kHz stopband tones.
let Processor
let messages = []
const worklet = vm.createContext({
  sampleRate: 48000,
  currentTime: 0,
  AudioWorkletProcessor: class {
    constructor() {
      this.port = { postMessage: m => messages.push(m) }
    }
  },
  registerProcessor: (_, ctor) => {
    Processor = ctor
  }
})
vm.runInContext(embedded("workletSource"), worklet)
function filteredRms(frequency) {
  messages = []
  const processor = new Processor()
  processor.port.onmessage({ data: { type: "config", rate: 30, active: true, generation: 7 } })
  for (let frame = 0; frame < 160; frame++) {
    worklet.currentTime = (frame * 128) / 48000
    processor.process([
      [Float32Array.from({ length: 128 }, (_, i) => Math.sin((2 * Math.PI * frequency * (frame * 128 + i)) / 48000))]
    ])
  }
  const samples = messages.at(-1).samples
  assert.equal(messages.at(-1).generation, 7)
  processor.port.onmessage({ data: { type: "config", rate: 30, active: false, generation: 8 } })
  const count = messages.length
  for (let i = 0; i < 100; i++) processor.process([[new Float32Array(128)]])
  assert.equal(messages.length, count, "paused worklet sends no frames")
  return Math.sqrt(samples.reduce((sum, x) => sum + x * x, 0) / samples.length)
}
const passband = filteredRms(2000)
const stopband = filteredRms(20000)
assert.ok(passband > 0.65 && stopband / passband < 0.001, "anti-alias filter rejection")
console.log("All pitch, octave, silence, range, decimator, and pause tests passed.")

// Run the page's timestamp mapper with deliberately irregular capture intervals.
const mappingCode = html.slice(
  html.indexOf("      function applyPitchResults()"),
  html.indexOf("      function updateAutomaticLevels")
)
const mapping = vm.createContext({
  pitchGeneration: 2,
  writeX: 4,
  historyWidth: 5,
  config: { rate: 30 },
  columnTimes: [1, 1.02, 1.07, 1.105, 1.15],
  columnGenerations: [1, 2, 2, 2, 2],
  pitchHistory: new Float32Array(5).fill(NaN),
  pitchConfidence: new Float32Array(5),
  pitchBreaks: new Uint8Array(5),
  pitchHeld: new Uint8Array(5),
  pitchDirty: new Set(),
  pitchResults: [
    { generation: 1, time: 1.02, result: { frequency: 999, confidence: 1 } },
    { generation: 2, time: 1.069, result: { frequency: 220, confidence: 1 } },
    { generation: 2, time: 1.2, result: { frequency: 440, confidence: 1 } }
  ]
})
vm.runInContext(mappingCode + "\napplyPitchResults()", mapping)
assert.equal(mapping.pitchHistory[2], 220)
assert.ok(Number.isNaN(mapping.pitchHistory[1]), "stale generations are discarded")
assert.equal(mapping.pitchResults.length, 1, "future window center waits for a matching column")

// Autoplay resume may remain pending. Microphone setup must still finish.
const lifecycleCode = html.slice(
  html.indexOf("      function trackingActive()"),
  html.indexOf("      function applyPitchResults()")
)
const workerMessages = []
const captureMessages = []
const lifecycle = vm.createContext({
  updateTuner() {},
  pitchGeneration: 0,
  pitchResults: [{}],
  enabled: true,
  config: { running: true, trackPitch: true, rate: 60, pitchMinFreq: 65, pitchMaxFreq: 1500 },
  document: { hidden: false },
  audioContext: { state: "running", sampleRate: 48000 },
  pitchWorker: { postMessage: message => workerMessages.push(message) },
  pitchCaptureNode: { port: { postMessage: message => captureMessages.push(message) } }
})
vm.runInContext(lifecycleCode, lifecycle)
lifecycle.resetPitchTracker()
assert.equal(lifecycle.pitchGeneration, 1)
assert.equal(lifecycle.pitchResults.length, 0)
assert.equal(workerMessages[0].type, "reset")
assert.equal(captureMessages[0].generation, 1)
assert.equal(captureMessages[0].active, true)
lifecycle.config.running = false
lifecycle.resetPitchTracker()
assert.equal(lifecycle.pitchGeneration, 2)
assert.equal(captureMessages[1].active, false)

;(async () => {
  const elements = new Map()
  const context = vm.createContext({
    updateTuner() {},
    inputRequest: 0,
    enabled: false,
    stream: null,
    audioContext: null,
    source: null,
    config: { running: true, trackPitch: true, rate: 60, pitchMinFreq: 65, pitchMaxFreq: 1500 },
    document: { hidden: false },
    pitchGeneration: 0,
    pitchResults: [],
    stopOscillator() {},
    scheduleCapture() {},
    updateAudioStatus() {},
    rebuildRowCache() {},
    refreshDevices: async () => {},
    initializePitchTracker: async () => {},
    showError() {},
    pitchCaptureNode: { port: { postMessage() {} } },
    pitchWorker: { postMessage() {} },
    navigator: { mediaDevices: { getUserMedia: async () => ({ getTracks: () => [] }) } },
    AudioContext: class {
      resume() {
        return new Promise(() => {})
      }
      createMediaStreamSource() {
        return { connect() {}, disconnect() {} }
      }
      createAnalyser() {
        return { frequencyBinCount: 4096, fftSize: 8192 }
      }
    },
    $: id => {
      if (!elements.has(id)) elements.set(id, { style: {} })
      return elements.get(id)
    }
  })
  const startCode = html.slice(
    html.indexOf("      async function startInput("),
    html.indexOf("      function updateAudioStatus()")
  )
  vm.runInContext(lifecycleCode + startCode, context)
  await Promise.race([
    context.startInput(),
    new Promise((_, reject) => {
      const timer = setTimeout(() => reject(new Error("Autoplay setup hung")), 500)
      timer.unref()
    })
  ])
  assert.equal(context.enabled, true)
  let resume
  let oscillatorCreated = false
  const pointerContext = vm.createContext({
    enabled: true,
    oscillator: null,
    activePointer: null,
    pointer: {},
    audioContext: {
      resume: () =>
        new Promise(resolve => {
          resume = resolve
        }),
      createOscillator: () => {
        oscillatorCreated = true
      }
    },
    hitArea: { setPointerCapture() {} },
    showError() {}
  })
  const pointerCode = html.slice(
    html.indexOf("      async function startOscillator("),
    html.indexOf("      function updateOutputs()")
  )
  vm.runInContext(pointerCode, pointerContext)
  const pending = pointerContext.startOscillator({ pointerId: 12, button: 0, clientX: 90, clientY: 120 })
  assert.equal(pointerContext.pointer.y, 120, "pointerdown sets the actual tone position")
  pointerContext.stopOscillator()
  resume()
  await pending
  assert.equal(oscillatorCreated, false, "release during resume must not start a stuck tone")
  console.log("Timestamp, stale-result, and pending-autoplay tests passed.")
})().catch(error => {
  console.error(error)
  process.exitCode = 1
})
