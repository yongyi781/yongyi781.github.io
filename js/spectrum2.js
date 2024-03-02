const canvas = document.querySelector("canvas");
const offCanvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const offCtx = offCanvas.getContext("2d");
const message = document.querySelector("#message");
const C0 = 440 / Math.pow(2, 4 + 9 / 12);
let stream, source;
/** @type AnalyserNode */
let analyser;
/** @type Float32Array */
let freqData;
let imageData;
let audioDevices;
/** @type GainNode */
let gain;
/** @type OscillatorNode */
let oscillator;
let lastX, lastY, lastFreq = 880;
let pauseButton;

let config = {
    audioDevice: "",
    logarithmic: true,
    minFreq: 60,
    maxFreq: 2200,
    sampleRate: 48000,
    slope: 0.14,
    running: true,
    colorWheelOffset: 0.25,
    fftSize: 13,
    octaveDivision: 12,
    octaveFreq: 440 / Math.pow(2, 9 / 12),
    oscillatorVolume: -35,
    oscillatorType: "sine",
    oscillatorSnap: true,
    pauseOrResume: function () {
        this.running = !this.running;
        pauseButton.name(this.running ? "Pause" : "Resume");
    },
    clear: function () {
        offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);
    }
}
let audioContext;

function dbToGain(db) {
    return Math.pow(10, db / 20);
}

function interpolate(min, max, t) {
    t = Math.max(0, Math.min(1, t));
    if (config.logarithmic)
        return Math.exp((1 - t) * Math.log(min) + t * Math.log(max));
    return (1 - t) * min + t * max;
}

function reverseInterpolate(min, max, value) {
    if (config.logarithmic)
        return (Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min));
    return (value - min) / (max - min);
}

function yToFreq(y) {
    return interpolate(config.minFreq, config.maxFreq, 1 - y / canvas.height);
}

function freqToY(freq) {
    return (1 - reverseInterpolate(config.minFreq, config.maxFreq, freq)) * canvas.height;
}

function getColor(pitch, intensity, alpha = 1) {
    intensity = Math.max(0, Math.min(1, intensity));
    var hue = (pitch + config.colorWheelOffset) % 1;
    return d3.cubehelix(360 * hue, 1, 0.65 * intensity, alpha);
}

// Returns 0-1, 0 corresponds to C.
function getPitch(freq) {
    const pitch = Math.log2(freq / C0);
    return pitch - Math.floor(pitch);
}

function roundPitch(freq) {
    return config.octaveDivision === 0 ? freq : Math.pow(2, Math.round(Math.log2(freq / config.octaveFreq) * config.octaveDivision) / config.octaveDivision) * config.octaveFreq;
}

function getMusicalPitch(freq) {
    const names = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];
    const totalCents = Math.log2(freq / C0) * 12;
    const pitchClass = (((totalCents + 0.5) % 12) + 12) % 12;
    const nearest = Math.floor(pitchClass);
    return { name: names[nearest], octave: Math.floor((totalCents + 0.5) / 12), cents: (pitchClass - nearest) * 100 - 50 };
}

function getIntensity(data, x, gain) {
    // Return weighted average of neighbors
    const t = x - Math.floor(x);
    const y = (1 - t) * data[Math.floor(x)] + t * data[Math.ceil(x)];
    return Math.pow(2, config.slope * (y + gain));
}

function createAnalyser() {
    if (source != null) {
        source.disconnect();
    }
    analyser = audioContext.createAnalyser();
    analyser.smoothingTimeConstant = 0;
    updateFFTSize();
    if (source != null) {
        source.connect(analyser);
    }
}

async function setSampleRate(sampleRate) {
    if (config.sampleRate !== sampleRate) {
        config.sampleRate = sampleRate;
    }
    if (audioContext != null) {
        await audioContext.close();
        audioContext = null;
    }
    await createAudioContext();
}

async function createAudioContext() {
    if (audioContext != null) {
        audioContext.close();
        audioContext = null;
    }
    try {
        audioContext = new AudioContext({ sampleRate: config.sampleRate });
        if (stream != null) {
            source = audioContext.createMediaStreamSource(stream);
        }
    }
    catch (e) {
        console.log(`Caught: ${e}`);
        audioContext.close();
        // Probably sample rate not supported.
        audioContext = new AudioContext();
        if (stream != null) {
            source = audioContext.createMediaStreamSource(stream);
        }
    }
    createAnalyser();
}

async function setAudioDevice(deviceId) {
    if (source != null) {
        source.disconnect();
    }
    stream = await navigator.mediaDevices.getUserMedia({
        audio: {
            deviceId,
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false
        }
    });
    await createAudioContext();
}

async function initMicrophoneList() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        const devices = await navigator.mediaDevices.enumerateDevices();
        audioDevices = {};
        for (let d of devices) {
            if (d.kind === "audioinput") {
                audioDevices[d.label] = d.deviceId;
            }
        }
        let key = Object.keys(audioDevices).find(s => s.indexOf("Stereo Mix") !== -1);
        config.audioDevice = audioDevices[key] || Object.values(audioDevices)[0];
        await setAudioDevice(config.audioDevice);
    }
    catch (e) {
        message.textContent = e;
    }
}

function resizeCanvas() {
    canvas.width = offCanvas.width = window.innerWidth;
    canvas.height = offCanvas.height = window.innerHeight;
    imageData = ctx.getImageData(0, 0, 1, canvas.height);
    ctx.imageSmoothingEnabled = offCtx.imageSmoothingEnabled = false;
}

function updateFFTSize() {
    if (analyser != null) {
        analyser.fftSize = Math.pow(2, config.fftSize);
        freqData = new Float32Array(analyser.frequencyBinCount);
    }
}

function updateOscillatorFreq(x, y) {
    lastX = x;
    lastY = y;
    if (oscillator != null) {
        let freq = yToFreq(y);
        if (config.oscillatorSnap) {
            freq = roundPitch(freq);
        }
        oscillator.frequency.value = freq;
    }
}

function render() {
    if (config.running && analyser != null) {
        analyser.getFloatFrequencyData(freqData);
        const maxDb = Math.max.apply(null, freqData);
        const gain = Math.min(50, -maxDb);

        // Shift contents 1 pixel to the left
        offCtx.drawImage(offCanvas, 1, 0, offCanvas.width - 1, offCanvas.height, 0, 0, offCanvas.width - 1, offCanvas.height);

        // Make h x 1 image data from frequency data
        for (let y = 0, i = 0; y < canvas.height; y++) {
            let freq = yToFreq(y);
            let vv = getIntensity(freqData, freq / audioContext.sampleRate * 2 * analyser.frequencyBinCount, gain)
            let color = getColor(getPitch(freq), vv).rgb();

            imageData.data[i++] = color.r;
            imageData.data[i++] = color.g;
            imageData.data[i++] = color.b;
            imageData.data[i++] = 255;
        }
        offCtx.putImageData(imageData, offCanvas.width - 1, 0);

    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offCanvas, 0, 0);

    // Draw lines
    if (config.octaveDivision > 0) {
        const minPitch = Math.ceil(Math.log2(config.minFreq / config.octaveFreq) * config.octaveDivision);
        const maxPitch = Math.floor(Math.log2(config.maxFreq / config.octaveFreq) * config.octaveDivision);
        ctx.lineWidth = 1;
        for (let i = minPitch; i <= maxPitch; i++) {
            ctx.strokeStyle = i % config.octaveDivision === 0 ? getColor(i / config.octaveDivision, 1, 1) : getColor(i / config.octaveDivision, 1, 0.4);
            let y = Math.round(freqToY(config.octaveFreq * Math.pow(2, i / config.octaveDivision))) + 0.5;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Draw frequency text
    const oscY = config.oscillatorSnap ? freqToY(roundPitch(yToFreq(lastY))) : lastY;
    let freq = yToFreq(oscY);
    let p = getMusicalPitch(freq);
    let str = `${freq.toFixed(1)} Hz = ${p.name}${p.octave} (${p.cents < 0 ? "−" : "+"}${Math.abs(p.cents.toFixed(0))})`;
    let metrics = ctx.measureText(str);
    window.metrics = metrics;
    let x = Math.min(lastX + 6, canvas.width - metrics.width - 3);
    let y = Math.max(oscY - 12, metrics.actualBoundingBoxAscent + 3);
    let color = getColor(getPitch(freq), oscillator == null ? 0.5 : 1).toString();
    ctx.fillStyle = oscillator == null ? "#ccc" : color;
    ctx.font = "16px 'Open Sans', 'Lucida Grande', 'Verdana', sans-serif";
    ctx.fillText(str, x, y);

    // Draw frequency circle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(lastX, oscY, 4, 0, 2 * Math.PI);
    ctx.fill();

    requestAnimationFrame(render);
}

window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("mousedown", e => {
    if (oscillator != null || e.button !== 0) {
        return;
    }
    gain = audioContext.createGain();
    gain.connect(audioContext.destination);
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(dbToGain(config.oscillatorVolume), audioContext.currentTime + 0.02);
    oscillator = audioContext.createOscillator();
    oscillator.type = config.oscillatorType;
    oscillator.connect(gain);
    updateOscillatorFreq(e.offsetX, e.offsetY);
    oscillator.start();
});
window.addEventListener("mouseup", e => {
    if (oscillator != null && e.button === 0) {
        oscillator.stop();
        oscillator = null;
    }
});
canvas.addEventListener("mousemove", e => {
    updateOscillatorFreq(e.offsetX, e.offsetY);
});

resizeCanvas();

(async () => {
    setSampleRate(config.sampleRate);
    await initMicrophoneList();

    let gui = new dat.GUI({ name: "Hello", width: 300 });
    gui.domElement.id = "gui";
    gui.add(config, "audioDevice", audioDevices).name("Audio device").onFinishChange(async () => {
        await setAudioDevice(config.audioDevice);
    });
    gui.add(config, "logarithmic").name("Logarithmic scale?");
    const minFreqControl = gui.add(config, "minFreq", 16, 24000, 1);
    const maxFreqControl = gui.add(config, "maxFreq", 16, 24000, 1);
    const sampleRateControl = gui.add(config, "sampleRate", 3000, 48000, 1).name("Sample rate").onFinishChange(setSampleRate);
    minFreqControl.name("Min frequency").onFinishChange(() => {
        config.maxFreq = Math.max(config.minFreq, config.maxFreq);
        maxFreqControl.updateDisplay();
    });
    maxFreqControl.name("Max frequency").onFinishChange(() => {
        config.minFreq = Math.min(config.minFreq, config.maxFreq);
        minFreqControl.updateDisplay();
        if (config.sampleRate < 2 * config.maxFreq) {
            setSampleRate(2 * config.maxFreq);
            sampleRateControl.updateDisplay();
        }
    });
    gui.add(config, "slope", 0.01, 1, 0.001).name("Slope");
    gui.add(config, "colorWheelOffset", 0, 1, 0.05).name("Color wheel offset");
    gui.add(config, "fftSize", 5, 15, 1).name("FFT size").onFinishChange(updateFFTSize);
    gui.add(config, "octaveDivision", 0, 53, 1).name("Octave division");
    gui.add(config, "octaveFreq", 440 / Math.pow(2, 9 / 12), 1000, 0.01).name("Octave frequency");
    const oscillatorControls = gui.addFolder("Oscillator");
    oscillatorControls.open();
    oscillatorControls.add(config, "oscillatorVolume", -60, 0, 1).name("Oscillator volume");
    oscillatorControls.add(config, "oscillatorType", ["sine", "square", "sawtooth", "triangle"]).name("Oscillator type");
    oscillatorControls.add(config, "oscillatorSnap").name("Snap oscillator?");
    const controls = gui.addFolder("Controls");
    controls.open();
    pauseButton = controls.add(config, "pauseOrResume").name("Pause");
    controls.add(config, "clear").name("Clear");

    updateFFTSize();
    requestAnimationFrame(render);
})();
