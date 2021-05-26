const canvas = document.querySelector("canvas");
const offCanvas = new OffscreenCanvas(canvas.width, canvas.height);
const ctx = canvas.getContext("2d");
const offCtx = offCanvas.getContext("2d");
const C0 = 440 / Math.pow(2, 4 + 9 / 12);
let stream, source;
/** @type AnalyserNode */
let analyser;
/** @type Float32Array */
let freqData;
let imageData;
let audioDevices;
let audioContext = new AudioContext();
/** @type GainNode */
let gain;
/** @type OscillatorNode */
let oscillator;
let lastX, lastY, lastFreq = 880;
let pauseButton;

let config = {
    audioDevice: null,
    logarithmic: false,
    minFreq: 55,
    maxFreq: 2400,
    exponent: 1.08,
    running: true,
    oscillatorVolume: -35,
    fftSize: 13,
    colorWheelOffset: 0.25,
    pauseOrResume: function () {
        this.running = !this.running;
        pauseButton.name(this.running ? "Pause" : "Resume");
    },
    clear: function () {
        offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);
    }
}

function dbToGain(db) {
    return Math.pow(10, db / 20);
}

function interpolate(min, max, t) {
    t = Math.max(0, Math.min(1, t));
    if (config.logarithmic)
        return Math.exp((1 - t) * Math.log(min) + t * Math.log(max));
    return (1 - t) * min + t * max;
}

function getColor(pitch, intensity) {
    intensity = Math.max(0, Math.min(1, intensity));
    var hue = (pitch + config.colorWheelOffset) % 1;
    return d3.cubehelix(360 * hue, 1, 0.65 * intensity);
}

function getPitch(freq) {
    const pitch = Math.log2(freq / C0);
    return { octave: Math.floor(pitch), pitch: pitch - Math.floor(pitch) };
}

function getMusicalPitch(freq) {
    const names = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];
    const totalCents = Math.log2(freq / C0) * 12;
    const pitchClass = (((totalCents + 0.5) % 12) + 12) % 12;
    const nearest = Math.floor(pitchClass);
    return { name: names[nearest], octave: Math.floor((totalCents + 0.5) / 12), cents: (((totalCents + 0.5) % 12) - nearest) * 100 - 50 };
}

async function setAudioDevice(deviceId) {
    if (analyser != null) {
        source.disconnect(analyser);
    }
    stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId } });
    source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.smoothingTimeConstant = 0;
    source.connect(analyser);
    updateFFTSize();
}

async function initMicrophoneList() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = 0;
        source.connect(analyser);

        const devices = await navigator.mediaDevices.enumerateDevices();
        audioDevices = {};
        for (let d of devices) {
            if (d.kind === "audioinput") {
                audioDevices[d.label] = d.deviceId;
                if (d.label.indexOf("Stereo Mix") !== -1) {
                    config.audioDevice = d.deviceId;
                    setAudioDevice(config.audioDevice);
                }
            }
        }
    }
    catch (e) {
        console.error(e);
    }
}

function resizeCanvas() {
    canvas.width = offCanvas.width = window.innerWidth;
    canvas.height = offCanvas.height = window.innerHeight;
    imageData = ctx.getImageData(0, 0, 1, canvas.height);
}

function updateFFTSize() {
    analyser.fftSize = Math.pow(2, config.fftSize);
    freqData = new Float32Array(analyser.frequencyBinCount);
}

function updateOscillatorFreq(x, y) {
    lastX = x;
    lastY = y;
    if (oscillator != null) {
        oscillator.frequency.value = interpolate(config.minFreq, config.maxFreq, 1 - y / canvas.height);
    }
}

function render() {
    if (config.running) {
        analyser.getFloatFrequencyData(freqData);
        const maxDb = Math.max.apply(null, freqData);
        const gain = Math.min(50, -maxDb);

        // Shift contents 1 pixel to the left
        offCtx.drawImage(offCanvas, -1, 0);

        // Make h x 1 image data from frequency data
        for (let y = 0, i = 0; y < canvas.height; y++) {
            let freq = interpolate(config.minFreq, config.maxFreq, 1 - y / offCanvas.height);
            let bin = Math.round(freq / audioContext.sampleRate * 2 * analyser.frequencyBinCount);
            let v = freqData[bin];
            let vv = Math.pow(config.exponent, v + gain);
            let color = getColor(getPitch(freq).pitch, vv).rgb();

            imageData.data[i++] = color.r;
            imageData.data[i++] = color.g;
            imageData.data[i++] = color.b;
            imageData.data[i++] = 255;
        }
        offCtx.putImageData(imageData, offCanvas.width - 1, 0);

    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offCanvas, 0, 0);

    // Draw frequency text
    let freq = interpolate(config.minFreq, config.maxFreq, 1 - lastY / canvas.height);
    let p = getMusicalPitch(freq);
    let str = `${freq.toFixed(1)} Hz = ${p.name}${p.octave} (${p.cents < 0 ? "−" : "+"}${Math.abs(p.cents.toFixed(0))})`;
    let metrics = ctx.measureText(str);
    window.metrics = metrics;
    let x = Math.min(lastX + 6, canvas.width - metrics.width);
    let y = Math.max(lastY - 12, metrics.fontBoundingBoxAscent);
    let color = getColor(getPitch(freq).pitch, oscillator == null ? 0.5 : 1).toString();
    ctx.fillStyle = oscillator == null ? "#ccc" : color;
    ctx.font = "16px Open Sans";
    ctx.fillText(str, x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, 2 * Math.PI);
    ctx.fill();
    requestAnimationFrame(render);
}

window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("mousedown", e => {
    if (oscillator != null) {
        return;
    }
    oscillator = audioContext.createOscillator();
    gain = audioContext.createGain();
    gain.connect(audioContext.destination);
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(dbToGain(config.oscillatorVolume), audioContext.currentTime + 0.02);
    oscillator.connect(gain);
    updateOscillatorFreq(e.offsetX, e.offsetY);
    oscillator.start();
});
canvas.addEventListener("mouseup", e => {
    oscillator.stop();
    oscillator = null;
});
canvas.addEventListener("mousemove", e => {
    updateOscillatorFreq(e.offsetX, e.offsetY);
})

resizeCanvas();

(async () => {
    await initMicrophoneList();

    let gui = new dat.GUI({ name: "Hello", width: 300 });
    gui.add(config, "audioDevice", audioDevices).name("Audio device").onFinishChange(() => {
        setAudioDevice(config.audioDevice);
    });
    gui.add(config, "logarithmic").name("Logarithmic scale?");
    gui.add(config, "minFreq", 1, 22050, 1).name("Min frequency").listen().onFinishChange(() => {
        config.maxFreq = Math.max(config.minFreq, config.maxFreq);
    });
    gui.add(config, "maxFreq", 2, 22050, 1).name("Max frequency").listen().onFinishChange(() => {
        config.minFreq = Math.min(config.minFreq, config.maxFreq);
    });
    gui.add(config, "exponent", 1, 3, 0.01).name("Exponent");
    gui.add(config, "colorWheelOffset", 0, 1, 0.05).name("Color wheel offset");
    let fftSizeControl = gui.add(config, "fftSize", 5, 15, 1).name("FFT size");
    fftSizeControl.onFinishChange(updateFFTSize);
    const oscillatorControls = gui.addFolder("Oscillator");
    oscillatorControls.open();
    oscillatorControls.add(config, "oscillatorVolume", -60, 0, 1).name("Oscillator volume");
    const controls = gui.addFolder("Controls");
    controls.open();
    pauseButton = controls.add(config, "pauseOrResume").name("Pause");
    controls.add(config, "clear").name("Clear");

    updateFFTSize();
    requestAnimationFrame(render);
})();
